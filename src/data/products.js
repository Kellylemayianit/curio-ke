/**
 * The catalogue. One object per piece, newest first.
 *
 *   images   ids of files in public/images/products/ (see tools/image-map.json);
 *            the first one is the main picture.
 *   tag      'new' | 'sold-out' | null
 *   price    KES. >>> SAMPLE PRICES: replace with the shop's real ones. <<<
 *   material / maker / dimensions / condition
 *            leave null when unknown; the page then says "Ask us".
 *
 * To add a piece: add a photo to tools/image-map.json, run tools/build-images.py,
 * then add an object here. No other file needs to change.
 */
const p = (id, name, category, price, images, extra = {}) => ({
  id, name, category, price, images,
  tag: null, material: null, maker: null, dimensions: null, condition: 'New, handmade',
  blurb: '', keywords: '',
  ...extra,
});

export const products = [
  p('maasai-beaded-cuff', 'Maasai beaded cuff', 'beadwork', 900, ['cuff-1', 'cuff-2'], {
    material: 'Glass seed beads on a stiff leather base',
    blurb: 'A wide cuff in the red, white and blue geometry of Maasai beadwork. Each pattern is worked by hand, so no two are exactly alike.',
    keywords: 'maasai bracelet bangle jewellery jewelry',
  }),
  p('carved-ebony-lion', 'Carved ebony lion', 'carvings', 6500, ['lion-1', 'lion-2', 'lion-3'], {
    tag: 'new', material: 'Carved hardwood, dark finish',
    blurb: 'A prowling lion carved in dark wood, with a mane worked in fine detail. A strong piece for a shelf, desk or entrance hall.',
    keywords: 'lion big five animal wood sculpture',
  }),
  p('beaded-necklace-strands', 'Beaded necklace strands', 'beadwork', 1200, ['strands-1', 'strands-2'], {
    material: 'Glass seed beads on thread',
    blurb: 'Long strands in every colour, from quiet black and white to bright orange and blue, some with beaded medallions.',
    keywords: 'necklace jewellery jewelry beads strands',
  }),
  p('kenya-jersey', 'Kenya jersey', 'wear-kenya', 2200, ['jersey-1', 'jersey-2', 'jersey-3'], {
    tag: 'sold-out', material: 'Quick-dry sports fabric',
    blurb: 'Black with the Kenyan flag on the sleeve and a red shield pattern down the sides. Ask us when the next batch arrives.',
    keywords: 'shirt football sport tshirt flag harambee stars',
  }),
  p('painted-africa-map', 'Painted Africa map', 'art-decor', 4200, ['map'], {
    tag: 'new', material: 'Painted glass in a studded frame',
    blurb: 'The continent rendered in zebra stripes, acacia trees and a rising sun, framed in black with a studded edge.',
    keywords: 'painting wall art zebra sun frame',
  }),
  p('carved-zebra-herd', 'Carved zebra herd', 'carvings', 2400, ['zebras-1', 'zebras-2'], {
    material: 'Carved wood, hand painted',
    blurb: 'Hand-painted zebras in black and white stripes, sold singly or as a herd. Lovely on a windowsill or shelf.',
    keywords: 'zebra animal wood painted stripes',
  }),
  p('maasai-collar-necklaces', 'Maasai collar necklaces', 'beadwork', 2600, ['collars'], {
    tag: 'new', material: 'Glass beads on wire',
    blurb: 'Broad, flat collars in blue, red and white, hung with beaded fringes, in the style worn at Maasai ceremonies.',
    keywords: 'collar necklace maasai jewellery jewelry blue',
  }),
  p('carved-giraffe-trio', 'Carved giraffe trio', 'carvings', 5200, ['giraffes-1', 'giraffes-2'], {
    material: 'Carved wood, hand patterned',
    blurb: 'Tall giraffes with a patterned coat, standing from knee height to nearly as tall as you. Great for a corner or a hallway.',
    keywords: 'giraffe animal wood tall floor',
  }),
  p('big-cats-and-elephant', 'Big cats and elephant', 'carvings', 9800, ['bigcats', 'lion-3'], {
    material: 'Carved hardwood, dark finish',
    blurb: 'A lion, a trunk-raised elephant and a resting panther, all carved in dark wood. Sold as a set or one by one.',
    keywords: 'lion elephant panther leopard animal wood set',
  }),
  p('statement-bead-necklaces', 'Statement bead necklaces', 'beadwork', 1800, ['statement'], {
    material: 'Wood, glass and seed beads',
    blurb: 'Chunky layered necklaces with a teardrop shape, in earthy browns or a riot of colour.',
    keywords: 'necklace wooden beads jewellery jewelry',
  }),
  p('memories-of-kenya-tee', 'Memories of Kenya tee (white)', 'wear-kenya', 1200, ['tee-white-1'], {
    material: 'Cotton', blurb: 'A soft white cotton tee with a printed lion and "Memories of Kenya" across the chest.',
    keywords: 'tshirt shirt souvenir lion cotton',
  }),
  p('memories-of-kenya-tee-grey', 'Memories of Kenya tee (grey)', 'wear-kenya', 1200, ['tee-grey'], {
    material: 'Cotton', blurb: 'The same lion print on a heather grey tee.', keywords: 'tshirt shirt souvenir lion cotton grey',
  }),
  p('african-print-dashiki', 'African print dashiki', 'wear-kenya', 1800, ['dashiki'], {
    material: 'Printed cotton',
    blurb: 'A loose, bright dashiki with embroidered neckline and a bold geometric print.',
    keywords: 'shirt clothing kitenge print blue',
  }),
  p('maasai-warrior-figures', 'Maasai warrior figures', 'carvings', 1800, ['warriors'], {
    material: 'Carved wood, painted',
    blurb: 'Slim standing warriors in red and black, with spears and shields. Display them together as a group.',
    keywords: 'maasai warrior figure statue wood',
  }),
  p('woven-painted-mirrors', 'Woven and painted mirrors', 'art-decor', 3600, ['mirrors'], {
    material: 'Woven fibre, paint and glass',
    blurb: 'Round mirrors edged in coiled, patterned weave in green, red and black. A lively point of colour on a wall.',
    keywords: 'mirror wall decor woven basket home',
  }),
  p('elephant-batik-painting', 'Elephant painting', 'art-decor', 2800, ['elephant-art'], {
    material: 'Paint on cloth',
    blurb: 'A glowing orange elephant on black, painted with tusks and trunk in strong, graphic lines.',
    keywords: 'painting wall art elephant batik canvas',
  }),
  p('woman-with-water-pot-painting', 'Woman with water pot painting', 'art-decor', 2800, ['woman-art'], {
    material: 'Paint on cloth',
    blurb: 'A woman carrying a pot, in warm oranges and golds on black. A classic scene of daily life.',
    keywords: 'painting wall art woman batik canvas',
  }),
  p('calabash-painting', 'Calabash painting', 'art-decor', 3000, ['calabash-art'], {
    material: 'Paint on board',
    blurb: 'Water pouring from gourd to gourd, painted in bright blue, orange and green on black.',
    keywords: 'painting wall art gourd water',
  }),
  p('safari-print-shirt', 'Safari print shirt', 'wear-kenya', 1600, ['shirt-1', 'shirt-2'], {
    material: 'Printed cotton',
    blurb: 'A blue and white patchwork print of palms, zebras and elephants, with a light, easy fit.',
    keywords: 'shirt clothing animal print blue white',
  }),
  p('lion-print-cotton-shirt', 'Lion print cotton shirt', 'wear-kenya', 1500, ['shirt-lion'], {
    material: 'Cotton',
    blurb: 'An undyed cotton shirt with a black print of the big five. Cool and loose in the heat.',
    keywords: 'shirt clothing cotton lion big five',
  }),
  p('beaded-felt-hat', 'Beaded felt hat', 'wear-kenya', 3200, ['hat'], {
    material: 'Felt with a beaded band',
    blurb: 'A cobalt blue felt hat finished with a band of multicoloured beadwork.',
    keywords: 'hat fedora blue beaded accessory',
  }),
  p('kitenge-handbags', 'Kitenge handbags', 'wear-kenya', 2800, ['bags-1'], {
    material: 'Printed cotton, lined',
    blurb: 'Bags in bold African prints and zebra stripes, with sturdy handles.',
    keywords: 'bag handbag tote kitenge print zebra',
  }),
  p('fabric-and-leather-bags', 'Fabric and leather bags', 'wear-kenya', 3500, ['bags-2'], {
    material: 'Leather and printed cotton',
    blurb: 'Soft bags that mix leather with African print, in a range of shapes.',
    keywords: 'bag handbag leather print',
  }),
  p('kitenge-shirts-and-wraps', 'Kitenge shirts and wraps', 'wear-kenya', 2000, ['kitenge'], {
    material: 'Printed cotton',
    blurb: 'A rail of bright printed shirts, dresses and wraps, in more patterns than we can list. Ask to see more.',
    keywords: 'dress kitenge clothing wrap shirt print',
  }),
  p('cowrie-and-bead-earrings', 'Cowrie and bead earrings', 'beadwork', 450, ['earrings'], {
    material: 'Shell, glass beads and metal',
    blurb: 'Dozens of earrings to choose from: cowrie shells, hoops and tassels, in every colour.',
    keywords: 'earrings jewellery jewelry cowrie shell',
  }),
  p('beaded-bracelet-stack', 'Beaded bracelet stack', 'beadwork', 600, ['bracelets'], {
    material: 'Glass seed beads',
    blurb: 'Slim beaded bracelets and rings to wear in stacks. Pick a handful and mix the colours.',
    keywords: 'bracelet bangle jewellery jewelry beads',
  }),
  p('long-beaded-necklaces', 'Long beaded necklaces', 'beadwork', 1400, ['giraffe-beads'], {
    material: 'Glass and wooden beads',
    blurb: 'Long ropes of beads in black, white, orange and red, for wearing single or doubled.',
    keywords: 'necklace jewellery jewelry beads long',
  }),
  p('carved-rhino-and-elephant-heads', 'Carved rhino and elephant heads', 'carvings', 3800, ['headsets'], {
    material: 'Carved wood',
    blurb: 'Wall-ready animal heads in pale and dark wood, from a tidy rhino to a stately elephant.',
    keywords: 'rhino elephant head wall animal wood',
  }),
  p('carved-busts-and-totems', 'Carved busts and totems', 'carvings', 7400, ['busts'], {
    material: 'Carved hardwood, dark finish',
    blurb: 'Faces and stacked figures carved in dark wood, from small busts to tall totems.',
    keywords: 'bust totem figure statue wood face',
  }),
  p('wooden-bowls-and-trays', 'Wooden bowls and trays', 'carvings', 1500, ['bowls'], {
    material: 'Carved wood',
    blurb: 'Smooth carved bowls and trays for the table, from small dishes to broad serving trays.',
    keywords: 'bowl tray dish wooden kitchen table',
  }),
  p('painted-gourd-bowls', 'Painted gourd bowls', 'art-decor', 1200, ['gourds'], {
    material: 'Gourd, paint',
    blurb: 'Gourds cut and painted with bold animal patterns, for fruit, keys or simply to be looked at.',
    keywords: 'gourd bowl painted decor home',
  }),
  p('candle-holder-figures', 'Candle holder figures', 'art-decor', 1600, ['candle'], {
    material: 'Metal and painted metal',
    blurb: 'Slim figures in patterned dresses, each holding a candle dish on its head.',
    keywords: 'candle holder figure woman metal decor',
  }),
  p('wildlife-art-panels', 'Wildlife art panels', 'art-decor', 1500, ['panels'], {
    material: 'Natural fibre, framed',
    blurb: 'Tall panels of lions, elephants and giraffes in natural earthy tones.',
    keywords: 'art panel wall wildlife lion elephant',
  }),
  p('wire-and-tin-creatures', 'Wire and tin creatures', 'art-decor', 1100, ['wire'], {
    material: 'Recycled metal and tin',
    blurb: 'Playful bugs, bikes and beetles made from scrap metal and bottle tops.',
    keywords: 'recycled metal wire toy decor tin',
  }),
  p('animal-photo-frames', 'Animal photo frames', 'art-decor', 1300, ['frames'], {
    material: 'Wood, with safari print inserts',
    blurb: 'Wooden frames cut with animal outlines, ready for your own photos or a safari print.',
    keywords: 'frame photo wood animal decor',
  }),
  p('safari-fridge-magnets', 'Safari fridge magnets', 'art-decor', 250, ['magnets'], {
    material: 'Painted wood and resin',
    blurb: 'Small magnets of animals, masks and scenes: an easy gift to take home.',
    keywords: 'magnet souvenir gift small fridge',
  }),
].map((x, i) => ({ ...x, order: i }));

export const getProduct = (id) => products.find((x) => x.id === id);
export const inCategory = (id) => products.filter((x) => x.category === id);
