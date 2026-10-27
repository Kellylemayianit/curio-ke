import { html } from '../../core/html.js';
import { site } from '../../config/site.js';

export function Footer() {
  const place = [site.location, site.country].filter(Boolean).join(', ');
  return html`
    <footer class="footer">
      <span>© ${new Date().getFullYear()} ${site.name} · ${place}</span>
      <span>Delivery across Kenya${site.deliveryNote ? ` · ${site.deliveryNote}` : ''}</span>
    </footer>`;
}
