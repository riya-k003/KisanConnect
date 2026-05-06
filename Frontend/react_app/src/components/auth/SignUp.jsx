import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {authService} from "../../services/authService";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await authService.register(formData);
      navigate("/tips");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#1A4331]">Full name</label>
        <div className="flex items-center gap-3 bg-white border border-[#E5E2D9] rounded-xl px-4 py-3 focus-within:border-[#1A4331] transition-colors">
          <svg className="h-4 w-4 text-[#758079]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="flex-1 bg-transparent outline-none text-sm text-[#1A4331] placeholder:text-[#a0a8a3]"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#1A4331]">Email address</label>
        <div className="flex items-center gap-3 bg-white border border-[#E5E2D9] rounded-xl px-4 py-3 focus-within:border-[#1A4331] transition-colors">
          <svg className="h-4 w-4 text-[#758079]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="flex-1 bg-transparent outline-none text-sm text-[#1A4331] placeholder:text-[#a0a8a3]"
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#1A4331]">Password</label>
        <div className="flex items-center gap-3 bg-white border border-[#E5E2D9] rounded-xl px-4 py-3 focus-within:border-[#1A4331] transition-colors">
          <svg className="h-4 w-4 text-[#758079]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="flex-1 bg-transparent outline-none text-sm text-[#1A4331] placeholder:text-[#a0a8a3]"
          />
        </div>
      </div>

      {/* Role */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#1A4331]">I am joining as a</label>
        <div className="flex items-center gap-3 bg-white border border-[#E5E2D9] rounded-xl px-4 py-3 focus-within:border-[#1A4331] transition-colors">
          <svg className="h-4 w-4 text-[#758079]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          </svg>
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="flex-1 bg-transparent outline-none text-sm text-[#1A4331] placeholder:text-[#a0a8a3]"
          />
        </div>
        <p className="text-xs text-[#758079] mt-1">
          Type <span className="font-semibold text-[#1A4331]">farmer</span> if you grow, or{" "}
          <span className="font-semibold text-[#D95D39]">consumer</span> if you buy.
        </p>
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#D95D39] hover:bg-[#c04e2e] text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
      >
        Sign Up →
      </button>

    </form>
  );
}

export default SignUp;
