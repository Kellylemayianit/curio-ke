/**
 * Shop-wide settings. Edit this file and everything on the site follows.
 * Values marked TODO are placeholders to replace with the real ones.
 */
export const site = {
  name: 'Curio',
  descriptor: 'Kenyan cultural antiques',
  location: '', // TODO e.g. 'Nairobi'. Shown in the footer and on the Visit page.
  country: 'Kenya',

  // TODO: the shop's real WhatsApp number, international format, digits only.
  whatsapp: '254700000000',
  phone: '', // optional, shown on the Visit page
  email: '', // optional
  hours: [], // optional, e.g. [['Mon to Sat', '9am to 6pm'], ['Sunday', '10am to 4pm']]

  announcement: 'Delivery across Kenya · WhatsApp orders welcome',
  deliveryNote: 'Ask us about shipping abroad',

  // Display-only conversion for the KES / USD switch. TODO: set the current rate.
  usdPerKes: 1 / 129,

  hero: {
    kicker: 'Kenyan cultural antiques',
    title: 'Objects with a past, from the heart of Kenya.',
    text: 'Carvings, beadwork and wearable heritage, gathered from the artisans of Kenya.',
    image: 'hero', // public/images/site/hero-{800,1600}.jpg
    cta: 'Explore the collection',
  },

  story: {
    kicker: 'Our story',
    title: 'Every piece carries a place',
    // TODO: replace with the shop's own story: who the artisans are and where pieces come from.
    short:
      'Each carving, bracelet and shirt on our shelves was made by hand in Kenya. We gather them, look after them, and pass them on to people who will keep them.',
    long: [
      'Curio began with a simple idea: the things Kenyans make by hand deserve a shelf of their own. Bead by bead and cut by cut, artisans turn wood, glass, leather and cloth into objects that carry the habits and stories of the places they come from.',
      'Our shelves hold Maasai beadwork, carved animals and figures, printed shirts and the national colours worn with pride, and paintings that bring the landscape indoors. Every piece is chosen because it is well made and because it means something.',
      'Ask us about any piece. We are happy to tell you what we know about how it was made, and to help you choose something to take home or send to someone you love.',
    ],
    image: 'map',
  },
};

export const imageBase = 'public/images';
