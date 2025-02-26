import { Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import ParentSignin from "./pages/ParentSignIn";
import TeacherSignin from "./pages/TeacherSignIn";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import ParentDashboard from "./Components/Dashboard/ParentDashboard";
import TeacherDashboard from "./Components/Dashboard/TeacherDashboard";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    (function(){
      if(!window.chatbase || typeof window.chatbase !== "function" || window.chatbase("getState") !== "initialized") {
        window.chatbase = function(...args) {
          if(!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") {
              return target.q;
            }
            return (...args) => target(prop, ...args);
          }
        });
      }
      const onLoad = function() {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "knB3BcxsciKiLxxBi_aHZ";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
      };
      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    })();
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
