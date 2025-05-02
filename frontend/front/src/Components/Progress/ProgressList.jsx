import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProgressList.css";

const ProgressList = () => {
  const [progressEntries, setProgressEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all progress entries
  const fetchProgressEntries = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/progress");
      setProgressEntries(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching progress entries:", err);
      setError("Failed to load progress entries.");
      setLoading(false);
    }
  };

  // Delete a progress entry by ID
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this progress entry?")) {
      try {
        await axios.delete(`http://localhost:3000/api/progress/${id}`);
        // Remove the deleted entry from the state
        setProgressEntries((prevEntries) =>
          prevEntries.filter((entry) => entry._id !== id)
        );
      } catch (err) {
        console.error("Error deleting progress entry:", err);
        alert("Failed to delete progress entry.");
      }
    }
  };

  // Fetch progress entries on component mount
  useEffect(() => {
    fetchProgressEntries();
  }, []);

  // Render loading or error states
  if (loading) return <p>Loading progress entries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="progress-list-container">
      <h2>My Fitness Progress</h2>
      <Link to="/progress/add" className="add-progress-btn">
        Add New Progress
      </Link>

      {progressEntries.length === 0 ? (
        <p>No progress entries available. Start tracking your fitness journey!</p>
      ) : (
        <div className="progress-entries">
          {progressEntries.map((entry) => (
            <div key={entry._id} className="progress-card">
              <div className="progress-header">
                <h3>{entry.workoutType}</h3>
                <span className="progress-date">{new Date(entry.date).toLocaleDateString()}</span>
              </div>
              <div className="progress-details">
                <p><strong>Duration:</strong> {entry.duration} minutes</p>
                <p><strong>Calories:</strong> {entry.caloriesBurned} cal</p>
                <p><strong>Notes:</strong> {entry.notes}</p>
              </div>
              <div className="progress-actions">
                <Link to={`/progress/edit/${entry._id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(entry._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressList;
