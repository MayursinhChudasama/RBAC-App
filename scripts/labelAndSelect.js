import { modalAppend } from "./openModal.js";
import { storage } from "./storage.js";
export function labelAndSelect(input, dest) {
  const labelTag = document.createElement("label");
  labelTag.innerText = input.value.toUpperCase() + ": ";
  modalAppend.append(labelTag);
  const selectTag = document.createElement("select");
  selectTag.id = input.value;
  selectTag.style.margin = "10px";
  labelTag.append(selectTag);
  let options;
  if (dest == storage.todos) {
    selectTag.setAttribute("multiple", "");
    options = storage.todos.getData().map((e) => e.title);
  } else if (dest == storage.roles) {
    options = dest.getData().map((e) => e.name);
  }
  if (dest == storage.todos || dest == storage.roles) {
    for (let option of options) {
      selectTag.innerHTML += `<option>${option}</option>`;
    }
  } else {
    selectTag.innerHTML = `<option>Complete</option><option>Pending</option>`;
  }
  const brTag = document.createElement("br");
  modalAppend.append(brTag);
}
