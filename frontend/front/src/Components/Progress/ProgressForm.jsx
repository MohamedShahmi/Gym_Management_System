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

  if (loading) return <p className="text-center text-gray-600 text-xl mt-8">Loading progress entry data...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 my-8">
      <h2 className="text-2xl font-bold text-center text-[#800000] mb-6">
        {isEditMode ? "Edit Progress Entry" : "Add New Progress Entry"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Workout Type</label>
          <select
            name="workoutType"
            value={formData.workoutType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <div>
          <label className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            max="300"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Calories Burned</label>
          <input
            type="number"
            name="caloriesBurned"
            value={formData.caloriesBurned}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="How did you feel? What could be improved?"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
          >
            {isEditMode ? "Update Progress" : "Save Progress"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/progress")}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgressForm;
