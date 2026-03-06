import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFade(true), 900);   // start fade
    const timer2 = setTimeout(() => navigate("/gymfloor"), 1700); // go to Gym Floor

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <div className={`splash-container ${fade ? "fade-out" : ""}`}>
      <div className="splash-door"></div>
    </div>
  );
}
