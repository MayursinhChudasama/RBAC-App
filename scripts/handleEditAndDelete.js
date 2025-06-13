import { currentTab } from "./handleCurrentTab.js";
import { storage } from "./storage.js";
import {
  allRoles,
  columnHead,
  tbody,
  renderData,
  allTodos,
} from "./renderData.js";
import { filterOptions } from "./renderFilter.js";
// import { labelAndSelect } from "./labelAndSelect.js";
import { closeModal } from "./closeModal.js";

const tableDiv = document.querySelector("#tableDiv");
let cur;
let allTabs;
export function handleEditAndDelete(e) {
  cur = currentTab.dataset.name.toLowerCase();
  allTabs = storage[cur].getData();
  const trgt = e.target;
  const crTrgt = e.currentTarget;
  if (trgt.tagName == "BUTTON" && trgt.id.includes("edit")) {
    console.log("edit clicked");
    columnHead.innerHTML = ``;
    tbody.innerHTML = ``;
    const allInputs = Array.from(filterOptions.children).map(
      (child) => child.children[0]
    );
    // edit starts
    //true will be replaced by "check for permission"
    if (true) {
      const editDiv = document.createElement("div");
      tbody.append(editDiv);
      for (let input of allInputs) {
        if (input.value == "id") {
          editDiv.innerHTML += `<label>${
            input.value
          }<input style="margin: 10px" id="${input.value}" type="text" value="${
            allTabs[trgt.dataset.num][input.value]
          }"disabled /></label> <br/>`;
        } else if (input.value == "role") {
          const options = allRoles.map((e) => e.name);
          const labelTag = document.createElement("label");
          labelTag.innerText = input.value.toUpperCase() + ": ";
          const selectTag = document.createElement("select");
          selectTag.id = input.value;
          selectTag.style.margin = "10px";
          editDiv.append(labelTag);
          editDiv.append(selectTag);
          for (let i = 0; i < options.length; i++) {
            const text = allRoles[i].name;
            const isSelected = allRoles[i].id == allTabs[trgt.dataset.num].role;
            const option = new Option(text, text);
            if (isSelected) {
              option.setAttribute("selected", true);
            }
            // let isTrue;
            // if () {
            //   isTrue = true;
            // } else {
            //   isTrue = false;
            // }
            selectTag.append(option);
          }
          const brTag = document.createElement("br");
          editDiv.append(brTag);
        } else if (input.value == "todos") {
          const options = allTodos.map((e) => e.title);
          const labelTag = document.createElement("label");
          labelTag.innerText = input.value.toUpperCase() + ": ";
          const selectTag = document.createElement("select");
          selectTag.id = input.value;
          // selectTag.style.display = "block";
          selectTag.setAttribute("multiple", "");
          selectTag.style.margin = "10px";
          editDiv.append(labelTag);
          editDiv.append(selectTag);
          for (let i = 0; i < options.length; i++) {
            //
            const text = allTodos[i].title;
            const isSelected = allTabs[trgt.dataset.num].todos
              .map((e) => Number(e))
              .includes(Number(allTodos[i].id));

            const option = new Option(text, text);
            option.id = "todoid" + allTodos[i].id;
            selectTag.append(option);
            if (isSelected) {
              option.setAttribute("selected", true);
            }
          }
        } else if (input.value == "status") {
          const options = allTodos.map((e) => e.title);
          const labelTag = document.createElement("label");
          labelTag.innerText = input.value.toUpperCase() + ": ";
          const selectTag = document.createElement("select");
          selectTag.id = input.value;
          selectTag.style.margin = "10px";
          editDiv.append(labelTag);
          editDiv.append(selectTag);
          selectTag.innerHTML = `<option>Complete</option><option>Pending</option>`;
          console.log("status works");
        } else if (input.value != "action") {
          editDiv.innerHTML += `<label>${
            input.value
          }<input style="margin: 10px" id="${input.value}" type="text" value="${
            allTabs[trgt.dataset.num][input.value]
          }" /></label> <br/>`;
        }
      }
      tbody.innerHTML += `<button style="margin: 5px" class="saveChanges">Save Changes</button><button style="margin: 5px" class="cancelEdit">Cancel</button>`;
      document
        .querySelector(".cancelEdit")
        .addEventListener("click", function (e) {
          tbody.innerHTML = ``;
          renderData();
        });
      document
        .querySelector(".saveChanges")
        .addEventListener("click", () => editData(trgt));
    }
    // edit ends
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

function editData(trgt) {
  cur = currentTab.dataset.name.toLowerCase();
  allTabs = storage[cur].getData();
  //true will be replaced by "check for permission"
  if (true) {
    const newEntry = allTabs[trgt.dataset.num];
    for (let key in newEntry) {
      if (key == "todos") {
        let ans = storage.todos
          .getData()
          .filter((todo) =>
            Array.from(document.querySelector("#" + key).selectedOptions)
              .map((e) => e.innerText)
              .includes(todo.title)
          )
          .map((e) => e.id);
        newEntry[key] = ans;
      } else if (key == "role") {
        let ans = allRoles
          .filter(
            (role) => document.querySelector("#" + key).value == role.name
          )
          .map((role) => role.id);
        newEntry[key] = ans[0];
      } else if (key == "status") {
        if (document.querySelector("#" + key).value == "Complete") {
          newEntry[key] = true;
        } else if (document.querySelector("#" + key).value == "Pending") {
          newEntry[key] = false;
        }
      } else if (key != "id") {
        newEntry[key] = document.querySelector("#" + key).value;
      }
    }
    storage[cur].setData(allTabs);
    closeModal();
    renderData();
  }
  console.log("editData works", allTabs);
}
