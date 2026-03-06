/* =========================================
   STRENGTH HISTORY (DOM VERSION)
========================================= */

import { MACHINES } from "../data/machines.js";

export default function StrengthHistory() {
  const container = document.createElement("div");
  container.className = "history-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Strength History";
  container.appendChild(header);

  /* LOAD FULL HISTORY */
  const history = JSON.parse(localStorage.getItem("history") || "{}");

  const list = document.createElement("div");
  list.className = "scroll-list";
  container.appendChild(list);

  const machineIDs = Object.keys(history);

  /* EMPTY STATE */
  if (machineIDs.length === 0) {
    const empty = document.createElement("div");
    empty.className = "card-base";
    empty.style.textAlign = "center";
    empty.style.fontSize = "18px";
    empty.textContent = "No strength workouts logged yet";
    list.appendChild(empty);
  }

  /* MACHINE CARDS */
  machineIDs.forEach((id) => {
    const machine = MACHINES[id];
    if (!machine) return;

    const sets = history[id] || [];

    const card = document.createElement("div");
    card.className = "card-base";
    card.style.cursor = "pointer";

    card.innerHTML = `
      <div class="history-title">${id} — ${machine.name}</div>
      <div class="history-sub">${sets.length} total sets logged</div>
    `;

    card.onclick = () => {
      window.renderScreen("MachineHistory", { id });
    };

    list.appendChild(card);
  });

  /* BACK BUTTON */
  const backBtn = document.createElement("button");
  backBtn.className = "return-btn";
  backBtn.textContent = "Return to Gym Floor";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(backBtn);

  return container;
}
