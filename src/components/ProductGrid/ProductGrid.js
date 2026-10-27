import { html } from '../../core/html.js';
import { href } from '../../core/router.js';
import { ProductCard } from '../ProductCard/ProductCard.js';
import { toggleSaved } from '../../store/index.js';

/**
 * A grid of product cards. An island: it re-renders by itself when the currency
 * or the saved list changes, so prices and hearts stay correct without the page knowing.
 *   props: { items, columns: 3 | 4, empty?: html }
 */
export const ProductGrid = {
  name: 'ProductGrid',
  watch: (s) => [s.currency, s.saved],
  render({ props, store }) {
    if (!props.items.length) {
      return props.empty || html`<div class="empty"><h2>Nothing here yet</h2><p>Try another search or category.</p><a class="btn btn--outline" href="${href('/shop')}">See all pieces</a></div>`;
    }
    return html`
      <div class="grid grid--${props.columns || 4}">
        ${props.items.map((p) => ProductCard(p, { currency: store.currency, saved: store.saved.includes(p.id) }))}
      </div>`;
  },
  events: {
    'click [data-save]': (e, t) => toggleSaved(t.dataset.save),
  },
};
