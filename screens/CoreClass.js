/* =========================================
   CORE CLASS (DOM VERSION)
========================================= */

export default function CoreClass() {
  const container = document.createElement("div");
  container.className = "core-class-screen";

  /* HEADER */
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "Core Class";
  container.appendChild(header);

  /* MINUTES INPUT */
  const minutesInput = document.createElement("input");
  minutesInput.type = "number";
  minutesInput.className = "cardio-input";
  minutesInput.placeholder = "Minutes";
  container.appendChild(minutesInput);

  /* INTENSITY INPUT */
  const intensityInput = document.createElement("input");
  intensityInput.type = "number";
  intensityInput.className = "cardio-input";
  intensityInput.placeholder = "Intensity (1–10)";
  container.appendChild(intensityInput);

  /* HEART RATE INPUT (optional) */
  const hrInput = document.createElement("input");
  hrInput.type = "number";
  hrInput.className = "cardio-input";
  hrInput.placeholder = "Avg HR (optional)";
  container.appendChild(hrInput);

  /* CALORIES INPUT (optional) */
  const caloriesInput = document.createElement("input");
  caloriesInput.type = "number";
  caloriesInput.className = "cardio-input";
  caloriesInput.placeholder = "Calories (optional)";
  container.appendChild(caloriesInput);

  /* SAVE BUTTON */
  const saveBtn = document.createElement("div");
  saveBtn.className = "save-button";
  saveBtn.textContent = "Save Core Class";

  saveBtn.onclick = () => {
    const minutes = Number(minutesInput.value);
    const intensity = Number(intensityInput.value);
    const hr = Number(hrInput.value);
    const calories = Number(caloriesInput.value);

    if (!minutes || !intensity) {
      alert("Enter minutes and intensity");
      return;
    }

    const entry = {
      type: "core",
      minutes,
      intensity,
      hr: hr || null,
      calories: calories || null,
      date: new Date().toISOString()
    };

    // Save to localStorage
    const history = JSON.parse(localStorage.getItem("cardioHistory")) || [];
    history.push(entry);
    localStorage.setItem("cardioHistory", JSON.stringify(history));

    alert("Core class saved!");
  };

  container.appendChild(saveBtn);

  /* BACK BUTTON */
  const backBtn = document.createElement("div");
  backBtn.className = "back-button";
  backBtn.textContent = "← Back";
  backBtn.onclick = () => window.renderScreen("CardioStudio");
  container.appendChild(backBtn);

  return container;
}
