/* =========================================
   ==========  MATRIX TREADMILL  ===========
   ========================================= */

import { saveCardio, loadCardioPR, updateCardioPR } from "../data/cardio.js";

export function MatrixTreadmill() {
  const container = document.createElement("div");
  container.className = "cardio-machine-screen";

  /* ---------- TITLE ---------- */
  const title = document.createElement("h1");
  title.textContent = "Matrix Treadmill";
  container.appendChild(title);

  /* ---------- PR DISPLAY ---------- */
  const pr = loadCardioPR("matrix-treadmill");

  const prRow = document.createElement("div");
  prRow.className = "info-row";
  prRow.style.marginBottom = "20px";
  prRow.style.color = "#88c0ff";
  prRow.textContent = `PRs — 1 Mile: ${pr.mile1 || "—"} mins • 2 Miles: ${pr.mile2 || "—"} mins`;
  container.appendChild(prRow);

  /* ---------- INPUTS ---------- */
  const timeInput = document.createElement("input");
  timeInput.type = "number";
  timeInput.placeholder = "Minutes";
  timeInput.className = "cardio-input";

  const milesInput = document.createElement("input");
  milesInput.type = "number";
  milesInput.placeholder = "Miles";
  milesInput.className = "cardio-input";

  const inclineInput = document.createElement("input");
  inclineInput.type = "number";
  inclineInput.placeholder = "Incline %";
  inclineInput.className = "cardio-input";

  const mphInput = document.createElement("input");
  mphInput.type = "number";
  mphInput.placeholder = "MPH";
  mphInput.className = "cardio-input";

  container.appendChild(timeInput);
  container.appendChild(milesInput);
  container.appendChild(inclineInput);
  container.appendChild(mphInput);

  /* ---------- SAVE BUTTON ---------- */
  const saveBtn = document.createElement("button");
  saveBtn.className = "cardio-save-btn";
  saveBtn.textContent = "Log Cardio";

  saveBtn.onclick = () => {
    const entry = {
      minutes: Number(timeInput.value || 0),
      miles: Number(milesInput.value || 0),
      incline: Number(inclineInput.value || 0),
      mph: Number(mphInput.value || 0)
    };

    saveCardio("matrix-treadmill", entry);
    updateCardioPR("matrix-treadmill", entry);

    window.renderScreen("CardioStudio");
  };

  container.appendChild(saveBtn);

  /* ---------- BACK BUTTON ---------- */
  const backBtn = document.createElement("button");
  backBtn.className = "cardio-back-btn";
  backBtn.textContent = "Return to Cardio Studio";
  backBtn.onclick = () => window.renderScreen("CardioStudio");
  container.appendChild(backBtn);

  return container;
}
