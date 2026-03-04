export function Backup() {
  const container = document.createElement("div");
  container.className = "backup-screen";

  const wrapper = document.createElement("div");
  wrapper.className = "backup-wrapper";
  container.appendChild(wrapper);

  const header = document.createElement("div");
  header.className = "backup-header";
  header.textContent = "Backup & Restore";
  wrapper.appendChild(header);

  /* EXPORT SECTION */
  const exportBtn = document.createElement("button");
  exportBtn.className = "backup-btn";
  exportBtn.textContent = "Export Backup";

  const exportBox = document.createElement("textarea");
  exportBox.className = "backup-box";
  exportBox.placeholder = "Your backup will appear here...";
  exportBox.readOnly = true;

  exportBtn.onclick = () => {
    const all = {};

    Object.keys(localStorage).forEach(key => {
      all[key] = localStorage.getItem(key);
    });

    exportBox.value = JSON.stringify(all, null, 2);
  };

  wrapper.appendChild(exportBtn);
  wrapper.appendChild(exportBox);

  /* IMPORT SECTION */
  const importBox = document.createElement("textarea");
  importBox.className = "backup-box";
  importBox.placeholder = "Paste your backup here to restore...";

  const importBtn = document.createElement("button");
  importBtn.className = "backup-btn";
  importBtn.textContent = "Import Backup";

  importBtn.onclick = () => {
    try {
      const data = JSON.parse(importBox.value);

      Object.keys(data).forEach(key => {
        localStorage.setItem(key, data[key]);
      });

      alert("Backup restored! Reloading app...");
      location.reload();
    } catch (e) {
      alert("Invalid backup format.");
    }
  };

  wrapper.appendChild(importBox);
  wrapper.appendChild(importBtn);

  /* RETURN BUTTON */
  const returnBtn = document.createElement("button");
  returnBtn.className = "return-btn";
  returnBtn.textContent = "Back";
  returnBtn.onclick = () => window.renderScreen("StrengthStudio");
  wrapper.appendChild(returnBtn);

  return container;
}
