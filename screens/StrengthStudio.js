import { WEEKLY_SCHEDULE } from "../data/weekly.js";
import { MACHINES } from "../data/machines.js";
import { getRotationInfo, getRotatedMachine } from "../data/rotation.js";

let manualDaySelection = localStorage.getItem("manualDaySelection");

const MACHINE_EMOJIS = {
  15: "🏋️", 115: "🏋️",
  22: "🦵", 122: "🦵",
  6: "💪", 106: "💪",
  9: "🏋️", 109: "🏋️",
  3: "🫀", 103: "🫀",
  12: "🦾", 112: "🦾",
  18: "🦵", 118: "🦵",
  30: "🦴", 130: "🦴"
};

export function StrengthStudio() {
  const screen = document.createElement("div");
  screen.className = "screen-container";

  const header = document.createElement("div");
  header.className = "header-title";
  header.textContent = "Strength Studio";
  screen.appendChild(header);

  const rot = getRotationInfo();
  const rotationLabel = document.createElement("div");
  rotationLabel.className = "subheader-label";
  rotationLabel.textContent = `Block ${rot.block} • Week ${rot.week} • ${rot.range} • ${rot.mode}`;
  screen.appendChild(rotationLabel);

  const daySelector = document.createElement("div");
  daySelector.className = "pill-selector";

  const days = Object.keys(WEEKLY_SCHEDULE);

  days.forEach(day => {
    const btn = document.createElement("button");
    btn.className = "pill-btn";
    btn.textContent = day;

    if (manualDaySelection === day) btn.classList.add("active");

    btn.onclick = () => {
      manualDaySelection = day;
      localStorage.setItem("manualDaySelection", day);
      renderMachineList(day);
      highlight(daySelector, day);
    };

    daySelector.appendChild(btn);
  });

  screen.appendChild(daySelector);

  const machineList = document.createElement("div");
  screen.appendChild(machineList);

  let today = new Date().toLocaleDateString("en-US", { weekday: "short" }).replace(".", "");
  if (today === "Thu") today = "Thur";

  if (!WEEKLY_SCHEDULE[manualDaySelection]) {
    manualDaySelection = null;
    localStorage.removeItem("manualDaySelection");
  }

  const startDay = manualDaySelection || today;

  renderMachineList(startDay);
  highlight(daySelector, startDay);

  function renderMachineList(day) {
    machineList.innerHTML = "";

    const ids = WEEKLY_SCHEDULE[day];
    if (!ids) return;

    ids.forEach(id => {
      const rotatedId = getRotatedMachine(id);
      const meta = MACHINES[rotatedId];
      if (!meta) return;

      const emoji = MACHINE_EMOJIS[rotatedId] || "🏋️";

      const card = document.createElement("div");
      card.className = "machine-card";
      card.textContent = `${emoji} #${rotatedId} ${meta.name}`;

      card.onclick = () => window.renderScreen("Machine", rotatedId);

      machineList.appendChild(card);
    });
  }

  function highlight(container, selected) {
    container.querySelectorAll("button").forEach(btn => {
      btn.classList.toggle("active", btn.textContent === selected);
    });
  }

  const historyBtn = document.createElement("button");
  historyBtn.className = "secondary-btn";
  historyBtn.textContent = "Strength History";
  historyBtn.onclick = () => window.renderScreen("StrengthHistory");
  screen.appendChild(historyBtn);

  const weeklyBtn = document.createElement("button");
  weeklyBtn.className = "secondary-btn";
  weeklyBtn.textContent = "Weekly Overview";
  weeklyBtn.onclick = () => window.renderScreen("WeeklyOverview");
  screen.appendChild(weeklyBtn);

  const backBtn = document.createElement("button");
  backBtn.className = "nav-btn";
  backBtn.textContent = "Back to Gym Floor";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  screen.appendChild(backBtn);

  return screen;
}
