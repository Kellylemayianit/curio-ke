import { mount } from './core/component.js';
import { store } from './store/index.js';
import { router } from './app/router.js';
import { App } from './app/App.js';

// 1. Read the URL first so the first paint is already the right page.
router.start();
// 2. Mount the shell. Everything below it is components all the way down.
mount(document.getElementById('app'), App, {}, { store });
document.documentElement.classList.add('is-ready');

// Offline support (HTTPS or localhost only).
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
