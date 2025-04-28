import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./CreateSchedule.css"; // Correct path

const CreateSchedule = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    try {
      console.log("Submitting form data:", data); // Debugging log
      const response = await axios.post("http://localhost:3000/api/schedules", data);
      console.log("Response:", response.data);
      setMessage("✅ Schedule created successfully!");

      // Redirect to the /schedules page after 2 seconds
      setTimeout(() => {
        navigate("/schedules"); // Redirect to the schedules table
      }, 2000);
    } catch (error) {
      console.error("Error details:", error); // Log full error for debugging
      setMessage(
        "❌ Error: " +
          (error.response?.data?.message || error.message || "Unknown error")
      );
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Schedule</h2>

      {/* Display success/error message */}
      {message && <p className="form-message">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {/* Session ID */}
        <div className="form-group">
          <label>Session ID</label>
          <input
            type="text"
            {...register("sessionID", {
              required: "Session ID is required",
              minLength: {
                value: 3,
                message: "Session ID must be at least 3 characters",
              },
            })}
          />
          {errors.sessionID && (
            <p className="error-text">{errors.sessionID.message}</p>
          )}
        </div>

        {/* Session Title */}
        <div className="form-group">
          <label>Session Title</label>
          <input
            type="text"
            {...register("sessionTitle", {
              required: "Session title is required",
            })}
          />
          {errors.sessionTitle && (
            <p className="error-text">{errors.sessionTitle.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea {...register("description")} />
        </div>

        {/* Session Type */}
        <div className="form-group">
          <label>Session Type</label>
          <select
            {...register("sessionType", {
              required: "Session type is required",
            })}
          >
            <option value="">Select Type</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength Training">Strength Training</option>
            <option value="HIIT">HIIT</option>
            <option value="StretchFit">StretchFit</option>
          </select>
          {errors.sessionType && (
            <p className="error-text">{errors.sessionType.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            {...register("date", {
              required: "Date is required",
            })}
          />
          {errors.date && <p className="error-text">{errors.date.message}</p>}
        </div>

        {/* Start Time */}
        <div className="form-group">
          <label>Start Time</label>
          <input
            type="time"
            {...register("startTime", {
              required: "Start time is required",
            })}
          />
          {errors.startTime && (
            <p className="error-text">{errors.startTime.message}</p>
          )}
        </div>

        {/* End Time */}
        <div className="form-group">
          <label>End Time</label>
          <input
            type="time"
            {...register("endTime", {
              required: "End time is required",
            })}
          />
          {errors.endTime && (
            <p className="error-text">{errors.endTime.message}</p>
          )}
        </div>

        {/* Trainer Name */}
        <div className="form-group">
          <label>Trainer Name</label>
          <input
            type="text"
            {...register("trainerName", {
              required: "Trainer name is required",
            })}
          />
          {errors.trainerName && (
            <p className="error-text">{errors.trainerName.message}</p>
          )}
        </div>

        {/* Member Name */}
        <div className="form-group">
          <label>Member Name</label>
          <input
            type="text"
            {...register("memberName", {
              required: "Member name is required",
            })}
          />
          {errors.memberName && (
            <p className="error-text">{errors.memberName.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Status</label>
          <select {...register("status")}>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="form-button">
          Create Schedule
        </button>
      </form>
    </div>
  );
};

export default CreateSchedule;