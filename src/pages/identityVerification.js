import React, { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import toast  from "react-hot-toast";
import { sendOtp, verifyOtp } from "./support.js";
import { HashLoader } from "react-spinners";

const IdentityVerification = () => {
  const navigate=useNavigate()
  const [data, setData] = useState({ email: "" });
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btn, setBtn] = useState("Verify");

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const flag = await sendOtp(data);
    if (flag) {
      setVerify(true);
    }
    setLoading(false);
  };

  const handleValidateOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const flag = await verifyOtp(data,otp);
    console.log(flag)
    if(flag?.data?.success){
      // setTimeout(() => {
      // }, 100); 
      toast.success("OTP Verified");

    
      setTimeout(() => {
        setVerify(false);
        navigate("/register", { state: { email: data?.email } });
      }, 2000);
    }
    setLoading(false);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      {/* Blurred Background Overlay with Loader */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-10">
          <HashLoader color="#2563eb" size={50} />
        </div>
      )}

      <div className={`bg-white w-full max-w-md shadow-lg rounded-lg p-6 relative ${loading ? "blur-sm" : ""}`}>
        <div className="flex justify-center">
          <HiOutlineUserCircle size={70} className="text-gray-700" />
        </div>


        <h2 className="text-center text-2xl font-semibold text-gray-800 mt-4">
          {verify ? "Enter OTP" : "Register"}
        </h2>

        <form className="mt-6 space-y-4" onSubmit={!verify?handleSendOtp:handleValidateOtp}>
          {/* Email Input */}
          {!verify && (
            <>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Email:</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-primary focus:ring-2 focus:ring-blue-400"
                      value={data.email}
                      onChange={handleEmailChange}
                      required
                    />
              </div>
              <p className='my-3 text-center'>Already have Account ? <Link to={'/login'} className='hover:text-secondary font-semibold'>Login</Link></p>

            </>
            
          )}

          {/* OTP Input */}
          {verify && (
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
          )}

          {/* Register / Verify OTP Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-lg font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {verify ? "Verify OTP" : btn}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IdentityVerification;
