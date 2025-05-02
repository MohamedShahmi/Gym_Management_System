import React from "react";
import Header from "../Schedule/Header";
import Footer from "../Schedule/Footer";
import ProgressList from "./ProgressList";
import "./ProgressPage.css";

const ProgressPage = () => {
  return (
    <div className="progress-page">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="main-content">
        <ProgressList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProgressPage;
