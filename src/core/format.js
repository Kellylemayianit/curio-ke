import { imageBase, site } from '../config/site.js';

/** 1200 -> "Ksh 1,200"; in USD -> "$9". Display only. */
export function money(kes, currency = 'KES') {
  if (kes == null) return 'Ask for price';
  if (currency === 'USD') {
    const usd = kes * site.usdPerKes;
    return `$${usd < 10 ? usd.toFixed(1).replace(/\.0$/, '') : Math.round(usd).toLocaleString('en-US')}`;
  }
  return `Ksh ${Math.round(kes).toLocaleString('en-KE')}`;
}

/** Product picture URL. Sizes built by tools/build-images.py: 480 and 960. */
export const productImg = (id, width = 480) => `${imageBase}/products/${id}-${width}.jpg`;

export const productSrcset = (id) => `${productImg(id, 480)} 480w, ${productImg(id, 960)} 960w`;

export const waLink = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
