/**
 * PER CLEAN — FLAGSHIP CINEMATIC CONTROLLER
 * Full GSAP Scroll Choreography, Responsive Media Matching, Dynamic Commerce & RTL
 */

document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    const isRtl = document.documentElement.dir === 'rtl' || document.body.classList.contains('rtl-mode');
    let allProductsData = [];
    let cart = [];

    // Header scroll background toggle
    const siteHeader = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            siteHeader?.classList.add('scrolled');
        } else {
            siteHeader?.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile Hamburger Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    if (mobileMenuBtn && mobileNavDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavDrawer.classList.toggle('active');
        });
        // Close on link click
        mobileNavDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileNavDrawer.classList.remove('active'));
        });
    }

    // =========================================================================
    // 01. CINEMATIC HERO CHOREOGRAPHY (GSAP MatchMedia)
    // =========================================================================
    const mm = gsap.matchMedia();

    // Split MESS chars for physical shattering
    const messChars = document.querySelectorAll('.mess-char');

    // DESKTOP CHOREOGRAPHY (>= 769px)
    mm.add("(min-width: 769px)", () => {
        const desktopHeroTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#heroScene",
                start: "top top",
                end: "+=280%",
                scrub: 0.8,
                pin: true,
                anticipatePin: 1
            }
        });

        // 1. Initial State -> Physical Mess Breaking
        desktopHeroTl
            .to(".mess-texture-bg", {
                scale: 1.25,
                filter: "brightness(0.22) contrast(1.4)",
                ease: "power2.inOut",
                duration: 1.2
            }, 0)
            .to(".scroll-indicator", {
                opacity: 0,
                y: 20,
                duration: 0.4
            }, 0)
            .to(messChars, {
                y: (i) => (i % 2 === 0 ? -280 : 280),
                x: (i) => (i < 2 ? -320 : 320),
                rotation: (i) => (i % 2 === 0 ? -45 : 45),
                opacity: 0,
                filter: "blur(14px)",
                stagger: 0.05,
                ease: "power3.in",
                duration: 1.2
            }, 0.2)
            .to(".mess-subtitle, .tag-mess", {
                opacity: 0,
                y: 50,
                filter: "blur(8px)",
                duration: 0.8
            }, 0.4);

        // 2. Brand Catalyst Logo Lands with Heavy Momentum
        desktopHeroTl
            .fromTo("#brandCatalyst", 
                { scale: 0, rotation: -18, opacity: 0, y: -100 },
                { scale: 1, rotation: 0, opacity: 1, y: 0, ease: "back.out(2)", duration: 1.0 },
                1.0
            )
            .fromTo(".catalyst-glow-ring",
                { scale: 0.4, opacity: 1 },
                { scale: 2.4, opacity: 0, duration: 1.0, ease: "power2.out" },
                1.3
            );

        // 3. Clean Transformation Mask Expands from Impact Center
        desktopHeroTl
            .to("#layerClean", {
                clipPath: "circle(160% at 50% 50%)",
                duration: 2.2,
                ease: "power2.inOut"
            }, 1.4)
            .fromTo(".clean-liquid-bg",
                { scale: 1.2, rotation: 2 },
                { scale: 1.0, rotation: 0, duration: 2.2, ease: "power2.out" },
                1.4
            )
            .to(".clean-hero-content", {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.0,
                ease: "power2.out"
            }, 2.0);

        // 4. Logo Transitions & Product Hero Rises Solid & Grounded
        desktopHeroTl
            .to("#brandCatalyst", {
                scale: 0.45,
                y: -180,
                opacity: 0,
                duration: 0.9,
                ease: "power2.in"
            }, 2.5)
            .to(".clean-hero-content", {
                opacity: 0,
                y: -60,
                duration: 0.8,
                ease: "power2.in"
            }, 2.7)
            .fromTo("#productHeroStage",
                { y: "100vh", opacity: 1 },
                { y: "0vh", opacity: 1, ease: "power3.out", duration: 1.8 },
                2.8
            )
            .fromTo(".hero-bottle-img",
                { scale: 0.8, rotation: 6 },
                { scale: 1, rotation: -1, ease: "back.out(1.2)", duration: 1.8 },
                2.8
            )
            .fromTo(".product-contact-shadow",
                { scale: 0.3, opacity: 0 },
                { scale: 1, opacity: 0.9, ease: "power2.out", duration: 1.5 },
                3.1
            )
            .to("#productHeroSpecs", {
                opacity: 1,
                x: 0,
                duration: 1.0,
                ease: "power2.out"
            }, 3.3);

        // =========================================================================
        // CATEGORY HORIZONTAL CHOREOGRAPHY (DESKTOP)
        // =========================================================================
        const catTrack = document.getElementById('categoryTrack');
        const catCards = gsap.utils.toArray('.cat-card-item');

        if (catTrack && catCards.length > 0) {
            const totalShift = (catCards.length - 1) * 38; // percentage shift
            const catTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#categoriesSection",
                    start: "top top",
                    end: "+=320%",
                    pin: true,
                    scrub: 0.8,
                    anticipatePin: 1
                }
            });

            catTl.to(catTrack, {
                xPercent: isRtl ? totalShift : -totalShift,
                ease: "none",
                duration: 4
            });

            // Card Dominance Interpolation
            catCards.forEach((card, idx) => {
                const startTime = idx * 0.9;
                
                catTl.to(card, {
                    scale: 1.0,
                    opacity: 1,
                    filter: "blur(0px)",
                    rotateY: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    onStart: () => setCardDominant(idx)
                }, startTime);

                if (idx > 0) {
                    const prevCard = catCards[idx - 1];
                    catTl.to(prevCard, {
                        scale: 0.86,
                        opacity: 0.35,
                        filter: "blur(5px)",
                        rotateY: isRtl ? -12 : 12,
                        duration: 0.6,
                        ease: "power2.in"
                    }, startTime);
                }
            });
        }
    });

    // MOBILE CHOREOGRAPHY (<= 768px, tested at 320px, 360px, 390px, 430px)
    mm.add("(max-width: 768px)", () => {
        const mobileHeroTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#heroScene",
                start: "top top",
                end: "+=150%", // Fast, natural swipe distance on mobile
                scrub: 0.5,
                pin: true,
                anticipatePin: 1
            }
        });

        mobileHeroTl
            // 1. Mess Dissolve & Shatter
            .to(messChars, {
                y: -100,
                opacity: 0,
                filter: "blur(10px)",
                stagger: 0.04,
                duration: 0.6
            }, 0)
            .to(".mess-subtitle, .tag-mess, .scroll-indicator", {
                opacity: 0,
                duration: 0.4
            }, 0)
            .to(".mess-texture-bg", {
                scale: 1.15,
                filter: "brightness(0.2)",
                duration: 0.8
            }, 0)
            
            // 2. Logo Drop Catalyst
            .fromTo("#brandCatalyst",
                { scale: 0, opacity: 0, y: -40 },
                { scale: 0.88, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" },
                0.5
            )
            
            // 3. Clean Mask Wipe
            .to("#layerClean", {
                clipPath: "circle(150% at 50% 50%)",
                duration: 1.2,
                ease: "power2.inOut"
            }, 0.8)
            .to("#brandCatalyst", {
                scale: 0.4,
                opacity: 0,
                y: -80,
                duration: 0.5
            }, 1.2)
            
            // 4. Product Hero Locks in Comfortably
            .fromTo("#productHeroStage",
                { y: "60vh", opacity: 1 },
                { y: "0vh", opacity: 1, duration: 1.0, ease: "power2.out" },
                1.3
            )
            .to("#productHeroSpecs", {
                opacity: 1,
                duration: 0.5
            }, 1.7);

        // Mobile Category Carousel Dots
        const catViewport = document.getElementById('categoryViewport');
        const catDots = document.querySelectorAll('.cat-dot');
        const catCards = document.querySelectorAll('.cat-card-item');

        if (catViewport && catDots.length > 0) {
            catViewport.addEventListener('scroll', () => {
                const scrollLeft = Math.abs(catViewport.scrollLeft);
                const cardWidth = catCards[0]?.offsetWidth || 300;
                const activeIndex = Math.min(Math.round(scrollLeft / cardWidth), catCards.length - 1);
                
                catDots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === activeIndex);
                });
            }, { passive: true });

            catDots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const targetIdx = parseInt(e.target.dataset.target, 10);
                    const cardWidth = catCards[0]?.offsetWidth || 300;
                    catViewport.scrollTo({
                        left: targetIdx * cardWidth,
                        behavior: 'smooth'
                    });
                });
            });
        }
    });

    function setCardDominant(index) {
        const cards = document.querySelectorAll('.cat-card-item');
        cards.forEach((card, idx) => {
            if (idx === index) {
                card.classList.add('is-dominant');
            } else {
                card.classList.remove('is-dominant');
            }
        });
    }

    // =========================================================================
    // 02. DYNAMIC COMMERCE ENGINE (DATA.JSON INGESTION)
    // =========================================================================
    fetch('/data.json')
        .then(res => res.text())
        .then(raw => {
            // Strip potential UTF-8 BOM
            const cleaned = raw.charCodeAt(0) === 0xFEFF ? raw.slice(1) : raw;
            const data = JSON.parse(cleaned);
            allProductsData = data.products || [];

            renderFeaturedProducts(allProductsData);
            renderFullCatalog(allProductsData);
            initCatalogFilters();
            initCartEvents();
        })
        .catch(err => {
            console.error("Error loading product catalog:", err);
        });

    // Helper: Categorize product by title keywords
    function categorizeProduct(title) {
        const t = title.toLowerCase();
        if (t.includes('actif') || t.includes('grease') || t.includes('kitchen') || t.includes('mencopol') || t.includes('dish')) {
            return 'Kitchen';
        } else if (t.includes('perwash') || t.includes('gel') || t.includes('bleach') || t.includes('laundry')) {
            return 'Laundry';
        } else if (t.includes('soft') || t.includes('softener')) {
            return 'Softener';
        } else if (t.includes('germol') || t.includes('disinfectant') || t.includes('toilet') || t.includes('sd')) {
            return 'Disinfectant';
        } else if (t.includes('soap') || t.includes('hand')) {
            return 'Hand Soap';
        }
        return 'General';
    }

    // Render 6 Curated Featured Products
    function renderFeaturedProducts(products) {
        const featuredGrid = document.getElementById('featuredGrid');
        if (!featuredGrid) return;

        // Choose 6 flagship products across disciplines
        const curatedIndexes = [1, 12, 3, 5, 2, 32]; // Actif 5KG, Perwash Gel, Softener 5KG, Germol 5KG, Hand Soap Spring, Actif 650g
        const curated = curatedIndexes.map(idx => products[idx] || products[0]);

        featuredGrid.innerHTML = curated.map(p => {
            const price = p.variants[0]?.price || "0.00";
            const img = p.images[0]?.src || '/assets/logo.png';
            const cat = categorizeProduct(p.title);
            const title = isRtl ? (p.translations?.ar?.title || p.title) : p.title;

            return `
                <div class="product-card">
                    <div class="card-image-wrap">
                        <img src="${img}" alt="${title}" loading="lazy">
                    </div>
                    <div class="card-body">
                        <span class="card-category-tag">${cat}</span>
                        <h4 class="card-title">${title}</h4>
                        <div class="card-footer">
                            <span class="card-price">${price} EGP</span>
                            <button class="btn-card-add" 
                                data-id="${p.id}" 
                                data-title="${title.replace(/"/g, '&quot;')}" 
                                data-price="${price} EGP" 
                                data-img="${img}">
                                ${isRtl ? 'إضافة للسلة' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Render Full Catalog inside Slide-Over Modal
    function renderFullCatalog(products) {
        const grid = document.getElementById('fullCatalogGrid');
        const countPill = document.getElementById('catalogCountPill');
        if (!grid) return;

        if (countPill) {
            countPill.innerText = isRtl ? `${products.length} منتج متوفر` : `${products.length} Products Available`;
        }

        grid.innerHTML = products.map(p => {
            const price = p.variants[0]?.price || "0.00";
            const img = p.images[0]?.src || '/assets/logo.png';
            const cat = categorizeProduct(p.title);
            const title = isRtl ? (p.translations?.ar?.title || p.title) : p.title;

            return `
                <div class="product-card catalog-item" data-category="${cat}" data-title="${title.toLowerCase()}">
                    <div class="card-image-wrap" style="height: 220px; padding: 1.5rem;">
                        <img src="${img}" alt="${title}" loading="lazy">
                    </div>
                    <div class="card-body" style="padding: 1.25rem;">
                        <span class="card-category-tag">${cat}</span>
                        <h4 class="card-title" style="font-size: 1.05rem;">${title}</h4>
                        <div class="card-footer">
                            <span class="card-price" style="font-size: 1.25rem;">${price} EGP</span>
                            <button class="btn-card-add" 
                                data-id="${p.id}" 
                                data-title="${title.replace(/"/g, '&quot;')}" 
                                data-price="${price} EGP" 
                                data-img="${img}">
                                ${isRtl ? 'إضافة' : '+ Add'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        initCartEvents();
    }

    // Modal & Catalog Filter Controls
    const catalogModal = document.getElementById('catalogModal');
    const catalogCloseBtn = document.getElementById('catalogCloseBtn');
    const btnViewAllCatalog = document.getElementById('btnViewAllCatalog');
    const btnOpenCatalogHeader = document.getElementById('btnOpenCatalogHeader');
    const navShopAll = document.getElementById('navShopAll');
    const mobileShopAll = document.getElementById('mobileShopAll');

    function openCatalog(filterCategory = 'ALL') {
        catalogModal?.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (filterCategory !== 'ALL') {
            const pill = document.querySelector(`.filter-pill[data-category="${filterCategory}"]`);
            pill?.click();
        }
    }

    function closeCatalog() {
        catalogModal?.classList.remove('active');
        document.body.style.overflow = '';
    }

    btnViewAllCatalog?.addEventListener('click', () => openCatalog('ALL'));
    btnOpenCatalogHeader?.addEventListener('click', () => openCatalog('ALL'));
    navShopAll?.addEventListener('click', (e) => { e.preventDefault(); openCatalog('ALL'); });
    mobileShopAll?.addEventListener('click', (e) => { e.preventDefault(); openCatalog('ALL'); });
    catalogCloseBtn?.addEventListener('click', closeCatalog);
    
    // Category card explore buttons
    document.querySelectorAll('.btn-cat-explore').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            openCatalog(filter);
        });
    });

    // Close on overlay click
    catalogModal?.addEventListener('click', (e) => {
        if (e.target === catalogModal) closeCatalog();
    });

    // Filter and Search Logic
    function initCatalogFilters() {
        const searchInput = document.getElementById('catalogSearchInput');
        const pills = document.querySelectorAll('.filter-pill');

        let currentCategory = 'ALL';
        let currentSearch = '';

        function applyFilters() {
            const items = document.querySelectorAll('.catalog-item');
            let visibleCount = 0;

            items.forEach(item => {
                const itemCat = item.dataset.category;
                const itemTitle = item.dataset.title;

                const matchCat = currentCategory === 'ALL' || itemCat === currentCategory;
                const matchSearch = currentSearch === '' || itemTitle.includes(currentSearch);

                if (matchCat && matchSearch) {
                    item.style.display = 'flex';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            const countPill = document.getElementById('catalogCountPill');
            if (countPill) {
                countPill.innerText = isRtl ? `${visibleCount} منتج متوفر` : `${visibleCount} Products Available`;
            }
        }

        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentCategory = pill.dataset.category;
                applyFilters();
            });
        });

        searchInput?.addEventListener('input', (e) => {
            currentSearch = e.target.value.trim().toLowerCase();
            applyFilters();
        });
    }

    // =========================================================================
    // 03. CART & WHATSAPP CHECKOUT LOGIC
    // =========================================================================
    const cartTrigger = document.getElementById('cartTrigger');
    const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const cartBadge = document.getElementById('cartBadge');
    const cartDrawerCount = document.getElementById('cartDrawerCount');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalValue = document.getElementById('cartTotalValue');
    const btnCheckoutWhatsApp = document.getElementById('btnCheckoutWhatsApp');
    const btnStartShopping = document.getElementById('btnStartShopping');

    function openCart() {
        cartDrawerOverlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartDrawerOverlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    cartTrigger?.addEventListener('click', openCart);
    cartCloseBtn?.addEventListener('click', closeCart);
    btnStartShopping?.addEventListener('click', () => {
        closeCart();
        openCatalog('ALL');
    });

    cartDrawerOverlay?.addEventListener('click', (e) => {
        if (e.target === cartDrawerOverlay) closeCart();
    });

    function initCartEvents() {
        document.querySelectorAll('.btn-card-add, .btn-hero-cart').forEach(btn => {
            btn.onclick = () => {
                const id = btn.dataset.id;
                const title = btn.dataset.title;
                const price = btn.dataset.price;
                const img = btn.dataset.img;

                addToCart({ id, title, price, img });

                // Visual button feedback
                const prev = btn.innerText;
                btn.innerText = isRtl ? '✓ أضيف بنجاح' : '✓ Added!';
                setTimeout(() => { btn.innerText = prev; }, 1400);
            };
        });
    }

    function addToCart(product) {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ ...product, qty: 1 });
        }
        updateCartUI();
        openCart();
    }

    function updateCartUI() {
        const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
        if (cartBadge) cartBadge.innerText = totalItems;
        if (cartDrawerCount) cartDrawerCount.innerText = totalItems;

        const emptyState = document.getElementById('cartEmptyState');
        const footer = document.getElementById('cartDrawerFooter');

        if (cart.length === 0) {
            if (emptyState) emptyState.style.display = 'flex';
            if (footer) footer.style.display = 'none';
            if (cartItemsList) cartItemsList.innerHTML = '';
            cartItemsList?.appendChild(emptyState);
            return;
        }

        if (emptyState) emptyState.style.display = 'none';
        if (footer) footer.style.display = 'block';

        let totalEGP = 0;
        const html = cart.map((item, idx) => {
            const unitPrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
            const lineTotal = unitPrice * item.qty;
            totalEGP += lineTotal;

            return `
                <div class="cart-item-row">
                    <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <div class="cart-item-price">${item.price}</div>
                        <div class="cart-qty-ctrls">
                            <button class="btn-qty" onclick="window.changeCartQty(${idx}, -1)">-</button>
                            <span style="font-weight:700; font-size:0.95rem;">${item.qty}</span>
                            <button class="btn-qty" onclick="window.changeCartQty(${idx}, 1)">+</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        if (cartItemsList) cartItemsList.innerHTML = html;
        if (cartTotalValue) cartTotalValue.innerText = `${totalEGP.toFixed(2)} EGP`;
    }

    window.changeCartQty = function(index, delta) {
        if (!cart[index]) return;
        cart[index].qty += delta;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        updateCartUI();
    };

    // WhatsApp Checkout Formatter
    btnCheckoutWhatsApp?.addEventListener('click', () => {
        if (cart.length === 0) return;

        let totalEGP = 0;
        let message = isRtl ? 
            "مرحباً شركة بير كلين، أود تأكيد طلب المنتجات التالية عبر الموقع الإلكتروني:\n\n" : 
            "Hello Per Clean Egypt, I would like to place an order for the following items:\n\n";

        cart.forEach((item, i) => {
            const unitPrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
            const lineTotal = unitPrice * item.qty;
            totalEGP += lineTotal;
            message += `${i + 1}. ${item.title} × ${item.qty} = ${lineTotal.toFixed(2)} EGP\n`;
        });

        message += isRtl ? 
            `\nالإجمالي التقديري: ${totalEGP.toFixed(2)} ج.م\nيرجى تأكيد التوصيل وبيانات الاستلام.` : 
            `\nEstimated Total: ${totalEGP.toFixed(2)} EGP\nPlease confirm availability and delivery details.`;

        const phone = "201000000000"; // Replace with verified brand number
        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    });

});
