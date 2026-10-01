document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    const isRtl = document.documentElement.dir === 'rtl';

    // ---------------------------------------------------
    // 01. CINEMATIC HERO TIMELINE
    // ---------------------------------------------------
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scene-wrapper",
            start: "top top",
            end: "+=500%", // 500vh of scroll distance
            scrub: 1, // Smooth scrubbing
            pin: true,
            anticipatePin: 1
        }
    });

    // Simple text splitter for MESS
    const messText = document.querySelector('.mess-text');
    if (messText) {
        const chars = messText.innerText.split('');
        messText.innerHTML = '';
        chars.forEach(c => {
            let span = document.createElement('span');
            span.className = 'char';
            span.innerText = c;
            messText.appendChild(span);
        });
    }

    // Sequence Choreography
    heroTl
        // 1. Zoom into the mess slightly
        .to(".mess-bg", { scale: 1.2, duration: 1 }, 0)
        
        // 2. Shatter the MESS text
        .to(".char", {
            y: (i) => (Math.random() - 0.5) * 800,
            x: (i) => (Math.random() - 0.5) * 800,
            rotation: (i) => (Math.random() - 0.5) * 180,
            opacity: 0,
            filter: "blur(20px)",
            duration: 1.5,
            stagger: 0.1,
            ease: "power2.inOut"
        }, 0.5)
        .to(".mess-sub", { opacity: 0, y: 50, duration: 0.5 }, 0.5)

        // 3. Brand Catalyst enters
        .to(".brand-catalyst-center", {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.5)"
        }, 1)

        // 4. The Transformation (Mask Expansion) triggered by logo hit
        .to(".layer-clean", {
            clipPath: "circle(150% at 50% 50%)",
            duration: 2,
            ease: "power2.inOut"
        }, 1.5)

        // 5. Clean text emerges
        .to(".clean-typography", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        }, 2.5)
        
        // 6. Background subtly zooms out
        .to(".clean-bg", { scale: 1.1, duration: 2 }, 1.5)

        // 7. Logo fades away
        .to(".brand-catalyst-center", {
            y: -200,
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: "power2.in"
        }, 3)

        // 8. Product Hero rises
        .to(".product-hero-center", {
            y: -50,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out"
        }, 3.5);


    // ---------------------------------------------------
    // 02. CATEGORY HORIZONTAL SCROLL
    // ---------------------------------------------------
    const track = document.querySelector('.category-track');
    const panels = gsap.utils.toArray('.cat-panel');
    
    if (track && panels.length > 0) {
        // Horizontal scroll animation
        gsap.to(track, {
            xPercent: isRtl ? 100 * (panels.length - 1) : -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".category-experience",
                pin: true,
                scrub: 1,
                end: () => "+=" + track.offsetWidth
            }
        });

        // Add intersection observer to highlight center card
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('is-active');
                } else {
                    entry.target.classList.remove('is-active');
                }
            });
        }, {
            root: null,
            threshold: 0.5 // trigger when 50% visible
        });

        panels.forEach(panel => observer.observe(panel));
    }


    // ---------------------------------------------------
    // 03. DYNAMIC DATA FETCH & COMMERCE INJECTION
    // ---------------------------------------------------
    fetch('/data.json')
        .then(res => res.text())
        .then(text => {
            // Handle UTF-8 BOM if present
            if (text.charCodeAt(0) === 0xFEFF) {
                text = text.slice(1);
            }
            const data = JSON.parse(text);
            const products = data.products;

            const featuredGrid = document.querySelector('.featured-grid');
            const fullGrid = document.querySelector('.full-grid');
            
            if(!featuredGrid || !fullGrid) return;

            products.forEach((product, index) => {
                // Determine title based on language
                let title = isRtl ? (product.translations?.ar?.title || product.title) : product.title;
                // Price (using first variant)
                let price = product.variants[0] ? product.variants[0].price : "0.00";
                // Image
                let imageSrc = (product.images && product.images.length > 0) ? product.images[0].src : '/assets/logo.png';

                const cardHtml = `
                    <div class="product-card">
                        <div class="card-image-wrap">
                            <img src="${imageSrc}" alt="${title}" loading="lazy" />
                        </div>
                        <div class="card-info">
                            <h4 class="card-title">${title}</h4>
                            <div class="card-footer">
                                <span class="card-price">${price} EGP</span>
                                <button class="btn-add-cart">ADD TO CART</button>
                            </div>
                        </div>
                    </div>
                `;

                if(index < 6) {
                    featuredGrid.insertAdjacentHTML('beforeend', cardHtml);
                } else {
                    fullGrid.insertAdjacentHTML('beforeend', cardHtml);
                }
            });

            // Bind Cart Events for dynamically added buttons
            bindCartEvents();
        })
        .catch(err => console.error("Error loading products:", err));


    // ---------------------------------------------------
    // 04. UI INTERACTIONS (Cart & View All)
    // ---------------------------------------------------
    
    // View All Products
    const btnLoadAll = document.getElementById('btn-load-all');
    const fullGrid = document.querySelector('.full-grid');
    if (btnLoadAll && fullGrid) {
        btnLoadAll.addEventListener('click', () => {
            if (fullGrid.style.display === 'none') {
                fullGrid.style.display = 'grid';
                btnLoadAll.innerText = isRtl ? 'عرض منتجات أقل' : 'VIEW LESS';
            } else {
                fullGrid.style.display = 'none';
                btnLoadAll.innerText = isRtl ? 'عرض كل الـ 46 منتج' : 'VIEW ALL 46 PRODUCTS';
            }
        });
    }

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
                navLinks.style.padding = '1.5rem';
                navLinks.style.gap = '1.5rem';
            }
        });
    }

    // Shopping Cart & WhatsApp Logic
    let cart = [];
    const floatingCart = document.querySelector('.floating-cart');
    const cartCount = document.querySelector('.cart-count');

    function bindCartEvents() {
        document.querySelectorAll('.btn-add-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.product-card');
                if (!card) return;
                
                let title = card.querySelector('.card-title').innerText;
                let price = card.querySelector('.card-price').innerText;
                
                cart.push({ title, price });
                updateCartIcon();
                
                // Button feedback
                const origText = button.innerText;
                button.innerText = isRtl ? 'تمت الإضافة' : 'ADDED!';
                button.style.background = '#054f5c';
                setTimeout(() => {
                    button.innerText = origText;
                    button.style.background = '';
                }, 1500);
            });
        });
    }

    function updateCartIcon() {
        if (cart.length > 0) {
            floatingCart.classList.add('visible');
            cartCount.innerText = cart.length;
        } else {
            floatingCart.classList.remove('visible');
        }
    }

    // WhatsApp Checkout
    if (floatingCart) {
        floatingCart.addEventListener('click', (e) => {
            e.preventDefault();
            if (cart.length === 0) return;
            
            let orderText = isRtl ? "مرحباً، أود طلب المنتجات التالية:\n\n" : "Hello, I would like to order the following items:\n\n";
            cart.forEach((item, index) => {
                orderText += `${index + 1}. ${item.title} - ${item.price}\n`;
            });
            
            const whatsappNumber = "+201000000000"; // Replace with actual client number
            const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
            window.open(waUrl, '_blank');
            
            // Clear cart optionally, but let's keep it in case they close the window
        });
    }
});
