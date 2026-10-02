// Hojas de respuestas (datuak/): que estén bien formadas y, sobre todo, que
// sigan siendo solo eso: números, páginas, pistas y casillas, sin el texto de
// los libros. Y que cada solución corresponda a una casilla que existe.
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { execFileSync } from 'child_process';

const TYPES = ['ikus', 'lib', 'eg', 'bai', 'abc', 'auk', 'mark', 'taula', 'idaz', 'tx'];
const EX_KEYS = ['n', 'p', 'pp', 'sp', 'au', 'm', 'zer', 'hint', 'adib', 'it', 'grp', 'op', 'pre', 'oh', 'rows', 'cols', 'tx', 'luze', 'zabal', 'bat'];
const words = s => String(s).trim().split(/\s+/).filter(Boolean).length;
const BOOKS = [
  { key: 'arian', files: ['datuak/arian-a1.js', 'datuak/arian-a1-erantzunak.js'], id: /^aro-\d\d$/, units: 12, minEx: 450 },
  { key: 'bakarka1', files: ['datuak/bakarka-1.js', 'datuak/bakarka-1-erantzunak.js'], id: /^bko-\d\d$/, units: 13, minEx: 140 }
];

export default async function(t){
  const read = f => fs.readFileSync(path.join(t.root, f), 'utf8');
  const ctx = {}; ctx.window = ctx; ctx.globalThis = ctx; vm.createContext(ctx);
  for (const f of ['orriak.js', 'egiaztatu.js']) vm.runInContext(read(f), ctx, { filename: f });
  BOOKS.forEach(b => b.files.forEach(f => vm.runInContext(read(f), ctx, { filename: f })));
  const O = ctx.ORRIAK, E = ctx.EGIAZTATU;
  const geruzak = read('geruzak.html');

  for (const b of BOOKS) {
    const L = ctx.LIBURUAK[b.key], S = ctx.ERANTZUNAK[b.key], U = L.unitateak, name = L.izena;
    t.ok(U.length === b.units && U.every(u => b.id.test(u.id)) && new Set(U.map(u => u.id)).size === U.length,
      `${name}: ${b.units} unidades con id propio (de él salen las claves de lo escrito: no se cambia)`);

    const bad = [], long = [], notes = [], solBad = [];
    let nEx = 0, nSol = 0, nNo = 0, nFields = 0, clearLong = 0;
    U.forEach(u => {
      const [from, to] = u.orr.split('–').map(Number), keys = new Set(), SU = S[u.id] || {};
      u.atalak.forEach(s => {
        if (!s.lan && !s.falta) bad.push(`${u.id} ${s.id}: sin nota ni aviso`);
        (s.lot || []).forEach(l => { if (!l[1] || !new RegExp('<section id="s' + l[0] + '"').test(geruzak)) bad.push(`${u.id} ${s.id}: enlace a Geruzak §${l[0]}`); });
        [...String(s.lan || '').matchAll(/\*\*(.+?)\*\*|\*(.+?)\*/g)].forEach(m => { if (words(m[1] || m[2]) > 7) notes.push(`${u.id} ${s.id}: «${m[1] || m[2]}»`); });
      });
      O.ariketak(u).forEach(x => {
        const e = x.ex, where = `${u.id} ${x.key}`;
        nEx++;
        if (keys.has(x.key)) bad.push(where + ': clave repetida'); keys.add(x.key);
        if (!TYPES.includes(e.m)) bad.push(where + ': tipo «' + e.m + '»');
        if (!(e.p >= from && e.p <= to)) bad.push(where + ': página ' + e.p + ' fuera de ' + u.orr);
        if (e.au && !/^\d+(–\d+)?$/.test(String(e.au))) bad.push(where + ': pista «' + e.au + '»');
        const extra = Object.keys(e).filter(k => !EX_KEYS.includes(k));
        if (extra.length) bad.push(where + ': campo desconocido ' + extra.join(', '));
        const groups = e.grp || (e.it ? [['', e.it]] : []);
        groups.forEach(g => { const ls = g[1].map(v => Array.isArray(v) ? v[0] : v); if (new Set(ls).size !== ls.length) bad.push(where + ': rótulo repetido'); });
        /* rótulos: una letra, un número, un nombre o una palabra suelta; nunca una frase */
        [...groups.flatMap(g => [g[0], ...g[1].flatMap(v => Array.isArray(v) ? [v[0], ...v[1]] : [v])]), ...(e.oh || []), ...(e.rows || []), ...(e.cols || []), ...(e.op || [])]
          .forEach(l => { if (String(l).split(' · ').some(p => words(p) > 6 || p.length > 40)) long.push(where + ': «' + l + '»'); });
        /* soluciones ↔ casillas */
        const er = O.eremuak(e), byK = Object.fromEntries(er.map(f => [f.k, f])), s = SU[x.key];
        nFields += er.length;
        if (typeof s === 'string') { nNo++; if (!(s === 'audio' || s[0] === '!')) solBad.push(where + ': motivo sin formato'); return; }
        if (!s) return;
        nSol++;
        for (const [k, v] of Object.entries(s)) {
          if (k === '_oh') continue;
          if (k === '#') { v.forEach(m => { if (!byK[m] || byK[m].t !== 'mark') solBad.push(`${where}: marca «${m}» sin casilla`); }); continue; }
          const f = byK[k];
          if (!f) { solBad.push(`${where}: solución para «${k}», que no es una casilla`); continue; }
          if (f.t === 'mark') { solBad.push(`${where}: «${k}» es una marca (va en '#')`); continue; }
          if (v && typeof v === 'object') { if (!(Array.isArray(v.h) && v.h.length)) solBad.push(`${where}: huella vacía en «${k}»`); continue; }
          if (f.t === 'auk') { const ops = f.ops.map(E.kanon); E.alts(String(v).replace(/^~/, '')).forEach(a => { if (!ops.includes(a)) solBad.push(`${where}: «${k}» = «${v}» no es una de sus opciones`); }); }
          if (f.t === 'luze' && String(v)[0] !== '~') solBad.push(`${where}: «${k}» es respuesta larga y no va como modelo`);
          if (b.key === 'bakarka1' && words(v) > 2) clearLong++;
        }
      });
      Object.keys(SU).forEach(k => { if (!keys.has(k)) solBad.push(`${u.id}: soluciones del ejercicio «${k}», que no existe`); });
    });
    t.ok(!bad.length && nEx >= b.minEx, `${name}: ${nEx} ejercicios bien formados (clave propia, tipo conocido, página dentro de su unidad, enlaces a Geruzak que existen)` + (bad.length ? ' — ' + bad.slice(0, 4).join(' | ') : ''));
    t.ok(!long.length, `${name}: ningún rótulo es una frase (las hojas no llevan el texto del libro)` + (long.length ? ' — ' + long.slice(0, 3).join(' | ') : ''));
    t.ok(!notes.length, `${name}: las notas solo citan formas sueltas en euskera` + (notes.length ? ' — ' + notes.slice(0, 3).join(' | ') : ''));
    t.ok(!solBad.length, `${name}: cada solución corresponde a una casilla que existe (${nSol} ejercicios con corrección, ${nNo} sin ella y con su motivo; ${nFields} casillas)` + (solBad.length ? ' — ' + solBad.slice(0, 4).join(' | ') : ''));
    if (b.key === 'arian') t.ok(nSol >= 300, `${name}: al menos 300 ejercicios con corrección (${nSol})`);
    if (b.key === 'bakarka1') {
      t.ok(nSol === nEx, `${name}: los ${nEx} ejercicios tienen comprobación`);
      t.ok(clearLong === 0, `${name}: del solucionario solo van en claro palabras sueltas; las frases, por huella` + (clearLong ? ` — ${clearLong} en claro` : ''));
    }
  }

  // Bakarka se genera: si en este ordenador está la transcripción de origen, lo publicado debe estar al día
  let out = '';
  try { out = execFileSync('node', [path.join(t.root, 'tools/bakarka-orriak.mjs'), '--egiaztatu'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { out = String(e.stdout || '') + String(e.stderr || ''); }
  t.ok(/No encuentro la transcripción/.test(out) || /están al día/.test(out), 'Bakarka 1: los ficheros publicados son los que da el generador' + (/NO coinciden/.test(out) ? ' — hay que regenerar (--idatzi)' : /No encuentro/.test(out) ? ' (sin transcripción en este ordenador: no se comprueba)' : ''));

  // comparación de respuestas
  const K = (s, v) => E.konparatu(s, v, 'x').r;
  t.ok(K('b / c', 'C') === 'ok' && K('naiz', 'Naiz.') === 'ok' && K('naiz', 'da') === 'ko' && K('~Kazetaria da.', 'kazetaria da') === 'ok' && K('~Kazetaria da.', 'beste bat') === 'cmp' && K('naiz', '  ') === 'empty',
    'comparar: sin mayúsculas ni signos; cerrada → bien o mal; modelo → bien o «para comparar»; vacío no cuenta');
  t.ok(K('Ø', '-') === 'ok' && K('Ø', '0') === 'ok' && K('-ak', 'ak') === 'ok' && K('seme-alabak', 'seme alabak') === 'ok', 'comparar: «Ø» acepta 0 o un guion, y los guiones no cuentan');
  const h = { h: [E.huella('u|1|3', 'Hau etxea da.')] };
  t.ok(E.konparatu(h, 'hau ETXEA da', 'u|1|3').r === 'ok' && E.konparatu(h, 'hau etxea da', 'u|1|4').r === 'cmp' && E.konparatu(h, 'hori etxea da', 'u|1|3').r === 'cmp',
    'comparar por huella: coincide solo la misma frase en la misma casilla; si no, «para comparar» (nunca «mal»)');
}
