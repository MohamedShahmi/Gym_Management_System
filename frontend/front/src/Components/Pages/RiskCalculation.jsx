import React, { useState } from "react";
import "./RiskCalculation.css";

const RiskCalculation = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    cholesterolLevel: "",
    sugarLevel: "",
    pressureLevel: "",
    cardioSets: "0",
    weightliftSets: "0",
    climbersSets: "0",
    pushupsSets: "0",
    stretchesSets: "0",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "age",
      "weight",
      "height",
      "cholesterolLevel",
      "sugarLevel",
      "pressureLevel",
    ];
    const missing = requiredFields.filter((field) => !formData[field]);

    if (missing.length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const risk = calculateRisk(formData);
    setResult({
      ...formData,
      riskPercentage: risk.riskPercentage,
      riskCategory: risk.riskCategory,
    });
  };

  const calculateRisk = (data) => {
    const {
      age,
      weight,
      height,
      cholesterolLevel,
      sugarLevel,
      pressureLevel,
      cardioSets,
      weightliftSets,
      climbersSets,
      pushupsSets,
      stretchesSets,
    } = data;

    const bmi = weight / ((height / 100) ** 2);

    const totalSets =
      parseInt(cardioSets) +
      parseInt(weightliftSets) +
      parseInt(climbersSets) +
      parseInt(pushupsSets) +
      parseInt(stretchesSets);

    // Risk scores
    let riskScore = 0;

    // Health condition scores
    if (cholesterolLevel === "High") riskScore += 30;
    else if (cholesterolLevel === "Medium") riskScore += 15;

    if (sugarLevel === "High") riskScore += 30;
    else if (sugarLevel === "Medium") riskScore += 15;

    if (pressureLevel === "High") riskScore += 30;
    else if (pressureLevel === "Medium") riskScore += 15;

    // BMI
    if (bmi > 25) riskScore += 10;
    else if (bmi < 18.5) riskScore += 5;

    // Physical activity lowers risk
    if (totalSets >= 100) riskScore -= 20;
    else if (totalSets >= 60) riskScore -= 10;
    else if (totalSets >= 30) riskScore -= 5;

    // Young age benefit (slightly reduces risk)
    if (age < 18) riskScore -= 5;

    // Clamp risk score to minimum 5 and max 100
    riskScore = Math.min(100, Math.max(5, riskScore));

    let riskCategory = "Low";
    if (riskScore > 70) riskCategory = "High";
    else if (riskScore > 40) riskCategory = "Medium";

    return {
      riskPercentage: riskScore.toFixed(1),
      riskCategory,
    };
  };

  return (
    <div className="risk-calculation-container">
      <h2>Health Risk Calculator</h2>

      {!result ? (
        <form onSubmit={handleSubmit} className="risk-form">
          <div className="form-group">
            <label>Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Age *</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Weight (kg) *</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Height (cm) *</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Cholesterol Level *</label>
            <select name="cholesterolLevel" value={formData.cholesterolLevel} onChange={handleChange} required>
              <option value="">Select Level</option>
              <option value="Low">Low: less than 200 mg/dL</option>
              <option value="Medium">Medium: 200 to 239 mg/dL</option>
              <option value="High">High: 240 mg/dL or more</option>
            </select>
          </div>

          <div className="form-group">
            <label>Sugar Level *</label>
            <select name="sugarLevel" value={formData.sugarLevel} onChange={handleChange} required>
              <option value="">Select Level</option>
              <option value="Low">Low: less than 100 mg/dL</option>
              <option value="Medium">Medium: 100 to 125 mg/dL</option>
              <option value="High">High: more than 125 mg/dL</option>
            </select>
          </div>

          <div className="form-group">
            <label>Pressure Level *</label>
            <select name="pressureLevel" value={formData.pressureLevel} onChange={handleChange} required>
              <option value="">Select Level</option>
              <option value="Low">Low: less than 120 mmHg</option>
              <option value="Medium">Medium: 120 to 139 mmHg</option>
              <option value="High">High: 140 mmHg or more</option>
            </select>
          </div>

          <h2>Select Exercise Sets</h2>
          {["Cardio", "Weightlift", "Climbers", "Pushups", "Stretches"].map((exercise) => (
            <div className="form-group" key={exercise}>
              <label>{exercise}</label>
              <select
                name={`${exercise.toLowerCase()}Sets`}
                value={formData[`${exercise.toLowerCase()}Sets`]}
                onChange={handleChange}
              >
                <option value="0">0 Sets</option>
                <option value="10">10 Sets</option>
                <option value="20">20 Sets</option>
                <option value="30">30 Sets</option>
              </select>
            </div>
          ))}

          <button type="submit" className="form-button">
            Calculate Risk
          </button>
        </form>
      ) : (
        <div className="result-container">
          <h2>📊 Risk Assessment Result</h2>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Age:</strong> {result.age}</p>
          <p><strong>Weight:</strong> {result.weight} kg</p>
          <p><strong>Height:</strong> {result.height} cm</p>
          <p><strong>Cholesterol:</strong> {result.cholesterolLevel}</p>
          <p><strong>Sugar:</strong> {result.sugarLevel}</p>
          <p><strong>Pressure:</strong> {result.pressureLevel}</p>
          <p><strong>Cardio:</strong> {result.cardioSets} sets</p>
          <p><strong>Weightlift:</strong> {result.weightliftSets} sets</p>
          <p><strong>Climbers:</strong> {result.climbersSets} sets</p>
          <p><strong>Pushups:</strong> {result.pushupsSets} sets</p>
          <p><strong>Stretches:</strong> {result.stretchesSets} sets</p>
          <h4>Risk Level: <span className={`risk-${result.riskCategory.toLowerCase()}`}>{result.riskCategory}</span></h4>
          <h4>Risk Percentage: {result.riskPercentage}%</h4>
          <button onClick={() => setResult(null)} className="form-button">Try Again</button>
        </div>
      )}
    </div>
  );
};

export default RiskCalculation;
