import React, { useEffect, useState } from 'react'
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from './support';
import toast from 'react-hot-toast';
import { useAuth } from '../utils/authContext';

const Login = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [data, setData] = useState({
        email: "",
        password: ""  
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await loginUser(data);
            console.log(response)
            if(response?.status===200){
                console.log("User",response?.data?.data)
                login(response?.data?.token,response?.data?.data)
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            }
        } catch (error) {

        }
        
    };

    // useEffect(() => {
    //     if (!email) {
    //         console.log(email);
    //         navigate('/');
    //     }
    // }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white w-full max-w-md shadow-lg rounded-lg p-6">

                <div className="flex justify-center">
                    <HiOutlineUserCircle size={70} className="text-gray-700" />
                </div>

                <h2 className="text-center text-2xl font-semibold text-gray-800 mt-4">
                    Login
                </h2>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

                    {/* Email Input */}
                    <div>
                    <label className="block text-sm font-medium text-gray-600">Email:</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-primary focus:ring-2 focus:ring-blue-400"
                      value={data.email}
                      required
                    />
                  </div>

                    

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                    </div>

                    <p className='my-3 text-center'>Don't have Account ? <Link to={'/verifyEmail'} className='hover:text-secondary font-semibold'>Register</Link></p>


                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white text-lg font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
