import { Routes, Route } from "react-router-dom";

import Home from "../pages/landing/Home";
import About from "../pages/landing/About";
import Contact from "../pages/landing/Contact";
import Pricing from "../pages/landing/Pricing";

import Dashboard from "../pages/dashboard/Dashboard";
import NewReceipt from "../pages/dashboard/receipt/create/NewReceipt";
import ReceiptHistory from "../pages/dashboard/receipt/ReceiptHistory";
import Profile from "../pages/dashboard/Profile";
import Login from "../pages/auth/Login";
import LandingContainer from "../pages/landing/LandingContainer";
import DashboardContainer from "../pages/dashboard/DashboardContainer";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Landing / Público */}
      <Route
        path="/"
        element={
          <LandingContainer>
            <Home />
          </LandingContainer>
        }
      />
      <Route
        path="/sobre"
        element={
          <LandingContainer>
            <About />
          </LandingContainer>
        }
      />
      <Route
        path="/contato"
        element={
          <LandingContainer>
            <Contact />
          </LandingContainer>
        }
      />
      <Route
        path="/precos"
        element={
          <LandingContainer>
            <Pricing />
          </LandingContainer>
        }
      />
      {/* Login / Público */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard / Privado */}
      <Route
        path="/dashboard"
        element={
          <DashboardContainer>
            <Dashboard />
          </DashboardContainer>
        }
      />
      <Route
        path="/novo-recibo"
        element={
          <DashboardContainer>
            <NewReceipt />
          </DashboardContainer>
        }
      />
      <Route
        path="/historico"
        element={
          <DashboardContainer>
            <ReceiptHistory />
          </DashboardContainer>
        }
      />
      <Route
        path="/perfil"
        element={
          <DashboardContainer>
            <Profile />
          </DashboardContainer>
        }
      />
    </Routes>
  );
}
