/**
 * A React-shaped component runtime in ~100 lines, with no virtual DOM.
 *
 * A component is a plain object (a "definition"):
 *
 *   export const Counter = {
 *     name: 'Counter',
 *     state: (props) => ({ n: 0 }),                       // local state (like useState)
 *     watch: (appState) => [appState.currency],           // re-render when these change
 *     render({ props, state, store }) {                   // returns html``
 *       return html`<button data-act="inc">${state.n}</button>`;
 *     },
 *     children: ({ props, state }) => [                   // nested components, by slot
 *       { slot: 'list', def: List, props: { items: [] } },   // <div data-slot="list">
 *     ],
 *     events: {                                           // delegated DOM events
 *       'click [data-act="inc"]': (e, target, ctx) => ctx.setState({ n: ctx.state.n + 1 }),
 *     },
 *     mounted(ctx) {},  updated(ctx) {},  destroyed(ctx) {},
 *   };
 *
 *   mount(document.querySelector('#root'), Counter, { label: 'hi' }, { store });
 *
 * ctx = { el, props, state, store (app state snapshot), env, setState, refresh, query, on }
 *   ctx.on(fn) registers a cleanup that runs when the component is destroyed.
 *
 * Re-rendering replaces the component's innerHTML, then re-mounts its children.
 * Keep components small (islands) so inputs you type into are never re-rendered.
 */
export function mount(host, def, props = {}, env = {}, parent = null) {
  const inst = {
    def,
    host,
    props,
    env,
    parent,
    state: def.state ? def.state(props) : {},
    children: [],
    cleanups: [],
    destroyed: false,
  };

  const ctx = {
    el: host,
    get props() {
      return inst.props;
    },
    get state() {
      return inst.state;
    },
    get store() {
      return env.store ? env.store.get() : {};
    },
    env,
    setState(patch) {
      inst.state = { ...inst.state, ...(typeof patch === 'function' ? patch(inst.state) : patch) };
      refresh();
    },
    refresh,
    query: (sel) => host.querySelector(sel),
    on: (fn) => inst.cleanups.push(fn),
  };
  inst.ctx = ctx;

  function destroyChildren() {
    inst.children.forEach((c) => c.destroy());
    inst.children = [];
  }

  function mountChildren() {
    if (!def.children) return;
    for (const child of def.children(ctx) || []) {
      if (!child) continue;
      const slot = host.querySelector(`[data-slot="${child.slot}"]`);
      if (slot) inst.children.push(mount(slot, child.def, child.props || {}, env, inst));
    }
  }

  function refresh() {
    if (inst.destroyed) return;
    destroyChildren();
    host.innerHTML = String(def.render(ctx));
    mountChildren();
    def.updated && def.updated(ctx);
  }

  function bindEvents() {
    for (const [key, handler] of Object.entries(def.events || {})) {
      const i = key.indexOf(' ');
      const type = i === -1 ? key : key.slice(0, i);
      const selector = i === -1 ? null : key.slice(i + 1);
      const listener = (e) => {
        const target = selector ? e.target.closest && e.target.closest(selector) : host;
        if (target && host.contains(target)) handler(e, target, ctx);
      };
      const capture = type === 'focus' || type === 'blur';
      host.addEventListener(type, listener, capture);
      inst.cleanups.push(() => host.removeEventListener(type, listener, capture));
    }
  }

  function watchStore() {
    if (!def.watch || !env.store) return;
    let last = def.watch(env.store.get());
    const off = env.store.subscribe((state) => {
      const next = def.watch(state);
      const changed = next.length !== last.length || next.some((v, i) => v !== last[i]);
      last = next;
      if (changed) refresh();
    });
    inst.cleanups.push(off);
  }

  inst.destroy = function destroy() {
    if (inst.destroyed) return;
    inst.destroyed = true;
    destroyChildren();
    inst.cleanups.forEach((fn) => fn());
    inst.cleanups = [];
    def.destroyed && def.destroyed(ctx);
  };

  host.innerHTML = String(def.render(ctx));
  bindEvents();
  watchStore();
  mountChildren();
  def.mounted && def.mounted(ctx);
  return inst;
}
