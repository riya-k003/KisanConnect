require("dotenv").config();
const { BrevoClient } = require("@getbrevo/brevo");
const db = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY
});

 const sendOTPEmail = async (recipientEmail, otp) => {
  const emailPayload = {
    sender: {
      name: "KissanConnect",
      email: process.env.BREVO_SENDER_EMAIL
    },

    to: [
      {
        email: recipientEmail
      }
    ],

    subject: "Your KissanConnect Verification Code",

    htmlContent: `
      <div style="
        font-family: Arial, sans-serif;
        padding: 30px;
        max-width: 450px;
        margin: auto;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
      ">
        
        <h2>Verify Your Email</h2>

        <p>
          Please use the following OTP to verify your KissanConnect account.
        </p>

        <div style="
          padding: 18px;
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 6px;
          margin: 25px 0;
          background: #f7f9fc;
          border-radius: 6px;
        ">
          ${otp}
        </div>

        <p>
          This OTP will expire in <b>5 minutes</b>.
        </p>

        <p style="font-size: 12px; color: gray;">
          If you didn't request this verification, you can safely ignore this email.
        </p>

      </div>
    `
  };

  const response = await  brevo.transactionalEmails.sendTransacEmail(emailPayload);

  return response;
};

//helper: random 6-digit OTP generate kane ke liye
function generateOTP(){
return Math.floor(100000 + Math.random() * 900000).toString();
}


exports.registerUser = async (req, res) => {
    console.log("register api hit");
    const { name, email, password, role } = req.body;

    try {

        const existingUserSql = "SELECT id , is_verified FROM users WHERE email = ?";
        const [existrow] = await db.query(existingUserSql , [email]);

        if(existrow.length > 0){
            const existUser = existrow[0];
            if(existUser.is_verified === 1){
                return res.status(400).json({
                    message: "Email already exists"
                })
            }
            else{
                //user exists but verified nahi heh toh dleete kar dengeh
                const deleteSql = "DELETE FROM users WHERE id = ?";
                 await db.query(deleteSql , [existUser.id]);

            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);


    const sql = "INSERT INTO users(name , email , password  , role) VALUES (? , ? , ? , ?)";
      const [result] = await  db.query(sql, [name, email, hashedPassword, role]);

      const userId = result.insertId;

      //Otp generate and store
      const otp = generateOTP();

      const otpSql = "INSERT INTO Otp_verifications( user_id , otp_code , purpose , expires_at) VALUES (? , ? , ? , DATE_ADD(NOW() , INTERVAL 5 MINUTE))";
      await db.query(otpSql , [userId , otp , "signup"]);

        // Send OTP using Brevo
        await sendOTPEmail(email, otp);


            return res.status(201).json({
                message: "User registered successfully",
                userId: userId
            });
        }catch(error){
            console.log(error);

            if(error.code === 'ER_DUP_ENTRY'){
                return res.status(400).json({
                    message: "Email already exists"
                });
            }
            return res.status(500).json({
                message: "Server error"
            });
        } 
    
};

exports.verifyOtp = async(req, res)=>{
    console.log("verify otp hit");
    const {userId , otp} = req.body;

    try{
        const sql = `SELECT * FROM Otp_verifications
                     WHERE user_id = ? AND otp_code = ? AND purpose='signup' AND is_used = FALSE AND  expires_at > NOW()
                     ORDER BY created_at DESC LIMIT 1`;
        const [rows] = await db.query(sql , [userId , otp]);

        if(rows.length === 0){

            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

            const otpRow = rows[0];
            // if(new Date() > new Date(otpRow.expires_at)){
            //     return res.status(400).json({
            //         message: "OTP expired"
            //     });

            // }

                //otp ko used mark - replay attacl rokne ke liye
                await db.query("UPDATE Otp_verifications SET is_used = TRUE WHERE id = ?", [otpRow.id]);

                //user ko verified mark karo
                await  db.query("UPDATE users SET is_verified = TRUE WHERE id= ?" , [userId]);

                return res.status(200).json({
                    message: "Account verified successfully"
                });

         
        }catch(error){
            console.log(error);
            return res.status(500).json({
                message: "Server error"
            });
        
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password required"
        });
    }

    try {
        const sql = "SELECT * FROM users WHERE  email = ? ";
        const [result] = await db.query(sql, [email]);
           

            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
            });
            }
            const user = result[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: "Wrong Password"
                });
            }
            //naya check: verified hai ya nahi
            if(!user.is_verified){
                return res.status(403).json({
                    message: "Please verify your account via OTP first"
                });
            }
            const token = jwt.sign(
                { id: user.id,
                  email: user.email,
                  role: user.role,
                  name: user.name 
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.status(200).json({
                message: "Login Successful",
                token: token
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });

    }
};