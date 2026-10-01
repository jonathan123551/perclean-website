import re

import subprocess
result = subprocess.run(['git', 'show', 'HEAD:ar/index.html'], capture_output=True, text=True, encoding='utf-8')
old_ar_html = result.stdout

with open('ar/index.html', 'r', encoding='utf-8') as f:
    current_ar_html = f.read()

products_match = re.search(r'<div class="product-grid">(.*?)</div>\s*</div>\s*</section>', old_ar_html, re.DOTALL)
if products_match:
    old_products = products_match.group(1)
    
    new_products_html = []
    card_matches = re.finditer(r'<div class="product-card">.*?<img src="(.*?)".*?alt="(.*?)".*?<h4 class="card-title">(.*?)</h4>.*?<span class="card-price">(.*?)</span>', old_products, re.DOTALL)
    
    for i, m in enumerate(card_matches):
        img_url = m.group(1).strip()
        img_alt = m.group(2).strip()
        title = m.group(3).strip()
        price = m.group(4).strip()
        
        hidden_class = ' hidden-product' if i >= 8 else ''
        
        product_html = f"""
            <div class="catalog-product{hidden_class}" {'style="display: none;"' if i >= 8 else ''}>
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
    
    products_replacement += """
        </div>
        <div class="shop-all-container" style="text-align: center; margin-top: 4rem; width: 100%; grid-column: 1 / -1;">
            <button id="btn-shop-all" class="btn-premium" style="background: transparent; color: var(--text-dark); border: 1px solid #ddd;">عرض المجموعة الكاملة</button>
        </div>
    """

    new_html = re.sub(r'<div class="catalog-grid">.*?</div>\s*</section>', f'<div class="catalog-grid">\n{products_replacement}\n</section>', current_ar_html, flags=re.DOTALL)
    
    with open('ar/index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Updated ar/index.html with all 46 products and Shop All logic.")
