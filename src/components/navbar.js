import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { useAuth } from '../utils/authContext';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './search';

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [redirect, setRedirect] = useState("profile");

  // Handle logout with toast
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      setRedirect("admin");
    } else {
      setRedirect("user");
    }
  }, [user]);

  

  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <Toaster position="top-center" reverseOrder={false} />
        
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">E-Shop</h1>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/home" className="text-white hover:text-blue-600 transition duration-300">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to={`/${redirect}`} className="text-white hover:text-blue-600 transition duration-300">Profile</Link>
              <button 
                onClick={handleLogout}
                className="text-white hover:text-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-blue-600 transition duration-300">Login</Link>
          )}
        </div>

       
      </div>
    </nav>
  );
};

export default NavBar;
