const hamburger = document.querySelector(".hamburger");
const responsive = document.querySelector(".navigation");
const closeMenu = document.querySelector(".close-menu");
const navShow = document.querySelector(".nav-show");

hamburger.addEventListener("click", (event) => {
  console.log("hi");
  if (responsive.style.display === "none") {
    responsive.style.display = "block";
    closeMenu.style.display = "block";
    navShow.style.display = "none";
  } else {
    responsive.style.display = "none";
  }
});

closeMenu.addEventListener("click", (event) => {
  console.log("hi");
  if (responsive.style.display === "block") {
    responsive.style.display = "none";
    closeMenu.style.display = "none";
    navShow.style.display = "block";
  } else {
    responsive.style.display = "block";
  }
});
