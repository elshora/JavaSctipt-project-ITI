// header functions
var toggleIcon = document.querySelector(".header-toggle");
var linksVisible = document.querySelector(".links");

toggleIcon.addEventListener("click", function () {
  linksVisible.classList.toggle("show-links");
});

// To top function
var toTopBtn = document.querySelector(".to-top");
toTopBtn.addEventListener("click", function () {
  window.scrollTo(0, 0);
});
