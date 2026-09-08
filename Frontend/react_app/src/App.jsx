import {Routes , Route} from "react-router-dom";
import TipsPage from "./pages/TipsPage.jsx";
import Authpage from "./pages/Authpage.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AiPage from "./pages/AiPage.jsx";
import Verify_otp from "./components/auth/Verify_otp.jsx";



function App() {
  
  return (
   <>
      {/* <header>
        <h1 className="head">KisanConnect</h1>
        </header> */}
      <div className="min-h-screen bg-[#F5F5F5]">
    <Routes>
      <Route path="/" element={<Authpage/>}/>
      <Route path="/tips" element={
        <ProtectedRoute>
          <TipsPage/>
        </ProtectedRoute>
      }
      />
      <Route 
      path="/ai-assistant"
      element={
        <ProtectedRoute>
          <AiPage/>
          </ProtectedRoute>
      }
      />
          <Route path="/verify-otp" element={<Verify_otp/>}/>
          </Routes>
        </div>
        </>
  );
      
}

export default App
