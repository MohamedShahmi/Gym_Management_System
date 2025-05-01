import React, { useState } from "react";
import html2pdf from "html2pdf.js";
import "./WorkoutForm.css";

const predefinedWorkouts = {
  "Weight Loss": {
    Beginner: {
      "3 Days/Week": [
        { exerciseName: "Squats", sets: 3, restTime: 60 },
        { exerciseName: "Push-ups", sets: 3, restTime: 60 },
        { exerciseName: "Plank", sets: 3, restTime: 30 },
      ],
      "5 Days/Week": [
        { exerciseName: "Jumping Jacks", sets: 4, restTime: 60 },
        { exerciseName: "Lunges", sets: 4, restTime: 60 },
        { exerciseName: "Burpees", sets: 4, restTime: 90 },
      ],
    },
    Intermediate: {
      "3 Days/Week": [
        { exerciseName: "Deadlifts", sets: 4, restTime: 90 },
        { exerciseName: "Bench Press", sets: 4, restTime: 90 },
        { exerciseName: "Pull-ups", sets: 3, restTime: 60 },
      ],
      "5 Days/Week": [
        { exerciseName: "Barbell Rows", sets: 4, restTime: 90 },
        { exerciseName: "Overhead Press", sets: 4, restTime: 90 },
        { exerciseName: "Dips", sets: 3, restTime: 60 },
      ],
    },
    Advanced: {
      "3 Days/Week": [
        { exerciseName: "Power Cleans", sets: 5, restTime: 120 },
        { exerciseName: "Pistol Squats", sets: 4, restTime: 90 },
        { exerciseName: "Muscle-ups", sets: 4, restTime: 90 },
      ],
      "5 Days/Week": [
        { exerciseName: "Snatch", sets: 5, restTime: 120 },
        { exerciseName: "Clean and Jerk", sets: 5, restTime: 120 },
        { exerciseName: "Box Jumps", sets: 4, restTime: 60 },
      ],
    },
  },
  "Muscle Gain": {
    Beginner: {
      "3 Days/Week": [
        { exerciseName: "Goblet Squats", sets: 3, restTime: 60 },
        { exerciseName: "Incline Push-ups", sets: 3, restTime: 60 },
        { exerciseName: "Side Plank", sets: 3, restTime: 30 },
      ],
      "5 Days/Week": [
        { exerciseName: "Kettlebell Swings", sets: 4, restTime: 60 },
        { exerciseName: "Step-ups", sets: 4, restTime: 60 },
        { exerciseName: "Mountain Climbers", sets: 4, restTime: 90 },
      ],
    },
    Intermediate: {
      "3 Days/Week": [
        { exerciseName: "Front Squats", sets: 4, restTime: 90 },
        { exerciseName: "Close-grip Bench Press", sets: 4, restTime: 90 },
        { exerciseName: "Chin-ups", sets: 3, restTime: 60 },
      ],
      "5 Days/Week": [
        { exerciseName: "Romanian Deadlifts", sets: 4, restTime: 90 },
        { exerciseName: "Arnold Press", sets: 4, restTime: 90 },
        { exerciseName: "Ring Dips", sets: 3, restTime: 60 },
      ],
    },
    Advanced: {
      "3 Days/Week": [
        { exerciseName: "Barbell Back Squats", sets: 5, restTime: 120 },
        { exerciseName: "Incline Bench Press", sets: 5, restTime: 90 },
        { exerciseName: "Weighted Pull-ups", sets: 4, restTime: 90 },
      ],
      "5 Days/Week": [
        { exerciseName: "Split Squats", sets: 4, restTime: 90 },
        { exerciseName: "Military Press", sets: 4, restTime: 90 },
        { exerciseName: "Cable Crossovers", sets: 4, restTime: 60 },
      ],
    },
  },
  "Increasing Flexibility": {
    Beginner: {
      "3 Days/Week": [
        { exerciseName: "Neck Stretch", sets: 2, restTime: 30 },
        { exerciseName: "Shoulder Rolls", sets: 2, restTime: 30 },
        { exerciseName: "Standing Toe Touch", sets: 2, restTime: 30 },
      ],
      "5 Days/Week": [
        { exerciseName: "Seated Forward Bend", sets: 3, restTime: 30 },
        { exerciseName: "Cat-Cow Stretch", sets: 3, restTime: 30 },
        { exerciseName: "Butterfly Stretch", sets: 3, restTime: 30 },
      ],
    },
    Intermediate: {
      "3 Days/Week": [
        { exerciseName: "Pigeon Pose", sets: 3, restTime: 45 },
        { exerciseName: "Lizard Pose", sets: 3, restTime: 45 },
        { exerciseName: "Side Lunges", sets: 3, restTime: 30 },
      ],
      "5 Days/Week": [
        { exerciseName: "Standing Quad Stretch", sets: 4, restTime: 30 },
        { exerciseName: "Hamstring Stretch", sets: 4, restTime: 30 },
        { exerciseName: "Triceps Stretch", sets: 4, restTime: 30 },
      ],
    },
    Advanced: {
      "3 Days/Week": [
        { exerciseName: "Split Stretches", sets: 4, restTime: 60 },
        { exerciseName: "Bridge Pose", sets: 4, restTime: 60 },
        { exerciseName: "Backbend to Wheel Pose", sets: 3, restTime: 90 },
      ],
      "5 Days/Week": [
        { exerciseName: "Advanced Hamstring Stretch", sets: 4, restTime: 60 },
        { exerciseName: "Full Pigeon with Forward Bend", sets: 4, restTime: 60 },
        { exerciseName: "Scorpion Stretch", sets: 4, restTime: 60 },
      ],
    },
  },
};


const WorkoutForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      fitnessGoal: "",
      level: "",
      duration: "",
      frequency: "",
      assignedTrainer: "",
      exercises: [],
    }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...formData.exercises];
    updatedExercises[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      exercises: updatedExercises,
    }));
    validateExerciseField(index, field, value);
  };

  const addExerciseField = () => {
    setFormData((prevData) => ({
      ...prevData,
      exercises: [...prevData.exercises, { exerciseName: "", sets: "", restTime: "" }],
    }));
  };

  const generateExercises = () => {
    const { fitnessGoal, level, frequency } = formData;
    const selectedPlan = predefinedWorkouts[fitnessGoal]?.[level]?.[frequency];

    if (!selectedPlan) {
      alert("No matching workout plan found. Please select valid options.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      exercises: selectedPlan,
    }));
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    switch (name) {
      case "name":
        if (!value) newErrors[name] = "Name is required.";
        else if (value.length < 3) newErrors[name] = "Name must be at least 3 characters.";
        else delete newErrors[name];
        break;
      case "fitnessGoal":
        if (!value) newErrors[name] = "Fitness goal is required.";
        else delete newErrors[name];
        break;
      case "level":
        if (!value) newErrors[name] = "Level is required.";
        else delete newErrors[name];
        break;
      case "duration":
        if (!value) newErrors[name] = "Duration is required.";
        else if (isNaN(value) || value <= 0) newErrors[name] = "Duration must be a positive number.";
        else delete newErrors[name];
        break;
      case "frequency":
        if (!value) newErrors[name] = "Frequency is required.";
        else delete newErrors[name];
        break;
      case "assignedTrainer":
        if (!value) newErrors[name] = "Assigned trainer is required.";
        else delete newErrors[name];
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    let newErrors = {};

    // Validate form fields
    ["name", "fitnessGoal", "level", "duration", "frequency", "assignedTrainer"].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        isValid = false;
      }
    });

    // Validate exercises
    formData.exercises.forEach((exercise, index) => {
      if (!exercise.exerciseName) {
        newErrors[`exercise-${index}-exerciseName`] = "Exercise name is required.";
        isValid = false;
      }
      if (!exercise.sets || isNaN(exercise.sets) || exercise.sets <= 0) {
        newErrors[`exercise-${index}-sets`] = "Sets must be a positive number.";
        isValid = false;
      }
      if (!exercise.restTime || isNaN(exercise.restTime) || exercise.restTime <= 0) {
        newErrors[`exercise-${index}-restTime`] = "Rest time must be a positive number.";
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit(formData); // Call the onSubmit prop
      setFormData({
        name: "",
        fitnessGoal: "",
        level: "",
        duration: "",
        frequency: "",
        assignedTrainer: "",
        exercises: [],
      });
      setErrors({});
      alert("✅ Workout plan created/updated successfully!");
    } catch (error) {
      console.error("Error details:", error);
      alert("❌ Error: " + (error.response?.data?.message || error.message || "Unknown error"));
    }
  };

  const generatePDF = () => {
    const pdfContent = document.createElement("div");
    pdfContent.innerHTML = `
      <h2>Workout Plan Report</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Fitness Goal:</strong> ${formData.fitnessGoal}</p>
      <p><strong>Level:</strong> ${formData.level}</p>
      <p><strong>Duration:</strong> ${formData.duration} days</p>
      <p><strong>Frequency:</strong> ${formData.frequency}</p>
      <p><strong>Assigned Trainer:</strong> ${formData.assignedTrainer}</p>
      <h3>Exercises:</h3>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Rest Time</th>
          </tr>
        </thead>
        <tbody>
          ${formData.exercises.map((exercise) => `
            <tr>
              <td>${exercise.exerciseName}</td>
              <td>${exercise.sets}</td>
              <td>${exercise.restTime} sec</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;

    const options = {
      margin: 10,
      filename: `${formData.name}-workout-plan.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(pdfContent).set(options).save();
  };


  return (
    <div className="form-container">
      <h2 className="form-title">Create/Edit Workout Plan</h2>

      {/* Display form-wide errors */}
      {Object.values(errors).length > 0 && (
        <div className="error-text">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        {/* Name */}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        {/* Fitness Goal */}
        <div className="form-group">
          <label>Fitness Goal</label>
          <select
            name="fitnessGoal"
            value={formData.fitnessGoal}
            onChange={handleChange}
            required
          >
            <option value="">Select Goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Increasing Flexibility">Increasing Flexibility</option>
          </select>
          {errors.fitnessGoal && <p className="error-text">{errors.fitnessGoal}</p>}
        </div>

        {/* Level */}
        <div className="form-group">
          <label>Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            
          </select>
          {errors.level && <p className="error-text">{errors.level}</p>}
        </div>

        {/* Duration */}
        <div className="form-group">
          <label>Duration (days)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
          {errors.duration && <p className="error-text">{errors.duration}</p>}
        </div>

        {/* Frequency */}
        <div className="form-group">
          <label>Frequency</label>
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
          >
            <option value="">Select Frequency</option>
            <option value="3 Days/Week">3 Days/Week</option>
            <option value="5 Days/Week">5 Days/Week</option>
          </select>
          {errors.frequency && <p className="error-text">{errors.frequency}</p>}
        </div>

        {/* Assigned Trainer */}
        <div className="form-group">
          <label>Assigned Trainer</label>
          <input
            type="text"
            name="assignedTrainer"
            value={formData.assignedTrainer}
            onChange={handleChange}
            required
          />
          {errors.assignedTrainer && <p className="error-text">{errors.assignedTrainer}</p>}
        </div>

        {/* Generate Exercises Button */}
        <button
          type="button"
          onClick={generateExercises}
          style={{
            backgroundColor: "#FFA500",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
            width: "100%",
          }}
        >
          Generate Exercises
        </button>

        {/* Exercises */}
        <h3>Exercises:</h3>
        {formData.exercises.map((exercise, index) => (
          <div key={index}>
            <label>
              Exercise Name:
              <input
                type="text"
                value={exercise.exerciseName}
                onChange={(e) => handleExerciseChange(index, "exerciseName", e.target.value)}
                required
              />
              {errors[`exercise-${index}-exerciseName`] && (
                <p className="error-text">{errors[`exercise-${index}-exerciseName`]}</p>
              )}
            </label>
            <label>
              Sets:
              <input
                type="number"
                value={exercise.sets}
                onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
                required
              />
              {errors[`exercise-${index}-sets`] && (
                <p className="error-text">{errors[`exercise-${index}-sets`]}</p>
              )}
            </label>
            <label>
              Rest Time (seconds):
              <input
                type="number"
                value={exercise.restTime}
                onChange={(e) => handleExerciseChange(index, "restTime", e.target.value)}
                required
              />
              {errors[`exercise-${index}-restTime`] && (
                <p className="error-text">{errors[`exercise-${index}-restTime`]}</p>
              )}
            </label>
          </div>
        ))}

        {/* Buttons */}
        <button
          type="button"
          onClick={generatePDF}
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
            width: "100%",
          }}
        >
          Generate Report (PDF)
        </button>
        <button
          type="button"
          onClick={addExerciseField}
          style={{
            backgroundColor: "#28A745",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
            width: "100%",
          }}
        >
          Add Exercise
        </button>
        <button
          type="submit"
          className="form-button"
          style={{
            backgroundColor: "#DC3545",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
            width: "100%",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;