import { html } from '../core/html.js';
import { Sidebar } from '../components/Sidebar/Sidebar.js';
import { Topbar } from '../components/Topbar/Topbar.js';
import { BottomNav } from '../components/BottomNav/BottomNav.js';
import { NavDrawer } from '../components/Drawer/Drawer.js';
import { CartDrawer } from '../components/CartDrawer/CartDrawer.js';
import { Toast } from '../components/Toast/Toast.js';
import { Footer } from '../components/Footer/Footer.js';
import { View } from './View.js';

/**
 * The page shell. It never re-renders: each region is its own island, so
 * typing in the search box or opening the cart can't disturb the rest.
 */
export const App = {
  name: 'App',
  render: () => html`
    <button class="skip" data-act="skip">Skip to content</button>
    <div class="app">
      <div class="app__sidebar" data-slot="sidebar"></div>
      <div class="app__main">
        <div data-slot="topbar"></div>
        <main class="app__view" id="main" tabindex="-1" data-slot="view"></main>
        <div class="app__footer">${Footer()}</div>
      </div>
    </div>
    <div data-slot="bottomnav"></div>
    <div data-slot="navdrawer"></div>
    <div data-slot="cartdrawer"></div>
    <div class="toast-host" data-slot="toast" aria-live="polite"></div>`,
  children: () => [
    { slot: 'sidebar', def: Sidebar },
    { slot: 'topbar', def: Topbar },
    { slot: 'view', def: View },
    { slot: 'bottomnav', def: BottomNav },
    { slot: 'navdrawer', def: NavDrawer },
    { slot: 'cartdrawer', def: CartDrawer },
    { slot: 'toast', def: Toast },
  ],
  events: {
    'click [data-act="skip"]': () => document.getElementById('main').focus(),
  },
  mounted(ctx) {
    // Lock page scroll while a drawer is open.
    const off = ctx.env.store.subscribe((s) => document.body.classList.toggle('is-locked', s.menuOpen || s.cartOpen));
    ctx.on(off);
  },
};
