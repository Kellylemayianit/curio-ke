import { createRouter } from '../core/router.js';
import { store } from '../store/index.js';

/** URL table. `name` picks the page in app/pages.js. */
export const routes = [
  { name: 'home', path: '/' },
  { name: 'shop', path: '/shop/:category?' },
  { name: 'product', path: '/product/:slug' },
  { name: 'saved', path: '/saved' },
  { name: 'story', path: '/story' },
  { name: 'visit', path: '/visit' },
];

// Any navigation also closes the menu and cart drawers.
export const router = createRouter(routes, (route) => store.set({ route, menuOpen: false, cartOpen: false }));

export const navigate = (to, opts) => router.navigate(to, opts);
