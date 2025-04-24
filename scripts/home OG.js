import { storage } from "./storage.js";

// all variables with query selectors
const sidebar = document.querySelector(".sidebar");
const navbar = document.querySelector(".top-navbar");
const heading = document.querySelector(".heading");
const toggle = document.querySelector(".dropdown-toggle");
const filterOptions = document.querySelector(".dropdown-options");
const filterBtn = document.querySelector("#filterBtn");
const columnHead = document.querySelector("#columnHead");
const allTodos = storage.todos.getData();
// functions
// defaultTab: on the page load, the user tab is selected as default and data is shown
// function defaultTab() {}
let currentTab = sidebar.children[0];
currentTab.style.backgroundColor = "yellow";
currentTab.children[1].style.color = "#222";
heading.innerHTML = currentTab.dataset.name.toUpperCase();
let cur = currentTab.dataset.name.toLowerCase();
let allTabs = storage[cur].getData();
let id = allTabs.length;
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
  id = allTabs.length;
  renderFilter();
  renderData();
}

// renderFilter : the columnHead names become the input buttons for checklist
function renderFilter() {
  // allTabs = storage[cur].getData();
  let allColumnNames;
  if (cur == "permissions") {
    allColumnNames = allTabs.map((key) => Object.keys(key)).flat();
  } else {
    allColumnNames = Object.keys(allTabs[0]);
  }
  filterOptions.innerHTML = "";
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
  const thead = document.querySelector("#thead");
  const tbody = document.querySelector("#tbody");
  const allInputs = Array.from(filterOptions.children)
    .map((child) => child.children[0])
    .filter((child) => child.checked == true);
  if (cur == "permissions") {
    // thead.innerHTML = "";
    columnHead.innerHTML = "";
    tbody.innerHTML = "";
    // console.log("allTabs");
    // for (let input of allInputs) {
    //   // Create heading row
    //   const headingRow = document.createElement("tr");
    //   const headingCell = document.createElement("th");
    //   headingCell.colSpan = 2;
    //   headingCell.id = input.value;
    //   headingCell.style.padding = "5px";
    //   headingCell.style.margin = "10px";
    //   headingCell.textContent = input.value.toUpperCase();
    //   headingRow.appendChild(headingCell);
    //   thead.appendChild(headingRow);
    //   // Create row after heading
    //   const row = document.createElement("tr");
    //   row.className = "row" + input.value;
    //   thead.appendChild(row);
    //   for (let index = 1; index < 3; index++) {
    //     const cell = document.createElement("td");
    //     cell.className = "cells";
    //     cell.innerText = index + "cell";
    //     row.appendChild(cell);
    //   }
    // }
    // console.log(document.querySelectorAll(".cells"));
    // for (let cells of Object.keys(allTabs[0].users[0])) {
    //   cell.innerText = cells;
    // }
  } else {
    columnHead.innerHTML = "";

    for (let input of allInputs) {
      columnHead.innerHTML += `<th>${input.value}</th>`;
    }
    tbody.innerHTML = "";
    for (let i = 0; i < allTabs.length; i++) {
      // row creation
      const row = document.createElement("tr");
      tbody.append(row);
      // cell creation
      for (let j = 0; j < allInputs.length; j++) {
        const cell = document.createElement("td");
        row.append(cell);
        let keyName = columnHead.children[j].innerText;
        // special selectTag for todos
        if (keyName == "todos") {
          let toFind = allTabs[i].todos.map((e) => e.toString());
          let TodosOfUser = allTodos
            .filter((e) => toFind.includes(e.id))
            .map((e) => e.title);
          const selectTag = document.createElement("select");
          cell.append(selectTag);
          for (let option of TodosOfUser) {
            selectTag.innerHTML += `<option>${option}</option>`;
          }
        } else {
          cell.innerText = allTabs[i][keyName];
        }
      }
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
const AddEntryBtn = document.querySelector(".AddEntryBtn");

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
  if (true) {
    //"check for permission"
    id++;
    const newEntry = Object.assign({}, allTabs[0]);
    for (let key in newEntry) {
      if (key == "todos") {
        let ans = storage.todos
          .getData()
          .filter((todo) =>
            document.querySelector("#" + key).value.includes(todo.title)
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
addBtn.addEventListener("click", OpenModal);
function closeModal() {
  modal.classList.remove("open-modal");
  sidebar.classList.remove("disabled");
  navbar.classList.remove("disabled");
}
closeBtn.addEventListener("click", closeModal);
//
