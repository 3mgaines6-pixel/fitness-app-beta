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
     PROTEIN CARD
  --------------------------------*/
  const proteinCard = document.createElement("div");
  proteinCard.className = "machine-card";

  proteinCard.innerHTML = `
    <div class="machine-name">Daily Protein Target</div>
    <div class="machine-baseline">
      Choose your goal and enter your bodyweight.
    </div>
  `;

  const proteinInput = document.createElement("input");
  proteinInput.className = "input-box";
  proteinInput.placeholder = "Bodyweight (lbs)";
  proteinCard.appendChild(proteinInput);

  const modeSelect = document.createElement("select");
  modeSelect.className = "input-box";
  modeSelect.innerHTML = `
    <option value="maintain">Maintenance</option>
    <option value="muscle">Muscle Gain</option>
    <option value="loss">Weight Loss</option>
    <option value="hybrid">Hybrid</option>
    <option value="auto">Auto (Based on Training Day)</option>
  `;
  proteinCard.appendChild(modeSelect);

  const calcProtein = document.createElement("div");
  calcProtein.className = "gym-button";
  calcProtein.textContent = "Calculate Protein";
  proteinCard.appendChild(calcProtein);

  const proteinResult = document.createElement("div");
  proteinResult.className = "water-result-box";
  proteinResult.textContent = "";
  proteinCard.appendChild(proteinResult);

  calcProtein.onclick = () => {
    const w = Number(proteinInput.value);
    if (!w) return;

    let grams = 0;

    switch (modeSelect.value) {
      case "maintain":
        grams = Math.round(w * 0.8);
        break;
      case "muscle":
        grams = Math.round(w * 1.0);
        break;
      case "loss":
        grams = Math.round(w * 1.1);
        break;
      case "hybrid":
        grams = Math.round(w * 0.95);
        break;
      case "auto":
        grams = autoProtein(w);
        break;
    }

    proteinResult.textContent = `${grams}g protein per day`;
  };

  container.appendChild(proteinCard);

  /* -------------------------------
     AUTO PROTEIN LOGIC
  --------------------------------*/
  function autoProtein(weight) {
    const day = new Date().getDay(); // 0–6
    const heavyDays = [1, 3]; // Mon, Wed
    const moderateDays = [2, 5]; // Tue, Fri
    const lightDays = [4]; // Thu

    if (heavyDays.includes(day)) return Math.round(weight * 1.1);
    if (moderateDays.includes(day)) return Math.round(weight * 1.0);
    if (lightDays.includes(day)) return Math.round(weight * 0.9);
    return Math.round(weight * 0.8); // rest day
  }

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

  const waterResult = document.createElement("div");
  waterResult.className = "water-result-box";
  waterResult.textContent = "";
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
