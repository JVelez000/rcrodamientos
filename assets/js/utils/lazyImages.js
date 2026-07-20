/**
 * Lazy-loads <img data-src="..."> elements using IntersectionObserver with a
 * generous rootMargin, so images finish downloading before they actually
 * enter the viewport (native `loading="lazy"` waits until much closer,
 * which reads as a slow pop-in while scrolling).
 */
export function initLazyImages(root = document) {
    const images = root.querySelectorAll('img[data-src]');
    if (images.length === 0) return;

    if (!('IntersectionObserver' in window)) {
        images.forEach(loadImage);
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { rootMargin: '600px 0px', threshold: 0.01 });

    images.forEach(img => observer.observe(img));
}

function loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;
    img.src = src;
    img.removeAttribute('data-src');
    img.addEventListener('load', () => {
        img.classList.add('lazy-loaded');
        // Una vez terminó el fade-in, se sueltan las clases propias para que
        // las utilidades de Tailwind (ej. opacity-90 en algunas imágenes)
        // vuelvan a tener el control total del estilo final.
        img.addEventListener('transitionend', function cleanup(event) {
            if (event.propertyName === 'opacity') {
                img.classList.remove('lazy-img', 'lazy-loaded');
                img.removeEventListener('transitionend', cleanup);
            }
        });
    }, { once: true });
}
