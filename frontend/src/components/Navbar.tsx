// Navbar Component - displays navigation and user info
// Shows login/signup links or user menu based on auth state

import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo*/}
        <Link to="/" className="text-2xl font-bold hover:opacity-90 transition">
          EventHub
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/events" className="hover:opacity-90 transition">
                All Events
              </Link>
              <Link to="/create-event" className="hover:opacity-90 transition">
                Create Event
              </Link>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 bg-blue-700 px-3 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  <span>{user?.name}</span>
                  <span>{isMenuOpen ? "▲" : "▼"}</span>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-gray-600">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-600 font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center gap-8 w-full h-[70px]">
    
              <Link
                to="/login"
                className="text-xl font-semibold w-25 h-10 flex items-center justify-center border-2 border-white text-white uppercase tracking-wide rounded-lg hover:bg-white hover:text-blue-700 transition duration-300 ease-in-out"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-xl font-semibold w-25 h-10 flex items-center justify-center bg-blue-700 text-white border-2 border-blue-700 uppercase tracking-wide rounded-lg hover:bg-white hover:text-blue-700 transition duration-300 ease-in-out shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
