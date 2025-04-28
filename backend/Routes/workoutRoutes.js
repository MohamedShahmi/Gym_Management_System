import express from "express";
import { createWorkoutPlan, getAllWorkoutPlans, getWorkoutPlanById, updateWorkoutPlan, deleteWorkoutPlan } from "../controllers/workoutController.js";

const router = express.Router();

// Create a new workout plan
router.post("/", createWorkoutPlan);

// Get all workout plans
router.get("/", getAllWorkoutPlans);

// Get a workout plan by ID
router.get("/:id", getWorkoutPlanById);

// Update a workout plan by ID
router.put("/:id", updateWorkoutPlan);

// Delete a workout plan by ID
router.delete("/:id", deleteWorkoutPlan);

export default router;