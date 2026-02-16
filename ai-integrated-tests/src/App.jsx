import { BrowserRouter, Routes, Route } from "react-router"; // Changed from 'react-router-dom'
import HomePage from "./pages/HomePage";
import GeneratorPage from "./pages/GeneratorPage";
import LoadingAnimation from "./pages/LoadingAnimation";
import BenAnalysis from "./pages/BenAnalysis";
import English2ndRouter from "./pages/English2ndRouter";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import LandingPage from "./pages/LandingPage";

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration/>} />
        <Route path="/generator/:type" element={<GeneratorPage />} />
        <Route
          path="generator/english-2nd/:topic"
          element={<English2ndRouter />}
        />
        <Route path="/generating/:percentage" element={<LoadingAnimation />} />
        <Route path="/benanalysis" element={<BenAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
