// Products data
var products = [
  {
    id: 1,
    name: "Air Max 270",
    brand: "Nike",
    price: 18500,
    image: "public/nike-air-max-270-sneaker.jpg",
  },
  {
    id: 2,
    name: "Ultraboost 22",
    brand: "Adidas",
    price: 19200,
    image: "public/adidas-ultraboost-22-sneaker.jpg",
  },
  {
    id: 3,
    name: "Air Jordan 1",
    brand: "Jordan",
    price: 17800,
    image: "public/air-jordan-1-sneaker.jpg",
  },
  {
    id: 4,
    name: "574 Core",
    brand: "New Balance",
    price: 15600,
    image: "public/new-balance-574-sneaker.jpg",
  },
  {
    id: 5,
    name: "Suede Classic",
    brand: "Puma",
    price: 16200,
    image: "public/puma-suede-classic-sneaker.jpg",
  },
  {
    id: 6,
    name: "React Infinity",
    brand: "Nike",
    price: 18900,
    image: "public/nike-react-infinity-sneaker.jpg",
  },
  {
    id: 7,
    name: "Stan Smith",
    brand: "Adidas",
    price: 15900,
    image: "public/adidas-stan-smith-sneaker.jpg",
  },
  {
    id: 8,
    name: "Air Jordan 4",
    brand: "Jordan",
    price: 19800,
    image: "public/air-jordan-4-sneaker.jpg",
  },
  {
    id: 9,
    name: "990v5",
    brand: "New Balance",
    price: 17500,
    image: "public/new-balance-990v5-sneaker.jpg",
  },
  {
    id: 10,
    name: "RS-X",
    brand: "Puma",
    price: 16800,
    image: "public/puma-rsx-sneaker.jpg",
  },
];

// Get cart and wishlist from localStorage
function getCart() {
  var cartData = localStorage.getItem("dripkicks_cart");
  return cartData ? JSON.parse(cartData) : [];
}

function saveCart(cart) {
  localStorage.setItem("dripkicks_cart", JSON.stringify(cart));
}

function getWishlist() {
  var wishlistData = localStorage.getItem("dripkicks_wishlist");
  return wishlistData ? JSON.parse(wishlistData) : [];
}

function saveWishlist(wishlist) {
  localStorage.setItem("dripkicks_wishlist", JSON.stringify(wishlist));
}

// Format price with Indian numbering system
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",");
}

// Update navbar counts
function updateNavbarCounts() {
  var cart = getCart();
  var wishlist = getWishlist();

  var cartCountElements = document.querySelectorAll("#cart-count");
  for (var i = 0; i < cartCountElements.length; i++) {
    var totalQuantity = 0;
    for (var k = 0; k < cart.length; k++) {
      totalQuantity = totalQuantity + cart[k].quantity;
    }
    cartCountElements[i].textContent = totalQuantity;
  }

  var wishlistCountElements = document.querySelectorAll("#wishlist-count");
  for (var l = 0; l < wishlistCountElements.length; l++) {
    wishlistCountElements[l].textContent = wishlist.length;
  }
}

// Hero slideshow
var slideIndex = 0;
var slideTimer;

function showSlides() {
  var slides = document.querySelectorAll(".hero-slide");
  var dots = document.querySelectorAll(".dot");

  if (slides.length === 0) return;

  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  for (var m = 0; m < dots.length; m++) {
    dots[m].classList.remove("active");
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");

  slideTimer = setTimeout(showSlides, 5000);
}

function currentSlide(n) {
  clearTimeout(slideTimer);
  slideIndex = n;

  var slides = document.querySelectorAll(".hero-slide");
  var dots = document.querySelectorAll(".dot");

  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  for (var m = 0; m < dots.length; m++) {
    dots[m].classList.remove("active");
  }

  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");

  slideTimer = setTimeout(showSlides, 5000);
}

// Display products with wishlist state
function displayProducts(productsToShow, containerId) {
  var grid = document.getElementById(containerId);
  if (!grid) return;

  grid.innerHTML = "";
  var wishlist = getWishlist();

  for (var i = 0; i < productsToShow.length; i++) {
    var product = productsToShow[i];
    var isInWishlist = false;

    for (var k = 0; k < wishlist.length; k++) {
      if (wishlist[k].id === product.id) {
        isInWishlist = true;
        break;
      }
    }

    var card = document.createElement("div");
    card.className = "product-card";

    var altText = product.brand + " " + product.name + " sneaker";
    var wishlistClass = isInWishlist ? "wishlist-btn active" : "wishlist-btn";
    var wishlistText = isInWishlist ? "♥ Wishlisted" : "♡ Wishlist";

    card.innerHTML =
      '<a href="product.html?id=' +
      product.id +
      '" style="text-decoration: none; color: inherit;">' +
      '<img src="' +
      product.image +
      '" alt="' +
      altText +
      '" class="product-image" loading="lazy">' +
      '<div class="product-brand">' +
      product.brand +
      "</div>" +
      '<h3 class="product-name">' +
      product.name +
      "</h3>" +
      '<div class="product-price">₹' +
      formatPrice(product.price) +
      "</div>" +
      "</a>" +
      '<div class="product-actions">' +
      '<button class="' +
      wishlistClass +
      '" onclick="toggleWishlist(' +
      product.id +
      ')">' +
      wishlistText +
      "</button>" +
      '<button class="add-to-cart-btn" onclick="addToCart(' +
      product.id +
      ')">Add to Cart</button>' +
      "</div>";

    grid.appendChild(card);
  }
}

// Add product to cart
function addToCart(productId) {
  var product = null;

  for (var i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      product = products[i];
      break;
    }
  }

  if (product) {
    var cart = getCart();
    var found = false;

    for (var k = 0; k < cart.length; k++) {
      if (cart[k].id === productId) {
        cart[k].quantity = cart[k].quantity + 1;
        found = true;
        break;
      }
    }

    if (!found) {
      cart.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    saveCart(cart);
    updateNavbarCounts();

    alert(product.name + " added to cart!");
  }
}

// Toggle wishlist
function toggleWishlist(productId) {
  var product = null;

  for (var i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      product = products[i];
      break;
    }
  }

  if (product) {
    var wishlist = getWishlist();
    var found = false;
    var foundIndex = -1;

    for (var k = 0; k < wishlist.length; k++) {
      if (wishlist[k].id === productId) {
        found = true;
        foundIndex = k;
        break;
      }
    }

    if (found) {
      wishlist.splice(foundIndex, 1);
      saveWishlist(wishlist);
      updateNavbarCounts();

      // Refresh the page if we're on shop or wishlist page
      if (window.location.pathname.includes("shop.html")) {
        loadShopPage();
      } else if (window.location.pathname.includes("wishlist.html")) {
        loadWishlistPage();
      }
    } else {
      wishlist.push(product);
      saveWishlist(wishlist);
      updateNavbarCounts();

      if (window.location.pathname.includes("shop.html")) {
        loadShopPage();
      }
    }
  }
}

// Filter products by brand
function filterProducts() {
  var selectedBrand = document.getElementById("brand-filter").value;

  if (selectedBrand === "all") {
    displayProducts(products, "products-grid");
  } else {
    var filtered = [];
    for (var i = 0; i < products.length; i++) {
      if (products[i].brand === selectedBrand) {
        filtered.push(products[i]);
      }
    }
    displayProducts(filtered, "products-grid");
  }
}

// Load home page
function loadHomePage() {
  // Load latest collection (first 4 products)
  var latestProducts = products.slice(0, 4);
  displayProducts(latestProducts, "latest-collection");

  // Load trending (products 4-8)
  var trendingProducts = products.slice(4, 8);
  displayProducts(trendingProducts, "trending-now");

  // Start slideshow
  showSlides();
}

// Load shop page
function loadShopPage() {
  displayProducts(products, "products-grid");

  var brandFilter = document.getElementById("brand-filter");
  if (brandFilter) {
    brandFilter.addEventListener("change", filterProducts);
  }
}

// Load cart page
function loadCartPage() {
  var cart = getCart();
  var container = document.getElementById("cart-items-container");
  var subtotalElement = document.getElementById("cart-subtotal");
  var totalElement = document.getElementById("cart-total");
  var checkoutBtn = document.getElementById("checkout-btn");

  if (cart.length === 0) {
    container.innerHTML =
      '<div class="empty-message"><h3>Your cart is empty</h3><p>Start shopping to add items to your cart</p><a href="shop.html" class="btn">Shop Now</a></div>';
    subtotalElement.textContent = "0";
    totalElement.textContent = "0";
    if (checkoutBtn) {
      checkoutBtn.style.pointerEvents = "none";
      checkoutBtn.style.opacity = "0.5";
    }
    return;
  }

  container.innerHTML = "";
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var itemTotal = item.price * item.quantity;
    total = total + itemTotal;

    var cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML =
      '<img src="' +
      item.image +
      '" alt="' +
      item.name +
      '" class="cart-item-image">' +
      '<div class="cart-item-details">' +
      '<div class="cart-item-name">' +
      item.name +
      "</div>" +
      '<div class="cart-item-brand">' +
      item.brand +
      "</div>" +
      '<div class="cart-item-price">$' +
      item.price +
      " each</div>" +
      '<div class="quantity-controls">' +
      '<button class="quantity-btn" onclick="decreaseQuantity(' +
      i +
      ')">-</button>' +
      '<span class="quantity-display">' +
      item.quantity +
      "</span>" +
      '<button class="quantity-btn" onclick="increaseQuantity(' +
      i +
      ')">+</button>' +
      "</div>" +
      "</div>" +
      '<button class="remove-btn" onclick="removeFromCart(' +
      i +
      ')">Remove</button>';

    container.appendChild(cartItem);
  }

  subtotalElement.textContent = total;
  totalElement.textContent = total;
}

function increaseQuantity(index) {
  var cart = getCart();
  cart[index].quantity = cart[index].quantity + 1;
  saveCart(cart);
  updateNavbarCounts();
  loadCartPage();
}

function decreaseQuantity(index) {
  var cart = getCart();
  if (cart[index].quantity > 1) {
    cart[index].quantity = cart[index].quantity - 1;
    saveCart(cart);
    updateNavbarCounts();
    loadCartPage();
  }
}

function removeFromCart(index) {
  var cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateNavbarCounts();
  loadCartPage();
}

// Load wishlist page
function loadWishlistPage() {
  var wishlist = getWishlist();
  var grid = document.getElementById("wishlist-grid");

  if (wishlist.length === 0) {
    grid.innerHTML =
      '<div class="empty-message"><h3>Your wishlist is empty</h3><p>Add your favorite sneakers to your wishlist</p><a href="shop.html" class="btn">Shop Now</a></div>';
    return;
  }

  grid.innerHTML = "";

  for (var i = 0; i < wishlist.length; i++) {
    var product = wishlist[i];

    var card = document.createElement("div");
    card.className = "wishlist-card";

    var altText = product.brand + " " + product.name + " sneaker";

    card.innerHTML =
      '<img src="' +
      product.image +
      '" alt="' +
      altText +
      '" class="product-image" loading="lazy">' +
      '<div class="product-brand">' +
      product.brand +
      "</div>" +
      '<h3 class="product-name">' +
      product.name +
      "</h3>" +
      '<div class="product-price">₹' +
      formatPrice(product.price) +
      "</div>" +
      '<div class="wishlist-actions">' +
      '<button class="remove-wishlist-btn" onclick="toggleWishlist(' +
      product.id +
      ')">Remove</button>' +
      '<button class="add-to-cart-btn" onclick="addToCart(' +
      product.id +
      ')">Add to Cart</button>' +
      "</div>";

    grid.appendChild(card);
  }
}

// Load checkout page
function loadCheckoutPage() {
  var cart = getCart();

  if (cart.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  var itemsContainer = document.getElementById("checkout-items");
  var subtotalElement = document.getElementById("checkout-subtotal");
  var totalElement = document.getElementById("checkout-total");

  itemsContainer.innerHTML = "";
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var itemTotal = item.price * item.quantity;
    total = total + itemTotal;

    var checkoutItem = document.createElement("div");
    checkoutItem.className = "checkout-item";

    checkoutItem.innerHTML =
      '<img src="' +
      item.image +
      '" alt="' +
      item.name +
      '" class="checkout-item-image">' +
      '<div class="checkout-item-details">' +
      '<div class="checkout-item-name">' +
      item.name +
      "</div>" +
      '<div class="checkout-item-brand">' +
      item.brand +
      "</div>" +
      '<div class="checkout-item-quantity">Qty: ' +
      item.quantity +
      "</div>" +
      "</div>" +
      '<div class="checkout-item-price">₹' +
      formatPrice(itemTotal) +
      "</div>";

    itemsContainer.appendChild(checkoutItem);
  }

  subtotalElement.textContent = formatPrice(total);
  totalElement.textContent = formatPrice(total);

  // Handle payment method switching
  var paymentRadios = document.querySelectorAll('input[name="payment-method"]');
  for (var j = 0; j < paymentRadios.length; j++) {
    paymentRadios[j].addEventListener("change", handlePaymentMethodChange);
  }

  // Handle form submission
  var form = document.getElementById("checkout-form");
  form.addEventListener("submit", handleCheckoutSubmit);
}

function handlePaymentMethodChange(event) {
  var cardFields = document.getElementById("card-fields");
  var upiFields = document.getElementById("upi-fields");
  var codMessage = document.getElementById("cod-message");

  cardFields.style.display = "none";
  upiFields.style.display = "none";
  codMessage.style.display = "none";

  var selectedMethod = event.target.value;

  if (selectedMethod === "card") {
    cardFields.style.display = "block";
  } else if (selectedMethod === "upi") {
    upiFields.style.display = "block";
  } else if (selectedMethod === "cod") {
    codMessage.style.display = "block";
  }
}

function handleCheckoutSubmit(event) {
  event.preventDefault();

  // Generate random order number
  var orderNumber = Math.floor(100000 + Math.random() * 900000);
  document.getElementById("order-number").textContent = orderNumber;

  // Clear cart
  localStorage.removeItem("dripkicks_cart");
  updateNavbarCounts();

  // Show modal
  var modal = document.getElementById("order-modal");
  modal.style.display = "block";

  // Close modal when clicking outside
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      window.location.href = "index.html";
    }
  };
}

// Navbar scroll effect
function handleNavbarScroll() {
  var navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// Product detail page functionality
var selectedSize = null;

function loadProductDetailPage() {
  var urlParams = new URLSearchParams(window.location.search);
  var productId = Number.parseInt(urlParams.get("id"));

  if (!productId) {
    window.location.href = "shop.html";
    return;
  }

  var product = null;
  for (var i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      product = products[i];
      break;
    }
  }

  if (!product) {
    window.location.href = "shop.html";
    return;
  }

  // Set product details
  document.getElementById("product-main-image").src = product.image;
  document.getElementById("product-main-image").alt =
    product.brand + " " + product.name;
  document.getElementById("product-brand").textContent = product.brand;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent =
    "₹" + formatPrice(product.price);
  document.title = product.name + " - DripKicks";

  // Check if product is in wishlist
  var wishlist = getWishlist();
  var isInWishlist = false;
  for (var k = 0; k < wishlist.length; k++) {
    if (wishlist[k].id === productId) {
      isInWishlist = true;
      break;
    }
  }

  var wishlistBtn = document.getElementById("wishlist-detail-btn");
  var wishlistIcon = document.getElementById("wishlist-icon");

  if (isInWishlist) {
    wishlistBtn.classList.add("active");
    wishlistIcon.textContent = "♥";
    wishlistBtn.innerHTML =
      '<span id="wishlist-icon">♥</span> Remove from Wishlist';
  }

  // Size selection
  var sizeButtons = document.querySelectorAll(".size-btn");
  for (var m = 0; m < sizeButtons.length; m++) {
    sizeButtons[m].addEventListener("click", function () {
      var allSizeBtns = document.querySelectorAll(".size-btn");
      for (var n = 0; n < allSizeBtns.length; n++) {
        allSizeBtns[n].classList.remove("selected");
      }
      this.classList.add("selected");
      selectedSize = this.getAttribute("data-size");
      document.getElementById("size-error").classList.remove("show");
    });
  }

  // Add to cart button
  document
    .getElementById("add-to-cart-detail-btn")
    .addEventListener("click", () => {
      if (!selectedSize) {
        document.getElementById("size-error").classList.add("show");
        return;
      }
      addToCartWithSize(productId, selectedSize);
    });

  // Buy now button
  document.getElementById("buy-now-btn").addEventListener("click", () => {
    if (!selectedSize) {
      document.getElementById("size-error").classList.add("show");
      return;
    }
    addToCartWithSize(productId, selectedSize);
    window.location.href = "checkout.html";
  });

  // Wishlist button
  wishlistBtn.addEventListener("click", () => {
    toggleWishlist(productId);

    // Update button state
    var wishlistData = getWishlist();
    var inWishlist = false;
    for (var p = 0; p < wishlistData.length; p++) {
      if (wishlistData[p].id === productId) {
        inWishlist = true;
        break;
      }
    }

    if (inWishlist) {
      wishlistBtn.classList.add("active");
      wishlistIcon.textContent = "♥";
      wishlistBtn.innerHTML =
        '<span id="wishlist-icon">♥</span> Remove from Wishlist';
    } else {
      wishlistBtn.classList.remove("active");
      wishlistIcon.textContent = "♡";
      wishlistBtn.innerHTML =
        '<span id="wishlist-icon">♡</span> Add to Wishlist';
    }
  });
}

// Function to add to cart with size
function addToCartWithSize(productId, size) {
  var product = null;

  for (var i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      product = products[i];
      break;
    }
  }

  if (product) {
    var cart = getCart();
    var found = false;

    for (var k = 0; k < cart.length; k++) {
      if (cart[k].id === productId && cart[k].size === size) {
        cart[k].quantity = cart[k].quantity + 1;
        found = true;
        break;
      }
    }

    if (!found) {
      cart.push({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        quantity: 1,
        size: size,
      });
    }

    saveCart(cart);
    updateNavbarCounts();

    alert(product.name + " (Size " + size + ") added to cart!");
  }
}

// Initialize page based on current URL
document.addEventListener("DOMContentLoaded", () => {
  updateNavbarCounts();

  var path = window.location.pathname;

  if (path.includes("index.html") || path.endsWith("/")) {
    loadHomePage();
  } else if (path.includes("shop.html")) {
    loadShopPage();
  } else if (path.includes("cart.html")) {
    loadCartPage();
  } else if (path.includes("wishlist.html")) {
    loadWishlistPage();
  } else if (path.includes("checkout.html")) {
    loadCheckoutPage();
  } else if (path.includes("product.html")) {
    loadProductDetailPage();
  }

  window.addEventListener("scroll", handleNavbarScroll);
});
