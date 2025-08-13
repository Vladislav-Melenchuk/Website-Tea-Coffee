const KEY = "cart_items_v1";

export function getCart() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function setCart(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("cart:changed"));
}

export function addItem(product, qty = 1) {
    const items = getCart();
    const i = items.findIndex(x => x.id === product.id);
    if (i >= 0) {
        items[i].qty += qty;
    } else {
        items.push({ ...product, qty });
    }
    setCart(items);
}

export function updateQty(id, qty) {
    const items = getCart().map(x => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x));
    setCart(items);
}

export function removeItem(id) {
    const items = getCart().filter(x => x.id !== id);
    setCart(items);
}

export function clearCart() {
    setCart([]);
}

export const cartTotal = (items) => items.reduce((s, p) => s + p.price * p.qty, 0);
export const cartCount = (items) => items.reduce((s, p) => s + p.qty, 0);
