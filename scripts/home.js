import { storage } from "./storage.js";

// all variables with query selectors
const sidebar = document.querySelector(".sidebar");
const navbar = document.querySelector(".top-navbar");
const heading = document.querySelector(".heading");
const toggle = document.querySelector(".dropdown-toggle");
const filterOptions = document.querySelector(".dropdown-options");
const filterBtn = document.querySelector("#filterBtn");
const columnHead = document.querySelector("#columnHead");
// functions
// defaultTab: on the page load, the user tab is selected as default and data is shown
// function defaultTab() {}
let currentTab = sidebar.children[0];
currentTab.style.backgroundColor = "yellow";
currentTab.children[1].style.color = "#222";
heading.innerHTML = currentTab.dataset.name.toUpperCase();
let cur = currentTab.dataset.name.toLowerCase();
let allTabs = storage[cur].getData();
//when page reloads data should be shown directly on the user page
renderFilter();
renderData();
//
sidebar.addEventListener("click", handleCurrentTab);
toggle.addEventListener("click", filterOnOff);
filterBtn.addEventListener("click", renderData);
// handleCurrentTab: when clicked on a sidebar tab, current tab is handled and  data should be shown directly
function handleCurrentTab() {
  heading.innerHTML = event.target.dataset.name.toUpperCase();
  if (event.target.tagName == "A") {
    currentTab = event.target;
  } else {
    currentTab = event.target.parentElement;
  }
  for (let child of sidebar.children) {
    child.style.backgroundColor = "#222";
    child.children[1].style.color = "white";
  }
  currentTab.style.backgroundColor = "yellow";
  currentTab.children[1].style.color = "#222";
  cur = currentTab.dataset.name.toLowerCase();
  allTabs = storage[cur].getData();
  renderFilter();
  renderData();
}

// renderFilter : the columnHead names become the input buttons for checklist
function renderFilter() {
  const allColumnNames = Object.keys(allTabs[0]);

  filterOptions.innerHTML = "";
  // filterOptions.style.display = "none";
  for (let option of allColumnNames) {
    let innerHTML = `<label><input type="checkbox" value="${option}" checked/>${option.toUpperCase()}</label>`;
    filterOptions.innerHTML += innerHTML;
  }
}

//filterOnOff: when clicked on the "Select", the checklist buttons show or hide
function filterOnOff() {
  if (filterOptions.style.display == "block") {
    filterOptions.style.display = "none";
  } else {
    filterOptions.style.display = "block";
  }
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-dropdown")) {
      filterOptions.style.display = "none";
    }
  });
}
// renderData: when clicked on the "Filter", the data is shown as the table in the contentTable table
function renderData() {
  const allInputs = Array.from(filterOptions.children)
    .map((child) => child.children[0])
    .filter((child) => child.checked == true);
  columnHead.innerHTML = "";
  for (let input of allInputs) {
    columnHead.innerHTML += `<th>${input.value}</th>`;
  }
  tbody.innerHTML = "";
  for (let i = 0; i < allTabs.length; i++) {
    // row creation
    const row = document.createElement("tr");
    const tbody = document.querySelector("#tbody");
    tbody.append(row);
    // cell creation
    for (let j = 0; j < allInputs.length; j++) {
      const cell = document.createElement("td");
      row.append(cell);
      let keyName = columnHead.children[j].innerText;
      cell.innerText = allTabs[i][keyName];
    }
  }
}
//

//when clicked on a sidebar tab, data should be shown directly

//then as the filter button is clicked then the data changes

//addition: as the tab is changed the previous filter button is stored and shown same

//add-button / Modal
const modal = document.querySelector(".modal-overlay");
const modalAppend = document.querySelector(".modalAppend");
const addBtn = document.querySelector(".addBtn");
const closeBtn = document.querySelector(".closeBtn");
function OpenModal() {
  document.onkeydown = function (event) {
    if (event.code == "Escape") {
      closeModal();
    }
  };
  modal.classList.add("open-modal");
  sidebar.classList.add("disabled");
  navbar.classList.add("disabled");
  //
  const allInputs = Array.from(filterOptions.children).map(
    (child) => child.children[0]
  );
  modalAppend.innerHTML = "";
  for (let input of allInputs) {
    modalAppend.innerHTML += `<label for="${
      input.value
    }">${input.value.toUpperCase()}:</label>
    <input type="text" style="margin: 10px" id="${input.value}"/> <br />`;
  }
  //addEntry
  let newAllTabs = storage[cur].getData();
  let newEntry = {};
  console.log('newAllTabs', newAllTabs);
  console.log('newEntry', newEntry);
  console.log(cur);
  console.log(storage[cur].setData);
}
function addEntry() {}
addBtn.addEventListener("click", OpenModal);
function closeModal() {
  modal.classList.remove("open-modal");
  sidebar.classList.remove("disabled");
  navbar.classList.remove("disabled");
}
closeBtn.addEventListener("click", closeModal);
//