import React, { useState, useEffect } from "react";
import "./UpdateUserForm.css";

const UpdateUserForm = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...user });

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.className === "update-form-overlay") {
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  if (!user) return null;

  return (
    <div className="update-form-overlay" onClick={handleOverlayClick}>
      <div className="update-form-container slide-in">
        <h2>Update User</h2>
        <form className="update-user-form" onSubmit={handleSubmit}>
          {[
            "userID",
            "username",
            "role",
            "age",
            "phoneno",
            "gender",
            "address",
            "email",
          ].map((field, i) => (
            <div className="form-group" key={i}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === "age" ? "number" : "text"}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="form-actions">
            <button type="submit" className="update-btn">
              Update
            </button>
            <button type="button" onClick={onClose} className="close-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserForm;
