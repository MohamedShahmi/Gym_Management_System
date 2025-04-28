// src/Components/Schedule/ScheduleTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ScheduleTable.css"; // Import CSS for styling
import { Link } from "react-router-dom"; // Import Link component

const ScheduleTable = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all schedules from the backend
  const fetchSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/schedules");
      setSchedules(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching schedules:", err);
      setError("Failed to load schedules.");
      setLoading(false);
    }
  };

  // Delete a schedule by ID
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      try {
        await axios.delete(`http://localhost:3000/api/schedules/${id}`);
        // Remove the deleted schedule from the state
        setSchedules((prevSchedules) =>
          prevSchedules.filter((schedule) => schedule._id !== id)
        );
      } catch (err) {
        console.error("Error deleting schedule:", err);
        alert("Failed to delete schedule.");
      }
    }
  };

  // Fetch schedules on component mount
  useEffect(() => {
    fetchSchedules();
  }, []);

  // Render loading or error states
  if (loading) return <p>Loading schedules...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="schedule-table-container">
      <h2>FitPro Schedules List</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Session ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Trainer</th>
            <th>Member</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule._id}>
              <td>{schedule.sessionID}</td>
              <td>{schedule.sessionTitle}</td>
              <td>{schedule.sessionType}</td>
              <td>{new Date(schedule.date).toLocaleDateString()}</td>
              <td>{schedule.startTime}</td>
              <td>{schedule.endTime}</td>
              <td>{schedule.trainerName}</td>
              <td>{schedule.memberName}</td>
              <td>{schedule.status}</td>
              <td>
                <Link to={`/update-schedule/${schedule._id}`}>
                  <button className="btn-update">Update</button>
                </Link>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(schedule._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;