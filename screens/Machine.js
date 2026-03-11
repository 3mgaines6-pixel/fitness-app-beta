export default function Machine(machine) {
  const root = document.createElement("div");
  root.className = "strength-screen";

  const title = document.createElement("h1");
  title.className = "strength-title";
  title.textContent = `${machine.number} • ${machine.emoji} ${machine.name}`;
  root.appendChild(title);

  // CUE BAR
  const cue = document.createElement("div");
  cue.className = "cue-bar";
  cue.textContent = machine.cue;
  root.appendChild(cue);

  // TEMPO (LOCKED)
  const tempoToggle = document.createElement("div");
  tempoToggle.className = "gym-button";
  tempoToggle.textContent = machine.tempo;

  // Option 2 — faded, disabled
  tempoToggle.style.opacity = "0.5";
  tempoToggle.style.pointerEvents = "none";

  root.appendChild(tempoToggle);

  // REST TIMER BUTTON
  const timerBtn = document.createElement("div");
  timerBtn.className = "gym-button";
  timerBtn.textContent = "Start Rest Timer";
  root.appendChild(timerBtn);

  // SUGGESTED WEIGHT
  const suggested = document.createElement("div");
  suggested.className = "machine-baseline";
  suggested.textContent = `Suggested Weight: ${machine.baseline} lbs`;
  root.appendChild(suggested);

  // GRIP TOGGLE
  if (machine.grips) {
    const grip = document.createElement("div");
    grip.className = "gym-button";
    grip.textContent = `Grip: ${machine.grips[0]}`;
    root.appendChild(grip);
  }

  return root;
}
