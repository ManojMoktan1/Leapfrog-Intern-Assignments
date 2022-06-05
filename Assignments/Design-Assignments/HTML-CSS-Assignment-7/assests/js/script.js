const hamburger = document.querySelector(".hamburger-div");
const navbar = document.querySelector(".nav");
const displayClose = document.querySelector(".display-close");
const navClose = document.querySelector(".nav-close");

hamburger.addEventListener("click", (event) => {
  navbar.classList.remove("display-close");
  hamburger.classList.add("display-close");
  navClose.classList.remove("display-close");
});

navClose.addEventListener("click", (event) => {
  navClose.classList.add("display-close");
  hamburger.classList.remove("display-close");
  navbar.classList.add("display-close");
});
