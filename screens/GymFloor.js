export default function GymFloor() {
  const container = document.createElement("div");
  container.className = "screen gymfloor-bg";

  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Gym Floor";
  container.appendChild(header);

  function makeButton(label, screen) {
    const btn = document.createElement("div");
    btn.className = "button";
    btn.textContent = label;
    btn.onclick = () => window.renderScreen(screen);
    return btn;
  }

  container.appendChild(makeButton("Strength Studio", "StrengthStudio"));
  container.appendChild(makeButton("Daily Schedule", "DailySchedule"));
  container.appendChild(makeButton("Cardio Studio", "CardioStudio"));
  container.appendChild(makeButton("Stretch Studio", "StretchStudio"));
  container.appendChild(makeButton("Nutrition Guide", "NutritionGuide"));

  return container;
}
