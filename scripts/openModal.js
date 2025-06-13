import { labelAndSelect } from "./labelAndSelect.js";
import { sidebar } from "./handleCurrentTab.js";
import { filterOptions } from "./renderFilter.js";
import { storage } from "./storage.js";
import { closeModal } from "./closeModal.js";
import { addEntry } from "./addEntry.js";
import { fetchComponent } from "./fetchComponent.js";
// modal
await fetchComponent(
  "../components/modal.html",
  document.querySelector("#modalComp")
);
// header
await fetchComponent(
  "../components/header.html",
  document.querySelector("#headerComp")
);
//
const btn = document.getElementById("menu-toggle");
const mainDiv = document.querySelector("#mainDiv");
btn.addEventListener("click", () => {
  if (btn.checked) {
    sidebar.classList.add("expanded");
    mainDiv.classList.add("side-margin");
  } else {
    sidebar.classList.remove("expanded");
    mainDiv.classList.remove("side-margin");
  }
});
//
export const navbar = document.querySelector(".top-navbar");
export const modal = document.querySelector(".modal-overlay");
export const modalAppend = document.querySelector(".modalAppend");
export const addBtn = document.querySelector(".addBtn");
export const closeBtn = document.querySelector(".closeBtn");
export const AddEntryBtn = document.querySelector(".AddEntryBtn");
//
export function OpenModal() {
  document.onkeydown = function (event) {
    if (event.code == "Escape") {
      closeModal();
    }
  };
  modal.classList.add("open-modal");
  sidebar.classList.add("disabled");
  navbar.classList.add("disabled");
  // inputs
  const allInputs = Array.from(filterOptions.children).map(
    (child) => child.children[0]
  );
  console.log(allInputs);

  modalAppend.innerHTML = "";
  for (let input of allInputs) {
    if (input.value == "role") {
      labelAndSelect(input, storage.roles, modalAppend);
    } else if (input.value == "todos") {
      labelAndSelect(input, storage.todos, modalAppend);
    } else if (input.value == "status") {
      labelAndSelect(input, "", modalAppend);
    } else if (input.value != "id" && input.value != "action") {
      modalAppend.innerHTML += `<label for="${
        input.value
      }">${input.value.toUpperCase()}:</label>
    <input type="text" style="margin: 10px" id="${
      input.value
    }" placeholder="Enter"/> <br />`;
    }
  }
  AddEntryBtn.addEventListener("click", addEntry);
}
