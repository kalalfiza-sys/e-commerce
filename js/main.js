 
// ShopNest Main JavaScript

document.addEventListener("DOMContentLoaded", function () {
    // Current Year
    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // Update cart count
    updateHeaderCartCount();
});

// Get cart from localStorage
function getShopNestCart() {
    try {
        return JSON.parse(localStorage.getItem("shopnestCart")) || [];
    } catch (error) {
        return [];
    }
}

// Update cart count in header
function updateHeaderCartCount() {
    const cart = getShopNestCart();

    const totalItems = cart.reduce(function (total, item) {
        return total + Number(item.quantity || 0);
    }, 0);

    document.querySelectorAll(".cart-count").forEach(function (element) {
        element.textContent = totalItems;
    });

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}
