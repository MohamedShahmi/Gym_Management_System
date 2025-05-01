import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../../Schedule/Header";
import Footer from "../../Schedule/Footer";
import ReadUserForm from "./ReadUserForm";
import UpdateUserForm from "./UpdateUserForm";
import "./UsersDashboard.css";

const UsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserForRead, setSelectedUserForRead] = useState(null);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = () => {
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      fetchUsers();
      toast.success("User deleted!");
    } catch (error) {
      toast.error("Error deleting user!");
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await axios.put(`http://localhost:3000/api/users/${updatedUser._id}`, updatedUser);
      toast.success("User updated successfully!");
      fetchUsers();
      setSelectedUserForUpdate(null);
    } catch (error) {
      toast.error("Error updating user!");
    }
  };

  const handleAddUser = () => {
    navigate("/signup");
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
                <td>{user.userID}</td>
                <td>{user.username}</td>
                <td>{user.gender}</td>
                <td>{user.role}</td>
                <td>{user.age}</td>
                <td>{user.phoneno}</td>
                <td>
                  <div className="action-group">
                    <button
                      className="read-button"
                      onClick={() => setSelectedUserForRead(user)}
                    >
                      Read
                    </button>
                    <button
                      className="update-button"
                      onClick={() => setSelectedUserForUpdate(user)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-user-container">
          <button onClick={handleAddUser} className="btn-create">
            Add User
          </button>
        </div>

        {/* Read Modal */}
        {selectedUserForRead && (
          <ReadUserForm user={selectedUserForRead} onClose={() => setSelectedUserForRead(null)} />
        )}

        {/* Update Modal */}
        {selectedUserForUpdate && (
          <UpdateUserForm
            user={selectedUserForUpdate}
            onClose={() => setSelectedUserForUpdate(null)}
            onUpdate={handleUpdateUser}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UsersDashboard;
