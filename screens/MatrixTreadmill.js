/* ================================================
   MATRIX TREADMILL — MIN, MPH, INCLINE, MILES
================================================ */

export default function MatrixTreadmill() {
  const container = document.createElement("div");
  container.className = "screen cardio-bg-dark";

  /* -------------------------------
     HEADER
  --------------------------------*/
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Matrix Treadmill";
  container.appendChild(header);

  /* -------------------------------
     INPUTS
  --------------------------------*/
  const minutes = document.createElement("input");
  minutes.className = "input-box";
  minutes.placeholder = "Minutes";

  const miles = document.createElement("input");
  miles.className = "input-box";
  miles.placeholder = "Miles";

  const mph = document.createElement("input");
  mph.className = "input-box";
  mph.placeholder = "Speed (MPH)";

  const incline = document.createElement("input");
  incline.className = "input-box";
  incline.placeholder = "Incline (%)";

  container.appendChild(minutes);
  container.appendChild(miles);
  container.appendChild(mph);
  container.appendChild(incline);

  /* -------------------------------
     SAVE BUTTON
  --------------------------------*/
  const save = document.createElement("div");
  save.className = "button";
  save.textContent = "Save Treadmill Session";

  save.onclick = () => {
    const minVal = Number(minutes.value);
    const mileVal = Number(miles.value);
    const mphVal = Number(mph.value);
    const incVal = Number(incline.value);

    if (!minVal && !mileVal && !mphVal) return;

    const entry = {
      minutes: minVal,
      miles: mileVal,
      mph: mphVal,
      incline: incVal,
      date: new Date().toISOString(),
    };

    const history = JSON.parse(localStorage.getItem("treadmill") || "[]");
    history.push(entry);
    localStorage.setItem("treadmill", JSON.stringify(history));

    window.renderScreen("CardioStudio");
  };

  container.appendChild(save);

  /* -------------------------------
     LAST SESSION CARD
  --------------------------------*/
  const history = JSON.parse(localStorage.getItem("treadmill") || "[]");
  const last = history[history.length - 1];

  const lastCard = document.createElement("div");
  lastCard.className = "card-base";

  if (last) {
    const date = new Date(last.date).toLocaleDateString();
    lastCard.innerHTML = `
      <div class="weekly-title">Last Treadmill Session</div>
      <div class="weekly-sub">
        ${last.minutes || 0} min • 
        ${last.miles || 0} miles • 
        ${last.mph || 0} mph • 
        Incline ${last.incline || 0}%<br>
        ${date}
      </div>
    `;
  } else {
    lastCard.innerHTML = `
      <div class="weekly-title">No previous treadmill sessions</div>
    `;
  }

  container.appendChild(lastCard);

  /* -------------------------------
     BACK BUTTON
  --------------------------------*/
  const back = document.createElement("div");
  back.className = "gym-button";
  back.textContent = "← Back";
  back.onclick = () => window.renderScreen("CardioStudio");
  container.appendChild(back);

  return container;
}
