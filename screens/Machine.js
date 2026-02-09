import { MACHINES } from "../data/machines.js";

/* =========================================
   HISTORY HELPERS
========================================= */

function getHistoryKey(id) {
  return `machine-${id}`;
}

function loadHistory(id) {
  const raw = localStorage.getItem(getHistoryKey(id));
  return raw ? JSON.parse(raw) : [];
}

function saveHistory(id, history) {
  localStorage.setItem(getHistoryKey(id), JSON.stringify(history));
}

function formatLastSession(entry) {
  if (!entry || !entry.sets || entry.sets.length === 0) {
    return "Last: None";
  }

  const reps = entry.sets.map(s => s.reps).join("/");
  const weights = entry.sets.map(s => s.weight).join("/");

  return `Last: ${reps} reps @ ${weights}`;
}

function getSuggestedWeight(meta, lastEntry) {
  if (!lastEntry || !lastEntry.sets || lastEntry.sets.length === 0) {
    return meta.base ?? "—";
  }

  const lastWeight = lastEntry.sets[lastEntry.sets.length - 1].weight;
  return lastWeight;
}

/* =========================================
   MAIN MACHINE SCREEN
========================================= */

export function Machine(id) {
  const meta = MACHINES[id];
  const history = loadHistory(id);
  const lastEntry = history[history.length - 1];

  const container = document.createElement("div");
  container.className = "machine-screen";

  /* ---------- HEADER ---------- */
  const title = document.createElement("h1");
  title.className = "machine-title";
  title.textContent = `#${id} ${meta.name}`;

  const subtitle = document.createElement("div");
  subtitle.className = "machine-subtitle";
  subtitle.textContent = `${meta.muscle} • ${meta.type} • ${meta.reps}`;

  /* ---------- TEMPO ---------- */
  const tempoRow = document.create
