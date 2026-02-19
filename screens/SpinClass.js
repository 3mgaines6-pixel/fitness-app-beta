export function SpinClass() {
  const container = document.createElement("div");
  container.className = "cardio-machine-screen";

  /* ---------- TITLE ---------- */
  const title = document.createElement("h1");
  title.className = "cardio-machine-title";
  title.textContent = "Spin Class";
  container.appendChild(title);

  /* ---------- LAST SESSION ---------- */
  const last = document.createElement("div");
  last.className = "last-session";

  const lastData = JSON.parse(localStorage.getItem("spin_last"));
  if (lastData) {
    last.textContent = `Last: ${lastData.minutes} min • ${lastData.miles} miles • ${lastData.rpm} rpm`;
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

  const minutesInput = makeInput("Minutes", "spin_minutes");
  const milesInput = makeInput("Miles", "spin_miles");
  const rpmInput = makeInput("Average RPM", "spin_rpm");

  container.appendChild(minutesInput);
  container.appendChild(milesInput);
  container.appendChild(rpmInput);

  /* ---------- LOG BUTTON ---------- */
  const logBtn = document.createElement("button");
  logBtn.className = "log-btn";
  logBtn.textContent = "Log Session";

  logBtn.onclick = () => {
    const minutes = parseFloat(minutesInput.querySelector("input").value);
    const miles = parseFloat(milesInput.querySelector("input").value);
    const rpm = parseFloat(rpmInput.querySelector("input").value);

    if (!minutes || !miles || !rpm) {
      alert("Please enter minutes, miles, and rpm.");
      return;
    }

    const entry = {
      type: "spin",
      minutes,
      miles,
      rpm,
      date: Date.now()
    };

    /* Save last session */
    localStorage.setItem("spin_last", JSON.stringify(entry));

    /* Save to cardio history */
    const history = JSON.parse(localStorage.getItem("cardio_history")) || [];
    history.unshift(entry);
    localStorage.setItem("cardio_history", JSON.stringify(history));

    alert("Session logged!");
    window.renderScreen("CardioStudio");
  };

  container.appendChild(logBtn);

  /* ---------- RETURN BUTTON ---------- */
  const backBtn = document.createElement("button");
  backBtn.className = "log-btn";
  backBtn.textContent = "← Back to Cardio Studio";
  backBtn.style.marginTop = "12px";
  backBtn.onclick = () => window.renderScreen("CardioStudio");
  container.appendChild(backBtn);

  return container;
}

