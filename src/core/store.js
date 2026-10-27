/**
 * createStore — one small observable object for app-wide state.
 *
 *   const store = createStore({ cart: [] }, { persistKey: 'app', persistKeys: ['cart'] });
 *   store.set({ cart: [...] });           // shallow merge
 *   store.set((s) => ({ n: s.n + 1 }));   // or compute from current state
 *   const off = store.subscribe((state, prev) => { ... });
 *
 * Only the keys listed in persistKeys are saved to localStorage.
 */
export function createStore(initial, { persistKey, persistKeys = [] } = {}) {
  let state = { ...initial };
  const listeners = new Set();

  if (persistKey) {
    try {
      const saved = JSON.parse(localStorage.getItem(persistKey) || 'null');
      if (saved) for (const k of persistKeys) if (k in saved) state[k] = saved[k];
    } catch {
      /* storage blocked or corrupt: start fresh */
    }
  }

  const get = () => state;

  function set(patch) {
    const prev = state;
    const next = typeof patch === 'function' ? patch(prev) : patch;
    state = { ...prev, ...next };
    if (persistKey && persistKeys.some((k) => prev[k] !== state[k])) {
      try {
        const slice = Object.fromEntries(persistKeys.map((k) => [k, state[k]]));
        localStorage.setItem(persistKey, JSON.stringify(slice));
      } catch {
        /* ignore quota / private mode */
      }
    }
    listeners.forEach((fn) => fn(state, prev));
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  return { get, set, subscribe };
}
