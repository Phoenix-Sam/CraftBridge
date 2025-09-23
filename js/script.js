document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // --- Fade-in on Scroll Animation Logic ---
    const fadeElems = document.querySelectorAll('.fade-in');
    const observerOptions = { root: null, threshold: 0.1 };
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeElems.forEach(elem => fadeInObserver.observe(elem));

    // --- STEP 1: DYNAMIC DATA MANAGEMENT ---

    // --- Data Store ---
    const artisans = [
        { id: 1, name: 'Rani Devi', craft: 'Phulkari Embroidery', region: 'Punjab', image: 'https://placehold.co/400x400/FDF5E6/333?text=Rani+Devi', story: '"Phulkari is not just a craft for me; it\'s the story of my ancestors that I weave with every stitch..."' },
        { id: 2, name: 'Sanjay Varma', craft: 'Wood Carving', region: 'Uttar Pradesh', image: 'https://placehold.co/400x400/FDF5E6/333?text=Sanjay+Varma', story: '"The chisel and wood speak a language of their own. I am just a medium for their conversation..."' },
        { id: 3, name: 'Lakshmi Priya', craft: 'Kanjeevaram Silk', region: 'Tamil Nadu', image: 'https://placehold.co/400x400/FDF5E6/333?text=Lakshmi+Priya', story: '"Each saree takes weeks of dedication, weaving threads of pure silk and gold into a timeless masterpiece."' },
        { id: 4, name: 'Gopal Saini', craft: 'Jaipur Blue Pottery', region: 'Rajasthan', image: 'https://placehold.co/400x400/FDF5E6/333?text=Gopal+Saini', story: '"From preparing the quartz dough to the final cobalt blue glaze, every piece is a part of Jaipur\'s soul."' },
    ];

    const products = [
        { id: 1, name: 'Phulkari Dupatta', artisanId: 1, price: 2499, image: 'https://placehold.co/400x400/FDF5E6/A0522D?text=Phulkari+Dupatta', craft: 'Phulkari Embroidery' },
        { id: 2, name: 'Carved Wooden Elephant', artisanId: 2, price: 1850, image: 'https://placehold.co/400x400/A0522D/FFFFFF?text=Wooden+Elephant', craft: 'Wood Carving' },
        { id: 3, name: 'Kanjeevaram Silk Saree', artisanId: 3, price: 12500, image: 'https://placehold.co/400x400/FDF5E6/A0522D?text=Silk+Saree', craft: 'Kanjeevaram Silk' },
        { id: 4, name: 'Blue Pottery Vase', artisanId: 4, price: 3200, image: 'https://placehold.co/400x400/A0522D/FFFFFF?text=Blue+Pottery+Vase', craft: 'Blue Pottery' },
    ];

    // --- Dynamic Rendering Functions ---

    /**
     * Renders Artisan Cards on the Artisans Page
     */
    function renderArtisans() {
        const grid = document.querySelector('.artisan-showcase-grid');
        if (!grid) return; // Exit if not on the artisans page

        grid.innerHTML = ''; // Clear existing static content
        artisans.forEach((artisan, index) => {
            const card = document.createElement('div');
            card.className = 'artisan-card-full fade-in';
            card.style.transitionDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <div class="artisan-card-image">
                   <img src="${artisan.image}" alt="Artisan ${artisan.name}">
                </div>
                <div class="artisan-card-content">
                    <h3>${artisan.name}</h3>
                    <p class="craft-specialty">${artisan.craft}, ${artisan.region}</p>
                    <p class="artisan-story">${artisan.story}</p>
                    <a href="#" class="btn btn-secondary">View Profile</a>
                </div>
            `;
            grid.appendChild(card);
            fadeInObserver.observe(card); // Re-apply observer for new elements
        });
    }

    /**
     * Renders Product Cards on the Products Page
     */
    function renderProducts() {
        const grid = document.querySelector('.product-grid');
        if (!grid) return; // Exit if not on the products page

        grid.innerHTML = ''; // Clear existing static content
        products.forEach((product, index) => {
            const artisan = artisans.find(a => a.id === product.artisanId);
            const card = document.createElement('div');
            card.className = 'product-card fade-in';
            card.style.transitionDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="artisan-name">by ${artisan ? artisan.name : 'Unknown'}</p>
                    <p class="product-price">₹${product.price.toLocaleString('en-IN')}</p>
                    <a href="#" class="btn btn-primary">Add to Cart</a>
                </div>
            `;
            grid.appendChild(card);
            fadeInObserver.observe(card); // Re-apply observer for new elements
        });
    }

    // --- Initial Page Load ---
    renderArtisans();
    renderProducts();

});

