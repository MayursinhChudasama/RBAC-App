import { currentTab, heading, allTabs, cur } from "./handleCurrentTab.js";
import { renderFilter } from "./renderFilter.js";
import { renderData } from "./renderData.js";
export function defaultCurrentTab() {
  currentTab.style.backgroundColor = "yellow";
  currentTab.children[1].style.color = "#222";
  heading.innerHTML = currentTab.dataset.name.toUpperCase();
  renderFilter();
  renderData();
}
