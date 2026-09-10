import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { Eye, EyeOff, User, Mail, LockKeyhole, Sprout } from "lucide-react";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setError("");

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authService.register(formData);

      navigate("/verify-otp", {
        state: { userId: response.userId }
      });
    } catch (error) {
      console.log(error);
      setError(
        error.message || "Something went wrong during registration."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-[#1A4331]">
          Full name
        </label>

        <div className="flex items-center gap-3 bg-white border border-[#E5E2D9] rounded-xl px-4 py-3.5 shadow-sm focus-within:border-[#1A4331] focus-within:ring-2 focus-within:ring-[#1A4331]/10 transition-all duration-200">

          <User
            size={18}
            strokeWidth={1.8}
            className="text-[#758079] shrink-0"
          />

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="flex-1 min-w-0 bg-transparent outline-none text-sm text-[#1A4331] placeholder:text-[#A0A8A3]"
          />
        </div>
      </div>


      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-[#1A4331]">
          Email address
        </label>

        <div className="flex items-center gap-3 bg-white border border-[#E5E2D9] rounded-xl px-4 py-3.5 shadow-sm focus-within:border-[#1A4331] focus-within:ring-2 focus-within:ring-[#1A4331]/10 transition-all duration-200">

          <Mail
            size={18}
            strokeWidth={1.8}
            className="text-[#758079] shrink-0"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="flex-1 min-w-0 bg-transparent outline-none text-sm text-[#1A4331] placeholder:text-[#A0A8A3]"
          />
        </div>
      </div>


      {/* Password */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-[#1A4331]">
          Password
        </label>

        <div className="relative flex items-center gap-3 bg-white border border-[#E5E2D9] rounded-xl px-4 py-3.5 shadow-sm focus-within:border-[#1A4331] focus-within:ring-2 focus-within:ring-[#1A4331]/10 transition-all duration-200">

          <LockKeyhole
            size={18}
            strokeWidth={1.8}
            className="text-[#758079] shrink-0"
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className="flex-1 min-w-0 bg-transparent outline-none text-sm text-[#1A4331] placeholder:text-[#A0A8A3] pr-8"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#758079] hover:text-[#1A4331] rounded-md hover:bg-[#F4F6F2] transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={19} strokeWidth={1.8} />
            ) : (
              <Eye size={19} strokeWidth={1.8} />
            )}
          </button>
        </div>

        <p className="text-xs text-[#758079] pl-1">
          Keep your password private and secure.
        </p>
      </div>


      {/* Role */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-[#1A4331]">
          I am joining as a
        </label>

        <div className="flex items-center gap-3 bg-white border border-[#E5E2D9] rounded-xl px-4 py-3.5 shadow-sm focus-within:border-[#1A4331] focus-within:ring-2 focus-within:ring-[#1A4331]/10 transition-all duration-200">

          <Sprout
            size={18}
            strokeWidth={1.8}
            className="text-[#758079] shrink-0"
          />

          <input
            type="text"
            name="role"
            placeholder="Enter your role"
            value={formData.role}
            onChange={handleChange}
            className="flex-1 min-w-0 bg-transparent outline-none text-sm text-[#1A4331] placeholder:text-[#A0A8A3]"
          />
        </div>

        <div className="flex items-center gap-2 pl-1">
          <span className="text-xs text-[#758079]">
            Type
          </span>

          <span className="text-xs font-semibold text-[#1A4331] bg-[#EAF2EC] px-2 py-1 rounded-md">
            farmer
          </span>

          <span className="text-xs text-[#758079]">
            if you grow, or
          </span>

          <span className="text-xs font-semibold text-[#D95D39] bg-[#FFF0EB] px-2 py-1 rounded-md">
            consumer
          </span>

          <span className="text-xs text-[#758079]">
            if you buy.
          </span>
        </div>
      </div>


      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}


      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#D95D39] hover:bg-[#C84F2F] active:scale-[0.99] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-1 shadow-sm hover:shadow-md"
      >
        Create account
        <span className="text-lg leading-none">→</span>
      </button>

    </form>
  );
}

export default SignUp;
