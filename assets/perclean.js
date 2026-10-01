
document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    // 1. CINEMATIC INTRO
    mm.add("(min-width: 1px)", () => {
        const isMobile = window.innerWidth <= 768;
        
        let introTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#cinematic-intro",
                start: "top top",
                end: isMobile ? "+=300%" : "+=400%",
                pin: true,
                scrub: 1
            }
        });

        // Split text for mess
        const messHeadline = document.querySelector('.mess-headline');
        if (messHeadline) {
            const text = messHeadline.innerText;
            messHeadline.innerHTML = '';
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.innerText = char;
                span.style.display = 'inline-block';
                messHeadline.appendChild(span);
            });
        }

        introTl
            // Mess chaos
            .to('.mess-headline span', {
                y: () => (Math.random() - 0.5) * 300,
                x: () => (Math.random() - 0.5) * 300,
                rotation: () => (Math.random() - 0.5) * 90,
                opacity: 0,
                scale: 2,
                filter: "blur(10px)",
                duration: 1,
                stagger: 0.05,
                ease: "power2.inOut"
            }, 0)
            .to('.mess-sub', { opacity: 0, y: 30, duration: 0.5 }, 0)
            
            // Logo enters
            .to('.hero-center-logo', { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "expo.out" }, 0.5)
            
            // Clean Wipe
            .to('.clean-layer', { clipPath: 'circle(150% at 50% 50%)', duration: 2, ease: "power2.inOut" }, 1.5)
            
            // Logo leaves
            .to('.hero-center-logo', { opacity: 0, scale: 0.8, y: -100, duration: 1, ease: "power2.in" }, 2.5)
            
            // Product Reveal
            .fromTo('.hero-product-image', 
                { y: '20vh', opacity: 0, scale: 0.8 }, 
                { y: '0vh', opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.2)" }, 
            3)
            .fromTo('.hero-product-shadow', 
                { opacity: 0, scale: 0.5 }, 
                { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, 
            3)
            .fromTo('.hero-typography',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            3.2);
            
        // Nav blend mode fix during scroll (from dark to light)
        ScrollTrigger.create({
            trigger: "#cinematic-intro",
            start: "top top",
            end: "+=400%",
            onUpdate: (self) => {
                const nav = document.querySelector('.main-nav');
                if (self.progress > 0.4) {
                    nav.style.mixBlendMode = 'normal';
                    nav.style.color = '#111';
                } else {
                    nav.style.mixBlendMode = 'difference';
                    nav.style.color = 'white';
                }
            }
        });
    });

    // 2. CATEGORY SHOWCASE (Cinematic Scroll)
    mm.add("(min-width: 1025px)", () => {
        const scenes = gsap.utils.toArray('.cat-scene');
        if (scenes.length === 0) return;
        
        // Make all visible for animation
        scenes.forEach(s => s.style.visibility = 'visible');

        let catTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#category-showcase",
                start: "top top",
                end: `+=${scenes.length * 100}%`,
                pin: true,
                scrub: 1
            }
        });

        scenes.forEach((scene, i) => {
            const visual = scene.querySelector('.cat-visual');
            const typography = scene.querySelector('.cat-typography');

            // Set initial states for upcoming scenes
            if (i !== 0) {
                gsap.set(scene, { yPercent: 100 });
                gsap.set(visual, { scale: 0.8, opacity: 0 });
                gsap.set(typography, { y: 100, opacity: 0 });
            }

            // Animate IN
            if (i !== 0) {
                catTl.to(scene, { yPercent: 0, duration: 1, ease: "none" })
                     .to(visual, { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5")
                     .to(typography, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5");
            }

            // Pause for reading
            catTl.to({}, { duration: 0.5 });

            // Animate OUT
            if (i !== scenes.length - 1) {
                catTl.to(visual, { scale: 1.1, opacity: 0, duration: 0.8, ease: "power2.in" })
                     .to(typography, { y: -100, opacity: 0, duration: 0.8, ease: "power2.in" }, "<")
                     .to(scene, { yPercent: -50, opacity: 0, duration: 1, ease: "none" }, "<");
            }
        });
    });

    // Mobile fallback for categories (simple scroll, no pinning complexity)
    mm.add("(max-width: 1024px)", () => {
        const scenes = gsap.utils.toArray('.cat-scene');
        scenes.forEach(scene => {
            scene.style.position = 'relative';
            scene.style.height = 'auto';
            scene.style.padding = '4rem 0';
            scene.style.visibility = 'visible';
            
            const visual = scene.querySelector('.cat-visual');
            const typography = scene.querySelector('.cat-typography');
            
            gsap.fromTo(visual, 
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 1, ease: "power2.out", scrollTrigger: { trigger: scene, start: "top 70%" } }
            );
            
            gsap.fromTo(typography,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: scene, start: "top 60%" } }
            );
        });
        
        document.querySelector('#category-showcase').style.height = 'auto';
    });

    // 3. CART FLIGHT & LOGIC
    let cart = [];
    const isRtl = document.documentElement.dir === 'rtl';

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const title = btn.getAttribute('data-title');
            const price = btn.getAttribute('data-price');
            cart.push({ title, price });

            // Flight animation
            const container = btn.closest('.cat-scene') || btn.closest('.catalog-product');
            const img = container.querySelector('img');
            const cartLink = document.querySelector('.cart-link');

            if (img && cartLink) {
                const imgRect = img.getBoundingClientRect();
                const cartRect = cartLink.getBoundingClientRect();
                
                const clone = img.cloneNode(true);
                clone.style.position = 'fixed';
                clone.style.left = imgRect.left + 'px';
                clone.style.top = imgRect.top + 'px';
                clone.style.width = imgRect.width + 'px';
                clone.style.height = imgRect.height + 'px';
                clone.style.zIndex = 9999;
                clone.style.pointerEvents = 'none';
                clone.style.margin = '0';
                document.body.appendChild(clone);

                gsap.to(clone, {
                    x: cartRect.left - imgRect.left + (cartRect.width/2) - (imgRect.width/2),
                    ease: "power2.out",
                    duration: 0.7
                });
                
                gsap.to(clone, {
                    y: cartRect.top - imgRect.top,
                    scale: 0.1,
                    opacity: 0.2,
                    ease: "power2.in",
                    duration: 0.7,
                    onComplete: () => {
                        clone.remove();
                        updateCartIcon();
                        gsap.fromTo(cartLink, 
                            { scale: 0.8, y: 2 }, 
                            { scale: 1, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" }
                        );
                        const badge = cartLink.querySelector('.cart-badge');
                        if (badge) {
                            gsap.fromTo(badge, { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(2)" });
                        }
                    }
                });
            } else {
                updateCartIcon();
            }
        });
    });

    function updateCartIcon() {
        document.querySelectorAll('.cart-badge').forEach(badge => {
            badge.style.display = cart.length > 0 ? 'flex' : 'none';
            badge.innerText = cart.length;
        });
    }

    // Checkout via WhatsApp
    document.querySelectorAll('.cart-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (cart.length === 0) return;
            
            let orderText = isRtl ? "مرحباً، أود طلب المنتجات التالية:\n\n" : "Hello, I would like to order the following items:\n\n";
            cart.forEach((item, index) => {
                orderText += `${index + 1}. ${item.title} - ${item.price}\n`;
            });
            
            const whatsappNumber = "+201000000000"; 
            const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
            window.open(waUrl, '_blank');
            
            cart = [];
            updateCartIcon();
        });
    });

});

    // Shop All Toggle
    const btnShopAll = document.getElementById('btn-shop-all');
    if (btnShopAll) {
        btnShopAll.addEventListener('click', () => {
            document.querySelectorAll('.hidden-product').forEach(p => {
                p.style.display = 'flex';
                gsap.fromTo(p, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
            });
            btnShopAll.style.display = 'none';
        });
    }

