export function GymFloor() {
  const container = document.createElement("div");
  container.className = "gym-floor-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "gym-header";
  header.textContent = "Gym Floor";

  /* TRAINING ZONES */
  const zonesTitle = document.createElement("div");
  zonesTitle.className = "section-title";
  zonesTitle.textContent = "Training Zones";

  const zonesCard = document.createElement("div");
  zonesCard.className = "gym-card";
  zonesCard.innerHTML = `
    <p style="font-size:1.1rem; color:#333; text-align:center;">
      Strength • Hypertrophy • Endurance
    </p>
  `;

  /* TRAINING ANALYTICS */
  const analyticsTitle = document.createElement("div");
  analyticsTitle.className = "section-title";
  analyticsTitle.textContent = "Training Analytics";

  const analyticsCard = document.createElement("div");
  analyticsCard.className = "gym-card";
  analyticsCard.innerHTML = `
    <p style="font-size:1.1rem; color:#333; text-align:center;">
      Weekly Volume • Block Progression • PR Tracking
    </p>
  `;

  /* BUTTONS */
  const strengthBtn = document.createElement("button");
  strengthBtn.className = "gym-btn";
  strengthBtn.textContent = "Strength Studio";
  strengthBtn.onclick = () => window.renderScreen("StrengthStudio");

  const cardioBtn = document.createElement("button");
  cardioBtn.className = "gym-btn";
  cardioBtn.textContent = "Cardio Studio";
  cardioBtn.onclick = () => window.renderScreen("CardioStudio");

  const stretchBtn = document.createElement("button");
  stretchBtn.className = "gym-btn";
  stretchBtn.textContent = "Stretch Studio";
  stretchBtn.onclick = () => window.renderScreen("StretchStudio");

  const nutritionBtn = document.createElement("button");
  nutritionBtn.className = "gym-btn";
  nutritionBtn.textContent = "Nutrition Guide";
  nutritionBtn.onclick = () => window.renderScreen("NutritionGuide");

  /* BUILD SCREEN */
  container.append(
    header,
    zonesTitle,
    zonesCard,
    analyticsTitle,
    analyticsCard,
    strengthBtn,
    cardioBtn,
    stretchBtn,
    nutritionBtn
  );

  return container;
}
