import re

# Read the new English index.html
with open('index.html', 'r', encoding='utf-8') as f:
    en_html = f.read()

# Read the old Arabic index.html to extract the product catalog
with open('ar/index.html', 'r', encoding='utf-8') as f:
    old_ar_html = f.read()

# Extract old Arabic products
products_match = re.search(r'<div class="product-grid">(.*?)</div>\s*</div>\s*</section>', old_ar_html, re.DOTALL)
if products_match:
    old_products = products_match.group(1)
    
    # Parse and reformat old Arabic products into the new structure
    new_products_html = []
    card_matches = re.finditer(r'<div class="product-card">.*?<img src="(.*?)".*?alt="(.*?)".*?<h4 class="card-title">(.*?)</h4>.*?<span class="card-price">(.*?)</span>', old_products, re.DOTALL)
    
    for m in card_matches:
        img_url = m.group(1).strip()
        img_alt = m.group(2).strip()
        title = m.group(3).strip()
        price = m.group(4).strip()
        
        product_html = f"""
            <div class="catalog-product">
                <div class="cp-image-wrap">
                    <img src="{img_url}" alt="{img_alt}" loading="lazy">
                </div>
                <div class="cp-info">
                    <h4>{title}</h4>
                    <div class="cp-action">
                        <span class="cp-price">{price}</span>
                        <button class="btn-icon add-to-cart-btn" data-title="{title}" data-price="{price}">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        </button>
                    </div>
                </div>
            </div>"""
        new_products_html.append(product_html)
    
    products_replacement = "\n".join(new_products_html)
else:
    products_replacement = "<!-- Error parsing Arabic products -->"

# Now translate the English HTML structure
ar_html = en_html

# HTML / Head
ar_html = ar_html.replace('<html lang="en">', '<html lang="ar" dir="rtl">')
ar_html = ar_html.replace('Per Clean - Premium Care', 'بير كلين - العناية الفائقة')
ar_html = ar_html.replace('<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700;900&display=swap" rel="stylesheet">', '<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet">\n    <style>body { font-family: "Cairo", "Montserrat", sans-serif; }</style>')

# Nav
ar_html = ar_html.replace('Care Solutions', 'الحلول')
ar_html = ar_html.replace('Collection', 'المتجر')
ar_html = ar_html.replace('href="/ar/" class="lang-switch">عربي</a>', 'href="/" class="lang-switch">English</a>')

# Intro
ar_html = ar_html.replace('CHAOS.', 'فوضى.')
ar_html = ar_html.replace('THE INEVITABLE STATE OF LIFE.', 'زيوت محترقة. دهون صعبة. بقع عنيدة.')
ar_html = ar_html.replace('PURITY.', 'النقاء.')
ar_html = ar_html.replace('RESTORED TO PERFECTION.', 'التحول الجذري.')

# Category 1
ar_html = ar_html.replace('01 // KITCHEN CARE', '٠١ // العناية بالمطبخ')
ar_html = ar_html.replace('CUT THROUGH THE GREASE.', 'اقضِ على الدهون.')
ar_html = ar_html.replace('Heavy duty degreaser engineered for stoves, hoods, and tough stains.', 'مزيل قوي للدهون والبقع للأفران والشفاطات.')
ar_html = ar_html.replace('Per Actif 5KG', 'بير أكتيف ٥ كيلو')
ar_html = ar_html.replace('450.00 EGP', '٤٥٠.٠٠ ج.م')

# Category 2
ar_html = ar_html.replace('02 // LAUNDRY CARE', '٠٢ // غسيل الملابس')
ar_html = ar_html.replace('FIBER-DEEP PURITY.', 'نقاء يتخلل الألياف.')
ar_html = ar_html.replace('Premium liquid detergent gel for automatic washing machines. Tough on stains, gentle on fabrics.', 'چل منظف للملابس للغسالات الاتوماتيك بجودة فائقة.')
ar_html = ar_html.replace('Perwash Gel 5KG', 'بيرووش چل ٥ كيلو')
ar_html = ar_html.replace('410.00 EGP', '٤١٠.٠٠ ج.م')

# Category 3
ar_html = ar_html.replace('03 // FABRIC CARE', '٠٣ // العناية بالأقمشة')
ar_html = ar_html.replace('THE TOUCH OF SOFTNESS.', 'لمسة من النعومة.')
ar_html = ar_html.replace('Anti-static fabric softener infused with long-lasting premium fragrances.', 'منعم ومعطر للملابس ومضاد للشحنات الاستاتيكية.')
ar_html = ar_html.replace('Per Soft 5KG', 'بير سوفت ٥ كيلو')
ar_html = ar_html.replace('380.00 EGP', '٣٨٠.٠٠ ج.م')

# Category 4
ar_html = ar_html.replace('04 // SURFACE DISINFECTANT', '٠٤ // تعقيم الأسطح')
ar_html = ar_html.replace('ABSOLUTE STERILITY.', 'تعقيم مطلق.')
ar_html = ar_html.replace('Hard surface disinfectant liquid. Clinically proven to eliminate 99% of germs.', 'سائل مطهر لجميع الاسطح يقضي على (99%) من الجراثيم.')
ar_html = ar_html.replace('Germol 5KG', 'جيرمول ٥ كيلو')
ar_html = ar_html.replace('870.00 EGP', '٨٧٠.٠٠ ج.م')

ar_html = ar_html.replace('ADD TO CART', 'أضف إلى السلة')

# Shop
ar_html = ar_html.replace('THE COMPLETE COLLECTION', 'المجموعة الكاملة')
ar_html = ar_html.replace('Uncompromising quality for every environment.', 'جودة لا مثيل لها لكل بيئة.')

# Replace the grid with Arabic products
ar_html = re.sub(r'<div class="catalog-grid">.*?</div>\s*</section>', f'<div class="catalog-grid">\n{products_replacement}\n</div>\n</section>', ar_html, flags=re.DOTALL)

# Footer
ar_html = ar_html.replace('All rights reserved.', 'جميع الحقوق محفوظة.')

with open('ar/index.html', 'w', encoding='utf-8') as f:
    f.write(ar_html)
