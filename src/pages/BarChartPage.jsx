// src/pages/BarChartPage.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

export default function BarChartPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/backend_dev/gettabledata.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "test", password: "123456" }),
    })
      .then((res) => res.json())
      .then((result) => {
        const rows = result?.TABLE_DATA?.data || [];

        // Format salaries (remove "$" and commas → convert to number)
        const formatted = rows.slice(0, 10).map((row, index) => ({
          id: index + 1,
          name: row[0],
          salary: Number(String(row[5]).replace(/[^0-9.-]+/g, "")),
        }));

        setData(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Chart fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading chart...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Salary Chart (First 10 Employees)</h2>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="salary" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
