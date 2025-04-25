import { storage } from "./storage.js";
//
export const sidebar = document.querySelector(".sidebar");
export const filterOptions = document.querySelector(".dropdown-options");
export const columnHead = document.querySelector("#columnHead");
export const allTodos = storage.todos.getData();
export const heading = document.querySelector(".heading");
const thead = document.querySelector("#thead");
export const tbody = document.querySelector("#tbody");
//
export let currentTab = sidebar.children[0];
export let cur = currentTab.dataset.name.toLowerCase();
export let allTabs = storage[cur].getData();
let id = Math.max(...allTabs.map((e) => e.id));

// handleCurrentTab: when clicked on a sidebar tab, current tab is handled and  data should be shown directly
export function handleCurrentTab() {
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
export function renderFilter() {
  allTabs = storage[cur].getData();
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
  filterOptions.innerHTML += `<label><input type="checkbox" value="action" checked/>ACTION</label>`;
}

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

// renderData: when clicked on the "Filter", the data is shown as the table in the contentTable table
export function renderData() {
  allTabs = storage[cur].getData();

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
        } else if (keyName == "action") {
          cell.innerHTML = `<button style="margin:5px" id="editBtn${
            i + 1
          }" data-num="${i}">Edit</button><button id="delBtn${
            i + 1
          }" data-num="${i}">Delete</button>`;
        } else {
          cell.innerText = allTabs[i][keyName];
        }
      }
    }
  }
}
