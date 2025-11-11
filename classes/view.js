import getComponent from "./components/modal";
import { showAddons } from "./components/modal";

export function init(data) {
        const targetElem = document.querySelector('main');
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
            console.log(theme)
            if(theme.website) {
            weblink = `<br><a href="${theme.website}">Website</a>`;
            }
            if(theme.addons) {
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
    };

function applyCSS(url) {
    chrome.runtime.sendMessage({ type: "FETCH_TEXT", url: url }, (response) => {
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