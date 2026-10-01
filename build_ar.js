const fs = require('fs');
let html = fs.readFileSync('ar/index.html', 'utf8');

const newBody = `
    <!-- Floating Cart -->
    <div class="floating-cart">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
        <span class="cart-count">0</span>
    </div>

    <!-- Navigation -->
    <nav class="main-nav">
        <div class="nav-container">
            <div class="logo">
                <a href="#"><img src="/assets/logo.png" alt="بير كلين" class="nav-logo-img"></a>
            </div>
            
            <button class="menu-toggle" aria-label="تبديل القائمة">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"/></svg>
            </button>

            <div class="nav-links">
                <a href="#shop">المتجر</a>
                <a href="/">English</a>
            </div>
        </div>
    </nav>

    <!-- 01. CINEMATIC HERO -->
    <section class="scene-wrapper">
        <div class="cinematic-viewport">
            
            <!-- Layer 1: MESS -->
            <div class="layer layer-mess">
                <div class="mess-bg"></div>
                <div class="mess-typography">
                    <h1 class="mess-text" style="font-family: inherit">فوضى</h1>
                    <p class="mess-sub" style="font-family: inherit">زيوت محترقة. دهون عنيدة. بقع صعبة.</p>
                </div>
            </div>

            <!-- Layer 2: CLEAN (Revealed via mask) -->
            <div class="layer layer-clean">
                <div class="clean-bg"></div>
                <div class="clean-typography">
                    <h1 class="clean-text" style="font-family: inherit">نظافة</h1>
                </div>
            </div>
            
            <!-- Layer 3: THE BRAND CATALYST -->
            <div class="brand-catalyst-center">
                <img src="/assets/logo.png" alt="بير كلين" />
            </div>

            <!-- Layer 4: PRODUCT HERO -->
            <div class="product-hero-center">
                <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/Actif5.jpg?v=1763982121" alt="بير أكتيف" />
            </div>

        </div>
    </section>

    <!-- 02. CATEGORY EXPERIENCE -->
    <section class="category-experience">
        <div class="category-header">
            <h2>اكتشف الحلول</h2>
            <p>عناية مستهدفة لكل سطح في منزلك.</p>
        </div>
        <div class="category-horizontal-scroll">
            <div class="category-track">
                
                <div class="cat-panel">
                    <div class="cat-card">
                        <div class="cat-image">
                            <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/Actif5.jpg?v=1763982121" alt="المطبخ" />
                        </div>
                        <div class="cat-content">
                            <h3>عناية المطبخ</h3>
                            <button class="btn-outline" onclick="document.getElementById('shop').scrollIntoView()">اكتشف &larr;</button>
                        </div>
                    </div>
                </div>

                <div class="cat-panel">
                    <div class="cat-card">
                        <div class="cat-image">
                            <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/6C87C2BD-02AB-461B-BDDA-780DB8DEBA62.jpg?v=1784721867" alt="الغسيل" />
                        </div>
                        <div class="cat-content">
                            <h3>عناية الغسيل</h3>
                            <button class="btn-outline" onclick="document.getElementById('shop').scrollIntoView()">اكتشف &larr;</button>
                        </div>
                    </div>
                </div>

                <div class="cat-panel">
                    <div class="cat-card">
                        <div class="cat-image">
                            <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/IMG-4633.jpg?v=1761828559" alt="الأقمشة" />
                        </div>
                        <div class="cat-content">
                            <h3>منعمات الأقمشة</h3>
                            <button class="btn-outline" onclick="document.getElementById('shop').scrollIntoView()">اكتشف &larr;</button>
                        </div>
                    </div>
                </div>

                <div class="cat-panel">
                    <div class="cat-card">
                        <div class="cat-image">
                            <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/3DD3BB6C-75FE-472B-B1AC-3A6FFBDF35F5.jpg?v=1784721511" alt="الأسطح" />
                        </div>
                        <div class="cat-content">
                            <h3>مطهرات الأسطح</h3>
                            <button class="btn-outline" onclick="document.getElementById('shop').scrollIntoView()">اكتشف &larr;</button>
                        </div>
                    </div>
                </div>

                <div class="cat-panel">
                    <div class="cat-card">
                        <div class="cat-image">
                            <img src="https://cdn.shopify.com/s/files/1/0712/4038/4697/files/1C06BF29-BCAC-43EF-8938-ECC97D29B292.jpg?v=1784721432" alt="الأساسيات" />
                        </div>
                        <div class="cat-content">
                            <h3>صابون اليدين</h3>
                            <button class="btn-outline" onclick="document.getElementById('shop').scrollIntoView()">اكتشف &larr;</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- 03. SHOP FEATURED & ALL -->
    <section id="shop" class="shopping-experience">
        <div class="shop-container">
            <div class="shop-header">
                <h2>منتجات مميزة</h2>
            </div>
            
            <div class="product-grid featured-grid">
                <!-- We will inject the first 6 products here via JS -->
            </div>

            <div class="shop-all-trigger">
                <button class="btn-solid" id="btn-load-all">عرض كل الـ 46 منتج</button>
            </div>
            
            <div class="product-grid full-grid" style="display:none;">
                <!-- Full catalog injected here via JS -->
            </div>
        </div>
    </section>

    <!-- 04. BRAND MESSAGE -->
    <section class="brand-message-scene">
        <div class="brand-message-content">
            <img src="/assets/logo.png" alt="بير كلين" class="footer-logo-large">
            <h2>الارتقاء بالعناية المنزلية.</h2>
            <p>تركيبات استثنائية مصممة لفعالية لا مثيل لها.</p>
        </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="footer-content">
            <p>&copy; 2026 بير كلين. جميع الحقوق محفوظة.</p>
        </div>
    </footer>
`;

let newHtml = html.replace(/<body>[\s\S]*<script src="https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/gsap\/3.12.2\/gsap.min.js">/, '<body>\n' + newBody + '\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js">');
fs.writeFileSync('ar/index.html', newHtml);
