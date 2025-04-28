import { WorkoutPlan } from "../models/workoutPlan.js";

export const createWorkoutPlan = async (req, res) => {
    try {
        // Create a new workout plan using the data from the request body
        const newWorkoutPlan = await WorkoutPlan.create(req.body);
        // Return the created workout plan with its ID
        res.status(201).json(newWorkoutPlan);
    } catch (error) {
        res.status(500).json({ error: "Failed to create workout plan" });
    }
};

export const getAllWorkoutPlans = async (req, res) => {
    try {
        // Fetch all workout plans from the database
        const workoutPlans = await WorkoutPlan.find();
        // Return the list of workout plans
        res.status(200).json(workoutPlans);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve workout plans" });
    }
};

export const getWorkoutPlanById = async (req, res) => {
    try {
        // Extract the ID from the request parameters
        const id = req.params.id;
        // Find the workout plan by ID
        const workoutPlan = await WorkoutPlan.findById(id);
        if (!workoutPlan) {
            return res.status(404).json({ error: "Workout plan not found" });
        }
        // Return the workout plan
        res.status(200).json(workoutPlan);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve workout plan" });
    }
};

export const updateWorkoutPlan = async (req, res) => {
    try {
        // Extract the ID from the request parameters
        const id = req.params.id;
        // Update the workout plan by ID
        const updatedWorkoutPlan = await WorkoutPlan.findByIdAndUpdate(
            id,
            req.body,
            { new: true } // Return the updated document
        );
        if (!updatedWorkoutPlan) {
            return res.status(404).json({ error: "Workout plan not found" });
        }
        // Return the updated workout plan
        res.status(200).json(updatedWorkoutPlan);
    } catch (error) {
        res.status(500).json({ error: "Failed to update workout plan" });
    }
};

export const deleteWorkoutPlan = async (req, res) => {
    try {
        // Extract the ID from the request parameters
        const id = req.params.id;
        // Delete the workout plan by ID
        const deletedWorkoutPlan = await WorkoutPlan.findByIdAndDelete(id);
        if (!deletedWorkoutPlan) {
            return res.status(404).json({ error: "Workout plan not found" });
        }
        // Return a success message
        res.status(200).json({ message: "Workout plan deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete workout plan" });
    }
};