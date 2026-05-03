import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {authServices} from "../../services/authServices";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authServices.login(formData);
      localStorage.setItem("token", data.token);
      navigate("/tips");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Email field */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#1A4331]">Email address</label>
        <div style={{display:'flex', alignItems:'center', gap:'12px', background:'white', border:'1px solid #E5E2D9', borderRadius:'12px', padding:'12px 16px'}}>
          <svg style={{height:'16px', width:'16px', color:'#758079'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            style={{flex:1, background:'transparent', outline:'none', fontSize:'14px', color:'#1A4331', border:'none'}}
          />
        </div>
      </div>

      {/* Password field */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#1A4331]">Password</label>
        <div style={{display:'flex', alignItems:'center', gap:'12px', background:'white', border:'1px solid #E5E2D9', borderRadius:'12px', padding:'12px 16px'}}>
          <svg style={{height:'16px', width:'16px', color:'#758079'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            style={{flex:1, background:'transparent', outline:'none', fontSize:'14px', color:'#1A4331', border:'none'}}
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        style={{width:'100%', background:'#D95D39', color:'white', fontWeight:'600', padding:'12px', borderRadius:'12px', border:'none', cursor:'pointer', fontSize:'15px', marginTop:'8px'}}
      >
        Login →
      </button>

    </form>
  );
}

export default Login;