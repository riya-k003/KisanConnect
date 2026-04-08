import { BrowserRouter, Routes , Route} from "react-router-dom";
import Tips from "./tipsview/Tips";
import Login from "./signup/Login";
import ProtectedRoute from "./ProtectedRoute";
import "./index.css";
function App() {
  

  return (
    <BrowserRouter>
      <header>
        <h1 className="head">KisanConnect</h1>
        </header>
      <div className="page-content">
    <Routes>
      <Route path="/" element={<Login/>}/>
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
