import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PhotoResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.photo) {
    return (
      <div className="container">
        <h2>No Photo Captured</h2>
        <button onClick={() => navigate("/")}>Back to List</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Photo Result</h2>
      <img
        src={state.photo}
        alt="Captured"
        style={{ maxWidth: "100%", border: "2px solid #333" }}
      />
      <p>
        <strong>Captured for:</strong> {state.employee?.name}
      </p>
      <button onClick={() => navigate(-1)}>Back to List</button>
    </div>
  );
}
