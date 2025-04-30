import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import Header from "../../Schedule/Header";
import Footer from "../../Schedule/Footer";
import "./UsersDashboard.css";

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); 

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      toast.success("User deleted!");
      fetchUsers();
    } catch (error) {
      toast.error("Error deleting user!");
    }
  };

  const handleUpdate = (userId) => {
    navigate(`/users/update/${userId}`); 
  };

  const handleRead = (userId) => {
    navigate(`/users/read/${userId}`); 
  };

  const handleAddUser = () => {
    navigate("/users/add"); 
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="table-container">
        <h2>Users Dashboard</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>UserID</th>
              <th>Username</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Age</th>
              <th>PhoneNumber</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.userID || user._id}</td>
                <td>{user.username}</td>
                <td>{user.gender}</td>
                <td>{user.role}</td>
                <td>{user.age}</td>
                <td>{user.phoneno}</td>
                <td>
                  <div className="action-group">
                    <button
                      onClick={() => handleRead(user._id)}
                      className="action-button read-button"
                    >
                      Read
                    </button>
                    <button
                      onClick={() => handleUpdate(user._id)}
                      className="action-button update-button"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="action-button delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="add-user-container">
        <button onClick={handleAddUser} className="btn-create">
          Add User
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default UsersDashboard;
