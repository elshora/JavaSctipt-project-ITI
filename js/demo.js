// header functions
var toggleIcon = document.querySelector(".header-toggle");
var linksVisible = document.querySelector(".links");

toggleIcon.addEventListener("click", function () {
  linksVisible.classList.toggle("show-links");
});
// end header
// start slider

var sliderImages = Array.from(
  document.querySelectorAll(".slider-container img")
);
var slidesCount = sliderImages.length;
var currentSlide = 1;
var slideNumberElement = document.getElementById("silde-number");
// previous and Next buttons
var nextButton = document.getElementById("next");
var prevButton = document.getElementById("prev");

nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;
theChecker();
function nextSlide() {
  if (nextButton.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide++;
    theChecker();
  }
}
function prevSlide() {
  if (prevButton.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide--;
    theChecker();
  }
}

// create the checker function
function theChecker() {
  slideNumberElement.textContent = currentSlide + " / " + slidesCount;
  // remove all active classes
  removeAllActive();
  sliderImages[currentSlide - 1].classList.add("active");
  if (currentSlide == 1) {
    prevButton.classList.add("disabled");
  } else {
    prevButton.classList.remove("disabled");
  }
  if (currentSlide == slidesCount) {
    nextButton.classList.add("disabled");
  } else {
    nextButton.classList.remove("disabled");
  }
}

function removeAllActive() {
  sliderImages.forEach(function (img) {
    img.classList.remove("active");
  });
}

// filter  action
var carProduct = document.querySelectorAll("#car-product");
var colorBtn = document.querySelectorAll(".classification li");
var resetBtn = document.querySelector(".reset");

resetBtn.addEventListener("click", function () {
  for (i = 0; i < carProduct.length; i++) {
    if (carProduct[i].classList.contains("product-hide")) {
      carProduct[i].classList.remove("product-hide");
    }
  }
});
for (i = 0; i < colorBtn.length; i++) {}
colorBtn.forEach(function (index) {
  index.addEventListener("click", function () {
    for (i = 0; i < carProduct.length; i++) {
      if (carProduct[i].classList.contains("product-hide")) {
        carProduct[i].classList.remove("product-hide");
      }
    }
  });
  index.addEventListener("click", function () {
    for (i = 0; i < carProduct.length; i++) {
      if (carProduct[i].hasAttribute(`data-${index.innerText}`) == false) {
        carProduct[i].classList.add("product-hide");
      }
    }
  });
});
// start footer
// back to top function
var toTopBtn = document.querySelector(".to-top");
toTopBtn.addEventListener("click", function () {
  window.scrollTo(0, 0);
});
//end footer

// Start Cart
var cart = document.querySelector(".cart");
var showCartBtn = document.querySelector(".header-cart");
var closeCartBtn = document.querySelector(".close-btn");
var headCounter = document.querySelector(".head-counter");
// show cart
showCartBtn.addEventListener("click", function () {
  cart.classList.toggle("show-cart");
});
// close cart
closeCartBtn.addEventListener("click", function () {
  cart.classList.remove("show-cart");
});
// all is ready
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
// making function
function ready() {
  // remove items
  var removeItemButton = document.querySelectorAll(".remove-item");
  for (i = 0; i < removeItemButton.length; i++) {
    var button = removeItemButton[i];
    button.addEventListener("click", removeItem);
  }
  // quantity changes
  var quantityInputs = document.querySelectorAll(".cart-quantity");
  for (i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  //  add to cart

  var addCart = document.querySelectorAll(".product-cart-btn");
  for (i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartItem);
  }

  // update count function
  //  checkout Time
  document.querySelector(".chekcout").addEventListener("click", checkout);
}
// checkout function
function checkout() {
  alert("U did well");
  var cartHolder = document.querySelector(".items-holder");
  while (cartHolder.hasChildNodes()) {
    cartHolder.removeChild(cartHolder.firstChild);
    updateTotal();
    headCounter.innerText = 0;
  }
}
// remove item function
function removeItem(event) {
  var clickedBtn = event.target;
  clickedBtn.parentElement.remove();
  updateTotal();
  headCounter.innerText -= 1;
}

// Quantity changes
function quantityChanged(event) {
  var input = event.target;

  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// Add to cart Function
function addCartItem(event) {
  var button = event.target;
  var product = button.parentElement;
  var title = product.querySelector(".product-title").innerText;
  var price = product.querySelector(".price").innerText;
  var productImg = product.querySelector(".image-product").src;

  addProductToCart(title, price, productImg);
  updateTotal();
}
function addProductToCart(title, price, productImg) {
  var cartItem = document.createElement("div");
  cartItem.classList.add("item");
  var cartHolder = document.querySelector(".items-holder");
  var cartItemTitle = document.querySelectorAll(".cart-name");
  for (i = 0; i < cartItemTitle.length; i++) {
    if (cartItemTitle[i].innerText === title) {
      alert("Its alreadey added");
      return;
    }
  }
  var cartBoxItem = `
  <img src=${productImg} alt="" class="cart-img">
  <div class="item-info">
      <div class="cart-name">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
  </div>
  <i class="fa fa-trash remove-item" aria-hidden="true"></i>
  `;
  headCounter.innerHTML = cartItemTitle.length + 1;
  cartItem.innerHTML = cartBoxItem;
  cartHolder.append(cartItem);
  cartItem
    .querySelector(".cart-quantity")
    .addEventListener("click", quantityChanged);
  cartItem.querySelector(".remove-item").addEventListener("click", removeItem);
  updateTotal();
}

// update total function
document.getElementsByClassName;
function updateTotal() {
  var cartContent = document.querySelector(".items-holder");
  var cartBoxes = cartContent.querySelectorAll(".item");
  var total = 0;
  for (i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.querySelector(".cart-price");
    var quantityElement = cartBox.querySelector(".cart-quantity");
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + quantity * price;
  }
  // if price contains cents
  total = Math.round(total * 100) / 100;
  document.querySelector(".total-price").innerText = "$" + total;
}
