console.log("✅ content.js loaded");

chrome.storage.local.get("jsonUrl", ({ jsonUrl }) => {
  if (!jsonUrl) {
    console.warn("No jsonUrl found in storage");
    return;
  }

  chrome.runtime.sendMessage({ type: "FETCH_JSON", url: jsonUrl }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Message failed:", chrome.runtime.lastError.message);
      return;
    }

    if (response.ok) {
      console.log("Message received from background:", response.data);
      init(response.data)
    } else {
      console.error("Error from background:", response.error);
    }
  });
});

function init(data) {
    const targetElem = document.querySelector('main');
    let htmlString = '<h1>Custom Themes</h1> <div style="display: grid;grid-template-columns: 150px 150px 150px 150px 150px 150px 150px;grid-gap: 27px;overflow-x: scroll;padding-bottom: 20px;">';

    data.forEach((theme, index) => {
        htmlString += `
            <div style="width:100%; background-color: #eceff4; padding: 3px; text-align: center;">
            <img src="${theme.thumbnail}" height="100">
            <br>
            <b style="color: #444">${theme.name}</b>
            <br>
            <span>
                <button type="button" class="theme-button" data-url="${theme.style_url}">Apply</button>
            </span>
            </div>
        `;
    });


    htmlString += "</div>"

    // Insert after the target element
    targetElem.insertAdjacentHTML('afterbegin', htmlString);

    // Add event listeners to all buttons
    document.querySelectorAll('.theme-button').forEach(button => {
    button.addEventListener('click', () => {
        const url = button.getAttribute('data-url');
        applyCSS(url);
    });
    });
}

function applyCSS(url) {
    chrome.runtime.sendMessage({ type: "FETCH_TEXT", url: url }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Message failed:", chrome.runtime.lastError.message);
            return;
        }

        if (response.ok) {
            console.log("Message received from background:", response.data);
            const customStyles = document.querySelector("#id_custom_styles");
            customStyles.textContent = response.data;
        } else {
            console.error("Error from background:", response.error);
        }
  });
}