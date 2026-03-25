import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      dispatch(login({ email, password }));
      navigate("/home");
    } else {
      setToast({ message: "User not found. Please sign up!", type: "error" });
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="bg-white/95 rounded-2xl shadow-xl flex flex-col items-center px-6 py-8 min-w-[320px] max-w-sm w-full">
      <h1 className="p-2.5 text-2xl font-bold">Canteen4All</h1>
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-500 shadow-lg mb-5 text-white text-4xl select-none">
          🍲
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Login </h2>
      

        <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
          <input
            className="border border-orange-200 bg-orange-50 focus:bg-orange-100 focus:border-orange-400 text-orange-900 placeholder:text-orange-300 rounded-lg px-4 py-3 font-medium outline-none transition"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            type="email"
            autoComplete="username"
          />

          <input
            className="border border-orange-200 bg-orange-50 focus:bg-orange-100 focus:border-orange-400 text-orange-900 placeholder:text-orange-300 rounded-lg px-4 py-3 font-medium outline-none transition"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-300 hover:from-orange-400 hover:to-orange-400 shadow-md text-white font-semibold rounded-lg py-3 mt-1 transition"
          >
            Login
          </button>
          {/* <button
            type="button"
            onClick={handleSignUp}
            className="w-full text-orange-600 hover:underline font-medium text-sm mt-1"
          >
            New user? Sign Up
          </button> */}
           <div className="w-full text-center mt-6">
          <span className="w-full text-orange-600 font-medium text-sm mt-1">
            New user?{" "}
            <button
              onClick={handleSignUp}
              className=" text-zinc-600 hover:underline font-medium text-sm mt-1"
              type="button"
            >
              SignUp
            </button>
          </span>
        </div>
        </form>
        {toast && (
          <div className="mt-5 w-full">
            <Toast {...toast} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
