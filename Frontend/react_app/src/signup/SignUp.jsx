import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [ error , setError] = useState("");

  const handleChange = (e) => {
    setError("");
    console.log("Input Changed:" , e.target.name , e.target.value);
    const { name, value } = e.target;
    // if (name === "confirmPassword") {
    //   if (value !== formData.password) {
    //     console.log("Password do not match");
    //     setError("Password do not match");
    //     return;
    //   }
    // }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        setError(data.message);
        return;
      }
      navigate("/tips");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="name"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

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
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        {/* <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        /> */}
        <input
          type="role"
          placeholder="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
