import { fetchComponent } from "./fetchComponent.js";
// renderData: when clicked on the "Filter", the data is shown as the table in the contentTable table
// showContent
await fetchComponent(
  "../components/showContent.html",
  document.querySelector("#showContentComp")
);
//
import { cur } from "./handleCurrentTab.js";
import { storage } from "./storage.js";
import { filterOptions } from "./renderFilter.js";
//
export const columnHead = document.querySelector("#columnHead");
export const tbody = document.querySelector("#tbody");
const allTodos = storage.todos.getData();
//
let allTabs;
export function renderData() {
  allTabs = storage[cur].getData();
  const allInputs = Array.from(filterOptions.children)
    .map((child) => child.children[0])
    .filter((child) => child.checked == true);

  if (cur == "permissions") {
    // thead.innerHTML = "";
    columnHead.innerHTML = "";
    tbody.innerHTML = "";
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
