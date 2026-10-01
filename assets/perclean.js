/**
 * PER CLEAN — 3D SPATIAL FILM & UNIFIED LUXURY FLAGSHIP CONTROLLER
 * Full Camera Choreography, Alternating Vertical Category 3D Animation, Parabolic Flight & RTL
 */

document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP Plugins
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

    // Mobile Navigation Drawer Toggle
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
    // 01. 3D SPATIAL FILM SEQUENCE (THE CAMERA IS THE MAIN CHARACTER)
    // =========================================================================
    const mm = gsap.matchMedia();

    // DESKTOP CAMERA CHOREOGRAPHY (>= 769px)
    mm.add("(min-width: 769px)", () => {
        const filmTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#cameraScene",
                start: "top top",
                end: "+=420%",
                scrub: 0.8,
                pin: true,
                anticipatePin: 1
            }
        });

        // Set initial states for shot layers
        gsap.set("#shot01", { opacity: 1, zIndex: 1, scale: 1 });
        gsap.set(["#shot02", "#shot03", "#shot04", "#shot05", "#shot06", "#shot07"], {
            opacity: 0,
            scale: 0.92,
            filter: "blur(6px)"
        });

        filmTl
            // --- SHOT 01 -> SHOT 02 ---
            // Camera pushes into mess, then Shot 02 (Spray mist) enters
            .to("#shot01 .shot-bg-img", { scale: 1.15, filter: "brightness(0.35) contrast(1.3)", duration: 1.2 }, 0)
            .to("#shot01 .shot-typography", { opacity: 0, y: -70, filter: "blur(8px)", duration: 0.8 }, 0.4)
            .to(".film-scroll-prompt", { opacity: 0, duration: 0.3 }, 0)
            
            .fromTo("#shot02", 
                { opacity: 0, scale: 1.15, filter: "blur(8px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
                0.8
            )
            .to("#shot01", { opacity: 0, duration: 0.5 }, 1.3)

            // --- SHOT 02 -> SHOT 03 ---
            // Spray mist sweeps across, Camera tracks into Shot 03 (Active Foam)
            .to("#shot02 .shot-bg-img", { scale: 1.12, duration: 1.0 }, 1.5)
            .to("#shot02 .shot-typography", { opacity: 0, y: -60, filter: "blur(6px)", duration: 0.6 }, 1.8)

            .fromTo("#shot03",
                { opacity: 0, scale: 1.18, filter: "blur(10px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
                2.0
            )
            .to("#shot02", { opacity: 0, duration: 0.5 }, 2.5)

            // --- SHOT 03 -> SHOT 04 ---
            // Active foam breaks apart grease, Camera wipes into Shot 04 (Clean Chrome Stove)
            .to("#shot03 .shot-bg-img", { scale: 1.15, filter: "brightness(0.5)", duration: 1.0 }, 2.6)
            .to("#shot03 .shot-typography", { opacity: 0, y: -60, duration: 0.6 }, 2.8)

            .fromTo("#shot04",
                { opacity: 0, scale: 0.94, filter: "blur(8px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
                3.1
            )
            .to("#shot03", { opacity: 0, duration: 0.4 }, 3.5)

            // --- SHOT 04 -> SHOT 05 ---
            // Clean chrome gleam, Camera dives into Shot 05 (Per Clean Logo Vortex)
            .to("#shot04 .shot-bg-img", { scale: 1.1, duration: 1.0 }, 3.7)
            .to("#shot04 .shot-typography", { opacity: 0, y: -60, duration: 0.6 }, 3.9)

            .fromTo("#shot05",
                { opacity: 0, scale: 1.25, filter: "blur(12px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.0, ease: "back.out(1.2)" },
                4.2
            )
            .fromTo(".hero-logo-drop",
                { scale: 0.4, rotation: isRtl ? 15 : -15 },
                { scale: 1, rotation: 0, duration: 1.0, ease: "back.out(2)" },
                4.3
            )
            .to("#shot04", { opacity: 0, duration: 0.4 }, 4.6)

            // --- SHOT 05 -> SHOT 06 ---
            // Logo vortex dissolves into Shot 06 (Hero Wave & Actif Spray Bottle)
            .to("#shot05", { opacity: 0, scale: 0.85, filter: "blur(10px)", duration: 0.8 }, 5.2)

            .fromTo("#shot06",
                { opacity: 0, scale: 1.08, filter: "blur(8px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
                5.4
            )
            .fromTo(".shot-product-details",
                { opacity: 0, x: isRtl ? 40 : -40 },
                { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
                5.8
            )

            // --- SHOT 06 -> SHOT 07 ---
            // Camera tracks out to Shot 07 (Wide Sunlit Home Context)
            .to("#shot06", { opacity: 0, y: -60, duration: 0.8 }, 6.5)

            .fromTo("#shot07",
                { opacity: 0, scale: 1.1, filter: "blur(8px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
                6.7
            );

        // =========================================================================
        // CATEGORY EXPERIENCE (ALTERNATING VERTICAL MOVEMENT IN 3D)
        // =========================================================================
        const catCards = gsap.utils.toArray('.cat-vert-card');
        if (catCards.length > 0) {
            const catTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#categoriesSection",
                    start: "top top",
                    end: "+=360%",
                    pin: true,
                    scrub: 0.8,
                    anticipatePin: 1
                }
            });

            // Card 0 (Kitchen) starts active, then exits upwards
            // Card 1 (Laundry) enters from below, becomes dominant, exits downwards
            // Card 2 (Softener) enters from above, becomes dominant, exits upwards
            // Card 3 (Disinfectant) enters from below, becomes dominant, exits downwards
            // Card 4 (Hand Soap) enters from above, becomes dominant
            catCards.forEach((card, idx) => {
                if (idx === 0) {
                    gsap.set(card, { y: 0, rotateX: 0, opacity: 1, scale: 1 });
                    catTl.to(card, {
                        y: "-110vh",
                        rotateX: 18,
                        scale: 0.85,
                        opacity: 0,
                        filter: "blur(8px)",
                        duration: 1.0,
                        ease: "power2.in"
                    }, 0.8);
                } else if (idx === 1) {
                    // Enters from below
                    gsap.set(card, { y: "110vh", rotateX: -18, opacity: 0, scale: 0.85, filter: "blur(8px)" });
                    catTl.to(card, {
                        y: 0,
                        rotateX: 0,
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 1.0,
                        ease: "power2.out",
                        onStart: () => updateVertIndicator(1)
                    }, 0.8)
                    .to(card, {
                        y: "110vh",
                        rotateX: -18,
                        scale: 0.85,
                        opacity: 0,
                        filter: "blur(8px)",
                        duration: 1.0,
                        ease: "power2.in"
                    }, 1.8);
                } else if (idx === 2) {
                    // Enters from above
                    gsap.set(card, { y: "-110vh", rotateX: 18, opacity: 0, scale: 0.85, filter: "blur(8px)" });
                    catTl.to(card, {
                        y: 0,
                        rotateX: 0,
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 1.0,
                        ease: "power2.out",
                        onStart: () => updateVertIndicator(2)
                    }, 1.8)
                    .to(card, {
                        y: "-110vh",
                        rotateX: 18,
                        scale: 0.85,
                        opacity: 0,
                        filter: "blur(8px)",
                        duration: 1.0,
                        ease: "power2.in"
                    }, 2.8);
                } else if (idx === 3) {
                    // Enters from below
                    gsap.set(card, { y: "110vh", rotateX: -18, opacity: 0, scale: 0.85, filter: "blur(8px)" });
                    catTl.to(card, {
                        y: 0,
                        rotateX: 0,
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 1.0,
                        ease: "power2.out",
                        onStart: () => updateVertIndicator(3)
                    }, 2.8)
                    .to(card, {
                        y: "110vh",
                        rotateX: -18,
                        scale: 0.85,
                        opacity: 0,
                        filter: "blur(8px)",
                        duration: 1.0,
                        ease: "power2.in"
                    }, 3.8);
                } else if (idx === 4) {
                    // Enters from above and locks center
                    gsap.set(card, { y: "-110vh", rotateX: 18, opacity: 0, scale: 0.85, filter: "blur(8px)" });
                    catTl.to(card, {
                        y: 0,
                        rotateX: 0,
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 1.0,
                        ease: "power2.out",
                        onStart: () => updateVertIndicator(4)
                    }, 3.8);
                }
            });
        }
    });

    // MOBILE CAMERA CHOREOGRAPHY (<= 768px, tested 320px, 360px, 390px, 430px)
    mm.add("(max-width: 768px)", () => {
        const mobileFilmTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#cameraScene",
                start: "top top",
                end: "+=220%",
                scrub: 0.6,
                pin: true,
                anticipatePin: 1
            }
        });

        gsap.set("#shot01", { opacity: 1, zIndex: 1 });
        gsap.set(["#shot02", "#shot03", "#shot04", "#shot05", "#shot06", "#shot07"], { opacity: 0 });

        mobileFilmTl
            .to("#shot01", { opacity: 0, duration: 0.6 }, 0.4)
            .to("#shot02", { opacity: 1, duration: 0.6 }, 0.4)
            .to("#shot02", { opacity: 0, duration: 0.6 }, 1.0)
            .to("#shot03", { opacity: 1, duration: 0.6 }, 1.0)
            .to("#shot03", { opacity: 0, duration: 0.6 }, 1.6)
            .to("#shot04", { opacity: 1, duration: 0.6 }, 1.6)
            .to("#shot04", { opacity: 0, duration: 0.6 }, 2.2)
            .to("#shot05", { opacity: 1, duration: 0.6 }, 2.2)
            .to("#shot05", { opacity: 0, duration: 0.6 }, 2.8)
            .to("#shot06", { opacity: 1, duration: 0.6 }, 2.8)
            .to("#shot06", { opacity: 0, duration: 0.6 }, 3.4)
            .to("#shot07", { opacity: 1, duration: 0.6 }, 3.4);

        // Mobile Category Carousel
        const catCards = gsap.utils.toArray('.cat-vert-card');
        if (catCards.length > 0) {
            const mobileCatTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#categoriesSection",
                    start: "top top",
                    end: "+=200%",
                    pin: true,
                    scrub: 0.6,
                    anticipatePin: 1
                }
            });

            catCards.forEach((card, i) => {
                if (i === 0) {
                    gsap.set(card, { opacity: 1, scale: 1 });
                    mobileCatTl.to(card, { opacity: 0, scale: 0.85, duration: 0.6 }, 0.4);
                } else {
                    gsap.set(card, { opacity: 0, scale: 0.85 });
                    mobileCatTl.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        onStart: () => updateVertIndicator(i)
                    }, i * 0.5)
                    .to(card, { opacity: 0, scale: 0.85, duration: 0.5 }, (i * 0.5) + 0.5);
                }
            });
        }
    });

    function updateVertIndicator(index) {
        const dots = document.querySelectorAll('.vert-dot');
        const cards = document.querySelectorAll('.cat-vert-card');
        dots.forEach((dot, idx) => dot.classList.toggle('active', idx === index));
        cards.forEach((card, idx) => card.classList.toggle('is-active', idx === index));
    }

    // Category click handler to scroll to collection & set tab
    document.querySelectorAll('.btn-vert-explore, .footer-cat-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filterCat = btn.dataset.filter;
            if (!filterCat) return;

            const target = document.getElementById('catalogSection');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }

            setTimeout(() => {
                setCategoryTab(filterCat);
            }, 400);
        });
    });

    // =========================================================================
    // 02. DYNAMIC COMMERCE INGESTION & EDITORIAL SHOWROOM
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
        const t = product.title.toLowerCase();
        if (t.includes('actif') && t.includes('5k')) return '/assets/actif5_isolated.png';
        if (t.includes('actif') && t.includes('650')) return '/assets/feat_actif650.png';
        if (t.includes('perwash') && t.includes('5 k')) return '/assets/cat_laundry.png';
        if (t.includes('soft') && t.includes('5k')) return '/assets/cat_softener.png';
        if (t.includes('germol') && t.includes('5k')) return '/assets/cat_surfaces.png';
        if (t.includes('hand') && t.includes('spring') && t.includes('1.5k')) return '/assets/cat_soaps.png';

        return (product.images && product.images[0]) ? product.images[0].src : '/assets/logo.png';
    }

    function extractVolume(title) {
        const match = title.match(/(\d+(?:\.\d+)?\s*(?:KG|K|GM|Gram|ML|k|gm|ml))/i);
        return match ? match[1].toUpperCase() : 'STANDARD';
    }

    function renderShowroomProducts() {
        const grid = document.getElementById('showroomGrid');
        const countIndicator = document.getElementById('visibleItemsCount');
        const expandBtnRow = document.getElementById('catalogExpandRow');
        const expandBtnText = document.getElementById('expandCatalogText');
        if (!grid) return;

        const searchVal = document.getElementById('showroomSearchInput')?.value.trim().toLowerCase() || '';

        let filtered = allProductsData.filter(p => {
            const cat = categorizeProduct(p.title);
            const title = isRtl ? (p.translations?.ar?.title || p.title) : p.title;
            const matchCat = currentCategoryFilter === 'ALL' || cat === currentCategoryFilter;
            const matchSearch = searchVal === '' || title.toLowerCase().includes(searchVal) || cat.toLowerCase().includes(searchVal);
            return matchCat && matchSearch;
        });

        const displayLimit = (currentCategoryFilter === 'ALL' && !isCatalogExpanded && searchVal === '') ? 6 : filtered.length;
        const toDisplay = filtered.slice(0, displayLimit);

        if (countIndicator) countIndicator.innerText = filtered.length;

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
                    <button class="btn-vert-explore" onclick="window.resetShowroomFilters()">${isRtl ? 'إعادة ضبط البحث' : 'Reset Search'}</button>
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

        gsap.fromTo(".showroom-card", 
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" }
        );

        bindAddToCartTriggers();
    }

    function initShowroomControls() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.dataset.cat;
                setCategoryTab(cat);
            });
        });

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
    // 03. PARABOLIC PRODUCT-TO-CART FLIGHT ANIMATION (FLIP / GSAP)
    // =========================================================================
    function bindAddToCartTriggers() {
        document.querySelectorAll('.btn-card-add, .btn-film-add-cart').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();

                const id = btn.dataset.id;
                const title = btn.dataset.title;
                const price = btn.dataset.price;
                const img = btn.dataset.img;
                const imgElemId = btn.dataset.imgElement;

                const sourceImg = document.getElementById(imgElemId) || btn.closest('.showroom-card')?.querySelector('.card-product-img') || document.querySelector('.hero-bottle-img');
                const targetCart = document.getElementById('floatingCartBtn');

                if (sourceImg && targetCart) {
                    animateProductFlight(sourceImg, targetCart, () => {
                        addToCart({ id, title, price, img });
                    });
                } else {
                    addToCart({ id, title, price, img });
                }

                // Tactile feedback
                const textSpan = btn.querySelector('span') || btn;
                const origText = textSpan.innerText;
                textSpan.innerText = isRtl ? '✓ أضيف للسلة' : '✓ Added to Cart';
                btn.style.background = 'var(--brand-teal-bright)';
                btn.style.color = 'var(--bg-dark)';

                setTimeout(() => {
                    textSpan.innerText = origText;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 1400);
            };
        });
    }

    function animateProductFlight(sourceImg, targetCart, onArrive) {
        const startRect = sourceImg.getBoundingClientRect();
        const endRect = targetCart.getBoundingClientRect();

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

        gsap.timeline({
            onComplete: () => {
                ghost.remove();

                // Target Cart elastic reaction bounce
                gsap.timeline()
                    .to(targetCart, { scale: 1.35, duration: 0.12, ease: "power2.out" })
                    .to(targetCart, { scale: 1.0, duration: 0.35, ease: "elastic.out(1.2, 0.4)" });

                onArrive();

                const badge = document.getElementById('cartBadge');
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
    // 04. CART DRAWER & WHATSAPP CHECKOUT
    // =========================================================================
    const floatingCartBtn = document.getElementById('floatingCartBtn');
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
        if (cartBadge) cartBadge.innerText = totalItems;
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

        const phone = "201000000000";
        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    });

});
