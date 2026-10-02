// Lo que no se publica: tu copia de los libros (pribatua/) y el visor que la
// abre solo existen en local. Y config.js lleva solo la clave pública.
import fs from 'fs';
import path from 'path';

export default async function(t){
  const read = f => fs.readFileSync(path.join(t.root, f), 'utf8');
  const pages = fs.readdirSync(t.root).filter(f => f.endsWith('.html'));
  t.ok(/^pribatua\/$/m.test(read('.gitignore')), 'pribatua/ está en .gitignore');
  const sw = read('sw.js');
  const ASSETS = new Function('return ' + sw.match(/var ASSETS = (\[[\s\S]*?\]);/)[1])();
  t.ok(!ASSETS.some(a => /pribatua|liburua\.js/.test(a)), 'sw.js no precachea ni tu libro ni su visor');
  t.ok(!pages.some(f => /<(script|link|a|iframe|img)[^>]+(src|href)="[^"]*(pribatua\/|liburua\.js)/.test(read(f))), 'ninguna página enlaza de forma fija a pribatua/ ni al visor');
  for (const f of ['arian.html', 'bakarka.html']) {
    const h = read(f), at = h.indexOf("'liburua.js'"), loader = h.slice(h.lastIndexOf('<script>', at), at);
    t.ok(at > 0 && /location\.hostname/.test(loader) && /if \(!local\) return;/.test(loader), f + ': el visor del libro solo se pide cuando la app se abre en local');
  }
  const viewer = read('liburua.js').replace(/\/\*[\s\S]*?\*\//g, '');
  t.ok(!/\.pdf['"]|\.mp3['"]/.test(viewer), 'el visor no lleva dentro ningún PDF ni audio: los enlaza tools/liburua.mjs en pribatua/');
  const tracked = fs.existsSync(path.join(t.root, '.git')) ? fs.readdirSync(t.root).filter(f => /\.(pdf|mp3|flv)$/i.test(f)) : [];
  t.ok(!tracked.length, 'no hay PDF ni audios en la raíz del proyecto' + (tracked.length ? ': ' + tracked.join(', ') : ''));

  const cfg = read('config.js').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  const key = (cfg.match(/key:\s*"([^"]*)"/) || [])[1];
  t.ok(key === '' || /^sb_publishable_/.test(key) || /^eyJ/.test(key), 'config.js: la clave es la pública (publishable) o está vacía');
  t.ok(!/service_role|sb_secret/.test(cfg), 'config.js no contiene ninguna clave secreta');
}
