import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";
import { getLastSession } from "../utils/history.js";
import { getSelectedDay, setSelectedDay } from "../utils/utils.js";

export default function StrengthStudio() {
  const root = document.createElement("div");
  root.id = "strength-root";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "strength-header";
  header.innerHTML = `<div class="strength-title">Strength Studio</div>`;
  root.appendChild(header);

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "back-btn";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  root.appendChild(backBtn);

  /* DAY SELECTOR */
  const daySelector = document.createElement("div");
  daySelector.className = "day-selector";

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const selected = getSelectedDay();

  days.forEach(d => {
    const btn = document.createElement("div");
    btn.className = "day-btn";
    if (d === selected) btn.classList.add("active");
    btn.textContent = d;

    btn.onclick = () => {
      setSelectedDay(d);
      window.renderScreen("StrengthStudio");
    };

    daySelector.appendChild(btn);
  });

  root.appendChild(daySelector);

  /* MACHINE LIST */
  const machineList = document.createElement("div");
  machineList.className = "machine-list";
  root.appendChild(machineList);

  const today = WEEKLY[selected];

  today.machines.forEach((id, index) => {
    const m = MACHINES[id];
    const last = getLastSession(m.number, m.type);

    const row = document.createElement("div");
    row.className = "machine-row";

    const lastText = last
      ? last.sets.map(s => `${s.reps}@${s.weight}`).join(", ")
      : "—";

    row.innerHTML = `
      <div class="machine-row-title">#${m.number} ${m.name}</div>
      <div class="machine-row-sub">${m.muscle} • ${m.type}</div>
      <div class="machine-row-last">Last: ${lastText}</div>
    `;

    row.onclick = () => {
      window
