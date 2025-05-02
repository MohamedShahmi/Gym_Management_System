import { Progress } from "../Models/progressModel.js";

// Get all progress entries
const getProgressEntries = async(req, res) => {
    try {
        const entries = await Progress.find({}).sort({ date: -1 });
        res.status(200).json(entries);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

// Get progress entry by ID
const getProgressEntry = async(req, res) => {
    try {
        const { id } = req.params;
        const entry = await Progress.findById(id);
        if (!entry) return res.status(404).json({ message: "Progress entry not found" });
        res.status(200).json(entry);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

// Create progress entry
const createProgressEntry = async(req, res) => {
    try {
        const entry = await Progress.create(req.body);
        res.status(201).json(entry);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

// Update progress entry by ID
const updateProgressEntry = async(req, res) => {
    try {
        const { id } = req.params;
        const entry = await Progress.findByIdAndUpdate(id, req.body, { new: true });
        if (!entry) {
            return res.status(404).json({message: "Progress entry not found"});
        }
        res.status(200).json(entry);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

// Delete progress entry by ID
const deleteProgressEntry = async(req, res) => {
    try {
        const { id } = req.params;
        const entry = await Progress.findByIdAndDelete(id);
        if (!entry) {
            return res.status(404).json({message: "Progress entry not found"});
        }
        res.status(200).json({message: "Progress entry deleted successfully"});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

export { 
    getProgressEntries, 
    getProgressEntry, 
    createProgressEntry, 
    updateProgressEntry, 
    deleteProgressEntry 
};
