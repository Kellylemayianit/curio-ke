import { html } from '../../core/html.js';
import { href, buildQuery } from '../../core/router.js';
import { site } from '../../config/site.js';
import { Icon } from '../Icon/Icon.js';
import { cartCount, cycleCurrency, openCart, openMenu } from '../../store/index.js';
import { navigate } from '../../app/router.js';

/** Desktop action pills: currency, saved, cart. Small island so it re-renders on its own. */
const HeaderActions = {
  name: 'HeaderActions',
  watch: (s) => [s.currency, s.saved.length, cartCount(s)],
  render({ store }) {
    return html`
      <button class="pill topbar__currency" data-act="currency" aria-label="Currency: ${store.currency}. Switch currency">${store.currency}</button>
      <a class="pill topbar__saved" href="${href('/saved')}">${Icon('heart')}<span>Saved${store.saved.length ? html` · ${store.saved.length}` : ''}</span></a>
      <button class="pill pill--dark" data-act="cart" aria-label="Open cart, ${cartCount(store)} items">Cart · ${cartCount(store)}</button>`;
  },
  events: {
    'click [data-act="currency"]': () => cycleCurrency(),
    'click [data-act="cart"]': () => openCart(),
  },
};

const MobileCart = {
  name: 'MobileCart',
  watch: (s) => [cartCount(s)],
  render({ store }) {
    return html`<button class="pill mh__btn" data-act="cart" aria-label="Open cart, ${cartCount(store)} items">Cart ${cartCount(store)}</button>`;
  },
  events: { 'click [data-act="cart"]': () => openCart() },
};

let searchTimer;

export const Topbar = {
  name: 'Topbar',
  render({ store }) {
    const q = store.route.query.q || '';
    return html`
      <header class="topbar">
        <div class="mh">
          <button class="pill mh__btn" data-act="menu" aria-label="Open menu">Menu</button>
          <a class="logo mh__logo" href="${href('/')}">${site.name.toUpperCase()}</a>
          <div data-slot="mcart"></div>
        </div>
        <div class="tb">
          <form class="search" role="search" data-form="search">
            <span aria-hidden="true">${Icon('search')}</span>
            <input name="q" type="search" value="${q}" placeholder="Search carvings, beadwork, clothing" aria-label="Search the shop" autocomplete="off" enterkeyhint="search">
          </form>
          <div class="tb__actions" data-slot="actions"></div>
        </div>
      </header>`;
  },
  children: () => [
    { slot: 'actions', def: HeaderActions },
    { slot: 'mcart', def: MobileCart },
  ],
  events: {
    'click [data-act="menu"]': () => openMenu(),
    'submit [data-form="search"]': (e, form) => {
      e.preventDefault();
      clearTimeout(searchTimer);
      navigate(`/shop${buildQuery({ q: form.q.value.trim() })}`);
      form.q.blur();
    },
    // Live results while typing, once the visitor is already browsing the shop.
    'input [data-form="search"]': (e, form, ctx) => {
      if (ctx.store.route.name !== 'shop') return;
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        const { category } = ctx.store.route.params;
        const { sort, available } = ctx.store.route.query;
        navigate(`/shop${category ? `/${category}` : ''}${buildQuery({ q: form.q.value.trim(), sort, available })}`, { replace: true });
      }, 250);
    },
  },
  mounted(ctx) {
    // Keep the box in step with the URL (e.g. after "clear search"), but never while typing.
    const off = ctx.env.store.subscribe((s) => {
      const input = ctx.query('input[name="q"]');
      const q = s.route.query.q || '';
      if (input && document.activeElement !== input && input.value !== q) input.value = q;
    });
    ctx.on(off);
  },
};
