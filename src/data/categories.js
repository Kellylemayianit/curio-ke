/** The four shop categories from the design. `cover` is a product image id. */
export const categories = [
  { id: 'beadwork', label: 'Beadwork', short: 'Beadwork', icon: 'beads', cover: 'cuff-1', blurb: 'Cuffs, collars and necklaces, bead by bead.' },
  { id: 'carvings', label: 'Carvings', short: 'Carvings', icon: 'carving', cover: 'lion-1', blurb: 'Animals and figures carved from wood.' },
  { id: 'wear-kenya', label: 'Wear Kenya', short: 'Wear', icon: 'wear', cover: 'jersey-1', blurb: 'Shirts, jerseys, hats and bags.' },
  { id: 'art-decor', label: 'Art & decor', short: 'Art', icon: 'art', cover: 'map', blurb: 'Paintings, mirrors and things for the home.' },
];

export const getCategory = (id) => categories.find((c) => c.id === id);
