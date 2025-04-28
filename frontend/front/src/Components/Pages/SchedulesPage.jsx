// src/Components/Pages/SchedulesPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import ScheduleTable from "../Schedule/ScheduleTable"; // Correct path
import Header from "../Schedule/Header"; // Correct path
import Footer from "../Schedule/Footer"; // Correct path
import "./SchedulesPage.css"; // Correct path

const SchedulesPage = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <ScheduleTable />
        <div className="button-container">
          <Link to="/form-page">
            <button className="btn-create">Create Schedule</button>
          </Link>
          <Link to="/generate-schedule-report">
            <button className="btn-create">Generate Report</button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SchedulesPage;