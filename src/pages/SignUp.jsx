import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const generateReferralCode = (length = 8) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [toast, setToast] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.auth.users ?? []);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSignup = useCallback(
    (e) => {
      e.preventDefault();

      const trimmedEmail = form.email.trim().toLowerCase();
      const trimmedName = form.name.trim();
      const trimmedPassword = form.password;

      if (!trimmedName || !trimmedEmail || !trimmedPassword) {
        setToast({ message: "Please fill all fields.", type: "error" });
        return;
      }

      const exists = users.some((u) => u.email?.toLowerCase() === trimmedEmail);

      if (exists) {
        setToast({
          message: "User already exists. Please login.",
          type: "error",
        });
        return;
      }

      let referralCode;
      let attempts = 100;

      do {
        referralCode = generateReferralCode();
        attempts--;
      } while (
        users.some((u) => u.referralCode && u.referralCode === referralCode) &&
        attempts > 0
      );

      if (!referralCode) {
        setToast({ message: "Referral code generation failed. Try again.", type: "error" });
        return;
      }

      const newUser = { name: trimmedName, email: trimmedEmail, password: trimmedPassword, referralCode };
      dispatch(signup(newUser));
      setToast({
        message: `Signup successful! Your referral code: ${referralCode}`,
        type: "success",
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    },
    [form, users, dispatch, navigate]
  );

  const handleGoToLogin = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="bg-white/95 rounded-2xl shadow-xl flex flex-col items-center px-6 py-8 min-w-[320px] max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Sign Up</h2>
        <form onSubmit={handleSignup} className="w-full flex flex-col gap-4" autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
            value={form.name}
            className="border border-orange-200 bg-orange-50 focus:bg-orange-100 focus:border-orange-400 text-orange-900 placeholder:text-orange-300 rounded-lg px-4 py-3 font-medium outline-none transition"
            autoComplete="name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={form.email}
            className="border border-orange-200 bg-orange-50 focus:bg-orange-100 focus:border-orange-400 text-orange-900 placeholder:text-orange-300 rounded-lg px-4 py-3 font-medium outline-none transition"
            autoComplete="email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            value={form.password}
            className="border border-orange-200 bg-orange-50 focus:bg-orange-100 focus:border-orange-400 text-orange-900 placeholder:text-orange-300 rounded-lg px-4 py-3 font-medium outline-none transition"
            autoComplete="new-password"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-300 hover:from-orange-400 hover:to-orange-400 shadow-md text-white font-semibold rounded-lg py-3 mt-1 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="w-full text-center mt-6">
          <span className="w-full text-orange-600 font-medium text-sm mt-1">
            Already have an account?{" "}
            <button
              onClick={handleGoToLogin}
              className=" text-zinc-600 hover:underline font-medium text-sm mt-1"
              type="button"
            >
              Login here
            </button>
          </span>
        </div>

        {toast && <Toast {...toast} />}
      </div>
    </div>
  );
};

export default SignUp;