import { WEEKLY_SCHEDULE } from "../data/weeklySchedule.js";
import { Machine } from "./Machine.js";

export function DayView({ day }) {
  const container = document.createElement("div");
  container.className = "strength-screen";

  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = day;

  const machineList = WEEKLY_SCHEDULE[day];

  const buttons = document.createElement("div");
  buttons.className = "strength-buttons";

  machineList.forEach(id => {
    const btn = document.createElement("button");
    btn.className = "strength-btn";
    btn.textContent = `#${id} ${MACHINES[id].name}`;
    btn.onclick = () => window.renderScreen("Machine", id);
    buttons.appendChild(btn);
  });

  const backBtn = document.createElement("button");
  backBtn.className = "strength-back-btn";
  backBtn.textContent = "Back";
  backBtn.onclick = () => window.renderScreen("WeeklySchedule");

  container.appendChild(title);
  container.appendChild(buttons);
  container.appendChild(backBtn);

  return container;
}
