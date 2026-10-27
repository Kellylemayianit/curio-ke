# Curio

A Kenyan cultural antiques shop (beadwork, carvings, Wear Kenya, art and decor), built from the four design mockups with a **React-style component architecture in plain HTML, CSS and vanilla JavaScript**. No framework, no runtime dependencies, no build step needed to develop.

## Run it

```bash
npm start            # http://localhost:5173  (any static server works: it only needs ES modules over http)
# or, without npm:
python3 -m http.server 5173
```

Opening `index.html` by double-click will not work: browsers block ES modules on `file://`.

```bash
npm install          # only needed for the production build (esbuild)
npm run build        # -> dist/  one minified JS file + one CSS file (about 14 KB JS + 5 KB CSS gzipped)
npm run preview      # serve dist/ on :4173
```

Deploy `dist/` (or the repo root itself) to any static host. Routing uses `#/` URLs, so no server rewrites are needed and it works in a subfolder.

## Pages

| URL | Page | Design |
|---|---|---|
| `#/` | Home | Home desktop and Mobile home |
| `#/shop`, `#/shop/carvings` | Catalogue with filters, sort, search | Shop catalogue |
| `#/product/carved-ebony-lion` | Product page | Product page |
| `#/saved` | Pieces saved with the heart (kept on the device) | extra |
| `#/story`, `#/visit` | Our story, Visit us | extra (linked from the design's sidebar) |

Also working: cart drawer, order-on-WhatsApp with a ready-made message, KES/USD switch, live search, offline caching (service worker), keyboard and screen-reader support.

## How the architecture works

```
src/
  core/         the tiny "framework" (about 250 lines in total)
    html.js       html`` tagged template: auto-escaping, nests like JSX
    component.js  mount(host, definition, props): state, watch, children, events, lifecycle
    store.js      observable store with localStorage persistence
    router.js     hash router with :params and ?query
    format.js     prices, image URLs, WhatsApp links
  components/   one folder per component: Name.js + Name.css side by side
  pages/        route-level components, composed from components
  app/          App shell, route table (router.js), page registry, View
  store/        app state + actions (cart, saved, currency, drawers, toast)
  data/         products.js, categories.js, search.js
  config/       site.js  <- shop name, WhatsApp number, copy
  styles/       tokens.css (colours, fonts), base.css, layout.css, main.css
public/         images (generated), fonts (self-hosted), icons
tools/          dev server, build script, image pipeline
```

**Two kinds of component**, like React:

1. *Function components* return markup from data. Stateless: `ProductCard(product)`, `Hero(props)`, `Breadcrumb(items)`.
2. *Island components* are objects with `render`, and optionally `state`, `watch`, `children`, `events`, `mounted`:

```js
export const SaveButton = {
  state: () => ({}),                          // like useState
  watch: (s) => [s.saved],                    // re-render when these app values change
  render({ props, store }) { return html`<button data-act="save">…</button>`; },
  children: () => [{ slot: 'x', def: Other, props: {} }],   // nested components
  events: { 'click [data-act="save"]': (e, target, ctx) => toggleSaved(ctx.props.id) },
};
```

Rules of thumb: keep islands small so a re-render never touches something you are typing in (the search box is its own island and is never re-rendered while focused). The shell (`app/App.js`) never re-renders at all.

## Everyday tasks

- **Change shop name, WhatsApp number, hours, story, announcement:** `src/config/site.js`.
- **Add or edit a product:** `src/data/products.js` (one object each). Unknown details can stay `null`; the page then shows "Ask us".
- **Add a product photo:** drop the original in `tools/source-photos/`, add an entry to `tools/image-map.json` (`fx`/`fy` choose the focus point), run `npm run images` (needs Python and Pillow). It writes 480px and 960px versions.
- **Use a stock photo instead of a shop photo:** save it in `tools/source-photos/`, point the entry's `src` at it, run `npm run images`. Nothing else changes.
- **Change colours or fonts:** `src/styles/tokens.css`.
- **Add a page:** create `pages/Name/NamePage.js`, add it to `app/pages.js` and a route in `app/router.js`.

## Before launch (placeholders to replace)

- **Prices are samples.** Every price in `products.js` is invented so the layout can be judged. Replace them.
- **WhatsApp number** in `site.js` is `254700000000`.
- **Shop location, hours, phone, email** in `site.js` are empty; the Visit page and footer adapt.
- **Product details** (material, made by, dimensions) are cautious descriptions from the photos. Fill in what is true; `maker` and `dimensions` are blank on purpose.
- **Our story** copy is generic; replace it with the real story.
- The design's **Account** button became **Saved**, since a static site has no accounts.
- Checkout is **WhatsApp only** (as in the design): no payment is taken on the site.

## Image credits

All pictures are the shop's own photographs. People appear in some of the originals; none are used on the site.
