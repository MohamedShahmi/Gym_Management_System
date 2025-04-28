// src/Components/Schedule/UpdateSchedule.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "./UpdateSchedule.css"; // Import the CSS file

const UpdateSchedule = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [scheduleData, setScheduleData] = useState(null);

  const { id } = useParams(); // Get the schedule ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/schedules/${id}`);
        setScheduleData(response.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setMessage(
          "❌ Error: " +
            (error.response?.data?.message || error.message || "Unknown error")
        );
      }
    };

    if (id) {
      fetchSchedule();
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      console.log("Submitting updated data:", data); // Debugging log
      const response = await axios.put(
        `http://localhost:3000/api/schedules/${id}`,
        data
      );
      console.log("Response:", response.data);
      setMessage("✅ Schedule updated successfully!");
      
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
      <h2 className="form-title">Update Schedule</h2>
      {/* Display success/error message */}
      {message && <p className="form-message">{message}</p>}
      {scheduleData ? (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          {/* Pre-fill the form with existing schedule data */}
          <input type="hidden" {...register("sessionID", { value: scheduleData.sessionID })} />

          {/* Session Title */}
          <div className="form-group">
            <label>Session Title</label>
            <input
              type="text"
              defaultValue={scheduleData.sessionTitle}
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
            <textarea
              defaultValue={scheduleData.description}
              {...register("description")}
            />
          </div>

          {/* Session Type */}
          <div className="form-group">
            <label>Session Type</label>
            <select
              defaultValue={scheduleData.sessionType}
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
              defaultValue={scheduleData.date}
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
              defaultValue={scheduleData.startTime}
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
              defaultValue={scheduleData.endTime}
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
              defaultValue={scheduleData.trainerName}
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
              defaultValue={scheduleData.memberName}
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
            <select
              defaultValue={scheduleData.status}
              {...register("status", {
                required: "Status is required",
              })}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            {errors.status && (
              <p className="error-text">{errors.status.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="form-button">
            Update Schedule
          </button>
        </form>
      ) : (
        <p>Loading schedule data...</p>
      )}
    </div>
  );
};

export default UpdateSchedule;