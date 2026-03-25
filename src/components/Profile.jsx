import React from 'react'
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <h1>profile</h1>

      <button
                className="text-rose-500 hover:text-rose-700 text-base font-semibold"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
                type="button"
              >
                Logout
              </button>
    </div>
  )
}

export default Profile