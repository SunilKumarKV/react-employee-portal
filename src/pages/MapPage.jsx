// src/pages/MapPage.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function MapPage() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simple mapping: city -> coordinates
  const cityCoords = {
    Edinburgh: [55.9533, -3.1883],
    Tokyo: [35.6762, 139.6503],
    "San Francisco": [37.7749, -122.4194],
    London: [51.5074, -0.1278],
    "New York": [40.7128, -74.006],
    Singapore: [1.3521, 103.8198],
    Sidney: [-33.8688, 151.2093],
  };

  useEffect(() => {
    fetch("/api/backend_dev/gettabledata.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "test", password: "123456" }),
    })
      .then((res) => res.json())
      .then((result) => {
        const rows = result?.TABLE_DATA?.data || [];
        const cityList = rows
          .map((row) => row[2]) // city is at index 2
          .filter((city) => cityCoords[city]); // only those we have coords for

        // Remove duplicates
        const uniqueCities = [...new Set(cityList)];

        setCities(uniqueCities);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Map fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading map...</p>;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h2 style={{ textAlign: "center", margin: "10px" }}>
        🗺 Cities Map (From API)
      </h2>
      <button onClick={() => navigate(-1)} style={{ margin: "10px" }}>
        ⬅ Back
      </button>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "90%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {cities.map((city, idx) => (
          <Marker key={idx} position={cityCoords[city]}>
            <Popup>{city}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
