import { BrowserRouter, Routes , Route} from "react-router-dom";
import Tips from "./tipsview/Tips";
import Authpage from "./pages/Authpage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import "./index.css";
function App() {
  

  return (
    <BrowserRouter>
      {/* <header>
        <h1 className="head">KisanConnect</h1>
        </header> */}
      <div className="min-h-screen bg-[#F5F5F5]">
    <Routes>
      <Route path="/" element={<Authpage/>}/>
      <Route path="/tips" element={
        <ProtectedRoute>
          <Tips/>
        </ProtectedRoute>
      }
      />
          </Routes>
        </div>
    </BrowserRouter>
  );
      
}

export default App
