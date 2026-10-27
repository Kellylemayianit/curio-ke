import { raw } from '../../core/html.js';

/** Line icons (24x24, stroke). The first eight paths come straight from the design. */
const paths = {
  home: 'M3 11l9-8 9 8M5 10v10h14V10',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  beads: 'M12 3a4 4 0 100 8 4 4 0 000-8zM12 13a4 4 0 100 8 4 4 0 000-8z',
  carving: 'M6 20V9l6-6 6 6v11M9 20v-5h6v5',
  wear: 'M8 3L3 7l3 3 2-1v12h8V9l2 1 3-3-5-4a4 4 0 01-8 0z',
  art: 'M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4',
  story: 'M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2M12 3a4 4 0 100 8 4 4 0 000-8z',
  visit: 'M12 21s-7-6-7-11a7 7 0 0114 0c0 5-7 11-7 11zM12 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4',
  heart: 'M12 20s-8-5.5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 5.5-8 11-8 11z',
  close: 'M5 5l14 14M19 5L5 19',
  menu: 'M4 7h16M4 12h16M4 17h16',
  bag: 'M5 8h14l-1 12H6zM9 8V6a3 3 0 016 0v2',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  trash: 'M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13',
  chat: 'M4 5h16v11H9l-5 4z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
};

export function Icon(name) {
  return raw(`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name] || ''}"></path></svg>`);
}
