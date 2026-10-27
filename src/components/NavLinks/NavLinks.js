import { html } from '../../core/html.js';
import { href } from '../../core/router.js';
import { Icon } from '../Icon/Icon.js';
import { categories } from '../../data/categories.js';
import { getProduct } from '../../data/products.js';

/** Which nav entry is "current" for a route, e.g. a lion's page highlights "Carvings". */
export function activeKey(route) {
  switch (route.name) {
    case 'home': return 'home';
    case 'shop': return route.params.category || 'all';
    case 'product': return (getProduct(route.params.slug) || {}).category || 'all';
    case 'story': return 'story';
    case 'visit': return 'visit';
    case 'saved': return 'saved';
    default: return '';
  }
}

const link = (key, to, label, icon, active) => html`
  <a class="navlink ${active === key ? 'is-on' : ''}" href="${href(to)}" ${active === key ? html`aria-current="page"` : ''}>${Icon(icon)}${label}</a>`;

/** Shared by the desktop Sidebar and the mobile menu drawer. */
export function NavLinks(route) {
  const a = activeKey(route);
  return html`
    <nav aria-label="Browse">
      <div class="navgroup">Browse</div>
      ${link('home', '/', 'Home', 'home', a)}
      ${link('all', '/shop', 'All pieces', 'grid', a)}
      ${categories.map((c) => link(c.id, `/shop/${c.id}`, c.label, c.icon, a))}
    </nav>
    <nav aria-label="Shop">
      <div class="navgroup">Shop</div>
      ${link('saved', '/saved', 'Saved', 'heart', a)}
      ${link('story', '/story', 'Our story', 'story', a)}
      ${link('visit', '/visit', 'Visit us', 'visit', a)}
    </nav>`;
}
