import { BrowserRouter, Routes, Route } from "react-router"; // Changed from 'react-router-dom'
import HomePage from "./pages/HomePage";
import GeneratorPage from "./pages/GeneratorPage";
import LoadingAnimation from "./pages/LoadingAnimation";
import BenAnalysis from "./pages/BenAnalysis";
import English2ndRouter from "./pages/English2ndRouter";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import TagQuestionLesson from "./pages/English-2nd/TagQuestionLesson";

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration/>} />
        <Route path='/user/:user_id' element={<Profile/>} />
        <Route path="/generator/:type" element={<GeneratorPage />} />
        <Route
          path="generator/english-2nd/:topic"
          element={<English2ndRouter />}
        />
        <Route path="/learn/english-2nd/tag-questions" element={<TagQuestionLesson/>} />
        <Route path="/generating/:percentage" element={<LoadingAnimation />} />
        <Route path="/benanalysis" element={<BenAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
