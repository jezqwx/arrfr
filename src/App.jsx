import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import InstrumentsPage from "./pages/InstrumentsPage";
import FaqPage from "./pages/FaqPage";
import SosPage from "./pages/SosPage";
import VerificationCenter from "./pages/VerificationCenter";
import Profile from "./pages/Profile";
import RegisterPage from "./pages/RegisterPage";
import LoginPage    from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/check" element={<VerificationCenter />} />
          <Route path="/marketplace" element={<div>Маркетплейс</div>} />
          <Route path="/education" element={<div>Обучение</div>} />
          <Route path="/instruments" element={<InstrumentsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/sos" element={<SosPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login"    element={<LoginPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;