// src/Components/Schedule/UpFormPage.jsx
import React from "react";
import Header from "./Header"; // Import the Header component
import Footer from "./Footer"; // Import the Footer component
import UpdateSchedule from "./UpdateSchedule"; // Import the UpdateSchedule form

const UpFormPage = () => {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        
        <UpdateSchedule />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UpFormPage;