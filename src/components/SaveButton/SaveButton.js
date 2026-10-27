import { html } from '../../core/html.js';
import { Icon } from '../Icon/Icon.js';
import { toggleSaved } from '../../store/index.js';

/** props: { id } — a heart toggle that stays in sync with the saved list. */
export const SaveButton = {
  name: 'SaveButton',
  watch: (s) => [s.saved],
  render({ props, store }) {
    const on = store.saved.includes(props.id);
    return html`<button class="pill savebtn ${on ? 'is-on' : ''}" aria-pressed="${on}">${Icon('heart')}${on ? 'Saved' : 'Save'}</button>`;
  },
  events: { 'click .savebtn': (e, t, ctx) => toggleSaved(ctx.props.id) },
};
