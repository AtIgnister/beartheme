// build/addonManager.js
function applyAddonCSS(addon) {
  const customStyles = document.querySelector("#id_custom_styles");
  let addonCSS = `
/*
BEARTHEME_META_ADDON_START; 
BEARTHEME_META_ADDON_VALUE: ID=${addon.id}; 
*/

/*
BEARTHEME_META_ADDON_END;
*/
`;
  customStyles.innerHTML += addonCSS;
}
function parseAddonCssBlock(css) {
  console.log(css);
  console.log("test");
  const regex = /BEARTHEME_META_ADDON_START;([\s\S]*?)BEARTHEME_META_ADDON_END;/g;
  let result = regex.exec(css);
  console.log(result);
}

// classes/components/modal.js
function getComponent() {
  return `
        <style>
        /* The Modal (background) */
        .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        /* Modal Content/Box */
        #modal-content {
        background-color: #01242e;
        border: solid white 2px;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 5px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
        }

        /* The Close Button */
        .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        }

        .close:hover,
        .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
        }
        </style>

        <!-- The Modal -->
        <div id="myModal" class="modal">
            <!-- Modal content -->
            <div id="modal-content">
                <span class="close">&times;</span>
            </div>
        </div>
    `;
}
function showAddons(addons, themeIndex) {
  console.log(parseAddonCssBlock(getCSS()));
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modal-content");
  var span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";
  span.onclick = function() {
    modal.style.display = "none";
  };
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  modalContent.innerHTML = "";
  addons.forEach((addon) => {
    modalContent.innerHTML += `
      <span class="close">&times;</span>
      <h3>${addon.name}</h3>
      <p>${addon.description}</p>
      <button id="${addon.id}" data-theme-index="${themeIndex}">Apply</button>
    `;
    const applyBtn = document.getElementById(addon.id);
    applyBtn.addEventListener("click", (event) => {
      if (addon.type == "css") {
        applyAddonCSS(addon);
      }
    });
  });
}

// classes/view.js
function init(data) {
  const targetElem = document.querySelector("main");
  let weblink = "";
  let addonbtn = "";
  let htmlString = `
        ${getComponent()}

        <style>
        .beartheme-sourcelink .beartheme-weblink {
            font-size:small;
            color: blue;
        }
        </style>
        <h1>Custom Themes</h1> 
        <div style="display: grid;grid-template-columns: 150px 150px 150px 150px 150px 150px 150px;grid-gap: 27px;overflow-x: scroll;padding-bottom: 20px;">`;
  data.forEach((theme, index) => {
    console.log(theme);
    if (theme.website) {
      weblink = `<br><a href="${theme.website}">Website</a>`;
    }
    if (theme.addons) {
      addonbtn = `<br><button data-index=${index} class="configure-addon">Configure Addons</button>`;
    }
    htmlString += `
                <div style="width:100%; background-color: #eceff4; padding: 3px; text-align: center;">
                <img src="${theme.thumbnail}" height="100">
                <br>
                <b style="color: #444">${theme.name}</b>
                <b style="color: #444">Made by ${theme.author} </b>
                ${weblink}
                ${addonbtn}
                <br>
                <a class="beartheme-sourcelink" href="${theme.style_url}">Source</a>
                <br>
                <span>
                    <button type="button" class="theme-button" data-url="${theme.style_url}">Apply</button>
                </span>
                </div>

                <!-- The Modal -->
                <div id="myModal" class="modal">

                <!-- Modal content -->
                <div id="modal-content">
                    <span class="close">&times;</span>
                </div>

                </div>
            `;
  });
  htmlString += "</div>";
  targetElem.insertAdjacentHTML("afterbegin", htmlString);
  document.querySelectorAll(".theme-button").forEach((button) => {
    button.addEventListener("click", () => {
      const url = button.getAttribute("data-url");
      applyCSS(url);
    });
  });
  document.querySelectorAll(".configure-addon").forEach((button) => {
    button.addEventListener("click", (event) => {
      const themeIndex = event.target.getAttribute("data-index");
      const theme = data[themeIndex];
      const addons = theme.addons;
      showAddons(addons, themeIndex);
    });
  });
}
function applyCSS(url) {
  chrome.runtime.sendMessage({
    type: "FETCH_TEXT",
    url
  }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Message failed:", chrome.runtime.lastError.message);
      return;
    }
    if (response.ok) {
      const customStyles = document.querySelector("#id_custom_styles");
      customStyles.textContent = response.data;
    } else {
      console.error("Error from background:", response.error);
    }
  });
}
function getCSS() {
  const customStyles = document.querySelector("#id_custom_styles");
  return customStyles.textContent;
}

// content.js
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
      init(response.data);
    } else {
      console.error("Error from background:", response.error);
    }
  });
});
