import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import EligibilityFinder from "./pages/EligibilityFinder";
import BudgetTools from "./pages/BudgetTools";
import Advice from "./pages/Advice";
import EducationHub from "./pages/EducationHub";
import ExpertConnect from "./pages/ExpertConnect";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eligibility" element={<EligibilityFinder />} />
          <Route path="/tools" element={<BudgetTools />} />
          <Route path="/advice" element={<Advice />} />
          <Route path="/learn" element={<EducationHub />} />
          <Route path="/connect" element={<ExpertConnect />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
