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

// --- TEMPLE DATA ---
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Durban South Africa",
        location: "Durban, South Africa",
        dedicated: "2020, February, 16",
        area: 19881,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/durban-south-africa-temple/durban-south-africa-temple-49120.jpg"
    },
    {
        templeName: "Salt Lake City Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-9375.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13759.jpg"
    },
];


// --- CARD GENERATION FUNCTION ---
const gallery = document.querySelector('.gallery');
const pageHeading = document.querySelector('.page-heading');

function createTempleCards(filteredTemples) {
    // Clear the current gallery content
    gallery.innerHTML = '';

    filteredTemples.forEach(temple => {
        // Create elements
        let figure = document.createElement('figure');
        let img = document.createElement('img');
        let figcaption = document.createElement('figcaption');
        let details = document.createElement('div');

        // Add classes
        figure.classList.add('album-item');
        details.classList.add('details');

        // Set Image attributes
        img.src = temple.imageUrl;
        img.alt = `${temple.templeName} Temple`;
        img.loading = 'lazy'; // Native lazy loading
        img.width = 400;
        img.height = 250;

        // Set Caption content (Temple Name)
        figcaption.classList.add('caption');
        figcaption.textContent = temple.templeName;

        // Set Details content (Location, Dedicated, Area)
        details.innerHTML = `
            <p><strong>Location:</strong> ${temple.location}</p>
            <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
            <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
        `;

        // Append elements
        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(details);

        gallery.appendChild(figure);
    });
}


// --- NAVIGATION FILTERING LOGIC ---
const navLinks = mainNav.querySelectorAll('a');

// Define the filtering criteria
const filters = {
    'Home': () => temples,
    'Old': () => temples.filter(t => {
        const year = parseInt(t.dedicated.split(',')[0].trim());
        return year < 1900;
    }),
    'New': () => temples.filter(t => {
        const year = parseInt(t.dedicated.split(',')[0].trim());
        return year > 2000;
    }),
    'Large': () => temples.filter(t => t.area > 90000),
    'Small': () => temples.filter(t => t.area < 10000)
};

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        // 1. Close mobile menu
        mainNav.classList.remove('nav-open');
        menuToggle.innerHTML = '&#9776;';

        // 2. Remove 'active' class from all links and add to the clicked link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // 3. Get the filter key and run the corresponding function
        const filterKey = link.textContent.trim();
        const filteredList = filters[filterKey]();

        // 4. Update heading
        pageHeading.textContent = `${filterKey} Temples`;

        // 5. Render the filtered cards
        createTempleCards(filteredList);
    });
});


// --- INITIAL LOAD: Display all temples ---
createTempleCards(temples);