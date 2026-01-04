import { BrowserRouter, Routes, Route } from 'react-router'; // Changed from 'react-router-dom'
import HomePage from './pages/HomePage';
import GeneratorPage from './pages/GeneratorPage';
import LoadingAnimation from './pages/GenLoadingAnimation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generator/:type" element={<GeneratorPage />} />
        <Route path="/generating/:percentage" element={<LoadingAnimation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;