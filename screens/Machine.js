/* ============================================================
   MACHINE SCREEN — OBJECT VERSION (NO ID LOOKUPS)
============================================================ */

import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function Machine(machine) {
  // machine is already the full object from StrengthStudio
  const id = machine.id;        // "CHEST"
  const num = machine.number;   // 7

  const container = document.createElement("div");
  container.className = "strength-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = `${machine.number} • ${machine.emoji} ${machine.name}`;
  container.appendChild(header);

  /* CUE BAR */
  const cue = document.createElement("div");
  cue.className = "cue-bar";
  cue.textContent = machine.cue;
  container.appendChild(cue);

  /* TEMPO DEFAULTS */
  let tempo =
    machine.type === "Heavy"
      ? "3-1-2"
      : machine.type === "Core"
      ? "2-2-2"
      : "2-1-2";

  /* TEMPO CARD */
  const tempoCard = document.createElement("div");
  tempoCard.className = "machine-card";

  const tempoTitle = document.createElement("div");
  tempoTitle.className = "machine-name";
  tempoTitle.textContent = "Tempo";

  const tempoToggle = document.createElement("div");
  tempoToggle.className = "gym-button";
  tempoToggle.textContent = tempo;

  tempoToggle.onclick = () => {
    if (machine.type === "Heavy") {
      tempo = tempo === "3-1-2" ? "2-1-2" : "3-1-2";
    } else if (machine.type === "Light") {
      tempo = tempo === "2-1-2" ? "3-1-2" : "2-1-2";
    } else {
      tempo = tempo === "2-2-2" ? "3-1-2" : "2-2-2";
    }
    tempoToggle.textContent = tempo;
    cue.textContent = `Tempo ${tempo} — control the movement.`;
  };

  const tempoExplain = document.createElement("div");
  tempoExplain.className = "machine-baseline";
  tempoExplain.textContent = "Eccentric — Pause — Concentric";

  tempoCard.appendChild(tempoTitle);
  tempoCard.appendChild(tempoToggle);
  tempoCard.appendChild(tempoExplain);
  container.appendChild(tempoCard);

  /* REST TIMER */
  const timerBtn = document.createElement("div");
  timerBtn.className = "gym-button";
  timerBtn.textContent = "Start Rest Timer";

  timerBtn.onclick = () => {
    let seconds = machine.type === "Heavy" ? 90 : 60;

    const timer = document.createElement("div");
    timer.className = "machine-card";
    timer.style.fontSize = "22px";
    timer.style.textAlign = "center";
    timer.textContent = `${seconds}s`;

    container.appendChild(timer);

    const interval = setInterval(() => {
      seconds--;
      timer.textContent = `${seconds}s`;

      if (seconds <= 0) {
        clearInterval(interval);
        timer.textContent = "Done!";
        navigator.vibrate?.(200);
      }
    }, 1000);
  };

  container.appendChild(timerBtn);

  /* HISTORY */
  const history = JSON.parse(localStorage.getItem("history") || "{}");
  const sets = history[id] || [];
  const last = sets[sets.length - 1];

  /* LAST SESSION */
  const lastCard = document.createElement("div");
  lastCard.className = "machine-card";

  if (last) {
    const date = new Date(last.date).toLocaleDateString();
    lastCard.innerHTML = `
      <div class="machine-name">Last Session</div>
      <div class="machine-baseline">${last.weight} lbs × ${last.reps} reps — ${date} ${last.grip ? "(" + last.grip + ")" : ""}</div>
    `;
  } else {
    lastCard.innerHTML = `<div class="machine-name">No previous sets</div>`;
  }

  container.appendChild(lastCard);

  /* SUGGESTED WEIGHT */
  let suggested = null;

  if (last) {
    if (machine.type === "Heavy") {
      suggested = last.reps < 6 ? last.weight : last.weight + 5;
    } else if (machine.type === "Light") {
      suggested = last.reps < 10 ? last.weight : last.weight + 2.5;
    } else {
      suggested = last.reps > 20 ? last.weight + 2.5 : last.weight;
    }
  } else {
    suggested = machine.baseline;
  }

  if (last && suggested > last.weight + 10) suggested = last.weight + 10;

  const suggestCard = document.createElement("div");
  suggestCard.className = "machine-card";
  suggestCard.innerHTML = `
    <div class="machine-name">Suggested Weight</div>
    <div class="machine-baseline">${suggested} lbs</div>
  `;
  container.appendChild(suggestCard);

  /* SET INPUTS */
  const setInputs = [];

  function createSetCard(num) {
    const card = document.createElement("div");
    card.className = "machine-card";

    const title = document.createElement("div");
    title.className = "machine-name";
    title.textContent = `Set ${num}`;

    const w = document.createElement("input");
    w.className = "input-box";
    w.type = "number";
    w.step = "0.5";
    w.value = suggested;

    const r = document.createElement("input");
    r.className = "input-box";
    r.type = "number";
    r.placeholder = "Reps";

    let grip = null;
    if (Array.isArray(machine.grips)) {
      grip = machine.grips[0];
      const gripBtn = document.createElement("div");
      gripBtn.className = "gym-button";
      gripBtn.textContent = grip;

      gripBtn.onclick = () => {
        grip = grip === machine.grips[0] ? machine.grips[1] : machine.grips[0];
        gripBtn.textContent = grip;
      };

      card.appendChild(gripBtn);
    }

    card.appendChild(title);
    card.appendChild(w);
    card.appendChild(r);

    setInputs.push({ w, r, grip });
    return card;
  }

  container.appendChild(createSetCard(1));
  container.appendChild(createSetCard(2));
  container.appendChild(createSetCard(3));

  /* SAVE ALL SETS */
  const saveAll = document.createElement("div");
  saveAll.className = "gym-button";
  saveAll.textContent = "Save All Sets";

  saveAll.onclick = () => {
    const h = JSON.parse(localStorage.getItem("history") || "{}");
    h[id] = h[id] || [];

    let anySaved = false;

    setInputs.forEach(({ w, r, grip }) => {
      const weight = Number(w.value);
      const reps = Number(r.value);
      if (weight && reps) {
        h[id].push({
          weight,
          reps,
          grip,
          date: new Date().toISOString()
        });
        anySaved = true;
      }
    });

    if (!anySaved) return;

    localStorage.setItem("history", JSON.stringify(h));
    window.renderScreen("Machine", machine);
  };

  container.appendChild(saveAll);

  /* DELETE SYSTEM */
  if (sets.length > 0) {
    const list = document.createElement("div");
    list.className = "machine-card";

    sets.forEach((s, index) => {
      const item = document.createElement("div");
      item.className = "weekly-item";

      const date = new Date(s.date).toLocaleDateString();
      item.innerHTML = `
        <div>${s.weight} lbs × ${s.reps} reps — ${date} ${s.grip ? "(" + s.grip + ")" : ""}</div>
      `;

      const del = document.createElement("div");
      del.className = "delete-set";
      del.textContent = "🗑";

      del.onclick = () => {
        sets.splice(index, 1);
        history[id] = sets;
        localStorage.setItem("history", JSON.stringify(history));
        window.renderScreen("Machine", machine);
      };

      item.appendChild(del);
      list.appendChild(item);
    });

    const delAll = document.createElement("div");
    delAll.className = "gym-button";
    delAll.textContent = "Delete All Sets";

    delAll.onclick = () => {
      if (confirm("Delete all sets for this machine?")) {
        history[id] = [];
        localStorage.setItem("history", JSON.stringify(history));
        window.renderScreen("Machine", machine);
      }
    };

    list.appendChild(delAll);
    container.appendChild(list);
  }

  /* NEXT MACHINE */
  const next = document.createElement("div");
  next.className = "gym-button";
  next.textContent = "Next Machine →";

  next.onclick = () => {
    const today = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date().getDay()];
    const list = WEEKLY[today] || [];

    const index = list.indexOf(num);
    const nextNum = list[index + 1];

    if (nextNum) {
      const nextMachine = Object.values(MACHINES).find(m => m.number === nextNum);
      window.renderScreen("Machine", nextMachine);
    } else {
      window.renderScreen("DailySchedule");
    }
  };

  container.appendChild(next);

  /* BACK BUTTON */
  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back";
  back.onclick = () => window.renderScreen("StrengthStudio");
  container.appendChild(back);

  return container;
}
