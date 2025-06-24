import { Routes, Route, Outlet } from "react-router-dom";

// Componentes Públicos
import Home from "../pages/landing/Home";
import About from "../pages/landing/About";
import Contact from "../pages/landing/Contact";
import Login from "../pages/auth/Login";
import LandingContainer from "../pages/landing/LandingContainer";

// Componentes Privados (do Dashboard)
import Dashboard from "../pages/dashboard/Dashboard";
import NewReceipt from "../pages/dashboard/receipt/create/NewReceipt";
import ReceiptHistory from "../pages/dashboard/receipt/ReceiptHistory";
import Profile from "../pages/dashboard/Profile";

import ProtectedLayout from "./ProtectedLayaout";
import ClientsPage from "../pages/dashboard/customer/page";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={
        <LandingContainer>
          <Outlet />
        </LandingContainer>
      }>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/novo-recibo" element={<NewReceipt />} />
        <Route path="/clientes" element={<ClientsPage />} />
        <Route path="/historico" element={<ReceiptHistory />} />
        <Route path="/perfil" element={<Profile />} />
      </Route>

      <Route path="*" element={<h1>404: Página Não Encontrada</h1>} />
    </Routes>
  );
}