// src/Components/WorkoutPlans/WorkoutList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkoutForm from "./WorkoutForm"; // Import the WorkoutForm component
import "./WorkoutList.css"; // Import CSS for styling

const WorkoutList = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // State to toggle the form
  const [selectedPlan, setSelectedPlan] = useState(null); // State to track selected plan for editing

  // Fetch all workout plans from the backend
  const fetchWorkoutPlans = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/workout");
      setWorkoutPlans(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching workout plans:", err);
      setError("Failed to load workout plans.");
      setLoading(false);
    }
  };

  // Add or update a workout plan
  const handleFormSubmit = async (newPlan) => {
    try {
      if (selectedPlan) {
        // Update existing workout plan
        await axios.put(`http://localhost:3000/api/workout/${selectedPlan._id}`, newPlan);
      } else {
        // Create a new workout plan
        await axios.post("http://localhost:3000/api/workout", newPlan);
      }
      fetchWorkoutPlans(); // Refresh the list after adding/updating
      setShowForm(false);
      setSelectedPlan(null); // Reset selected plan
    } catch (err) {
      console.error("Error submitting workout plan:", err);
      alert("Failed to submit workout plan.");
    }
  };

  // Delete a workout plan by ID
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout plan?")) {
      try {
        await axios.delete(`http://localhost:3000/api/workout/${id}`);
        setWorkoutPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== id));
      } catch (err) {
        console.error("Error deleting workout plan:", err);
        alert("Failed to delete workout plan.");
      }
    }
  };

  // Navigate to the form for updating a workout plan
  const handleUpdate = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/workout/${id}`);
      setSelectedPlan(response.data); // Set the selected plan for editing
      setShowForm(true); // Show the form
    } catch (err) {
      console.error("Error fetching workout plan details:", err);
      alert("Failed to load workout plan details.");
    }
  };

  // Fetch workout plans on component mount
  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

  // Render loading or error states
  if (loading) return <p>Loading workout plans...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="workout-list-container">
      <h2>Workout Plans List</h2>

      {/* Add New Workout Plan Button */}
      <button
        style={{
          backgroundColor: "#FFA500",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
        onClick={() => {
          setSelectedPlan(null); // Reset selected plan
          setShowForm(!showForm); // Toggle the form visibility
        }}
      >
        {showForm ? "Hide Form" : "Add New Workout Plan"}
      </button>

      {/* Display Workout Form */}
      {showForm && (
        <WorkoutForm
          onSubmit={handleFormSubmit}
          initialData={selectedPlan} // Pass the selected plan data for editing
        />
      )}

      {/* Display Workout Plans as Cards */}
      {workoutPlans.length === 0 ? (
        <p>No workout plans available.</p>
      ) : (
        <div className="workout-cards-container">
          {workoutPlans.map((plan) => (
            <div
              key={plan._id}
              className={`workout-card ${getCardClass(plan.level)}`}
            >
              <h3>{plan.name}</h3>
              <p><strong>Fitness Goal:</strong> {plan.fitnessGoal}</p>
              <p><strong>Level:</strong> {plan.level}</p>
              <p><strong>Duration:</strong> {plan.duration} days</p>
              <p><strong>Frequency:</strong> {plan.frequency}</p>
              <p><strong>Assigned Trainer:</strong> {plan.assignedTrainer}</p>
              <h4>Exercises:</h4>
              <ul>
                {plan.exercises.map((exercise, index) => (
                  <li key={index}>
                    {exercise.exerciseName} - {exercise.sets} sets, {exercise.restTime} sec rest
                  </li>
                ))}
              </ul>
              <div className="card-actions">
                <button
                  className="btn-update"
                  onClick={() => handleUpdate(plan._id)} // Handle update
                >
                  Update
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(plan._id)}
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

// Helper function to determine the card class based on the level
const getCardClass = (level) => {
  switch (level) {
    case "Beginner":
      return "card-beginner";
    case "Intermediate":
      return "card-medium";
    case "Advanced":
      return "card-advanced";
    default:
      return "";
  }
};

export default WorkoutList;