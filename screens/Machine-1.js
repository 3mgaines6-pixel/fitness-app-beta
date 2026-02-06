export function Machine1() {
  const container = document.createElement("div");
  container.className = "machine-screen";

  container.innerHTML = `
    <h1 class="machine-title">#1 Dependent Curl</h1>
    <button class="close-btn" onclick="renderScreen('StrengthStudio')">Close</button>
  `;

  return container;
}
