chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "FETCH_JSON") {
    const urls = message.urls;

    // Make sure it's an array
    if (!Array.isArray(urls)) {
      sendResponse({ ok: false, error: "Expected 'urls' to be an array" });
      return true;
    }

    // Fetch all URLs and parse JSON
    Promise.all(
      urls.map(url =>
        fetch(url)
          .then(res => res.json())
          .catch(err => {
            throw new Error(`Failed to fetch ${url}: ${err.message}`);
          })
      )
    )
      .then(results => {
        // Flatten the array of arrays into one array
        const combined = results.flat();
        sendResponse({ ok: true, data: combined });
      })
      .catch(error => {
        sendResponse({ ok: false, error: error.message });
      });

    return true; // Keep the message channel open for async response
  }
  if (message.type === "FETCH_TEXT") {
    fetch(message.url)
      .then((res) => res.text())
      .then((data) => sendResponse({ ok: true, data }))
      .catch((error) => sendResponse({ ok: false, error: error.message }));
    return true;
  }
});
