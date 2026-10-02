#!/usr/bin/env node
/* ── Tus libros, al lado de las hojas de respuestas ───────────────────────
   Las hojas no llevan el texto de los libros: se trabaja con el libro
   delante. Para no depender del papel, este script ENLAZA tus propios PDF y
   audios dentro de pribatua/ (carpeta local, ignorada por git) y escribe el
   índice que usa el visor (liburua.js, que solo se carga en local):

     pribatua/arian-a1/liburua.pdf, 10-unitatea.pdf, audio/NNN.mp3
     pribatua/bakarka-1/liburua.pdf
     pribatua/index.js      → qué página del PDF es cada página impresa

   node tools/liburua.mjs --arian <pdf> --arian-audio <carpeta> --bakarka <pdf>            → dice lo que haría
   node tools/liburua.mjs --arian <pdf> --arian-audio <carpeta> --bakarka <pdf> --idatzi   → lo hace (enlaces simbólicos)
     --kopiatu           copia los ficheros en vez de enlazarlos
   Las rutas se recuerdan en pribatua/bideak.json (también local): la siguiente
   vez basta con  node tools/liburua.mjs --idatzi.  En ese fichero se pueden
   añadir PDF sueltos con páginas que al libro entero le falten («gehigarriak»).

   No copia ni convierte nada de los libros: son enlaces a ficheros que ya
   son tuyos. Nada de pribatua/ entra en el repositorio ni en la web publicada.
   Después, abre la app en local:  python3 -m http.server 8000  → http://localhost:8000
   ───────────────────────────────────────────────────────────────────── */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const WRITE = args.includes('--idatzi'), COPY = args.includes('--kopiatu');
const opt = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const BIDEAK = path.join(ROOT, 'pribatua', 'bideak.json');
let bideak = {};
try { bideak = JSON.parse(fs.readFileSync(BIDEAK, 'utf8')); } catch (e) {}
const B = k => bideak[k] || (bideak[k] = {});
if (opt('--arian')) B('arian').pdf = path.resolve(opt('--arian'));
if (opt('--arian-audio')) B('arian').audio = path.resolve(opt('--arian-audio'));
if (opt('--bakarka')) B('bakarka1').pdf = path.resolve(opt('--bakarka'));

/* mapa: [página del PDF desde, hasta, desfase] → página impresa = página del PDF + desfase.
   Vale para los escaneados con los que se prepararon las hojas: al de Arian A1 (249 páginas) le
   faltan las portadas de unidad y alguna página suelta, por eso el desfase va creciendo; en el de
   Bakarka 1 (257 páginas), página del PDF = página impresa. Con otro PDF, cambia el mapa aquí. */
const LIBURUAK = {
  arian: {
    izena: 'Arian A1', dir: 'pribatua/arian-a1', pdf: B('arian').pdf, audio: B('arian').audio, gehigarriak: B('arian').gehigarriak,
    mapa: [[6, 28, 7], [29, 52, 8], [53, 75, 9], [76, 92, 10], [93, 96, 11], [97, 109, 13], [110, 128, 14],
           [129, 148, 15], [149, 167, 17], [168, 186, 18], [187, 203, 21], [204, 226, 22], [227, 249, 23]]
  },
  bakarka1: { izena: 'Bakarka 1', dir: 'pribatua/bakarka-1', pdf: B('bakarka1').pdf, gehigarriak: B('bakarka1').gehigarriak, mapa: [[1, 257, 0]] }
};
const tilde = f => String(f).replace(os.homedir(), '~');

function put(src, dst){
  if (!WRITE) return;
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  try { fs.unlinkSync(dst); } catch (e) {}
  if (COPY) fs.copyFileSync(src, dst); else fs.symlinkSync(src, dst);
}

const index = {};
for (const [key, b] of Object.entries(LIBURUAK)) {
  const dir = path.join(ROOT, b.dir), out = { izena: b.izena, mapa: b.mapa, audioak: {} };
  console.log(`\n${b.izena} → ${b.dir}/`);
  if (b.pdf && fs.existsSync(b.pdf)) {
    put(b.pdf, path.join(dir, 'liburua.pdf')); out.pdf = b.dir + '/liburua.pdf';
    const last = b.mapa[b.mapa.length - 1];
    console.log(`  PDF: ${tilde(b.pdf)}\n       páginas impresas ${b.mapa[0][0] + b.mapa[0][2]}–${last[1] + last[2]} en ${b.mapa.length} tramo(s)`);
  } else console.log(b.pdf ? `  PDF: no está en ${tilde(b.pdf)}` : '  PDF: sin indicar');
  (b.gehigarriak || []).forEach(g => {
    if (!fs.existsSync(g.pdf)) { console.log(`  PDF suelto: no está ${tilde(g.pdf)}`); return; }
    put(g.pdf, path.join(dir, g.izena));
    (out.gehigarriak = out.gehigarriak || []).push({ pdf: b.dir + '/' + g.izena, mapa: g.mapa });
    console.log(`  PDF suelto: ${path.basename(g.pdf)} → páginas impresas ${g.mapa.map(m => (m[0] + m[2]) + '–' + (m[1] + m[2])).join(', ')}`);
  });
  if (b.audio && fs.existsSync(b.audio)) {
    const mp3 = fs.readdirSync(b.audio).filter(f => /^\d{1,3}\b.*\.mp3$/i.test(f)).sort();
    mp3.forEach(f => { const n = parseInt(f, 10), name = String(n).padStart(3, '0') + '.mp3';
      put(path.join(b.audio, f), path.join(dir, 'audio', name)); out.audioak[n] = b.dir + '/audio/' + name; });
    const ns = Object.keys(out.audioak).map(Number);
    console.log(`  audio: ${mp3.length} pistas` + (ns.length ? ` (de la ${Math.min(...ns)} a la ${Math.max(...ns)})` : ''));
  } else if (b.audio) console.log(`  audio: no hay carpeta ${tilde(b.audio)}`);
  if (out.pdf || out.gehigarriak || Object.keys(out.audioak).length) index[key] = out;
}
if (WRITE) {
  fs.mkdirSync(path.join(ROOT, 'pribatua'), { recursive: true });
  fs.writeFileSync(BIDEAK, JSON.stringify(bideak, null, 2) + '\n');
  fs.writeFileSync(path.join(ROOT, 'pribatua', 'index.js'),
    '/* Índice de tus copias de los libros (lo escribe tools/liburua.mjs). Solo en local: no se publica. */\n' +
    'window.NIRE_LIBURUAK = ' + JSON.stringify(index) + ';\n');
}
console.log(WRITE ? `\nHecho (${COPY ? 'copiados' : 'enlazados'}): pribatua/index.js. Abre la app en local: las hojas ofrecen «📖 página» y «▶ pista».` : '\nNada escrito. Añade --idatzi para hacerlo.');
