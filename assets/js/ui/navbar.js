import { renderContactModal } from './modal.js';

window.toggleMobileMenu = function (forceClose = false) {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    if (!menu) return;

    const isOpen = forceClose ? false : !menu.classList.contains('mobile-menu-open');
    menu.classList.toggle('mobile-menu-open', isOpen);
    btn?.setAttribute('aria-expanded', String(isOpen));
};

/**
 * Navigation Bar V2: Glassmorphism & Animated Links
 */
export function createNavBar() {
    const container = document.getElementById('header-container');
    if (!container) return;

    const navLinks = [
        { href: '/', text: 'Catálogo' },
        { href: '/quienes-somos/', text: 'Quiénes Somos' }
    ];

    const desktopNav = navLinks.map(link => `
        <a href="${link.href}"
           class="underline-animate px-2 py-1 text-sm font-semibold uppercase tracking-wider text-black transition-colors hover:text-gray-600">
            ${link.text}
        </a>
    `).join('');

    const contactBtnClass = 'underline-animate px-2 py-1 text-sm font-semibold uppercase tracking-wider text-black transition-colors hover:text-gray-600';

    container.innerHTML = `
        <header class="glass-nav sticky top-0 z-[100] transition-all duration-500">
            <nav class="container mx-auto px-6 py-4 flex justify-between items-center" aria-label="Navegación principal">
                <a href="/" class="flex items-center group">
                    <img src="/assets/images/logo.png" alt="Logo RC Rodamientos" class="h-10 w-auto mr-3 object-contain" width="40" height="40">
                    <div class="flex flex-col leading-none">
                        <span class="text-2xl font-heading font-black tracking-tighter logo-rc text-primary-soft group-hover:text-black transition-colors duration-300">RC</span>
                        <span class="text-sm font-heading font-bold tracking-[0.2em] logo-text text-black group-hover:text-primary-soft transition-colors duration-300">RODAMIENTOS</span>
                    </div>
                </a>

                <div class="hidden lg:flex items-center space-x-10">
                    ${desktopNav}
                    <button type="button" onclick="toggleModal(true)" class="${contactBtnClass}">Contacto</button>
                </div>

                <button id="mobile-menu-btn" type="button" onclick="toggleMobileMenu()" class="lg:hidden p-2 text-black"
                        aria-label="Abrir menú de navegación" aria-expanded="false" aria-controls="mobile-menu">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </nav>

            <div id="mobile-menu" class="mobile-menu lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 py-6">
                <div class="flex flex-col items-center space-y-6">
                    ${navLinks.map(link => `
                        <a href="${link.href}"
                           class="text-black font-heading font-bold text-sm uppercase tracking-widest hover:text-primary-soft transition-colors">
                            ${link.text}
                        </a>
                    `).join('')}
                    <button type="button" onclick="toggleModal(true); toggleMobileMenu(true);"
                            class="text-black font-heading font-bold text-sm uppercase tracking-widest hover:text-primary-soft transition-colors">
                        Contacto
                    </button>
                </div>
            </div>
        </header>
    `;
    renderContactModal();
}
