import React from 'react';
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  console.log(user)

  const displayUser = user
    ? {
        name: user.name || user.email || "User",
        email: user.email,
        referralCode: user.referralCode || "N/A",
        image:
          user.image ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name || user.email
          )}&background=FF7B1A&color=fff&size=128`,
      }
    : { name: "Demo User", email: "demo@example.com", referralCode: "N/A", image: "" };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-100 to-orange-300 p-0 m-0">
      <div className="w-full max-w-3xl mx-auto py-16 px-6 flex flex-col items-center">
        <div className="flex flex-col items-center w-full">
          <div className="w-32 h-32 mb-8 rounded-full border-4 border-orange-300 overflow-hidden shadow-lg">
            <img
              src={displayUser.image}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Only show the name and below it the referral code and email */}
          <h1 className="font-bold text-4xl text-orange-800 mb-2">
            {displayUser.name}
          </h1>
          <div className="flex flex-col items-center gap-1 mb-10">
            <span className="text-gray-700 text-lg">
              <span className="font-semibold">Referral Code: </span>
              <span className="font-mono bg-orange-200 text-orange-800 px-2 py-1 rounded">{displayUser.referralCode}</span>
            </span>
            <span className="text-orange-600 text-lg">{displayUser.email}</span>
          </div>
        </div>
        <div className="w-full bg-white/80 rounded-xl shadow-lg px-10 py-8 flex flex-col items-start min-h-[200px] mb-12">
          <span className="text-gray-700 font-medium text-lg">
            Welcome to your profile page!
          </span>
        </div>
        <button
          className="bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-400 hover:to-rose-500 shadow-lg text-white font-bold rounded-lg py-4 px-12 text-lg transition w-full max-w-sm"
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;