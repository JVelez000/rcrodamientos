export function hideLoader() {
    const loader = document.getElementById('global-loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.setAttribute('aria-hidden', 'true');
        setTimeout(() => loader.remove(), 600);
    }
}
