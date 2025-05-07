import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import NewReceipt from './pages/NewReceipt';
import ReceiptHistory from './pages/ReceiptHistory';
import Profile from './pages/Profile';
import { ReceiptProvider } from './context/ReceiptContext';
import { ProfileProvider } from './context/ProfileContext';

function App() {
  return (
    <ProfileProvider>
      <ReceiptProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/precos" element={<Pricing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/novo-recibo" element={<NewReceipt />} />
                <Route path="/historico" element={<ReceiptHistory />} />
                <Route path="/perfil" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ReceiptProvider>
    </ProfileProvider>
  );
}

export default App;