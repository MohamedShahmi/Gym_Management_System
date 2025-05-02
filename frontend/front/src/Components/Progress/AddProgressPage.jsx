import React from "react";
import Header from "../Schedule/Header";
import Footer from "../Schedule/Footer";
import ProgressForm from "./ProgressForm";
import "./ProgressPage.css";

const AddProgressPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-4">
        <ProgressForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddProgressPage;
