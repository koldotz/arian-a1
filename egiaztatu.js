/* ══════════════════════════════════════════════════════════════════════
   Liburuen koadernoa · egiaztatu.js — corregir un ejercicio
   ----------------------------------------------------------------------
   EGIAZTATU.setup({ root, erantzunak, nor })
     erantzunak → { '<unidad>': { '<ejercicio>': soluciones } }   (ejercicio = «A5», como en orriak.js)
     soluciones → 'audio'              no se puede corregir: la respuesta solo está en el audio
                  '!motivo'            no se puede corregir, por otro motivo (se enseña)
                  { '<casilla>': valor, '#': [casillas que hay que marcar], _oh: 'nota' }
       valor: 'b'                      respuesta cerrada · varias válidas: 'b / c'
              '~Kazetaria da.'         modelo de una respuesta abierta: si no coincide no es un error,
                                       se enseña el modelo para compararlo
              { h: ['…'] }             huella de la respuesta del solucionario del libro: dice si
                                       coincide, sin llevar aquí la frase del libro
     nor → de quién son las soluciones: 'claude' (resueltas leyendo la página, sin contrastar
           con el libro) o la clave del libro (su solucionario)
     berezkoa → true en las lecciones propias: el ejercicio y su solución son de Claude
   Cada ejercicio con soluciones gana un botón «Egiaztatu». Las casillas:
     ✓ coincide · ✗ no coincide (se enseña la solución) · modelo para comparar.
   Lo que cambias pierde su marca. No se guarda nada: es una ayuda para repasar.
   ══════════════════════════════════════════════════════════════════════ */
(function(G){
  'use strict';

  /* ── funciones puras (las usan también las herramientas y las pruebas) ── */
  function nrm(s){
    return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[«»"“”'’‘¿?¡!.,;:()…*]/g, ' ').replace(/[–—]/g, ' ').replace(/\s+/g, ' ').trim().replace(/^-+(?=\S)/, '');
  }
  /* forma de comparar: sin mayúsculas, acentos, signos ni guiones («seme-alabak» = «seme alabak») */
  function kanon(s){ return nrm(s).replace(/-/g, ' ').replace(/\s+/g, ' ').trim(); }
  function alts(s){ return String(s).split(/\s+\/\s+/).map(kanon).filter(Boolean); }
  /* huella de 53 bits (cyrb53): para comparar con el solucionario sin llevar aquí su texto */
  function hash(str){
    var h1 = 0xdeadbeef ^ 7, h2 = 0x41c6ce57 ^ 7;
    for (var i = 0, ch; i < str.length; i++){ ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  function huella(where, answer){ return hash(where + '|' + kanon(answer)); }
  /* compara una respuesta con su solución → { r: 'ok' | 'ko' | 'cmp' | 'empty', sol: lo que se enseña } */
  function konparatu(sol, value, where){
    var raw = String(value == null ? '' : value).trim();
    if (!raw) return { r: 'empty' };
    var v = kanon(raw);
    if (sol && typeof sol === 'object' && sol.h) return v && sol.h.indexOf(hash(where + '|' + v)) >= 0 ? { r: 'ok' } : { r: 'cmp', sol: null };
    var model = String(sol).charAt(0) === '~', txt = model ? String(sol).slice(1) : String(sol), A = alts(txt);
    if (A.indexOf('ø') >= 0 && /^(0|-|–|—|ø)$/i.test(raw)) return { r: 'ok' };                 // «Ø» = nada: vale 0 o un guion
    if (v && A.indexOf(v) >= 0) return { r: 'ok' };
    return { r: model ? 'cmp' : 'ko', sol: model ? txt.split(/\s+\/\s+/)[0] : txt };          // de un modelo con varias formas válidas se enseña la primera
  }

  var E = { nrm: nrm, kanon: kanon, alts: alts, hash: hash, huella: huella, konparatu: konparatu };
  G.EGIAZTATU = E;
  if (typeof document === 'undefined') return;

  /* ── en la página ───────────────────────────────────────────────────── */
  var CFG = null;
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  function solsOf(ar){
    var u = ar.closest('section.unit'), S = CFG.erantzunak && CFG.erantzunak[u.id];
    return S ? S[ar.getAttribute('data-or')] : null;
  }
  function clear(ar){
    Array.prototype.forEach.call(ar.querySelectorAll('.kc-sol, .kc-model, .kc-mark'), function(x){ x.remove(); });
    Array.prototype.forEach.call(ar.querySelectorAll('.kc-ok, .kc-ko, .kc-cmp'), function(x){ x.classList.remove('kc-ok', 'kc-ko', 'kc-cmp'); });
    var s = ar.querySelector('.kc-sum'); if (s) s.textContent = '';
    ar.classList.remove('kc-on');
    var b = ar.querySelector('.kc-btn'); if (b) b.textContent = '✓ Egiaztatu · comprobar';
  }
  function after(el, cls, text){
    var s = document.createElement('span'); s.className = cls; s.textContent = text;
    el.insertAdjacentElement('afterend', s); return s;
  }
  function model(el, text, sp){
    var host = el.closest('li, .or-it') || el.parentNode;
    if (host.querySelector('.kc-model')) return;
    var d = document.createElement('div'); d.className = 'kc-model';
    d.innerHTML = text != null ? '<span>Modelo</span> ' + esc(text)
      : '<span>No coincide</span> con el solucionario del libro' + (sp ? ' (' + esc(sp) + '. or.)' : '') + ': compáralo allí; puede haber otra respuesta válida.';
    host.appendChild(d);
  }
  function check(ar){
    var sols = solsOf(ar); if (!sols || typeof sols !== 'object') return null;
    clear(ar);
    var u = ar.closest('section.unit'), ek = ar.getAttribute('data-or'), pf = 'f:' + ek + ':', sp = ar.getAttribute('data-sp');
    var marks = sols['#'], r = { ok: 0, ko: 0, cmp: 0, empty: 0 };
    Array.prototype.forEach.call(ar.querySelectorAll('[data-k]'), function(el){
      var key = el.getAttribute('data-k'); if (key.indexOf(pf) !== 0) return;
      var k = key.slice(pf.length); if (k === 'done') return;
      if (el.classList.contains('or-chk')){                     // marcas: bien si está marcada la que toca y solo esa
        if (!marks) return;
        var want = marks.indexOf(k) >= 0, got = el.value === '1';
        if (want && got){ r.ok++; el.classList.add('kc-ok'); }
        else if (want || got){ r.ko++; el.classList.add('kc-ko'); after(el, 'kc-mark ko', want ? '← falta' : '← sobra'); }
        return;
      }
      var sol = sols[k]; if (sol == null) return;
      var c = konparatu(sol, el.value, u.id + '|' + ek + '|' + k);
      if (c.r === 'empty'){ r.empty++; return; }
      r[c.r]++;
      el.classList.add(c.r === 'ok' ? 'kc-ok' : c.r === 'ko' ? 'kc-ko' : 'kc-cmp');
      if (c.r === 'ko') after(el, 'kc-sol', '→ ' + c.sol);
      else if (c.r === 'cmp') model(el, c.sol, sp);
    });
    ar.classList.add('kc-on');
    var sum = ar.querySelector('.kc-sum');
    if (sum) sum.innerHTML = '<b class="ok">✓ ' + r.ok + '</b>' + (r.ko ? ' · <b class="ko">✗ ' + r.ko + '</b>' : '') + (r.cmp ? ' · ' + r.cmp + ' para comparar' : '') + (r.empty ? ' · ' + r.empty + ' sin responder' : '');
    var b = ar.querySelector('.kc-btn'); if (b) b.textContent = 'Ocultar la corrección';
    return r;
  }
  function badge(){ return (G.ITURRIAK ? ITURRIAK.badge(CFG.nor || 'claude') : ''); }

  function setup(cfg){
    CFG = cfg || {};
    var root = typeof CFG.root === 'string' ? document.querySelector(CFG.root) : CFG.root; if (!root) return;
    var own = (CFG.nor || 'claude') === 'claude';
    Array.prototype.forEach.call(root.querySelectorAll('.ar-orria'), function(ar){
      var sols = solsOf(ar);
      if (typeof sols === 'string'){
        ar.insertAdjacentHTML('beforeend', '<div class="kc-ez">Sin corrección: ' + esc(sols === 'audio' ? 'la respuesta solo se puede saber escuchando el audio.' : sols.replace(/^!/, '')) + '</div>'); return;
      }
      if (!sols || typeof sols !== 'object') return;
      var sp = ar.getAttribute('data-sp');
      var bar = document.createElement('div'); bar.className = 'kc-bar';
      bar.innerHTML = '<button type="button" class="kc-btn">✓ Egiaztatu · comprobar</button><span class="kc-sum" role="status" aria-live="polite"></span>' +
        '<span class="kc-src" title="' + (CFG.berezkoa ? 'El ejercicio y su solución están escritos por Claude: no salen de ningún libro' : own ? 'Soluciones resueltas por Claude leyendo la página: no están contrastadas con el solucionario del libro' : 'Soluciones del solucionario del libro') + '">soluciones ' + badge() + (sp ? ' <span>' + esc(sp) + '. or.</span>' : '') + '</span>' +
        (sols._oh ? '<span class="kc-note">' + esc(sols._oh) + '</span>' : '');
      ar.appendChild(bar);
      bar.querySelector('.kc-btn').addEventListener('click', function(){ if (ar.classList.contains('kc-on')) clear(ar); else check(ar); });
    });
    /* una respuesta que se cambia pierde su marca */
    root.addEventListener('input', function(e){
      var f = e.target.closest && e.target.closest('[data-k]'); if (!f) return;
      f.classList.remove('kc-ok', 'kc-ko', 'kc-cmp');
      var nx = f.nextElementSibling; if (nx && (nx.classList.contains('kc-sol') || nx.classList.contains('kc-mark'))) nx.remove();
    });
  }

  E.setup = setup; E.check = check; E.clear = clear;
})(typeof window !== 'undefined' ? window : globalThis);
