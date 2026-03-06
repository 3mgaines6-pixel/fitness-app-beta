/* =========================================
   CARDIO STUDIO (DOM VERSION)
========================================= */

export default function CardioStudio() {
  const container = document.createElement("div");
  container.className = "cardio-studio";

  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Cardio Studio";
  container.appendChild(header);

  /* BUTTON FACTORY */
  function makeButton(label, screenName) {
    const btn = document.createElement("div");
    btn.className = "gym-button";
    btn.textContent = label;
    btn.onclick = () => window.renderScreen(screenName);
    return btn;
  }

  /* CARDIO OPTIONS */
  container.appendChild(makeButton("Matrix Treadmill", "MatrixTreadmill"));
  container.appendChild(makeButton("Matrix Cycle", "MatrixCycle"));
  container.appendChild(makeButton("Matrix Elliptical", "MatrixElliptical"));
  container.appendChild(makeButton("Spin Class", "SpinClass"));
  container.appendChild(makeButton("Outdoor Walk", "OutdoorWalk")); // placeholder
  container.appendChild(makeButton("Rowing", "Rowing")); // placeholder

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "back-button";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(backBtn);

  return container;
}
