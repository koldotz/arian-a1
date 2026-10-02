// Las hojas en la página: se pintan, se escribe en sus casillas (texto, opción,
// marca, tabla, «Eginda»), lo escrito se guarda, viaja con el perfil a otro
// dispositivo, entra en la libreta y se refleja en la portada.
// El libro al lado (tu PDF) solo existe en local: si en este ordenador está
// enlazado en pribatua/, se comprueba; si no, esa parte se salta.
import { login, sync, serverKey } from '../lib/app.mjs';

export default async function(t){
  const A = await t.tab();
  await A.go(t.base + '/arian.html#aro-04', 2600);

  // ── se pintan, sin texto del libro
  const k = JSON.parse(await A.ev(`(function(){
    var u = document.getElementById('aro-04');
    return JSON.stringify({
      units: document.querySelectorAll('section.unit-orria').length, toc: document.querySelectorAll('nav.toc a').length,
      ar: u.querySelectorAll('.ar-orria').length, prog: u.querySelector('.or-n').textContent, top: Math.round(u.getBoundingClientRect().top),
      notes: u.querySelectorAll('.it-atala .itb-claude').length, links: [...u.querySelectorAll('.or-lot a')].every(a => /^geruzak\\.html#s\\d+$/.test(a.getAttribute('href'))),
      pages: [...u.querySelectorAll('.or-orr')].every(x => /\\d+\\. or\\./.test(x.textContent)), audio: u.querySelectorAll('.it-entzun').length,
      keys: (function(){ var ks = [...document.querySelectorAll('section.unit-orria [data-k]')].map(e => e.closest('section').id + '|' + e.getAttribute('data-k')); return ks.length === new Set(ks).size ? ks.length : -1; })() });
  })()`));
  t.ok(k.units === 12 && k.toc === 12, 'Arian A1: las doce unidades están en el cuaderno y en el índice');
  t.ok(k.top >= 0 && k.top < 200, 'el enlace a una unidad lleva a ella (queda a ' + k.top + ' px del borde)');
  t.ok(k.ar === 37 && k.prog === '0 / 37 ariketa landuta', 'unidad 4: sus 37 ejercicios y el recuento a cero (' + k.prog + ')');
  t.ok(k.notes === 6 && k.links, 'las notas de los seis apartados llevan «⚠ Claude» y enlazan a Geruzak');
  t.ok(k.pages && k.audio === 10, 'cada ejercicio con su página; los diez de audio, con su pista');
  t.ok(k.keys > 3000, 'cada casilla de las doce unidades tiene clave propia (' + k.keys + ')');

  // ── escribir: opción, texto, marca, tabla, redacción y «Eginda»
  const w = JSON.parse(await A.ev(`(function(){
    var u = document.getElementById('aro-04');
    function fire(el, v){ el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }
    u.querySelector('[data-orf="At2:2"] input[value="G"]').click();
    fire(u.querySelector('input.gapf[data-k="f:At2:2:z"]'), 'proba bat');
    u.querySelector('[data-orf="A5:2"] input[value="b"]').click();
    u.querySelector('[data-orf="A6:c"] input').click();
    u.querySelector('[data-orf="C3:1:3"] input').click();
    fire(u.querySelector('textarea.ansf[data-k="f:E9:t"]'), 'Nire iragarkia');
    u.querySelector('[data-orf="C1:done"] input').click();
    u.querySelector('[data-orf="Bd:3"] input[value="Bai"]').click();
    return JSON.stringify({ prog: u.querySelector('.or-n').textContent, on: u.querySelectorAll('.ar-orria.or-on').length, ls: JSON.parse(localStorage.getItem('koadernoa:aro-04')),
      toc: document.querySelector('nav.toc a[href="#aro-04"] .p').textContent,
      given: u.querySelectorAll('.ar-orria[data-or="A5"] .or-adib').length, givenField: !!u.querySelector('[data-orf="A5:1"]') });
  })()`));
  t.ok(w.prog === '7 / 37 ariketa landuta' && w.on === 7 && w.toc === '7/37', 'el recuento cuenta los ejercicios con algo escrito o marcados «Eginda», también en el índice: ' + w.prog);
  t.ok(w.ls['f:At2:2'] === 'G' && w.ls['f:At2:2:z'] === 'proba bat' && w.ls['f:A5:2'] === 'b' && w.ls['f:A6:c'] === '1' && w.ls['f:C3:1:3'] === '1' && w.ls['f:E9:t'] === 'Nire iragarkia' && w.ls['f:C1:done'] === '1',
    'todo se guarda al momento, cada casilla con su clave');
  t.ok(w.given === 1 && !w.givenField, 'lo que el libro trae resuelto se enseña como dado, sin casilla');
  const off = JSON.parse(await A.ev(`(function(){ var u = document.getElementById('aro-04'), r = u.querySelector('[data-orf="Bd:3"] input[value="Bai"]'); r.click();
    return JSON.stringify({ checked: r.checked, prog: u.querySelector('.or-n').textContent, v: JSON.parse(localStorage.getItem('koadernoa:aro-04'))['f:Bd:3'] }); })()`));
  t.ok(!off.checked && off.v === '' && off.prog === '6 / 37 ariketa landuta', 'tocar otra vez la opción marcada la quita');

  // ── al volver a entrar, todo sigue ahí
  await A.go(t.base + '/arian.html?r#aro-04', 2600);
  const r = JSON.parse(await A.ev(`(function(){ var u = document.getElementById('aro-04');
    return JSON.stringify({ prog: u.querySelector('.or-n').textContent, g: u.querySelector('[data-orf="At2:2"] input[value="G"]').checked, z: u.querySelector('input.gapf[data-k="f:At2:2:z"]').value,
      c: u.querySelector('[data-orf="A6:c"] input').checked, t: u.querySelector('[data-orf="C3:1:3"] input').checked, done: u.querySelector('[data-orf="C1:done"] input').checked }); })()`));
  t.ok(r.prog === '6 / 37 ariketa landuta' && r.g && r.z === 'proba bat' && r.c && r.t && r.done, 'tras recargar, las casillas y el recuento vuelven como estaban');

  // ── libreta: el ejercicio con su página y tus respuestas
  const lb = JSON.parse(await A.ev(`(function(){ var d = document.createElement('div'); d.innerHTML = LIBRETA._build();
    var un = [...d.querySelectorAll('.lb-unit')].find(x => /Zure etxea/.test(x.textContent));
    var ars = [...d.querySelectorAll('.lb-ar')];
    return JSON.stringify({ cover: d.querySelector('.lb-cover h1').textContent, stats: [...d.querySelectorAll('.lb-stats div')].map(x => x.textContent).join(' | '), unit: un ? un.textContent : '', n: ars.length,
      txt: ars.map(x => x.textContent.replace(/\\s+/g, ' ')).join(' ‖ '), fields: d.querySelectorAll('input, textarea, button').length }); })()`));
  t.ok(/Arian A1/.test(lb.cover) && /6 \/ 457/.test(lb.stats), 'libreta: portada del libro con las cifras reales (' + lb.stats + ')');
  t.ok(/Arian A1 · 85–102/.test(lb.unit) && lb.n === 6, 'libreta: la unidad con su procedencia y los 6 ejercicios trabajados');
  t.ok(/87\. or\./.test(lb.txt) && /proba bat/.test(lb.txt) && /☑ c/.test(lb.txt) && /96\. or\. · eginda/.test(lb.txt) && /Nire iragarkia/.test(lb.txt) && lb.fields === 0,
    'libreta: cada uno con su página, tus respuestas, las marcas (☑) y «eginda», sin campos de formulario');
  await A.ev(`document.getElementById('lbBtn').click()`); await A.sleep(400);
  t.ok(!(await A.ev(`document.getElementById('lbOv').hidden`)), 'el botón 📓 abre la libreta');
  await A.ev(`document.querySelector('#lbOv .lb-x').click()`);

  // ── portada: el progreso de cada libro y de cada unidad
  await A.go(t.base + '/index.html', 1500);
  const home = JSON.parse(await A.ev(`JSON.stringify({ arian: document.querySelector('.book[data-liburua="arian"] .prog .t').textContent, bak: document.querySelector('.book[data-liburua="bakarka1"] .prog .t').textContent,
    u4: document.querySelector('.unit-l[href="arian.html#aro-04"] .p').textContent, units: document.querySelectorAll('.unit-l').length })`));
  t.ok(home.arian === '6 / 457' && home.bak === '0 / 144' && home.u4 === '6/37' && home.units === 29, 'portada: progreso de cada libro y de cada unidad (' + home.arian + ' · ' + home.bak + ')');

  // ── con perfil: sube a la nube y llega a otro dispositivo
  await A.go(t.base + '/arian.html#aro-04', 2600);
  await login(A, 'Maialen', '1234'); await sync(A);
  const srv = JSON.parse((await serverKey(t, 'koadernoa:aro-04')) || '{}');
  t.ok(srv['f:At2:2'] === 'G' && srv['f:E9:t'] === 'Nire iragarkia' && srv['f:C1:done'] === '1', 'con perfil, lo escrito en la hoja sube a la nube');
  const B = await t.tab({ width: 390, height: 844, mobile: true });
  await B.go(t.base + '/arian.html', 2200);
  await login(B, 'Maialen', '1234'); await sync(B);
  const b = JSON.parse(await B.ev(`(function(){ var u = document.getElementById('aro-04');
    return JSON.stringify({ prog: u.querySelector('.or-n').textContent, g: u.querySelector('[data-orf="At2:2"] input[value="G"]').checked, z: u.querySelector('input.gapf[data-k="f:At2:2:z"]').value,
      t: u.querySelector('[data-orf="C3:1:3"] input').checked, w: u.querySelector('textarea.ansf[data-k="f:E9:t"]').value, who: document.querySelector('#who .nm').textContent }); })()`));
  t.ok(b.who === 'Maialen' && b.g && b.z === 'proba bat' && b.t && b.w === 'Nire iragarkia' && b.prog === '6 / 37 ariketa landuta', 'otro dispositivo: al entrar con el perfil llegan las respuestas y el recuento (' + b.prog + ')');
  // Bakarka en el móvil: escribir y que suba
  await B.go(t.base + '/bakarka.html#bko-04', 2600);
  const bk = JSON.parse(await B.ev(`(function(){ var u = document.getElementById('bko-04'), f = u.querySelector('[data-k="f:2:1a"]'), a = u.querySelector('[data-k="f:1:1"]');
    f.value = 'a'; f.dispatchEvent(new Event('input', { bubbles: true })); a.value = 'Nik dut liburua.'; a.dispatchEvent(new Event('input', { bubbles: true }));
    return JSON.stringify({ units: document.querySelectorAll('section.unit-orria').length, prog: u.querySelector('.or-n').textContent, ls: JSON.parse(localStorage.getItem('koadernoa:bko-04')),
      sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }); })()`));
  t.ok(bk.units === 13 && bk.prog === '2 / 9 ariketa landuta' && bk.ls['f:2:1a'] === 'a' && bk.ls['f:1:1'] === 'Nik dut liburua.' && bk.sw === bk.cw, 'Bakarka 1 en el móvil: trece lecciones, se escribe y se guarda, sin desbordes (' + bk.prog + ')');
  await sync(B);
  const srvB = JSON.parse((await serverKey(t, 'koadernoa:bko-04')) || '{}');
  t.ok(srvB['f:2:1a'] === 'a', 'Bakarka 1: lo escrito también sube al perfil');

  // ── tu libro al lado: solo si en este ordenador está enlazado en pribatua/
  await A.go(t.base + '/arian.html?l#aro-04', 2600);
  const hasBook = await A.ev(`!!(window.NIRE_LIBURUAK && NIRE_LIBURUAK.arian && NIRE_LIBURUAK.arian.pdf)`);
  if (!hasBook) {
    t.ok((await A.ev(`document.querySelectorAll('#aro-04 button.or-orr').length`)) === 0, 'sin tu libro enlazado en este ordenador, la página es solo una referencia');
  } else {
    const v = JSON.parse(await A.ev(`(async function(){ var u = document.getElementById('aro-04');
      u.querySelector('.ar-orria[data-or="A1"] button.or-orr').click(); await new Promise(r => setTimeout(r, 200));
      var p = document.querySelector('.lib-panel'), f = p.querySelector('iframe'), out = { btn: u.querySelectorAll('button.or-orr').length, open: !p.hidden, src: f.getAttribute('src'), tit: p.querySelector('.lib-t').textContent };
      p.querySelector('[data-a="close"]').click(); out.closed = p.hidden && !p.querySelector('iframe'); return JSON.stringify(out); })()`));
    t.ok(v.btn === 37 && v.open && /^pribatua\/.+\.pdf#page=78/.test(v.src) && /88\. or\./.test(v.tit) && v.closed, 'local: la página de cada ejercicio abre tu PDF por ahí, al lado de las casillas (' + v.tit + ')');
    await A.go(t.base + '/bakarka.html?l#bko-02', 2600);
    const vb = JSON.parse(await A.ev(`(async function(){ var ar = document.querySelector('#bko-02 .ar-orria[data-or="1"]'); ar.querySelector('button.or-sp').click(); await new Promise(r => setTimeout(r, 200));
      var p = document.querySelector('.lib-panel'); return JSON.stringify({ tit: p.querySelector('.lib-t').textContent, src: p.querySelector('iframe').getAttribute('src'), sp: document.querySelectorAll('button.or-sp').length }); })()`));
    t.ok(vb.sp === 144 && /241\. or\./.test(vb.tit) && /bakarka-1\/liburua\.pdf#page=241/.test(vb.src), 'local, Bakarka 1: cada ejercicio abre también la página de sus soluciones (' + vb.tit + ')');
  }

  const errs = A.errs.concat(B.errs).filter(e => !/pribatua/.test(e));
  t.ok(!errs.length, 'sin errores de JavaScript' + (errs.length ? ': ' + errs[0] : ''));
  await A.close(); await B.close();
}
