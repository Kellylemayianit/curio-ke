import { products } from './products.js';
import { getCategory } from './categories.js';

export const SORTS = [
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Name: A to Z' },
];

const haystack = (p) =>
  [p.name, getCategory(p.category)?.label, p.keywords, p.material, p.blurb].join(' ').toLowerCase();

/** Filter + sort the catalogue. Every word in `q` must appear somewhere in the piece's text. */
export function queryProducts({ category = '', q = '', sort = 'newest', available = '' } = {}) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  let list = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!available || p.tag !== 'sold-out') &&
      words.every((w) => haystack(p).includes(w))
  );
  const by = {
    newest: (a, b) => a.order - b.order,
    'price-asc': (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity),
    'price-desc': (a, b) => (b.price ?? -1) - (a.price ?? -1),
    name: (a, b) => a.name.localeCompare(b.name),
  };
  return list.sort(by[sort] || by.newest);
}
