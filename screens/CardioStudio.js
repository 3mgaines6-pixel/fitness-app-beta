export default function CardioStudio() {
  const container = document.createElement("div");
  container.className = "screen cardio-bg-dark";

  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Cardio Studio";
  container.appendChild(header);

  function makeCardio(label, screen) {
    const btn = document.createElement("div");
    btn.className = "gym-button";
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

  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back";
  back.onclick = () => window.renderScreen("GymFloor");
  container.appendChild(back);

  return container;
}
