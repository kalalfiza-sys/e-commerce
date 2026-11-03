 
// ShopNest Wishlist

function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem("shopnestWishlist")) || [];
    } catch (error) {
        return [];
    }
}

function saveWishlist(wishlist) {
    localStorage.setItem("shopnestWishlist", JSON.stringify(wishlist));
}

function addProductToWishlist(product) {
    const wishlist = getWishlist();

    const exists = wishlist.some(function (item) {
        return String(item.id) === String(product.id);
    });

    if (exists) {
        alert("Product is already in your wishlist!");
        return;
    }

    wishlist.push({
        id: String(product.id),
        name: product.name,
        price: Number(product.price),
        image: product.image
    });

    saveWishlist(wishlist);

    alert("Product added to wishlist successfully!");

    displayWishlist();
}

function removeFromWishlist(productId) {
    let wishlist = getWishlist();

    wishlist = wishlist.filter(function (item) {
        return String(item.id) !== String(productId);
    });

    saveWishlist(wishlist);
    displayWishlist();
}

function moveWishlistToCart(productId) {
    const wishlist = getWishlist();

    const product = wishlist.find(function (item) {
        return String(item.id) === String(productId);
    });

    if (!product) {
        return;
    }

    if (typeof addProductToCart !== "function") {
        alert("Cart script is not loaded.");
        return;
    }

    addProductToCart({
        ...product,
        quantity: 1
    });

    removeFromWishlist(productId);
}

function displayWishlist() {
    const wishlistContainer = document.getElementById("wishlistItems");

    if (!wishlistContainer) {
        return;
    }

    const wishlist = getWishlist();

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <div class="empty-message">
                <h3>Your wishlist is empty.</h3>
                <a href="shop.html" class="btn">Continue Shopping</a>
            </div>
        `;
        return;
    }

    wishlistContainer.innerHTML = wishlist.map(function (item) {
        return `
            <div class="wishlist-item">
                <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}">

                <div class="wishlist-item-info">
                    <h3>${escapeHTML(item.name)}</h3>
                    <p>₹${Number(item.price).toFixed(2)}</p>

                    <button
                        class="btn"
                        onclick="moveWishlistToCart('${escapeHTML(item.id)}')"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="remove-btn"
                        onclick="removeFromWishlist('${escapeHTML(item.id)}')"
                    >
                        Remove
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

document.addEventListener("DOMContentLoaded", function () {
    displayWishlist();
});
