import { html } from '../core/html.js';
import { pages } from './pages.js';

let lastKey = null;

/** Swaps the current page when the route changes, then handles title, scroll and focus. */
export const View = {
  name: 'View',
  watch: (s) => [s.route],
  render: () => html`<div class="view" data-slot="page"></div>`,
  children: ({ store }) => [{ slot: 'page', def: pages[store.route.name] || pages['not-found'], props: { route: store.route } }],
  mounted: (ctx) => afterRender(ctx, false),
  updated: (ctx) => afterRender(ctx, true),
};

function afterRender(ctx, animate) {
  const { route } = ctx.store;
  const page = pages[route.name] || pages['not-found'];
  document.title = page.title ? page.title(route) : document.title;

  // Filtering inside the shop re-renders the page, but should not scroll or steal focus.
  const key = route.name === 'shop' ? 'shop' : route.path;
  if (key !== lastKey) {
    lastKey = key;
    if (animate) {
      window.scrollTo(0, 0);
      const main = document.getElementById('main');
      main && main.focus({ preventScroll: true });
      const first = ctx.el.firstElementChild;
      first && first.classList.add('page-in');
    }
  }
}
