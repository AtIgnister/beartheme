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