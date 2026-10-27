import { html } from '../../core/html.js';
import { href } from '../../core/router.js';
import { money, productImg, productSrcset } from '../../core/format.js';
import { Icon } from '../Icon/Icon.js';

const TAGS = { new: 'New', 'sold-out': 'Sold out' };

/** "Ksh <b>900</b>" in the design's light-label / regular-number style. */
export function Price(price, currency = 'KES') {
  if (price == null) return html`Ask for price`;
  const text = money(price, currency);
  if (currency === 'USD') return html`<b>${text}</b>`;
  return html`Ksh <b>${text.replace('Ksh ', '')}</b>`;
}

/** Stateless component: a function from data to markup. */
export function ProductCard(p, { currency = 'KES', saved = false, sizes = '(max-width:900px) 50vw, (max-width:1100px) 33vw, 25vw' } = {}) {
  return html`
    <article class="pc">
      <a class="pc__link" href="${href(`/product/${p.id}`)}">
        <div class="pc__im">
          <img src="${productImg(p.images[0], 480)}" srcset="${productSrcset(p.images[0])}" sizes="${sizes}"
               alt="${p.name}" width="480" height="600" loading="lazy" decoding="async">
          ${p.tag ? html`<span class="tag tag--${p.tag}">${TAGS[p.tag]}</span>` : ''}
        </div>
        <h3>${p.name}</h3>
        <p>${Price(p.price, currency)}</p>
      </a>
      <button class="pc__save ${saved ? 'is-on' : ''}" data-save="${p.id}" aria-pressed="${saved}" aria-label="${saved ? 'Remove from saved' : 'Save'}: ${p.name}">${Icon('heart')}</button>
    </article>`;
}
