import { PRODUCTS_JSON_PATH } from './config.js';
import { hideLoader } from './utils/loader.js';
import { initScrollReveal } from './utils/reveal.js';
import { initLazyImages } from './utils/lazyImages.js';
import { createNavBar } from './ui/navbar.js';
import { createFooter } from './ui/footer.js';
import { renderCatalog, renderCatalogError } from './catalog.js';
import { renderProductDetail, renderProductNotFound } from './productDetail.js';

async function fetchProducts() {
    const response = await fetch(PRODUCTS_JSON_PATH);
    if (!response.ok) {
        throw new Error(`No se pudo cargar el catálogo (HTTP ${response.status})`);
    }
    return response.json();
}

async function renderCatalogPage() {
    try {
        const products = await fetchProducts();
        renderCatalog(products);
    } catch (error) {
        console.error('[RC Rodamientos] Error al cargar el catálogo:', error);
        renderCatalogError(() => renderCatalogPage());
    }
}

async function renderProductPage() {
    const id = new URLSearchParams(window.location.search).get('id');

    try {
        const products = await fetchProducts();
        const product = id ? products.find(p => p.id == id) : undefined;

        if (product) {
            renderProductDetail(product);
        } else {
            renderProductNotFound({ networkError: false });
        }
    } catch (error) {
        console.error('[RC Rodamientos] Error al cargar el producto:', error);
        renderProductNotFound({ networkError: true });
    }
}

async function initializeApp() {
    createNavBar();
    createFooter();

    const content = document.getElementById('page-content');
    if (content) content.classList.add('page-load-reveal');

    const isProductPage = window.location.pathname.includes('product/');

    if (isProductPage) {
        await renderProductPage();
    } else {
        await renderCatalogPage();
    }

    // Se ejecutan al final, una sola vez, para cubrir tanto el contenido
    // estático de la página (hero, "quiénes somos") como el que se acaba
    // de insertar dinámicamente (catálogo o detalle de producto).
    initScrollReveal();
    initLazyImages();

    setTimeout(hideLoader, 600);
}

document.addEventListener('DOMContentLoaded', initializeApp);
