import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PhotoCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const employee = state?.employee;

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStreaming(true);
    } catch (err) {
      alert("Camera access denied or not available.");
    }
  };

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const imageData = canvas.toDataURL("image/png");
    navigate("/photo-result", { state: { employee, photo: imageData } });
  };

  return (
    <div className="container">
      <h2>Capture Photo</h2>
      {!streaming && <button onClick={startCamera}>Start Camera</button>}
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "100%", maxWidth: "400px" }}
      ></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {streaming && <button onClick={takePhoto}>Take Photo</button>}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
