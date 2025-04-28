import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Header from "./Header"; 
import Footer from "./Footer";
import "./GenerateReportForm.css";

const GenerateReportForm = () => {
  const [sessionID, setSessionID] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch schedule data by sessionID
      const response = await axios.get(
        `http://localhost:3000/api/schedules/session/${sessionID}`
      );
      const schedule = response.data;

      if (!schedule) {
        setError("No schedule found with the given Session ID.");
        return;
      }

      // Generate PDF
      generatePDF(schedule);

      // Reset form
      setSessionID("");
      setError("");
    } catch (err) {
      console.error("Error fetching schedule:", err);
      setError("Failed to fetch schedule data.");
    }
  };

  const generatePDF = (schedule) => {
    const doc = new jsPDF();

    // Add title and logo
    doc.setFontSize(18);
    doc.text("FitPro Gym Management", 14, 20);

    // Check if the logo exists before adding it
    try {
      doc.addImage("src/assets/logo.png", "PNG", 170, 10, 30, 30); // Adjust path to your logo
    } catch (imageError) {
      console.error("Error adding logo:", imageError);
    }

    // Add schedule details
    doc.setFontSize(14);
    doc.text(`Session ID: ${schedule.sessionID}`, 14, 40);
    doc.text(`Title: ${schedule.sessionTitle}`, 14, 50);
    doc.text(`Type: ${schedule.sessionType}`, 14, 60);
    doc.text(`Date: ${new Date(schedule.date).toLocaleDateString()}`, 14, 70);
    doc.text(`Start Time: ${schedule.startTime}`, 14, 80);
    doc.text(`End Time: ${schedule.endTime}`, 14, 90);
    doc.text(`Trainer: ${schedule.trainerName}`, 14, 100);
    doc.text(`Member: ${schedule.memberName}`, 14, 110);
    doc.text(`Status: ${schedule.status}`, 14, 120);

    // Save PDF
    doc.save(`FitPro_Report_${schedule.sessionID}.pdf`);
  };

  return (
    <div className="report-form-container">
    
      <h2>Generate Report</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Session ID</label>
          <input
            type="text"
            value={sessionID}
            onChange={(e) => setSessionID(e.target.value)}
            placeholder="Enter Session ID"
            required
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="form-button">
          Generate Report
        </button>
      </form>
      
    </div>
  );
};

export default GenerateReportForm;