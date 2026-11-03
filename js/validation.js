 
// ShopNest Form Validation

document.addEventListener("DOMContentLoaded", function () {
    // Login Form
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!loginForm.checkValidity()) {
                loginForm.reportValidity();
                return;
            }

            alert(
                "This is a frontend demo. Real login requires a secure backend."
            );
        });
    }

    // Registration Form
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const password = document.getElementById("registerPassword")?.value;
            const confirmPassword = document.getElementById("confirmPassword")?.value;
            const acceptTerms = document.getElementById("acceptTerms");

            if (!registerForm.checkValidity()) {
                registerForm.reportValidity();
                return;
            }

            if (password !== confirmPassword) {
                alert("Password and Confirm Password do not match!");
                return;
            }

            if (acceptTerms && !acceptTerms.checked) {
                alert("Please accept the terms and conditions.");
                return;
            }

            alert(
                "This is a frontend demo. Real registration requires a secure backend."
            );
        });
    }

    // Contact Form
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            alert("Thank you! Your demo contact form is valid.");
            contactForm.reset();
        });
    }

    // Account Form
    const accountForm = document.getElementById("accountForm");

    if (accountForm) {
        accountForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!accountForm.checkValidity()) {
                accountForm.reportValidity();
                return;
            }

            alert("Account form validated. Backend is required to save changes.");
        });
    }

    // Address Form
    const addressForm = document.getElementById("addressForm");

    if (addressForm) {
        addressForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!addressForm.checkValidity()) {
                addressForm.reportValidity();
                return;
            }

            alert("Address form validated. Backend is required to save changes.");
        });
    }
});
