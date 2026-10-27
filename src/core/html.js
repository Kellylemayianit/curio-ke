/**
 * html`` — a tiny tagged template for building markup safely.
 *
 *   html`<h3>${product.name}</h3>`            // text is escaped automatically
 *   html`<ul>${items.map(i => html`<li>${i}</li>`)}</ul>`   // arrays are joined
 *   html`<div>${raw(svgString)}</div>`        // opt out of escaping (trusted only)
 *
 * Anything returned from html`` is a SafeString, so nesting templates never
 * double-escapes. null / undefined / false render as nothing.
 */
const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export class SafeString {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

export const raw = (value) => new SafeString(String(value));

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

function renderValue(value) {
  if (value == null || value === false || value === true) return '';
  if (value instanceof SafeString) return value.value;
  if (Array.isArray(value)) return value.map(renderValue).join('');
  return escapeHtml(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) out += renderValue(values[i]) + strings[i + 1];
  return new SafeString(out);
}
