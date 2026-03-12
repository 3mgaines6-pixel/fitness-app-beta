import { MACHINES } from "../data/machines.js";
import { WEEKLY } from "../data/weekly.js";

export default function Machine(data) {
  const id = data?.id;
  const number = data?.number;
  const day = data?.day;

  if (!id || !MACHINES[id]) {
    const fallback = document.createElement("div");
    fallback.textContent = "Machine not found.";
    return fallback;
  }

  const m = MACHINES[id];

  const root = document.createElement("div");
  root.id = "machine-root";

  // ... your full Machine.js logic stays the same ...

  // ⭐ NEXT MACHINE
  nextBtn.onclick = () => {
    window.renderScreen("Machine", {
      id: MACHINES[number + 1]?.id,
      number: number + 1,
      day
    });
  };

  // ⭐ COMPLETE DAY
  completeBtn.onclick = () => {
    window.renderScreen("Summary");
  };

  // ⭐ BACK
  backBtn.onclick = () => {
    window.renderScreen("StrengthStudio");
  };

  return root;
}
