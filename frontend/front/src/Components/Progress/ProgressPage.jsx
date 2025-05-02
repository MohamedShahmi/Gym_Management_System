import React from "react";
import Header from "../Schedule/Header";
import Footer from "../Schedule/Footer";
import ProgressList from "./ProgressList";
import "./ProgressPage.css";

const ProgressPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-4">
        <ProgressList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProgressPage;
