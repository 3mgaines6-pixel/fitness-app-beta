/* =========================================
   SUMMARY SCREEN — FULL FEATURE VERSION
========================================= */

import { MACHINES } from "../data/machines.js";

export default function Summary() {
  const root = document.createElement("div");
  root.className = "summary-screen";

  /* HEADER */
  const header = document.createElement("h1");
  header.className = "summary-title";
  header.textContent = "Workout Summary";
  root.appendChild(header);

  /* COLLECT TODAY'S SETS */
  const todayKeys = Object.keys(localStorage).filter(k =>
    k.startsWith("history_") && k.endsWith("_today")
  );

  let totalSets = 0;
  let totalVolume = 0;

  /* SUMMARY TOTALS */
  const totals = document.createElement("div");
  totals.className = "summary-totals";

  todayKeys.forEach(key => {
    const sets = JSON.parse(localStorage.getItem(key) || "[]");

    sets.forEach(s => {
      if (!s) return;
      totalSets++;
      totalVolume += parseInt(s.weight) * parseInt(s.reps);
    });
  });

  totals.innerHTML = `
    <div><strong>Total Sets:</strong> ${totalSets}</div>
    <div><strong>Total Volume:</strong> ${totalVolume} lbs</div>
  `;
  root.appendChild(totals);

  /* PER-MACHINE BREAKDOWN */
  const list = document.createElement("div");
  list.className = "summary-list";
  root.appendChild(list);

  todayKeys.forEach(key => {
    const id = key.replace("history_", "").replace("_today", "");
    const m = MACHINES[id];
    if (!m) return;

    const sets = JSON.parse(localStorage.getItem(key) || "[]");

    const card = document.createElement("div");
    card.className = "summary-card";

    const title = document.createElement("div");
    title.className = "summary-machine";
    title.textContent = `${m.emoji} ${m.name}`;
    card.appendChild(title);

    sets.forEach((s, i) => {
      if (!s) return;

      const row = document.createElement("div");
      row.className = "summary-set";
      row.textContent = `Set ${i + 1}: ${s.weight} lbs × ${s.reps}`;
      card.appendChild(row);
    });

    list.appendChild(card);
  });

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "back-button";
  backBtn.textContent = "Return to Strength Studio";
  backBtn.onclick = () => window.renderScreen("StrengthStudio");
  root.appendChild(backBtn);

  return root;
}
