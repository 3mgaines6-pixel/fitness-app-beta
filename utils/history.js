/* ============================================================
   MACHINE-BASED HISTORY ENGINE (DS1 STANDARD)
============================================================ */

export function historyKey(machineNumber, type) {
  return `history_${machineNumber}_${type}`;
}

export function loadHistory(machineNumber, type) {
  const key = historyKey(machineNumber, type);
  return JSON.parse(localStorage.getItem(key) || "[]");
}

export function saveHistory(machineNumber, type, session) {
  const key = historyKey(machineNumber, type);
  const history = loadHistory(machineNumber, type);
  history.push(session);
  localStorage.setItem(key, JSON.stringify(history));
}

export function getLastSession(machineNumber, type) {
  const h = loadHistory(machineNumber, type);
  return h.length ? h[h.length - 1] : null;
}
