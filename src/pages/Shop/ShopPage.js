import { html } from '../../core/html.js';
import { buildQuery } from '../../core/router.js';
import { site } from '../../config/site.js';
import { getCategory } from '../../data/categories.js';
import { queryProducts, SORTS } from '../../data/search.js';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb.js';
import { FilterChips } from '../../components/FilterChips/FilterChips.js';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid.js';
import { navigate } from '../../app/router.js';
import { NotFoundPage } from '../Info/InfoPages.js';

function heading({ category, q }) {
  if (q) return `Results for “${q}”`;
  return (category && getCategory(category)?.label) || 'All pieces';
}

export const ShopPage = {
  name: 'ShopPage',
  title: ({ params, query }) => `${heading({ category: params.category, q: query.q })} · ${site.name}`,
  render({ props }) {
    const { params, query } = props.route;
    const category = params.category || '';
    if (category && !getCategory(category)) return NotFoundPage.render();
    const state = { category, q: query.q || '', sort: query.sort || 'newest', available: query.available || '' };
    const items = queryProducts(state);
    return html`
      ${Breadcrumb([{ label: 'Home', to: '/' }, ...(category ? [{ label: 'All pieces', to: '/shop' }, { label: getCategory(category).label }] : [{ label: 'All pieces' }])])}
      <div class="shop__head">
        <h1><i>${heading(state)}</i></h1>
        <label class="pill sortpill">Sort:
          <select data-sort aria-label="Sort pieces">
            ${SORTS.map((s) => html`<option value="${s.id}" ${s.id === state.sort ? 'selected' : ''}>${s.label}</option>`)}
          </select>
        </label>
      </div>
      ${FilterChips(state)}
      <p class="shop__count" role="status">${items.length} ${items.length === 1 ? 'piece' : 'pieces'}</p>
      <div data-slot="grid"></div>`;
  },
  children: ({ props }) => {
    const { params, query } = props.route;
    const items = queryProducts({ category: params.category || '', q: query.q || '', sort: query.sort || 'newest', available: query.available || '' });
    const empty = html`<div class="empty"><h2>No pieces found</h2><p>Nothing matches that just now. Try a different word, or ask us on WhatsApp and we will look for you.</p><a class="btn btn--outline" href="#/shop">Clear filters</a></div>`;
    return [{ slot: 'grid', def: ProductGrid, props: { items, columns: 3, empty } }];
  },
  events: {
    'change [data-sort]': (e, t, ctx) => {
      const { params, query } = ctx.props.route;
      navigate(`/shop${params.category ? `/${params.category}` : ''}${buildQuery({ q: query.q, sort: t.value === 'newest' ? '' : t.value, available: query.available })}`);
    },
  },
};
