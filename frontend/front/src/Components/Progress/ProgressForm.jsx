import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProgressForm.css";

const ProgressForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    workoutType: "",
    duration: "",
    date: new Date().toISOString().split("T")[0],
    caloriesBurned: "",
    notes: "",
  });

  // Fetch progress entry data if in edit mode
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      setLoading(true);
      axios
        .get(`http://localhost:3000/api/progress/${id}`)
        .then((response) => {
          const entry = response.data;
          setFormData({
            ...entry,
            date: new Date(entry.date).toISOString().split("T")[0],
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching progress entry:", error);
          alert("Failed to load progress entry details.");
          setLoading(false);
          navigate("/progress");
        });
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // Update existing progress entry
        await axios.put(`http://localhost:3000/api/progress/${id}`, formData);
        alert("Progress entry updated successfully!");
      } else {
        // Create new progress entry
        await axios.post("http://localhost:3000/api/progress", formData);
        alert("Progress entry added successfully!");
      }
      navigate("/progress");
    } catch (error) {
      console.error("Error saving progress entry:", error);
      alert("Failed to save progress entry. Please try again.");
    }
  };

  if (loading) return <p>Loading progress entry data...</p>;

  return (
    <div className="progress-form-container">
      <h2>{isEditMode ? "Edit Progress Entry" : "Add New Progress Entry"}</h2>
      <form onSubmit={handleSubmit} className="progress-form">
        <div className="form-group">
          <label>Workout Type</label>
          <select
            name="workoutType"
            value={formData.workoutType}
            onChange={handleChange}
            required
          >
            <option value="">Select Workout Type</option>
            <option value="Cardio">Cardio</option>
            <option value="Weight Training">Weight Training</option>
            <option value="HIIT">HIIT</option>
            <option value="Yoga">Yoga</option>
            <option value="Swimming">Swimming</option>
            <option value="Running">Running</option>
            <option value="Walking">Walking</option>
            <option value="Cycling">Cycling</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            max="300"
            required
          />
        </div>

        <div className="form-group">
          <label>Calories Burned</label>
          <input
            type="number"
            name="caloriesBurned"
            value={formData.caloriesBurned}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="How did you feel? What could be improved?"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            {isEditMode ? "Update Progress" : "Save Progress"}
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/progress")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgressForm;
