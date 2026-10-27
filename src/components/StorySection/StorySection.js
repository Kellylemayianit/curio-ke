import { html } from '../../core/html.js';
import { href } from '../../core/router.js';
import { site } from '../../config/site.js';
import { productImg, productSrcset } from '../../core/format.js';

export function StorySection() {
  const s = site.story;
  return html`
    <section class="story section">
      <div class="story__tx">
        <p class="kicker">${s.kicker}</p>
        <h2>${s.title}</h2>
        <p>${s.short}</p>
        <a class="btn btn--outline" href="${href('/story')}">Read our story</a>
      </div>
      <img src="${productImg(s.image, 960)}" srcset="${productSrcset(s.image)}" sizes="(max-width:900px) 100vw, 40vw"
           alt="Painted map of Africa with a zebra" width="960" height="1200" loading="lazy" decoding="async">
    </section>`;
}
