export function getComponent(themes) {
    let weblink = "";
    let addonbtn = "";
    let htmlString = `<h1>Custom Themes</h1> 
        <div style="display: grid;grid-template-columns: 150px 150px 150px 150px 150px 150px 150px;grid-gap: 27px;overflow-x: scroll;padding-bottom: 20px;">`;

        themes.forEach((theme, index) => {
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
            `;
        });
        htmlString += "</div>";

        return htmlString;
}