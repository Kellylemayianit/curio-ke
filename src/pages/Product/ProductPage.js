import { html } from '../../core/html.js';
import { href } from '../../core/router.js';
import { site } from '../../config/site.js';
import { getProduct, products } from '../../data/products.js';
import { getCategory } from '../../data/categories.js';
import { money, waLink } from '../../core/format.js';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb.js';
import { ProductGallery } from '../../components/ProductGallery/ProductGallery.js';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid.js';
import { SaveButton } from '../../components/SaveButton/SaveButton.js';
import { Price } from '../../components/ProductCard/ProductCard.js';
import { Icon } from '../../components/Icon/Icon.js';
import { addToCart } from '../../store/index.js';
import { NotFoundPage } from '../Info/InfoPages.js';

/** Price that follows the KES / USD switch. */
const PriceLine = {
  name: 'PriceLine',
  watch: (s) => [s.currency],
  render: ({ props, store }) => html`${Price(props.price, store.currency)}`,
};

function related(p) {
  const same = products.filter((x) => x.category === p.category && x.id !== p.id);
  const rest = products.filter((x) => x.category !== p.category);
  return [...same, ...rest].slice(0, 4);
}

const spec = (label, value) => html`<div><dt>${label}</dt><dd>${value || html`<em>Ask us</em>`}</dd></div>`;

export const ProductPage = {
  name: 'ProductPage',
  title: ({ params }) => {
    const p = getProduct(params.slug);
    return p ? `${p.name} · ${site.name}` : `Not found · ${site.name}`;
  },
  render({ props }) {
    const p = getProduct(props.route.params.slug);
    if (!p) return NotFoundPage.render();
    const cat = getCategory(p.category);
    const soldOut = p.tag === 'sold-out';
    const ask = waLink(
      soldOut
        ? `Hello ${site.name}, the ${p.name} is sold out. Do you have something similar?`
        : `Hello ${site.name}, I am interested in the ${p.name} (${money(p.price)}). Is it available?`
    );
    return html`
      ${Breadcrumb([{ label: 'Home', to: '/' }, { label: cat.label, to: `/shop/${cat.id}` }, { label: p.name }])}
      <article class="pd">
        <div class="pd__media" data-slot="gallery"></div>
        <div class="pd__info">
          <p class="kicker">${cat.label}</p>
          <h1>${p.name}</h1>
          <div class="pd__price"><span data-slot="price"></span>${soldOut ? html`<span class="tag tag--sold-out tag--inline">Sold out</span>` : ''}</div>
          ${p.blurb ? html`<p class="pd__blurb">${p.blurb}</p>` : ''}
          <dl class="spec">
            ${spec('Material', p.material)}
            ${spec('Made by', p.maker)}
            ${spec('Dimensions', p.dimensions)}
            ${spec('Condition', p.condition)}
          </dl>
          <div class="pd__buttons">
            <button class="btn" data-act="add" ${soldOut ? 'disabled' : ''}>${soldOut ? 'Sold out' : 'Add to cart'}</button>
            <a class="btn btn--outline" href="${ask}" target="_blank" rel="noopener">${Icon('chat')}${soldOut ? 'Ask for similar' : 'Order on WhatsApp'}</a>
            <span data-slot="save"></span>
          </div>
          <p class="pd__note">Delivery across Kenya. Message us for shipping abroad.</p>
        </div>
      </article>
      <section class="section" aria-labelledby="h-rel">
        <div class="section__head"><h2 id="h-rel"><i>You may also like</i></h2><a href="${href(`/shop/${cat.id}`)}">More ${cat.label}</a></div>
        <div data-slot="related"></div>
      </section>`;
  },
  children: ({ props }) => {
    const p = getProduct(props.route.params.slug);
    if (!p) return [];
    return [
      { slot: 'gallery', def: ProductGallery, props: { images: p.images, name: p.name } },
      { slot: 'price', def: PriceLine, props: { price: p.price } },
      { slot: 'save', def: SaveButton, props: { id: p.id } },
      { slot: 'related', def: ProductGrid, props: { items: related(p), columns: 4 } },
    ];
  },
  events: {
    'click [data-act="add"]': (e, t, ctx) => addToCart(ctx.props.route.params.slug),
  },
};
