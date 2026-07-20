/**
 * Advanced Scroll Reveal logic using IntersectionObserver
 */
export function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    // Si el navegador no soporta IntersectionObserver, mostramos todo de una vez
    if (!('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('active'));
        return;
    }

    const observerOptions = {
        threshold: 0.05, // Más sensible
        rootMargin: '0px 0px -20px 0px'
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
