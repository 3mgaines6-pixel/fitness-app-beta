export default function CardioStudio() {
  const container = document.createElement("div");

  // IMPORTANT: this activates the treadmill background
  container.className = "cardio-screen";

  /* -------------------------------
     HEADER
  --------------------------------*/
  const header = document.createElement("div");
  header.className = "strength-title";   // unified blue title style
  header.textContent = "Cardio Studio";
  container.appendChild(header);

  /* -------------------------------
     CARDIO OPTIONS
  --------------------------------*/
  function makeCardio(label, screen) {
    const btn = document.createElement("div");
    btn.className = "gym-button"; // white buttons for cardio
    btn.textContent = label;
    btn.onclick = () => window.renderScreen(screen);
    return btn;
  }

  container.appendChild(makeCardio("🏃‍♂️ Matrix Treadmill", "MatrixTreadmill"));
  container.appendChild(makeCardio("🚴‍♂️ Matrix Cycle", "MatrixCycle"));
  container.appendChild(makeCardio("🏋️‍♂️ Matrix Elliptical", "MatrixElliptical"));
  container.appendChild(makeCardio("🚴 Spin Class", "SpinClass"));
  container.appendChild(makeCardio("🌤 Outdoor Walk", "OutdoorWalk"));
  container.appendChild(makeCardio("🚣 Rowing", "Rowing"));

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
