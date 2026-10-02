import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Psicografias from "./pages/Psicografias";
import Oracoes from "./pages/Oracoes";
import Livraria from "./pages/Livraria";
import { useAnalyticsPageview } from "./hooks/useAnalyticsPageview";

function App() {
  useAnalyticsPageview();

  return (
    <div className="min-h-screen bg-paper-50">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/psicografias" element={<Psicografias />} />
        <Route path="/oracoes" element={<Oracoes />} />
        <Route path="/livraria" element={<Livraria />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
