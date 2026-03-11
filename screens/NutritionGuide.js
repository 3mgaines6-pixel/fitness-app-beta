export default function NutritionGuide() {
  const container = document.createElement("div");
  container.className = "strength-screen";

  /* -------------------------------
     TITLE
  --------------------------------*/
  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = "Nutrition Guide";
  container.appendChild(title);

  /* -------------------------------
     HYDRATION CARD
  --------------------------------*/
  const waterCard = document.createElement("div");
  waterCard.className = "machine-card";

  waterCard.innerHTML = `
    <div class="machine-name">Hydration Goal</div>
    <div class="machine-baseline">Enter your bodyweight to calculate water intake.</div>
  `;

  const weightInput = document.createElement("input");
  weightInput.className = "input-box";
  weightInput.placeholder = "Bodyweight (lbs)";
  waterCard.appendChild(weightInput);

  const calcWater = document.createElement("div");
  calcWater.className = "gym-button";
  calcWater.textContent = "Calculate Water";
  waterCard.appendChild(calcWater);

  /* -------------------------------
     PERMANENT WHITE RESULT BOX
  --------------------------------*/
  const waterResult = document.createElement("div");
  waterResult.className = "water-result-box";
  waterResult.textContent = ""; // empty but visible box
  waterCard.appendChild(waterResult);

  calcWater.onclick = () => {
    const w = Number(weightInput.value);
    if (!w) return;
    const ounces = Math.round(w * 0.7);
    waterResult.textContent = `Recommended: ${ounces} oz per day`;
  };

  container.appendChild(waterCard);

  /* -------------------------------
     COACH'S NOTE
  --------------------------------*/
  const coach = document.createElement("div");
  coach.className = "machine-card";
  coach.innerHTML = `
    <div class="machine-name">Coach's Note</div>
    <div class="machine-baseline">
      Stay consistent. Hydrate early. Hydrate often. Hydration is a 24-hour window.
      Your training is only as good as your recovery.
    </div>
  `;
  container.appendChild(coach);

  /* -------------------------------
     BACK BUTTON
  --------------------------------*/
  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back";
  back.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(back);

  return container;
}
