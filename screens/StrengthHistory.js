import { MACHINES } from "../data/machines.js";
import { loadHistory, formatSession } from "../utils/history.js";

export default function StrengthHistory() {
  const root = document.createElement("div");
  root.className = "strength-screen";

  // Title
  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Strength History";
  root.appendChild(title);

  // Back button
  const backBtn = document.createElement("div");
  backBtn.className = "gym-button";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  root.appendChild(backBtn);

  // Loop through machines
  Object.values(MACHINES).forEach(machine => {
    const history = loadHistory(machine.number, machine.type);
    if (!history.length) return;

    const card = document.createElement("div");
    card.className = "machine-card";

    card.innerHTML = `
      <div class="machine-name">#${machine.number} ${machine.name}</div>
      <div class="machine-baseline">
        ${history.map(formatSession).join("<br>")}
      </div>
    `;

    card.onclick = () => window.renderScreen("Machine", {
      id: machine.id,
      number: machine.number,
      day: null
    });

    root.appendChild(card);
  });

  return root;
}
