// --- RC RODAMIENTOS: ELEGANCIA MECÁNICA (JS V2) ---

const PRODUCTS_JSON_PATH = 'data/products.json';
const WHATSAPP_PHONE = "573502032524";

// --- UTILITIES & ANIMATIONS ---

/**
 * Advanced Scroll Reveal logic using IntersectionObserver
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    // Si el navegador no soporta IntersectionObserver, mostramos todo de una vez
    if (!('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('active'));
        return;
    }

    const observerOptions = {
        threshold: 0.05, // Más sensible
        rootMargin: "0px 0px -20px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));

    // Fallback: Si un elemento está ya en el viewport al cargar
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('active');
        }
    });
}

/**
 * Currency Formatter (High Precision)
 */
function formatPrice(price, currency = 'COP') {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
    }).format(price);
}

function hideLoader() {
    const loader = document.getElementById('global-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 600);
    }
}

// --- CORE UI COMPONENTS ---

window.toggleModal = function (show) {
    const modal = document.getElementById('contact-modal');
    const content = document.getElementById('contact-modal-content');
    if (!modal || !content) return;

    if (show) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            content.classList.remove('modal-hidden-state');
            content.classList.add('modal-visible-state');
        }, 10);
    } else {
        content.classList.remove('modal-visible-state');
        content.classList.add('modal-hidden-state');
        setTimeout(() => modal.classList.add('hidden'), 500);
    }
};

window.toggleMobileMenu = function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
};

/**
 * Navigation Bar V2: Glassmorphism & Animated Links
 */
function createNavBar() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const navLinks = [
        { href: 'index.html', text: 'Catálogo' },
        { href: 'quienes-somos/', text: 'Quiénes Somos' },
        { href: 'javascript:void(0)', text: 'Contacto', onclick: 'toggleModal(true)' }
    ];

    const desktopNav = navLinks.map(link => `
        <a href="${link.text === 'Contacto' ? 'javascript:void(0)' : link.href}" 
           ${link.onclick ? `onclick="${link.onclick}"` : ''}
           class="underline-animate px-2 py-1 text-sm font-semibold uppercase tracking-wider text-black transition-colors hover:text-gray-600">
            ${link.text}
        </a>
    `).join('');

    container.innerHTML = `
        <header class="glass-nav sticky top-0 z-[100] transition-all duration-500">
            <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="index.html" class="flex items-center group">
                    <img src="assets/images/logo.png" alt="Logo RC Rodamientos" class="h-10 w-auto mr-3 object-contain">
                    <div class="flex flex-col leading-none">
                        <span class="text-2xl font-heading font-black tracking-tighter logo-rc text-primary-soft group-hover:text-black transition-colors duration-300">RC</span>
                        <span class="text-sm font-heading font-bold tracking-[0.2em] logo-text text-black group-hover:text-primary-soft transition-colors duration-300">RODAMIENTOS</span>
                    </div>
                </a>
                
                <div class="hidden lg:flex items-center space-x-10">
                    ${desktopNav}
                </div>

                <button onclick="toggleMobileMenu()" class="lg:hidden p-2 text-black">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </nav>

            <div id="mobile-menu" class="hidden lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 py-6 animate-slideUpFade">
                <div class="flex flex-col items-center space-y-6">
                            ${navLinks.map(link => `
                                <a href="${link.href}" ${link.onclick ? `onclick="${link.onclick}"` : ''} 
                                   class="text-black font-heading font-bold text-sm uppercase tracking-widest hover:text-primary-soft transition-colors">
                                    ${link.text}
                                </a>
                            `).join('')}
                </div>
            </div>
        </header>
    `;
    renderContactModal();
}

/**
 * Footer V2: Industrial Sophistication (Compact)
 */
function createFooter() {
    const container = document.getElementById('footer-container');
    if (!container) return;

    container.innerHTML = `
        <footer class="bg-black text-white pt-12 pb-8 mt-12 relative overflow-hidden">
            <div class="footer-accent absolute top-0 left-0 w-full"></div>
            
            <div class="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-sm">
                <div>
                    <h2 class="text-2xl font-heading font-bold text-white mb-4">RC <span class="text-primary-soft">RODAMIENTOS</span></h2>
                    <p class="text-gray-400 font-body leading-relaxed max-w-xs">
                        Compromiso desde hace más de 10 años.
                    </p>
                </div>

                <div>
                    <h4 class="text-primary-soft font-heading font-bold mb-4 tracking-widest uppercase">Atención</h4>
                    <p class="text-gray-300 text-xs">Lun-Vie: 9:00-17:00 | Sáb: 9:00-17:00</p>
                    <p class="text-gray-300 text-xs">Solo atencion por whatsapp de lunes a sabado</p>
                </div>
            </div>

            <div class="container mx-auto px-8 mt-10 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
                <p>&copy; ${new Date().getFullYear()} RC RODAMIENTOS.</p>
            </div>
        </footer>
    `;
}

/**
 * Product Catalog V2: Staggered reveal & High Depth Cards
 */
function renderCatalog(products) {
    const grid = document.getElementById('product-grid');
    if (!grid || !products) return;

    grid.innerHTML = products.map((p, i) => `
        <a href="product/?id=${p.id}" 
           class="reveal group" 
           style="transition-delay: ${i * 100}ms">
            <div class="premium-card-v2 h-full flex flex-col overflow-hidden">
                <div class="relative overflow-hidden aspect-square bg-gray-50 flex items-center justify-center p-6 group-hover:bg-white transition-colors">
                    <img src="${p.images[3] || p.images[0]}" alt="${p.name}" class="max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110">
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
                        <span class="text-xl font-heading font-bold text-black">${formatPrice(p.price)}</span>
                        <div class="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white group-hover:bg-primary-soft group-hover:text-black transition-all">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    `).join('');

    initScrollReveal();
}

/**
 * Modal V2: Glassmorphism & Branded Social Buttons
 */
function renderContactModal() {
    const container = document.getElementById('contact-modal-container');
    if (!container) return;

    const links = [
        { href: `https://wa.me/${WHATSAPP_PHONE}`, label: "WhatsApp", class: "whatsapp-v2", icon: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" },
        { href: 'https://www.instagram.com/rcrodamientos/', label: "Instagram", class: "instagram-v2", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }
    ];

    container.innerHTML = `
        <div id="contact-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden z-[200] flex items-center justify-center transition-all duration-300">
            <div id="contact-modal-content" class="bg-white rounded-xl shadow-heavy p-10 w-11/12 max-w-lg modal-content-transition modal-hidden-state">
                <div class="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
                    <div>
                        <h3 class="text-3xl font-heading font-bold text-black tracking-tight">CONTACTO</h3>
                        <p class="text-gray-400 text-xs uppercase tracking-widest mt-1">Atención Inmediata</p>
                    </div>
                    <button onclick="toggleModal(false)" class="text-gray-300 hover:text-black transition-colors text-4xl">&times;</button>
                </div>
                
                <div class="space-y-4">
                    ${links.map(l => `
                        <a href="${l.href}" target="_blank" class="social-btn group ${l.class} flex items-center p-4">
                            <span class="mr-6 transition-transform group-hover:scale-125">
                                <svg class="w-8 h-8" fill="${l.label === 'Email' ? 'none' : 'currentColor'}" 
                                     stroke="${l.label === 'Email' ? 'currentColor' : 'none'}" 
                                     viewBox="0 0 24 24"><path d="${l.icon}" ${l.label === 'Email' ? 'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' : ''}></path></svg>
                            </span>
                            <span class="text-lg font-bold">${l.label}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// --- PRODUCT DETAIL PAGE LOGIC ---

const productSelection = { quantity: 1, selectedOptions: {}, currentPrice: 0 };

async function initializeApp() {
    createNavBar();
    createFooter();

    const content = document.getElementById('page-content');
    if (content) content.classList.add('page-load-reveal');

    const path = window.location.pathname;
    if (path.includes('product/')) {
        const id = new URLSearchParams(window.location.search).get('id');
        if (id) {
            const products = await fetch(PRODUCTS_JSON_PATH).then(r => r.json());
            const product = products.find(p => p.id == id);
            renderProductDetail(product);
        }
    } else {
        const products = await fetch(PRODUCTS_JSON_PATH).then(r => r.json());
        renderCatalog(products);
    }

    setTimeout(hideLoader, 600);
}

/**
 * Global Product State
 */
let currentProduct = null;
let currentSelections = {};
let activeImageSrc = null;

/**
 * Detailed View V2.2: Interaction & Price Logic
 */
async function renderProductDetail(product) {
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
        const unitPrice = calculatePrice();
        const qtyInput = document.getElementById('qty-input');
        const qtyValue = qtyInput?.value;
        const qty = qtyValue === '' ? 0 : parseInt(qtyValue) || 0;
        const totalPrice = unitPrice * qty;

        // Update Price Displays
        const upEl = document.getElementById('product-price-display');
        const tpEl = document.getElementById('total-price-display');
        if (upEl) upEl.textContent = formatPrice(unitPrice);
        if (tpEl) tpEl.textContent = formatPrice(totalPrice);

        // Update Option Buttons Active States
        document.querySelectorAll('.option-btn').forEach(btn => {
            const key = btn.dataset.key;
            const idx = parseInt(btn.dataset.index);
            const val = product.options[key][idx];
            const current = currentSelections[key];

            const isActive = (typeof val === 'object' ? current && val.label === current.label : val === current);
            if (isActive) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    };

    // --- RENDER BASE STRUCTURE ---

    // Back Button
    const bb = document.getElementById('back-button-container');
    if (bb) {
        bb.innerHTML = `
            <div class="mb-8">
                <a href="index.html" class="group inline-flex items-center gap-3 px-5 py-3 bg-gray-50 hover:bg-primary-soft border border-gray-200 hover:border-primary-soft rounded-lg transition-all">
                    <div class="w-8 h-8 rounded-full bg-black group-hover:bg-black flex items-center justify-center text-primary-soft transition-all">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
                        </svg>
                    </div>
                    <span class="text-[10px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-black">Volver al Catálogo</span>
                </a>
            </div>
        `;
    }

    container.className = "bg-white p-6 lg:p-12 shadow-premium rounded-sm reveal active";

    // Generate Options HTML
    let optsHtml = '';
    if (product.showOptions && product.options) {
        Object.entries(product.showOptions).forEach(([key, label]) => {
            if (label && product.options[key]) {
                optsHtml += `
                    <div class="mb-8">
                        <span class="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">${label}</span>
                        <div class="flex flex-wrap gap-2">
                            ${product.options[key].map((val, idx) => `
                                <button onclick="window.selectOption('${key}', ${idx})" 
                                        data-key="${key}" data-index="${idx}"
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
                    <img id="main-image" src="${activeImageSrc}" class="max-h-[90%] max-w-[90%] object-contain mix-blend-multiply transition-all duration-700 group-hover:scale-105">
                </div>
                <div class="flex gap-3 overflow-x-auto pb-2">
                    ${product.images.map((img, i) => `
                        <img src="${img}" class="w-14 h-14 object-contain border ${img === activeImageSrc ? 'border-primary-soft' : 'border-gray-100'} rounded cursor-pointer p-1 bg-gray-50 hover:border-primary-soft transition-colors" onclick="window.changeMainImage('${img}', this)">
                    `).join('')}
                </div>
            </div>

            <!-- Right: Content -->
            <div class="lg:w-1/2 flex flex-col pt-2">
                <span class="text-primary-soft font-bold text-[9px] tracking-[0.4em] uppercase mb-1">Producto Industrial</span>
                <h1 class="text-3xl lg:text-4xl font-bold text-black mb-3 leading-tight">${product.name}</h1>
                <p class="text-sm text-gray-500 font-body mb-8 leading-relaxed">${product.description}</p>
                
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

                <div id="options-mount">${optsHtml}</div>

                <div class="mb-8">
                    <span class="block text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">Cantidad</span>
                    <div class="inline-flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden h-10">
                        <button onclick="window.updateQty(-1)" class="w-10 h-full hover:bg-gray-200 font-bold transition-colors">−</button>
                        <input id="qty-input" type="number" min="1" value="" placeholder="1" class="w-12 h-full bg-transparent text-center font-bold text-sm border-0 focus:outline-none focus:ring-0">
                        <button onclick="window.updateQty(1)" class="w-10 h-full hover:bg-gray-200 font-bold transition-colors">+</button>
                    </div>
                </div>

                <button onclick="window.sendDetailedWhatsApp()" class="btn-hero-outline w-full h-14 text-xs font-bold tracking-widest uppercase transition-all">
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
        let current = input.value === '' ? 0 : parseInt(input.value) || 0;
        let q = current + val;
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
        const up = calculatePrice();
        const total = up * qty;

        let details = `. Nombre: ${product.name}\n`;
        Object.entries(currentSelections).forEach(([key, val]) => {
            const label = product.showOptions[key];
            if (label) {
                const value = typeof val === 'object' ? (val.label || "") : val;
                details += `. ${label}: ${value}\n`;
            }
        });

        const msg = encodeURIComponent(`Hola\nMe gustaría solicitar información de:\n${details}. Cantidad: ${qty}\n. Precio Unitario: ${formatPrice(up)}\n. Precio Total: ${formatPrice(total)}\n\n¿Podrían confirmarme disponibilidad?`);
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`, '_blank');
    };

    // Bootstrap
    updateUIState();
    updateProductSEO(product);

    // Add event listener for manual quantity input
    const qtyInput = document.getElementById('qty-input');
    if (qtyInput) {
        qtyInput.addEventListener('input', () => {
            let val = parseInt(qtyInput.value);
            // Allow empty field, don't force to 1
            if (qtyInput.value === '' || isNaN(val) || val < 0) {
                // Keep it empty or 0, update UI will handle it
            }
            updateUIState();
        });
    }
}

/**
 * SEO & Structured Data Dynamic Updates
 */
function updateProductSEO(product) {
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
    if (ogImg) ogImg.content = `https://rcrodamientos.net/${product.images[0]}`;

    // 5. Inject JSON-LD Product Schema with Enhanced Data
    const schemaScript = document.getElementById('product-schema');
    if (schemaScript) {
        const schemaData = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": product.images.map(img => `https://rcrodamientos.net/${img}`),
            "description": product.description,
            "sku": product.id.toString(),
            "brand": {
                "@type": "Brand",
                "name": "RC RODAMIENTOS"
            },
            "offers": {
                "@type": "Offer",
                "url": window.location.href,
                "priceCurrency": "COP",
                "price": product.price,
                "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                "availability": "https://schema.org/InStock",
                "seller": {
                    "@type": "Organization",
                    "name": "RC RODAMIENTOS"
                }
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127"
            }
        };
        schemaScript.textContent = JSON.stringify(schemaData);
    }
}

window.changeMainImage = (src, el) => {
    const mainImg = document.getElementById('main-image');
    if (!mainImg || mainImg.src === src) return;

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

window.updateQty = (d) => {
    const input = document.getElementById('qty-input');
    let q = parseInt(input.value) + d;
    if (q < 1) q = 1;
    input.value = q;
};

window.sendWhatsApp = (name) => {
    const q = document.getElementById('qty-input').value;
    const msg = encodeURIComponent(`Hola\nMe gustaría solicitar información de:\n. Nombre: ${name}\n. Cantidad: ${q}\n\n¿Podrían confirmarme disponibilidad?`);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`, '_blank');
};

document.addEventListener('DOMContentLoaded', initializeApp);