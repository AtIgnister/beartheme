export function applyAddonCSS(addon) {
  const customStyles = document.querySelector("#id_custom_styles");
  let addonCSS = `
/*
BEARTHEME_META_ADDON_START; 
BEARTHEME_META_ADDON_VALUE: ID=${addon.id}; 
*/

/*
BEARTHEME_META_ADDON_END;
*/
`



  customStyles.innerHTML += addonCSS
}

export function parseAddonCssBlock(css) {
  // I know, I know, use a regex to solve a problem, now you have two problems
  // shuddup, im too lazy to write a real parser
  const regex =/^BEARTHEME_META_ADDON_START;((.|\n)*)^BEARTHEME_META_ADDON_END/;
  let result = regex.exec(css)
}