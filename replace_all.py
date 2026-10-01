import re

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-width=1.0">
    <title>Per Clean - Premium Care</title>
    <link rel="stylesheet" href="/assets/perclean.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&display=swap" rel="stylesheet">
</head>
<body>

    <!-- Minimal Navigation -->
    <nav class="main-nav">
        <div class="nav-container">
            <div class="nav-left">
                <a href="#cinematic-intro" class="nav-logo">
                    <img src="/assets/logo.png" alt="Per Clean">
                </a>
            </div>
            
            <button class="menu-toggle" aria-label="Toggle Menu">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"/></svg>
            </button>

            <div class="nav-links">
                <a href="#category-showcase">Care Solutions</a>
                <a href="#shop">Collection</a>
                <a href="/ar/" class="lang-switch">عربي</a>
            </div>

            <div class="nav-right">
                <a href="#" class="cart-link" aria-label="Cart">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <span class="cart-badge" style="display:none;">0</span>
                </a>
            </div>
        </div>
    </nav>

    <!-- 01: The Cinematic Opening -->
    <section id="cinematic-intro">
        <!-- Layer 1: Mess -->
        <div class="intro-layer mess-layer">
            <div class="mess-noise"></div>
            <div class="mess-content">
                <h1 class="mess-headline">CHAOS.</h1>
                <p class="mess-sub">THE INEVITABLE STATE OF LIFE.</p>
            </div>
        </div>

        <!-- Layer 2: Transformation / Logo -->
        <div class="intro-layer brand-layer">
            <div class="water-effect"></div>
            <img src="/assets/logo.png" alt="Per Clean" class="hero-center-logo">
        </div>

        <!-- Layer 3: Clean -->
        <div class="intro-layer clean-layer">
            <div class="clean-gradient"></div>
        </div>

        <!-- Layer 4: Product Reveal -->
        <div class="intro-layer product-layer">
            <div class="hero-product-wrapper">
                <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/Actif5.jpg?v=1763982121" alt="Per Actif 5KG" class="hero-product-image">
                <div class="hero-product-shadow"></div>
            </div>
            <div class="hero-typography">
                <h2 class="clean-headline">PURITY.</h2>
                <p class="clean-sub">RESTORED TO PERFECTION.</p>
            </div>
        </div>
    </section>

    <!-- 02: Cinematic Category Experience -->
    <section id="category-showcase">
        
        <!-- Kitchen Scene -->
        <div class="cat-scene" id="scene-kitchen">
            <div class="cat-bg bg-kitchen"></div>
            <div class="cat-content-wrapper">
                <div class="cat-typography">
                    <div class="cat-label">01 // KITCHEN CARE</div>
                    <h2 class="cat-title">CUT THROUGH THE GREASE.</h2>
                    <p class="cat-desc">Heavy duty degreaser engineered for stoves, hoods, and tough stains.</p>
                    <div class="cat-product-meta">
                        <h3>Per Actif 5KG</h3>
                        <span class="cat-price">450.00 EGP</span>
                    </div>
                    <button class="btn-premium add-to-cart-btn" data-title="Per Actif 5KG" data-price="450.00 EGP">ADD TO CART</button>
                </div>
                <div class="cat-visual">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/Actif5.jpg?v=1763982121" alt="Per Actif" class="cat-product-img">
                    <div class="cat-shadow"></div>
                </div>
            </div>
        </div>

        <!-- Laundry Scene -->
        <div class="cat-scene" id="scene-laundry">
            <div class="cat-bg bg-laundry"></div>
            <div class="cat-content-wrapper">
                <div class="cat-typography">
                    <div class="cat-label">02 // LAUNDRY CARE</div>
                    <h2 class="cat-title">FIBER-DEEP PURITY.</h2>
                    <p class="cat-desc">Premium liquid detergent gel for automatic washing machines. Tough on stains, gentle on fabrics.</p>
                    <div class="cat-product-meta">
                        <h3>Perwash Gel 5KG</h3>
                        <span class="cat-price">410.00 EGP</span>
                    </div>
                    <button class="btn-premium add-to-cart-btn" data-title="Perwash Gel 5KG" data-price="410.00 EGP">ADD TO CART</button>
                </div>
                <div class="cat-visual">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/6C87C2BD-02AB-461B-BDDA-780DB8DEBA62.jpg?v=1784721867" alt="Perwash Gel" class="cat-product-img">
                    <div class="cat-shadow"></div>
                </div>
            </div>
        </div>

        <!-- Fabric Softener Scene -->
        <div class="cat-scene" id="scene-softener">
            <div class="cat-bg bg-softener"></div>
            <div class="cat-content-wrapper">
                <div class="cat-typography">
                    <div class="cat-label">03 // FABRIC CARE</div>
                    <h2 class="cat-title">THE TOUCH OF SOFTNESS.</h2>
                    <p class="cat-desc">Anti-static fabric softener infused with long-lasting premium fragrances.</p>
                    <div class="cat-product-meta">
                        <h3>Per Soft 5KG</h3>
                        <span class="cat-price">380.00 EGP</span>
                    </div>
                    <button class="btn-premium add-to-cart-btn" data-title="Per Soft 5KG" data-price="380.00 EGP">ADD TO CART</button>
                </div>
                <div class="cat-visual">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/IMG-4633.jpg?v=1761828559" alt="Per Soft" class="cat-product-img">
                    <div class="cat-shadow"></div>
                </div>
            </div>
        </div>

        <!-- Surfaces Scene -->
        <div class="cat-scene" id="scene-surfaces">
            <div class="cat-bg bg-surfaces"></div>
            <div class="cat-content-wrapper">
                <div class="cat-typography">
                    <div class="cat-label">04 // SURFACE DISINFECTANT</div>
                    <h2 class="cat-title">ABSOLUTE STERILITY.</h2>
                    <p class="cat-desc">Hard surface disinfectant liquid. Clinically proven to eliminate 99% of germs.</p>
                    <div class="cat-product-meta">
                        <h3>Germol 5KG</h3>
                        <span class="cat-price">870.00 EGP</span>
                    </div>
                    <button class="btn-premium add-to-cart-btn" data-title="Germol 5KG" data-price="870.00 EGP">ADD TO CART</button>
                </div>
                <div class="cat-visual">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/3DD3BB6C-75FE-472B-B1AC-3A6FFBDF35F5.jpg?v=1784721511" alt="Germol" class="cat-product-img">
                    <div class="cat-shadow"></div>
                </div>
            </div>
        </div>

    </section>

    <!-- 03: The Complete Collection (Shop) -->
    <section id="shop" class="collection-section">
        <div class="collection-header">
            <h2>THE COMPLETE COLLECTION</h2>
            <p>Uncompromising quality for every environment.</p>
        </div>
        
        <div class="catalog-grid">
            <!-- Products injected here in JS from the existing catalog data to keep HTML clean, 
                 OR we just keep the raw HTML grid to preserve SEO/Shopify structure. 
                 To follow instructions strictly, I'll preserve the full product HTML list but restyle the classes. -->
                 
            <div class="catalog-product">
                <div class="cp-image-wrap">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/ChatGPTImageDec19_2025_10_17_32AM.png?v=1766131869" alt="perfumed and disinfectant  Detergent for toilet flusher" loading="lazy">
                </div>
                <div class="cp-info">
                    <h4>Toilet Flusher Detergent 125g</h4>
                    <div class="cp-action">
                        <span class="cp-price">55.00 EGP</span>
                        <button class="btn-icon add-to-cart-btn" data-title="Toilet Flusher Detergent 125g" data-price="55.00 EGP">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="catalog-product">
                <div class="cp-image-wrap">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/Actif5.jpg?v=1763982121" alt="Per Actif 5KG" loading="lazy">
                </div>
                <div class="cp-info">
                    <h4>Per Actif 5KG</h4>
                    <div class="cp-action">
                        <span class="cp-price">450.00 EGP</span>
                        <button class="btn-icon add-to-cart-btn" data-title="Per Actif 5KG" data-price="450.00 EGP">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="catalog-product">
                <div class="cp-image-wrap">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/1C06BF29-BCAC-43EF-8938-ECC97D29B292.jpg?v=1784721432" alt="Hand washing liquid soap 1.5k" loading="lazy">
                </div>
                <div class="cp-info">
                    <h4>Hand Wash (Spring) 1.5k</h4>
                    <div class="cp-action">
                        <span class="cp-price">140.00 EGP</span>
                        <button class="btn-icon add-to-cart-btn" data-title="Hand Wash (Spring) 1.5k" data-price="140.00 EGP">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="catalog-product">
                <div class="cp-image-wrap">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/IMG-4633.jpg?v=1761828559" alt="Per soft 5KG" loading="lazy">
                </div>
                <div class="cp-info">
                    <h4>Per Soft 5KG</h4>
                    <div class="cp-action">
                        <span class="cp-price">380.00 EGP</span>
                        <button class="btn-icon add-to-cart-btn" data-title="Per Soft 5KG" data-price="380.00 EGP">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="catalog-product">
                <div class="cp-image-wrap">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/C11CA7CF-42E1-4ED3-B45D-DC4EFDF8E34D.jpg?v=1784132598" alt="Hard surfaces disinfectant" loading="lazy">
                </div>
                <div class="cp-info">
                    <h4>Surface Disinfectant 700g</h4>
                    <div class="cp-action">
                        <span class="cp-price">150.00 EGP</span>
                        <button class="btn-icon add-to-cart-btn" data-title="Surface Disinfectant 700g" data-price="150.00 EGP">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="catalog-product">
                <div class="cp-image-wrap">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/3DD3BB6C-75FE-472B-B1AC-3A6FFBDF35F5.jpg?v=1784721511" alt="Germol 5KG" loading="lazy">
                </div>
                <div class="cp-info">
                    <h4>Germol 5KG</h4>
                    <div class="cp-action">
                        <span class="cp-price">870.00 EGP</span>
                        <button class="btn-icon add-to-cart-btn" data-title="Germol 5KG" data-price="870.00 EGP">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="catalog-product">
                <div class="cp-image-wrap">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/AEE95EF3-AAA8-40DF-8004-C457503CF8FF.jpg?v=1752437946" alt="Perwash 5 k" loading="lazy">
                </div>
                <div class="cp-info">
                    <h4>Perwash Gel 5KG</h4>
                    <div class="cp-action">
                        <span class="cp-price">410.00 EGP</span>
                        <button class="btn-icon add-to-cart-btn" data-title="Perwash Gel 5KG" data-price="410.00 EGP">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="catalog-product">
                <div class="cp-image-wrap">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/2CF9170E-88BB-40D0-9B4D-5ACC01763B6A.jpg?v=1784721747" alt="Mencopol 5 k" loading="lazy">
                </div>
                <div class="cp-info">
                    <h4>Mencopol Dishwash 5KG</h4>
                    <div class="cp-action">
                        <span class="cp-price">240.00 EGP</span>
                        <button class="btn-icon add-to-cart-btn" data-title="Mencopol Dishwash 5KG" data-price="240.00 EGP">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="catalog-product">
                <div class="cp-image-wrap">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/FA1DB7CD-7B81-4902-9192-2F203AE33AEA.jpg?v=1752437609" alt="Perwash Ox bleach 5 k" loading="lazy">
                </div>
                <div class="cp-info">
                    <h4>Perwash Ox Bleach 5KG</h4>
                    <div class="cp-action">
                        <span class="cp-price">450.00 EGP</span>
                        <button class="btn-icon add-to-cart-btn" data-title="Perwash Ox Bleach 5KG" data-price="450.00 EGP">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="catalog-product">
                <div class="cp-image-wrap">
                    <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/7B63A88F-724F-4060-8EF6-A54E51F53869.jpg?v=1752401449" alt="Pershine 5 k" loading="lazy">
                </div>
                <div class="cp-info">
                    <h4>Pershine Glass 5KG</h4>
                    <div class="cp-action">
                        <span class="cp-price">150.00 EGP</span>
                        <button class="btn-icon add-to-cart-btn" data-title="Pershine Glass 5KG" data-price="150.00 EGP">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="footer-content">
            <img src="/assets/logo.png" alt="Per Clean" class="footer-logo">
            <p>&copy; 2026 Per Clean. All rights reserved.</p>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="/assets/perclean.js"></script>
</body>
</html>
"""

css_content = """
:root {
    --bg-dark: #070707;
    --bg-light: #f7f9fa;
    --color-brand: #0c7b8c;
    --color-brand-dark: #064b56;
    --text-dark: #111111;
    --text-light: #ffffff;
    --font-main: 'Montserrat', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-main);
    background-color: var(--bg-dark);
    color: var(--text-light);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
}

/* --- NAVIGATION --- */
.main-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 2rem 4rem;
    mix-blend-mode: difference;
    color: white;
    pointer-events: none;
}
.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1800px;
    margin: 0 auto;
    pointer-events: auto;
}
.nav-logo img {
    height: 32px;
}
.nav-links {
    display: flex;
    gap: 3rem;
}
.nav-links a {
    color: inherit;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    transition: opacity 0.3s;
}
.nav-links a:hover {
    opacity: 0.6;
}
.cart-link {
    position: relative;
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
}
.cart-badge {
    position: absolute;
    top: -8px;
    right: -10px;
    background: var(--color-brand);
    color: white;
    font-size: 0.7rem;
    font-weight: 900;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.menu-toggle {
    display: none;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
}

/* --- CINEMATIC INTRO --- */
#cinematic-intro {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.intro-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Mess Layer */
.mess-layer {
    background: #000;
    z-index: 1;
}
.mess-noise {
    position: absolute;
    inset: -50%;
    background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
    opacity: 0.15;
    mix-blend-mode: screen;
}
.mess-content {
    text-align: center;
    z-index: 2;
}
.mess-headline {
    font-size: 15vw;
    font-weight: 900;
    line-height: 0.8;
    color: #4a423a;
    letter-spacing: -2px;
}
.mess-sub {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 10px;
    color: #8c8074;
    margin-top: 1rem;
}

/* Brand Layer */
.brand-layer {
    z-index: 2;
    pointer-events: none;
}
.hero-center-logo {
    height: 80px;
    opacity: 0;
    transform: scale(0.8) translateY(50px);
}

/* Clean Layer */
.clean-layer {
    z-index: 3;
    clip-path: circle(0% at 50% 50%);
    background: var(--bg-light);
}
.clean-gradient {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, #ffffff 0%, var(--bg-light) 80%);
}

/* Product Reveal Layer */
.product-layer {
    z-index: 4;
    pointer-events: none;
}
.hero-product-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.hero-product-image {
    height: 100%;
    object-fit: contain;
    position: relative;
    z-index: 2;
}
.hero-product-shadow {
    position: absolute;
    bottom: -20px;
    width: 60%;
    height: 40px;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%);
    z-index: 1;
}
.hero-typography {
    position: absolute;
    bottom: 5vh;
    text-align: center;
    color: var(--color-brand-dark);
}
.clean-headline {
    font-size: 6vw;
    font-weight: 900;
    letter-spacing: -1px;
}
.clean-sub {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 6px;
    margin-top: 0.5rem;
}

/* --- CATEGORY SHOWCASE --- */
#category-showcase {
    position: relative;
    width: 100%;
    height: 100vh;
    background: var(--bg-light);
    overflow: hidden;
}

.cat-scene {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    visibility: hidden;
}
.cat-scene:first-child {
    visibility: visible;
}

.cat-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
}
.bg-kitchen { background: radial-gradient(circle at top right, #eaf6f7, #f7f9fa); }
.bg-laundry { background: radial-gradient(circle at top right, #f2eaf7, #f7f9fa); }
.bg-softener { background: radial-gradient(circle at top right, #f7f3ea, #f7f9fa); }
.bg-surfaces { background: radial-gradient(circle at top right, #eaf7ed, #f7f9fa); }

.cat-content-wrapper {
    position: relative;
    z-index: 1;
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
    padding: 0 5vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    height: 100%;
}

.cat-typography {
    color: var(--text-dark);
}
.cat-label {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 4px;
    color: var(--color-brand);
    margin-bottom: 2rem;
}
.cat-title {
    font-size: 4.5rem;
    font-weight: 900;
    line-height: 1;
    letter-spacing: -2px;
    margin-bottom: 1.5rem;
}
.cat-desc {
    font-size: 1.2rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 3rem;
    max-width: 450px;
}
.cat-product-meta {
    margin-bottom: 2rem;
}
.cat-product-meta h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
}
.cat-price {
    font-size: 1.25rem;
    color: #888;
    font-weight: 400;
}

.btn-premium {
    background: var(--text-dark);
    color: white;
    border: none;
    padding: 1.25rem 3rem;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.3s, transform 0.2s;
    pointer-events: auto;
}
.btn-premium:hover {
    background: var(--color-brand);
}
.btn-premium:active {
    transform: scale(0.98);
}

.cat-visual {
    position: relative;
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cat-product-img {
    height: 100%;
    object-fit: contain;
    z-index: 2;
    position: relative;
}
.cat-shadow {
    position: absolute;
    bottom: 5%;
    width: 70%;
    height: 30px;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%);
    z-index: 1;
}

/* --- THE COLLECTION (SHOP) --- */
.collection-section {
    background: #ffffff;
    color: var(--text-dark);
    padding: 8rem 5vw;
    position: relative;
    z-index: 10;
}
.collection-header {
    text-align: center;
    margin-bottom: 5rem;
}
.collection-header h2 {
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: -1px;
}
.collection-header p {
    font-size: 1.2rem;
    color: #666;
    margin-top: 1rem;
}

.catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 3rem;
    max-width: 1600px;
    margin: 0 auto;
}

.catalog-product {
    display: flex;
    flex-direction: column;
    group: hover;
}
.cp-image-wrap {
    background: #f7f9fa;
    height: 350px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    margin-bottom: 1.5rem;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.catalog-product:hover .cp-image-wrap {
    transform: translateY(-10px);
}
.cp-image-wrap img {
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 15px 25px rgba(0,0,0,0.1));
}

.cp-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.cp-info h4 {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.4;
    color: var(--text-dark);
}
.cp-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
}
.cp-price {
    font-size: 1.1rem;
    color: #666;
    font-weight: 400;
}
.btn-icon {
    background: transparent;
    border: 1px solid #ddd;
    color: var(--text-dark);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
}
.btn-icon:hover {
    background: var(--color-brand);
    border-color: var(--color-brand);
    color: white;
}

/* --- FOOTER --- */
.site-footer {
    background: var(--bg-dark);
    color: white;
    padding: 6rem 5vw;
    text-align: center;
}
.footer-logo {
    height: 40px;
    margin-bottom: 2rem;
    opacity: 0.5;
}
.site-footer p {
    font-size: 0.9rem;
    color: #666;
    letter-spacing: 1px;
}

/* --- RESPONSIVE --- */
@media (max-width: 1024px) {
    .cat-content-wrapper {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
    }
    .cat-typography {
        order: 2;
    }
    .cat-visual {
        order: 1;
        height: 40vh;
    }
    .cat-title {
        font-size: 3rem;
    }
    .cat-desc {
        margin: 0 auto 2rem auto;
    }
    .mess-headline { font-size: 20vw; }
}

@media (max-width: 768px) {
    .nav-links { display: none; }
    .menu-toggle { display: block; color: white; }
    
    .mess-headline { font-size: 22vw; }
    .mess-sub { font-size: 0.8rem; letter-spacing: 4px; }
    
    .clean-headline { font-size: 12vw; }
    .hero-product-wrapper { height: 50vh; }
    
    .cat-title { font-size: 2.2rem; }
    .btn-premium { width: 100%; padding: 1rem; }
    
    .catalog-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 2rem; }
    .cp-image-wrap { height: 250px; }
}
"""

js_content = """
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
            
            let orderText = isRtl ? "مرحباً، أود طلب المنتجات التالية:\\n\\n" : "Hello, I would like to order the following items:\\n\\n";
            cart.forEach((item, index) => {
                orderText += `${index + 1}. ${item.title} - ${item.price}\\n`;
            });
            
            const whatsappNumber = "+201000000000"; 
            const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
            window.open(waUrl, '_blank');
            
            cart = [];
            updateCartIcon();
        });
    });

});
"""

with open("C:/Users/Jonathan-pc/.gemini/antigravity/scratch/perclean-public-build/index.html", "w", encoding="utf-8") as f:
    f.write(html_content)

with open("C:/Users/Jonathan-pc/.gemini/antigravity/scratch/perclean-public-build/assets/perclean.css", "w", encoding="utf-8") as f:
    f.write(css_content)

with open("C:/Users/Jonathan-pc/.gemini/antigravity/scratch/perclean-public-build/assets/perclean.js", "w", encoding="utf-8") as f:
    f.write(js_content)
