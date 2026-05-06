import { BrowserRouter, Routes , Route} from "react-router-dom";
import TipsPage from "./pages/TipsPage.jsx";
import Authpage from "./pages/Authpage.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute";


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
          <TipsPage/>
        </ProtectedRoute>
      }
      />
          </Routes>
        </div>
    </BrowserRouter>
  );
      
}

export default App
