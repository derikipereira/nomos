import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ReceiptProvider } from "./context/ReceiptContext";
import { ProfileProvider } from "./context/ProfileContext";

function App() {
  return (
    <ProfileProvider>
      <ReceiptProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ReceiptProvider>
    </ProfileProvider>
  );
}

export default App;
