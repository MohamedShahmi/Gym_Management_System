import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProgressList = () => {
  const [progressEntries, setProgressEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all progress entries
  const fetchProgressEntries = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/progress");
      setProgressEntries(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching progress entries:", err);
      setError("Failed to load progress entries.");
      setLoading(false);
    }
  };

  // Delete a progress entry by ID
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this progress entry?")) {
      try {
        await axios.delete(`http://localhost:3000/api/progress/${id}`);
        // Remove the deleted entry from the state
        setProgressEntries((prevEntries) =>
          prevEntries.filter((entry) => entry._id !== id)
        );
      } catch (err) {
        console.error("Error deleting progress entry:", err);
        alert("Failed to delete progress entry.");
      }
    }
  };

  // Fetch progress entries on component mount
  useEffect(() => {
    fetchProgressEntries();
  }, []);

  // Render loading or error states
  if (loading) return <p className="text-center text-gray-600 text-xl mt-8">Loading progress entries...</p>;
  if (error) return <p className="text-center text-red-500 text-xl mt-8">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-[#800000] mb-8">My Fitness Progress</h2>
      
      <div className="flex justify-center mb-8">
        <Link to="/progress/add" 
          className="bg-[#800000] hover:bg-[#eb2446] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
          Add New Progress
        </Link>
      </div>

      {progressEntries.length === 0 ? (
        <p className="text-center text-gray-600 py-8">No progress entries available. Start tracking your fitness journey!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {progressEntries.map((entry) => (
            <div key={entry._id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b">
                <h3 className="font-semibold text-lg text-gray-800">{entry.workoutType}</h3>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {new Date(entry.date).toLocaleDateString()}
                </span>
              </div>
              <div className="p-4">
                <p className="mb-2"><span className="font-medium">Duration:</span> {entry.duration} minutes</p>
                <p className="mb-2"><span className="font-medium">Calories:</span> {entry.caloriesBurned} cal</p>
                <p className="mb-4"><span className="font-medium">Notes:</span> {entry.notes}</p>
                <div className="flex justify-between mt-4">
                  <Link to={`/progress/edit/${entry._id}`} 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(entry._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressList;
