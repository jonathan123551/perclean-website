(() => {
  'use strict';

  const isArabic = document.documentElement.lang === 'ar';
  document.body.classList.toggle('rtl', isArabic);
  const strings = isArabic ? {
    search: 'ابحث في المجموعة', all: 'كل المنتجات', shop: 'تسوّق', bag: 'حقيبة التسوق', add: 'أضف للحقيبة', added: 'أُضيف إلى حقيبتك', sold: 'غير متاح حاليًا', available: 'متاح من المتجر الرسمي', kitchen: 'المطبخ', laundry: 'العناية بالملابس', 'hand-care': 'العناية باليدين', 'home-care': 'العناية بالمنزل', product: 'المنتج', size: 'الحجم أو الرائحة', select: 'اختر خيارًا', everything: 'عرض كل المنتجات', empty: 'لا توجد نتائج مطابقة.', results: n => `${n} منتجات`, checkout: 'تابع إلى إتمام الطلب', remove: 'إزالة', emptyBag: 'حقيبتك فارغة الآن.', subtotal: 'المجموع الفرعي', error: 'تعذر تحميل المجموعة. يرجى المحاولة لاحقًا.', retry: 'إعادة تحميل المجموعة', detail: 'تفاصيل المنتج', explore: 'اكتشف المنتج', price: n => `${n} ج.م`, close: 'إغلاق', sizeLabel: v => `الحجم: ${v}`
  } : {
    search: 'Search the collection', all: 'Everything', shop: 'Shop', bag: 'Shopping bag', add: 'Add to bag', added: 'Added to your bag', sold: 'Currently unavailable', available: 'Available at the official store', kitchen: 'Kitchen', laundry: 'Laundry', 'hand-care': 'Hand care', 'home-care': 'Home care', product: 'Product', size: 'Size or scent', select: 'Choose an option', everything: 'Show all products', empty: 'No matching products found.', results: n => `${n} products`, checkout: 'Continue to checkout', remove: 'Remove', emptyBag: 'Your bag is empty for now.', subtotal: 'Subtotal', error: 'The collection could not be loaded. Please try again later.', retry: 'Reload the collection', detail: 'Product details', explore: 'Explore product', price: n => `EGP ${n}`, close: 'Close', sizeLabel: v => `Size: ${v}`
  };
  const categoryLabels = {
    kitchen: strings.kitchen, laundry: strings.laundry, 'hand-care': strings['hand-care'], 'home-care': strings['home-care']
  };
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const shopBase = 'https://nvwk1p-si.myshopify.com';
  const money = new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-EG', { maximumFractionDigits: 2 });
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const textFromHtml = html => {
    const parsed = new DOMParser().parseFromString(html || '', 'text/html');
    return (parsed.body.textContent || '').replace(/\s+/g, ' ').trim();
  };
  const formatPrice = value => `${isArabic ? '' : ''}${money.format(Number(value))} ${isArabic ? 'ج.م' : 'EGP'}`;
  const productCutoutFiles = [
    ['BE5EA4CF-ADD5-4EB5-A47C-B45F2E7CA08F', '8168077885625.webp'],
    ['C11CA7CF-42E1-4ED3-B45D-DC4EFDF8E34D', '8168081621177.webp'],
    ['3DD3BB6C-75FE-472B-B1AC-3A6FFBDF35F5', '8168081195193.webp'],
    ['1C06BF29-BCAC-43EF-8938-ECC97D29B292', '8281973194937.webp'],
    ['170CC148-1C7E-4951-B9D8-3CF8A2488EEF', '8168078901433.webp']
  ];
  const catalogCutoutFiles = [
    ["1/0712/4038/4697/files/ChatGPTImageDec19_2025_10_17_32AM.png", "8315006353593.webp"],
    ["1/0712/4038/4697/files/Actif5.jpg", "8286851301561.webp"],
    ["1/0712/4038/4697/files/1C06BF29-BCAC-43EF-8938-ECC97D29B292.jpg", "8281973194937.webp"],
    ["1/0712/4038/4697/files/IMG-4633.jpg", "8260706304185.webp"],
    ["1/0712/4038/4697/files/C11CA7CF-42E1-4ED3-B45D-DC4EFDF8E34D.jpg", "8168081621177.webp"],
    ["1/0712/4038/4697/files/3DD3BB6C-75FE-472B-B1AC-3A6FFBDF35F5.jpg", "8168081195193.webp"],
    ["1/0712/4038/4697/files/A6D5B9C8-EF53-4542-B5BA-D78F04596B90.jpg", "8168080834745.webp"],
    ["1/0712/4038/4697/files/10D1C703-99B8-40C4-BFC9-2F1B09A61AFE.jpg", "8168080539833.webp"],
    ["1/0712/4038/4697/files/E2E79F84-A1D9-4453-8FCE-B2A01B39E5CC.jpg", "8168080179385.webp"],
    ["1/0712/4038/4697/files/BD93F18F-80B4-483E-9D17-7D466CCFC612.jpg", "8168079655097.webp"],
    ["1/0712/4038/4697/files/2CF9170E-88BB-40D0-9B4D-5ACC01763B6A.jpg", "8168079294649.webp"],
    ["1/0712/4038/4697/files/170CC148-1C7E-4951-B9D8-3CF8A2488EEF.jpg", "8168078901433.webp"],
    ["1/0712/4038/4697/files/AEE95EF3-AAA8-40DF-8004-C457503CF8FF.jpg", "8168078573753.webp"],
    ["1/0712/4038/4697/files/BE5EA4CF-ADD5-4EB5-A47C-B45F2E7CA08F.jpg", "8168077885625.webp"],
    ["1/0712/4038/4697/files/A248BC5F-6F80-49A9-9AE2-9FB901EE35D3.jpg", "8168077000889.webp"],
    ["1/0712/4038/4697/files/FA1DB7CD-7B81-4902-9192-2F203AE33AEA.jpg", "8168076771513.webp"],
    ["1/0712/4038/4697/files/8FA4FEB7-0FF0-4F51-92E6-0DBE568BF2FB.jpg", "8168076509369.webp"],
    ["1/0712/4038/4697/files/3C39477A-6848-4320-81C3-B8C783DC3528.jpg", "8168075591865.webp"],
    ["1/0712/4038/4697/files/B2275EC2-6681-4239-A192-5A37BE566848.jpg", "8167794802873.webp"],
    ["1/0712/4038/4697/files/C1070E2F-98E1-4DFF-AB40-32FAA3D6EECF.jpg", "8167794016441.webp"],
    ["1/0712/4038/4697/files/E1C749FD-6CAB-4254-A2AA-220D72E365E2.jpg", "8167793983673.webp"],
    ["1/0712/4038/4697/files/15154349-84D0-4118-A49C-462654E95FC0.jpg", "8167793426617.webp"],
    ["1/0712/4038/4697/files/3BA91AB0-6F81-4C11-A910-2D884A54E414.jpg", "8167793361081.webp"],
    ["1/0712/4038/4697/files/54C3A6BA-34A9-4974-A74E-2442E9B4E5FF.jpg", "8167793262777.webp"],
    ["1/0712/4038/4697/files/19_jpg.jpg", "8167793197241.webp"],
    ["1/0712/4038/4697/files/9CE55F68-BA26-42F9-B9CA-B9D131039563.jpg", "8167791689913.webp"],
    ["1/0712/4038/4697/files/20_jpg.jpg", "8167791329465.webp"],
    ["1/0712/4038/4697/files/E179B9D7-08E3-4945-9062-97DB6E801CC6.jpg", "8167788413113.webp"],
    ["1/0712/4038/4697/files/F24BA1B2-AFCD-4078-9E3B-675C88D139CC.jpg", "8167785824441.webp"],
    ["1/0712/4038/4697/files/B9238D2D-FCF7-4EF4-893E-D250B4A6173D.jpg", "8167785660601.webp"],
    ["1/0712/4038/4697/files/7C92B80D-B2BA-4FBA-91D5-B548BF5809F5.jpg", "8167785529529.webp"],
    ["1/0712/4038/4697/files/6B79DA87-98E0-49EB-87B4-629595737974.jpg", "8167783891129.webp"],
    ["1/0712/4038/4697/files/B6D527C4-B9E1-4CB2-83E4-F5A5F2B1FBE1.jpg", "8167782875321.webp"],
    ["1/0712/4038/4697/files/B8F7F933-757A-43A9-A4D8-19AC78D22CED.jpg", "8167772455097.webp"],
    ["1/0712/4038/4697/files/E42D76BC-8D6E-4821-9B9E-E78152170C8B.jpg", "8167771570361.webp"],
    ["1/0712/4038/4697/files/DECD228C-1B45-4F64-8267-FD5FE6000513.jpg", "8167770947769.webp"],
    ["1/0712/4038/4697/files/7B63A88F-724F-4060-8EF6-A54E51F53869.jpg", "8167770194105.webp"],
    ["1/0712/4038/4697/files/A072B754-2769-423D-A07B-E98302D72EDB.jpg", "8167769342137.webp"],
    ["1/0712/4038/4697/files/EA6328F0-612A-44CC-B338-AD2012A935E4.jpg", "8167768817849.webp"],
    ["1/0712/4038/4697/files/AF0BD408-5F75-4141-AB04-347755599573.jpg", "8167768654009.webp"],
    ["1/0712/4038/4697/files/56938FAC-46BC-48E0-9E6C-781A4E97FBC2.jpg", "8167768326329.webp"],
    ["1/0712/4038/4697/files/4110F2C5-230F-4DDA-8463-FD15A88F1E99.jpg", "8167768228025.webp"],
    ["1/0712/4038/4697/files/BA46F36A-016C-4C5D-8C68-1B5E28960F9C.jpg", "8167768096953.webp"],
    ["1/0712/4038/4697/files/44EA168B-CFBF-4FCF-BFC8-5D0D45BC60DA.jpg", "8167767998649.webp"],
    ["1/0712/4038/4697/files/2A7BED6C-3036-486B-9C25-57E08247C31B.jpg", "8167767933113.webp"],
    ["1/0712/4038/4697/files/2BF6CB14-5A71-4C77-8C0D-C666E703AA30.jpg", "8167767605433.webp"]
  ];
  const imageUrl = (url, width = 680) => {
    if (!url) return '';
    if (url.includes('B6D527C4-B9E1-4CB2-83E4-F5A5F2B1FBE1')) return '/assets/per-actif-cutout.png';
    const cutout = productCutoutFiles.find(([key]) => url.includes(key)) || catalogCutoutFiles.find(([key]) => url.includes(key));
    return cutout ? `/assets/product-cutouts/${cutout[1]}` : `${url}${url.includes('?') ? '&' : '?'}width=${width}`;
  };
  const productName = product => isArabic ? (product.titleAr || textFromHtml(product.descriptionHtml) || product.title) : product.title;
  const priceOf = product => Number(product.variants?.[0]?.price || 0);
  const variantOf = product => product.variants?.[0] || null;
  const variantLabel = product => {
    const size = product.title.match(/\d+(?:[.,]\d+)?\s*(?:kilograms?|kgs?|kg|k|grams?|gm|g|millilit(?:er|re)s?|ml|lit(?:er|re)s?|l)\b/i) || product.title.match(/\d+(?:[.,]\d+)?(?:kg|gm|ml|g|l)\b/i);
    return size?.[0]?.trim() || variantOf(product)?.title || '';
  };
  const available = product => Boolean(variantOf(product)?.available);
  const relatedFamily = product => {
    const s = `${product.title} ${product.handle}`.toLowerCase();
    if (/hand[- ]wash|hand[- ]washing|سائل-منظف-لليدين/.test(s)) {
      const scent = /spring|سبرنج/.test(s) ? 'spring' : /pink.?sugar/.test(s) ? 'pink-sugar' : /dovana|دوڤانا/.test(s) ? 'dovana' : /clear.?green|herb|اعشاب/.test(s) ? 'green' : /green.?apple|تفاح/.test(s) ? 'apple' : 'other';
      return `hand-${scent}`;
    }
    if (/dish.?wash|dishwashing|مواعين|منظف-سائل-للأغراض-المنزلية/.test(s)) return /morning.?breeze|نسيم/.test(s) ? 'dish-morning' : 'dish-lemon';
    if (/peractif|actif/.test(s)) return 'actif';
    if (/perwash.?ox|bleach|مزيل-البقع/.test(s)) return 'wash-ox';
    if (/perwash|washing.?machine|چل-منظف/.test(s)) return 'perwash';
    if (/softener|منعم-ومعطر/.test(s)) return 'softener';
    if (/perc?lean.?sd|per-clean-sd|سائل-مطهر-لجميع/.test(s)) return 'sd';
    if (/3.?in.?1|معطر-الأرضيات|منظف-ومطهر-ومعطر/.test(s)) return 'floor';
    if (/pershine|ملمع-زجاج/.test(s)) return 'glass';
    return product.handle;
  };
  const classify = product => {
    const name = `${product.title} ${product.handle}`.toLowerCase();
    if (/dish.?wash|dishwashing|mencopol|مواعين|منظف-سائل-للأغراض-المنزلية|peractif|actif/.test(name)) return 'kitchen';
    if (/hand[- ]wash|hand[- ]washing|سائل-منظف-لليدين/.test(name)) return 'hand-care';
    if (/perwash|softener|fabric softener|clothes|مزيل-البقع|منعم-ومعطر|چل-منظف/.test(name)) return 'laundry';
    return 'home-care';
  };

  let products = [];
  let activeFilter = 'all';
  let searchTerm = '';
  let sortMode = 'featured';
  let toastTimer;
  let dataReady = false;
  let productHistoryEntry = false;
  const cartKey = 'perclean-bag-v2';
  const readCart = () => {
    try { const value = JSON.parse(localStorage.getItem(cartKey) || '[]'); return Array.isArray(value) ? value : []; }
    catch { return []; }
  };
  let cart = readCart();
  const saveCart = () => { try { localStorage.setItem(cartKey, JSON.stringify(cart)); } catch {} renderCart(); };
  const categoryFor = product => product.category || classify(product);
  const productByHandle = handle => products.find(product => product.handle === handle);
  const productByVariant = id => products.find(product => product.variants.some(variant => String(variant.id) === String(id)));
  const featuredHandles = ['مزيل-للدهون', 'چل-منظف-للملابس', 'سائل-مطهر-لجميع-الأسطح-1', 'hand-wash-spring-1-5k'];
  let allProductsVisible = false;
  function syncCategoryCards() {
    const choices = {
      'dish-care': productByHandle('منظف-للأغراض-المنزلية') || products.find(item => /dish.?wash|dishwashing|مواعين/.test(`${item.title} ${item.handle}`)),
      perwash: productByHandle('چل-منظف-للملابس'),
      germol: productByHandle('سائل-مطهر-لجميع-الأسطح'),
      'hard-cleaner': productByHandle('سائل-مطهر-لجميع-الأسطح-1'),
      'hand-care': productByHandle('hand-wash-spring-1-5k')
    };
    document.querySelectorAll('[data-category-card]').forEach(card => {
      const product = choices[card.dataset.categoryCard];
      const image = card.querySelector('img');
      if (image && product) image.src = imageUrl(product.image, 680);
    });
  }
  function syncHeroProduct() {
    const featured = productByHandle('مزيل-للدهون') || productByHandle('peractif-5kg');
    if (!featured) return;
    const image = document.getElementById('hero-product-img');
    if (image && featured.image) { image.src = '/assets/per-actif-cutout.png'; image.alt = productName(featured); }
    const price = document.querySelector('[data-hero-price]');
    if (price) price.textContent = formatPrice(variantOf(featured)?.price || 0);
    const name = document.getElementById('hero-product-name');
    if (name) name.textContent = (isArabic ? 'بير أكتيف' : 'PER ACTIF') + ' · ' + variantLabel(featured);
    const spotlight = document.getElementById('story-spotlight-image');
    if (spotlight && featured.image) { spotlight.src = imageUrl(featured.image, 900); spotlight.alt = productName(featured); }
    document.querySelectorAll('[data-story-product]').forEach(button => {
      const room = button.dataset.storyProduct;
      const category = room === 'bathroom' ? 'home-care' : room;
      const matches = products.filter(product => categoryFor(product) === category && available(product));
      const chosen = room === 'kitchen'
        ? matches.find(product => /650\s*(?:gram|gm)/i.test(product.title)) || matches.find(product => /peractif|actif/i.test(product.title + ' ' + product.handle)) || matches[0]
        : room === 'laundry'
          ? matches.find(product => /perwash/i.test(product.title + ' ' + product.handle) && /1\.65\s*k/i.test(product.title)) || matches.find(product => /perwash/i.test(product.title + ' ' + product.handle)) || matches[0]
          : matches.find(product => /germol/i.test(product.title + ' ' + product.handle)) || matches[0];
      if (!chosen) return;
      button.dataset.product = chosen.handle;
      const productImage = button.querySelector('img');
      if (productImage) { productImage.src = chosen.handle === featured.handle ? '/assets/per-actif-cutout.png' : imageUrl(chosen.image, 850); productImage.alt = productName(chosen); }
      const label = button.querySelector('.scene-product-label');
      if (label) { label.querySelector('span').textContent = productName(chosen) + ' · ' + variantLabel(chosen); label.querySelector('strong').textContent = formatPrice(priceOf(chosen)); }
    });
  }

  function renderProducts() {
    if (!dataReady) return;
    document.getElementById('catalog-loading').hidden = true;
    let list = products.filter(product => {
      const productCategory = categoryFor(product);
      const matchesCategory = activeFilter === 'all' || productCategory === activeFilter || ((activeFilter === 'bathroom' || activeFilter === 'surface') && productCategory === 'home-care');
      const searchable = `${product.title} ${product.titleAr} ${product.handle} ${textFromHtml(product.descriptionHtml)}`.toLocaleLowerCase(isArabic ? 'ar' : 'en');
      return matchesCategory && (!searchTerm || searchable.includes(searchTerm));
    });
    if (sortMode === 'price-asc') list.sort((a, b) => priceOf(a) - priceOf(b));
    if (sortMode === 'price-desc') list.sort((a, b) => priceOf(b) - priceOf(a));
    if (sortMode === 'name') list.sort((a, b) => productName(a).localeCompare(productName(b), isArabic ? 'ar' : 'en'));
    if (!allProductsVisible && activeFilter === 'all' && !searchTerm) {
      list = featuredHandles.map(productByHandle).filter(Boolean);
    }
    grid.setAttribute('aria-busy', 'false');
    document.getElementById('results-line').textContent = strings.results(list.length);
    document.getElementById('empty-state').hidden = list.length > 0;
    grid.hidden = list.length === 0;
    grid.innerHTML = list.map(product => {
      const variant = variantOf(product);
      const title = productName(product);
      const isAvailable = available(product);
      const category = categoryLabels[categoryFor(product)] || strings['home-care'];
      return `<article class="product-card">
        <a class="product-image-link" href="?product=${encodeURIComponent(product.handle)}" data-product="${escape(product.handle)}" aria-label="${escape(strings.explore)}: ${escape(title)}">
          <img class="product-image" src="${escape(imageUrl(product.image, 560))}" srcset="${escape(imageUrl(product.image, 360))} 360w, ${escape(imageUrl(product.image, 560))} 560w, ${escape(imageUrl(product.image, 820))} 820w" sizes="(max-width: 680px) 46vw, (max-width: 1050px) 30vw, 19vw" alt="${escape(title)}" loading="lazy" decoding="async">
        </a>
        <div class="product-label-row"><span class="product-category">${escape(category)}</span><span class="availability${isAvailable ? '' : ' is-sold'}">${escape(isAvailable ? strings.available : strings.sold)}</span></div>
        <a class="product-name" href="?product=${encodeURIComponent(product.handle)}" data-product="${escape(product.handle)}">${escape(title)}</a>
        <div class="product-card-footer"><span class="product-price">${escape(formatPrice(variant?.price || 0))}</span><button class="add-button" type="button" data-add="${escape(product.handle)}" ${isAvailable ? '' : 'disabled'}>${escape(isAvailable ? strings.add : strings.sold)}</button></div>
      </article>`;
    }).join('');
    grid.querySelectorAll('.product-card').forEach((card, index) => { card.dataset.category = categoryFor(list[index]); });
    grid.classList.toggle('is-expanded', allProductsVisible || activeFilter !== 'all' || Boolean(searchTerm));
    if (window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.gsap.fromTo(grid.querySelectorAll('.product-card'), { y: 22, opacity: 0, rotateX: -3 }, { y: 0, opacity: 1, rotateX: 0, duration: .48, stagger: .055, ease: 'power3.out', overwrite: true });
    }
  }

  const catalogSection = document.querySelector('.collection-section');
  const browseAll = document.getElementById('browse-all');
  const catalogTools = document.getElementById('catalog-tools');
  if (browseAll && catalogSection && catalogTools) browseAll.addEventListener('click', () => {
    allProductsVisible = !allProductsVisible;
    catalogSection.classList.toggle('all-products', allProductsVisible);
    catalogTools.hidden = !allProductsVisible;
    browseAll.setAttribute('aria-expanded', String(allProductsVisible));
    browseAll.innerHTML = allProductsVisible
      ? `${isArabic ? 'عرض المختارات' : 'Show featured products'}`
      : `${isArabic ? 'تصفّح المجموعة كاملة' : 'View full collection'} <span class="filter-total"></span>`;
    activeFilter = 'all'; searchTerm = '';
    if (search) search.value = '';
    document.querySelectorAll('.filter-chip').forEach(button => { const active = button.dataset.filter === 'all'; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); });
    renderProducts();
    const total = document.querySelectorAll('.filter-total'); total.forEach(node => { node.textContent = ` (${products.length})`; });
    if (allProductsVisible) catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  function toast(message) {
    const node = document.getElementById('toast');
    node.textContent = message;
    node.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('is-visible'), 2200);
  }

  function flyProductToBag(button, product) {
    if (!product || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = button.closest('.product-card') || button.closest('.product-detail') || button.closest('.opening-product-stage') || button.closest('.cinema-jug-stage');
    const sourceImg = card ? card.querySelector('.product-image, .detail-image, img') : null;
    const floatBag = document.querySelector('.cart-float');
    const headerBag = document.querySelector('.site-header .cart-trigger') || document.querySelector('.cart-trigger');
    const targetTrigger = (floatBag && floatBag.classList.contains('is-populated') && window.scrollY > 350) ? floatBag : (headerBag || floatBag);
    if (!sourceImg || !targetTrigger || !window.gsap) return;

    const srcRect = sourceImg.getBoundingClientRect();
    const dstRect = targetTrigger.getBoundingClientRect();
    if (srcRect.width === 0 || srcRect.height === 0 || dstRect.width === 0) return;

    // Visual separation: briefly dim source image
    sourceImg.style.transition = 'opacity 0.22s ease';
    sourceImg.style.opacity = '0.35';
    setTimeout(() => { sourceImg.style.opacity = '1'; }, 700);

    const clone = document.createElement('img');
    clone.src = sourceImg.src;
    clone.alt = '';
    clone.style.cssText = `
      position: fixed;
      z-index: 99999;
      left: ${srcRect.left}px;
      top: ${srcRect.top}px;
      width: ${srcRect.width}px;
      height: ${srcRect.height}px;
      object-fit: contain;
      pointer-events: none;
      filter: drop-shadow(0 10px 18px rgba(0,0,0,0.38));
      will-change: transform, opacity, filter;
    `;
    document.body.appendChild(clone);

    const startCenterX = srcRect.left + srcRect.width / 2;
    const startCenterY = srcRect.top + srcRect.height / 2;
    const destCenterX = dstRect.left + dstRect.width / 2;
    const destCenterY = dstRect.top + dstRect.height / 2;

    const targetX = destCenterX - startCenterX;
    const targetY = destCenterY - startCenterY;
    const arcApexY = Math.min(-65, Math.min(srcRect.top, dstRect.top) - startCenterY - 50);

    const fly = gsap.timeline({
      onComplete: () => {
        clone.remove();
        gsap.timeline()
          .to(targetTrigger, { scale: 1.35, y: -4, duration: 0.13, ease: 'power2.out' })
          .to(targetTrigger, { scale: 1.0, y: 0, duration: 0.28, ease: 'elastic.out(1.2, 0.4)' });
        
        const countBadge = targetTrigger.querySelector('.cart-count') || document.querySelector('.cart-count');
        if (countBadge) {
          gsap.fromTo(countBadge,
            { scale: 1.85, backgroundColor: '#ff2d55' },
            { scale: 1.0, backgroundColor: 'var(--red, #d63842)', duration: 0.32, ease: 'back.out(2.2)' }
          );
        }
      }
    });

    // 1. Lift & separate with perspective tilt
    fly.to(clone, {
      y: '-=28',
      scale: 1.08,
      rotation: isArabic ? -8 : 8,
      filter: 'drop-shadow(0 22px 30px rgba(0,0,0,0.52))',
      duration: 0.16,
      ease: 'power2.out'
    });

    // 2. Parabolic arc flight to actual bag
    fly.to(clone, {
      x: targetX,
      duration: 0.56,
      ease: 'power1.inOut'
    }, 0.16);

    fly.to(clone, {
      y: arcApexY,
      duration: 0.22,
      ease: 'power2.out'
    }, 0.16);

    fly.to(clone, {
      y: targetY,
      scale: 0.10,
      opacity: 0.3,
      rotation: isArabic ? 20 : -20,
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
      duration: 0.34,
      ease: 'power2.in'
    }, 0.38);
  }

  function addToCart(product) {
    const variant = variantOf(product);
    if (!variant?.available) return;
    const existing = cart.find(line => String(line.variantId) === String(variant.id));
    if (existing) existing.quantity = Math.min(existing.quantity + 1, 99);
    else cart.push({ variantId: variant.id, handle: product.handle, quantity: 1 });
    saveCart();
    toast(`${productName(product)} · ${strings.added}`);
  }

  function renderCart() {
    cart = cart.map(line => ({ ...line, quantity: Math.max(1, Math.min(99, Number(line.quantity) || 1)) })).filter(line => productByVariant(line.variantId));
    try { localStorage.setItem(cartKey, JSON.stringify(cart)); } catch {}
    const count = cart.reduce((sum, line) => sum + line.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(node => { node.textContent = count; node.classList.toggle('is-empty', count === 0); });
    const floatingCart = document.querySelector('.cart-float');
    if (floatingCart) {
      floatingCart.classList.toggle('is-populated', count > 0);
      floatingCart.setAttribute('aria-hidden', String(count === 0));
      floatingCart.tabIndex = count > 0 ? 0 : -1;
    }
    document.querySelectorAll('.drawer-count').forEach(node => node.textContent = `(${count})`);
    const linesNode = document.getElementById('cart-lines');
    if (!linesNode) return;
    let subtotal = 0;
    linesNode.innerHTML = cart.map(line => {
      const product = productByVariant(line.variantId);
      const variant = product && product.variants.find(item => String(item.id) === String(line.variantId));
      if (!product || !variant) return '';
      subtotal += Number(variant.price) * line.quantity;
      return `<div class="cart-line">
        <img src="${escape(imageUrl(product.image, 180))}" alt="" loading="lazy">
        <div><div class="cart-line-name">${escape(productName(product))}</div><div class="cart-line-meta">${escape(variantLabel(product))} · ${escape(formatPrice(variant.price))}</div>
          <div class="quantity-control"><button type="button" data-quantity="${escape(variant.id)}" data-step="-1" aria-label="${isArabic ? 'تقليل الكمية' : 'Decrease quantity'}">−</button><output>${line.quantity}</output><button type="button" data-quantity="${escape(variant.id)}" data-step="1" aria-label="${isArabic ? 'زيادة الكمية' : 'Increase quantity'}">+</button></div>
        </div><div><div class="cart-line-total">${escape(formatPrice(Number(variant.price) * line.quantity))}</div><button class="remove-line" type="button" data-remove="${escape(variant.id)}">${escape(strings.remove)}</button></div>
      </div>`;
    }).join('');
    document.getElementById('cart-empty').hidden = cart.length > 0;
    document.getElementById('drawer-foot').hidden = cart.length === 0;
    document.getElementById('cart-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('checkout-button').href = cart.length ? `${shopBase}/cart/${cart.map(line => `${line.variantId}:${line.quantity}`).join(',')}` : shopBase;
  }

  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  let returnFocus = null;
  function openCart() {
    returnFocus = document.activeElement;
    drawer.inert = false;
    drawer.setAttribute('aria-hidden', 'false');
    backdrop.hidden = false;
    requestAnimationFrame(() => { backdrop.classList.add('is-open'); drawer.classList.add('is-open'); });
    document.body.classList.add('lock-scroll');
    drawer.querySelector('.close-button').focus();
  }
  function closeCart() {
    drawer.classList.remove('is-open'); backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true'); drawer.inert = true;
    document.body.classList.remove('lock-scroll');
    setTimeout(() => { if (!drawer.classList.contains('is-open')) backdrop.hidden = true; }, 280);
    if (returnFocus?.isConnected) returnFocus.focus();
  }

  function detailDescription(product) {
    const raw = textFromHtml(product.descriptionHtml);
    return raw && isArabic ? `<p class="detail-description">${escape(raw)}</p>` : '';
  }
  function openProduct(handle, push = true) {
    const product = productByHandle(handle);
    if (!product) return;
    if (push) { history.pushState({ product: handle }, '', `?product=${encodeURIComponent(handle)}`); productHistoryEntry = true; }
    const variant = variantOf(product);
    const family = relatedFamily(product);
    const related = products.filter(item => relatedFamily(item) === family);
    const category = categoryLabels[categoryFor(product)] || strings['home-care'];
    const details = document.getElementById('product-detail');
    details.innerHTML = `<div class="product-detail">
      <div class="detail-image-wrap"><img class="detail-image" src="${escape(imageUrl(product.image, 1000))}" alt="${escape(productName(product))}" decoding="async"></div>
      <div class="detail-copy"><p class="eyebrow">${escape(category)} / PER CLEAN</p><h2 id="dialog-title">${escape(productName(product))}</h2>${detailDescription(product)}
      <p class="detail-meta">${escape(variantLabel(product) ? strings.sizeLabel(variantLabel(product)) : strings.detail)}</p><p class="detail-price">${escape(formatPrice(variant?.price || 0))}</p>
      ${related.length > 1 ? `<div class="related-products"><strong>${escape(strings.size)}</strong>${related.map(item => `<a class="related-link${item.handle === product.handle ? ' is-current' : ''}" href="?product=${encodeURIComponent(item.handle)}" data-product="${escape(item.handle)}">${escape(variantLabel(item))}</a>`).join('')}</div>` : ''}
      <button class="button button-dark detail-add" data-add="${escape(product.handle)}" type="button" ${available(product) ? '' : 'disabled'}>${escape(available(product) ? strings.add : strings.sold)}</button>
      </div></div>`;
    const dialog = document.getElementById('product-dialog');
    if (!dialog.open) dialog.showModal();
    dialog.querySelector('.dialog-close').focus();
    if (window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const visual = details.querySelector('.detail-image-wrap');
      const productImage = details.querySelector('.detail-image');
      window.gsap.fromTo(visual, { clipPath: isArabic ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)', duration: .58, ease: 'power3.out', overwrite: true });
      window.gsap.fromTo(productImage, { scale: 1.12, rotateY: isArabic ? 8 : -8 }, { scale: 1, rotateY: 0, duration: .76, ease: 'power3.out', overwrite: true });
    }
  }
  function closeProduct() {
    const dialog = document.getElementById('product-dialog');
    if (!dialog.open) return;
    if (productHistoryEntry) history.back();
    else { dialog.close(); if (new URLSearchParams(location.search).has('product')) history.replaceState({}, '', `${location.pathname}${location.hash}`); }
  }

  document.addEventListener('click', event => {
    const addButton = event.target.closest('[data-add]');
    if (addButton) {
      const product = productByHandle(addButton.dataset.add);
      if (product) {
        flyProductToBag(addButton, product);
        addToCart(product);
        if (document.getElementById('product-dialog').open) closeProduct();
      }
      return;
    }
    const productLink = event.target.closest('[data-product]');
    if (productLink) { event.preventDefault(); openProduct(productLink.dataset.product); return; }
    const categoryLink = event.target.closest('[data-category-link]');
    if (categoryLink) {
      activeFilter = categoryLink.dataset.categoryLink;
      if (activeFilter !== 'all') allProductsVisible = true;
      if (allProductsVisible) { catalogSection?.classList.add('all-products'); if (catalogTools) catalogTools.hidden = false; if (browseAll) { browseAll.setAttribute('aria-expanded', 'true'); browseAll.innerHTML = `${isArabic ? 'عرض المختارات' : 'Show featured products'}`; } }
      document.querySelectorAll('.filter-chip').forEach(button => { const active = button.dataset.filter === activeFilter; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); });
      renderProducts();
    }
    const quantityButton = event.target.closest('[data-quantity]');
    if (quantityButton) {
      const line = cart.find(item => String(item.variantId) === String(quantityButton.dataset.quantity));
      if (line) { line.quantity = Math.min(99, line.quantity + Number(quantityButton.dataset.step)); if (line.quantity < 1) cart = cart.filter(item => item !== line); saveCart(); }
    }
    const removeButton = event.target.closest('[data-remove]');
    if (removeButton) { cart = cart.filter(line => String(line.variantId) !== String(removeButton.dataset.remove)); saveCart(); }
  });

  document.querySelectorAll('.cart-trigger').forEach(button => button.addEventListener('click', openCart));
  drawer.querySelector('.close-button').addEventListener('click', closeCart);
  backdrop.addEventListener('click', closeCart);
  drawer.querySelector('.continue-shopping').addEventListener('click', closeCart);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) closeCart();
    if (event.key === 'Tab' && drawer.classList.contains('is-open')) {
      const focusable = [...drawer.querySelectorAll('a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),[tabindex]:not([tabindex="-1"])')].filter(node => !node.hidden && node.getClientRects().length);
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    if (event.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { event.preventDefault(); allProductsVisible = true; catalogSection?.classList.add('all-products'); if (catalogTools) catalogTools.hidden = false; document.getElementById('product-search').focus(); }
  });

  const menuTrigger = document.querySelector('.menu-trigger');
  const nav = document.getElementById('primary-nav');
  if (menuTrigger && nav) {
    menuTrigger.addEventListener('click', () => {
      const open = menuTrigger.getAttribute('aria-expanded') !== 'true';
      menuTrigger.setAttribute('aria-expanded', String(open));
      menuTrigger.setAttribute('aria-label', open ? (isArabic ? 'إغلاق القائمة' : 'Close menu') : (isArabic ? 'فتح القائمة' : 'Open menu'));
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', event => { if (event.target.closest('a')) { nav.classList.remove('is-open'); menuTrigger.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('click', event => { if (!event.target.closest('.site-header') && nav.classList.contains('is-open')) { nav.classList.remove('is-open'); menuTrigger.setAttribute('aria-expanded', 'false'); } });
  }

  const search = document.getElementById('product-search');
  const sort = document.getElementById('product-sort');
  if (search) { search.placeholder = strings.search; search.addEventListener('input', () => { searchTerm = search.value.trim().toLocaleLowerCase(isArabic ? 'ar' : 'en'); renderProducts(); }); }
  if (sort) sort.addEventListener('change', () => { sortMode = sort.value; renderProducts(); });
  document.querySelectorAll('.filter-chip').forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter; allProductsVisible = true; catalogSection?.classList.add('all-products'); if (catalogTools) catalogTools.hidden = false; if (browseAll) { browseAll.setAttribute('aria-expanded', 'true'); browseAll.innerHTML = `${isArabic ? 'عرض المختارات' : 'Show featured products'}`; }
    document.querySelectorAll('.filter-chip').forEach(item => { const active = item === button; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); });
    renderProducts();
  }));
  const clearSearch = document.getElementById('clear-search');
  if (clearSearch) clearSearch.addEventListener('click', () => { search.value = ''; searchTerm = ''; activeFilter = 'all'; document.querySelectorAll('.filter-chip').forEach(item => { const active = item.dataset.filter === 'all'; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); }); renderProducts(); });
  document.querySelectorAll('.language-switch').forEach(link => link.textContent = isArabic ? 'English' : 'العربية');
  document.querySelectorAll('.cart-trigger').forEach(button => button.setAttribute('aria-label', isArabic ? 'فتح حقيبة التسوق' : 'Open shopping bag'));
  document.querySelectorAll('.filter-chip[data-filter="all"]').forEach(button => { button.firstChild.textContent = strings.all + ' '; });
  document.querySelectorAll('.filter-total').forEach(filterTotal => { filterTotal.textContent = ' (46)'; });
  const browseLabel = document.getElementById('browse-all');
  if (browseLabel) browseLabel.innerHTML = `${isArabic ? 'تصفّح المجموعة كاملة' : 'View full collection'} <span class="filter-total"> (46)</span>`;
  document.querySelectorAll('.footer-links a').forEach(link => { if (link.href.includes('/ar/')) link.textContent = isArabic ? 'English' : 'العربية'; });
  document.querySelectorAll('.continue-shopping').forEach(button => button.textContent = isArabic ? 'متابعة التسوق' : 'Continue browsing');
  document.querySelector('.cart-empty p').textContent = strings.emptyBag;
  const closeDialog = document.querySelector('.dialog-close');
  closeDialog.setAttribute('aria-label', strings.close);
  closeDialog.addEventListener('click', closeProduct);
  document.getElementById('product-dialog').addEventListener('cancel', event => { event.preventDefault(); closeProduct(); });
  document.getElementById('product-dialog').addEventListener('click', event => { if (event.target === event.currentTarget) closeProduct(); });
  window.addEventListener('popstate', () => {
    const handle = new URLSearchParams(location.search).get('product');
    if (handle) openProduct(handle, false);
    else { productHistoryEntry = false; if (document.getElementById('product-dialog').open) closeProduct(); }
  });

  const loadSnapshot = () => fetch('/assets/products.json', { cache: 'no-cache' }).then(response => {
    if (!response.ok) throw new Error('Snapshot response was not successful');
    return response.json();
  });
  const liveCatalog = fetch(`${shopBase}/products.json?limit=250`, { signal: AbortSignal.timeout(7000) }).then(response => {
    if (!response.ok) throw new Error('Shopify catalog response was not successful');
    return response.json();
  });
  Promise.all([loadSnapshot(), liveCatalog]).then(([snapshot, live]) => {
    const translations = new Map((snapshot.products || []).map(product => [product.handle, product.titleAr]));
    products = (live.products || []).map(product => ({
      id: product.id,
      handle: product.handle,
      title: product.title,
      titleAr: translations.get(product.handle) || '',
      descriptionHtml: product.body_html || '',
      category: classify(product),
      image: product.images?.[0]?.src || '',
      images: (product.images || []).map(image => image.src),
      variants: (product.variants || []).map(variant => ({
        id: variant.id,
        title: variant.title,
        price: variant.price,
        available: variant.available,
        compareAtPrice: variant.compare_at_price,
        option1: variant.option1,
        option2: variant.option2,
        option3: variant.option3
      }))
    }));
    dataReady = true;
    syncHeroProduct();
    document.querySelectorAll('.filter-total').forEach(total => { total.textContent = ` (${products.length})`; });
    syncCategoryCards();
    renderProducts();
    renderCart();
    initCinematicMotion();
    const routeProduct = new URLSearchParams(location.search).get('product');
    if (routeProduct) openProduct(routeProduct, false);
  }).catch(() => loadSnapshot().then(data => {
    products = (data.products || []).map(product => ({ ...product, category: classify(product) }));
    dataReady = true;
    syncHeroProduct();
    document.querySelectorAll('.filter-total').forEach(total => { total.textContent = ` (${products.length})`; });
    syncCategoryCards();
    renderProducts();
    renderCart();
    initCinematicMotion();
    const routeProduct = new URLSearchParams(location.search).get('product');
    if (routeProduct) openProduct(routeProduct, false);
  }).catch(() => {
    grid.setAttribute('aria-busy', 'false');
    document.getElementById('catalog-loading').hidden = true;
    document.getElementById('results-line').textContent = strings.error;
    grid.innerHTML = `<div class="catalog-error" role="alert"><p>${escape(strings.error)}</p><button class="text-button" id="retry-catalog" type="button">${escape(strings.retry)}</button></div>`;
    document.getElementById('retry-catalog').addEventListener('click', () => location.reload());
    renderCart();
  }));

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  function init3DCinematicWorld(hero, canvas, isArabic, mobile) {
    if (!window.THREE) return null;
    const T = window.THREE;
    let width = hero.clientWidth || window.innerWidth;
    let height = hero.clientHeight || window.innerHeight;

    let renderer;
    try {
      renderer = new T.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
    } catch (_) {
      return null;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(width, height, false);
    if (T.SRGBColorSpace) renderer.outputColorSpace = T.SRGBColorSpace;

    const scene = new T.Scene();
    scene.background = new T.Color(0x10171b);

    const camera = new T.PerspectiveCamera(
      (width <= 700) ? 54 : 46,
      width / height,
      0.1,
      100
    );
    camera.position.set(0, 0.12, 6.4);
    camera.lookAt(0, 0, -1.0);

    let currentP = 0;
    const loader = new T.TextureLoader();
    const loadTex = (url) => {
      const t = loader.load(url, () => {
        if (typeof fitPlate === 'function') fitPlate();
        if (typeof computeTarget === 'function') computeTarget();
        if (typeof update === 'function') update(currentP);
      });
      if (T.SRGBColorSpace) t.colorSpace = T.SRGBColorSpace;
      return t;
    };

    const dirtyTex = loadTex('/assets/kitchen-film-dirty.png');
    const cleanTex = loadTex('/assets/kitchen-film-clean.png');
    const bottleTex = loadTex(isArabic ? '/assets/per-actif-cutout-ar.png' : '/assets/per-actif-cutout.png');
    const foamTex = loadTex('/assets/foam_texture.jpg');

    // In RTL (Arabic), the photo plate is mirrored so cutting board is on the right,
    // balancing the Arabic headline & logo on the right and bottle on the left.
    const sign = isArabic ? -1 : 1;
    const impactUv = new T.Vector2(isArabic ? 0.67 : 0.33, 0.35);

    // 1. Background Film Plate with Aspect-Corrected Clean Wave Shader
    const filmUniforms = {
      tDirty: { value: dirtyTex },
      tClean: { value: cleanTex },
      uClean: { value: 0 },
      uImpact: { value: impactUv },
      uAspect: { value: 16 / 9 },
      uFlipX: { value: isArabic ? 1.0 : 0.0 }
    };

    const plateMat = new T.ShaderMaterial({
      uniforms: filmUniforms,
      vertexShader: `
        uniform float uFlipX;
        varying vec2 vUv;
        void main() {
          vUv = vec2(uFlipX > 0.5 ? (1.0 - uv.x) : uv.x, uv.y);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDirty;
        uniform sampler2D tClean;
        uniform float uClean;
        uniform vec2 uImpact;
        uniform float uAspect;
        varying vec2 vUv;

        void main() {
          vec4 colDirty = texture2D(tDirty, vUv);
          vec4 colClean = texture2D(tClean, vUv);

          vec2 diff = vUv - uImpact;
          diff.x *= uAspect;
          float dist = length(diff);

          float r = mix(-0.06, 1.72, uClean);
          float mask = smoothstep(0.08, -0.06, dist - r);

          float sheenDist = abs(dist - r);
          float sheen = smoothstep(0.065, 0.0, sheenDist) * smoothstep(0.0, 0.12, uClean) * smoothstep(1.0, 0.88, uClean);
          vec3 sheenColor = vec3(0.85, 0.95, 1.0) * sheen * 1.5;

          vec3 finalColor = mix(colDirty.rgb, colClean.rgb, mask) + sheenColor;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });

    const plate = new T.Mesh(new T.PlaneGeometry(16, 9), plateMat);
    plate.position.set(0, 0, -4.0);
    scene.add(plate);

    // Fit plate to camera frustum so zero black voids occur at any aspect ratio
    function fitPlate() {
      if (typeof camera === 'undefined' || !camera || typeof plate === 'undefined' || !plate) return;
      const dist = camera.position.z - plate.position.z;
      const vFov = (camera.fov * Math.PI) / 180;
      const vHeight = 2 * dist * Math.tan(vFov / 2);
      const vWidth = vHeight * camera.aspect;
      const plateAspect = 16 / 9;
      let s;
      if (camera.aspect > plateAspect) {
        s = (vWidth / 16) * 1.34;
      } else {
        s = (vHeight / 9) * 1.34;
      }
      plate.scale.set(s, s, 1);
    }

    // 2. Product Group (Bottle + Grounded Contact Shadow)
    const product = new T.Group();
    scene.add(product);

    const bottleMesh = new T.Mesh(
      new T.PlaneGeometry(1.65, 4.14),
      new T.MeshBasicMaterial({ map: bottleTex, transparent: true, depthWrite: false })
    );
    // Uses authentic per-actif-cutout-ar.png so Arabic label text is 100% legible while nozzle aims right
    product.add(bottleMesh);

    // Contact shadow canvas
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(64, 64, 2, 64, 64, 60);
    sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.82)');
    sGrad.addColorStop(0.35, 'rgba(0, 0, 0, 0.55)');
    sGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.18)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 128);
    const shadowTex = new T.CanvasTexture(shadowCanvas);

    const shadow = new T.Mesh(
      new T.PlaneGeometry(2.35, 0.62),
      new T.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.85, depthWrite: false })
    );
    shadow.position.set(0, -2.06, -0.12);
    product.add(shadow);

    // 3. Foam Lather on the Cutting Board
    const foam = new T.Mesh(
      new T.PlaneGeometry(2.2, 1.25),
      new T.MeshBasicMaterial({ map: foamTex, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false })
    );
    scene.add(foam);

    // 4. Mist Spray Particle Stream
    const pCount = 280;
    const pPositions = new Float32Array(pCount * 3);
    const pSpeeds = new Float32Array(pCount);
    const pAngles = new Float32Array(pCount);
    const pRadii = new Float32Array(pCount);
    for (let i = 0; i < pCount; i++) {
      pSpeeds[i] = 0.85 + Math.random() * 0.45;
      pAngles[i] = Math.random() * Math.PI * 2;
      pRadii[i] = Math.sqrt(Math.random());
    }
    const sprayGeo = new T.BufferGeometry();
    sprayGeo.setAttribute('position', new T.BufferAttribute(pPositions, 3));

    const mistCanvas = document.createElement('canvas');
    mistCanvas.width = 64;
    mistCanvas.height = 64;
    const mCtx = mistCanvas.getContext('2d');
    const mGrad = mCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
    mGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    mGrad.addColorStop(0.2, 'rgba(240, 250, 255, 0.85)');
    mGrad.addColorStop(0.55, 'rgba(200, 235, 255, 0.35)');
    mGrad.addColorStop(1, 'rgba(200, 235, 255, 0)');
    mCtx.fillStyle = mGrad;
    mCtx.fillRect(0, 0, 64, 64);
    const mistTex = new T.CanvasTexture(mistCanvas);

    const sprayMat = new T.PointsMaterial({
      size: mobile ? 0.08 : 0.065,
      map: mistTex,
      transparent: true,
      opacity: 0,
      blending: T.AdditiveBlending,
      depthWrite: false
    });
    const spray = new T.Points(sprayGeo, sprayMat);
    scene.add(spray);

    // Scratch vectors
    const nozzleLocal = new T.Vector3(isArabic ? 0.48 : -0.48, 1.80, 0.02);
    const nozzleWorld = new T.Vector3();
    const targetWorld = new T.Vector3();
    const streamDir = new T.Vector3();
    const upVec = new T.Vector3(0, 1, 0);
    const sideVec = new T.Vector3();
    const coneUpVec = new T.Vector3();

    function computeTarget() {
      if (typeof plate === 'undefined' || !plate) return;
      const u = isArabic ? 0.67 : 0.33;
      const v = 0.35;
      targetWorld.set(
        (u - 0.5) * 16 * plate.scale.x + plate.position.x,
        (v - 0.5) * 9 * plate.scale.y + plate.position.y,
        plate.position.z + 0.12
      );
    }

    function render() {
      if (typeof renderer === 'undefined' || !renderer || typeof camera === 'undefined' || !camera) return;
      renderer.render(scene, camera);
    }

    function update(p) {
      if (typeof camera === 'undefined' || !camera || typeof plate === 'undefined' || !plate || typeof product === 'undefined' || !product || typeof foam === 'undefined' || !foam || typeof sprayMat === 'undefined' || !sprayMat) return;
      currentP = p;
      if (p < 0.20) {
        const t = p / 0.20;
        camera.position.set(0, 0.12 - t * 0.04, 6.4 - t * 0.2);
        camera.lookAt(sign * -0.35, -0.32, -1.0);
      } else if (p < 0.45) {
        const t = (p - 0.20) / 0.25;
        camera.position.set(sign * -t * 0.15, 0.08 - t * 0.14, 6.2 - t * 0.7);
        camera.lookAt(sign * (-0.35 - t * 0.10), -0.32 - t * 0.12, -1.0);
      } else if (p < 0.65) {
        camera.position.set(sign * -0.15, -0.06, 5.5);
        camera.lookAt(sign * -0.45, -0.44, -1.0);
      } else if (p < 0.85) {
        const t = (p - 0.65) / 0.20;
        camera.position.set(sign * (-0.15 + t * 0.15), -0.06 + t * 0.12, 5.5 + t * 0.6);
        camera.lookAt(sign * (-0.45 + t * 0.15), -0.44 + t * 0.15, -1.0);
      } else {
        const t = (p - 0.85) / 0.15;
        camera.position.set(0, 0.06 + t * 0.04, 6.1 + t * 0.2);
        camera.lookAt(sign * (-0.30 + t * 0.10), -0.29 + t * 0.05, -1.0);
      }

      fitPlate();
      computeTarget();

      foam.position.copy(targetWorld);
      foam.position.y += 0.05;
      foam.position.z += 0.03;
      foam.rotation.x = -Math.PI / 7;

      const startX = sign * (mobile ? 3.0 : 4.4);
      const targetX = sign * (mobile ? 0.50 : 1.90);
      const settleX = sign * (mobile ? 0.55 : 2.15);
      const baseScale = mobile ? 0.54 : 0.82;
      const baseY = mobile ? -0.85 : -1.02;

      if (p < 0.22) {
        product.visible = false;
        product.position.set(startX, baseY, 0.4);
      } else if (p < 0.46) {
        product.visible = true;
        const t = (p - 0.22) / 0.24;
        const ease = 1 - Math.pow(1 - t, 3);
        const bounce = Math.sin(t * Math.PI) * 0.12;
        product.position.x = startX + (targetX - startX) * ease;
        product.position.y = baseY + bounce;
        product.rotation.z = sign * (1 - ease) * 0.08;
        product.scale.setScalar(baseScale);
      } else if (p < 0.65) {
        product.visible = true;
        product.position.x = targetX;
        product.position.y = baseY;
        const sprayT = Math.sin(Math.min(1, Math.max(0, (p - 0.48) / 0.17)) * Math.PI);
        product.rotation.z = sign * -sprayT * 0.045;
        product.scale.setScalar(baseScale);
      } else if (p < 0.85) {
        product.visible = true;
        const t = (p - 0.65) / 0.20;
        product.position.x = targetX + (settleX - targetX) * t;
        product.position.y = baseY;
        product.rotation.z = 0;
        product.scale.setScalar(baseScale);
      } else {
        product.visible = p < 0.99;
        const t = (p - 0.85) / 0.15;
        product.position.x = settleX + sign * t * 0.15;
        product.position.y = baseY;
        product.rotation.z = 0;
        product.scale.setScalar(baseScale * (1 - t * 0.06));
      }

      product.updateMatrixWorld(true);
      product.localToWorld(nozzleWorld.copy(nozzleLocal));

      if (p >= 0.48 && p <= 0.65) {
        const action = (p - 0.48) / 0.17;
        const mistAlpha = Math.sin(action * Math.PI);
        sprayMat.opacity = mistAlpha * 0.92;

        streamDir.subVectors(targetWorld, nozzleWorld);
        const dist = streamDir.length();
        const normDir = streamDir.clone().normalize();

        sideVec.crossVectors(normDir, upVec).normalize();
        coneUpVec.crossVectors(sideVec, normDir).normalize();

        const arr = sprayGeo.attributes.position.array;
        for (let i = 0; i < pCount; i++) {
          const travel = ((action * 2.4 * pSpeeds[i]) + (i / pCount)) % 1.0;
          const coneSpread = (0.012 + travel * 0.22) * pRadii[i];
          const angle = pAngles[i];
          const gravityDip = travel * travel * 0.10;

          const px = nozzleWorld.x + normDir.x * travel * dist + (sideVec.x * Math.cos(angle) + coneUpVec.x * Math.sin(angle)) * coneSpread;
          const py = nozzleWorld.y + normDir.y * travel * dist + (sideVec.y * Math.cos(angle) + coneUpVec.y * Math.sin(angle)) * coneSpread - gravityDip;
          const pz = nozzleWorld.z + normDir.z * travel * dist + (sideVec.z * Math.cos(angle) + coneUpVec.z * Math.sin(angle)) * coneSpread;

          arr[i * 3 + 0] = px;
          arr[i * 3 + 1] = py;
          arr[i * 3 + 2] = pz;
        }
        sprayGeo.attributes.position.needsUpdate = true;
      } else {
        sprayMat.opacity = 0;
      }

      if (p < 0.52) {
        foam.material.opacity = 0;
        foam.scale.set(0.1, 0.1, 1);
      } else if (p < 0.65) {
        const t = (p - 0.52) / 0.13;
        foam.material.opacity = t * 0.85;
        const s = 0.2 + t * 0.85;
        foam.scale.set(s * 1.3, s * 0.75, 1);
      } else if (p < 0.82) {
        const t = (p - 0.65) / 0.17;
        foam.material.opacity = Math.max(0, (1 - t * 1.25) * 0.85);
        const s = 1.05 + t * 0.15;
        foam.scale.set(s * 1.3, s * 0.75, 1);
      } else {
        foam.material.opacity = 0;
      }

      if (p < 0.58) {
        filmUniforms.uClean.value = 0;
      } else if (p < 0.85) {
        const t = (p - 0.58) / 0.27;
        filmUniforms.uClean.value = t;
      } else {
        filmUniforms.uClean.value = 1;
      }

      render();
    }

    function resize() {
      width = hero.clientWidth || window.innerWidth;
      height = hero.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.fov = (width <= 700) ? 54 : 46;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      fitPlate();
      computeTarget();
      render();
    }

    window.addEventListener('resize', resize);
    update(0);

    return {
      update,
      destroy() {
        window.removeEventListener('resize', resize);
        renderer.dispose();
      }
    };
  }
  function initCinematicMotion() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !window.gsap || !window.ScrollTrigger) return;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    const hero = document.querySelector('.opening');
    const headline = document.querySelector('.opening-copy');
    const product = document.querySelector('.opening-product-stage');
    const lockup = document.querySelector('.opening-lockup');
    const step = document.querySelector('.opening-step');
    const productImg = document.querySelector('#hero-product-img');
    const contactShadow = document.querySelector('.cinema-contact-shadow');
    const reflection = document.querySelector('.cinema-reflection');
    const callout = document.querySelector('.opening-action-callout');
    const canvas = document.getElementById('cinema-canvas');

    const stepNames = isArabic
      ? ['فوضى', 'اقتراب', 'تركيز', 'رش', 'تحوّل', 'نقاء']
      : ['MESS', 'APPROACH', 'MACRO', 'ACTION', 'TRANSFORM', 'CLEAN'];
    const arabicNums = ['٠١', '٠٢', '٠٣', '٠٤', '٠٥', '٠٦'];
    const stepNumEl = document.querySelector('.opening-num');

    // Initialize 3D Three.js WebGL Scene
    const cinema3D = (canvas && hero) ? init3DCinematicWorld(hero, canvas, isArabic, mobile) : null;
    window.__cinema3D = cinema3D;

    if (hero && headline && product && lockup) {
      function updateStep(p) {
        const idx = p < 0.20 ? 0 : p < 0.40 ? 1 : p < 0.50 ? 2 : p < 0.64 ? 3 : p < 0.82 ? 4 : 5;
        if (step) {
          step.textContent = stepNames[idx];
        }
        if (stepNumEl) {
          stepNumEl.textContent = isArabic ? arabicNums[idx] : ('0' + (idx + 1));
        }
      }

      const film = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate: function() {
          const p = this.progress();
          updateStep(p);
          if (cinema3D) cinema3D.update(p);
        },
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: () => '+=' + Math.round(window.innerHeight * (mobile ? 2.8 : 3.4)),
          scrub: 0.65,
          pin: hero,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            updateStep(self.progress);
            if (cinema3D) cinema3D.update(self.progress);
          }
        }
      });

      // Initial DOM states
      gsap.set(product, {
        autoAlpha: 1,
        scale: 1,
        xPercent: mobile ? -50 : 0,
        x: 0,
        y: 0,
        transformOrigin: mobile ? '50% 85%' : (isArabic ? '40% 85%' : '60% 85%')
      });
      if (productImg) gsap.set(productImg, { scaleX: 1, scaleY: 1, rotation: 0, transformOrigin: '50% 80%' });
      if (contactShadow) gsap.set(contactShadow, { opacity: 0.92, scale: 1 });
      if (reflection) gsap.set(reflection, { opacity: 0 });
      if (callout) gsap.set(callout, { opacity: 0, y: 20 });
      if (lockup) {
        gsap.set(lockup, {
          autoAlpha: 0,
          scale: 0.84,
          clipPath: isArabic ? 'circle(0 at 66% 42%)' : 'circle(0 at 34% 42%)'
        });
      }

      // 1. Headline Fade & Blur (Shot 01 -> 02)
      film.to(headline, {
        x: mobile ? (isArabic ? 35 : -35) : (isArabic ? 110 : -110),
        y: mobile ? -15 : -20,
        scale: 0.84,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.28,
        ease: 'power2.inOut'
      }, 0.05);

      // 2. Product Dolly In Perspective (Shot 01 -> 02)
      film.to(product, {
        scale: mobile ? 1.25 : 1.38,
        x: mobile ? 0 : (isArabic ? 20 : -20),
        y: mobile ? 15 : 28,
        duration: 0.35,
        ease: 'power2.inOut'
      }, 0);

      // 3. Macro Tension / Trigger Primes (Shot 03: 0.40 -> 0.50)
      film.to(product, {
        scale: mobile ? 1.35 : 1.48,
        x: mobile ? 0 : (isArabic ? 35 : -35),
        y: mobile ? 28 : 42,
        duration: 0.12,
        ease: 'power1.inOut'
      }, 0.38);

      if (productImg) {
        film.to(productImg, {
          rotation: isArabic ? 3.5 : -3.5,
          duration: 0.12,
          ease: 'power1.out'
        }, 0.38);
      }

      if (callout) {
        film.to(callout, {
          opacity: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out'
        }, 0.38);
        film.to(callout, {
          opacity: 0,
          y: -15,
          duration: 0.08,
          ease: 'power2.in'
        }, 0.48);
      }

      // 4. Relax Stance after Spray & Reveal Reflection (Shot 05: 0.64 -> 0.82)
      if (productImg) {
        film.to(productImg, {
          rotation: 0,
          duration: 0.18,
          ease: 'power2.inOut'
        }, 0.64);
      }

      if (reflection) {
        film.to(reflection, {
          opacity: 0.70,
          duration: 0.20,
          ease: 'power2.out'
        }, 0.68);
      }

      // 5. Final Settle & Official Brand Lockup (Shot 06: 0.82 -> 1.00)
      film.to(product, {
        scale: mobile ? 0.92 : 0.98,
        x: mobile ? 0 : (isArabic ? 30 : -30),
        y: 0,
        duration: 0.18,
        ease: 'power2.inOut'
      }, 0.82);

      film.to(lockup, {
        clipPath: isArabic ? 'circle(150% at 66% 42%)' : 'circle(150% at 34% 42%)',
        autoAlpha: 1,
        scale: 1,
        duration: 0.18,
        ease: 'power2.out'
      }, 0.82);
    }
    
    const categories = document.querySelector('.categories-section');
    const rail = document.getElementById('category-rail');
    const cards = [...document.querySelectorAll('.category-card')];
    if (categories && rail && cards.length) {
      if (mobile) {
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: categories,
            start: 'top 75%',
            once: true
          }
        });

        // Card 0 (Kitchen Care): rise from below + subtle scale
        if (cards[0]) {
          mobileTl.fromTo(cards[0],
            { y: 45, scale: 0.90, opacity: 0, rotationX: 8 },
            { y: 0, scale: 1, opacity: 1, rotationX: 0, duration: 0.65, ease: 'power2.out' },
            0.0
          );
        }

        // Card 1 (Laundry Care): enter from side + slight rotation
        if (cards[1]) {
          mobileTl.fromTo(cards[1],
            { x: isArabic ? -40 : 40, rotation: isArabic ? -3 : 3, opacity: 0, scale: 0.93 },
            { x: 0, rotation: 0, opacity: 1, scale: 1, duration: 0.68, ease: 'power2.out' },
            0.12
          );
        }

        // Card 2 (Bathroom Care): rise from depth (3D Z) + scale
        if (cards[2]) {
          mobileTl.fromTo(cards[2],
            { z: -120, y: 35, scale: 0.88, opacity: 0, rotationY: isArabic ? 6 : -6 },
            { z: 0, y: 0, scale: 1, opacity: 1, rotationY: 0, duration: 0.72, ease: 'back.out(1.2)' },
            0.24
          );
        }

        // Card 3 (Surface Care): diagonal entrance + softer movement
        if (cards[3]) {
          mobileTl.fromTo(cards[3],
            { x: isArabic ? 30 : -30, y: 35, scale: 0.92, opacity: 0, rotation: isArabic ? 2 : -2 },
            { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, duration: 0.70, ease: 'power2.out' },
            0.36
          );
        }

        // Card 4 (Home Essentials): float upward + soft spring settling
        if (cards[4]) {
          mobileTl.fromTo(cards[4],
            { y: 50, scale: 0.92, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'back.out(1.3)' },
            0.48
          );
        }

        ScrollTrigger.refresh();
        return;
      }
      const sequence = gsap.timeline({
        scrollTrigger: {
          trigger: categories,
          start: 'top top',
          end: () => '+=' + Math.round(window.innerHeight * 1.15),
          scrub: 0.5,
          pin: categories,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
      cards.forEach((card, index) => {
        const offset = index * 0.14;
        sequence.fromTo(card,
          {
            y: 48,
            z: -180,
            scale: 0.88,
            rotationX: 12,
            rotationY: isArabic ? -6 : 6,
            opacity: index === 0 ? 0.9 : 0,
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          },
          {
            y: 0,
            z: 0,
            scale: 1.0,
            rotationX: 0,
            rotationY: 0,
            opacity: 1,
            boxShadow: '0 18px 35px rgba(0,0,0,0.28)',
            duration: 0.22,
            ease: 'power2.out'
          },
          offset
        );
      });
    }
    ScrollTrigger.refresh();
    if (window.Lenis && window.matchMedia('(pointer: fine)').matches && !reducedMotion) {
      const lenis = new window.Lenis({
        duration: 0.92,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.0,
        syncTouch: false
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;
    }
  }})();
