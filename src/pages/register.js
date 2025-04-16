import React, { useEffect, useState } from 'react'
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { registerUser } from './support';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};

    const [data, setData] = useState({
        email: email || "",
        name: "",
        dob: "",
        gender: "",
        password: ""  // Added password field
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
            const response = await registerUser(data);
            setTimeout(() => {
                navigate("/login");
              }, 1000);
        } catch (error) {

        }
        
    };

    useEffect(() => {
        if (!email) {
            console.log(email);
            navigate('/');
        }
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white w-full max-w-md shadow-lg rounded-lg p-6">

                <div className="flex justify-center">
                    <HiOutlineUserCircle size={70} className="text-gray-700" />
                </div>

                <h2 className="text-center text-2xl font-semibold text-gray-800 mt-4">
                    Register
                </h2>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter your Name"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Date of Birth Input */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="dob" className="text-gray-700 font-medium">
                            Date of Birth:
                        </label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={data.dob}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Gender Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="gender" className="text-gray-700 font-medium">Gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            value={data.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
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

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white text-lg font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
