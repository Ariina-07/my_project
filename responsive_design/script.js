document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.nav-mobile');
    
    menuToggle.addEventListener('click', function() { 
        mobileMenu.classList.toggle('active');
    });
});
