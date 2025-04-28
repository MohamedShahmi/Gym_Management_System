// src/Components/Pages/HomePage.jsx
import React from "react";
import "./HomePage.css"; // Correct path
import Header from "../Schedule/Header"; // Correct path
import Footer from "../Schedule/Footer"; // Correct path

import gymScene from "../../assets/fitness.jpg";
const HomePage = () => {
  return (
    <div className="home-page"> {/* Add the 'home-page' class here */}
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="home-container">
        <div className="content-container">
          {/* Text Section */}
          <div className="text-section">
            <h1 className="welcome-title">Welcome to the</h1>
            <h1 className="gym-system-title">FitPro Gym Management System</h1>
            <p className="home-description">
              Elevate your fitness journey with our state-of-the-art Gym Management System. Designed for efficiency and ease, we empower you to seamlessly organize schedules, track progress, and achieve your goals. Experience the perfect blend of innovation and convenience, tailored to meet the needs of both trainers and members.
            </p>
          </div>

          {/* Image Section */}
        
            <img
              src={gymScene}
              alt="Gym Scene"
              className="gym-image"
            />
        
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;