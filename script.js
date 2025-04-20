import { getFromJSON } from "./scripts/storage.js";
import { storage } from "./scripts/storage.js";

const allUsers = storage.users.getUser();
getFromJSON("./scripts/utils/users.json").then((data) => {
  if (allUsers.length == 0) {
    storage.users.setUser(data);
  }
});

const email = document.querySelector(".email");
const pass = document.querySelector(".pass");
const enterBtn = document.querySelector(".enterBtn");
enterBtn.onclick = function () {
  for (let user of allUsers) {
    if (email.value == user.email && pass.value == user.password) {
      location.replace("./pages/home.html");
    } else {
      console.log("login failed");
    }
  }
};
// console.log("start");
