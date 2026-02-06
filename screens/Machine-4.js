export function Machine4() {
  const container = document.createElement("div");
  container.className = "machine-screen";

  container.innerHTML = `
    <h1 class="machine-title">#4 Back Extension</h1>
    <button class="close-btn" onclick="renderScreen('StrengthStudio')">Close</button>
  `;

  return container;
}
