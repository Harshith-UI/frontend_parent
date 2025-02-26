import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import ParentSignin from "./pages/ParentSignIn";
import TeacherSignin from "./pages/TeacherSignIn";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import ParentDashboard from "./Components/Dashboard/ParentDashboard";
import TeacherDashboard from "./Components/Dashboard/TeacherDashboard";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    // Add Chatling.ai chatbot script dynamically
    const configScript = document.createElement("script");
    configScript.innerHTML = 'window.chtlConfig = { chatbotId: "7775277815" }';
    document.head.appendChild(configScript);

    const chatlingScript = document.createElement("script");
    chatlingScript.src = "https://chatling.ai/js/embed.js";
    chatlingScript.async = true;
    chatlingScript.dataset.id = "7775277815";
    chatlingScript.id = "chatling-embed-script";
    document.body.appendChild(chatlingScript);
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/parent/signin" element={<ParentSignin />} />
        <Route path="/teacher/signin" element={<TeacherSignin />} />
        <Route
          path="/parent/dashboard"
          element={
            <ProtectedRoute>
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;