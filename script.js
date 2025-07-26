// script.js

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("menuToggle");
  const menu = document.getElementById("moreMenu");

  toggleButton.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
});
