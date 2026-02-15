/* =========================================
   ==========  CARDIO LOGGING  =============
   ========================================= */

export function loadCardio(key) {
  const raw = localStorage.getItem(`cardio-${key}`);
  return raw ? JSON.parse(raw) : [];
}

export function saveCardio(key, entry) {
  const history = loadCardio(key);

  history.push({
    ...entry,
    date: Date.now()
  });

  localStorage.setItem(`cardio-${key}`, JSON.stringify(history));
}
