import { html } from '../../core/html.js';
import { href } from '../../core/router.js';

/** items: [{ label, to? }] — the last one is the current page. */
export function Breadcrumb(items) {
  return html`
    <nav class="bc" aria-label="Breadcrumb">
      ${items.map((it, i) => html`${i ? html`<span aria-hidden="true"> / </span>` : ''}${it.to ? html`<a href="${href(it.to)}">${it.label}</a>` : html`<span aria-current="page">${it.label}</span>`}`)}
    </nav>`;
}
