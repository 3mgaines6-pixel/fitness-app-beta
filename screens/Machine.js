/* ============================================================
   FULL MACHINE SCREEN — 3 SETS + TEMPO + AUTO TIMER + COACHING
============================================================ */

import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function Machine(id) {
  const machine = MACHINES[id];

  /* SAFETY: Missing machine */
  if (!machine) {
    const error = document.createElement("div");
    error.className = "screen";
    error.innerHTML = `
      <div class="header">Error</div>
      <div class="card-base">Machine ID "${id}" not found.</div>
      <div class="gym-button" onclick="window.renderScreen('StrengthStudio')">← Back</div>
    `;
    return error;
  }

  const container = document.createElement("div");
  container.className = "screen strength-bg";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = `${machine.emoji} ${machine.name}`;
  container.appendChild(header);

  /* CUE BAR */
  const cue = document.createElement("div");
  cue.className = "cue-bar";
  cue.textContent = machine.cue || "Control the movement and use full ROM.";
  container.appendChild(cue);

  /* TEMPO SECTION (Layout A) */
  const tempoCard = document.createElement("div");
  tempoCard.className = "card-base";

  const tempoTitle = document.createElement("div");
  tempoTitle.className = "weekly-title";
  tempoTitle.textContent = "Tempo";

  const tempoToggle = document.createElement("div");
  tempoToggle.className = "button small-btn";
  let tempo = "3-1-2";
  tempoToggle.textContent = tempo;

  tempoToggle.onclick = () => {
    tempo = tempo === "3-1-2" ? "2-1-2" : tempo === "2-1-2" ? "3-0-3" : "3-1-2";
    tempoToggle.textContent = tempo;
    cue.textContent = `Tempo ${tempo} — control the eccentric.`;
  };

  const tempoExplain = document.createElement("div");
  tempoExplain.className = "weekly-sub";
  tempoExplain.textContent = "Eccentric — Pause — Concentric";

  tempoCard.appendChild(tempoTitle);
  tempoCard.appendChild(tempoToggle);
  tempoCard.appendChild(tempoExplain);
  container.appendChild(tempoCard);

  /* LOAD HISTORY */
  const history = JSON.parse(localStorage.getItem("history") || "{}");
  const sets = history[id] || [];
  const last = sets[sets.length - 1];

  /* LAST SESSION CARD */
  const lastCard = document.createElement("div");
  lastCard.className = "card-base";

  if (last) {
    const date = new Date(last.date).toLocaleDateString();
    lastCard.innerHTML = `
      <div class="weekly-title">Last Session</div>
      <div class="weekly-sub">${last.weight} lbs × ${last.reps} reps — ${date}</div>
    `;
  } else {
    lastCard.innerHTML = `<div class="weekly-title">No previous sets</div>`;
  }

  container.appendChild(lastCard);

  /* SUGGESTED WEIGHT */
  let suggested = null;

  if (machine.suggestedHeavy || machine.suggestedLight) {
    suggested = machine.suggestedHeavy || machine.suggestedLight;
  } else if (last) {
    if (last.reps < 6) suggested = last.weight;
    else if (last.reps <= 10) suggested = last.weight + 5;
    else suggested = last.weight + 10;
  }

  if (suggested) {
    const suggestCard = document.createElement("div");
    suggestCard.className = "card-base";
    suggestCard.innerHTML = `
      <div class="weekly-title">Suggested Weight</div>
      <div class="weekly-sub">${suggested} lbs</div>
    `;
    container.appendChild(suggestCard);
  }

  /* HEAVY JUMP WARNING */
  function checkWarning(w) {
    if (!suggested) return null;
    if (w > suggested + 20) {
      return "⚠️ That jump is too heavy — reduce weight for joint safety.";
    }
    return null;
  }

  /* THREE-SET BLOCK (Option B) */
  const setInputs = [];

  function createSetCard(num) {
    const card = document.createElement("div");
    card.className = "card-base";

    const title = document.createElement("div");
    title.className = "weekly-title";
    title.textContent = `Set ${num}`;

    const w = document.createElement("input");
    w.className = "input-box";
    w.placeholder = "Weight (lbs)";

    const r = document.createElement("input");
    r.className = "input-box";
    r.placeholder = "Reps";

    card.appendChild(title);
    card.appendChild(w);
    card.appendChild(r);

    setInputs.push({ w, r });
    return card;
  }

  container.appendChild(createSetCard(1));
  container.appendChild(createSetCard(2));
  container.appendChild(createSetCard(3));

  /* WARNING BAR */
  const warningBar = document.createElement("div");

  setInputs.forEach(({ w }) => {
    w.oninput = () => {
      const msg = checkWarning(Number(w.value));
      if (msg) {
        warningBar.className = "warning-bar";
        warningBar.textContent = msg;
        if (!container.contains(warningBar)) container.insertBefore(warningBar, tempoCard);
      } else {
        if (container.contains(warningBar)) container.removeChild(warningBar);
      }
    };
  });

  /* SAVE ALL SETS */
  const saveAll = document.createElement("div");
  saveAll.className = "button";
  saveAll.textContent = "Save All Sets";

  saveAll.onclick = () => {
    const h = JSON.parse(localStorage.getItem("history") || "{}");
    h[id] = h[id] || [];

    let anySaved = false;

    setInputs.forEach(({ w, r }) => {
      const weight = Number(w.value);
      const reps = Number(r.value);
      if (weight && reps) {
        h[id].push({ weight, reps, date: new Date().toISOString() });
        anySaved = true;
      }
    });

    if (!anySaved) return;

    localStorage.setItem("history", JSON.stringify(h));

    showCoachCard();
    startRestTimer();
  };

  container.appendChild(saveAll);

  /* COACHING CARD */
  const coachCard = document.createElement("div");
  coachCard.className = "card-base coach-card";
  coachCard.style.display = "none";

  function showCoachCard() {
    const messages = [
      "Great control — keep that tempo steady.",
      "Nice work. Stay tight and drive through the full ROM.",
      "Strong set. Keep breathing and stay locked in.",
      "Excellent tempo. Stay consistent on Set 2.",
      "Good effort — protect your joints and stay smooth."
    ];
    coachCard.textContent = messages[Math.floor(Math.random() * messages.length)];
    coachCard.style.display = "block";
  }

  container.appendChild(coachCard);

  /* REST TIMER (AUTO: 60s Light/Core, 90s Heavy) */
  const timer = document.createElement("div");
  timer.className = "timer-display";
  timer.style.display = "none";
  container.appendChild(timer);

  function startRestTimer() {
    const isHeavy = machine.type === "Heavy";
    let time = isHeavy ? 90 : 60;

    timer.style.display = "block";
    timer.textContent = `${time}s`;

    const interval = setInterval(() => {
      time--;
      timer.textContent = `${time}s`;

      if (time <= 0) {
        clearInterval(interval);
        timer.textContent = "Ready when you are.";
        navigator.vibrate?.(200);
      }
    }, 1000);
  }

  /* HISTORY LIST + DELETE */
  if (sets.length > 0) {
    const list = document.createElement("div");
    list.className = "set-history";

    sets.forEach((s, index) => {
      const item = document.createElement("div");
      item.className = "set-item";

      const date = new Date(s.date).toLocaleDateString();
      item.innerHTML = `<div>${s.weight} lbs × ${s.reps} reps — ${date}</div>`;

      /* Trash icon delete */
      const del = document.createElement("div");
      del.className = "delete-set";
      del.textContent = "🗑";
      del.onclick = () => {
        sets.splice(index, 1);
        history[id] = sets;
        localStorage.setItem("history", JSON.stringify(history));
        window.renderScreen("Machine", id);
      };

      /* Long-press delete */
      item.onmousedown = () => {
        item._pressTimer = setTimeout(() => del.onclick(), 600);
      };
      item.onmouseup = () => clearTimeout(item._pressTimer);

      item.appendChild(del);
      list.appendChild(item);
    });

    container.appendChild(list);

    /* DELETE ALL */
    const delAll = document.createElement("div");
    delAll.className = "delete-all";
    delAll.textContent = "Delete All Sets";

    delAll.onclick = () => {
      if (confirm("Delete all sets for this machine?")) {
        history[id] = [];
        localStorage.setItem("history", JSON.stringify(history));
        window.renderScreen("Machine", id);
      }
    };

    container.appendChild(delAll);
  }

  /* NEXT MACHINE */
  const next = document.createElement("div");
  next.className = "button";
  next.textContent = "Next Machine →";

  next.onclick = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = days[new Date().getDay()];
    const list = WEEKLY[today] || [];

    const index = list.indexOf(id);
    const nextID = list[index + 1];

    if (nextID) {
      window.renderScreen("Machine", nextID);
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
