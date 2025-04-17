import React, { useState } from "react";
import { useAuth } from "../utils/authContext"; // Adjust the import as needed
import { updateUserDetails } from "./support"; // API call function
import toast from 'react-hot-toast';

const UserDetails = () => {
  const { user, setUser } = useAuth(); // Assuming setUser updates user context
  const [formData, setFormData] = useState({
    name: user?.name || "",
    dob: user?.dob ? user.dob.split("T")[0] : "",
    gender: user?.gender || "Male",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("User",user,formData)
        const updatedUser = await updateUserDetails(user._id, formData);
        setUser(updatedUser); // Update state
        localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Update localStorage
        toast.success("Profile updated successfully!");
        setIsEditing(false); // ✅ Exit edit mode after saving
    } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Failed to update profile.");
    } finally {
        setLoading(false);
    }
};



  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">User Profile</h2>
      
      {!isEditing ? (
        // Display user details when not editing
        <div className="space-y-3">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p>
            <strong>DOB:</strong>{" "}
            {user?.dob
              ? (() => {
                  const date = new Date(user.dob);
                  const day = String(date.getDate()).padStart(2, "0");
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const year = date.getFullYear();
                  return `${day}-${month}-${year}`;
                })()
              : ""}
          </p>
          <p><strong>Gender:</strong> {user?.gender}</p>

          <button 
            onClick={() => setIsEditing(true)} 
            className="bg-blue-500 text-white px-4 py-2 w-full rounded"
          >
            Edit
          </button>
        </div>
      ) : (
        // Edit form when editing is enabled
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="border px-3 py-2 w-full rounded"
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="email"
            name="email"
            value={user.email}
            className="border px-3 py-2 w-full rounded bg-gray-100"
            disabled
          />


          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 w-full rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Updating..." : "Save"}
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 w-full rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserDetails;
