import { BrowserRouter, Routes, Route } from 'react-router'; // Changed from 'react-router-dom'
import HomePage from './pages/HomePage';
import GeneratorPage from './pages/GeneratorPage';
import LoadingAnimation from './pages/GenLoadingAnimation';
import BenGenerated from './pages/BenGenerated';
import BenAnalysis from './pages/BenAnalysis';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generator/:type" element={<GeneratorPage />} />
        <Route path="/generating/:percentage" element={<LoadingAnimation />} />
        <Route path='/bengenerated' element={<BenGenerated/>}/>
        <Route path='/benanalysis' element={<BenAnalysis/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;