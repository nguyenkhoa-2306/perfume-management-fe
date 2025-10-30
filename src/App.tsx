import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PerfumeDetail from "./pages/PerfumeDetail";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="bg-gray-50">
      {!isLoginPage && <Header />}
      <div className={!isLoginPage ? "w-full" : ""}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/perfume/:id" element={<PerfumeDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default App;
