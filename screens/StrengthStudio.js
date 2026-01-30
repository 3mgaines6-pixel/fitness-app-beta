export function StrengthStudio() {
  const container = document.createElement('div');
  container.innerHTML = `
    <h1>Strength Studio</h1>
    <button onclick="renderScreen('Lobby')">Back to Lobby</button>
  `;
  return container;
}
