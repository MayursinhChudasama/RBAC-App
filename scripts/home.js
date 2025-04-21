import { getFromJSON, storage } from "./storage.js";

//side bar->tab selection
const sidebar = document.querySelector(".sidebar");
const heading = document.querySelector(".heading");
export let currentTab = sidebar.children[0];
currentTab.style.backgroundColor = "yellow";
heading.innerHTML = currentTab.dataset.name.toUpperCase();
let cur = currentTab.dataset.name.toLowerCase();
let allTabs = storage[cur].getData();
//
document.onload = function () {};
//
export function handleCurrentTab(event) {
  heading.innerHTML = event.target.dataset.name.toUpperCase();
  if (event.target.tagName == "A") {
    currentTab = event.target;
  } else {
    currentTab = event.target.parentElement;
  }
  for (let child of sidebar.children) {
    child.style.backgroundColor = "#222";
  }
  currentTab.style.backgroundColor = "yellow";
  cur = currentTab.dataset.name.toLowerCase();
  allTabs = storage[cur].getData();
  console.log(allTabs);
}
sidebar.addEventListener("click", handleCurrentTab);

//show in filter

console.log("allTabs-render", allTabs[0]);
const toggle = document.querySelector(".dropdown-toggle");

const allColumnNames = Object.keys(allTabs[0]);
const filterOptions = document.querySelector(".dropdown-options");
filterOptions.innerHTML = `<label><input type="checkbox" value="id" checked/>ID</label>`;
filterOptions.style.display = "none";

for (let option of allColumnNames) {
  let innerHTML = `<label><input type="checkbox" value="${option}" checked/>${option.toUpperCase()}</label>`;
  filterOptions.innerHTML += innerHTML;
}

//
// console.log("filterOptionschildren", filterOptions.children);
// console.log("filterOptionsstyle", filterOptions.style.display);

toggle.addEventListener("click", () => {
  if (filterOptions.style.display == "none") {
    filterOptions.style.display = "block";
  }
  if (filterOptions.style.display == "block") {
    filterOptions.style.display = "none";
  }
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".custom-dropdown")) {
    filterOptions.style.display = "none";
  }
});

//render in table

const columnHead = document.querySelector("#columnHead");
const filterBtn = document.querySelector("#filterBtn");
filterBtn.onclick = function () {
  //render column-head
  const allInputs = Array.from(filterOptions.children)
    .map((child) => child.children[0])
    .filter((child) => child.checked == true);
  columnHead.innerHTML = "";
  for (let input of allInputs) {
    let tableInnerHTML = `<th>${input.value}</th>`;
    columnHead.innerHTML += tableInnerHTML;
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
};
