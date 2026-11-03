
// =====================================
// ShopNest - Demo Checkout
// =====================================

function getCheckoutCart() {
    try {
        const cart = JSON.parse(localStorage.getItem("shopnestCart"));
        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        return [];
    }
}

function formatPrice(amount) {
    return "₹" + Number(amount || 0).toFixed(2);
}

function displayCheckoutSummary() {
    const cart = getCheckoutCart();

    const itemsContainer = document.getElementById("checkoutItems");
    const subtotalElement = document.getElementById("checkoutSubtotal");
    const shippingElement = document.getElementById("checkoutShipping");
    const totalElement = document.getElementById("checkoutTotal");
    const placeOrderButton = document.getElementById("placeOrderButton");

    const subtotal = cart.reduce(function (total, item) {
        return total +
            (Number(item.price) || 0) *
            (Number(item.quantity) || 1);
    }, 0);

    const shipping = subtotal > 0 ? 50 : 0;
    const total = subtotal + shipping;

    if (itemsContainer) {
        if (cart.length === 0) {
            itemsContainer.innerHTML = `
                <p class="empty-checkout">
                    Your cart is empty.
                    <a href="shop.html">Continue Shopping</a>
                </p>
            `;
        } else {
            itemsContainer.innerHTML = cart.map(function (item) {
                const name = escapeCheckoutHTML(item.name);
                const quantity = Math.max(1, Number(item.quantity) || 1);
                const price = Number(item.price) || 0;

                return `
                    <div class="checkout-item">
                        <span>${name} × ${quantity}</span>
                        <strong>${formatPrice(price * quantity)}</strong>
                    </div>
                `;
            }).join("");
        }
    }

    if (subtotalElement) {
        subtotalElement.textContent = formatPrice(subtotal);
    }

    if (shippingElement) {
        shippingElement.textContent = formatPrice(shipping);
    }

    if (totalElement) {
        totalElement.textContent = formatPrice(total);
    }

    if (placeOrderButton) {
        placeOrderButton.disabled = cart.length === 0;
    }
}

function escapeCheckoutHTML(value) {
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

document.addEventListener("DOMContentLoaded", function () {

    displayCheckoutSummary();

    const checkoutForm = document.getElementById("checkoutForm");

    if (!checkoutForm) {
        return;
    }

    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const cart = getCheckoutCart();

        if (cart.length === 0) {
            alert("Your cart is empty! Please add products first.");
            return;
        }

        if (!checkoutForm.checkValidity()) {
            checkoutForm.reportValidity();
            return;
        }

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const pincode = document.getElementById("pincode").value.trim();

        const paymentMethod = document.querySelector(
            'input[name="paymentMethod"]:checked'
        )?.value || "Cash on Delivery";

        const subtotal = cart.reduce(function (total, item) {
            return total +
                (Number(item.price) || 0) *
                (Number(item.quantity) || 1);
        }, 0);

        const shipping = subtotal > 0 ? 50 : 0;

        const order = {
            orderNumber: "SN" + Date.now(),
            date: new Date().toLocaleDateString("en-IN"),

            customer: {
                fullName: fullName,
                email: email,
                phone: phone,
                address: address,
                city: city,
                pincode: pincode
            },

            items: cart,
            subtotal: subtotal,
            shipping: shipping,
            total: subtotal + shipping,
            paymentMethod: paymentMethod,
            status: "Pending"
        };

        let orders = [];

        try {
            const savedOrders = JSON.parse(
                localStorage.getItem("shopnestOrders")
            );

            orders = Array.isArray(savedOrders) ? savedOrders : [];

        } catch (error) {
            orders = [];
        }

        orders.push(order);

        try {
            localStorage.setItem(
                "shopnestOrders",
                JSON.stringify(orders)
            );

            localStorage.removeItem("shopnestCart");

        } catch (error) {
            alert("Unable to save your order. Please try again.");
            return;
        }

        alert("Your order has been placed successfully!");

        window.location.href = "my-orders.html";
    });
});
