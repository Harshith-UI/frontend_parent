import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { Bell, LogOut, Calendar, LineChart } from "lucide-react";
import { useState, useEffect } from "react";
import axiosInstance from "../Axios/AxiosInstance"; // ✅ Using Axios instance for API calls
import ChildAttendance from "./ChildAttendance";
import ChildProgress from "./ChildProgress";
import ParentCommunication from "./ParentCommunication";
import Notifications from "./Notifications";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const response = await axiosInstance.get("/notifications");
        const unread = response.data.filter((n) => !n.isRead).length;

        // ✅ Check if notifications were cleared
        const storedCleared = localStorage.getItem("notificationsCleared");
        if (storedCleared === "true") {
          setUnreadCount(0); // ✅ Show 0 if notifications were cleared before
        } else {
          setUnreadCount(unread);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchUnreadNotifications();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg p-5 flex flex-col h-full justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Parent Dashboard</h2>
          <nav>
            <button
              className={`w-full py-2 px-4 mb-2 text-left rounded-lg ${activeSection === "dashboard" ? "bg-purple-500 text-white" : "text-gray-700"}`}
              onClick={() => setActiveSection("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`w-full py-2 px-4 mb-2 text-left rounded-lg ${activeSection === "attendance" ? "bg-purple-500 text-white" : "text-gray-700"}`}
              onClick={() => setActiveSection("attendance")}
            >
              Attendance
            </button>
            <button
              className={`w-full py-2 px-4 mb-2 text-left rounded-lg ${activeSection === "progress" ? "bg-purple-500 text-white" : "text-gray-700"}`}
              onClick={() => setActiveSection("progress")}
            >
              Progress Reports
            </button>
            <button
              className={`w-full py-2 px-4 mb-2 text-left rounded-lg ${activeSection === "communication" ? "bg-purple-500 text-white" : "text-gray-700"}`}
              onClick={() => setActiveSection("communication")}
            >
              Communication
            </button>
            <button
              className={`w-full py-2 px-4 mb-2 text-left rounded-lg ${activeSection === "notifications" ? "bg-purple-500 text-white" : "text-gray-700"}`}
              onClick={() => {
                setActiveSection("notifications");
                setUnreadCount(0); // ✅ Reset unread count when opening notifications
                localStorage.setItem("notificationsCleared", "true"); // ✅ Save cleared state
              }}
            >
              Notifications
            </button>
          </nav>
        </div>
        <button onClick={handleLogout} className="w-full py-2 px-4 mt-auto text-left bg-red-500 text-white rounded-lg">
          Logout
        </button>
      </div>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Welcome, Parent!</h2>
          {/* ✅ Bell Icon with Unread Notification Badge */}
          <div className="relative cursor-pointer" onClick={() => setActiveSection("notifications")}>
            <Bell className="h-6 w-6 text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
        <div className="mt-6">
          {activeSection === "dashboard" && (
            <div className="flex gap-6">
              <div className="p-4 bg-white shadow rounded-lg">
                <h3 className="text-gray-600">Attendance</h3>
                <p className="text-2xl font-semibold">95%</p>
              </div>
              <div className="p-4 bg-white shadow rounded-lg">
                <h3 className="text-gray-600">Progress</h3>
                <p className="text-2xl font-semibold">A-</p>
              </div>
            </div>
          )}
          {activeSection === "attendance" && <ChildAttendance />}
          {activeSection === "progress" && <ChildProgress />}
          {activeSection === "communication" && <ParentCommunication />}
          {activeSection === "notifications" && <Notifications />}
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
