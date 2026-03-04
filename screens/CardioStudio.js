export function CardioStudio() {
  const container = document.createElement("div");
  container.className = "cardio-screen";

  const wrapper = document.createElement("div");
  wrapper.className = "cardio-wrapper";
  container.appendChild(wrapper);

  /* HEADER */
  const header = document.createElement("div");
  header.className = "cardio-header";
  header.textContent = "Cardio Studio";
  wrapper.appendChild(header);

  /* BUTTON CREATOR */
  function makeBtn(label, screen) {
    const btn = document.createElement("button");
    btn.className = "cardio-btn";
    btn.textContent = label;
    btn.onclick = () => window.renderScreen(screen);
    return btn;
  }

  /* CARDIO OPTIONS */
  wrapper.appendChild(makeBtn("🏃‍♂️ Matrix Treadmill", "MatrixTreadmill"));
  wrapper.appendChild(makeBtn("🚴 Spin Class", "SpinClass"));
  wrapper.appendChild(makeBtn("💪 Core Class", "CoreClass"));
  wrapper.appendChild(makeBtn("🚲 Matrix Cycle", "MatrixCycle"));
  wrapper.appendChild(makeBtn("🏃‍♂️ Matrix Elliptical", "MatrixElliptical"));
  wrapper.appendChild(makeBtn("🚣 Rowing Machine", "RowingMachine"));
  wrapper.appendChild(makeBtn("🌤 Outdoor Walk", "OutdoorWalk"));
  wrapper.appendChild(makeBtn("📅 Cardio History", "CardioHistory"));

  /* RETURN BUTTON */
  const returnBtn = document.createElement("button");
  returnBtn.className = "cardio-return-btn";
  returnBtn.textContent = "← Return to Gym Floor";
  returnBtn.onclick = () => window.renderScreen("GymFloor");
  wrapper.appendChild(returnBtn);

  return container;
}
