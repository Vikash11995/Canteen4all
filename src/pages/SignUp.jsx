import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const SignUp = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState(null);
  const [userExists, setUserExists] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.auth.users);

  const handleSignup = (e) => {
    e.preventDefault();
    const exists = users.find((u) => u.email === form.email);

    if (exists) {
      setUserExists(true);
      setToast({ message: "User already exists. Please login.", type: "error" });
    } else {
      setUserExists(false);
      dispatch(signup(form));
      setToast({ message: "Signup successful!", type: "success" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const handleGoToLogin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="bg-white/95 rounded-2xl shadow-xl flex flex-col items-center px-6 py-8 min-w-[320px] max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Sign Up</h2>
        <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
            className="border border-orange-200 bg-orange-50 focus:bg-orange-100 focus:border-orange-400 text-orange-900 placeholder:text-orange-300 rounded-lg px-4 py-3 font-medium outline-none transition"
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
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
        {userExists && (
          <div className="mt-3 text-red-600 text-sm font-medium">
            User already exists. Please login.
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;