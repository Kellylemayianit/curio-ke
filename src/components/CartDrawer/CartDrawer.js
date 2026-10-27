import { html } from '../../core/html.js';
import { href } from '../../core/router.js';
import { site } from '../../config/site.js';
import { money, productImg, waLink } from '../../core/format.js';
import { Icon } from '../Icon/Icon.js';
import { DrawerShell, focusDrawer } from '../Drawer/Drawer.js';
import { cartCount, cartLines, cartTotal, setQty, clearCart, closeCart } from '../../store/index.js';

function orderMessage(store) {
  const lines = cartLines(store).map(
    (l) => `• ${l.qty} × ${l.product.name} (${money(l.product.price, 'KES')})`
  );
  return [`Hello ${site.name}, I would like to order:`, ...lines, `Total: ${money(cartTotal(store), 'KES')}`].join('\n');
}

const Line = (l, currency) => html`
  <li class="cartline">
    <a class="cartline__img" href="${href(`/product/${l.product.id}`)}" data-act="close">
      <img src="${productImg(l.product.images[0], 480)}" alt="" width="72" height="90" loading="lazy">
    </a>
    <div class="cartline__info">
      <a class="cartline__name" href="${href(`/product/${l.product.id}`)}" data-act="close">${l.product.name}</a>
      <div class="cartline__price">${money(l.product.price, currency)}</div>
      <div class="qty" role="group" aria-label="Quantity of ${l.product.name}">
        <button data-qty="${l.id}" data-delta="-1" aria-label="Fewer">${Icon('minus')}</button>
        <span>${l.qty}</span>
        <button data-qty="${l.id}" data-delta="1" aria-label="More">${Icon('plus')}</button>
      </div>
    </div>
    <button class="cartline__rm" data-remove="${l.id}" aria-label="Remove ${l.product.name}">${Icon('trash')}</button>
  </li>`;

export const CartDrawer = {
  name: 'CartDrawer',
  watch: (s) => [s.cartOpen, s.cart, s.currency],
  render({ store }) {
    const lines = cartLines(store);
    const empty = !lines.length;
    return DrawerShell({
      open: store.cartOpen,
      side: 'right',
      label: 'Your cart',
      title: `Your cart${empty ? '' : ` · ${cartCount(store)}`}`,
      body: empty
        ? html`<div class="cartempty"><p>Your cart is empty.</p><a class="btn btn--outline" href="${href('/shop')}" data-act="close">Browse all pieces</a></div>`
        : html`<ul class="cartlist">${lines.map((l) => Line(l, store.currency))}</ul>`,
      footer: empty
        ? ''
        : html`
          <div class="carttotal"><span>Total</span><strong>${money(cartTotal(store), store.currency)}</strong></div>
          <p class="cartnote">We confirm availability and delivery on WhatsApp. No payment is taken on this site.</p>
          <a class="btn" href="${waLink(orderMessage(store))}" target="_blank" rel="noopener">${Icon('chat')} Order on WhatsApp</a>
          <button class="cartclear" data-act="clear">Clear cart</button>`,
    });
  },
  events: {
    'click [data-act="close"]': () => closeCart(),
    'click [data-qty]': (e, t, ctx) => {
      const id = t.dataset.qty;
      const line = ctx.store.cart.find((l) => l.id === id);
      ctx.el._refocus = `[data-qty="${id}"][data-delta="${t.dataset.delta}"]`;
      if (line) setQty(id, line.qty + Number(t.dataset.delta));
    },
    'click [data-remove]': (e, t) => setQty(t.dataset.remove, 0),
    'click [data-act="clear"]': () => clearCart(),
  },
  updated: (ctx) => focusDrawer(ctx, ctx.store.cartOpen),
  mounted(ctx) {
    const onKey = (e) => e.key === 'Escape' && ctx.store.cartOpen && closeCart();
    document.addEventListener('keydown', onKey);
    ctx.on(() => document.removeEventListener('keydown', onKey));
  },
};
