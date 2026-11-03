
// ========================================
// SHOPNEST CART SYSTEM
// ========================================

// Get cart from localStorage
function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem("shopnestCart"));
        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        return [];
    }
}

// Save cart
function saveCart(cart) {
    localStorage.setItem("shopnestCart", JSON.stringify(cart));

    if (typeof updateHeaderCartCount === "function") {
        updateHeaderCartCount();
    }
}

// Add product to cart
function addProductToCart(product) {

    if (!product || product.id === undefined) {
        alert("Invalid product!");
        return;
    }

    const cart = getCart();

    const productId = String(product.id);

    const existingProduct = cart.find(function (item) {
        return String(item.id) === productId;
    });

    const quantity = Math.max(1, Number(product.quantity) || 1);

    if (existingProduct) {
        existingProduct.quantity =
            Number(existingProduct.quantity || 0) + quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: Number(product.price) || 0,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart(cart);

    alert(product.name + " added to cart successfully!");

    displayCart();
}

// Remove product
function removeFromCart(productId) {

    const cart = getCart();

    const updatedCart = cart.filter(function (item) {
        return String(item.id) !== String(productId);
    });

    saveCart(updatedCart);
    displayCart();
}

// Update quantity
function updateCartQuantity(productId, quantity) {

    const cart = getCart();

    const product = cart.find(function (item) {
        return String(item.id) === String(productId);
    });

    if (!product) {
        return;
    }

    product.quantity = Math.max(1, Number(quantity) || 1);

    saveCart(cart);
    displayCart();
}

// Display cart products
function displayCart() {

    const cartItems = document.getElementById("cartItems");

    if (!cartItems) {
        return;
    }

    const cart = getCart();

    const emptyMessage =
        document.getElementById("emptyCartMessage");

    const cartCount =
        document.getElementById("cartCount");

    const totalItems = cart.reduce(function (total, item) {
        return total + Math.max(1, Number(item.quantity) || 1);
    }, 0);

    if (cartCount) {
        cartCount.textContent =
            totalItems + (totalItems === 1 ? " Item" : " Items");
    }

    if (cart.length === 0) {

        cartItems.innerHTML = "";

        if (emptyMessage) {
            emptyMessage.style.display = "block";
        }

        updateCartSummary(0);
        return;
    }

    if (emptyMessage) {
        emptyMessage.style.display = "none";
    }

    let subtotal = 0;

    cartItems.innerHTML = cart.map(function (item) {

        const price = Number(item.price) || 0;
        const quantity = Math.max(1, Number(item.quantity) || 1);

        subtotal += price * quantity;

        return `
            <div class="cart-item">

                <img
                    src="${escapeHTML(item.image)}"
                    alt="${escapeHTML(item.name)}"
                    onerror="this.src='images/placeholder.jpg'"
                >

                <div class="cart-item-info">

                    <h3>${escapeHTML(item.name)}</h3>

                    <p>Price: ₹${price.toFixed(2)}</p>

                    <p>
                        Subtotal:
                        ₹${(price * quantity).toFixed(2)}
                    </p>

                    <label>
                        Quantity:
                        <input
                            type="number"
                            min="1"
                            value="${quantity}"
                            onchange="updateCartQuantity('${escapeHTML(item.id)}', this.value)"
                        >
                    </label>

                </div>

                <button
                    type="button"
                    class="remove-btn"
                    onclick="removeFromCart('${escapeHTML(item.id)}')"
                >
                    Remove
                </button>

            </div>
        `;

    }).join("");

    updateCartSummary(subtotal);
}

// Update cart summary
function updateCartSummary(subtotal) {

    const shipping = subtotal > 0 ? 50 : 0;
    const discount = 0;
    const total = subtotal + shipping - discount;

    const subtotalElement =
        document.getElementById("cartSubtotal");

    const shippingElement =
        document.getElementById("cartShipping");

    const discountElement =
        document.getElementById("cartDiscount");

    const totalElement =
        document.getElementById("cartTotal");

    if (subtotalElement) {
        subtotalElement.textContent =
            "₹" + subtotal.toFixed(2);
    }

    if (shippingElement) {
        shippingElement.textContent =
            "₹" + shipping.toFixed(2);
    }

    if (discountElement) {
        discountElement.textContent =
            "₹" + discount.toFixed(2);
    }

    if (totalElement) {
        totalElement.textContent =
            "₹" + total.toFixed(2);
    }

    const checkoutButton =
        document.getElementById("checkoutButton");

    if (checkoutButton) {

        checkoutButton.style.pointerEvents =
            subtotal > 0 ? "auto" : "none";

        checkoutButton.style.opacity =
            subtotal > 0 ? "1" : "0.5";

        checkoutButton.setAttribute(
            "aria-disabled",
            subtotal > 0 ? "false" : "true"
        );

        checkoutButton.onclick = function (event) {
            if (getCart().length === 0) {
                event.preventDefault();
                alert("Please add a product before checkout.");
            }
        };
    }
}

// Escape HTML
function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, function (character) {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

// Load cart when page opens
document.addEventListener("DOMContentLoaded", function () {

    displayCart();

    if (typeof updateHeaderCartCount === "function") {
        updateHeaderCartCount();
    }

});
