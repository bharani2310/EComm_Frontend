import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-0">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left section with links */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold mb-2">E-Shop</h2>
            <p className="text-sm">© 2025 E-Shop. All rights reserved.</p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <Link to="/about" className="text-sm text-gray-400 hover:text-white transition duration-300">About Us</Link>
            <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition duration-300">Contact</Link>
            <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition duration-300">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition duration-300">Terms of Service</Link>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">Follow us:</p>
          <div className="flex justify-center space-x-6 mt-2">
            {/* Add your social media links here */}
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook.png" alt="Facebook" className="w-6 h-6"/>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="Twitter" className="w-6 h-6"/>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram.png" alt="Instagram" className="w-6 h-6"/>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" className="w-6 h-6"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
