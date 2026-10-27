import { html } from '../../core/html.js';
import { href } from '../../core/router.js';
import { site } from '../../config/site.js';
import { categories } from '../../data/categories.js';
import { getProduct } from '../../data/products.js';
import { Hero } from '../../components/Hero/Hero.js';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard.js';
import { FilterChips } from '../../components/FilterChips/FilterChips.js';
import { StorySection } from '../../components/StorySection/StorySection.js';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid.js';

// "Our latest finds": the four pieces shown on the design's home page.
const LATEST = ['maasai-beaded-cuff', 'carved-ebony-lion', 'beaded-necklace-strands', 'kenya-jersey'];

export const HomePage = {
  name: 'HomePage',
  title: () => `${site.name} · ${site.descriptor}`,
  render() {
    return html`
      ${site.announcement ? html`<div class="announce">${site.announcement}</div>` : ''}
      ${Hero({ ...site.hero, to: '/shop' })}

      <div class="home__chips">${FilterChips({}, { short: true })}</div>

      <section class="section home__cats" aria-labelledby="h-cats">
        <div class="section__head"><h2 id="h-cats">Shop by category</h2><a href="${href('/shop')}">View all</a></div>
        <div class="grid grid--4">${categories.map(CategoryCard)}</div>
      </section>

      <section class="section home__latest" aria-labelledby="h-latest">
        <div class="section__head"><h2 id="h-latest"><i>Our latest finds</i></h2><a href="${href('/shop')}">View all</a></div>
        <div data-slot="latest"></div>
      </section>

      ${StorySection()}`;
  },
  children: () => [{ slot: 'latest', def: ProductGrid, props: { items: LATEST.map(getProduct), columns: 4 } }],
};
