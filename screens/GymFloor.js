import React from "react";
import { useNavigate } from "react-router-dom";

export default function GymFloor() {
  const navigate = useNavigate();

  return (
    <div className="gym-floor">
      <div className="header">Welcome to Matt's Gym Floor</div>

      <div className="gym-button" onClick={() => navigate("/strengthstudio")}>
        Strength Studio
      </div>

      <div className="gym-button" onClick={() => navigate("/cardiostudio")}>
        Cardio Studio
      </div>

      <div className="gym-button" onClick={() => navigate("/stretchstudio")}>
        Stretch Studio
      </div>

      <div className="gym-button" onClick={() => navigate("/nutrition")}>
        Nutrition Guide
      </div>
    </div>
  );
}
