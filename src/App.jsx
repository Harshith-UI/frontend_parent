import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import RoleSelection from "./pages/RoleSelection";
import ParentSignin from "./pages/ParentSignIn";
import TeacherSignin from "./pages/TeacherSignIn";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import ParentDashboard from "./Components/Dashboard/ParentDashboard";
import TeacherDashboard from "./Components/Dashboard/TeacherDashboard";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Chatbase widget
    (function(){
      if(!window.chatbase||window.chatbase("getState")!=="initialized"){
        window.chatbase=(...arguments)=>{
          if(!window.chatbase.q){window.chatbase.q=[]}
          window.chatbase.q.push(arguments)
        };
        window.chatbase=new Proxy(window.chatbase,{
          get(target,prop){
            if(prop==="q"){return target.q}
            return(...args)=>target(prop,...args)
          }
        })
      }
      
      const onLoad=function(){
        const script=document.createElement("script");
        script.src="https://www.chatbase.co/embed.min.js";
        script.id="knB3BcxsciKiLxxBi_aHZ";
        script.domain="www.chatbase.co";
        document.body.appendChild(script)
      };
      
      if(document.readyState==="complete"){
        onLoad()
      } else {
        window.addEventListener("load",onLoad)
      }
    })();

    // Optional: User identity verification with HMAC
    // Note: You'll need to implement this part if you want to use the server verification
    // This depends on how you're managing user authentication in your app
    /* 
    const getCurrentUserId = () => {
      // Replace with your actual logic to get the current user ID
      return localStorage.getItem('userId') || 'anonymous-user';
    };

    // This would ideally be handled by your backend for security
    // This is just a simplified example
    const crypto = window.crypto || window.msCrypto;
    const userId = getCurrentUserId();
    
    if (userId !== 'anonymous-user') {
      // In a real implementation, you would call your server endpoint 
      // to generate this hash securely, not expose the secret in client code
      window.chatbase("setIdentity", userId, "HMAC_HASH_GENERATED_ON_SERVER");
    }
    */
  }, [location]);

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
