import { html } from '../../core/html.js';
import { href } from '../../core/router.js';
import { productImg, productSrcset } from '../../core/format.js';

export function CategoryCard(c) {
  return html`
    <a class="cat" href="${href(`/shop/${c.id}`)}">
      <img src="${productImg(c.cover, 480)}" srcset="${productSrcset(c.cover)}" sizes="(max-width:900px) 50vw, 20vw"
           alt="" width="480" height="600" loading="lazy" decoding="async">
      <span>${c.label}</span>
    </a>`;
}
