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
// form validation

var submitBtn = document.querySelector('[type="submit"]');
var nameInput = document.querySelector("#user-name");
var mailInput = document.querySelector('[type="email"]');
var num = document.querySelector("#phone-num");
const mailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const namepattern = /^[a-zA-Z ]+$/;
const numpattern = /[0-9]/g;

document.forms[0].addEventListener("submit", validatFunction);
function validatFunction(event) {
  var nameValid = false;
  var numValid = false;
  var mailValid = false;
  if (namepattern.test(nameInput.value)) {
    nameValid = true;
  }
  if (numpattern.test(num.value) || num.value.length == 11) {
    numValid = true;
  }
  if (mailpattern.test(mailInput.value)) {
    mailValid = true;
  }
  if (nameValid == false || numValid == false || mailValid == false) {
    event.preventDefault();
  }
}
nameInput.addEventListener("input", function () {
  if (namepattern.test(nameInput.value) == false) {
    nameInput.style.outlineColor = "rgb(245, 143, 143)";
  } else {
    nameInput.style.outlineColor = "rgb(136, 212, 174)";
  }
});
num.addEventListener("input", function () {
  if (numpattern.test(num.value) == false || num.value.length != 11) {
    num.style.outlineColor = "rgb(245, 143, 143)";
  } else {
    num.style.outlineColor = "rgb(136, 212, 174)";
  }
});
mailInput.addEventListener("input", function () {
  if (mailpattern.test(mailInput.value) == false) {
    mailInput.style.outlineColor = "rgb(245, 143, 143)";
  } else {
    mailInput.style.outlineColor = "rgb(136, 212, 174)";
  }
});

document.forms[0].addEventListener("mousemove", function () {
  if (
    mailpattern.test(mailInput.value) &&
    namepattern.test(nameInput.value) &&
    numpattern.test(num.value) &&
    num.value.length == 11
  ) {
    submitBtn.classList.remove("disables-btn");
  } else {
    submitBtn.classList.add("disables-btn");
  }
});
