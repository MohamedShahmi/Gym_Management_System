import React, { useState } from "react";
import "./RiskCalculation.css"; // Import CSS for styling

const RiskCalculation = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    cholesterolLevel: "",
    sugarLevel: "",
    pressureLevel: "",
    workoutPlan: "",
  });
  const [riskLevel, setRiskLevel] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateRisk = () => {
    const {
      age,
      weight,
      height,
      cholesterolLevel,
      sugarLevel,
      pressureLevel,
      workoutPlan,
    } = formData;

    // Example Risk Calculation Equation
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2); // BMI Calculation
    const cholesterolScore = cholesterolLevel === "High" ? 3 : cholesterolLevel === "Medium" ? 2 : 1;
    const sugarScore = sugarLevel === "High" ? 3 : sugarLevel === "Medium" ? 2 : 1;
    const pressureScore = pressureLevel === "High" ? 3 : pressureLevel === "Medium" ? 2 : 1;
    const workoutScore = workoutPlan === "Climbers" ? 1 : workoutPlan === "Weight Lift" ? 2 : 3;

    const totalRisk = parseFloat(age) + parseFloat(bmi) + cholesterolScore + sugarScore + pressureScore + workoutScore;

    if (totalRisk <= 10) {
      setRiskLevel("Low");
    } else if (totalRisk > 10 && totalRisk <= 20) {
      setRiskLevel("Medium");
    } else {
      setRiskLevel("High");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateRisk();
  };

  return (
    <div className="risk-calculation-container">
      <h2>Risk Calculation Form</h2>

      {!riskLevel ? (
        <form onSubmit={handleSubmit} className="risk-form">
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
          </div>

          {/* Age */}
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          {/* Weight */}
          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>

          {/* Height */}
          <div className="form-group">
            <label>Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>

          {/* Cholesterol Level */}
          <div className="form-group">
            <label>Cholesterol Level</label>
            <select name="cholesterolLevel" value={formData.cholesterolLevel} onChange={handleChange} required>
              <option value="">Select Level</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Sugar Level */}
          <div className="form-group">
            <label>Sugar Level</label>
            <select name="sugarLevel" value={formData.sugarLevel} onChange={handleChange} required>
              <option value="">Select Level</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Pressure Level */}
          <div className="form-group">
            <label>Pressure Level</label>
            <select name="pressureLevel" value={formData.pressureLevel} onChange={handleChange} required>
              <option value="">Select Level</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Workout Plan */}
          <div className="form-group">
            <label>Workout Plan</label>
            <select name="workoutPlan" value={formData.workoutPlan} onChange={handleChange} required>
              <option value="">Select Plan</option>
              <option value="Climbers">Climbers</option>
              <option value="Weight Lift">Weight Lift</option>
              <option value="Cardio">Cardio</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="form-button">
            Calculate Risk
          </button>
        </form>
      ) : (
        <div className="risk-result">
          <h3>Risk Level: {riskLevel}</h3>
        </div>
      )}
    </div>
  );
};

export default RiskCalculation;