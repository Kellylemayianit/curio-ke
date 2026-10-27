#!/usr/bin/env node
// Production build:  npm run build  ->  dist/
// Bundles the ES modules into one minified JS file and the CSS imports into one CSS file.
// Everything else (images, fonts, manifest, service worker) is copied as is.
import { build } from 'esbuild';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });

await build({ entryPoints: { app: 'src/main.js' }, bundle: true, minify: true, format: 'esm', target: 'es2020', outdir: 'dist/assets' });
await build({
  entryPoints: { app: 'src/styles/main.css' }, bundle: true, minify: true, outdir: 'dist/assets',
  external: ['../../public/*'], // font URLs stay as plain URLs
});

// The CSS now lives one folder deeper than src/styles did relative to public/.
let css = await readFile('dist/assets/app.css', 'utf8');
css = css.replaceAll('../../public/', '../public/');
await writeFile('dist/assets/app.css', css);

let page = await readFile('index.html', 'utf8');
page = page.replace('src/styles/main.css', 'assets/app.css').replace('src/main.js', 'assets/app.js');
await writeFile('dist/index.html', page);

await cp('public', 'dist/public', { recursive: true });
await cp('manifest.webmanifest', 'dist/manifest.webmanifest');
await cp('sw.js', 'dist/sw.js');
console.log('Built to dist/. Preview with:  node tools/serve.mjs dist');
