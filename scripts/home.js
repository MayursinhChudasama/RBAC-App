import { getFromJSON } from "./storage.js";
import { storage } from "./storage.js";

// getting all column names and setting in the div
const allUsers = storage.users.getUser();
const allColumns = Object.keys(allUsers[0]);
const filterOptions = document.querySelector(".dropdown-options");
const toggle = document.querySelector(".dropdown-toggle");
// const options = document.querySelector(".dropdown-options");
const columnHead = document.querySelector("#columnHead");

for (let option of allColumns) {
  //show in filter
  let innerHTML = `<label><input type="checkbox" value="${option}" checked/>${option}</label>`;
  filterOptions.innerHTML += innerHTML;
  //show in table
  //   let tableInnerHTML = `<th>${option}</th>`;
  //   columnHead.innerHTML += tableInnerHTML;
}

//
toggle.addEventListener("click", () => {
  if (filterOptions.style.display == "block") {
    filterOptions.style.display = "none";
  } else {
    filterOptions.style.display = "block";
  }
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".custom-dropdown")) {
    filterOptions.style.display = "none";
  }
});

//render in table
const filterBtn = document.querySelector("#filterBtn");
console.log(allUsers);
filterBtn.onclick = function () {
  //render column-head
  const allInputs = Array.from(filterOptions.children)
    .map((child) => child.children[0])
    .filter((child) => child.checked == true);
  columnHead.innerHTML = "";
  for (let input of allInputs) {
    let tableInnerHTML = `<th>${input.value}</th>`;
    columnHead.innerHTML += tableInnerHTML;
  }
  //render rows
  //   for (let user of allUsers) {
  //     console.log(user);
  //     const row = document.createElement("tr");
  //     const tbody = document.querySelector("#tbody");
  //     tbody.append(row);
  //     // cell creation
  //     for (let input of allInputs) {
  //       const cell = document.createElement("td");
  //       row.append(cell);
  //       cell.innerText = `row${0 + 1}`;
  //     }
  //     // for (let j = 0; j < allInputs.length; j++) {}
  //   }

  tbody.innerHTML = "";
  for (let i = 0; i < allUsers.length; i++) {
    // row creation
    const row = document.createElement("tr");
    const tbody = document.querySelector("#tbody");
    tbody.append(row);
    // cell creation
    // console.log("allUsers[i]", allUsers[i].name);
    for (let j = 0; j < allInputs.length; j++) {
      const cell = document.createElement("td");
      row.append(cell);
      let keyName = columnHead.children[j].innerText;
      cell.innerText = allUsers[i][keyName];
    }
  }
  //   console.log(tbody.children);
};
