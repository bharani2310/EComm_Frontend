import React,{ useEffect, useState } from "react";
import { getUserCount } from "./support";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserCount();
        console.log(response)
        setUserCount(response?.count || 0); // Ensure a valid number is set
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="flex items-center p-6 bg-blue-500 text-white shadow-lg rounded-xl">
        <div>
          <h2 className="text-lg">Registered Users</h2>
          <p className="text-2xl font-bold">{userCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
