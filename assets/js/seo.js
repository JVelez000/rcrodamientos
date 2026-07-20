import { SITE_DOMAIN } from './config.js';

/**
 * SEO & Structured Data Dynamic Updates
 */
export function updateProductSEO(product) {
    if (!product) return;

    // 1. Update Document Title with Keywords
    document.title = `${product.name} | RC RODAMIENTOS - Rodamientos Industriales Colombia`;

    // 2. Update Description with Rich Keywords
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = `${product.description} Cotiza ${product.name} en RC RODAMIENTOS. Distribuidor líder de rodamientos industriales en Colombia. Envío rápido y atención personalizada por WhatsApp.`;
    }

    // 3. Add/Update Keywords Meta Tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = `${product.name}, ${product.name} colombia, rodamientos industriales, repuestos construcción, rc rodamientos, cotizar ${product.name}, comprar ${product.name}`;

    // 4. Update OG Tags
    const ogTitle = document.getElementById('og-title');
    if (ogTitle) ogTitle.content = `${product.name} | RC RODAMIENTOS - Cotiza Ahora`;

    const ogDesc = document.getElementById('og-description');
    if (ogDesc) ogDesc.content = `${product.description} Distribuidor líder en Colombia con más de 10 años de experiencia.`;

    const ogImg = document.getElementById('og-image');
    if (ogImg) ogImg.content = `${SITE_DOMAIN}${product.images[0]}`;

    // 5. Update canonical URL
    const canonical = document.getElementById('canonical-link');
    if (canonical) canonical.href = window.location.href;

    // 6. Inject JSON-LD Product Schema with Enhanced Data
    const schemaScript = document.getElementById('product-schema');
    if (schemaScript) {
        const schemaData = {
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.name,
            image: product.images.map(img => `${SITE_DOMAIN}${img}`),
            description: product.description,
            sku: product.id.toString(),
            brand: {
                '@type': 'Brand',
                name: 'RC RODAMIENTOS'
            },
            offers: {
                '@type': 'Offer',
                url: window.location.href,
                priceCurrency: 'COP',
                price: product.price,
                priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                availability: 'https://schema.org/InStock',
                seller: {
                    '@type': 'Organization',
                    name: 'RC RODAMIENTOS'
                }
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '127'
            }
        };
        schemaScript.textContent = JSON.stringify(schemaData);
    }
}
