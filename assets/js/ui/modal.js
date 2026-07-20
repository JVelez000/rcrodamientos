import { WHATSAPP_PHONE, INSTAGRAM_URL } from '../config.js';

let lastFocusedElement = null;

function getFocusableElements(container) {
    return Array.from(
        container.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );
}

function handleModalKeydown(event) {
    const modal = document.getElementById('contact-modal');
    if (!modal || modal.classList.contains('hidden')) return;

    if (event.key === 'Escape') {
        window.toggleModal(false);
        return;
    }

    if (event.key === 'Tab') {
        const content = document.getElementById('contact-modal-content');
        const focusable = getFocusableElements(content);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
}

document.addEventListener('keydown', handleModalKeydown);

window.toggleModal = function (show) {
    const modal = document.getElementById('contact-modal');
    const content = document.getElementById('contact-modal-content');
    if (!modal || !content) return;

    if (show) {
        lastFocusedElement = document.activeElement;
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        setTimeout(() => {
            content.classList.remove('modal-hidden-state');
            content.classList.add('modal-visible-state');
            const closeBtn = document.getElementById('contact-modal-close');
            closeBtn?.focus();
        }, 10);
    } else {
        content.classList.remove('modal-visible-state');
        content.classList.add('modal-hidden-state');
        modal.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            modal.classList.add('hidden');
            lastFocusedElement?.focus();
        }, 500);
    }
};

/**
 * Modal V2: Glassmorphism & Branded Social Buttons
 */
export function renderContactModal() {
    const container = document.getElementById('contact-modal-container');
    if (!container) return;

    const links = [
        { href: `https://wa.me/${WHATSAPP_PHONE}`, label: 'WhatsApp', class: 'whatsapp-v2', icon: 'M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z' },
        { href: INSTAGRAM_URL, label: 'Instagram', class: 'instagram-v2', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' }
    ];

    container.innerHTML = `
        <div id="contact-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden z-[200] flex items-center justify-center transition-all duration-300"
             role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" aria-hidden="true">
            <div id="contact-modal-content" class="bg-white rounded-xl shadow-heavy p-10 w-11/12 max-w-lg modal-content-transition modal-hidden-state">
                <div class="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
                    <div>
                        <h3 id="contact-modal-title" class="text-3xl font-heading font-bold text-black tracking-tight">CONTACTO</h3>
                        <p class="text-gray-400 text-xs uppercase tracking-widest mt-1">Atención Inmediata</p>
                    </div>
                    <button id="contact-modal-close" type="button" onclick="toggleModal(false)"
                            aria-label="Cerrar ventana de contacto"
                            class="text-gray-300 hover:text-black transition-colors text-4xl leading-none">&times;</button>
                </div>

                <div class="space-y-4">
                    ${links.map(l => `
                        <a href="${l.href}" target="_blank" rel="noopener noreferrer" class="social-btn group ${l.class} flex items-center p-4">
                            <span class="mr-6 transition-transform group-hover:scale-125">
                                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="${l.icon}"></path></svg>
                            </span>
                            <span class="text-lg font-bold">${l.label}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}
