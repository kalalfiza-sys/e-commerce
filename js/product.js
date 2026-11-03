
document.addEventListener("DOMContentLoaded", function () {

    // ALL PRODUCTS
    const products = {
        1: {
            id: 1,
            name: "Smart Watch",
            price: 1499,
            image: "images/smart  watch1.jpg",
            category: "Electronics",
            description: "Discover our Smart Watch with a stylish design. Enjoy useful features and a comfortable experience for everyday use."
        },

        2: {
            id: 2,
            name: "Wireless Headphones",
            price: 999,
            image: "images/Wireless Headphones.jpg",
            category: "Electronics",
            description: "Enjoy your favourite music with these stylish and comfortable Wireless Headphones."
        },

        3: {
            id: 3,
            name: "Casual Shoes",
            price: 1299,
            image: "images/Casual Shoes.jpg",
            category: "Men",
            description: "Discover comfortable and stylish Casual Shoes, perfect for everyday use."
        },

        4: {
            id: 4,
            name: "Travel Bag",
            price: 899,
            image: "images/Travel Bag.jpg",
            category: "Women",
            description: "Carry your essentials with this stylish and useful Travel Bag."
        }
    };

    // GET PRODUCT ID FROM URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id") || "1";

    const product = products[productId];

    // CHECK PRODUCT
    if (!product) {
        document.getElementById("detailProductName").textContent =
            "Product Not Found";
        return;
    }

    // DISPLAY PRODUCT DETAILS
    const image = document.getElementById("detailProductImage");

    image.src = product.image;
    image.alt = product.name;

    document.getElementById("detailProductName").textContent =
        product.name;

    document.getElementById("detailProductPrice").textContent =
        "₹" + product.price;

    document.getElementById("detailProductDescription").textContent =
        product.description;

    document.getElementById("detailProductCategory").textContent =
        product.category;

    // ADD TO CART
    document.getElementById("addToCartBtn").addEventListener("click", function () {

        const quantityInput = document.getElementById("productQuantity");

        const quantity = Math.max(
            1,
            parseInt(quantityInput.value, 10) || 1
        );

        const selectedProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        };

        if (typeof addProductToCart === "function") {
            addProductToCart(selectedProduct);
        } else {
            alert("Cart.js is not loaded. Please check the file path.");
        }
    });

    // ADD TO WISHLIST
    document.getElementById("addToWishlistBtn").addEventListener("click", function () {

        const selectedProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        };

        if (typeof addProductToWishlist === "function") {
            addProductToWishlist(selectedProduct);
        } else {
            alert("Wishlist.js is not loaded. Please check the file path.");
        }
    });

});
