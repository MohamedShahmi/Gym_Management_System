import express from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../Controllers/userController.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser); 
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
