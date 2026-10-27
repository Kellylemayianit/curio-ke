import { createStore } from '../core/store.js';
import { getProduct } from '../data/products.js';

/**
 * The single app store. Persisted keys survive reloads (localStorage).
 *   route      current route, set by the router
 *   cart       [{ id, qty }]
 *   saved      [productId]
 *   currency   'KES' | 'USD'
 *   menuOpen / cartOpen   drawers
 *   toast      { id, text } | null
 */
export const store = createStore(
  {
    route: { name: 'home', path: '/', params: {}, query: {} },
    cart: [],
    saved: [],
    currency: 'KES',
    menuOpen: false,
    cartOpen: false,
    toast: null,
  },
  { persistKey: 'curio:v1', persistKeys: ['cart', 'saved', 'currency'] }
);

/* ---------- selectors ---------- */
export const cartCount = (s) => s.cart.reduce((n, l) => n + l.qty, 0);

export const cartLines = (s) =>
  s.cart.map((l) => ({ ...l, product: getProduct(l.id) })).filter((l) => l.product);

export const cartTotal = (s) => cartLines(s).reduce((sum, l) => sum + (l.product.price || 0) * l.qty, 0);

/* ---------- actions ---------- */
let toastTimer;
export function showToast(text) {
  const id = Date.now();
  store.set({ toast: { id, text } });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => store.set({ toast: null }), 2600);
}

export function addToCart(id) {
  const p = getProduct(id);
  if (!p || p.tag === 'sold-out') return;
  store.set((s) => {
    const found = s.cart.find((l) => l.id === id);
    return {
      cart: found
        ? s.cart.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + 1, 20) } : l))
        : [...s.cart, { id, qty: 1 }],
    };
  });
  showToast(`${p.name} added to cart`);
}

export function setQty(id, qty) {
  store.set((s) => ({
    cart: qty <= 0 ? s.cart.filter((l) => l.id !== id) : s.cart.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 20) } : l)),
  }));
}

export const clearCart = () => store.set({ cart: [] });

export function toggleSaved(id) {
  const p = getProduct(id);
  store.set((s) => ({ saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id] }));
  if (p) showToast(store.get().saved.includes(id) ? `${p.name} saved` : `${p.name} removed from saved`);
}

export function cycleCurrency() {
  store.set((s) => ({ currency: s.currency === 'KES' ? 'USD' : 'KES' }));
}

export const openCart = () => store.set({ cartOpen: true, menuOpen: false });
export const closeCart = () => store.set({ cartOpen: false });
export const openMenu = () => store.set({ menuOpen: true, cartOpen: false });
export const closeMenu = () => store.set({ menuOpen: false });
