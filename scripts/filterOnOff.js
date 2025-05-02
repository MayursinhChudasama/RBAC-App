//filterOnOff: when clicked on the "Select", the checklist buttons show or hide
export function filterOnOff(options) {
  if (options.style.display == "block") {
    options.style.display = "none";
  } else {
    options.style.display = "block";
  }
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-dropdown")) {
      options.style.display = "none";
    }
  });
}
