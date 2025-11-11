// Load existing URL
chrome.storage.local.get("jsonUrls", ({ jsonUrls }) => {
  document.getElementById("jsonUrls").value = jsonUrls.join(",\n");
});

// Save on button click
document.getElementById("save").addEventListener("click", () => {
  const urls = document.getElementById("jsonUrls").value;
  urlArray = urls.split(/[\n\r,]+/);
  chrome.storage.local.set({ jsonUrls: urlArray }, () => {
    alert("URLs saved!");
  });
});
