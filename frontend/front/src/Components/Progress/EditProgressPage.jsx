import React from "react";
import Header from "../Schedule/Header";
import Footer from "../Schedule/Footer";
import ProgressForm from "./ProgressForm";
import "./ProgressPage.css";

const EditProgressPage = () => {
  return (
    <div className="progress-page">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="main-content">
        <ProgressForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EditProgressPage;
