// src/Components/Schedule/UpFormPage.jsx
import React from "react";
import Header from "../Schedule/Header"; // Adjust path if needed
import Footer from "../Schedule/Footer";
import WorkoutList from "./WorkoutList";

const WorkoutListPage = () => {
  return (
    <div className="page-container">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="main-content">
        <WorkoutList />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WorkoutListPage;