import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartTab } from '../features/Cart';
import CartTab from './CartTab'; // Import CartTab component

function ProfileSection() {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <Link to={"/profile"}>
        <div className="w-10 h-10 rounded-full bg-orange-300 flex items-center justify-center text-green-900 font-bold border-2 border-orange-600">
          <span role="img" aria-label="profile">
            👤
          </span>
        </div>
        <span className="hidden sm:inline text-green-900 font-semibold"></span>
      </Link>
    </div>
  );
}

function HamburgerIcon({ open }) {
  return (
    <span className="block w-8 h-8 relative">
      {!open ? (
        <span className="block rounded-md border border-gray-400 w-8 h-8 flex items-center justify-center">
          <span className="flex flex-col gap-1.5">
            <span className="block w-5 h-0.5 bg-gray-600"></span>
            <span className="block w-5 h-0.5 bg-gray-600"></span>
            <span className="block w-5 h-0.5 bg-gray-600"></span>
          </span>
        </span>
      ) : (
        <span className="block rounded-full border border-gray-400 w-8 h-8 flex items-center justify-center text-2xl text-gray-600 font-bold">
          &times;
        </span>
      )}
    </span>
  );
}

const NAVBAR_HEIGHT = 64;

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carts = useSelector(state => state.cart.items);
  const totalQuantity = carts.reduce((sum, item) => sum + item.quantity, 0);
  const CartTabStatus = useSelector(state => state.cart.CartTabStatus);

  // Cart icon click handler: open cart tab
  const handleCartTabOpen = () => {
    dispatch(toggleCartTab());
  };

  function handleHamburgerClick() {
    setSidebarOpen((open) => !open);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  const profileDesktop = (
    <div className="hidden sm:flex items-center ml-4">
      <ProfileSection />
    </div>
  );

  const hamburgerMobile = (
    <button
      className="sm:hidden ml-2 p-2 rounded-full hover:bg-gray-100 transition"
      aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      onClick={handleHamburgerClick}
      style={{
        background: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer",
      }}
      type="button"
    >
      <HamburgerIcon open={sidebarOpen} />
    </button>
  );

  const user = null;

  return (
    <header
      className="relative bg-white shadow"
      style={{ height: NAVBAR_HEIGHT, zIndex: 50 }}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between p-4"
        style={{ minHeight: NAVBAR_HEIGHT }}
      >
        <div className="flex items-center">
          {profileDesktop}
          {hamburgerMobile}
        </div>
        <Link to="/">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-mono text-green-700 px-2 sm:px-3 py-0.5 bg-amber-400 rounded-full ">
            Canteen<span style={{ color: "red" }}>4</span>All.
          </h1>
        </Link>
        {/* Cart icon with click handler to open cart tab */}
        <div
          className='relative bg-gray-50 rounded-full flex justify-center items-center w-10 h-10 cursor-pointer'
          onClick={handleCartTabOpen}
        >
          <IoCartOutline size={28} />
          <span className='p-1 bg-amber-300 rounded-full text-xs flex justify-center items-center absolute w-4 h-4 top-0 right-0'>
            {totalQuantity}
          </span>
        </div>
      </div>
      {/* Toggle CartTab on cart icon click */}
      {CartTabStatus && <CartTab />}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={closeSidebar}>
          <div
            className="fixed top-0 left-0 right-0 w-full bg-white shadow-lg rounded-b-2xl px-6 py-7 z-50 min-h-[220px] flex flex-col gap-6"
            style={{
              animation: "slideDown 0.2s cubic-bezier(.4,2,.6,1) 1",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-2xl text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
              aria-label="Close menu"
              onClick={closeSidebar}
              type="button"
            >
              &times;
            </button>
            <div className="flex items-center gap-4 justify-center pb-2 border-b border-gray-100">
              <ProfileSection />
              <span className="text-lg font-semibold text-green-900">
                Hi, {user?.name || user?.email || "User"}
              </span>
            </div>
            <nav className="flex flex-col gap-3 items-center mt-3">
              <Link
                to="/home"
                className="text-green-800 hover:text-green-600 text-base font-semibold"
                onClick={closeSidebar}
              >
                Home
              </Link>
              <Link
                to="/home"
                className="text-gray-700 hover:text-gray-900 text-base"
                onClick={closeSidebar}
              >
                Menu
              </Link>
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
            </nav>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideDown {
            0% {
              opacity: 0;
              transform: translateY(-32px) scale(0.97);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </header>
  );
}
export default Navbar;
