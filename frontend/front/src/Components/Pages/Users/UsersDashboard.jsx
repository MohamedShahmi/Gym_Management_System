import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Error fetching user data!");
      });
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

  const handleGenerateReport = () => {
    if (!users.length) {
      toast.error("No users to generate report.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Users Dashboard Report", 14, 22);

    const tableColumn = ["UserID", "Username", "Gender", "Role", "Age", "PhoneNumber"];
    const tableRows = users.map((user) => [
      user.userID || "N/A",
      user.username || "N/A",
      user.gender || "N/A",
      user.role || "N/A",
      user.age || "N/A",
      user.phoneno || "N/A",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      bodyStyles: { fillColor: [249, 249, 249] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save("users_report.pdf");
    toast.success("PDF Report Generated!");
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
                    <button className="read-button" onClick={() => setSelectedUserForRead(user)}>
                      Read
                    </button>
                    <button className="update-button" onClick={() => setSelectedUserForUpdate(user)}>
                      Update
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button-container">
          <button onClick={handleAddUser} className="btn-create">Add User</button>
          <button onClick={handleGenerateReport} className="btn-report">Generate Report</button>
        </div>

        {selectedUserForRead && (
          <ReadUserForm user={selectedUserForRead} onClose={() => setSelectedUserForRead(null)} />
        )}

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
