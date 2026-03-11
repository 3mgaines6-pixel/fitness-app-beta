import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

function getTodayName() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date().getDay()];
}

function getWeekType() {
  const weekNumber = Math.ceil(new Date().getDate() / 7);
  return weekNumber <= 2 ? "primary" : "swap";
}

function findMachineByNumber(num) {
  return Object.values(MACHINES).find(m => m.number === num);
}

function applySwap(machine) {
  switch (machine.number) {
    case 12: return MACHINES.PLC;      // Seated Leg Curl → Prone Leg Curl
    case 7:  return MACHINES.CHEST_L;  // Chest Press Heavy → Light
    case 15: return MACHINES.PRESS_L;  // Leg Press Heavy → Light
    default: return machine;
  }
}

export default function StrengthStudio() {
  const root = document.createElement("div");
  root.className = "strength-screen";

  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Strength Studio";
  root.appendChild(title);

  // BLOCK INDICATOR
  const block = document.createElement("div");
  block.className = "block-indicator";

  const weekNumber = Math.ceil(new Date().getDate() / 7);
  const blockNumber = weekNumber <= 2 ? 1 : 2;

  block.textContent =
    blockNumber === 1
      ? "Block 1 — Heavy Week"
      : "Block 2 — Light Week (Swap Week Active)";

  root.appendChild(block);

  const today = getTodayName();
  const weekType = getWeekType();
  const machineNumbers = WEEKLY[today] || [];

  const list = document.createElement("div");
  list.className = "machine-list";

  machineNumbers.forEach(num => {
    let machine = findMachineByNumber(num);
    if (!machine) return;

    if (weekType === "swap") {
      machine = applySwap(machine);
    }

    const card = document.createElement("div");
    card.className = "machine-card";
    card.onclick = () => window.renderScreen("Machine", machine);

    card.innerHTML = `
      <div class="machine-name">${machine.number} • ${machine.emoji} ${machine.name}</div>
      <div class="machine-muscle">${machine.muscle}</div>
      <div class="machine-baseline">
        Baseline: ${machine.baseline ? machine.baseline + " lbs" : "—"}
      </div>
    `;

    list.appendChild(card);
  });

  root.appendChild(list);
  return root;
}
