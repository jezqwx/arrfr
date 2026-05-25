import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import InstrumentsPage from "./pages/InstrumentsPage";
import FaqPage from "./pages/FaqPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/check" element={<div>Центр проверки</div>} />
          <Route path="/marketplace" element={<div>Маркетплейс</div>} />
          <Route path="/education" element={<div>Обучение</div>} />
          <Route path="/instruments" element={<InstrumentsPage />} />
          <Route path="/faq" element={<FaqPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;