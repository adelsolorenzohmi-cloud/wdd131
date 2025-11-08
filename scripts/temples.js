const currentYearSpan = document.getElementById('currentyear');
const lastModifiedSpan = document.getElementById('lastmodified');

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

const today = new Date();
currentYearSpan.textContent = today.getFullYear();

lastModifiedSpan.textContent = document.lastModified;

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('nav-open');

    if (mainNav.classList.contains('nav-open')) {
        menuToggle.innerHTML = '&#x2715;';
    } else {
        menuToggle.innerHTML = '&#9776;';
    }
});

const navLinks = mainNav.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('nav-open');
        menuToggle.innerHTML = '&#9776;';
    });
});