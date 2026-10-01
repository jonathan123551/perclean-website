/**
 * PER CLEAN — UNIFIED LUXURY FLAGSHIP CONTROLLER
 * Full GSAP Scroll Choreography, Parabolic Product-to-Cart Flight, Showroom Filtering & RTL
 */

document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    const isRtl = document.documentElement.dir === 'rtl' || document.body.classList.contains('rtl-mode');
    let allProductsData = [];
    let cart = [];
    let currentCategoryFilter = 'ALL';
    let isCatalogExpanded = false;

    // Header background toggle on scroll
    const siteHeader = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            siteHeader?.classList.add('scrolled');
        } else {
            siteHeader?.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile Navigation Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    if (mobileMenuBtn && mobileNavDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavDrawer.classList.toggle('active');
        });
        mobileNavDrawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileNavDrawer.classList.remove('active'));
        });
    }

    // =========================================================================
    // 01. CINEMATIC HERO CHOREOGRAPHY (GSAP MatchMedia)
    // =========================================================================
    const mm = gsap.matchMedia();
    const messChars = document.querySelectorAll('.mess-char');

    // DESKTOP HERO (>= 769px)
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

        desktopHeroTl
            // 1. Mess Shattering with physical velocity
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

        // 2. Brand Catalyst Logo Lands
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

        // 3. Clean Mask Expands
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

        // 4. Logo Transitions & Product Hero Rises
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

        // Category Horizontal Choreography
        const catTrack = document.getElementById('categoryTrack');
        const catCards = gsap.utils.toArray('.cat-card-item');

        if (catTrack && catCards.length > 0) {
            const totalShift = (catCards.length - 1) * 38;
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

    // MOBILE HERO (<= 768px)
    mm.add("(max-width: 768px)", () => {
        const mobileHeroTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#heroScene",
                start: "top top",
                end: "+=150%",
                scrub: 0.5,
                pin: true,
                anticipatePin: 1
            }
        });

        mobileHeroTl
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
            .fromTo("#brandCatalyst",
                { scale: 0, opacity: 0, y: -40 },
                { scale: 0.88, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" },
                0.5
            )
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
            .fromTo("#productHeroStage",
                { y: "60vh", opacity: 1 },
                { y: "0vh", opacity: 1, duration: 1.0, ease: "power2.out" },
                1.3
            )
            .to("#productHeroSpecs", {
                opacity: 1,
                duration: 0.5
            }, 1.7);

        // Mobile Category Dots
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
    // 02. CATEGORY -> PRODUCT SMOOTH TRANSITION
    // =========================================================================
    document.querySelectorAll('.btn-cat-explore, .footer-cat-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filterCat = btn.dataset.filter;
            if (!filterCat) return;

            // Smooth scroll to Showroom
            const targetSection = document.getElementById('catalogSection');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Switch Tab
            setTimeout(() => {
                setCategoryTab(filterCat);
            }, 400);
        });
    });

    // =========================================================================
    // 03. DYNAMIC COMMERCE INGESTION & EDITORIAL SHOWROOM
    // =========================================================================
    fetch('/data.json')
        .then(res => res.text())
        .then(raw => {
            const cleaned = raw.charCodeAt(0) === 0xFEFF ? raw.slice(1) : raw;
            const data = JSON.parse(cleaned);
            allProductsData = data.products || [];

            renderShowroomProducts();
            initShowroomControls();
        })
        .catch(err => {
            console.error("Error loading products:", err);
        });

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

    function getProductImage(product) {
        // High-DPI isolated assets for curated flagship items
        const t = product.title.toLowerCase();
        if (t.includes('actif') && t.includes('5k')) return '/assets/actif5_isolated.png';
        if (t.includes('actif') && t.includes('650')) return '/assets/feat_actif650.png';
        if (t.includes('perwash') && t.includes('5 k')) return '/assets/cat_laundry.png';
        if (t.includes('soft') && t.includes('5k')) return '/assets/cat_softener.png';
        if (t.includes('germol') && t.includes('5k')) return '/assets/cat_surfaces.png';
        if (t.includes('hand') && t.includes('spring') && t.includes('1.5k')) return '/assets/cat_soaps.png';

        return (product.images && product.images[0]) ? product.images[0].src : '/assets/logo.png';
    }

    function renderShowroomProducts() {
        const grid = document.getElementById('showroomGrid');
        const countIndicator = document.getElementById('visibleItemsCount');
        const expandBtnRow = document.getElementById('catalogExpandRow');
        const expandBtnText = document.getElementById('expandCatalogText');
        if (!grid) return;

        const searchVal = document.getElementById('showroomSearchInput')?.value.trim().toLowerCase() || '';

        // Filter products by current active tab & search
        let filtered = allProductsData.filter(p => {
            const cat = categorizeProduct(p.title);
            const title = isRtl ? (p.translations?.ar?.title || p.title) : p.title;
            const matchCat = currentCategoryFilter === 'ALL' || cat === currentCategoryFilter;
            const matchSearch = searchVal === '' || title.toLowerCase().includes(searchVal) || cat.toLowerCase().includes(searchVal);
            return matchCat && matchSearch;
        });

        // If category is "ALL" and user has not clicked expand, show initial curated 6 items
        const displayLimit = (currentCategoryFilter === 'ALL' && !isCatalogExpanded && searchVal === '') ? 6 : filtered.length;
        const toDisplay = filtered.slice(0, displayLimit);

        if (countIndicator) {
            countIndicator.innerText = filtered.length;
        }

        // Show/hide expand button
        if (expandBtnRow) {
            if (currentCategoryFilter === 'ALL' && searchVal === '') {
                expandBtnRow.style.display = 'block';
                if (expandBtnText) {
                    expandBtnText.innerText = isCatalogExpanded ? 
                        (isRtl ? 'عرض أقل' : 'COLLAPSE TO FEATURED') : 
                        (isRtl ? 'عرض جميع الـ 46 منتج' : 'VIEW ALL 46 PRODUCTS');
                }
            } else {
                expandBtnRow.style.display = 'none';
            }
        }

        if (toDisplay.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--text-muted);">
                    <p style="font-size: 1.2rem; margin-bottom: 1rem;">${isRtl ? 'لم يتم العثور على تركيبات مطابقة.' : 'No formulations found matching your filter.'}</p>
                    <button class="btn-cat-explore" onclick="window.resetShowroomFilters()">${isRtl ? 'إعادة ضبط البحث' : 'Reset Search'}</button>
                </div>
            `;
            return;
        }

        grid.innerHTML = toDisplay.map((p, index) => {
            const price = p.variants[0]?.price || "0.00";
            const img = getProductImage(p);
            const cat = categorizeProduct(p.title);
            const title = isRtl ? (p.translations?.ar?.title || p.title) : p.title;
            const cardId = `prod-card-${p.id || index}`;
            const imgId = `prod-img-${p.id || index}`;

            return `
                <div class="showroom-card" id="${cardId}" data-category="${cat}">
                    <div class="card-stage-wrap">
                        <img src="${img}" alt="${title}" class="card-product-img" id="${imgId}" loading="lazy" crossOrigin="anonymous">
                        <div class="card-stage-pedestal"></div>
                    </div>
                    <div class="card-body">
                        <div class="card-meta-row">
                            <span class="card-category-kicker">${cat}</span>
                            <span class="card-volume-tag">${extractVolume(title)}</span>
                        </div>
                        <h4 class="card-title">${title}</h4>
                        <div class="card-footer">
                            <span class="card-price">${price} EGP</span>
                            <button class="btn-card-add" 
                                data-id="${p.id || index}" 
                                data-title="${title.replace(/"/g, '&quot;')}" 
                                data-price="${price} EGP" 
                                data-img="${img}"
                                data-img-element="${imgId}">
                                <span>${isRtl ? 'إضافة للسلة' : 'Add to Cart'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Animate entrance of newly rendered cards
        gsap.fromTo(".showroom-card", 
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" }
        );

        bindAddToCartTriggers();
    }

    function extractVolume(title) {
        const match = title.match(/(\d+(?:\.\d+)?\s*(?:KG|K|GM|Gram|ML|k|gm|ml))/i);
        return match ? match[1].toUpperCase() : 'STANDARD';
    }

    function initShowroomControls() {
        // Tab Filters
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.dataset.cat;
                setCategoryTab(cat);
            });
        });

        // Search Input
        const searchInput = document.getElementById('showroomSearchInput');
        const clearBtn = document.getElementById('clearSearchBtn');
        const resetBtn = document.getElementById('btnResetFilters');

        searchInput?.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';
            if (resetBtn) resetBtn.style.display = val ? 'inline-block' : 'none';
            renderShowroomProducts();
        });

        clearBtn?.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            clearBtn.style.display = 'none';
            if (resetBtn) resetBtn.style.display = 'none';
            renderShowroomProducts();
        });

        resetBtn?.addEventListener('click', () => {
            window.resetShowroomFilters();
        });

        // Expand Catalog Toggle
        const btnExpandCatalog = document.getElementById('btnExpandCatalog');
        btnExpandCatalog?.addEventListener('click', () => {
            isCatalogExpanded = !isCatalogExpanded;
            renderShowroomProducts();
            if (isCatalogExpanded) {
                const grid = document.getElementById('showroomGrid');
                grid?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    function setCategoryTab(category) {
        currentCategoryFilter = category;
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(b => {
            b.classList.toggle('active', b.dataset.cat === category);
        });

        const resetBtn = document.getElementById('btnResetFilters');
        if (resetBtn) {
            resetBtn.style.display = category !== 'ALL' ? 'inline-block' : 'none';
        }

        renderShowroomProducts();
    }

    window.resetShowroomFilters = function() {
        currentCategoryFilter = 'ALL';
        isCatalogExpanded = false;
        const searchInput = document.getElementById('showroomSearchInput');
        const clearBtn = document.getElementById('clearSearchBtn');
        const resetBtn = document.getElementById('btnResetFilters');
        if (searchInput) searchInput.value = '';
        if (clearBtn) clearBtn.style.display = 'none';
        if (resetBtn) resetBtn.style.display = 'none';

        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(b => b.classList.toggle('active', b.dataset.cat === 'ALL'));

        renderShowroomProducts();
    };

    // =========================================================================
    // 04. PRODUCT -> CART PARABOLIC FLIGHT ANIMATION (FLIP / GSAP)
    // =========================================================================
    function bindAddToCartTriggers() {
        document.querySelectorAll('.btn-card-add, .btn-hero-cart').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();

                const id = btn.dataset.id;
                const title = btn.dataset.title;
                const price = btn.dataset.price;
                const img = btn.dataset.img;
                const imgElemId = btn.dataset.imgElement;

                // Animate product flight to floating cart
                const sourceImg = document.getElementById(imgElemId) || btn.closest('.showroom-card')?.querySelector('.card-product-img');
                const targetCart = document.getElementById('floatingCartBtn');

                if (sourceImg && targetCart) {
                    animateProductFlight(sourceImg, targetCart, () => {
                        addToCart({ id, title, price, img });
                    });
                } else {
                    addToCart({ id, title, price, img });
                }

                // Button visual confirmation
                const textSpan = btn.querySelector('span') || btn;
                const origText = textSpan.innerText;
                textSpan.innerText = isRtl ? '✓ أضيف للسلة' : '✓ Added to Cart';
                btn.style.background = 'var(--brand-teal-bright)';
                btn.style.color = 'var(--bg-dark)';

                setTimeout(() => {
                    textSpan.innerText = origText;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 1500);
            };
        });
    }

    function animateProductFlight(sourceImg, targetCart, onArrive) {
        const startRect = sourceImg.getBoundingClientRect();
        const endRect = targetCart.getBoundingClientRect();

        // Create temporary animated clone
        const ghost = document.createElement('img');
        ghost.src = sourceImg.src;
        ghost.className = 'flying-cart-ghost';
        ghost.style.left = `${startRect.left}px`;
        ghost.style.top = `${startRect.top}px`;
        ghost.style.width = `${startRect.width}px`;
        ghost.style.height = `${startRect.height}px`;
        document.body.appendChild(ghost);

        const deltaX = (endRect.left + endRect.width / 2) - (startRect.left + startRect.width / 2);
        const deltaY = (endRect.top + endRect.height / 2) - (startRect.top + startRect.height / 2);

        // GSAP Parabolic Arc
        gsap.timeline({
            onComplete: () => {
                ghost.remove();

                // Target Cart reaction bounce
                gsap.timeline()
                    .to(targetCart, { scale: 1.35, duration: 0.12, ease: "power2.out" })
                    .to(targetCart, { scale: 1.0, duration: 0.35, ease: "elastic.out(1.2, 0.4)" });

                // Call add to cart and animate badge
                onArrive();

                const badge = document.getElementById('floatingCartBadge');
                if (badge) {
                    gsap.fromTo(badge, 
                        { scale: 0.2, rotation: isRtl ? 20 : -20 },
                        { scale: 1.0, rotation: 0, duration: 0.4, ease: "back.out(2.5)" }
                    );
                }
            }
        })
        .to(ghost, {
            scale: 0.2,
            rotation: isRtl ? -20 : 20,
            opacity: 0.85,
            x: deltaX,
            y: deltaY,
            duration: 0.75,
            ease: "power2.in"
        });
    }

    // =========================================================================
    // 05. CART DRAWER & WHATSAPP CHECKOUT
    // =========================================================================
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const floatingCartBadge = document.getElementById('floatingCartBadge');
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

    floatingCartBtn?.addEventListener('click', openCart);
    cartCloseBtn?.addEventListener('click', closeCart);
    btnStartShopping?.addEventListener('click', () => {
        closeCart();
        document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' });
    });

    cartDrawerOverlay?.addEventListener('click', (e) => {
        if (e.target === cartDrawerOverlay) closeCart();
    });

    function addToCart(product) {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ ...product, qty: 1 });
        }
        updateCartUI();
    }

    function updateCartUI() {
        const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
        if (floatingCartBadge) floatingCartBadge.innerText = totalItems;
        if (cartDrawerCount) {
            cartDrawerCount.innerText = isRtl ? `${totalItems} منتج` : `${totalItems} Items`;
        }

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
                            <button class="btn-qty" onclick="window.changeCartQty(${idx}, -1)" aria-label="Decrease quantity">-</button>
                            <span style="font-weight:800; font-size:0.95rem; min-width:20px; text-align:center;">${item.qty}</span>
                            <button class="btn-qty" onclick="window.changeCartQty(${idx}, 1)" aria-label="Increase quantity">+</button>
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
            "مرحباً شركة بير كلين، أود تأكيد طلب المنتجات التالية عبر الموقع الرسمي:\n\n" : 
            "Hello Per Clean Egypt, I would like to place an order from your official website:\n\n";

        cart.forEach((item, i) => {
            const unitPrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
            const lineTotal = unitPrice * item.qty;
            totalEGP += lineTotal;
            message += `${i + 1}. ${item.title} × ${item.qty} = ${lineTotal.toFixed(2)} EGP\n`;
        });

        message += isRtl ? 
            `\nالإجمالي التقديري: ${totalEGP.toFixed(2)} ج.م\nيرجى تأكيد التوصيل وبيانات الشحن.` : 
            `\nEstimated Total: ${totalEGP.toFixed(2)} EGP\nPlease confirm product availability and doorstep delivery details.`;

        const phone = "201000000000"; // Replace with verified brand phone
        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    });

});
