import { html } from '../../core/html.js';
import { href } from '../../core/router.js';
import { site } from '../../config/site.js';
import { waLink } from '../../core/format.js';
import { NavLinks } from '../NavLinks/NavLinks.js';

export const Sidebar = {
  name: 'Sidebar',
  watch: (s) => [s.route],
  render({ store }) {
    return html`
      <aside class="sidebar">
        <div class="sidebar__brand">
          <a class="logo" href="${href('/')}" aria-label="${site.name} home">${site.name.toUpperCase()}</a>
          <small>${site.descriptor}</small>
        </div>
        ${NavLinks(store.route)}
        <a class="sidebar__wa" href="${waLink(`Hello ${site.name}, I would like to order.`)}" target="_blank" rel="noopener">Order on WhatsApp</a>
      </aside>`;
  },
};
