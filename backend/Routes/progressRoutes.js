import express from "express";
import { 
    getProgressEntries, 
    getProgressEntry, 
    createProgressEntry, 
    updateProgressEntry, 
    deleteProgressEntry 
} from "../Controllers/progressController.js";

const router = express.Router();

// Get all progress entries
router.get('/', getProgressEntries);

// Get progress entry by ID
router.get('/:id', getProgressEntry);

// Create progress entry
router.post('/', createProgressEntry);

// Update progress entry
router.put('/:id', updateProgressEntry);

// Delete progress entry
router.delete('/:id', deleteProgressEntry);

export default router;
