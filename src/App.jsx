import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import DetailsPage from "./pages/DetailsPage";
import PhotoResultPage from "./pages/PhotoResultPage";
import PhotoCapture from "./pages/PhotoCapture";
import BarChartPage from "./pages/BarChartPage";
import MapPage from "./pages/MapPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/details/:id" element={<DetailsPage />} />
      <Route path="/photo-capture" element={<PhotoCapture />} />
      <Route path="/photo-result" element={<PhotoResultPage />} />
      <Route path="/chart" element={<BarChartPage />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  );
}
