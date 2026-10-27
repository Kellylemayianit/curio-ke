import { html } from '../../core/html.js';
import { site } from '../../config/site.js';
import { href } from '../../core/router.js';
import { Icon } from '../Icon/Icon.js';
import { NavLinks } from '../NavLinks/NavLinks.js';
import { closeMenu } from '../../store/index.js';

/** Shared drawer chrome: backdrop + sliding panel. Used by the menu and the cart. */
export function DrawerShell({ open, side, label, title, body, footer }) {
  return html`
    <div class="drawer drawer--${side} ${open ? 'is-open' : ''}" ${open ? '' : 'hidden'}>
      <div class="drawer__backdrop" data-act="close"></div>
      <section class="drawer__panel" role="dialog" aria-modal="true" aria-label="${label}">
        <header class="drawer__head">
          <h2>${title}</h2>
          <button class="drawer__close" data-act="close" aria-label="Close">${Icon('close')}</button>
        </header>
        <div class="drawer__body">${body}</div>
        ${footer ? html`<footer class="drawer__foot">${footer}</footer>` : ''}
      </section>
    </div>`;
}

/** Move focus into the drawer when it opens (not on every re-render), and back to a requested control. */
export function focusDrawer(ctx, open) {
  const wasOpen = ctx.el.dataset.open === '1';
  ctx.el.dataset.open = open ? '1' : '';
  if (!open) return;
  if (ctx.el._refocus) {
    const el = ctx.query(ctx.el._refocus);
    ctx.el._refocus = null;
    if (el) return el.focus({ preventScroll: true });
  }
  if (!wasOpen) {
    const btn = ctx.query('.drawer__close');
    btn && btn.focus({ preventScroll: true });
  }
}

/** Mobile menu: the same links as the desktop sidebar. */
export const NavDrawer = {
  name: 'NavDrawer',
  watch: (s) => [s.menuOpen, s.route],
  render({ store }) {
    return DrawerShell({
      open: store.menuOpen,
      side: 'left',
      label: 'Menu',
      title: html`<a class="logo drawer__logo" href="${href('/')}">${site.name.toUpperCase()}</a>`,
      body: html`<div class="drawer__nav">${NavLinks(store.route)}</div>`,
    });
  },
  events: {
    'click [data-act="close"]': () => closeMenu(),
    'click .navlink': () => closeMenu(),
  },
  updated: (ctx) => focusDrawer(ctx, ctx.store.menuOpen),
  mounted(ctx) {
    const onKey = (e) => e.key === 'Escape' && ctx.store.menuOpen && closeMenu();
    document.addEventListener('keydown', onKey);
    ctx.on(() => document.removeEventListener('keydown', onKey));
  },
};
