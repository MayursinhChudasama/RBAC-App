import { storage } from "./storage.js";
import { cur } from "./handleCurrentTab.js";
import { fetchComponent } from "./fetchComponent.js";

// heading Comp
await fetchComponent(
  "../components/heading.html",
  document.querySelector("#headingComp")
);
// filter Comp
await fetchComponent(
  "../components/filter.html",
  document.querySelector("#filterComp")
);
//
let allTabs;
//
export const toggle = document.querySelector(".dropdown-toggle");
export const filterOptions = document.querySelector(".dropdown-options");
export const filterBtn = document.querySelector("#filterBtn");
//
export function renderFilter() {
  allTabs = storage[cur].getData();
  let allColumnNames;
  if (cur == "permissions") {
    allColumnNames = new Set(allTabs.map((key) => key.type));
  } else {
    allColumnNames = Object.keys(allTabs[0]);
  }
  filterOptions.innerHTML = "";
  for (let option of allColumnNames) {
    let innerHTML = `<label><input type="checkbox" value="${option}" checked/>${option.toUpperCase()}</label>`;
    filterOptions.innerHTML += innerHTML;
  }
  if (cur != "permissions") {
    filterOptions.innerHTML += `<label><input type="checkbox" value="action" checked/>ACTION</label>`;
  }
}
