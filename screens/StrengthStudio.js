import { WEEKLY_SCHEDULE } from "../data/weekly.js";
import { MACHINES } from "../data/machines.js";
import { getRotationInfo, getRotatedMachine } from "../data/rotation.js";

/* ============================================================
   REMEMBER USER'S SELECTED DAY
============================================================ */
let manualDaySelection = localStorage.getItem("manualDaySelection");

/* ============================================================
   EMOJIS
============================================================ */
const MACHINE_EMOJIS = {
  15: "🏋️",
  115: "🏋️",
  22: "🦵",
  122: "🦵",
  6: "💪",
  106: "💪",
  9: "🏋️",
  109: "🏋️",
  3: "🫀",
  103: "🫀",
  12: "🦾",
  112: "🦾",
  18: "🦵",
  118: "🦵",
  30: "🦴",
  130: "🦴"
};

export function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "strength-screen";

  const wrapper = document.createElement("div");
  wrapper.className = "strength-wrapper";
  container.appendChild(wrapper);

  /* HEADER */
  const header = document.createElement("div");
  header.className = "strength-header";
  header.textContent = "Strength Studio";
  wrapper.appendChild(header);

  /* ROTATION LABEL — SAFE VERSION */
  const rot = getRotationInfo();
  const rotationLabel = document.createElement("div");
  rotationLabel.className = "rotation-label";
  rotationLabel.textContent = `Block ${rot.block} • Week ${rot.week} • ${rot.range} • ${rot.mode}`;
  wrapper.appendChild(rotationLabel);

  /* DAY SELECTOR */
  const dayButtons = document.createElement("div");
  dayButtons.className = "day-selector";

  const days = Object.keys(WEEKLY_SCHEDULE);

  days.forEach(day => {
    const btn = document.createElement("button");
    btn.className = "day-btn";
    btn.textContent = day;

    if (manualDaySelection === day) {
      btn.classList.add("active");
    }

    btn.onclick = () => {
      manualDaySelection = day;
      localStorage.setItem("manualDaySelection", day);
      renderMachineList(day);
      highlightSelectedDay(dayButtons, day);
    };

    dayButtons.appendChild(btn);
  });

  wrapper.appendChild(dayButtons);

  /* MACHINE LIST */
  const machineList = document.createElement("div");
  machineList.className = "machine-list";
  wrapper.appendChild(machineList);

  /* FIX DAY FORMAT */
  let today = new Date().toLocaleDateString("en-US", { weekday: "short" }).replace(".", "");
  if (today === "Thu") today = "Thur";

  if (!WEEKLY_SCHEDULE[manualDaySelection]) {
    manualDaySelection = null;
    localStorage.removeItem("manualDaySelection");
  }

  const startingDay = manualDaySelection || today;

  renderMachineList(startingDay);
  highlightSelectedDay(dayButtons, startingDay);

  function renderMachineList(day) {
    machineList.innerHTML = "";

    const ids = WEEKLY_SCHEDULE[day];
    if (!ids) return;

    ids.forEach(id => {
      const rotatedId = getRotatedMachine(id);
      const meta = MACHINES[rotatedId];
      if (!meta) return;

      const emoji = MACHINE_EMOJIS[rotatedId] || "🏋️";

      const btn = document.createElement("button");
      btn.className = "machine-btn";
      btn.textContent = `${emoji} #${rotatedId} ${meta.name}`;

      btn.onclick = () => window.renderScreen("Machine", rotatedId);

      machineList.appendChild(btn);
    });
  }

  function highlightSelectedDay(container, selectedDay) {
    const buttons = container.querySelectorAll("button");
    buttons.forEach(btn => {
      if (btn.textContent === selectedDay) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  /* HISTORY BUTTON */
  const historyBtn = document.createElement("button");
  historyBtn.className = "strength-sub-btn";
  historyBtn.textContent = "Strength History";
  historyBtn.onclick = () => window.renderScreen("StrengthHistory");
  wrapper.appendChild(historyBtn);

  /* WEEKLY OVERVIEW BUTTON */
  const weeklyBtn = document.createElement("button");
  weeklyBtn.className = "strength-sub-btn";
  weeklyBtn.textContent = "Weekly Overview";
  weeklyBtn.onclick = () => window.renderScreen("WeeklyOverview");
  wrapper.appendChild(weeklyBtn);

  /* RETURN BUTTON */
  const returnBtn = document.createElement("button");
  returnBtn.className = "return-btn";
  returnBtn.textContent = "Back to Gym Floor";
  returnBtn.onclick = () => window.renderScreen("GymFloor");
  wrapper.appendChild(returnBtn);

  return container;
}
