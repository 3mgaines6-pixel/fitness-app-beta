console.log("StrengthStudio VERSION 7");


import { WEEKLY_SCHEDULE } from "../data/weeklySchedule.js";
import { MACHINES } from "../data/machines.js";

export function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "strength-screen";

  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Strength Studio";

  // Determine today's day
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Selected day (auto-select today)
  let selectedDay = days.includes(today) ? today : "Monday";

  // Day buttons container
  const dayButtons = document.createElement("div");
  dayButtons.className = "strength-buttons";

  function renderDayButtons() {
    dayButtons.innerHTML = "";

    days.forEach(day => {
      const btn = document.createElement("button");
      btn.className = "strength-btn";
      btn.textContent = day;

      if (day === selectedDay) {
        btn.style.background = "rgba(0,150,255,0.4)";
        btn.style.border = "2px solid #4da3ff";
      }

      btn.onclick = () => {
        selectedDay = day;
        renderDayButtons();
        renderMachineList();
      };

      dayButtons.appendChild(btn);
    });
  }

  // Machine list container
  const machineList = document.createElement("div");
  machineList.className = "strength-buttons";

  function renderMachineList() {
    machineList.innerHTML = "";

    const ids = WEEKLY_SCHEDULE[selectedDay];

    ids.forEach(id => {
      const btn = document.createElement("button");
      btn.className = "strength-btn";
      btn.textContent = `#${id} ${MACHINES[id].name}`;
      btn.onclick = () => window.renderScreen("Machine", id);
      machineList.appendChild(btn);
    });
  }

  // Initial render
  renderDayButtons();
  renderMachineList();

  container.appendChild(title);
  container.appendChild(dayButtons);
  container.appendChild(machineList);

  return container;
}
