/* =========================================
   MACHINE SCREEN — BLUE HEADER + CUE BAR
========================================= */

import { MACHINES } from "../data/machines.js";
import { WEEKLY_SCHEDULE } from "../data/weekly.js";

export default function Machine(params) {
  const id = params.name;
  const machine = MACHINES[id];

  const container = document.createElement("div");
  container.className = "screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = `${id} — ${machine.emoji} ${machine.name}`;
  container.appendChild(header);

  /* COACHING CUE BAR */
  const cue = document.createElement("div");
  cue.className = "cue-bar";
  cue.textContent = machine.cue || "Focus on controlled reps and full ROM.";
  container.appendChild(cue);

  /* LAST SESSION CARD */
  const history = JSON.parse(localStorage.getItem("history") || "{}");
  const sets = history[id] || [];
  const last = sets[sets.length - 1];

  const lastCard = document.createElement("div");
  lastCard.className = "card-base";

  lastCard.innerHTML = last
    ? `<div class="weekly-title">Last Session</div>
       <div class="weekly-sub">${last.weight} lbs × ${last.reps} reps</div>`
    : `<div class="weekly-title">No previous sets</div>`;

  container.appendChild(lastCard);

  /* INPUTS */
  const weight = document.createElement("input");
  weight.className = "input-box";
  weight.placeholder = "Weight (lbs)";

  const reps = document.createElement("input");
  reps.className = "input-box";
  reps.placeholder = "Reps";

  container.appendChild(weight);
  container.appendChild(reps);

  /* SAVE SET BUTTON */
  const save = document.createElement("div");
  save.className = "button";
  save.textContent = "Save Set";
  save.onclick = () => {
    const w = Number(weight.value);
    const r = Number(reps.value);
    if (!w || !r) return;

    const entry = { weight: w, reps: r, date: new Date().toISOString() };
    const h = JSON.parse(localStorage.getItem("history") || "{}");
    h[id] = h[id] || [];
    h[id].push(entry);
    localStorage.setItem("history", JSON.stringify(h));

    window.renderScreen("Machine", params);
  };
  container.appendChild(save);

  /* NEXT MACHINE BUTTON */
  const next = document.createElement("div");
  next.className = "button";
  next.textContent = "Next Machine →";

  next.onclick = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = days[new Date().getDay()];
    const list = WEEKLY_SCHEDULE[today] || [];
    const index = list.indexOf(id);
    const nextID = list[index + 1];

    if (nextID) {
      window.renderScreen("Machine", { name: nextID, returnTo: params.returnTo });
    } else {
      window.renderScreen(params.returnTo || "DailySchedule");
    }
  };

  container.appendChild(next);

  /* BACK BUTTON */
  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back";
  back.onclick = () => window.renderScreen(params.returnTo || "StrengthStudio");
  container.appendChild(back);

  return container;
}
