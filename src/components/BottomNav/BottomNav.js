import { html } from '../../core/html.js';
import { href } from '../../core/router.js';
import { Icon } from '../Icon/Icon.js';
import { activeKey } from '../NavLinks/NavLinks.js';

const tabs = [
  { key: 'home', to: '/', label: 'Home', icon: 'home' },
  { key: 'all', to: '/shop', label: 'Shop', icon: 'grid' },
  { key: 'saved', to: '/saved', label: 'Saved', icon: 'heart' },
  { key: 'visit', to: '/visit', label: 'Visit', icon: 'visit' },
];

/** Mobile-only tab bar (the design's fourth artboard). */
export const BottomNav = {
  name: 'BottomNav',
  watch: (s) => [s.route],
  render({ store }) {
    let a = activeKey(store.route);
    if (['beadwork', 'carvings', 'wear-kenya', 'art-decor'].includes(a)) a = 'all';
    return html`
      <nav class="bottomnav" aria-label="Quick links">
        ${tabs.map((t) => html`
          <a class="navlink ${a === t.key ? 'is-on' : ''}" href="${href(t.to)}" ${a === t.key ? html`aria-current="page"` : ''}>${Icon(t.icon)}${t.label}</a>`)}
      </nav>`;
  },
};
