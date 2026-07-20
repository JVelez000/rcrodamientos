import { WHATSAPP_PHONE } from '../config.js';

/**
 * Reusable error / empty-state block.
 * Lets the customer know something failed instead of seeing a blank page,
 * with an optional retry action and a WhatsApp fallback.
 */
export function renderErrorState(container, {
    title = 'Ha ocurrido un error',
    message = 'Por favor intenta de nuevo en unos minutos.',
    retryLabel = 'Reintentar',
    onRetry = null,
    showWhatsApp = true
} = {}) {
    if (!container) return;

    container.innerHTML = `
        <div role="alert" aria-live="assertive" class="flex flex-col items-center text-center py-16 px-6">
            <div class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
            </div>
            <h3 class="text-xl font-heading font-bold text-black mb-2 uppercase">${title}</h3>
            <p class="text-gray-500 text-sm max-w-md mb-8">${message}</p>
            <div class="flex flex-col sm:flex-row gap-3">
                ${onRetry ? `<button id="error-retry-btn" type="button" class="btn-hero-outline px-8 py-3 text-xs font-bold uppercase tracking-widest">${retryLabel}</button>` : ''}
                ${showWhatsApp ? `
                    <a href="https://wa.me/${WHATSAPP_PHONE}" target="_blank" rel="noopener noreferrer"
                       class="px-8 py-3 text-xs font-bold uppercase tracking-widest bg-black text-white rounded hover:bg-primary-soft hover:text-black transition-colors">
                        Escríbenos por WhatsApp
                    </a>
                ` : ''}
            </div>
        </div>
    `;

    if (onRetry) {
        const btn = document.getElementById('error-retry-btn');
        if (btn) btn.addEventListener('click', onRetry);
    }
}
