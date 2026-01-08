// Format price with Indian numbering system
function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",");
}

// Declare the getCart function or import it before using it
function getCart() {
  // Implementation of getCart function
  return [];
}

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

    var sizeText = item.size ? " | Size: " + item.size : "";

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
      sizeText +
      "</div>" +
      '<div class="cart-item-price">₹' +
      formatPrice(item.price) +
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

  subtotalElement.textContent = formatPrice(total);
  totalElement.textContent = formatPrice(total);
}

// Helper functions decreaseQuantity, increaseQuantity, and removeFromCart should be defined here
function decreaseQuantity(index) {
  // Implementation of decreaseQuantity
}

function increaseQuantity(index) {
  // Implementation of increaseQuantity
}

function removeFromCart(index) {
  // Implementation of removeFromCart
}
