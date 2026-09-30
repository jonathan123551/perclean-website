document.addEventListener("DOMContentLoaded", () => {
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Text Splitter for MESS
    const messText = document.querySelector('.text-mess');
    if (messText) {
        const text = messText.textContent;
        messText.innerHTML = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('char');
            messText.appendChild(span);
        });
    }

    // 2. Hero Cinematic Scroll Animation
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-cinematic",
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1,
            // markers: true
        }
    });

    // Animate Logo dropping in and MESS shattering
    heroTl
    .to(".char", {
        y: (i) => (Math.random() - 0.5) * 400,
        x: (i) => (Math.random() - 0.5) * 400,
        rotation: (i) => (Math.random() - 0.5) * 90,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        stagger: 0.1,
        ease: "power2.inOut"
    }, 0)
    .to(".subtitle-dirty", {
        opacity: 0,
        y: 50,
        duration: 0.5
    }, 0)
    // Logo drops in
    .to(".brand-catalyst", {
        marginTop: 0,
        scale: 1,
        duration: 1.5,
        ease: "bounce.out"
    }, 0.5)
    // Wipe to clean scene
    .to(".scene-clean", {
        clipPath: "circle(150% at 50% 50%)",
        duration: 2,
        ease: "power2.inOut"
    }, 1.5)
    // Logo flies away or fades out
    .to(".brand-catalyst", {
        marginTop: "-20vh",
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power2.in"
    }, 2.5)
    // Product comes in to replace it
    .to(".product-hero", {
        marginTop: -20,
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.7)"
    }, 3);


    // 3. Interactive Stage Logic
    const catItems = document.querySelectorAll('.cat-item');
    const stageContents = document.querySelectorAll('.stage-content');
    const stageBg = document.querySelector('.stage-bg');

    // Color mapping for backgrounds based on category
    const bgColors = {
        'kitchen': 'radial-gradient(circle at top right, #e8f7f8, #f0f0f0)',
        'laundry': 'radial-gradient(circle at top right, #f0e8f8, #f4f0f8)',
        'softener':  'radial-gradient(circle at top right, #f8f0e8, #f8f4f0)',
        'surfaces':'radial-gradient(circle at top right, #e8f8f0, #f0f8f4)'
    };

    catItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('active')) return;

            const targetId = item.getAttribute('data-target');
            
            // Update Menu
            catItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Hide old content
            const activeContent = document.querySelector('.stage-content.active');
            gsap.to(activeContent, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: () => {
                    activeContent.classList.remove('active');
                    activeContent.style.pointerEvents = 'none';
                    activeContent.style.position = 'absolute';

                    // Show new content
                    const newContent = document.getElementById(`stage-${targetId}`);
                    newContent.classList.add('active');
                    newContent.style.pointerEvents = 'auto';
                    newContent.style.position = 'relative';

                    // Animate background color
                    const isRtl = document.documentElement.dir === 'rtl';
                    let newBg = bgColors[targetId];
                    if (isRtl) {
                        newBg = newBg.replace('top right', 'top left');
                    }
                    gsap.to(stageBg, {
                        background: newBg,
                        duration: 0.5
                    });

                    // Animate new content elements
                    const xOffset = isRtl ? 30 : -30;
                    gsap.fromTo(newContent.querySelector('.stage-info'), 
                        { opacity: 0, x: xOffset },
                        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
                    );

                    gsap.fromTo(newContent.querySelector('.stage-product img'),
                        { opacity: 0, scale: 0.8, rotation: -10 },
                        { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: "back.out(1.7)" }
                    );
                }
            });
        });
    });

    // 4. Mobile Menu Toggle
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
                navLinks.style.background = 'rgba(15, 12, 8, 0.95)';
                navLinks.style.padding = '1rem';
                navLinks.style.gap = '1rem';
                navLinks.querySelectorAll('a').forEach(a => {
                    a.style.margin = '10px 0';
                });
            }
        });
    }

    // 5. Cart and WhatsApp Ordering Logic
    let cart = [];
    const isRtl = document.documentElement.dir === 'rtl';

    // Override the inline onclick alerts generated by the catalog script
    document.querySelectorAll('.btn-add-cart, .btn-primary').forEach(button => {
        // Remove existing onclick
        button.removeAttribute('onclick');
        
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card') || e.target.closest('.stage-info');
            if (!card) return;
            
            let title = card.querySelector('.card-title') ? card.querySelector('.card-title').innerText : card.querySelector('h3').innerText;
            let price = card.querySelector('.card-price') ? card.querySelector('.card-price').innerText : card.querySelector('.price').innerText;
            
            cart.push({ title, price });
            alert(isRtl ? `تمت الإضافة للسلة: ${title}` : `Added to cart: ${title}`);
            updateCartIcon();
        });
    });

    function updateCartIcon() {
        document.querySelectorAll('.cart-link').forEach(link => {
            // Update cart visually (simple counter)
            let badge = link.querySelector('.cart-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge';
                badge.style.cssText = 'background: #0c7b8c; color: white; border-radius: 50%; padding: 2px 6px; font-size: 12px; margin-left: 5px;';
                link.appendChild(badge);
            }
            badge.innerText = cart.length;
        });
    }

    // Checkout via WhatsApp
    document.querySelectorAll('.cart-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (cart.length === 0) {
                alert(isRtl ? 'السلة فارغة' : 'Your cart is empty');
                return;
            }
            
            let orderText = isRtl ? "مرحباً، أود طلب المنتجات التالية:\n\n" : "Hello, I would like to order the following items:\n\n";
            cart.forEach((item, index) => {
                orderText += `${index + 1}. ${item.title} - ${item.price}\n`;
            });
            
            const whatsappNumber = "+201000000000"; // Replace with actual client number if available
            const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
            window.open(waUrl, '_blank');
            
            // Clear cart
            cart = [];
            updateCartIcon();
        });
    });

});
