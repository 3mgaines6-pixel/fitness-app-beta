export function MatrixTreadmill() {

  const container = document.createElement("div");
  container.className = "cardio-machine-screen";

  /* ---------- TITLE ---------- */
  const title = document.createElement("h1");
  title.className = "cardio-machine-title";
  title.textContent = "Matrix Treadmill";
  container.appendChild(title);

  /* ---------- LAST SESSION ---------- */
  const last = document.createElement("div");
  last.className = "last-session";

  const lastData = JSON.parse(localStorage.getItem("treadmill_last"));
  if (lastData) {
    last.textContent = `Last: ${lastData.minutes} min • ${lastData.miles} miles • ${lastData.mph} mph • ${lastData.incline}% incline`;
  } else {
    last.textContent = "Last: —";
  }
  container.appendChild(last);

  /* ---------- INPUTS ---------- */
  function makeInput(label, id, type = "number") {
    const wrap = document.createElement("div");
    wrap.className = "input-row";

    const lbl = document.createElement("label");
    lbl.textContent = label;

    const input = document.createElement("input");
    input.type = type;
    input.id = id;

    wrap.appendChild(lbl);
    wrap.appendChild(input);
    return wrap;
  }

  const minutesInput = makeInput("Minutes", "minutes");
  const milesInput = makeInput("Miles", "miles");
  const mphInput = makeInput("MPH (auto)", "mph");
  const inclineInput = makeInput("Incline %", "incline");

  container.appendChild(minutesInput);
  container.appendChild(milesInput);
  container.appendChild(mphInput);
  container.appendChild(inclineInput);

  /* ---------- AUTO-CALCULATE MPH ---------- */
  milesInput.querySelector("input").addEventListener("input", updateMPH);
  minutesInput.querySelector("input").addEventListener("input", updateMPH);

  function updateMPH() {
    const minutes = parseFloat(minutesInput.querySelector("input").value);
    const miles = parseFloat(milesInput.querySelector("input").value);

    if (minutes > 0 && miles > 0) {
      const mph = (miles / (minutes / 60)).toFixed(1);
      mphInput.querySelector("input").value = mph;
    }
  }

  /* ---------- LOG BUTTON ---------- */
  const logBtn = document.createElement("button");
  logBtn.className = "log-btn";
  logBtn.textContent = "Log Session";

  logBtn.onclick = () => {
    const minutes = parseFloat(minutesInput.querySelector("input").value);
    const miles = parseFloat(milesInput.querySelector("input").value);
    const mph = parseFloat(mphInput.querySelector("input").value);
    const incline = parseFloat(inclineInput.querySelector("input").value);

    if (!minutes || !miles || !mph) {
      alert("Please enter minutes, miles, and mph.");
      return;
    }

    const entry = {
      type: "treadmill",
      minutes,
      miles,
      mph,
      incline: incline || 0,
      date: Date.now()
    };

    /* Save last session */
    localStorage.setItem("treadmill_last", JSON.stringify(entry));

    /* Save to cardio history */
    const history = JSON.parse(localStorage.getItem("cardio_history")) || [];
    history.unshift(entry);
    localStorage.setItem("cardio_history", JSON.stringify(history));

    alert("Session logged!");
    window.renderScreen("CardioStudio");
  };

  container.appendChild(logBtn);

  return container;
}
