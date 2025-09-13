import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/backend_dev/gettabledata.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "test", password: "123456" }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((result) => {
        const rows = result?.TABLE_DATA?.data || [];

        const formatted = rows.map((row, index) => ({
          id: index + 1, // Local ID
          name: row[0], // Name
          role: row[1], // Job Title
          city: row[2], // City
          empId: row[3], // Employee ID
          joinDate: row[4], // Join Date
          salary: row[5], // Salary
        }));

        setData(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load employee data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading employee data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container">
      <h2>Employee List</h2>

      {/* Navigation buttons */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => navigate("/chart")}>📊 Show Salary Chart</button>
        <button onClick={() => navigate("/map")} style={{ marginLeft: "10px" }}>
          🗺️ Show Cities on Map
        </button>
      </div>

      {/* Employee table */}
      <table className="table" border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>City</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() =>
                navigate(`/details/${item.id}`, { state: { employee: item } })
              }
              style={{ cursor: "pointer" }}
            >
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>{item.city}</td>
              <td>{item.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
