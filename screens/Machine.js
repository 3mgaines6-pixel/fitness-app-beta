import { MACHINES } from "../data/machines.js";
import { getRotatedMachine } from "../data/rotation.js";

export function Machine(id) {
  const meta = MACHINES[id];
  const container = document.createElement("div");
  container.className = "machine-screen";

  const wrapper = document.createElement("div");
  wrapper.className = "machine-wrapper";
  container.appendChild(wrapper);

  /* HEADER */
  const header = document.createElement("div");
  header.className = "machine-header";
  header.textContent = `#${id} ${meta.name}`;
  wrapper.appendChild(header);

  /* SUBTITLE */
  const subtitle = document.createElement("div");
  subtitle.className = "machine-subtitle";
  subtitle.textContent = `${meta.muscles} • ${meta.type.toUpperCase()} • ${meta.reps}`;
  wrapper.appendChild(subtitle);

  /* TEMPO SECTION (HIDEABLE) */
  const tempoSection = document.createElement("div");
  tempoSection.className = "tempo-section";

  const tempoToggle = document.createElement("button");
  tempoToggle.className = "tempo-toggle";
  tempoToggle.textContent = "Tempo ▾";
  tempoToggle.onclick = () => {
    tempoContent.classList.toggle("hidden");
  };
  tempoSection.appendChild(tempoToggle);

  const tempoContent = document.createElement("div");
  tempoContent.className = "tempo-content";
  tempoContent.textContent = meta.tempo || "3-1-2";
  tempoSection.appendChild(tempoContent);

  wrapper.appendChild(tempoSection);

  /* LAST + SUGGESTED */
  const last = document.createElement("div");
  last.className = "machine-last";
  last.textContent = `Last: ${meta.last || "—"}`;
  wrapper.appendChild(last);

  const suggested = document.createElement("div");
  suggested.className = "machine-suggested";
  suggested.textContent = `Suggested: ${meta.base}`;
  wrapper.appendChild(suggested);

  const note = document.createElement("div");
  note.className = "machine-note";
  note.textContent = "First session — use base weight.";
  wrapper.appendChild(note);

  /* INPUTS */
  const inputs = document.createElement("div");
  inputs.className = "machine-inputs";

  function createInputRow() {
    const row = document.createElement("div");
    row.className = "machine-row";

    const reps = document.createElement("input");
    reps.className = "machine-input";
    reps.placeholder = "Reps";

    const weight = document.createElement("input");
    weight.className = "machine-input";
    weight.placeholder = meta.base;

    row.appendChild(reps);
    row.appendChild(weight);
    return row;
  }

  inputs.appendChild(createInputRow());
  inputs.appendChild(createInputRow());
  inputs.appendChild(createInputRow());

  wrapper.appendChild(inputs);

  /* TIMER */
  const timer = document.createElement("div");
  timer.className = "machine-timer";
  timer.textContent = "2:00";
  wrapper.appendChild(timer);

  const startBtn = document.createElement("button");
  startBtn.className = "machine-start-btn";
  startBtn.textContent = "Start 2:00 Rest";
  wrapper.appendChild(startBtn);

  /* LOG SET */
  const logBtn = document.createElement("button");
  logBtn.className = "machine-log-btn";
  logBtn.textContent = "Log Set";
  wrapper.appendChild(logBtn);

  /* CLOSE */
  const closeBtn = document.createElement("button");
  closeBtn.className = "machine-close-btn";
  closeBtn.textContent = "Close";
  closeBtn.onclick = () => window.renderScreen("StrengthStudio");
  wrapper.appendChild(closeBtn);

  return container;
}
