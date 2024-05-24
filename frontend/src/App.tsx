/* eslint-disable @typescript-eslint/no-unused-vars */
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TrackShipment from "./pages/TrackShipment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/track" element={<TrackShipment />} />
    </Routes>
  );
}

export default App;
