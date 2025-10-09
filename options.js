// Load existing URL
chrome.storage.local.get("jsonUrl", ({ jsonUrl }) => {
  document.getElementById("jsonUrl").value = jsonUrl || "";
});

// Save on button click
document.getElementById("save").addEventListener("click", () => {
  const url = document.getElementById("jsonUrl").value;
  chrome.storage.local.set({ jsonUrl: url }, () => {
    alert("URL saved!");
  });
});
