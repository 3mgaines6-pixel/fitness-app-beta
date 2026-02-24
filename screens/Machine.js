import { MACHINES } from "../data/machines.js";
import { getRotatedMachine } from "../data/rotation.js";

/* ============================================================
   MAIN MACHINE SCREEN (MODERNIZED UI)
============================================================ */

export function Machine(id) {
  const rotatedId = getRotatedMachine(id);
  const meta = MACHINES[rotatedId];

  const container = document.createElement("div");
  container.className = "machine-screen modern";

  const history = loadHistory(rotatedId);
  const last = history.length ? history[history.length - 1] : null;
  const suggested = computeSuggested(meta, last);

  /* Build UI */
  container.append(
    renderTitle(meta, rotatedId),
    renderSubtitle(meta),
    renderTempo(meta),
    renderLastSession(last),
    renderSuggested(suggested),
    renderSetInputs(suggested, rotatedId),
    renderTimer(meta),
    renderHandleToggle(rotatedId),
    renderModeToggle(rotatedId),
    renderLogButton(rotatedId, suggested),
    renderCloseButton()
  );

  return container;
}

/* ============================================================
   COMPONENTS
============================================================ */

function renderTitle(meta, id) {
  const el = document.createElement("h1");
  el.className = "machine-title";
  el.textContent = `#${id} ${meta.name}`;
  return el;
}

function renderSubtitle(meta) {
  const el = document.createElement("div");
  el.className = "machine-subtitle";
  el.textContent = `${meta.muscles} • ${meta.type} • ${meta.reps}`;
  return el;
}

function renderTempo(meta) {
  const wrapper = document.createElement("div");
  wrapper.className = "card-section";

  const row = document.createElement("div");
  row.className = "accordion-header";
  row.textContent = "Tempo ▸";

  const details = document.createElement("div");
  details.className = "accordion-body hidden";

  if (meta.type === "HEAVY") details.textContent = "3-1-2";
  if (meta.type === "LIGHT") details.textContent = "2-1-2";
  if (meta.type === "CORE")  details.textContent = "2-2-2";

  row.onclick = () => details.classList.toggle("hidden");

  wrapper.append(row, details);
  return wrapper;
}

function renderLastSession(last) {
  const el = document.createElement("div");
  el.className = "info-row";

  if (!last) {
    el.textContent = "Last: —";
    return el;
  }

  el.textContent = `Last: ${last.reps.join("/")} @ ${last.weight.join("/")} ${
    last.handle ? "(" + last.handle + ")" : ""
  }`;

  return el;
}

function renderSuggested(s) {
  const wrapper = document.createElement("div");
  wrapper.className = "suggested-box";

  const w = document.createElement("div");
  w.className = "info-row strong";
  w.textContent = `Suggested: ${s.weight}`;

  const msg = document.createElement("div");
  msg.className = "info-row";
  msg.textContent = s.message;

  wrapper.append(w
