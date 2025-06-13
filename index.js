import { getFromJSON, storage } from "./scripts/storage.js";
import { fetchComponent } from "./scripts/fetchComponent.js";

// login
await fetchComponent(
  "../components/login.html",
  document.querySelector("#container")
);
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
const allEmails = allUsers.map((user) => user.email);
const allPass = allUsers.map((user) => user.password);
enterBtn.onclick = function () {
  console.log(allEmails.filter((user) => user == email.value));

  // for (let user of allUsers) {
  // if (email.value == user.email && pass.value == user.password) {
  if (allEmails.includes(email.value) && allPass.includes(pass.value)) {
    let currentUser = `{email: ${email.value}}`;
    localStorage.setItem("currentUser", currentUser);
    location.href = "./pages/home.html";
  } else {
    console.log("login failed");
    // let span = document.querySelector(".enterBtn").nextElementSibling;

    // // If the next sibling is not a <span>, create one
    // if (!span || span.tagName !== "SPAN") {
    //   span = document.createElement("span");
    //   document.querySelector(".enterBtn").after(span);
    // }

    // if (email.value != user.email && pass.value != user.password) {
    //   span.innerText = "!!! this field is required";
    //   span.style.color = "red";
    // } else {
    //   span.innerText = "";
    // }
  }
  // }
  document.querySelector(".enterBtn").addEventListener("click", () => {
    document.querySelectorAll(".inputs").forEach((input) => {
      let span = input.nextElementSibling;

      // If the next sibling is not a <span>, create one
      if (!span || span.tagName !== "SPAN") {
        span = document.createElement("span");
        input.after(span);
      }

      if (!input.value.trim()) {
        span.innerText = "!!! this field is required";
        span.style.color = "red";
      } else {
        span.innerText = "";
      }
    });
  });
};
