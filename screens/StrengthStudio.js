/* ============================================================
   STRENGTH STUDIO — Daily Training Hub
============================================================ */

import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function StrengthStudio() {
  const container = document.createElement("div");
  container.className = "screen strength-bg";

  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Strength Studio";
  container.appendChild(header);

  const history = JSON.parse(localStorage.getItem("history") || "{}");

  const todayIndex = new Date().getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = days[todayIndex];

  const todayTitle = document.createElement("div");
  todayTitle.className = "weekly-title";
  todayTitle.textContent = `Today's Workout — ${today}`;
  container.appendChild(todayTitle);

  const list = WEEKLY[today] || [];

  list.forEach((id) => {
    const m = MACHINES[id];
    if (!m) return;

    const card = document.createElement("div");
    card.className = "card-base machine-card";

    const sets = history[id] || [];
    const last = sets[sets.length - 1];

    const lastText = last
      ? `Last: ${new Date(last.date).toLocaleDateString()}`
      : "No history";

    card.innerHTML = `
      <div class="machine-row">
        <div class="machine-info">
          <div class="machine-name">${m.emoji} ${m.name}</div>
          <div class="machine-sub">${lastText}</div>
        </div>
        <div class="tag ${m.type.toLowerCase()}">${m.type}</div>
      </div>
    `;

    card.onclick = () => window.renderScreen("Machine", id);

    container.appendChild(card);
  });

  /* NAV BUTTONS */
  const navWrap = document.createElement("div");
  navWrap.className = "nav-wrap";

  const weeklyBtn = document.createElement("div");
  weeklyBtn.className = "button";
  weeklyBtn.textContent = "Weekly Overview";
  weeklyBtn.onclick = () => window.renderScreen("WeeklyOverview");

  const historyBtn = document.createElement("div");
  historyBtn.className = "button";
  historyBtn.textContent = "Strength History";
  historyBtn.onclick = () => window.renderScreen("StrengthHistory");

  const scheduleBtn = document.createElement("div");
  scheduleBtn.className = "button";
  scheduleBtn.textContent = "Daily Schedule";
  scheduleBtn.onclick = () => window.renderScreen("DailySchedule");

  navWrap.appendChild(weeklyBtn);
  navWrap.appendChild(historyBtn);
  navWrap.appendChild(scheduleBtn);

  container.appendChild(navWrap);

  return container;
}
