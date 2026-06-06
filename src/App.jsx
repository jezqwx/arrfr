import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import InstrumentsPage from "./pages/InstrumentsPage";
import FaqPage from "./pages/FaqPage";
import SosPage from "./pages/SosPage";
import VerificationCenter from "./pages/VerificationCenter";
import LearningPage from "./pages/LearningPage";
import GamifiedPage from "./pages/GamifiedPage";
import CoursePage from "./pages/CoursePage";


function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/check" element={<VerificationCenter />} />
          <Route path="/marketplace" element={<div>Маркетплейс</div>} />
          <Route path="/education" element={<LearningPage />} />
          <Route path="/instruments" element={<InstrumentsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/sos" element={<SosPage />} />
          <Route path="/gamified" element={<GamifiedPage />} />
          <Route path="/course" element={<CoursePage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;