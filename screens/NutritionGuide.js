export function NutritionGuide() {
  const container = document.createElement("div");
  container.className = "nutrition-screen";

  const title = document.createElement("h1");
  title.textContent = "Nutrition Guide";
  container.appendChild(title);

  const tips = document.createElement("div");
  tips.className = "nutrition-tips";
  tips.innerHTML = `
    <h2>Simple Nutrition Strategy</h2>
    <ul>
      <li>Eat a mix of proteins, carbs, and healthy fats.</li>
      <li>Aim for protein at every meal.</li>
      <li>Drink water throughout the day.</li>
    </ul>
  `;
  container.appendChild(tips);

  const backBtn = document.createElement("button");
  backBtn.className = "nutrition-back-btn";
  backBtn.textContent = "Back to Gym Floor";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(backBtn);

  return container;
}
