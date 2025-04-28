// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file
import Header from "./Components/Schedule/Header";
import Footer from "./Components/Schedule/Footer";
//import WorkoutForm from "./Components/Workout/WorkoutForm"; // Ensure the path is correct
//import WorkoutList from "./Components/Workout/WorkoutList"; // Ensure the path is correct

function App() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch all workout plans on component mount
  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

  const fetchWorkoutPlans = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/workout");
      setWorkoutPlans(response.data);
    } catch (error) {
      console.error("Error fetching workout plans:", error);
    }
  };

  const addWorkoutPlan = async (newPlan) => {
    try {
      await axios.post("http://localhost:3000/api/workout", newPlan);
      fetchWorkoutPlans(); // Refresh the list after adding
    } catch (error) {
      console.error("Error adding workout plan:", error);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="main-content">
        <h1 style={{ color: "#FFA500" }}>Workout Plan Manager</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: "#FFA500",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          {showForm ? "Hide Form" : "Add New Workout Plan"}
        </button>

        {/* Workout Form */}
        {showForm && <WorkoutForm onSubmit={addWorkoutPlan} />}

        {/* Workout List */}
        <WorkoutList workoutPlans={workoutPlans} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
