import React, { useState } from "react";
import "./WorkoutForm.css"; // Import CSS for styling

// Predefined workout plans
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

    // Find the matching predefined workout plan
    const selectedPlan =
      predefinedWorkouts[fitnessGoal]?.[level]?.[frequency];

    if (!selectedPlan) {
      alert("No matching workout plan found. Please select valid options.");
      return;
    }

    // Set the generated workout plan
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

    // Validate all fields before submission
    let isValid = true;
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
      isValid = false;
    }

    if (!formData.fitnessGoal) {
      newErrors.fitnessGoal = "Fitness goal is required.";
      isValid = false;
    }

    if (!formData.level) {
      newErrors.level = "Level is required.";
      isValid = false;
    }

    if (!formData.duration) {
      newErrors.duration = "Duration is required.";
      isValid = false;
    } else if (isNaN(formData.duration) || formData.duration <= 0) {
      newErrors.duration = "Duration must be a positive number.";
      isValid = false;
    }

    if (!formData.frequency) {
      newErrors.frequency = "Frequency is required.";
      isValid = false;
    }

    if (!formData.assignedTrainer) {
      newErrors.assignedTrainer = "Assigned trainer is required.";
      isValid = false;
    }

    formData.exercises.forEach((exercise, index) => {
      if (!exercise.exerciseName) {
        newErrors[`exercise-${index}-exerciseName`] = "Exercise name is required.";
        isValid = false;
      }
      if (!exercise.sets) {
        newErrors[`exercise-${index}-sets`] = "Sets is required.";
        isValid = false;
      } else if (isNaN(exercise.sets) || exercise.sets <= 0) {
        newErrors[`exercise-${index}-sets`] = "Sets must be a positive number.";
        isValid = false;
      }
      if (!exercise.restTime) {
        newErrors[`exercise-${index}-restTime`] = "Rest time is required.";
        isValid = false;
      } else if (isNaN(exercise.restTime) || exercise.restTime <= 0) {
        newErrors[`exercise-${index}-restTime`] = "Rest time must be a positive number.";
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log("Submitting form data:", formData); // Debugging log
      if (typeof onSubmit === "function") {
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
      } else {
        console.error("onSubmit is not a function");
        alert("❌ Error: onSubmit is not a function");
      }
    } catch (error) {
      console.error("Error details:", error); // Log full error for debugging
      alert("❌ Error: " + (error.response?.data?.message || error.message || "Unknown error"));
    }
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
                onChange={(e) =>
                  handleExerciseChange(index, "exerciseName", e.target.value)
                }
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
                onChange={(e) =>
                  handleExerciseChange(index, "sets", e.target.value)
                }
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
                onChange={(e) =>
                  handleExerciseChange(index, "restTime", e.target.value)
                }
                required
              />
              {errors[`exercise-${index}-restTime`] && (
                <p className="error-text">{errors[`exercise-${index}-restTime`]}</p>
              )}
            </label>
          </div>
        ))}

        {/* Add Exercise Button */}
        <button
          type="button"
          onClick={addExerciseField}
          style={{
            backgroundColor: "#FFA500",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Add Exercise
        </button>

        {/* Submit Button */}
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;