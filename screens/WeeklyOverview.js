import { MACHINES } from "../data/machines.js";

export default function WeeklyOverview() {
  const container = document.createElement("div");
  container.className = "weekly-screen";

  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Weekly Overview";
  container.appendChild(header);

  const history = JSON.parse(localStorage.getItem("history") || "{}");

  let totalSets = 0;
  let totalVolume = 0;

  Object.keys(history).forEach((id) => {
    const sets = history[id];
    sets.forEach((s) => {
      totalSets++;
      totalVolume += s.weight * s.reps;
    });
  });

  const summary = document.createElement("div");
  summary.className = "card-base";
  summary.innerHTML = `
    <div class="weekly-title">${totalSets} total sets</div>
    <div class="weekly-sub">${totalVolume} lbs total volume</div>
  `;
  container.appendChild(summary);

  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back";
  back.onclick = () => window.renderScreen("StrengthStudio");
  container.appendChild(back);

  return container;
}
