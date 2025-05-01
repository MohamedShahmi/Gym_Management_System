import { User } from "../Models/userModel.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const {
      userID,
      username,
      role,
      age,
      phoneno,
      gender,
      address,
      email,
      password,
    } = req.body;

    // Optional: Check if userID or email already exists
    const existingUser = await User.findOne({ userID });
    if (existingUser) {
      return res.status(400).json({ message: "UserID already exists" });
    }

    const user = new User({
      userID,
      username,
      role,
      age,
      phoneno,
      gender,
      address,
      email,
      password,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Includes MongoDB _id field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Get a user by ID (MongoDB _id)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully", user: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};
