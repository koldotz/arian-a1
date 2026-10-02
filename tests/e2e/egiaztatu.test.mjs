// «Egiaztatu» de punta a punta: con las soluciones puestas en sus casillas,
// todos los ejercicios deben salir bien (así se comprueba que cada solución
// llega a su casilla en la página real). Y lo mal contestado se señala.
// Si en este ordenador está la transcripción de Bakarka 1, se prueban además
// sus frases reales contra las huellas publicadas.
import fs from 'fs';
import path from 'path';
import vm from 'vm';

/* en la página: pone en cada casilla su solución (la primera forma válida) y comprueba cada ejercicio */
const FILL = `(function(key, extra){
  var S = ERANTZUNAK[key], out = { ex: 0, ok: 0, ko: 0, cmp: 0, empty: 0, bad: [] };
  document.querySelectorAll('section.unit-orria').forEach(function(u){
    var SU = S[u.id] || {};
    u.querySelectorAll('.ar-orria').forEach(function(ar){
      var ek = ar.getAttribute('data-or'), sols = (extra && extra[u.id] && extra[u.id][ek]) || SU[ek];
      if (!sols || typeof sols !== 'object' || !ar.querySelector('.kc-btn')) return;
      var n = 0;
      ar.querySelectorAll('[data-k]').forEach(function(el){
        var k = el.getAttribute('data-k').slice(('f:' + ek + ':').length);
        if (k === 'done') return;
        if (el.classList.contains('or-chk')) { if ((sols['#'] || []).indexOf(k) >= 0) { el.value = '1'; n++; } return; }
        var v = sols[k]; if (v == null || typeof v === 'object') return;
        var first = String(v).replace(/^~/, '').split(/\\s+\\/\\s+/)[0];
        if (el.classList.contains('or-seg')) { var op = [].slice.call(el.querySelectorAll('input')).filter(function(i){ return EGIAZTATU.kanon(i.value) === EGIAZTATU.kanon(first); })[0]; el.value = op ? op.value : ''; }
        else el.value = first;
        n++;
      });
      if (!n) return;
      var r = EGIAZTATU.check(ar);
      out.ex++; out.ok += r.ok; out.ko += r.ko; out.cmp += r.cmp;
      if (r.ko || r.cmp || r.ok !== n) out.bad.push(u.id + ' ' + ek + ' (' + r.ok + ' bien de ' + n + ', ' + r.ko + ' mal, ' + r.cmp + ' para comparar)');
      EGIAZTATU.clear(ar);
    });
  });
  return JSON.stringify(out);
})`;

export default async function(t){
  // ── Arian A1: todas sus soluciones, en la página
  const A = await t.tab({ width: 1280, height: 900 });
  await A.go(t.base + '/arian.html', 2500);
  const a = JSON.parse(await A.ev(FILL + `('arian')`));
  t.ok(a.ex >= 300 && !a.bad.length && a.ko === 0 && a.cmp === 0, `Arian A1: con sus soluciones puestas, los ${a.ex} ejercicios con corrección salen bien (${a.ok} casillas)` + (a.bad.length ? ' — ' + a.bad.slice(0, 5).join(' | ') : ''));
  const n = JSON.parse(await A.ev(`JSON.stringify({ btn: document.querySelectorAll('.kc-btn').length, ez: document.querySelectorAll('.kc-ez').length, src: document.querySelector('.kc-src').textContent })`));
  t.ok(n.btn === a.ex && n.ez > 50 && /Claude/.test(n.src), `Arian A1: ${n.btn} ejercicios con «Egiaztatu» (soluciones «⚠ Claude») y ${n.ez} sin corrección, con su motivo a la vista`);

  // lo mal contestado: opción, texto, marca y respuesta abierta (en una página limpia)
  await A.go(t.base + '/arian.html?garbi', 2500);
  const w = JSON.parse(await A.ev(`(function(){
    var u = document.getElementById('aro-12'), q = function(k){ return u.querySelector('[data-k="f:' + k + '"]'); };
    function fire(el, v){ el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }
    u.querySelector('[data-orf="A7:2"] input[value="c"]').click(); u.querySelector('[data-orf="A7:3"] input[value="a"]').click();
    fire(q('A3:b'), '7'); fire(q('A3:c'), 'Martxoan'); fire(q('A3:d'), 'urrian');
    ['5', '1'].forEach(function(k){ u.querySelector('[data-orf="C6:' + k + '"] input').click(); });
    fire(q('C2:h'), 'autobusez joaten dira'); fire(q('C2:a'), 'beste zerbait');
    var o = {};
    ['A7', 'A3', 'C6', 'C2'].forEach(function(k){ var ar = u.querySelector('.ar-orria[data-or="' + k + '"]'); ar.querySelector('.kc-btn').click();
      o[k] = { sum: ar.querySelector('.kc-sum').textContent, sol: [].slice.call(ar.querySelectorAll('.kc-sol, .kc-mark')).map(function(x){ return x.textContent; }).join(';'), model: (ar.querySelector('.kc-model') || {}).textContent || '', on: ar.classList.contains('kc-on') }; });
    var s = u.querySelector('[data-orf="A7:3"]'); s.querySelector('input[value="c"]').click();
    o.after = { cls: s.className, next: s.nextElementSibling ? s.nextElementSibling.className : '' };
    u.querySelector('.ar-orria[data-or="A3"] .kc-btn').click(); o.off = !u.querySelector('.ar-orria[data-or="A3"] .kc-sol') && !u.querySelector('.ar-orria[data-or="A3"]').classList.contains('kc-on');
    return JSON.stringify(o);
  })()`));
  t.ok(/✓ 1 · ✗ 1/.test(w.A7.sum) && /→ c/.test(w.A7.sol), 'opciones: la buena en verde, la mala con su solución al lado (' + w.A7.sum + ')');
  t.ok(/✓ 2 · ✗ 1/.test(w.A3.sum) && /apirilean/.test(w.A3.sol), 'texto: vale el número o la palabra, sin mayúsculas; lo mal contestado enseña la solución (' + w.A3.sum + ')');
  t.ok(/✓ 1 · ✗ 5/.test(w.C6.sum) && /sobra/.test(w.C6.sol) && /falta/.test(w.C6.sol), 'marcas: señala la que sobra y las que faltan (' + w.C6.sum + ')');
  t.ok(/✓ 1 · 1 para comparar/.test(w.C2.sum) && /Modelo/.test(w.C2.model), 'respuesta abierta: si no coincide con el modelo no es un error; se enseña el modelo para compararlo');
  t.ok(!/kc-ko/.test(w.after.cls) && !/kc-sol/.test(w.after.next) && w.off, 'al cambiar una respuesta se quita su marca, y el botón oculta la corrección');
  t.ok(!A.errs.filter(e => !/pribatua/.test(e)).length, 'Arian A1: sin errores de JavaScript' + (A.errs.length ? ': ' + A.errs[0] : ''));
  await A.close();

  // ── Ikasgaiak: lecciones propias (ejercicio y solución de Claude)
  const I = await t.tab({ width: 1280, height: 900 });
  await I.go(t.base + '/ikasgaiak.html', 2000);
  const ik = JSON.parse(await I.ev(FILL + `('ikasgaiak')`));
  t.ok(ik.ex >= 65 && !ik.bad.length && ik.ko === 0 && ik.cmp === 0, `Ikasgaiak: con sus soluciones puestas, los ${ik.ex} ejercicios con corrección salen bien (${ik.ok} casillas)` + (ik.bad.length ? ' — ' + ik.bad.slice(0, 5).join(' | ') : ''));
  // lo mal contestado, el sufijo y la respuesta abierta (en una página limpia)
  await I.go(t.base + '/ikasgaiak.html?garbi', 2000);
  const iw = JSON.parse(await I.ev(`(function(){
    var u = document.getElementById('ika-01'), q = function(k){ return u.querySelector('[data-k="f:' + k + '"]'); };
    function fire(el, v){ el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }
    fire(q('At2:1'), 'zara'); fire(q('At2:2'), 'Nor'); fire(q('B1:2'), '-goa'); fire(q('B1:1'), 'Bilbokoa'); fire(q('At3:1'), 'Ez naiz ni Koldo');
    var o = {};
    ['At2', 'B1', 'At3'].forEach(function(k){ var ar = u.querySelector('.ar-orria[data-or="' + k + '"]'); ar.querySelector('.kc-btn').click();
      o[k] = { sum: ar.querySelector('.kc-sum').textContent, sol: [].slice.call(ar.querySelectorAll('.kc-sol')).map(function(x){ return x.textContent; }).join(';'), model: (ar.querySelector('.kc-model') || {}).textContent || '' }; });
    o.src = u.querySelector('.kc-src').getAttribute('title'); o.inline = !!u.querySelector('.ar-orria[data-or="At2"] .gq input.gapf'); o.pages = u.querySelectorAll('.or-orr').length;
    var b = u.querySelector('.ik-elk'), es = b.querySelector('.ik-es'); o.hidden = getComputedStyle(es).display === 'none'; b.querySelector('.ik-itz').click(); o.shown = getComputedStyle(es).display !== 'none';
    return JSON.stringify(o);
  })()`));
  t.ok(/✓ 1 · ✗ 1/.test(iw.At2.sum) && /→ naiz/.test(iw.At2.sol) && iw.inline, 'Ikasgaiak: el hueco va dentro de la frase; lo mal contestado enseña la solución (' + iw.At2.sum + ')');
  t.ok(/✓ 2/.test(iw.B1.sum) && /1 para comparar/.test(iw.At3.sum) && /Modelo/.test(iw.At3.model), 'Ikasgaiak: vale el sufijo con guion o la palabra entera; una frase distinta del modelo no es un error');
  t.ok(/escritos por Claude/.test(iw.src) && iw.pages === 0 && iw.hidden && iw.shown, 'Ikasgaiak: la corrección dice que ejercicio y solución son de Claude, no hay páginas de libro en los ejercicios y la traducción del diálogo se enseña al pedirla');
  t.ok(!I.errs.length, 'Ikasgaiak: sin errores de JavaScript' + (I.errs.length ? ': ' + I.errs[0] : ''));
  await I.close();

  // ── Bakarka 1
  const B = await t.tab({ width: 1280, height: 900 });
  await B.go(t.base + '/bakarka.html', 2500);
  const g = JSON.parse(await B.ev(FILL + `('bakarka1')`));
  t.ok(g.ex >= 8 && !g.bad.length, `Bakarka 1: los ${g.ex} ejercicios de huecos salen bien con las palabras del solucionario (${g.ok} huecos)` + (g.bad.length ? ' — ' + g.bad.slice(0, 4).join(' | ') : ''));
  const h = JSON.parse(await B.ev(`(function(){
    var u = document.getElementById('bko-02'), ar = u.querySelector('.ar-orria[data-or="1"]'), f = u.querySelector('[data-k="f:1:2"]');
    f.value = 'zerbait oker'; f.dispatchEvent(new Event('input', { bubbles: true })); ar.querySelector('.kc-btn').click();
    return JSON.stringify({ sum: ar.querySelector('.kc-sum').textContent, model: (ar.querySelector('.kc-model') || {}).textContent || '', ko: ar.querySelectorAll('.kc-ko').length, src: ar.querySelector('.kc-src').textContent,
      btn: document.querySelectorAll('.kc-btn').length, plain: JSON.stringify(ERANTZUNAK.bakarka1['bko-02']['1']).length });
  })()`));
  t.ok(/1 para comparar/.test(h.sum) && h.ko === 0 && /No coincide con el solucionario del libro \(241\. or\.\)/.test(h.model), 'Bakarka 1: una frase que no coincide no se da por mala; remite a la página del solucionario');
  t.ok(h.btn === 144 && /Bakarka 1/.test(h.src), 'Bakarka 1: los 144 ejercicios tienen «Egiaztatu», con el solucionario del libro como fuente');

  let bideak = {};
  try { bideak = JSON.parse(fs.readFileSync(path.join(t.root, 'pribatua', 'bideak.json'), 'utf8')); } catch (e) {}
  const SRC = [bideak.bakarkaTranskripzioa, path.join(t.root, 'pribatua', 'armairua-a1-bakarka1-data.js')].find(f => f && fs.existsSync(f));
  if (!SRC) t.ok(true, 'Bakarka 1: sin la transcripción en este ordenador, no se prueban las frases reales contra las huellas');
  else {
    const priv = {}; priv.window = priv; vm.createContext(priv); vm.runInContext(fs.readFileSync(SRC, 'utf8'), priv);
    const extra = {}; let nItems = 0;
    priv.A1_ITURRIAK.unitateak.filter(u => u.src === 'bakarka1').forEach(u => {
      const id = 'bko-' + String(u.n).padStart(2, '0');
      u.atalak.forEach(a => {
        const e = a.mota === 'ariketa' ? a : (a.mota === 'irakurgaia' && a.galderak ? { k: a.k || 'G', items: a.galderak } : null); if (!e) return;
        const o = {};
        (e.items || []).filter(it => it.g == null && !it.plain).forEach((it, i) => { if (typeof it.a === 'string' && it.a && !/[(/…]|\.\.\./.test(it.a)) { o[String(i + 1)] = it.a.toUpperCase(); nItems++; } });
        if (Object.keys(o).length) (extra[id] = extra[id] || {})[String(e.k).replace(/^B\d+·/, '')] = o;
      });
    });
    const r = JSON.parse(await B.ev(FILL + `('bakarka1', ${JSON.stringify(extra)})`));
    t.ok(nItems > 1500 && r.ok === nItems + g.ok && !r.bad.length, `Bakarka 1 (local): ${nItems} frases del solucionario, escritas en sus casillas (en mayúsculas), coinciden con su huella` + (r.bad.length ? ' — ' + r.bad.slice(0, 4).join(' | ') : r.ok === nItems + g.ok ? '' : ` (${r.ok - g.ok})`));
  }
  t.ok(!B.errs.filter(e => !/pribatua/.test(e)).length, 'Bakarka 1: sin errores de JavaScript' + (B.errs.length ? ': ' + B.errs[0] : ''));
  await B.close();
}
