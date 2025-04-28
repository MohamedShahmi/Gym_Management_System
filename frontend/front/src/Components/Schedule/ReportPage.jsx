import React from "react";
import Header from "./Header"; // Import the Header component
import Footer from "./Footer"; // Import the Footer component
import GenerateReportForm from "./GenerateReportForm"; // Import the GenerateReport component
//import "../Pages/HomePage.css"; // Correct path
import "./GenerateReportForm.css";
const ReportPage = () => {
  return (
    <div className="report-page">
      {/* Header */}
      <Header />
      {/* Main Content */}
  
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <GenerateReportForm/>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReportPage;