import { WEEKLY_SCHEDULE } from "../data/weeklySchedule.js";

export function WeeklySchedule() {
  const container = document.createElement("div");
  container.className = "strength-screen";

  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Weekly Schedule";

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const dayButtons = document.createElement("div");
  dayButtons.className = "strength-buttons";

  days.forEach(day => {
    const btn = document.createElement("button");
    btn.className = "strength-btn";
    btn.textContent = day;

    if (day === today) {
      btn.style.background = "rgba(0,150,255,0.4)";
      btn.style.border = "2px solid #4da3ff";
    }

    btn.onclick = () => {
      window.renderScreen("DayView", { day });
    };

    dayButtons.appendChild(btn);
  });

  container.appendChild(title);
  container.appendChild(dayButtons);

  return container;
}
