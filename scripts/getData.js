import { storage, getFromJSON } from "./storage.js";
//
export const allUsers = storage.users.getData();
export const allRoles = storage.roles.getData();
export const allPermissions = storage.permissions.getData();
export const allTodos = storage.todos.getData();
//
export function getData() {
  getFromJSON("../scripts/json/users.json").then((data) => {
    if (allUsers.length == 0) {
      storage.users.setData(data);
    }
  });
  //
  getFromJSON("../scripts/json/roles.json").then((data) => {
    if (allRoles.length == 0) {
      storage.roles.setData(data);
    }
  });
  //
  getFromJSON("../scripts/json/permissions.json").then((data) => {
    if (allPermissions.length == 0) {
      storage.permissions.setData(data);
    }
  });
  //
  getFromJSON("../scripts/json/todos.json").then((data) => {
    if (allTodos.length == 0) {
      storage.todos.setData(data);
    }
  });
}
