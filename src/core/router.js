/**
 * A hash router (#/shop/beadwork?sort=price-asc).
 *
 * Hash routes need no server rewrites, so the site works on any static host,
 * a subfolder, or GitHub Pages.
 *
 *   const router = createRouter(
 *     [{ name: 'shop', path: '/shop/:category?' }, ...],
 *     (route) => store.set({ route })
 *   );
 *   router.start();
 *   router.navigate('/shop?q=lion');
 *
 * route = { name, path, params, query }
 */
function compile(pattern) {
  const keys = [];
  const source = pattern.replace(/\/:(\w+)(\?)?/g, (_, key, optional) => {
    keys.push(key);
    return optional ? '(?:/([^/]+))?' : '/([^/]+)';
  });
  return { keys, regex: new RegExp(`^${source === '' ? '/' : source}/?$`) };
}

export const href = (to) => `#${to}`;

export function buildQuery(params) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== '' && v != null && v !== false) qs.set(k, v);
  const s = qs.toString();
  return s ? `?${s}` : '';
}

export function createRouter(routes, onChange, notFound = { name: 'not-found' }) {
  const table = routes.map((r) => ({ ...r, ...compile(r.path) }));

  function parse() {
    const raw = location.hash.replace(/^#/, '') || '/';
    const [path, qs = ''] = raw.split('?');
    const query = Object.fromEntries(new URLSearchParams(qs));
    for (const r of table) {
      const m = r.regex.exec(path);
      if (m) {
        const params = {};
        r.keys.forEach((k, i) => {
          if (m[i + 1] != null) params[k] = decodeURIComponent(m[i + 1]);
        });
        return { name: r.name, path, params, query };
      }
    }
    return { ...notFound, path, params: {}, query };
  }

  const sync = () => onChange(parse());

  return {
    start() {
      window.addEventListener('hashchange', sync);
      sync();
    },
    navigate(to, { replace = false } = {}) {
      if (replace) {
        history.replaceState(null, '', `#${to}`);
        sync();
      } else {
        location.hash = to;
      }
    },
  };
}
