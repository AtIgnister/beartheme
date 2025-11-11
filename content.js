import { init } from "./classes/view";

chrome.storage.local.get("jsonUrls", ({ jsonUrls }) => {
  if (!jsonUrls) {
    console.warn("No jsonUrl found in storage");
    return;
  }

  chrome.runtime.sendMessage({ type: "FETCH_JSON", urls: jsonUrls }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Message failed:", chrome.runtime.lastError.message);
      return;
    }

    if (response.ok) {
      init(response.data)
    } else {
      console.error("Error from background:", response.error);
    }
  });
});

function applyAddon(type, addon) {
  console.log("applying thing");
}