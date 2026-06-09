import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import InstrumentsPage from "./pages/InstrumentsPage";
import FaqPage from "./pages/FaqPage";
import SosPage from "./pages/SosPage";
import VerificationCenter from "./pages/VerificationCenter";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CoursesPage from "./pages/CoursesPage";
import LearningPage from "./pages/LearningPage";
import GamifiedPage from "./pages/GamifiedPage";
import MarketplacePage from "./pages/MarketplacePage";
import Profile from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/check" element={<MainLayout><VerificationCenter /></MainLayout>} />
        <Route path="/marketplace" element={<MainLayout><MarketplacePage /></MainLayout>} />
        <Route path="/education" element={<MainLayout><LearningPage /></MainLayout>} />
        <Route path="/instruments" element={<MainLayout><InstrumentsPage /></MainLayout>} />
        <Route path="/faq" element={<MainLayout><FaqPage /></MainLayout>} />
        <Route path="/sos" element={<MainLayout><SosPage /></MainLayout>} />
        <Route path="/mycourses" element={<MainLayout><CoursesPage /></MainLayout>} />
        <Route path="/gamified" element={<MainLayout><GamifiedPage /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;