// src/Components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import logo from "../../assets/logo.png";
const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
      <img src={logo} alt="Logo" className="logo" />
    
        <nav className="nav">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/schedules">Schedules</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/progress">Progress</Link></li>
            <li>
            <Link to="/workouts">Workouts</Link>
            </li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
              
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
