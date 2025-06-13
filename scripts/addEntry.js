import { currentTab } from "./handleCurrentTab.js";
import { storage } from "./storage.js";
import { closeModal } from "./closeModal.js";
import { allRoles, renderData } from "./renderData.js";

let cur = currentTab.dataset.name.toLowerCase();
let allTabs = storage[cur].getData();
let id;

// console.log(id);
// console.log(id_one);

//
export function addEntry() {
  cur = currentTab.dataset.name.toLowerCase();
  allTabs = storage[cur].getData();
  id = Math.max(...allTabs.map((e) => e.id));
  //
  if (true) {
    //true will be replaced by "check for permission"
    id++;
    const newEntry = Object.assign({}, allTabs[0]);
    console.log("newEntry", newEntry);

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
      } else if (key == "status") {
        if (document.querySelector("#" + key).value == "Complete") {
          newEntry[key] = true;
        } else if (document.querySelector("#" + key).value == "Pending") {
          newEntry[key] = false;
        }
      } else if (key == "role") {
        let ans = allRoles
          .filter(
            (role) => document.querySelector("#" + key).value == role.name
          )
          .map((role) => role.id);
        console.log(ans[0]);

        newEntry[key] = ans[0];
      } else if (key != "id") {
        newEntry[key] = document.querySelector("#" + key).value || "--";
      }
    }
    newEntry.id = id;
    allTabs.push(newEntry);
    storage[cur].setData(allTabs);
    closeModal();
    renderData();
  }
}
