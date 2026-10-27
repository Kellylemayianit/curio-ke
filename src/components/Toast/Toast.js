import { html } from '../../core/html.js';

/** The host element carries aria-live, so screen readers announce each message. */
export const Toast = {
  name: 'Toast',
  watch: (s) => [s.toast],
  render({ store }) {
    return store.toast ? html`<div class="toast">${store.toast.text}</div>` : '';
  },
};
