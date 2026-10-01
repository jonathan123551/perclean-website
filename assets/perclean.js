/**
 * PER CLEAN — UNIFIED LUXURY BRAND CONTROLLER
 * Zero AI Tropes. Pure Physical Transitions, 3D Spatial Continuum, Parabolic Flight & Full RTL Support.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP Plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    const isRtl = document.documentElement.dir === 'rtl' || document.body.classList.contains('rtl-mode');
    let allProducts = [];
    let cart = [];
    let isArchiveOpen = false;
    let activeCategory = 'ALL';

    // =========================================================================
    // 01. HEADER ADAPTIVE THEME ON SCROLL
    // =========================================================================
    const siteHeader = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        const filmSection = document.getElementById('brandFilm');
        const filmHeight = filmSection ? filmSection.offsetHeight : 800;

        if (window.scrollY > filmHeight * 0.7) {
            siteHeader?.classList.remove('scrolled-dark');
            siteHeader?.classList.add('scrolled-light');
        } else if (window.scrollY > 40) {
            siteHeader?.classList.remove('scrolled-light');
            siteHeader?.classList.add('scrolled-dark');
        } else {
            siteHeader?.classList.remove('scrolled-dark', 'scrolled-light');
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
    // 02. GSAP SCROLL-DIRECTED FILM & 3D CONTINUUM
    // =========================================================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const mm = gsap.matchMedia();

        // DESKTOP CHOREOGRAPHY (>= 769px)
        mm.add("(min-width: 769px)", () => {
            
            // --- ACT I: THE BRAND FILM TIMELINE ---
            const filmTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#brandFilm",
                    start: "top top",
                    end: "+=320%",
                    pin: true,
                    scrub: 0.7,
                    anticipatePin: 1
                }
            });

            // Initial states
            gsap.set("#layerMess", { opacity: 1, scale: 1 });
            gsap.set("#layerCatalyst", { opacity: 0, scale: 1.15, filter: "blur(8px)" });
            gsap.set("#layerVortex", { opacity: 0, scale: 1.25, filter: "blur(10px)" });
            gsap.set("#layerClean", { opacity: 0, scale: 0.94, filter: "blur(6px)" });

            filmTl
                // Moment 01 -> Moment 02: Surfactant Foam Surge cuts through Mess
                .to("#layerMess .film-bg-media", { scale: 1.15, filter: "brightness(0.4) contrast(1.2)", duration: 1.2 }, 0)
                .to("#layerMess .film-text-wrap", { opacity: 0, y: -60, filter: "blur(8px)", duration: 0.8 }, 0.3)
                .to("#filmScrollHint", { opacity: 0, duration: 0.3 }, 0)
                
                .to("#layerCatalyst", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" }, 0.7)
                .to("#layerMess", { opacity: 0, duration: 0.4 }, 1.3)

                // Moment 02 -> Moment 03: Per Clean Water Vortex & Logo Burst
                .to("#layerCatalyst .film-bg-media", { scale: 1.12, duration: 1.0 }, 1.6)
                .to("#layerCatalyst .film-text-wrap", { opacity: 0, y: -50, duration: 0.6 }, 1.8)

                .to("#layerVortex", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "back.out(1.1)" }, 2.0)
                .fromTo(".vortex-logo-img", 
                    { scale: 0.4, rotation: isRtl ? 15 : -15 }, 
                    { scale: 1, rotation: 0, duration: 1.0, ease: "back.out(2)" }, 
                    2.1
                )
                .to("#layerCatalyst", { opacity: 0, duration: 0.4 }, 2.5)

                // Moment 03 -> Moment 04: The Luminous Clean Home & Hero Product Reveal
                .to("#layerVortex", { opacity: 0, scale: 0.85, filter: "blur(10px)", duration: 0.8 }, 3.0)
                .to("#layerClean", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" }, 3.2)
                .fromTo("#heroActifBottle",
                    { opacity: 0, y: 70, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
                    3.5
                );

            // --- ACT II: THE 5 DISCIPLINES SPATIAL 3D CONTINUUM ---
            const disciplineItems = gsap.utils.toArray('.discipline-spatial-item');
            if (disciplineItems.length > 0) {
                const discTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#disciplines",
                        start: "top top",
                        end: "+=300%",
                        pin: true,
                        scrub: 0.7,
                        anticipatePin: 1
                    }
                });

                // Discipline 0 starts active, then exits forward/up
                // Discipline 1 enters from below, exits down
                // Discipline 2 enters from above, exits up
                // Discipline 3 enters from below, exits down
                // Discipline 4 enters from above and anchors cleanly
                disciplineItems.forEach((item, idx) => {
                    if (idx === 0) {
                        gsap.set(item, { y: 0, rotateX: 0, opacity: 1, scale: 1 });
                        discTl.to(item, {
                            y: "-100vh",
                            rotateX: 16,
                            scale: 0.85,
                            opacity: 0,
                            filter: "blur(8px)",
                            duration: 1.0,
                            ease: "power2.in"
                        }, 0.8);
                    } else if (idx === 1) {
                        gsap.set(item, { y: "100vh", rotateX: -16, opacity: 0, scale: 0.85, filter: "blur(8px)" });
                        discTl.to(item, {
                            y: 0,
                            rotateX: 0,
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                            duration: 1.0,
                            ease: "power2.out",
                            onStart: () => updateDisciplineTracker(1)
                        }, 0.8)
                        .to(item, {
                            y: "100vh",
                            rotateX: -16,
                            scale: 0.85,
                            opacity: 0,
                            filter: "blur(8px)",
                            duration: 1.0,
                            ease: "power2.in"
                        }, 1.8);
                    } else if (idx === 2) {
                        gsap.set(item, { y: "-100vh", rotateX: 16, opacity: 0, scale: 0.85, filter: "blur(8px)" });
                        discTl.to(item, {
                            y: 0,
                            rotateX: 0,
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                            duration: 1.0,
                            ease: "power2.out",
                            onStart: () => updateDisciplineTracker(2)
                        }, 1.8)
                        .to(item, {
                            y: "-100vh",
                            rotateX: 16,
                            scale: 0.85,
                            opacity: 0,
                            filter: "blur(8px)",
                            duration: 1.0,
                            ease: "power2.in"
                        }, 2.8);
                    } else if (idx === 3) {
                        gsap.set(item, { y: "100vh", rotateX: -16, opacity: 0, scale: 0.85, filter: "blur(8px)" });
                        discTl.to(item, {
                            y: 0,
                            rotateX: 0,
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                            duration: 1.0,
                            ease: "power2.out",
                            onStart: () => updateDisciplineTracker(3)
                        }, 2.8)
                        .to(item, {
                            y: "100vh",
                            rotateX: -16,
                            scale: 0.85,
                            opacity: 0,
                            filter: "blur(8px)",
                            duration: 1.0,
                            ease: "power2.in"
                        }, 3.8);
                    } else if (idx === 4) {
                        gsap.set(item, { y: "-100vh", rotateX: 16, opacity: 0, scale: 0.85, filter: "blur(8px)" });
                        discTl.to(item, {
                            y: 0,
                            rotateX: 0,
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                            duration: 1.0,
                            ease: "power2.out",
                            onStart: () => updateDisciplineTracker(4)
                        }, 3.8);
                    }
                });
            }
        });

        // MOBILE DEDICATED CHOREOGRAPHY (<= 768px)
        // No heavy pins, calibrated timeline for touch devices.
        mm.add("(max-width: 768px)", () => {
            const mobileFilmTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#brandFilm",
                    start: "top top",
                    end: "+=180%",
                    pin: true,
                    scrub: 0.5,
                    anticipatePin: 1
                }
            });

            gsap.set("#layerMess", { opacity: 1 });
            gsap.set(["#layerCatalyst", "#layerVortex", "#layerClean"], { opacity: 0 });

            mobileFilmTl
                .to("#layerMess", { opacity: 0, duration: 0.5 }, 0.5)
                .to("#layerCatalyst", { opacity: 1, duration: 0.5 }, 0.5)
                .to("#layerCatalyst", { opacity: 0, duration: 0.4 }, 1.0)
                .to("#layerVortex", { opacity: 1, duration: 0.5 }, 1.0)
                .to("#layerVortex", { opacity: 0, duration: 0.4 }, 1.5)
                .to("#layerClean", { opacity: 1, duration: 0.5 }, 1.5);
        });
    }

    function updateDisciplineTracker(index) {
        document.querySelectorAll('.discipline-dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });
    }

    // Discipline Explore Button Click (Scrolls down to Showroom and filters)
    document.querySelectorAll('.btn-discipline-explore').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filterCat = btn.dataset.filter;
            filterShowroom(filterCat);
            document.getElementById('showroom')?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // =========================================================================
    // 03. CURATED SHOWROOM FILTERING
    // =========================================================================
    const showroomPills = document.querySelectorAll('.cat-pill-btn');
    showroomPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const cat = pill.dataset.cat;
            filterShowroom(cat);
        });
    });

    function filterShowroom(category) {
        activeCategory = category;
        showroomPills.forEach(p => p.classList.toggle('active', p.dataset.cat === category));

        const cards = document.querySelectorAll('.product-pedestal-card');
        cards.forEach(card => {
            const cardCat = card.dataset.category;
            if (category === 'ALL' || cardCat === category) {
                card.style.display = 'flex';
                gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35 });
            } else {
                card.style.display = 'none';
            }
        });

        // Filter archive as well if expanded
        renderArchiveProducts();
    }

    // =========================================================================
    // 04. DATA.JSON INGESTION & EXPANDABLE 46-PRODUCT ARCHIVE
    // =========================================================================
    fetch('/data.json')
        .then(res => res.text())
        .then(raw => {
            const cleaned = raw.charCodeAt(0) === 0xFEFF ? raw.slice(1) : raw;
            const data = JSON.parse(cleaned);
            allProducts = data.products || [];
            renderArchiveProducts();
        })
        .catch(err => console.error("Error loading complete product archive:", err));

    const btnToggleArchive = document.getElementById('btnToggleArchive');
    const archiveExpandedContent = document.getElementById('archiveExpandedContent');
    const archiveToggleText = document.getElementById('archiveToggleText');

    btnToggleArchive?.addEventListener('click', () => {
        isArchiveOpen = !isArchiveOpen;
        if (archiveExpandedContent) {
            archiveExpandedContent.style.display = isArchiveOpen ? 'block' : 'none';
        }
        if (archiveToggleText) {
            archiveToggleText.innerText = isArchiveOpen 
                ? (isRtl ? 'إخفاء الأرشيف الشامل' : 'Collapse Catalog Archive') 
                : (isRtl ? 'استكشف الأرشيف الشامل [ 46 تركيبة ]' : 'Explore Complete Catalog [ 46 Formulations ]');
        }
        if (isArchiveOpen) {
            archiveExpandedContent?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    const archiveSearchInput = document.getElementById('archiveSearchInput');
    archiveSearchInput?.addEventListener('input', () => {
        renderArchiveProducts();
    });

    function renderArchiveProducts() {
        const grid = document.getElementById('archiveProductGrid');
        if (!grid) return;

        const query = (archiveSearchInput?.value || '').toLowerCase().trim();
        const filtered = allProducts.filter(p => {
            const titleMatch = p.title.toLowerCase().includes(query);
            const cat = categorizeProduct(p.title);
            const catMatch = activeCategory === 'ALL' || cat === activeCategory;
            return titleMatch && catMatch;
        });

        const matchCountEl = document.getElementById('archiveMatchCount');
        if (matchCountEl) {
            matchCountEl.innerText = isRtl ? `عرض ${filtered.length} تركيبة` : `Showing ${filtered.length} formulations`;
        }

        grid.innerHTML = filtered.map(product => {
            const price = product.variants && product.variants[0] ? `${Math.round(product.variants[0].price)} DZD` : '450 DZD';
            const priceFormatted = isRtl ? price.replace('DZD', 'د.ج') : price;
            const img = (product.image && product.image.src) || (product.images && product.images[0] && product.images[0].src) || '/assets/actif5_isolated.png';

            return `
                <div class="archive-card">
                    <div class="archive-card-img-wrap">
                        <img src="${img}" alt="${escapeHtml(product.title)}" class="archive-card-img" loading="lazy">
                    </div>
                    <h4 class="archive-card-title">${escapeHtml(product.title)}</h4>
                    <div class="archive-card-footer">
                        <span class="archive-card-price">${priceFormatted}</span>
                        <button class="btn-archive-add" 
                            data-id="${product.id}" 
                            data-title="${escapeHtml(product.title)}" 
                            data-price="${priceFormatted}" 
                            data-img="${img}"
                            aria-label="Add to Bag">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        bindAddButtons();
    }

    function categorizeProduct(title) {
        const t = title.toLowerCase();
        if (t.includes('actif') || t.includes('grease') || t.includes('kitchen') || t.includes('mencopol') || t.includes('dish')) return 'Kitchen';
        if (t.includes('perwash') || t.includes('gel') || t.includes('bleach') || t.includes('laundry')) return 'Laundry';
        if (t.includes('soft') || t.includes('softener')) return 'Softener';
        if (t.includes('germol') || t.includes('disinfectant') || t.includes('toilet') || t.includes('sd')) return 'Disinfectant';
        if (t.includes('soap') || t.includes('hand')) return 'Hand Soap';
        return 'Kitchen';
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
    }

    // =========================================================================
    // 05. PARABOLIC PRODUCT-TO-BAG FLIGHT ANIMATION
    // =========================================================================
    function bindAddButtons() {
        document.querySelectorAll('.btn-add-to-bag, .btn-archive-add').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();

                const id = btn.dataset.id;
                const title = btn.dataset.title;
                const price = btn.dataset.price;
                const img = btn.dataset.img;
                const sourceId = btn.dataset.source;

                const sourceImg = (sourceId && document.getElementById(sourceId)) 
                    || btn.closest('.product-pedestal-card')?.querySelector('.pedestal-bottle-img')
                    || btn.closest('.archive-card')?.querySelector('.archive-card-img')
                    || document.getElementById('heroActifBottle');

                const targetCart = document.getElementById('floatingCartBtn');

                if (sourceImg && targetCart) {
                    launchProductFlight(sourceImg, targetCart, () => {
                        addToBag({ id, title, price, img });
                    });
                } else {
                    addToBag({ id, title, price, img });
                }

                // Tactile button confirmation
                const textSpan = btn.querySelector('span');
                if (textSpan) {
                    const original = textSpan.innerText;
                    textSpan.innerText = isRtl ? '✓ أضيف' : '✓ Added';
                    btn.style.background = 'var(--brand-blue)';
                    btn.style.color = '#ffffff';
                    setTimeout(() => {
                        textSpan.innerText = original;
                        btn.style.background = '';
                        btn.style.color = '';
                    }, 1200);
                }
            };
        });
    }

    // Call initially for static flagship cards
    bindAddButtons();

    function launchProductFlight(sourceElem, targetCart, onArrive) {
        const startRect = sourceElem.getBoundingClientRect();
        const endRect = targetCart.getBoundingClientRect();

        const ghost = document.createElement('img');
        ghost.src = sourceElem.src;
        ghost.className = 'flying-product-ghost';
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

                // Target Bag Elastic Pulse
                gsap.timeline()
                    .to(targetCart, { scale: 1.35, duration: 0.1, ease: "power2.out" })
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
            scale: 0.15,
            rotation: isRtl ? -18 : 18,
            opacity: 0.85,
            x: deltaX,
            y: deltaY,
            duration: 0.55,
            ease: "power2.in"
        });
    }

    // =========================================================================
    // 06. CART DRAWER & WHATSAPP DIRECT CHECKOUT
    // =========================================================================
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    const cartDrawerBackdrop = document.getElementById('cartDrawerBackdrop');
    const btnCloseDrawer = document.getElementById('btnCloseDrawer');
    const cartBadge = document.getElementById('cartBadge');
    const drawerItemCount = document.getElementById('drawerItemCount');
    const cartEmptyMessage = document.getElementById('cartEmptyMessage');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const drawerFooter = document.getElementById('drawerFooter');
    const drawerSubtotal = document.getElementById('drawerSubtotal');
    const btnWhatsappOrder = document.getElementById('btnWhatsappOrder');

    function openBag() {
        cartDrawerBackdrop?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeBag() {
        cartDrawerBackdrop?.classList.remove('active');
        document.body.style.overflow = '';
    }

    floatingCartBtn?.addEventListener('click', openBag);
    btnCloseDrawer?.addEventListener('click', closeBag);
    cartDrawerBackdrop?.addEventListener('click', (e) => {
        if (e.target === cartDrawerBackdrop) closeBag();
    });

    function addToBag(item) {
        const existing = cart.find(i => i.id === item.id);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ ...item, qty: 1 });
        }
        updateBagUI();
    }

    function updateBagUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        if (cartBadge) cartBadge.innerText = totalItems;
        if (drawerItemCount) {
            drawerItemCount.innerText = isRtl ? `${totalItems} منتجات` : `${totalItems} Items`;
        }

        if (cart.length === 0) {
            if (cartEmptyMessage) cartEmptyMessage.style.display = 'flex';
            if (cartItemsContainer) cartItemsContainer.style.display = 'none';
            if (drawerFooter) drawerFooter.style.display = 'none';
            return;
        }

        if (cartEmptyMessage) cartEmptyMessage.style.display = 'none';
        if (cartItemsContainer) {
            cartItemsContainer.style.display = 'block';
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item-row" data-id="${item.id}">
                    <img src="${item.img}" alt="${escapeHtml(item.title)}" class="cart-item-thumbnail">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${escapeHtml(item.title)}</h4>
                        <span class="cart-item-price">${item.price}</span>
                    </div>
                    <div class="cart-item-actions">
                        <button class="qty-control-btn btn-qty-minus" data-id="${item.id}">-</button>
                        <span class="qty-display">${item.qty}</span>
                        <button class="qty-control-btn btn-qty-plus" data-id="${item.id}">+</button>
                    </div>
                </div>
            `).join('');

            // Bind +/- qty triggers
            cartItemsContainer.querySelectorAll('.btn-qty-minus').forEach(b => {
                b.onclick = () => {
                    const id = b.dataset.id;
                    const found = cart.find(i => i.id === id);
                    if (found) {
                        found.qty -= 1;
                        if (found.qty <= 0) {
                            cart = cart.filter(i => i.id !== id);
                        }
                        updateBagUI();
                    }
                };
            });

            cartItemsContainer.querySelectorAll('.btn-qty-plus').forEach(b => {
                b.onclick = () => {
                    const id = b.dataset.id;
                    const found = cart.find(i => i.id === id);
                    if (found) {
                        found.qty += 1;
                        updateBagUI();
                    }
                };
            });
        }

        // Calculate Subtotal
        const totalDzd = cart.reduce((sum, item) => {
            const numeric = parseInt((item.price || '').replace(/[^0-9]/g, '')) || 0;
            return sum + (numeric * item.qty);
        }, 0);

        if (drawerSubtotal) {
            drawerSubtotal.innerText = isRtl ? `${totalDzd.toLocaleString()} د.ج` : `${totalDzd.toLocaleString()} DZD`;
        }
        if (drawerFooter) drawerFooter.style.display = 'block';
    }

    // WhatsApp Checkout Dispatch
    btnWhatsappOrder?.addEventListener('click', () => {
        if (cart.length === 0) return;

        let message = isRtl 
            ? "مرحباً، أود تأكيد الطلب التالي من بير كلين:\n\n"
            : "Hello, I would like to place the following order from Per Clean:\n\n";

        let total = 0;
        cart.forEach((item, index) => {
            const numeric = parseInt((item.price || '').replace(/[^0-9]/g, '')) || 0;
            const lineTotal = numeric * item.qty;
            total += lineTotal;

            if (isRtl) {
                message += `${index + 1}. ${item.title} × ${item.qty} = ${lineTotal} د.ج\n`;
            } else {
                message += `${index + 1}. ${item.title} x ${item.qty} = ${lineTotal} DZD\n`;
            }
        });

        if (isRtl) {
            message += `\nالمجموع الكلي: ${total} د.ج\n`;
            message += "يرجى تأكيد التوصيل وبيانات الاستلام.";
        } else {
            message += `\nTotal Estimated: ${total} DZD\n`;
            message += "Please confirm availability and doorstep delivery details.";
        }

        const phone = "201000000000"; // Official Per Clean dispatch line
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    });

});
