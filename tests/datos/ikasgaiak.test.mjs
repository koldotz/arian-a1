// Lecciones propias (datuak/ikasgaiak-a1.js): que estén bien formadas, que no
// se hagan pasar por el libro (ni páginas ni pistas en los ejercicios; cada
// apartado dice dónde lo trata el libro) y que todo lo que se puede corregir
// tenga su solución en una casilla que existe.
// Que no lleven texto del libro no se puede comprobar aquí (el libro no está
// en el repositorio): eso lo hace, en local, pribatua/tresnak/ikasgaiak-iturria.mjs.
import fs from 'fs';
import path from 'path';
import vm from 'vm';

const TYPES = ['eg', 'bai', 'abc', 'auk', 'mark', 'taula', 'idaz', 'tx'];
const EX_KEYS = ['n', 'm', 'zer', 'en', 'gal', 'kutxa', 'tes', 'motz', 'hizk', 'it', 'op', 'luze', 'zabal', 'bat', 'rows', 'cols', 'tx'];
const BLOCKS = { elk: ['t', 'iz', 'l'], hiz: ['t', 'iz', 'l'], gram: ['t', 'iz', 'p', 'taula'] };

export default async function(t){
  const read = f => fs.readFileSync(path.join(t.root, f), 'utf8');
  const ctx = {}; ctx.window = ctx; ctx.globalThis = ctx; vm.createContext(ctx);
  for (const f of ['orriak.js', 'egiaztatu.js', 'datuak/arian-a1.js', 'datuak/ikasgaiak-a1.js', 'datuak/ikasgaiak-a1-erantzunak.js']) vm.runInContext(read(f), ctx, { filename: f });
  const O = ctx.ORRIAK, E = ctx.EGIAZTATU, L = ctx.LIBURUAK.ikasgaiak, S = ctx.ERANTZUNAK.ikasgaiak, U = L.unitateak;
  const geruzak = read('geruzak.html'), arian = ctx.LIBURUAK.arian.unitateak;

  t.ok(L.src === 'claude' && U.length >= 1 && U.every(u => /^ika-\d\d$/.test(u.id)) && new Set(U.map(u => u.id)).size === U.length,
    `Ikasgaiak: ${U.length} lección(es), marcadas como propias (⚠ Claude) y con id propio (de él salen las claves de lo escrito: no se cambia)`);

  const bad = [], solBad = [], noSol = [];
  let nEx = 0, nSol = 0, nNo = 0, nBlocks = 0;
  U.forEach(u => {
    const keys = new Set(), SU = S[u.id] || {}, book = arian.find(a => a.n === u.n);
    if (!u.sarrera || !/Arian A1/.test(u.sarrera)) bad.push(`${u.id}: la presentación no dice qué unidad del libro sigue`);
    u.atalak.forEach(s => {
      if (!s.lan) bad.push(`${u.id} ${s.id}: sin nota`);
      const [from, to] = book.orr.split('–').map(Number), pp = s.ref ? String(s.ref[1]).split('–').map(Number) : [];
      if (!s.ref || s.ref[0] !== 'arian' || !(pp[0] >= from && pp[pp.length - 1] <= to)) bad.push(`${u.id} ${s.id}: sin referencia a las páginas del libro (dentro de ${book.orr})`);
      (s.lot || []).forEach(l => { if (!l[1] || !new RegExp('<section id="s' + l[0] + '"').test(geruzak)) bad.push(`${u.id} ${s.id}: enlace a Geruzak §${l[0]}`); });
      (s.ar || []).filter(x => x.t).forEach(b => {
        nBlocks++;
        const where = `${u.id} ${s.id} bloque «${b.iz}»`;
        if (!BLOCKS[b.t] || !b.iz) { bad.push(where + ': tipo o título'); return; }
        const extra = Object.keys(b).filter(k => !BLOCKS[b.t].includes(k)); if (extra.length) bad.push(where + ': campo desconocido ' + extra.join(', '));
        if (b.t === 'elk' && !b.l.every(l => l.length === 3 && l[1] && l[2])) bad.push(where + ': cada línea lleva quién, euskera y castellano');
        if (b.t === 'hiz' && !b.l.every(l => l.length === 2 && l[0] && l[1])) bad.push(where + ': cada palabra lleva su traducción');
        if (b.t === 'gram' && b.taula && !b.taula.rows.every(r => r.length === b.taula.cols.length)) bad.push(where + ': filas y columnas de la tabla');
      });
    });
    O.ariketak(u).forEach(x => {
      const e = x.ex, where = `${u.id} ${x.key}`;
      nEx++;
      if (keys.has(x.key)) bad.push(where + ': clave repetida'); keys.add(x.key);
      if (!TYPES.includes(e.m)) bad.push(where + ': tipo «' + e.m + '»');
      if (!e.zer) bad.push(where + ': sin título');
      const extra = Object.keys(e).filter(k => !EX_KEYS.includes(k));          // sin p, pp, sp, au, pre, adib: no hay página, pista ni nada «que dé el libro»
      if (extra.length) bad.push(where + ': campo que no es de una lección propia: ' + extra.join(', '));
      const ls = (e.it || []).map(v => Array.isArray(v) ? v[0] : v);
      if (new Set(ls).size !== ls.length) bad.push(where + ': rótulo repetido');
      if (e.gal && e.gal.length !== ls.length) bad.push(`${where}: ${e.gal.length} textos para ${ls.length} puntos`);
      if (e.gal && e.gal.some(g => (g.match(/___/g) || []).length > 1)) bad.push(where + ': más de un hueco en un punto');
      /* un enunciado que se entienda sin el libro: o lleva texto en sus puntos, o los rótulos dicen qué se pide */
      if (!e.gal && !e.en && e.m !== 'idaz' && ls.every(l => /^[a-z]$|^$/.test(l))) bad.push(where + ': no se entiende sin enunciado');
      /* soluciones ↔ casillas */
      const er = O.eremuak(e), byK = Object.fromEntries(er.map(f => [f.k, f])), s = SU[x.key];
      if (typeof s === 'string') { nNo++; if (s[0] !== '!') solBad.push(where + ': motivo sin formato'); return; }
      if (!s) { if (!(e.m === 'bai' && e.hizk === 'es')) noSol.push(where); return; }        // la autoevaluación no se corrige
      nSol++;
      for (const [k, v] of Object.entries(s)) {
        if (k === '_oh') continue;
        const f = byK[k];
        if (!f) { solBad.push(`${where}: solución para «${k}», que no es una casilla`); continue; }
        if (typeof v !== 'string') { solBad.push(`${where}: «${k}» no es texto (aquí no hay huellas: no hay solucionario que proteger)`); continue; }
        if (f.t === 'auk') { const ops = f.ops.map(E.kanon); E.alts(v).forEach(a => { if (!ops.includes(a)) solBad.push(`${where}: «${k}» = «${v}» no es una de sus opciones`); }); }
        if (f.t === 'luze' && v[0] !== '~') solBad.push(`${where}: «${k}» es respuesta larga y no va como modelo`);
      }
    });
    Object.keys(SU).forEach(k => { if (!keys.has(k)) solBad.push(`${u.id}: soluciones del ejercicio «${k}», que no existe`); });
  });
  t.ok(!bad.length && nEx >= 71, `Ikasgaiak: ${nEx} ejercicios y ${nBlocks} bloques bien formados; cada apartado remite a sus páginas del libro, y ningún ejercicio lleva página ni pista` + (bad.length ? ' — ' + bad.slice(0, 4).join(' | ') : ''));
  t.ok(!solBad.length && !noSol.length, `Ikasgaiak: ${nSol} ejercicios con corrección y ${nNo} sin ella, con su motivo; cada solución corresponde a una casilla` + (solBad.length ? ' — ' + solBad.slice(0, 4).join(' | ') : '') + (noSol.length ? ' — sin solución: ' + noSol.join(', ') : ''));

  // las hojas de los libros siguen sin texto: los campos de las lecciones propias no se usan en ellas
  const leak = [];
  ['arian', 'bakarka1'].forEach(k => (ctx.LIBURUAK[k] ? ctx.LIBURUAK[k].unitateak : []).forEach(u => {
    if (u.sarrera) leak.push(u.id + ': sarrera');
    u.atalak.forEach(s => (s.ar || []).forEach(x => { ['t', 'en', 'gal', 'kutxa', 'tes'].forEach(f => { if (x[f] != null) leak.push(`${u.id} ${s.id}: ${f}`); }); }));
  }));
  t.ok(!leak.length, 'las hojas de Arian A1 siguen siendo solo casillas: no usan los campos de texto de las lecciones propias' + (leak.length ? ' — ' + leak.slice(0, 3).join(' | ') : ''));
}
