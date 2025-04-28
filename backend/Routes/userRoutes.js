import express from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/userController.js";

const router = express.Router();

// Route to create a new user
router.post("/", createUser);

// Route to get all users
router.get("/", getAllUsers);

// Route to get a user by ID
router.get("/:id", getUserById);

// Route to update a user by ID
router.put("/:id", updateUser);

// Route to delete a user by ID
router.delete("/:id", deleteUser);

export default router;
