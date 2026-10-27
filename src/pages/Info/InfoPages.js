import { html } from '../../core/html.js';
import { href } from '../../core/router.js';
import { site } from '../../config/site.js';
import { categories } from '../../data/categories.js';
import { getProduct } from '../../data/products.js';
import { waLink, productImg, productSrcset } from '../../core/format.js';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb.js';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid.js';
import { Icon } from '../../components/Icon/Icon.js';

export const StoryPage = {
  name: 'StoryPage',
  title: () => `Our story · ${site.name}`,
  render() {
    const s = site.story;
    return html`
      ${Breadcrumb([{ label: 'Home', to: '/' }, { label: 'Our story' }])}
      <div class="info">
        <div class="info__tx">
          <p class="kicker">${s.kicker}</p>
          <h1><i>${s.title}</i></h1>
          ${s.long.map((para) => html`<p>${para}</p>`)}
          <div class="info__cta">
            <a class="btn" href="${href('/shop')}">See the collection</a>
            <a class="btn btn--outline" href="${href('/visit')}">Visit us</a>
          </div>
        </div>
        <img class="info__img" src="${productImg(s.image, 960)}" srcset="${productSrcset(s.image)}" sizes="(max-width:900px) 100vw, 40vw"
             alt="Painted map of Africa with a zebra" width="960" height="1200" loading="lazy">
      </div>
      <section class="section" aria-labelledby="h-c">
        <div class="section__head"><h2 id="h-c"><i>What we gather</i></h2></div>
        <div class="infocats">${categories.map((c) => html`<a class="infocat" href="${href(`/shop/${c.id}`)}"><strong>${c.label}</strong><span>${c.blurb}</span></a>`)}</div>
      </section>`;
  },
};

export const VisitPage = {
  name: 'VisitPage',
  title: () => `Visit us · ${site.name}`,
  render() {
    const place = [site.location, site.country].filter(Boolean).join(', ');
    return html`
      ${Breadcrumb([{ label: 'Home', to: '/' }, { label: 'Visit us' }])}
      <div class="visit">
        <div>
          <p class="kicker">Visit us</p>
          <h1><i>Come and see it in person</i></h1>
          <p class="visit__lead">Many pieces are bigger, brighter and more detailed in the hand. Come and browse the shelves, or message us first and we will set something aside.</p>
        </div>
        <dl class="card visit__card">
          <div><dt>Where</dt><dd>${place}${site.location ? '' : html`<br><small>Message us on WhatsApp for directions.</small>`}</dd></div>
          ${site.hours.length ? html`<div><dt>Hours</dt><dd>${site.hours.map(([d, h]) => html`${d}: ${h}<br>`)}</dd></div>` : ''}
          ${site.phone ? html`<div><dt>Phone</dt><dd><a href="tel:${site.phone.replace(/\s/g, '')}">${site.phone}</a></dd></div>` : ''}
          ${site.email ? html`<div><dt>Email</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd></div>` : ''}
          <div><dt>WhatsApp</dt><dd>+${site.whatsapp}</dd></div>
        </dl>
      </div>
      <div class="visit__actions">
        <a class="btn" href="${waLink(`Hello ${site.name}, I would like to visit. Where are you and when are you open?`)}" target="_blank" rel="noopener">${Icon('chat')} Message us on WhatsApp</a>
        <a class="btn btn--outline" href="${href('/shop')}">Browse online</a>
      </div>`;
  },
};

export const SavedPage = {
  name: 'SavedPage',
  title: () => `Saved · ${site.name}`,
  watch: (s) => [s.saved],
  render({ store }) {
    return html`
      ${Breadcrumb([{ label: 'Home', to: '/' }, { label: 'Saved' }])}
      <div class="shop__head"><h1><i>Saved pieces</i></h1></div>
      <p class="shop__count" role="status">${store.saved.length} saved on this device</p>
      <div data-slot="grid"></div>`;
  },
  children: ({ store }) => [
    {
      slot: 'grid',
      def: ProductGrid,
      props: {
        items: store.saved.map(getProduct).filter(Boolean),
        columns: 4,
        empty: html`<div class="empty"><h2>Nothing saved yet</h2><p>Tap the heart on any piece to keep it here.</p><a class="btn btn--outline" href="${href('/shop')}">Browse all pieces</a></div>`,
      },
    },
  ],
};

export const NotFoundPage = {
  name: 'NotFoundPage',
  title: () => `Page not found · ${site.name}`,
  render() {
    return html`
      <div class="empty notfound">
        <p class="kicker">404</p>
        <h2>We could not find that page</h2>
        <p>It may have moved, or the piece may have been sold.</p>
        <a class="btn" href="${href('/shop')}">Browse all pieces</a>
      </div>`;
  },
};
