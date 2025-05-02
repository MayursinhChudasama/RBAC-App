// fetch data from localStorage
import { getData } from "./getData.js";
getData();
//
// import { storage } from "./storage.js";
import {
  // heading,
  sidebar,
  // currentTab,
  // cur,
  // allTabs,
  handleCurrentTab,
} from "../scripts/handleCurrentTab.js";
sidebar.addEventListener("click", (event) => handleCurrentTab(event));
//
import {
  filterBtn,
  toggle,
  filterOptions,
  // renderFilter,
} from "./renderFilter.js";
//
import { filterOnOff } from "../scripts/filterOnOff.js";
toggle.addEventListener("click", () => filterOnOff(filterOptions));
//
import { defaultCurrentTab } from "./defaultCurrentTab.js";
defaultCurrentTab();

//
import { tbody, renderData } from "./renderData.js";
filterBtn.addEventListener("click", renderData);
//
import { addBtn, closeBtn, OpenModal } from "./openModal.js";
addBtn.addEventListener("click", OpenModal);
import { closeModal } from "./closeModal.js";
import { handleEditAndDelete } from "./handleEditAndDelete.js";
closeBtn.addEventListener("click", closeModal);
tbody.addEventListener("click", (e) => handleEditAndDelete(e));
