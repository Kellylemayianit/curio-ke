import { html } from '../../core/html.js';
import { href } from '../../core/router.js';
import { imageBase } from '../../config/site.js';

export function Hero({ kicker, title, text, cta, to = '/shop', image = 'hero' }) {
  const src = (w) => `${imageBase}/site/${image}-${w}.jpg`;
  return html`
    <section class="hero">
      <img src="${src(1600)}" srcset="${src(800)} 800w, ${src(1600)} 1600w" sizes="(max-width:900px) 100vw, 80vw"
           alt="Carved wooden zebras lined up on a shelf" width="1600" height="900" fetchpriority="high">
      <div class="hero__tx">
        <p class="kicker">${kicker}</p>
        <h1>${title}</h1>
        <p class="hero__text">${text}</p>
        <a class="btn" href="${href(to)}">${cta}</a>
      </div>
    </section>`;
}
