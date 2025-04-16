import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/authContext';
import { useNavigate } from 'react-router-dom';
import Category from '../components/category';
import Product from '../components/product';
import UserDetails from '../pages/userDetails.js';
import Cart from '../components/cart.js';

const User = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Cart');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Cart', content: <Cart/> },
    { name: 'My Orders', content: <div>My Order</div> },
    { name: 'Settings', content: <UserDetails/> },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white p-5 w-full md:w-1/4 md:min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome , {user?.name}</h2>
        <ul className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`p-3 text-center md:text-left cursor-pointer hover:bg-gray-700 ${
                activeTab === item.name ? 'bg-gray-700' : ''
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area (Will expand as needed) */}
      <div className="p-5 w-full md:w-3/4">
        {menuItems.find((item) => item.name === activeTab)?.content}
      </div>
    </div>
  );
};

export default User;
