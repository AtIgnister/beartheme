chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "FETCH_JSON") {
    fetch(message.url)
      .then((res) => res.json())
      .then((data) => sendResponse({ ok: true, data }))
      .catch((error) => sendResponse({ ok: false, error: error.message }));
    return true;
  }
  if (message.type === "FETCH_TEXT") {
    fetch(message.url)
      .then((res) => res.text())
      .then((data) => sendResponse({ ok: true, data }))
      .catch((error) => sendResponse({ ok: false, error: error.message }));
    return true;
  }
});
