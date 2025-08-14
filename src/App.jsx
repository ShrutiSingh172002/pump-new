import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SalesContainer from "./Website/SalesContainer";
import EnergySavingExpertise from "./Website/EnergySavingExpertise";
import ReliableRebuilds from "./Website/ReliableRebuilds";
import PrecisionPumpRepair from "./Website/PrecisionPumpRepair";
import ReverseEngineeringPage from "./Website/ReverseEngineeringPage";
import EnergySavingPage from "./Website/EnergySavingPage";
import EnergyAudit from "./Website/EnergyAudit";
import InventoryMinimization from "./Website/InventoryMinimization";
import LoginRegister from "./Website/LoginRegister";
import UserProfile from "./Website/UserProfile";
import AboutUs from "./Website/AboutUs";
import ContactUs from "./Website/ContactUs";
import PumpPartsForm from "./Website/PumpPartsForm";
import TermsConditions from "./Website/TermsConditions";
import PrivacyPolicy from "./Website/PrivacyPolicy";
import Products from "./Website/Products";
import Services from "./Website/Services";
import PumpSpares from "./Website/PumpSpares";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalesContainer />} />
        <Route
          path="/energy-saving-expertise"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/reliable-rebuilds"
          element={<Navigate to="/services" replace />}
        />
        <Route
          path="/precision-pump-repair"
          element={<Navigate to="/Products" replace />}
        />
        <Route
          path="/reverse-engineering"
          element={<Navigate to="/Products" replace />}
        />
        <Route path="/energy-saving" element={<EnergySavingPage />} />
        <Route path="/energy-audit" element={<EnergyAudit />} />
        <Route path="/inventory-minimization" element={<InventoryMinimization/>}/>
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/pump-parts" element={<PumpPartsForm />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pump-spares" element={<PumpSpares />} />
      </Routes>
    </Router>
  );
}

export default App;
