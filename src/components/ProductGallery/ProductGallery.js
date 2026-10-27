import { html } from '../../core/html.js';
import { productImg, productSrcset } from '../../core/format.js';

/** props: { images: [id], name } — local state `i` is the selected picture (like useState). */
export const ProductGallery = {
  name: 'ProductGallery',
  state: () => ({ i: 0 }),
  render({ props, state }) {
    const { images, name } = props;
    return html`
      <div class="gallery__big">
        <img src="${productImg(images[state.i], 960)}" srcset="${productSrcset(images[state.i])}" sizes="(max-width:900px) 100vw, 45vw"
             alt="${name}, view ${state.i + 1} of ${images.length}" width="960" height="1200" fetchpriority="high">
      </div>
      ${images.length > 1 ? html`
        <div class="gallery__thumbs">
          ${images.map((id, i) => html`
            <button class="gallery__thumb ${i === state.i ? 'is-on' : ''}" data-i="${i}" aria-label="Show view ${i + 1}" aria-pressed="${i === state.i}">
              <img src="${productImg(id, 480)}" alt="" width="480" height="600" loading="lazy">
            </button>`)}
        </div>` : ''}`;
  },
  events: {
    'click [data-i]': (e, t, ctx) => ctx.setState({ i: Number(t.dataset.i) }),
  },
};
