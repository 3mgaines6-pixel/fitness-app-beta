import { MACHINES } from "../data/machines.js";

export default function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "screen strength-bg";

  /* -------------------------------
     HEADER
  --------------------------------*/
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Strength Studio";
  container.appendChild(header);

  /* -------------------------------
     WEEK + BLOCK BADGE (W2 + BP1)
  --------------------------------*/
  const week = parseInt(localStorage.getItem("week") || "1");
  const block = week <= 2 ? "PRIMARY" : "SWAP";

  const badge = document.createElement("div");
  badge.className = "badge";
  badge.textContent = `Week ${week} of 4 • ${block}`;
  container.appendChild(badge);

  /* -------------------------------
     MACHINE LIST
  --------------------------------*/
  Object.keys(MACHINES).forEach((id) => {
    const machine = MACHINES[id];

    const btn = document.createElement("div");
    btn.className = "button";
    btn.textContent = `${machine.emoji} ${machine.name}`;
    btn.onclick = () => {
      localStorage.setItem("currentMachine", id);
      window.renderScreen("Machine");
    };

    container.appendChild(btn);
  });

  /* -------------------------------
     BACK BUTTON
  --------------------------------*/
  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back";
  back.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(back);

  return container;
}
