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

  const lastWeight = lastEntry.sets[lastEntry.set
