import { currentTab } from "./handleCurrentTab.js";
import { storage } from "./storage.js";
import { columnHead, tbody, renderData } from "./renderData.js";
import { filterOptions } from "./renderFilter.js";

let cur;
let allTabs;
export function handleEditAndDelete(e) {
  cur = currentTab.dataset.name.toLowerCase();
  allTabs = storage[cur].getData();
  const trgt = e.target;
  const crTrgt = e.currentTarget;
  // let crRow = crTrgt.children[trgt.dataset.num].children;
  // console.log(trgt);
  // for (let cell of crRow) {
  //   console.log(cell.innerText);
  // }

  if (trgt.tagName == "BUTTON" && trgt.id.includes("edit")) {
    console.log("edit clicked");

    // columnHead.innerHTML = ``;
    // tbody.innerHTML = ``;

    const allInputs = Array.from(filterOptions.children).map(
      (child) => child.children[0]
    );
    console.log(allInputs);
  } else if (trgt.tagName == "BUTTON" && trgt.id.includes("del")) {
    let ask = confirm("Are you sure?");
    let deletIndex = trgt.dataset.num;
    if (ask) {
      allTabs.splice(deletIndex, 1);
      storage[cur].setData(allTabs);
      renderData();
    }
  }
}
