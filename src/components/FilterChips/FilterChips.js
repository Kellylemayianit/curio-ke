import { html } from '../../core/html.js';
import { href, buildQuery } from '../../core/router.js';
import { categories } from '../../data/categories.js';

/**
 * Category chips + the "Available" toggle. Plain links, so filters are shareable URLs.
 *   state: { category, q, sort, available }
 *   variant 'short' uses the short labels on narrow screens (the mobile design).
 */
export function FilterChips({ category = '', q = '', sort = '', available = '' }, { to = '/shop', short = false } = {}) {
  const url = (cat, avail) => href(`${to}${cat ? `/${cat}` : ''}${buildQuery({ q, sort, available: avail })}`);
  const chip = (label, on, link) => html`<a class="chip ${on ? 'is-on' : ''}" href="${link}" ${on ? html`aria-current="true"` : ''}>${label}</a>`;
  return html`
    <div class="chips ${short ? 'chips--scroll' : ''}" role="navigation" aria-label="Filter by category">
      ${chip('All', !category, url('', available))}
      ${categories.map((c) => chip(short ? c.short : c.label, category === c.id, url(c.id, available)))}
      ${chip('Available', !!available, url(category, available ? '' : '1'))}
    </div>`;
}
