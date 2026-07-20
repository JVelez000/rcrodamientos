/**
 * Currency Formatter (High Precision)
 */
export function formatPrice(price, currency = 'COP') {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0
    }).format(price);
}
