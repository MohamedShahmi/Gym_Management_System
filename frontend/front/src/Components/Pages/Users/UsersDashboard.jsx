import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../Schedule/Header"; // Updated import path
import Footer from "../../Schedule/Footer"; // Updated import path
import "./UsersDashboard.css"; // Ensure the correct import

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      setUsers(users.filter((user) => user.userID !== userId));
      toast.success("User deleted!");
    } catch (error) {
      toast.error("Error deleting user!");
    }
  };

  const handleUpdate = (userId) => {
    toast.info(`Update function for User ID: ${userId}`);
    // You can open a form or navigate to the update page here
  };

  const handleRead = (userId) => {
    toast.info(`Read details of User ID: ${userId}`);
    // You can open a modal or navigate to the user details page here
  };

  const handleAddUser = () => {
    toast.success("Add User function triggered!");
    // You can open a form or navigate to the add user page here
  };

  return (
    <div className="dashboard-container">
      <Header /> {/* Ensure Header is rendered at the top */}
      
      <div className="table-container">
        <h2>Users Dashboard</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>UserID</th>
              <th>Username</th>
              <th>Gender</th> {/* Added Gender column */}
              <th>Role</th>
              <th>Age</th>
              <th>PhoneNumber</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userID}>
                <td>{user.userID}</td>
                <td>{user.username}</td>
                <td>{user.gender}</td> {/* Display Gender */}
                <td>{user.role}</td>
                <td>{user.age}</td>
                <td>{user.phoneno}</td>
                <td>
                  <div className="action-group">
                    <button
                      onClick={() => handleRead(user.userID)}
                      className="action-button read-button"
                    >
                      Read
                    </button>
                    <button
                      onClick={() => handleUpdate(user.userID)}
                      className="action-button update-button"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(user.userID)}
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

      {/* Add User button fixed at the bottom */}
      <div className="add-user-container">
        <button onClick={handleAddUser} className="btn-create">
          Add User
        </button>
      </div>

      <Footer /> {/* Ensure Footer is rendered at the bottom */}
    </div>
  );
};

export default UsersDashboard;
