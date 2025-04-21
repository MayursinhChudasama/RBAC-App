import { getFromJSON, storage } from "./scripts/storage.js";

export const allUsers = storage.users.getData();
export const allRoles = storage.roles.getData();
export const allPermissions = storage.permissions.getData();
export const allTodos = storage.todos.getData();
//
getFromJSON("./scripts/utils/users.json").then((data) => {
  if (allUsers.length == 0) {
    storage.users.setData(data);
  }
});
//
getFromJSON("./scripts/utils/roles.json").then((data) => {
  if (allRoles.length == 0) {
    storage.roles.setData(data);
  }
});
//
getFromJSON("./scripts/utils/permissions.json").then((data) => {
  if (allPermissions.length == 0) {
    storage.permissions.setData(data);
  }
});
//
getFromJSON("./scripts/utils/todos.json").then((data) => {
  if (allTodos.length == 0) {
    storage.todos.setData(data);
  }
});
//

const email = document.querySelector(".email");
const pass = document.querySelector(".pass");
const enterBtn = document.querySelector(".enterBtn");
enterBtn.onclick = function () {
  for (let user of allUsers) {
    if (email.value == user.email && pass.value == user.password) {
      //   location.replace("./pages/home.html");
      location.href = "./pages/home.html";
    } else {
      //   console.log("login failed");
    }
  }
};
