import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userID: { type: String, required: true },
        username: {type: String, required: true},
        role: { type: String, required: true },
        age: { type: Number, required: true },
        phoneno: { type: String, required: true },
        gender: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
