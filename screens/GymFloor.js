export default function GymFloor() {
  const container = document.createElement("div");
  container.className = "gymfloor-bg";


  const title = document.createElement("h1");
  title.className = "gymfloor-title";
  title.textContent = "Gym Floor";
  container.appendChild(title);

  const menu = document.createElement("div");
  menu.className = "gymfloor-menu";

  const buttons = [
    { label: "🏆 Strength Studio", screen: "StrengthStudio" },
    { label: "🏃‍♂️ Cardio Studio", screen: "CardioStudio" },
    { label: "🥗 Nutrition Guide", screen: "NutritionGuide" },
    { label: "📅 Weekly Overview", screen: "WeeklyOverview" },
    { label: "📈 Strength History", screen: "StrengthHistory" }
  ];

  buttons.forEach(btn => {
    const b = document.createElement("div");
    b.className = "gymfloor-button";
    b.textContent = btn.label;
    b.onclick = () => window.renderScreen(btn.screen);
    menu.appendChild(b);
  });

  container.appendChild(menu);

  return container;
}
