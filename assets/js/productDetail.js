import { WHATSAPP_PHONE } from './config.js';
// Precios ocultos temporalmente a pedido del cliente (ver más abajo).
// formatPrice se mantiene importado para poder reactivar el precio fácilmente.
import { formatPrice } from './utils/format.js';
import { updateProductSEO } from './seo.js';
import { renderErrorState } from './ui/errorState.js';

let currentSelections = {};
let activeImageSrc = null;

function renderBackButton() {
    const bb = document.getElementById('back-button-container');
    if (!bb) return;
    bb.innerHTML = `
        <div class="mb-8">
            <a href="/" class="group inline-flex items-center gap-3 px-5 py-3 bg-gray-50 hover:bg-primary-soft border border-gray-200 hover:border-primary-soft rounded-lg transition-all">
                <div class="w-8 h-8 rounded-full bg-black group-hover:bg-black flex items-center justify-center text-primary-soft transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
                    </svg>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-black">Volver al Catálogo</span>
            </a>
        </div>
    `;
}

/**
 * Estado de "no encontrado" o error de red en la página de detalle,
 * para que el cliente sepa qué pasó en vez de ver una página en blanco.
 */
export function renderProductNotFound({ networkError = false } = {}) {
    renderBackButton();
    const container = document.getElementById('product-detail');
    if (!container) return;

    container.className = 'bg-white p-6 lg:p-12 shadow-premium rounded-sm reveal active';

    renderErrorState(container, {
        title: networkError ? 'Error de conexión' : 'Producto no encontrado',
        message: networkError
            ? 'No pudimos cargar la información de este producto. Verifica tu conexión a internet e intenta de nuevo.'
            : 'El producto que buscas no existe o fue removido del catálogo.',
        onRetry: networkError ? () => window.location.reload() : null
    });
}

/**
 * Detailed View V2.2: Interaction & Price Logic
 */
export function renderProductDetail(product) {
    const container = document.getElementById('product-detail');
    if (!container) return;

    // Reset state for this product
    currentSelections = {};
    activeImageSrc = product.images[0];

    // Initialize default selections
    if (product.showOptions) {
        Object.keys(product.showOptions).forEach(key => {
            if (product.options[key] && product.options[key].length > 0) {
                currentSelections[key] = product.options[key][0];
            }
        });
    }

    // Helper to calculate price based on current selections
    const calculatePrice = () => {
        let p = product.price;
        Object.values(currentSelections).forEach(sel => {
            if (sel && typeof sel === 'object' && sel.price) {
                p = sel.price;
            }
        });
        return p;
    };

    // Helper to update all dynamic elements on screen
    const updateUIState = () => {
        // Update Price Displays
        // const unitPrice = calculatePrice();
        // const qtyInput = document.getElementById('qty-input');
        // const qty = qtyInput?.value === '' ? 0 : parseInt(qtyInput?.value) || 0;
        // const totalPrice = unitPrice * qty;
        // const upEl = document.getElementById('product-price-display');
        // const tpEl = document.getElementById('total-price-display');
        // if (upEl) upEl.textContent = formatPrice(unitPrice);
        // if (tpEl) tpEl.textContent = formatPrice(totalPrice);

        // Update Option Buttons Active States
        document.querySelectorAll('.option-btn').forEach(btn => {
            const key = btn.dataset.key;
            const idx = parseInt(btn.dataset.index);
            const val = product.options[key][idx];
            const current = currentSelections[key];

            const isActive = (typeof val === 'object' ? current && val.label === current.label : val === current);
            if (isActive) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    };

    // --- RENDER BASE STRUCTURE ---

    renderBackButton();

    container.className = 'bg-white p-6 lg:p-12 shadow-premium rounded-sm reveal active';

    // Generate Options HTML
    let optsHtml = '';
    if (product.showOptions && product.options) {
        Object.entries(product.showOptions).forEach(([key, label]) => {
            if (label && product.options[key]) {
                optsHtml += `
                    <div class="mb-8">
                        <span class="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">${label}</span>
                        <div class="flex flex-wrap gap-2" role="group" aria-label="${label}">
                            ${product.options[key].map((val, idx) => `
                                <button type="button" onclick="window.selectOption('${key}', ${idx})"
                                        data-key="${key}" data-index="${idx}" aria-pressed="false"
                                        class="option-btn px-4 py-2 rounded text-[10px] font-bold uppercase tracking-tighter">
                                    ${typeof val === 'object' ? val.label : val}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        });
    }

    container.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-10">
            <!-- Left: Gallery -->
            <div class="lg:w-1/2">
                <div class="bg-gray-50 border border-gray-100 rounded flex items-center justify-center mb-4 relative h-[380px] overflow-hidden group">
                    <img id="main-image" src="${activeImageSrc}" alt="${product.name}"
                         class="max-h-[90%] max-w-[90%] object-contain mix-blend-multiply transition-all duration-700 group-hover:scale-105">
                </div>
                <div class="flex gap-3 overflow-x-auto pb-2" role="group" aria-label="Galería de imágenes">
                    ${product.images.map((img, i) => `
                        <img src="${img}" alt="${product.name} - vista ${i + 1}" decoding="async"
                             class="w-14 h-14 object-contain border ${img === activeImageSrc ? 'border-primary-soft' : 'border-gray-100'} rounded cursor-pointer p-1 bg-gray-50 hover:border-primary-soft transition-colors"
                             tabindex="0" role="button" aria-label="Ver imagen ${i + 1} de ${product.name}"
                             onclick="window.changeMainImage('${img}', this)"
                             onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.changeMainImage('${img}', this);}">
                    `).join('')}
                </div>
            </div>

            <!-- Right: Content -->
            <div class="lg:w-1/2 flex flex-col pt-2">
                <span class="text-primary-soft font-bold text-[9px] tracking-[0.4em] uppercase mb-1">Producto Industrial</span>
                <h1 class="text-3xl lg:text-4xl font-bold text-black mb-3 leading-tight">${product.name}</h1>
                <p class="text-sm text-gray-500 font-body mb-8 leading-relaxed">${product.description}</p>

                <!--
                <div class="grid grid-cols-2 gap-4 mb-8 py-5 border-y border-gray-100">
                    <div>
                        <span class="block text-[8px] font-bold uppercase tracking-widest text-gray-400 mb-1">Precio Unitario</span>
                        <span id="product-price-display" class="text-2xl font-bold text-black">${formatPrice(product.price)}</span>
                    </div>
                    <div class="bg-gray-50 rounded p-3 border border-gray-100">
                        <span class="block text-[8px] font-bold uppercase tracking-widest text-primary-soft mb-1">Precio Total Estimado</span>
                        <span id="total-price-display" class="text-2xl font-bold text-black">${formatPrice(product.price)}</span>
                    </div>
                </div>
                -->

                <div id="options-mount">${optsHtml}</div>

                <div class="mb-8">
                    <label for="qty-input" class="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">Cantidad</label>
                    <div class="inline-flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden h-10">
                        <button type="button" onclick="window.updateQty(-1)" aria-label="Disminuir cantidad" class="w-10 h-full hover:bg-gray-200 font-bold transition-colors">−</button>
                        <input id="qty-input" type="number" min="1" value="" placeholder="1" aria-label="Cantidad" class="w-12 h-full bg-transparent text-center font-bold text-sm border-0 focus:outline-none focus:ring-0">
                        <button type="button" onclick="window.updateQty(1)" aria-label="Aumentar cantidad" class="w-10 h-full hover:bg-gray-200 font-bold transition-colors">+</button>
                    </div>
                </div>

                <button type="button" onclick="window.sendDetailedWhatsApp()" class="btn-hero-outline w-full h-14 text-xs font-bold tracking-widest uppercase transition-all">
                    <span>Solicitar por WhatsApp</span>
                </button>
            </div>
        </div>
    `;

    // --- ATTACH INTERACTION LOGIC ---

    window.selectOption = (key, idx) => {
        currentSelections[key] = product.options[key][idx];
        updateUIState();
    };

    window.updateQty = (val) => {
        const input = document.getElementById('qty-input');
        if (!input) return;
        const current = input.value === '' ? 0 : parseInt(input.value) || 0;
        const q = current + val;
        if (q >= 1) {
            input.value = q;
            updateUIState();
        } else if (q === 0) {
            input.value = '';
            updateUIState();
        }
    };

    window.sendDetailedWhatsApp = () => {
        const qty = parseInt(document.getElementById('qty-input')?.value || 1);
        // const up = calculatePrice();
        // const total = up * qty;

        let details = `. Nombre: ${product.name}\n`;
        Object.entries(currentSelections).forEach(([key, val]) => {
            const label = product.showOptions[key];
            if (label) {
                const value = typeof val === 'object' ? (val.label || '') : val;
                details += `. ${label}: ${value}\n`;
            }
        });

        const msg = encodeURIComponent(`Hola\nMe gustaría solicitar información de:\n${details}. Cantidad: ${qty}\n\n¿Podrían confirmarme disponibilidad?`);
        // const msg = encodeURIComponent(`Hola\nMe gustaría solicitar información de:\n${details}. Cantidad: ${qty}\n. Precio Unitario: ${formatPrice(up)}\n. Precio Total: ${formatPrice(total)}\n\n¿Podrían confirmarme disponibilidad?`);
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`, '_blank', 'noopener,noreferrer');
    };

    // Bootstrap
    updateUIState();
    updateProductSEO(product);

    // Add event listener for manual quantity input
    const qtyInput = document.getElementById('qty-input');
    if (qtyInput) {
        qtyInput.addEventListener('input', () => {
            updateUIState();
        });
    }
}

window.changeMainImage = (src, el) => {
    const mainImg = document.getElementById('main-image');
    if (!mainImg || mainImg.src.endsWith(src)) return;

    activeImageSrc = src;

    // Fade out
    mainImg.classList.add('gallery-fade-out');

    setTimeout(() => {
        mainImg.src = src;
        // Fade in
        mainImg.classList.remove('gallery-fade-out');
    }, 300);

    el.parentElement.querySelectorAll('img').forEach(i => i.classList.replace('border-primary-soft', 'border-transparent'));
    el.classList.replace('border-transparent', 'border-primary-soft');
};
