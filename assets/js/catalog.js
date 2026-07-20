import { renderErrorState } from './ui/errorState.js';
// Precios ocultos temporalmente a pedido del cliente (ver más abajo).
// formatPrice se mantiene importado para poder reactivar el precio fácilmente.
import { formatPrice } from './utils/format.js';

/**
 * Product Catalog V2: Staggered reveal & High Depth Cards
 */
export function renderCatalog(products) {
    const grid = document.getElementById('product-grid');
    if (!grid || !products) return;

    if (products.length === 0) {
        renderErrorState(grid, {
            title: 'Sin productos disponibles',
            message: 'Todavía no hay productos publicados en el catálogo. Vuelve a intentarlo más tarde.',
            showWhatsApp: true
        });
        return;
    }

    // Las primeras tarjetas cubren la fila visible sin hacer scroll (hasta
    // 4 columnas en desktop): se cargan de inmediato para que no "aparezcan"
    // tarde. El resto usa lazy-load propio (ver utils/lazyImages.js).
    const EAGER_COUNT = 4;

    grid.innerHTML = products.map((p, i) => {
        const imgSrc = p.images[3] || p.images[0];
        const isEager = i < EAGER_COUNT;
        const imgClass = `max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110${isEager ? '' : ' lazy-img'}`;
        const imgSrcAttr = isEager ? `src="${imgSrc}"` : `data-src="${imgSrc}"`;

        return `
        <a href="/product/?id=${p.id}"
           class="reveal group"
           style="transition-delay: ${i * 100}ms">
            <div class="premium-card-v2 h-full flex flex-col overflow-hidden">
                <div class="relative overflow-hidden aspect-square bg-gray-50 flex items-center justify-center p-6 group-hover:bg-white transition-colors">
                    <img ${imgSrcAttr} alt="${p.name}" decoding="async" class="${imgClass}">
                    <div class="absolute top-4 left-4">
                        <span class="bg-primary-soft text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">RC</span>
                    </div>
                </div>
                <div class="p-6 border-t-4 border-primary-soft">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-heading font-bold text-black uppercase leading-tight">${p.name}</h3>
                    </div>
                    <p class="text-gray-500 text-xs font-body line-clamp-2 mb-6 leading-relaxed">${p.description}</p>
                    <div class="flex items-center justify-between">
                        <!-- <span class="text-xl font-heading font-bold text-black">${formatPrice(p.price)}</span> -->
                        <div class="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white group-hover:bg-primary-soft group-hover:text-black transition-all" aria-hidden="true">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </a>
        `;
    }).join('');

    // initScrollReveal() e initLazyImages() se ejecutan una sola vez de forma
    // centralizada en app.js, después de que el DOM ya tiene todo su contenido.
}

/**
 * Muestra un estado de error amigable en el grid del catálogo
 * (por ejemplo cuando falla la carga de products.json).
 */
export function renderCatalogError(onRetry) {
    const grid = document.getElementById('product-grid');
    renderErrorState(grid, {
        title: 'No pudimos cargar el catálogo',
        message: 'Ocurrió un problema al conectar con el servidor. Verifica tu conexión a internet e intenta de nuevo.',
        onRetry
    });
}
