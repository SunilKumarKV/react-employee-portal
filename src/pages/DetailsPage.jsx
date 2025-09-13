import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const employee = state?.employee;

  if (!employee) {
    return (
      <div className="container">
        <h2>Employee Details</h2>
        <p style={{ color: "red" }}>
          No employee data found. Go back to the list.
        </p>
        <button onClick={() => navigate(-1)}>Back to List</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Employee Details</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{employee.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{employee.name}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{employee.role}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{employee.city}</td>
          </tr>
          <tr>
            <th>Employee ID</th>
            <td>{employee.empId}</td>
          </tr>
          <tr>
            <th>Join Date</th>
            <td>{employee.joinDate}</td>
          </tr>
          <tr>
            <th>Salary</th>
            <td>{employee.salary}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={() => navigate(-1)}>Back to List</button>
      <button
        onClick={() => navigate("/photo-capture", { state: { employee } })}
      >
        Capture Photo
      </button>
    </div>
  );
}
