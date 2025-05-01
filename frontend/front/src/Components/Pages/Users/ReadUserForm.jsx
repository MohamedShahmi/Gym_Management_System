import React, { useEffect } from "react";
import "./ReadUserForm.css";

const ReadUserForm = ({ user, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose(); // Close on ESC key
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!user) return null;

  const handleOverlayClick = (e) => {
    if (e.target.className === "read-form-overlay") {
      onClose(); // Close on overlay click
    }
  };

  return (
    <div className="read-form-overlay" onClick={handleOverlayClick}>
      <div className="read-form-container slide-in">
        <h2>User Details</h2>
        <form className="read-user-form">
          {[
            { label: "User ID", value: user.userID },
            { label: "Username", value: user.username },
            { label: "Role", value: user.role },
            { label: "Age", value: user.age },
            { label: "Phone Number", value: user.phoneno },
            { label: "Gender", value: user.gender },
            { label: "Address", value: user.address },
            { label: "Email", value: user.email },
          ].map((field, i) => (
            <div className="form-group" key={i}>
              <label>{field.label}</label>
              <input type="text" value={field.value} readOnly />
            </div>
          ))}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="close-btn">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReadUserForm;
