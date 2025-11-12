import * as modal from "./components/modal";
import * as themeslider from "./components/themeslider";
import { showAddons } from "./components/modal";

export function init(data) {
        const targetElem = document.querySelector('main');

        let htmlString = `
        ${modal.getComponent()}

        <style>
        .beartheme-sourcelink .beartheme-weblink {
            font-size:small;
            color: blue;
        }
        </style>
        
        ${themeslider.getComponent(data)}
        `;

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

export function applyCSS(url) {
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
export function getCSS() {
  const customStyles = document.querySelector("#id_custom_styles");
  return customStyles.textContent;
}