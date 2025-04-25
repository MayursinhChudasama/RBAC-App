import { storage } from "./storage.js";
import {
  renderData,
  renderFilter,
  filterOnOff,
  handleCurrentTab,
  sidebar,
  filterOptions,
  heading,
  currentTab,
} from "./render.js";

// all variables with query selectors
const navbar = document.querySelector(".top-navbar");
const toggle = document.querySelector(".dropdown-toggle");
const filterBtn = document.querySelector("#filterBtn");
//add-button / Modal
const modal = document.querySelector(".modal-overlay");
const modalAppend = document.querySelector(".modalAppend");
const addBtn = document.querySelector(".addBtn");
const closeBtn = document.querySelector(".closeBtn");
const AddEntryBtn = document.querySelector(".AddEntryBtn");

// functions
// defaultTab: on the page load, the user tab is selected as default and data is shown
currentTab.style.backgroundColor = "yellow";
currentTab.children[1].style.color = "#222";
heading.innerHTML = currentTab.dataset.name.toUpperCase();
let cur = currentTab.dataset.name.toLowerCase();
let allTabs = storage[cur].getData();
let id = allTabs.length;
//when page reloads data should be shown directly on the user page
renderFilter();
renderData();
// add event Listener
sidebar.addEventListener("click", handleCurrentTab);
toggle.addEventListener("click", () => filterOnOff(filterOptions));
filterBtn.addEventListener("click", renderData);
addBtn.addEventListener("click", OpenModal);
closeBtn.addEventListener("click", closeModal);
//

function OpenModal() {
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
  modalAppend.innerHTML = "";
  for (let input of allInputs) {
    if (input.value == "role") {
      const labelTag = document.createElement("label");
      labelTag.innerText = input.value.toUpperCase() + ": ";
      modalAppend.append(labelTag);
      const selectTag = document.createElement("select");
      selectTag.id = input.value;
      selectTag.style.margin = "10px";
      labelTag.append(selectTag);
      const options = storage.roles.getData().map((e) => e.name);
      for (let option of options) {
        selectTag.innerHTML += `<option>${option}</option>`;
      }
      const brTag = document.createElement("br");
      modalAppend.append(brTag);
    } else if (input.value == "todos") {
      const labelTag = document.createElement("label");
      labelTag.innerText = input.value.toUpperCase() + ": ";
      modalAppend.append(labelTag);
      const selectTag = document.createElement("select");
      selectTag.setAttribute("multiple", "");
      selectTag.id = input.value;
      selectTag.style.margin = "10px";
      labelTag.append(selectTag);
      const options = storage.todos.getData().map((e) => e.title);
      for (let option of options) {
        selectTag.innerHTML += `<option>${option}</option>`;
      }
      const brTag = document.createElement("br");
      modalAppend.append(brTag);
    } else if (input.value != "id") {
      modalAppend.innerHTML += `<label for="${
        input.value
      }">${input.value.toUpperCase()}:</label>
    <input type="text" style="margin: 10px" id="${
      input.value
    }" placeholder="Enter"/> <br />`;
    }
  }

  //Add Entry
  AddEntryBtn.addEventListener("click", addEntry);
}
function addEntry() {
  cur = currentTab.dataset.name.toLowerCase();
  allTabs = storage[cur].getData();
  id = allTabs.length;

  if (true) {
    //"check for permission"
    id++;
    const newEntry = Object.assign({}, allTabs[0]);
    console.log(newEntry);

    for (let key in newEntry) {
      if (key == "todos") {
        let ans = storage.todos
          .getData()
          .filter((todo) =>
            Array.from(document.querySelector("#" + key).selectedOptions)
              .map((e) => e.innerText)
              .includes(todo.title)
          )
          .map((e) => e.id);
        newEntry[key] = ans;
      } else if (key != "id") {
        newEntry[key] = document.querySelector("#" + key).value || [];
      }
    }
    newEntry.id = id;
    allTabs.push(newEntry);
    storage[cur].setData(allTabs);
    closeModal();
    renderData();
  }
}

function closeModal() {
  modal.classList.remove("open-modal");
  sidebar.classList.remove("disabled");
  navbar.classList.remove("disabled");
}
//
//addition: as the tab is changed the previous filter button is stored and shown same
