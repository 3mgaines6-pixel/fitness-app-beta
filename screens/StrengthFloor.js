import { WEEKLY_SCHEDULE } from "../data/weekly.js";
import { MACHINES } from "../data/machines.js";

/* ============================================
   EMOJI MAP — matches your chosen icons
============================================ */
const MACHINE_EMOJIS = {
  1: "💪",   // Dependent Curl
  2: "🔽",   // Triceps Press
  3: "🔗",   // Ab Crunch
  4: "🧍‍♂️", // Back Extension
  5: "🪝",   // Seated Row
  6: "🧱",   // Shoulder Press
  7: "🫀",   // Chest Press (Heavy)
  8: "🪜",   // Lat Pulldown
  9: "🪽",   // Pec Fly / Rear Delt
  10: "🌀",  // Prone Leg Curl
  11: "🦿",  // Leg Extension
  12: "🌀",  // Seated Leg Curl
  13: "↔️",  // Hip Adductor
  14: "↕️",  // Hip Abductor
  15: "🦵",  // Leg Press
  107: "🫀", // Chest Press (Light)
  115: "🦵"  // Leg Press (Light)
};

/* ============================================
   MAIN STRENGTH FLOOR SCREEN
============================================ */
export function StrengthFloor() {
  const container = document.createElement("div");
  container.className = "strength-screen";

  const wrapper = document.createElement("div");
  wrapper.className = "strength-wrapper";

  /* ---------- Title ---------- */
  const title = document.createElement("div");
  title.className = "strength-title";
  title.textContent = "Strength Floor";
  wrapper.appendChild(title);

  /* ---------- Day Selector ---------- */
  const dayRow = document.createElement("div");
  dayRow.className = "strength-day-buttons";

  const days = ["Mon", "Tue", "Wed", "Thur", "Fri"];
  let currentDay = getTodayDayKey();

  days.forEach((d) => {
    const btn = document.createElement("button");
    btn.className = "strength-btn";
    btn.textContent = d;

    if (d === currentDay) {
      btn.style.background = "#0a4cff";
      btn.style.color = "white";
    }

    btn.onclick = () => {
      currentDay = d;
      renderMachineList(wrapper, currentDay);
      highlightDayButtons(dayRow, currentDay);
    };

    dayRow.appendChild(btn);
  });

  wrapper.appendChild(dayRow);

  /* ---------- Machine List ---------- */
  const machineList = document.createElement("div");
  machineList.className = "strength-machine-buttons";
  wrapper.appendChild(machineList);

  renderMachineList(wrapper, currentDay);

  /* ---------- Back Button ---------- */
  const backBtn = document.createElement("button");
  backBtn.className = "strength-back-btn";
  backBtn.textContent = "← Return to Gym Floor";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  wrapper.appendChild(backBtn);

  container.appendChild(wrapper);
  return container;
}

/* ============================================
   RENDER MACHINE LIST FOR SELECTED DAY
============================================ */
function renderMachineList(wrapper, dayKey) {
  const list = wrapper.querySelector(".strength-machine-buttons");
  list.innerHTML = "";

  const machineIds = WEEKLY_SCHEDULE[dayKey];

  machineIds.forEach((id) => {
    const meta = MACHINES[id];
    const emoji = MACHINE_EMOJIS[id] || "🏋️";

    const btn = document.createElement("button");
    btn.className = "strength-btn";
    btn.innerHTML = `<span>${emoji}</span> #${id} ${meta.name}`;

    btn.onclick = () => window.renderScreen("Machine", id);

    list.appendChild(btn);
  });
}

/* ============================================
   HIGHLIGHT ACTIVE DAY BUTTON
============================================ */
function highlightDayButtons(dayRow, activeDay) {
  [...dayRow.children].forEach((btn) => {
    if (btn.textContent === activeDay) {
      btn.style.background = "#0a4cff";
      btn.style.color = "white";
    } else {
      btn.style.background = "rgba(255,255,255,0.1)";
      btn.style.color = "white";
    }
  });
}

/* ============================================
   GET TODAY'S DAY KEY (Mon–Fri)
============================================ */
function getTodayDayKey() {
  const map = {
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thur",
    5: "Fri"
  };

  const jsDay = new Date().getDay(); // 1 = Monday
  return map[jsDay] || "Mon";
}
