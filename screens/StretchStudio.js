export function StretchStudio() {
  const container = document.createElement('div');
  container.innerHTML = `
    <h1>Stretch Studio</h1>
    <button onclick="renderScreen('GymFloor')">Back to Gym Floor</button>
  `;
  return container;
}
