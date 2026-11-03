 
// ShopNest Product Search, Category Filter and Sorting

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("productSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const sortSelect = document.getElementById("sortProducts");
    const productContainer = document.querySelector(".shop-product-container");
    const noProductsMessage = document.getElementById("noProductsMessage");

    if (!productContainer) {
        return;
    }

    const products = Array.from(
        productContainer.querySelectorAll(".shop-product-card")
    );

    function filterProducts() {
        const searchValue = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        const categoryValue = categoryFilter
            ? categoryFilter.value.toLowerCase()
            : "";

        let visibleCount = 0;

        products.forEach(function (product) {
            const productName = (
                product.querySelector("h3")?.textContent || ""
            ).toLowerCase();

            const productCategory = (
                product.dataset.category || ""
            ).toLowerCase();

            const matchesSearch = productName.includes(searchValue);

            const matchesCategory =
                categoryValue === "" ||
                categoryValue === "all" ||
                productCategory === categoryValue;

            const isVisible = matchesSearch && matchesCategory;

            product.style.display = isVisible ? "" : "none";

            if (isVisible) {
                visibleCount++;
            }
        });

        if (noProductsMessage) {
            noProductsMessage.style.display =
                visibleCount === 0 ? "block" : "none";
        }
    }

    function sortProducts() {
        if (!sortSelect) {
            return;
        }

        const sortValue = sortSelect.value;

        const sortedProducts = [...products];

        sortedProducts.sort(function (a, b) {
            const priceA = Number(a.dataset.price || 0);
            const priceB = Number(b.dataset.price || 0);

            if (sortValue === "low-to-high") {
                return priceA - priceB;
            }

            if (sortValue === "high-to-low") {
                return priceB - priceA;
            }

            if (sortValue === "name") {
                const nameA = a.querySelector("h3")?.textContent || "";
                const nameB = b.querySelector("h3")?.textContent || "";

                return nameA.localeCompare(nameB);
            }

            return 0;
        });

        sortedProducts.forEach(function (product) {
            productContainer.appendChild(product);
        });

        filterProducts();
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterProducts);
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", sortProducts);
    }

    // Read category from URL
    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("category");

    if (selectedCategory && categoryFilter) {
        categoryFilter.value = selectedCategory;
    }

    filterProducts();
});
