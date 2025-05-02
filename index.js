import { getFromJSON, storage } from "./scripts/storage.js";
import { loginComp } from "./components/login.js";

//
const loginContainer = document.querySelector("#container");
loginContainer.innerHTML = loginComp;

//
const allUsers = storage.users.getData();

//
getFromJSON("./scripts/json/users.json").then((data) => {
  if (allUsers.length == 0) {
    storage.users.setData(data);
  }
});

const email = document.querySelector(".email");
const pass = document.querySelector(".pass");
const enterBtn = document.querySelector(".enterBtn");
enterBtn.onclick = function () {
  for (let user of allUsers) {
    if (email.value == user.email && pass.value == user.password) {
      let currentUser = `{email: ${user.email}}`;
      localStorage.setItem("currentUser", currentUser);
      location.href = "./pages/home.html";
    } else {
      console.log("login failed");
    }
  }
};
