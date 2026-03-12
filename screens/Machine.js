import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function Machine({ id, number, day }) {
  const m = MACHINES[id];

  /* -----------------------------------------
     WEEK / BLOCK / SWAP
  ----------------------------------------- */
  function getWeek() {
    return parseInt(localStorage.getItem("training_week") || "1");import { MACHINES } from "../data/machines.js";

export default function Machine(props) {
  const { id, number, day } = props || {};
  const machine = MACHINES[id];

  const root = document.createElement("div");
  root.className = "strength-screen";

  /* -------------------------------
     SAFETY CHECK
  --------------------------------*/
  if (!machine) {
    const title = document.createElement("h1");
    title.className = "strength-title";
    title.textContent = "Machine not found";
    root.appendChild(title);

    const back = document.createElement("div");
    back.className = "gym-button";
    back.textContent = "← Back to Strength";
    back.onclick = () => window.renderScreen("StrengthStudio");
    root.appendChild(back);

    return root;
  }

  /* -------------------------------
     HEADER
  --------------------------------*/
  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = `${number}. ${machine.emoji} ${machine.name}`;
  root.appendChild(title);

  /* -------------------------------
     DAY LABEL
  --------------------------------*/
  const dayLabel = document.createElement("div");
  dayLabel.className = "machine-baseline";
  dayLabel.textContent = `Today: ${day}`;
  root.appendChild(dayLabel);

  /* -------------------------------
     MUSCLE + TYPE
  --------------------------------*/
  const subtitle = document.createElement("div");
  subtitle.className = "machine-baseline";
  subtitle.textContent = `${machine.muscle} • ${machine.type}`;
  root.appendChild(subtitle);

  /* -------------------------------
     CUE BAR
  --------------------------------*/
  const cue = document.createElement("div");
  cue.className = "cue-bar";
  cue.textContent = machine.cue || "";
  root.appendChild(cue);

  /* -------------------------------
     TEMPO (LOCKED)
  --------------------------------*/
  const tempo = document.createElement("div");
  tempo.className = "gym-button";
  tempo.textContent = machine.tempo || getTempo(machine.type);
  tempo.style.opacity = "0.5";
  tempo.style.pointerEvents = "none";
  root.appendChild(tempo);

  /* -------------------------------
     SET INPUT CARDS (3 SETS)
  --------------------------------*/
  const setsContainer = document.createElement("div");
  setsContainer.className = "sets-container";

  const setInputs = [];

  for (let i = 1; i <= 3; i++) {
    const card = document.createElement("div");
    card.className = "machine-card";

    const label = document.createElement("div");
    label.className = "machine-name";
    label.textContent = `Set ${i}`;
    card.appendChild(label);

    const weight = document.createElement("input");
    weight.className = "input-box";
    weight.placeholder = "Weight (lbs)";
    weight.value = machine.baseline || "";
    card.appendChild(weight);

    const reps = document.createElement("input");
    reps.className = "input-box";
    reps.placeholder = "Reps";
    card.appendChild(reps);

    setInputs.push({ weight, reps });
    setsContainer.appendChild(card);
  }

  root.appendChild(setsContainer);

  /* -------------------------------
     SAVE SET BUTTON
  --------------------------------*/
  const saveBtn = document.createElement("div");
  saveBtn.className = "gym-button";
  saveBtn.textContent = "Save Sets";
  root.appendChild(saveBtn);

  /* -------------------------------
     HISTORY SECTION
  --------------------------------*/
  const historyCard = document.createElement("div");
  historyCard.className = "machine-card";
  historyCard.innerHTML = `
    <div class="machine-name">Today's Sets</div>
    <div class="machine-baseline" id="today-sets">No sets logged yet.</div>
    <br>
    <div class="machine-name">Last Workout</div>
    <div class="machine-baseline" id="last-sets">No previous workout logged.</div>
  `;
  root.appendChild(historyCard);

  /* -------------------------------
     GRIP TOGGLE
  --------------------------------*/
  if (machine.grips) {
    const gripBtn = document.createElement("div");
    gripBtn.className = "gym-button";
    let gripIndex = 0;
    const gripOptions = ["Inner", "Outer"];

    gripBtn.textContent = `Grip: ${gripOptions[gripIndex]}`;

    gripBtn.onclick = () => {
      gripIndex = (gripIndex + 1) % gripOptions.length;
      gripBtn.textContent = `Grip: ${gripOptions[gripIndex]}`;
    };

    root.appendChild(gripBtn);
  }

  /* -------------------------------
     REST TIMER
  --------------------------------*/
  const timerBtn = newElement("div", "gym-button", "Start Rest Timer");
  root.appendChild(timerBtn);

  const timerLabel = newElement("div", "machine-baseline", "");
  root.appendChild(timerLabel);

  let timerInterval = null;
  let remaining = 0;

  timerBtn.onclick = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerBtn.textContent = "Start Rest Timer";
      timerLabel.textContent = "";
      return;
    }

    remaining = 60;
    timerBtn.textContent = "Stop Rest Timer";
    timerLabel.textContent = `Rest: ${remaining}s`;

    timerInterval = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerBtn.textContent = "Start Rest Timer";
        timerLabel.textContent = "Rest complete";
      } else {
        timerLabel.textContent = `Rest: ${remaining}s`;
      }
    }, 1000);
  };

  /* -------------------------------
     SUGGESTED WEIGHT
  --------------------------------*/
  const suggested = document.createElement("div");
  suggested.className = "machine-baseline";
  suggested.textContent = `Suggested Weight: ${
    machine.baseline ? machine.baseline + " lbs" : "—"
  }`;
  root.appendChild(suggested);

  /* -------------------------------
     SAVE LOGIC
  --------------------------------*/
  saveBtn.onclick = () => {
    const todayKey = `history_${id}_today`;
    const lastKey = `history_${id}_last`;

    const todaySets = [];

    setInputs.forEach(({ weight, reps }) => {
      if (weight.value && reps.value) {
        todaySets.push(`${weight.value} × ${reps.value}`);
      }
    });

    if (todaySets.length === 0) return;

    const prevToday = localStorage.getItem(todayKey);
    if (prevToday) {
      localStorage.setItem(lastKey, prevToday);
    }

    localStorage.setItem(todayKey, JSON.stringify(todaySets));
    renderHistory();
  };

  /* -------------------------------
     HISTORY RENDERING
  --------------------------------*/
  function renderHistory() {
    const todayKey = `history_${id}_today`;
    const lastKey = `history_${id}_last`;

    const todayEl = historyCard.querySelector("#today-sets");
    const lastEl = historyCard.querySelector("#last-sets");

    const todayData = JSON.parse(localStorage.getItem(todayKey) || "[]");
    const lastData = JSON.parse(localStorage.getItem(lastKey) || "[]");

    todayEl.textContent =
      todayData.length > 0 ? todayData.join("\n") : "No sets logged yet.";

    lastEl.textContent =
      lastData.length > 0 ? lastData.join("\n") : "No previous workout logged.";
  }

  renderHistory();

  /* -------------------------------
     BACK BUTTON
  --------------------------------*/
  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back to Strength";
  back.onclick = () => window.renderScreen("StrengthStudio");
  root.appendChild(back);

  return root;
}

/* -------------------------------
   TEMPO DEFAULTS
--------------------------------*/
function getTempo(type) {
  if (type === "Heavy") return "3-1-2";
  if (type === "Core") return "2-2-2";
  return "2-1-2";
}

/* -------------------------------
   SMALL HELPER
--------------------------------*/
function newElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

  }

  function getBlock(week) {
    return week === 1 || week === 3 ? "Heavy" : "Light";
  }

  function isSwapWeek() {
    return localStorage.getItem("swap_week") === "true";
  }

  const week = getWeek();
  const block = getBlock(week);

  /* -----------------------------------------
     HISTORY KEYS
  ----------------------------------------- */
  const todayKey = `history_${id}_today`;
  const allKey = `history_${id}_all`;

  let todaySets = JSON.parse(localStorage.getItem(todayKey) || "[]");
  let allHistory = JSON.parse(localStorage.getItem(allKey) || "[]");

  /* -----------------------------------------
     BASELINE + LAST SESSION
  ----------------------------------------- */
  const baseline = m.base || 0;

  const lastSession = allHistory.length
    ? allHistory[allHistory.length - 1]
    : null;

  /* -----------------------------------------
     REP TARGETS
  ----------------------------------------- */
  const repTargets = {
    Heavy: { min: 6, max: 8 },
    Light: { min: 10, max: 12 },
    Core: { min: 12, max: 15 }
  };

  const target = repTargets[m.type] || repTargets.Core;

  /* -----------------------------------------
     SUGGESTED WEIGHT ENGINE
  ----------------------------------------- */
  function getSuggestedWeight() {
    if (!lastSession) return baseline;

    const last = lastSession.sets;
    const allTop = last.every(s => parseInt(s.reps) >= target.max);

    if (allTop) {
      if (m.type === "Heavy") return parseFloat(last[0].weight) + 5;
      if (m.type === "Light") return parseFloat(last[0].weight) + 2.5;
      return parseFloat(last[0].weight) + 2.5;
    }

    return parseFloat(last[0].weight);
  }

  let suggestedWeight = getSuggestedWeight();

  /* -----------------------------------------
     DRAWER (DS1, 50% HEIGHT)
  ----------------------------------------- */
  const drawer = document.createElement("div");
  drawer.className = "set-drawer";
  drawer.innerHTML = `
    <div class="drawer-handle"></div>
    <div class="drawer-content">
      <div class="drawer-title">Log Set</div>

      <div class="drawer-last">
        ${lastSession ? `Last: ${lastSession.sets[0].weight} × ${lastSession.sets[0].reps}` : "No previous session"}
      </div>

      <div class="drawer-inputs">
        <input id="drawer-weight" type="number" placeholder="Weight">
        <input id="drawer-reps" type="number" placeholder="Reps">
      </div>

      <div class="drawer-warning" id="drawer-warning"></div>

      <div class="drawer-log-btn">Log Set</div>
    </div>
  `;
  document.body.appendChild(drawer);

  function openDrawer(setIndex) {
    drawer.dataset.index = setIndex;
    document.getElementById("drawer-weight").value = suggestedWeight;
    document.getElementById("drawer-reps").value = "";
    drawer.classList.add("open");
  }

  function closeDrawer() {
    drawer.classList.remove("open");
  }

  /* -----------------------------------------
     LOG SET (L1, W1, B2)
  ----------------------------------------- */
  drawer.querySelector(".drawer-log-btn").onclick = () => {
    const i = parseInt(drawer.dataset.index);
    const w = document.getElementById("drawer-weight").value;
    const r = document.getElementById("drawer-reps").value;

    if (!w || !r) return;

    todaySets[i] = { weight: w, reps: r };
    localStorage.setItem(todayKey, JSON.stringify(todaySets));

    closeDrawer();
    renderSets();

    const next = i + 1;
    if (next < 3) {
      setTimeout(() => {
        document.querySelectorAll(".set-row")[next].scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  /* -----------------------------------------
     INNER / OUTER SELECTOR
  ----------------------------------------- */
  function renderVariation(container) {
    if (m.variation !== "inner-outer") return;

    const v = document.createElement("div");
    v.className = "variation-selector";

    const saved = localStorage.getItem(`variation_${id}`) || "inner";

    ["inner", "outer"].forEach(opt => {
      const btn = document.createElement("div");
      btn.className = `variation-btn ${saved === opt ? "active" : ""}`;
      btn.textContent = opt.toUpperCase();
      btn.onclick = () => {
        localStorage.setItem(`variation_${id}`, opt);
        renderVariation(container);
      };
      v.appendChild(btn);
    });

    container.appendChild(v);
  }

  /* -----------------------------------------
     NO TIME BUTTON
  ----------------------------------------- */
  function renderNoTime(container) {
    const nt = document.createElement("div");
    nt.className = "no-time-btn";
    nt.textContent = "No Time";
    nt.onclick = () => {
      nt.classList.add("used");
    };
    container.appendChild(nt);
  }
  /* -----------------------------------------
     REST TIMER BUTTON (REAL TIMER)
  ----------------------------------------- */
  let timerInterval = null;
  let timerSeconds = 120; // 2:00 default

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function startTimer(btn) {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerSeconds = 120;
      btn.textContent = "2:00";
      return;
    }

    timerSeconds = 120;
    btn.textContent = formatTime(timerSeconds);

    timerInterval = setInterval(() => {
      timerSeconds--;
      btn.textContent = formatTime(timerSeconds);

      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerSeconds = 120;
        btn.textContent = "2:00";
      }
    }, 1000);
  }

  /* -----------------------------------------
     RENDER SET ROWS
  ----------------------------------------- */
  function renderSets() {
    const container = document.getElementById("sets-container");
    container.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      const row = document.createElement("div");
      row.className = "set-row";

      const label = document.createElement("div");
      label.className = "set-label";
      label.textContent = `Set ${i + 1}`;

      const val = todaySets[i]
        ? `${todaySets[i].weight} × ${todaySets[i].reps}`
        : "—";

      const value = document.createElement("div");
      value.className = "set-value";
      value.textContent = val;

      const logBtn = document.createElement("div");
      logBtn.className = "set-log-btn";
      logBtn.textContent = todaySets[i] ? "Edit" : "Log";
      logBtn.onclick = () => openDrawer(i);

      const delBtn = document.createElement("div");
      delBtn.className = "set-del-btn";
      delBtn.textContent = "×";
      delBtn.onclick = () => {
        todaySets[i] = null;
        localStorage.setItem(todayKey, JSON.stringify(todaySets));
        renderSets();
      };

      row.appendChild(label);
      row.appendChild(value);
      row.appendChild(logBtn);
      row.appendChild(delBtn);

      container.appendChild(row);
    }
  }

  /* -----------------------------------------
     HEAVY JUMP WARNING
  ----------------------------------------- */
  function checkHeavyJump() {
    if (!lastSession) return "";

    const lastW = parseFloat(lastSession.sets[0].weight);
    const jump = suggestedWeight - lastW;

    if (jump >= 10) {
      return "Warning: Big jump from last session.";
    }
    return "";
  }

  /* -----------------------------------------
     MAIN RENDER
  ----------------------------------------- */
  const root = document.getElementById("machine-root");
  root.innerHTML = "";

  /* TITLE */
  const title = document.createElement("div");
  title.className = "machine-title";
  title.textContent = m.name;
  root.appendChild(title);

  /* VARIATION */
  renderVariation(root);

  /* REP TARGETS */
  const reps = document.createElement("div");
  reps.className = "rep-targets";
  reps.textContent = `${target.min}–${target.max} reps`;
  root.appendChild(reps);

  /* TIMER BUTTON */
  const timerBtn = document.createElement("div");
  timerBtn.className = "timer-btn";
  timerBtn.textContent = "2:00";
  timerBtn.onclick = () => startTimer(timerBtn);
  root.appendChild(timerBtn);

  /* HEAVY JUMP WARNING */
  const warn = document.createElement("div");
  warn.className = "heavy-warning";
  warn.textContent = checkHeavyJump();
  root.appendChild(warn);

  /* SETS CONTAINER */
  const setsContainer = document.createElement("div");
  setsContainer.id = "sets-container";
  root.appendChild(setsContainer);

  renderSets();

  /* -----------------------------------------
     NEXT MACHINE BUTTON
  ----------------------------------------- */
  const nextBtn = document.createElement("div");
  nextBtn.className = "next-machine-btn";
  nextBtn.textContent = "Next Machine";
  nextBtn.onclick = () => {
    window.location.href = `/strength/${parseInt(number) + 1}`;
  };
  root.appendChild(nextBtn);
  /* -----------------------------------------
     COMPLETE DAY BUTTON
  ----------------------------------------- */
  const completeBtn = document.createElement("div");
  completeBtn.className = "complete-day-btn";
  completeBtn.textContent = "Complete Day";
  completeBtn.onclick = () => {
    // Save today's sets into full history if all 3 sets are logged
    if (todaySets.filter(s => s).length === 3) {
      allHistory.push({
        date: new Date().toISOString(),
        sets: todaySets
      });
      localStorage.setItem(allKey, JSON.stringify(allHistory));
    }

    // S3: Clear ALL today's sets for ALL machines
    Object.keys(localStorage).forEach(k => {
      if (k.endsWith("_today")) {
        localStorage.removeItem(k);
      }
    });

    // Navigate to workout complete screen
    window.location.href = "/strength/complete";
  };
  root.appendChild(completeBtn);

  /* -----------------------------------------
     BACK BUTTON
  ----------------------------------------- */
  const backBtn = document.createElement("div");
  backBtn.className = "back-btn";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => {
    window.location.href = "/strength";
  };
  root.appendChild(backBtn);
}
