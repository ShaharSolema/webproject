// main.js
document.addEventListener('DOMContentLoaded', function() {
    const cart = document.querySelector('.cart');
    const login = document.querySelector('.log_in');
    const cartMenu = document.querySelector('#cart-menu');
    const loginMenu = document.querySelector('#login-menu');
    const navMenu = document.querySelector('#nav-menu');
    const navHamburger = document.querySelector('.nav_hamburger');

    // Toggle cart menu visibility
    cart.addEventListener('click', function(event) {
        event.stopPropagation();
        const isVisible = cartMenu.style.display === 'block';
        cartMenu.style.display = isVisible ? 'none' : 'block';
        loginMenu.style.display = 'none'; // Hide login menu if visible
    });

    // Toggle login menu visibility
    login.addEventListener('click', function(event) {
        event.stopPropagation();
        const isVisible = loginMenu.style.display === 'block';
        loginMenu.style.display = isVisible ? 'none' : 'block';
        cartMenu.style.display = 'none'; // Hide cart menu if visible
    });

    // Toggle nav menu visibility
    navHamburger.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Hide menus if clicking outside
    document.addEventListener('click', function(event) {
        if (!cart.contains(event.target) && !cartMenu.contains(event.target)) {
            cartMenu.style.display = 'none';
        }
        if (!login.contains(event.target) && !loginMenu.contains(event.target)) {
            loginMenu.style.display = 'none';
        }
        if (!navHamburger.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.style.display = 'none';
        }
    });
});
