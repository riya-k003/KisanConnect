import {useState} from 'react';
import {useNavigate} from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [formData , setFormData] = useState({
        email : "",
        password : ""
        });


    const handleChange = (e)=>{
        const {name , value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name] : value
        }));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3000/api/users/login" ,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if(!response.ok){
                console.log(data.message);
                return;
            }
            localStorage.setItem("token" , data.token);
            console.log("Saved token:" , localStorage.getItem("token"));
            console.log("login successful");
            navigate("/tips");
        }catch(error){
            console.log(error);
        }
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>

                <input
                 type="email"
                 placeholder="Enter email" 
                 name="email" 
                 value={formData.email}
                 onChange={handleChange}
                 />
                 
                <input 
                type="password" 
                placeholder="Enter password" 
                name="password" value={formData.password} 
                onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>

    );
}
export default Login;