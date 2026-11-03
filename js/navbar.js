 
// ShopNest Mobile Navbar

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (!menuBtn || !navLinks) {
        return;
    }

    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("show");

        const isOpen = navLinks.classList.contains("show");

        menuBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close menu after clicking a link
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("show");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (
            !menuBtn.contains(event.target) &&
            !navLinks.contains(event.target)
        ) {
            navLinks.classList.remove("show");
            menuBtn.setAttribute("aria-expanded", "false");
        }
    });
});
