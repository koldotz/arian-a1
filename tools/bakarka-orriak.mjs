#!/usr/bin/env node
/* ── Bakarka 1 → hojas de respuestas ───────────────────────────────────────
   Genera datuak/bakarka-1.js y datuak/bakarka-1-erantzunak.js a partir de la
   ESTRUCTURA de una transcripción personal del libro, que solo existe en tu
   ordenador (nunca en el repositorio). A la web va únicamente:
     · de cada ejercicio: su número, su página, la página del solucionario,
       cuántos puntos tiene y de qué tipo son (hueco o frase);
     · de las soluciones del libro: en los huecos, la palabra que falta; en
       las frases, solo su HUELLA (un resumen numérico), que permite decir si
       lo que escribes coincide con el solucionario sin llevar aquí la frase.
   No van enunciados, frases, diálogos, lecturas ni teoría: se leen en el libro.
   Las notas de cada lección («lan») son propias (⚠ Claude) y están aquí abajo.

   node tools/bakarka-orriak.mjs                 → dice lo que generaría
   node tools/bakarka-orriak.mjs --idatzi        → escribe los dos ficheros
   node tools/bakarka-orriak.mjs --egiaztatu     → comprueba que los ficheros publicados son los que saldrían ahora
     --iturria <fichero>   la transcripción (por defecto, la que diga pribatua/bideak.json
                           en «bakarkaTranskripzioa», o pribatua/armairua-a1-bakarka1-data.js)
   ───────────────────────────────────────────────────────────────────── */
import fs from 'fs';
import os from 'os';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const WRITE = args.includes('--idatzi'), CHECK = args.includes('--egiaztatu');
const opt = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
let bideak = {};
try { bideak = JSON.parse(fs.readFileSync(path.join(ROOT, 'pribatua', 'bideak.json'), 'utf8')); } catch (e) {}
const SRC = opt('--iturria') || [bideak.bakarkaTranskripzioa, path.join(ROOT, 'pribatua', 'armairua-a1-bakarka1-data.js')].find(f => f && fs.existsSync(f));
if (!SRC || !fs.existsSync(SRC)) { console.error('No encuentro la transcripción de Bakarka 1. Indícala con --iturria <fichero>.'); process.exit(1); }

/* las mismas funciones que usa la web para pintar y para comparar */
const web = {}; web.window = web; web.globalThis = web; vm.createContext(web);
for (const f of ['orriak.js', 'egiaztatu.js']) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), web, { filename: f });
const { ik } = web.ORRIAK, { huella, kanon } = web.EGIAZTATU;

const priv = {}; priv.window = priv; vm.createContext(priv);
vm.runInContext(fs.readFileSync(SRC, 'utf8'), priv, { filename: SRC });
const UNITS = priv.A1_ITURRIAK.unitateak.filter(u => u.src === 'bakarka1');

/* ── notas propias de cada lección: qué se trabaja y dónde está en Geruzak ── */
const G = { 3: 'El sintagma nominal', 4: 'Hau, hori, hura', 6: 'Los casos', 8: 'Los interrogativos', 9: 'IZAN', 10: 'UKAN', 11: 'El aspecto: -tu, -t(z)en, -ko', 12: 'Verbos sintéticos',
  13: 'Cuando entra un tercero', 14: 'Nahi, behar, ahal y ari izan', 15: 'La negación y el partitivo', 16: 'Adjetivos y posposiciones', 17: 'Números, hora y calendario', 19: 'La subordinación' };
const OHARRAK = {
  2: { lan: 'Preguntar qué es algo y quién es alguien: los demostrativos **hau, hori, hura**, el verbo *izan* (**naiz, zara, da**) y los interrogativos **zer** y **nor**. En el sintagma, el artículo **-a** va al final.', lot: [4, 9, 3, 8] },
  3: { lan: 'El plural: **-ak**, **hauek / horiek / haiek** y **gara, zarete, dira**. Preguntar cómo es algo (**nolakoa**), la partícula **al** de las preguntas, los primeros números y *oso*, *beste*.', lot: [3, 4, 9, 17] },
  4: { lan: 'El verbo *ukan* (**dut, duzu, du…**) y su sujeto en **nork** (**-k, -ak, -ek**). El **ba-** afirmativo (*badut*) y el partitivo **-(r)ik** en negaciones y preguntas.', lot: [10, 6, 15] },
  5: { lan: 'El objeto en singular o en plural: **dut / ditut**. Los números y la edad, y tres verbos que se apoyan en el auxiliar: **nahi**, **behar** y **balio izan**.', lot: [10, 17, 14] },
  6: { lan: 'Dónde: el caso **non** (**-n, -an, -ean, -etan**) y *bizi izan*. Las negativas **ezer ez**, **inor ez**, **inon ez**.', lot: [6, 15] },
  7: { lan: 'Lo que ha pasado: participio + auxiliar (**ikusi dut**, **etorri naiz**). La completiva con **-(e)la** y dos maneras de dar la causa: **bait-** y **eta** al final de la frase.', lot: [11, 19], falta: '*bait-* y el *eta* explicativo todavía no están explicados en Geruzak.' },
  8: { lan: 'De quién es algo: el genitivo **noren** (**-(r)en, -aren, -en**; *nire, zure, bere*). El sintagma sin nombre (*nirea*, *Mikelena*) y **bezala / bezalako**.', lot: [6, 3], falta: '*bezala / bezalako* todavía no está explicado en Geruzak.' },
  9: { lan: 'De dónde es algo o alguien: **nongo** (**-ko / -go**: *etxeko*, *Bilboko*). Los ordinales (**-garren**), **omen**, **zergatik** y los grados **nahiko** y **samar**.', lot: [6, 16, 17], falta: '*omen* todavía no está explicado en Geruzak.' },
  10: { lan: 'Los verbos sintéticos *egon* e *ibili* (**nago, dago; nabil, dabil**). Cómo está alguien (**nekatuta**, **gaixorik**), el instrumental **-z** y la pregunta indirecta con **-(e)n**.', lot: [12, 6, 19] },
  11: { lan: '*Joan* y *etorri* en presente (**noa, nator**), adónde (**nora**: -ra) y de dónde (**nondik**: -tik). Ir a hacer algo (**-t(z)era**), la orden contada por otro (**-t(z)eko**) y *cuando* (**-(e)nean**).', lot: [12, 6, 19] },
  12: { lan: 'Lo habitual: **-t(z)en** + auxiliar (**etortzen naiz**). Los días de la semana, las horas en punto y **ari izan** para lo que está pasando ahora.', lot: [11, 17, 14] },
  13: { lan: 'A quién: el dativo **nori** (**-(r)i, -ari, -ei**) y el verbo con tres participantes (**diot, dizut, dit…**). Las horas con minutos, **baietz / ezetz** y **ere**.', lot: [6, 13, 17], falta: '*baietz / ezetz* todavía no está explicado en Geruzak.' },
  14: { lan: 'Con quién: **norekin** (**-(r)ekin, -arekin, -ekin**). El futuro (**-ko / -go**), la finalidad con **-t(z)eko**, las ganas (**-t(z)eko gogoa**) y la condición con **ba-**.', lot: [6, 11, 19, 14] }
};

/* descripción propia de cada ejercicio, por su tipo (no se copia la instrucción del libro) */
let aurrekoa = '';
function zer(e, gaps){
  const t = (e.tit || '') + ' ' + (e.instr || '');
  let z;
  if (/^(Haz lo (mismo|propio))/i.test((e.tit || '').replace(/\*/g, '')) && aurrekoa) z = aurrekoa;
  else if (gaps) z = 'Osatu · completa los huecos';
  else if (/Gogora ezazu|Repasa/i.test(t)) z = 'Gogora ezazu · repaso de las estructuras';
  else if (/Itzulpen|Pon en euskera|Traduce|traducir|Escribe en euskera/i.test(t)) z = 'Itzulpena · al euskera';
  else if (/plural/i.test(t)) z = 'Pluralean · pasa a plural';
  else if (/negativa/i.test(t)) z = 'Ezezkoan · pasa a negativa';
  else if (/Subordina/i.test(t)) z = 'Menderakuntza · une las frases';
  else if (/Okerrak/i.test(t)) z = 'Okerrak zuzendu · corrige los errores';
  else if (/sumas/i.test(t)) z = 'Zenbakiak · los resultados, con letra';
  else if (/Formula/i.test(t)) z = 'Galdera-erantzunak · preguntas y respuestas';
  else if (e.irak) z = 'Galderak · preguntas sobre la lectura';
  else if (/Galderak|Responde|Contesta|Erantzun|Incluye|respuesta/i.test(t)) z = 'Erantzun · contesta a las preguntas';
  else z = 'Ariketa · una respuesta por punto';
  aurrekoa = z;
  return z;
}
const libre = e => /libremente|como modelo|Contesta tú/i.test((e.tit || '') + ' ' + (e.instr || ''));

/* todas las formas válidas de una solución: alternativas «a / b» y partes opcionales «(…)» */
function aldaerak(a){
  const out = new Set();
  String(a).split(/\s+\/\s+/).forEach(alt => {
    const groups = [...alt.matchAll(/\(([^)]*)\)/g)];
    const n = Math.min(groups.length, 4);
    for (let mask = 0; mask < (1 << n); mask++) {
      let i = 0;
      const v = alt.replace(/\(([^)]*)\)/g, (m, inner) => { const keep = i < n ? (mask >> i) & 1 : 1; i++; return keep ? inner : ''; });
      const k = kanon(v); if (k) out.add(k);
    }
  });
  return [...out];
}

const num = s => parseInt(String(s), 10);
const js = v => JSON.stringify(v).replace(/"/g, "'");
const units = [], sols = {}, diag = { ex: 0, items: 0, gaps: 0, hashed: 0, sinSol: 0, mixtos: [], patron: 0 };

for (const u of UNITS) {
  const ar = [], S = {};
  aurrekoa = '';
  for (const a of u.atalak) {
    const e = a.mota === 'ariketa' ? a : (a.mota === 'irakurgaia' && a.galderak ? { k: a.k || 'G', orr: a.gorr || a.orr, sorr: a.sorr, items: a.galderak, tit: a.gtit, instr: a.ginstr, irak: true } : null);
    if (!e) continue;
    const items = (e.items || []).filter(it => it.g == null && !it.plain);
    if (!items.length) continue;
    const n = String(e.k).replace(/^B\d+·/, ''), gapItems = items.filter(it => Array.isArray(it.a)).length;
    if (gapItems && gapItems !== items.length) diag.mixtos.push(u.id + ' ' + e.k);
    const gaps = gapItems === items.length;
    const labels = [], sol = {};
    items.forEach((it, i) => {
      const l = String(i + 1);
      if (Array.isArray(it.a)) {
        it.a.forEach((w, j) => { const lab = it.a.length > 1 ? l + 'abcdefgh'[j] : l; labels.push(lab); diag.gaps++; if (w != null && w !== '') sol[ik(lab, labels.length - 1)] = String(w); else diag.sinSol++; });
      } else {
        labels.push(l);
        if (it.a == null || it.a === '') { diag.sinSol++; return; }
        if (/…|\.\.\./.test(it.a)) diag.patron++;
        const where = 'bko-' + String(u.n).padStart(2, '0') + '|' + n + '|' + ik(l, i);
        sol[ik(l, i)] = { h: aldaerak(it.a).map(v => web.EGIAZTATU.hash(where + '|' + v)) };
        diag.hashed++;
      }
      diag.items++;
    });
    const seq = labels.every((l, i) => l === String(i + 1));
    const ex = { n, p: num(e.orr) };
    if (String(e.orr) !== String(ex.p)) ex.pp = String(e.orr);
    if (e.sorr) ex.sp = /^\d+$/.test(String(e.sorr)) ? num(e.sorr) : String(e.sorr);
    ex.m = 'tx'; if (!gaps) ex.luze = true;
    ex.it = seq ? `L(1,${labels.length})` : labels;
    ex.zer = zer(e, gaps);
    if (libre(e)) ex.hint = 'Respuesta libre: el solucionario da solo un modelo.';
    else if (/Gogora ezazu|Repasa/i.test((e.tit || '') + ' ' + (e.instr || ''))) ex.hint = 'Las respuestas están en la propia lección, en la página que indica el botón de soluciones.';
    ar.push(ex);
    if (Object.keys(sol).length) S[n] = sol;
    diag.ex++;
  }
  if (!ar.length) continue;
  const id = 'bko-' + String(u.n).padStart(2, '0'), o = OHARRAK[u.n] || {};
  units.push({ id, n: u.n, eu: u.eu, orr: u.orr, lan: o.lan, lot: (o.lot || []).map(k => [k, G[k]]), falta: o.falta, ar });
  sols[id] = S;
}

/* ── escribir ── */
function exLine(ex){
  const parts = [`n:${js(ex.n)}`, `p:${ex.p}`];
  if (ex.pp) parts.push(`pp:${js(ex.pp)}`);
  if (ex.sp != null) parts.push(`sp:${js(ex.sp)}`);
  parts.push(`m:'tx'`); if (ex.luze) parts.push('luze:true');
  parts.push('it:' + (typeof ex.it === 'string' ? ex.it : js(ex.it)));
  parts.push(`zer:${js(ex.zer)}`);
  if (ex.hint) parts.push(`hint:${js(ex.hint)}`);
  return '        { ' + parts.join(', ') + ' }';
}
const data = `/* ══════════════════════════════════════════════════════════════════════
   Liburuen koadernoa · hojas de respuestas de «Bakarka 1» (J.A. Letamendia, Elkar)
   ----------------------------------------------------------------------
   GENERADO por tools/bakarka-orriak.mjs: no se edita a mano.
   De cada ejercicio va solo su número, su página, la página del solucionario
   y cuántos puntos tiene. No hay enunciados, frases, diálogos ni teoría: se
   leen en el libro. Por eso este fichero se puede publicar.
   Lo que sí es texto es propio (⚠ Claude): la nota de cada lección («lan») y
   la descripción de cada ejercicio. Los títulos de lección son los del libro,
   para localizarlas. La lección 1 (sonidos y letras) no tiene ejercicios escritos.
   Las claves de lo escrito salen del «id» de la lección + número de ejercicio +
   número de punto: no se cambian.
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  function L(a, b){ var o = []; for (var i = a; i <= b; i++) o.push(String(i)); return o; }
  var U = [];
${units.map(u => `
  /* ── ${u.n} · ${u.eu} (${u.orr}) ── */
  U.push({ id:${js(u.id)}, n:${u.n}, eu:${js(u.eu)}, orr:${js(u.orr)}, atalak:[
    { id:'a', kode:'', lan:${js(u.lan || '')}, lot:${js(u.lot)},${u.falta ? ' falta:' + js(u.falta) + ',' : ''}
      ar:[
${u.ar.map(exLine).join(',\n')} ] }
  ] });`).join('\n')}

  window.LIBURUAK = window.LIBURUAK || {};
  window.LIBURUAK.bakarka1 = { src:'bakarka1', izena:'Bakarka 1', taldea:'Ikasgaiak', unitateak:U };
})();
`;
const solLines = Object.keys(sols).map(id => `  E[${js(id)}] = {\n` + Object.keys(sols[id]).map(n =>
  `    ${js(n)}: { ` + Object.keys(sols[id][n]).map(k => { const v = sols[id][n][k]; return js(k) + ':' + (typeof v === 'string' ? js(v) : '{h:' + js(v.h) + '}'); }).join(', ') + ' }').join(',\n') + '\n  };').join('\n');
const solFile = `/* ══════════════════════════════════════════════════════════════════════
   Liburuen koadernoa · soluciones de «Bakarka 1» — del solucionario del libro
   ----------------------------------------------------------------------
   GENERADO por tools/bakarka-orriak.mjs: no se edita a mano.
   · En los huecos (una palabra), la palabra que falta.
   · En las frases, solo su HUELLA: { h: [huellas de las formas válidas] }.
     Sirve para decir «coincide con el solucionario» o «no coincide»; la frase
     no está aquí. Si no coincide, se compara en el libro (página «sp» de la hoja).
   Formato: egiaztatu.js. Por lección y ejercicio; las casillas se llaman como
   su número de punto en la hoja (datuak/bakarka-1.js).
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  var E = {};
${solLines}
  window.ERANTZUNAK = window.ERANTZUNAK || {};
  window.ERANTZUNAK.bakarka1 = E;
})();
`;

console.log(`Bakarka 1 ← ${path.basename(SRC)}`);
console.log(`  ${units.length} lecciones con ejercicios · ${diag.ex} ejercicios · ${diag.items} puntos`);
console.log(`  soluciones: ${diag.gaps - 0} huecos (palabra) · ${diag.hashed} frases (huella) · ${diag.sinSol} sin solución en el libro · ${diag.patron} con «…» (modelo abierto)`);
if (diag.mixtos.length) console.log('  ⚠ ejercicios con huecos y frases mezclados: ' + diag.mixtos.join(', '));
units.forEach(u => console.log(`  ${u.id} ${String(u.ar.length).padStart(2)} ejercicios · ${u.eu}`));
console.log(`  tamaño: hojas ${(data.length / 1024).toFixed(1)} KB · soluciones ${(solFile.length / 1024).toFixed(1)} KB`);
if (CHECK) {
  const same = f => fs.existsSync(path.join(ROOT, 'datuak', f)) && fs.readFileSync(path.join(ROOT, 'datuak', f), 'utf8');
  const ok = same('bakarka-1.js') === data && same('bakarka-1-erantzunak.js') === solFile;
  console.log(ok ? 'Los ficheros de datuak/ están al día.' : 'Los ficheros de datuak/ NO coinciden con lo que se generaría ahora: lanza --idatzi.');
  process.exit(ok ? 0 : 1);
}
if (WRITE) {
  fs.writeFileSync(path.join(ROOT, 'datuak', 'bakarka-1.js'), data);
  fs.writeFileSync(path.join(ROOT, 'datuak', 'bakarka-1-erantzunak.js'), solFile);
  console.log('Escritos datuak/bakarka-1.js y datuak/bakarka-1-erantzunak.js');
} else console.log('Nada escrito. Añade --idatzi para escribirlos.');
