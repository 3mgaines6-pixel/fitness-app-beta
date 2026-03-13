import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";
import { loadHistory } from "../utils/history.js";

export default function StrengthStudio() {
  const root = document.createElement("div");
  root.id = "strength-root";

  /* -----------------------------------------
     HEADER
  ----------------------------------------- */
  const header = document.createElement("div");
  header.className = "studio-header";
  header.textContent = "Strength Studio";
  root.appendChild(header);

  /* -----------------------------------------
     DAY SELECTOR
  ----------------------------------------- */
  const daySelector = document.createElement("div");
  daySelector.className = "day-selector";

  const days = Object.keys(WEEKLY);

  let selectedDay = localStorage.getItem("selectedDay") || days[0];

  function renderDayButtons() {
    daySelector.innerHTML = "";

    days.forEach(day => {
      const btn = document.createElement("div");
      btn.className = "day-button";
      if (day === selectedDay) btn.classList.add("active");
      btn.textContent = day;

      btn.onclick = () => {
        selectedDay = day;
        localStorage.setItem("selectedDay", selectedDay);
        renderMachineList();
        renderDayButtons();
      };

      daySelector.appendChild(btn);
    });
  }

  root.appendChild(daySelector);

  /* -----------------------------------------
     MACHINE LIST
  ----------------------------------------- */
  const list = document.createElement("div");
  list.className = "machine-list";
  root.appendChild(list);

  function isMachineComplete(machineId) {
    const type = MACHINES[machineId].type;
    const h = loadHistory(machineId, type);
    return h.length > 0;
  }

  function renderMachineList() {
    list.innerHTML = "";

    const config = WEEKLY[selectedDay];
    const machineIds = config.machines;

    machineIds.forEach((machineId, index) => {
      const m = MACHINES[machineId];
      const complete = isMachineComplete(machineId);

      const card = document.createElement("div");
      card.className = "machine-card";
      if (complete) card.classList.add("complete");

      card.innerHTML = `
        <div class="machine-card__left">
          <div class="machine-card__number">#${m.number}</div>
          <div class="machine-card__name">${m.name}</div>
          <div class="machine-card__meta">${m.muscle} • ${m.type}</div>
        </div>

        <div class="machine-card__right">
          <div class="machine-card__status">
            ${complete ? "Edit" : "Start"}
          </div>
          <div class="machine-card__dot ${complete ? "dot-complete" : "dot-empty"}"></div>
        </div>
      `;

      card.onclick = () => {
        window.renderScreen("Machine", {
          id: machineId,
          number: index + 1,
          day: selectedDay
        });
      };

      list.appendChild(card);
    });

    renderCompleteDayButton();
  }

  /* -----------------------------------------
     COMPLETE DAY BUTTON
  ----------------------------------------- */
  const completeDayBtn = document.createElement("div");
  completeDayBtn.className = "complete-day-btn";

  function renderCompleteDayButton() {
    const config = WEEKLY[selectedDay];
    const machineIds = config.machines;

    const allDone = machineIds.every(id => isMachineComplete(id));

    completeDayBtn.textContent = allDone
      ? "Day Complete ✓"
      : "Complete Day";

    completeDayBtn.classList.toggle("ready", allDone);

    completeDayBtn.onclick = () => {
      if (!allDone) return;
      window.renderScreen("Summary");
    };
  }

  root.appendChild(completeDayBtn);

  /* -----------------------------------------
     INITIAL RENDER
  ----------------------------------------- */
  renderDayButtons();
  renderMachineList();

  return root;
}
