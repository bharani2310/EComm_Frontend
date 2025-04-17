import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart, HiOutlineMenu, HiX } from 'react-icons/hi';
import { useAuth } from '../utils/authContext';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './search';

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [redirect, setRedirect] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    setMenuOpen(false); // Close menu after logout
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

        {/* Logo */}
        <div className="text-2xl font-semibold">E-Shop</div>

        {/* Desktop Search */}
        <div className="hidden md:block flex-1 mx-6">
          <SearchBar />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/home" className="hover:text-blue-400">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to={`/${redirect}`} className="hover:text-blue-400">Profile</Link>
              <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-400">Login</Link>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-gray-700 text-white">
          <Link to="/home" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Home</Link>
          {isAuthenticated ? (
            <>
              <Link to={`/${redirect}`} className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left hover:text-red-400">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
