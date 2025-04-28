import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fitnessGoal: { type: String, required: true },
  level: { type: String, required: true },
  duration: { type: Number, required: true },
  frequency: { type: String, required: true },
  assignedTrainer: { type: String, required: true },
  exercises: [
    {
      exerciseName: { type: String, required: true },
      sets: { type: Number, required: true },
      restTime: { type: Number, required: true },
    },
  ],
}, { timestamps: true });

// Create the model
const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);

// Export the model as a named export
export { WorkoutPlan };