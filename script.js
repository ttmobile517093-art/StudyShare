import {
  auth,
  onAuthStateChanged
} from "./firebase.js";


/* =========================
   GLOBAL USER STATE
========================= */

let currentUser = null;


/* =========================
   CHECK LOGIN
========================= */

onAuthStateChanged(auth, (user) => {

  currentUser = user;

  updateLoginButton(user);

});


/* =========================
   UPDATE LOGIN BUTTON
========================= */

function updateLoginButton(user) {

  const loginButton = document.querySelector(".login-btn");

  if (!loginButton) return;


  if (user) {

    loginButton.textContent = "โปรไฟล์";

    loginButton.href = "profile.html";

  } else {

    loginButton.textContent = "เข้าสู่ระบบ";

    loginButton.href = "login.html";

  }

}


/* =========================
   GLOBAL SEARCH
========================= */

const searchInput =
  document.querySelector("#globalSearch");

if (searchInput) {

  searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

      const keyword =
        searchInput.value.trim();

      if (!keyword) return;

      window.location.href =
        `search.html?q=${encodeURIComponent(keyword)}`;

    }

  });

}


/* =========================
   YEAR
========================= */

const yearElement =
  document.querySelector("#year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

  }
