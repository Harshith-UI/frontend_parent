import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance"; // ✅ Import the existing axios instance

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/notifications"); // ✅ Uses axiosInstance (no need for full URL)
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((note) => (
            <li key={note._id} className={`mb-4 p-3 rounded-lg ${!note.isRead ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <p className="text-gray-500 text-sm">{new Date(note.createdAt).toLocaleDateString()}</p>
              <p className="font-medium">{note.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;

