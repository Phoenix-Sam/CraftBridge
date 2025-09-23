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

    // --- DATA STORE ---
    const artisans = [
        { id: 1, name: 'Rani Devi', craft: 'Phulkari Embroidery', region: 'Punjab', image: 'https://placehold.co/400x400/FDF5E6/333?text=Rani+Devi', story: '"Phulkari is not just a craft for me; it\'s the story of my ancestors that I weave with every stitch..."', craftValue: 'embroidery', regionValue: 'punjab' },
        { id: 2, name: 'Sanjay Varma', craft: 'Wood Carving', region: 'Uttar Pradesh', image: 'https://placehold.co/400x400/FDF5E6/333?text=Sanjay+Varma', story: '"The chisel and wood speak a language of their own. I am just a medium for their conversation..."', craftValue: 'wood', regionValue: 'up' },
        { id: 3, name: 'Lakshmi Priya', craft: 'Kanjeevaram Silk', region: 'Tamil Nadu', image: 'https://placehold.co/400x400/FDF5E6/333?text=Lakshmi+Priya', story: '"Each saree takes weeks of dedication, weaving threads of pure silk and gold into a timeless masterpiece."', craftValue: 'silk', regionValue: 'tn' },
        { id: 4, name: 'Gopal Saini', craft: 'Jaipur Blue Pottery', region: 'Rajasthan', image: 'https://placehold.co/400x400/FDF5E6/333?text=Gopal+Saini', story: '"From preparing the quartz dough to the final cobalt blue glaze, every piece is a part of Jaipur\'s soul."', craftValue: 'pottery', regionValue: 'rajasthan' },
    ];

    const products = [
        { id: 1, name: 'Phulkari Dupatta', artisanId: 1, price: 2499, image: 'https://placehold.co/400x400/FDF5E6/A0522D?text=Phulkari+Dupatta', craft: 'Phulkari Embroidery' },
        { id: 2, name: 'Carved Wooden Elephant', artisanId: 2, price: 1850, image: 'https://placehold.co/400x400/A0522D/FFFFFF?text=Wooden+Elephant', craft: 'Wood Carving' },
        { id: 3, name: 'Kanjeevaram Silk Saree', artisanId: 3, price: 12500, image: 'https://placehold.co/400x400/FDF5E6/A0522D?text=Silk+Saree', craft: 'Kanjeevaram Silk' },
        { id: 4, name: 'Blue Pottery Vase', artisanId: 4, price: 3200, image: 'https://placehold.co/400x400/A0522D/FFFFFF?text=Blue+Pottery+Vase', craft: 'Blue Pottery' },
        { id: 5, name: 'Phulkari Cushion Cover', artisanId: 1, price: 999, image: 'https://placehold.co/400x400/FDF5E6/A0522D?text=Cushion+Cover', craft: 'Phulkari Embroidery' },
        { id: 6, name: 'Hand-carved Spice Box', artisanId: 2, price: 2100, image: 'https://placehold.co/400x400/A0522D/FFFFFF?text=Spice+Box', craft: 'Wood Carving' },
    ];

    // --- DYNAMIC RENDERING FUNCTIONS ---
    
    /**
     * Renders Artisan Cards on the Artisans Page
     * @param {Array} artisansToRender - The array of artisan objects to display.
     */
    function renderArtisans(artisansToRender) {
        const grid = document.querySelector('.artisan-showcase-grid');
        if (!grid) return;

        grid.innerHTML = '';
        if (artisansToRender.length === 0) {
            grid.innerHTML = '<p>No artisans match the selected criteria.</p>';
            return;
        }

        artisansToRender.forEach((artisan, index) => {
            const card = document.createElement('div');
            card.className = 'artisan-card-full fade-in';
            card.style.transitionDelay = `${index * 0.05}s`;
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
            fadeInObserver.observe(card);
        });
    }

    /**
     * Renders Product Cards on the Products Page
     * @param {Array} productsToRender - The array of product objects to display.
     */
    function renderProducts(productsToRender) {
        const grid = document.querySelector('.product-grid');
        if (!grid) return;

        grid.innerHTML = '';
        if (productsToRender.length === 0) {
            grid.innerHTML = '<p>No products match the selected criteria.</p>';
            return;
        }

        productsToRender.forEach((product, index) => {
            const artisan = artisans.find(a => a.id === product.artisanId);
            const card = document.createElement('div');
            card.className = 'product-card fade-in';
            card.style.transitionDelay = `${index * 0.05}s`;
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
            fadeInObserver.observe(card);
        });
    }


    // --- STEP 2: INTERACTIVE FILTERING & SORTING LOGIC ---

    function applyFilters() {
        // --- Artisan Page Filtering ---
        const artisanPageGrid = document.querySelector('.artisan-showcase-grid');
        if (artisanPageGrid) {
            const craftFilter = document.getElementById('craft-filter').value;
            const regionFilter = document.getElementById('region-filter').value;
            
            let filteredArtisans = artisans;

            if (craftFilter !== 'all') {
                filteredArtisans = filteredArtisans.filter(a => a.craftValue === craftFilter);
            }
            if (regionFilter !== 'all') {
                filteredArtisans = filteredArtisans.filter(a => a.regionValue === regionFilter);
            }
            renderArtisans(filteredArtisans);
        }

        // --- Product Page Sorting ---
        const productPageGrid = document.querySelector('.product-grid');
        if(productPageGrid) {
            const sortFilter = document.getElementById('sort-filter').value;
            let sortedProducts = [...products]; // Create a copy to avoid modifying the original array

            if (sortFilter === 'low-high') {
                sortedProducts.sort((a, b) => a.price - b.price);
            } else if (sortFilter === 'high-low') {
                sortedProducts.sort((a, b) => b.price - a.price);
            }
            renderProducts(sortedProducts);
        }
    }

    // --- SETUP EVENT LISTENERS & INITIAL RENDER ---
    
    // Listen for changes on filter dropdowns
    const craftFilterEl = document.getElementById('craft-filter');
    const regionFilterEl = document.getElementById('region-filter');
    const sortFilterEl = document.getElementById('sort-filter');

    if(craftFilterEl) craftFilterEl.addEventListener('change', applyFilters);
    if(regionFilterEl) regionFilterEl.addEventListener('change', applyFilters);
    if(sortFilterEl) sortFilterEl.addEventListener('change', applyFilters);

    // Initial render on page load
    renderArtisans(artisans);
    renderProducts(products);

});

