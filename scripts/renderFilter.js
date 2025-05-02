import { storage } from "./storage.js";
import { cur } from "./handleCurrentTab.js";

// heading
import { headingComp } from "../components/heading.js";
headingComp(document.querySelector("#headingComp"));
// filter
import { filterComp } from "../components/filter.js";
filterComp(document.querySelector("#filterComp"));
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
