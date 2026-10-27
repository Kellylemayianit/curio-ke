import { HomePage } from '../pages/Home/HomePage.js';
import { ShopPage } from '../pages/Shop/ShopPage.js';
import { ProductPage } from '../pages/Product/ProductPage.js';
import { StoryPage, VisitPage, SavedPage, NotFoundPage } from '../pages/Info/InfoPages.js';

/** Route name (see app/router.js) -> page component. */
export const pages = {
  home: HomePage,
  shop: ShopPage,
  product: ProductPage,
  saved: SavedPage,
  story: StoryPage,
  visit: VisitPage,
  'not-found': NotFoundPage,
};
