import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../Schedule/Header";  // Updated import path
import Footer from "../../Schedule/Footer";  // Updated import path
import "./LoginForm.css";  // Add your custom styles here

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/users/login", { email, password });
      toast.success("Successfully logged in!");
      navigate("/users");
    } catch (error) {
      toast.error("Enter valid credentials!");
    }
  };

  return (
    <div>
      <Header /> {/* Add the header */}
      <div className="login-form-container">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <Footer /> {/* Add the footer */}
    </div>
  );
};

export default LoginForm;
