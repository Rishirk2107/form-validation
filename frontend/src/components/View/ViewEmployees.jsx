import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewEmployees.css'

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/employees");
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setErrorMessage("Failed to fetch employees. Please try again later.");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employee-container">
      <h2>Employee Details</h2>
      {loading ? (
        <div className="loading">Loading employees...</div>
      ) : errorMessage ? (
        <div className="error">{errorMessage}</div>
      ) : employees.length === 0 ? (
        <div className="no-data">No employees found.</div>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.name}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.department}</td>
                <td>{employee.dateOfJoining}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewEmployees;
