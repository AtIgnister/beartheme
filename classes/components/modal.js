import { applyAddonCSS } from "../../build/addonManager";

export default function getComponent() {
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
    `
}

export function showAddons(addons, themeIndex) {
  // Get the modal
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modal-content");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


  modalContent.innerHTML = "";
  addons.forEach(addon => {
    modalContent.innerHTML += `
      <span class="close">&times;</span>
      <h3>${addon.name}</h3>
      <p>${addon.description}</p>
      <button id="${addon.id}" data-theme-index="${themeIndex}">Apply</button>
    `

    const applyBtn = document.getElementById(addon.id);

    applyBtn.addEventListener("click", (event) => {
      if(addon.type == "css") {
        applyAddonCSS(addon);
      }
    })
  });
}