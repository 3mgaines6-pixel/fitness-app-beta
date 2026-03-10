import React from "react";
import { M } from "../data/MACHINES.js";
import { WEEKLY } from "../data/WEEKLY.js";
import "./WeeklyOverview.css";

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

// Convert machine number → machine object
function findMachineByNumber(num) {
  return Object.values(M).find(m => m.number === num);
}

// Determine if this is a primary or swap week
function getWeekType() {
  const weekNumber = Math.ceil(new Date().getDate() / 7);
  return weekNumber === 3 || weekNumber === 4 ? "swap" : "primary";
}

// Apply swap logic for Weeks 3–4
function applySwap(machine) {
  switch (machine.number) {
    case 12: return M.PLC;      // Seated Leg Curl → Prone Leg Curl
    case 7:  return M.CHEST_L;  // Heavy Chest → Light Chest
    case 15: return M.PRESS_L;  // Heavy Leg Press → Light Leg Press
    default: return machine;
  }
}

// ------------------------------------------------------------
// Component
// ------------------------------------------------------------

export default function WeeklyOverview() {
  const weekType = getWeekType();

  return (
    <div className="weekly-screen">
      <h1 className="weekly-title">Weekly Overview</h1>

      {Object.entries(WEEKLY).map(([day, machineNumbers]) => {
        // Convert numbers → machine objects
        const machines = machineNumbers.map(num => {
          let machine = findMachineByNumber(num);
          if (!machine) return null;
          if (weekType === "swap") machine = applySwap(machine);
          return machine;
        }).filter(Boolean);

        return (
          <div key={day} className="weekly-day-card">
            <h2 className="day-name">{day}</h2>

            <ul className="machine-list">
              {machines.map(m => (
                <li key={m.id} className="machine-item">
                  <span className="machine-name">{m.name}</span>
                  <span className="machine-muscle">{m.muscle}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
