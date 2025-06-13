import { storage } from "./storage.js";
import { renderFilter } from "./renderFilter.js";
import { renderData } from "./renderData.js";
import { fetchComponent } from "./fetchComponent.js";

// sidebar
await fetchComponent(
  "../components/sidebar.html",
  document.querySelector("#sidebarComp")
);
//
export const heading = document.querySelector(".heading");
export const sidebar = document.querySelector(".sidebar");
//
export let currentTab = sidebar.children[2];
export let cur = currentTab.dataset.name.toLowerCase();
export let allTabs = storage[cur].getData();
export let id;
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
    child.children[1].style.color = "white";
  }
  currentTab.style.backgroundColor = "yellow";
  currentTab.children[1].style.color = "#222";
  //
  cur = currentTab.dataset.name.toLowerCase();
  allTabs = storage[cur].getData();
  id = Math.max(...allTabs.map((e) => e.id));
  //
  history.replaceState({}, "", cur);
  //
  renderFilter();
  renderData();
}
