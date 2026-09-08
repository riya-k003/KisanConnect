import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, Clock, ArrowLeft } from "lucide-react";

import { authService } from "../../services/authService";

function Verify_otp() {
  const OTP_length = 6;

  const navigate = useNavigate();

  const [otp, setOtp] = useState(Array(OTP_length).fill(""));
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  const inputs = useRef([]);

  const location = useLocation();
  const userId = location.state?.userId;

  // 5 minute countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Convert seconds into MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleChange = (e, index) => {
    const { value } = e.target;

    // Allow only single digit input
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (index < OTP_length - 1) {
        inputs.current[index + 1].focus();
      }
    }

    // Move focus to previous input
    else if (value === '') {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        if(index >0){
            inputs.current[index-1].focus();
        }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (timeLeft <= 0) {
      setError("OTP has expired. Please request a new OTP.");
      return;
    }

    try {
      const data = await authService.verifyOtp({
        userId,
        otp: otp.join(""),
      });

      console.log(data);

      if (data.message === "Account verified successfully") {
        navigate("/tips");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid or expired OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 px-6 py-12 md:px-16 lg:px-24">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-12"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </button>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[75vh]">
        
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-100 px-8 py-12 sm:px-16 sm:py-16">
          
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <ShieldCheck className="text-green-600" size={40} />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Verify Your Account
            </h1>

            <p className="text-gray-500 mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              We've sent you a 6-digit verification code. Enter the code below
              to complete your account verification.
            </p>
          </div>

          {/* Timer */}
          <div
            className={`mt-8 flex items-center justify-center gap-3 ${
              timeLeft <= 60 ? "text-red-500" : "text-green-600"
            }`}
          >
            <div className="p-3 bg-green-50 rounded-full">
              <Clock size={22} />
            </div>

            {timeLeft > 0 ? (
              <span className="text-lg font-semibold">
                OTP expires in {formatTime(timeLeft)}
              </span>
            ) : (
              <span className="text-lg font-semibold">
                OTP Expired
              </span>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-8 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleVerifyOtp} className="mt-12">
            
            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 sm:gap-5">
              {otp.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={otp[index]}
                  disabled={timeLeft <= 0}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputs.current[index] = el)}
                  className={`
                    w-12 h-14 
                    sm:w-16 sm:h-18
                    text-center text-xl sm:text-2xl font-bold
                    rounded-xl border-2 outline-none
                    transition-all duration-200
                    ${
                      timeLeft <= 0
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "border-gray-200 bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    }
                  `}
                />
              ))}
            </div>

            {/* Verify Button */}
            <div className="flex justify-center mt-12">
              <button
                type="submit"
                disabled={timeLeft <= 0}
                className={`
                  w-full max-w-md
                  py-4 rounded-xl
                  text-lg font-semibold text-white
                  transition-all duration-200
                  ${
                    timeLeft <= 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 hover:shadow-xl hover:shadow-green-200 active:scale-[0.98]"
                  }
                `}
              >
                {timeLeft > 0 ? "Verify OTP" : "OTP Expired"}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500">
              Please enter the verification code before the timer expires.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Verify_otp;

