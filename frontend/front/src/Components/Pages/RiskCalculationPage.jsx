import React from "react";
import Header from "../Schedule/Header"; // Import Header component
import Footer from "../Schedule/Footer"; // Import Footer component
import RiskCalculation from "./RiskCalculation"; // Import RiskCalculation component
import "./RiskCalculation.css";

const RiskCalculationPage = () => {
  return (
    <div className="risk-calculation-page">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <RiskCalculation />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RiskCalculationPage;