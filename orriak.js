/* ══════════════════════════════════════════════════════════════════════
   Liburuen koadernoa · orriak.js — las hojas de respuestas de un libro
   ----------------------------------------------------------------------
   Una hoja de respuestas es un libro sin su texto: de cada ejercicio, solo
   el número, la página, la pista de audio y las casillas justas para
   contestar. Los enunciados se leen en el libro. Por eso se puede publicar.

   ORRIAK.render({ root, liburua })     pinta el cuaderno de un libro
     liburua → { src, izena, eu, unitateak: [ { id, n, eu, orr, atalak: [
                  { id, k, kode, orr, lan, lot: [[§, título]], falta, ar: [ … ] } ] } ] }
       id    de la unidad: no se cambia nunca (de él salen las claves guardadas)
       lan   nota propia (⚠ Claude) sobre lo que trabaja el apartado · lot → enlaces a Geruzak
       ar    { g } rótulo de subapartado, o un ejercicio { n, p, pp, sp, au, m, zer, hint, adib, … }:
         m:'ikus'   solo leer o escuchar: no hay nada que escribir
         m:'lib'    en el libro se hace sobre un dibujo o un texto: aquí, un recuadro para
                    apuntar la respuesta (oh: [rótulos] = una casilla por rótulo)
         m:'eg'     egia/gezurra y corrección por punto            it: [rótulos]
         m:'bai'    bai/ez por punto                              it: [rótulos]
         m:'abc'    una opción por punto (op: ['a','b','c'])      it: [rótulos] o grp: [[grupo, [rótulos]], …]
         m:'auk'    una opción por punto, con sus opciones        it: [[rótulo, [opciones]], …]
         m:'mark'   marcar las que correspondan                   it: [rótulos]
         m:'taula'  tabla (filas × columnas) de marcas, o de texto con tx:true
         m:'idaz'   redacción larga
         m:'tx'     respuestas escritas   it: [rótulos] o grp: [[grupo, [rótulos]], …]
                    luze: respuesta larga (área) · zabal: columnas anchas · bat: una línea por punto
         pre        lo que el libro trae ya resuelto: { rótulo: true } = «lo da el libro», sin
                    repetirlo aquí; { rótulo: 'b' } = la opción que trae marcada; en mark y taula, lista
         adib:true  el libro trae un ejemplo resuelto antes del primer punto
         p / pp     página (y tramo de páginas que se enseña) · sp  página de las soluciones
         au         pista o pistas del audio

   Lecciones propias (src:'claude'; datuak/ikasgaiak-a1.js): aquí el texto SÍ va, porque no
   es de ningún libro. Usan las mismas casillas y además:
     unidad    sarrera  presentación de la unidad (en vez de la de las hojas)
     apartado  ref: [libro, páginas]  dónde trata el libro ese mismo punto
     en «ar»   bloques { t, iz, … } entre los ejercicios:
                 t:'elk'   diálogo o texto   l: [[quién, euskera, castellano], …]
                 t:'hiz'   vocabulario       l: [[euskera, castellano], …]
                 t:'gram'  gramática         p: [párrafos] · taula: { cols, rows }
     ejercicio en       enunciado
               gal      el texto de cada punto, en el orden de «it»; «___» = dónde va el hueco
               kutxa    palabras del recuadro · tes  texto sobre el que se trabaja
               motz     huecos cortos (un sufijo)        (sin p ni au: no hay página ni pista)

   Claves de lo escrito (localStorage «koadernoa:<unidad>»):
     f:<ejercicio>:<casilla>   ejercicio = código del apartado + número («A5»)
   ORRIAK.eremuak(ex) da las casillas de un ejercicio en el orden en que se
   pintan; lo usan la corrección (egiaztatu.js), la portada y las pruebas.
   ══════════════════════════════════════════════════════════════════════ */
(function(G){
  'use strict';

  /* ── funciones puras ────────────────────────────────────────────────── */
  /* clave de un punto: su rótulo si lo tiene (no se descoloca si se corrige la hoja); si no, su posición */
  function ik(l, i){ var s = String(l == null ? '' : l).normalize('NFD').replace(/[^A-Za-z0-9]+/g, ''); return s || String(i); }
  function kodea(s){ return s.kode != null ? s.kode : ik(s.id, 0); }
  function gakoa(s, ex){ return kodea(s) + ex.n; }                                              // «A5»: dentro de la unidad
  function ikusgai(u, s, ex){ return u.n + kodea(s) + (ex.n !== '' ? '·' + ex.n : ''); }        // «4A·5»: la que se enseña
  function OPS(ex){ return ex.op || (ex.m === 'bai' ? ['Bai', 'Ez'] : ['a', 'b', 'c']); }
  /* casillas de un ejercicio: [{ k: sufijo de la clave, t: 'auk' | 'mark' | 'tx' | 'luze', ops, l: rótulo }] */
  function eremuak(ex){
    var it = ex.it || [], out = [];
    switch (ex.m){
      case 'ikus': break;
      case 'lib':
        if (ex.oh) ex.oh.forEach(function(l, i){ out.push({ k: 'o' + i, t: 'tx', l: l }); }); else out.push({ k: 'o', t: 'luze', l: '' });
        break;
      case 'eg':
        it.forEach(function(l, i){ var k = ik(l, i); out.push({ k: k, t: 'auk', ops: ['E', 'G'], l: l }); out.push({ k: k + ':z', t: 'tx', l: l, z: true }); });
        break;
      case 'bai': case 'abc': case 'auk':
        (ex.grp || [['', it]]).forEach(function(g, gi){
          var pf = ex.grp ? gi + ':' : '';
          g[1].forEach(function(x, i){
            var l = Array.isArray(x) ? x[0] : x;
            if (!ex.grp && ex.pre && ex.pre[l]) return;
            out.push({ k: pf + ik(l, i), t: 'auk', ops: Array.isArray(x) ? x[1] : OPS(ex), l: l });
          });
        });
        break;
      case 'mark':
        it.forEach(function(l, i){ if (ex.pre && ex.pre.indexOf(l) >= 0) return; out.push({ k: ik(l, i), t: 'mark', l: l }); });
        break;
      case 'taula':
        ex.rows.forEach(function(r, i){ ex.cols.forEach(function(c, j){
          if (ex.pre && ex.pre.indexOf(i + ':' + j) >= 0) return;
          out.push({ k: i + ':' + j, t: ex.tx ? 'tx' : 'mark', l: r + ' · ' + c });
        }); });
        break;
      case 'idaz': out.push({ k: 't', t: 'luze', l: '' }); break;
      default:
        (ex.grp || [['', it]]).forEach(function(g, gi){
          var pf = ex.grp ? gi + ':' : '';
          g[1].forEach(function(l, i){
            if (ex.luze) { out.push({ k: pf + ik(l, i), t: 'luze', l: l }); return; }
            if (ex.pre && ex.pre[l]) return;
            out.push({ k: pf + ik(l, i), t: 'tx', l: l });
          });
        });
    }
    return out;
  }
  /* ejercicios de una unidad, en orden: [{ s: apartado, ex, key: «A5» }] */
  function ariketak(u){
    var out = [];
    (u.atalak || []).forEach(function(s){ (s.ar || []).forEach(function(ex){ if (ex.g == null && ex.t == null) out.push({ s: s, ex: ex, key: gakoa(s, ex) }); }); });
    return out;
  }
  /* cuántos ejercicios de la unidad tienen algo escrito o están marcados «Eginda» (state = lo guardado) */
  function landuak(u, state){
    state = state || {};
    return ariketak(u).filter(function(a){
      var pf = 'f:' + a.key + ':';
      if (state[pf + 'done']) return true;
      return eremuak(a.ex).some(function(e){ var v = state[pf + e.k]; return v != null && String(v).trim() !== ''; });
    }).length;
  }
  function gordea(id){ try { return JSON.parse(localStorage.getItem('koadernoa:' + id) || '{}') || {}; } catch (e) { return {}; } }

  var O = { ik: ik, kodea: kodea, gakoa: gakoa, ikusgai: ikusgai, eremuak: eremuak, ariketak: ariketak, landuak: landuak, gordea: gordea };
  G.ORRIAK = O;
  if (typeof document === 'undefined') return;                 // en las pruebas de datos solo hacen falta las funciones puras

  /* ── pintar ─────────────────────────────────────────────────────────── */
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  function inl(s){ return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>'); }
  function IT(){ return G.ITURRIAK || null; }
  function badge(src, ref){ return IT() ? IT().badge(src, ref) : ''; }
  function orr(n){ return n ? n + '. or.' : ''; }

  var ZER = { lib: 'Liburuan · sobre el dibujo o el texto', ikus: 'Irakurri edo entzun · sin respuesta escrita', eg: 'Egia ala gezurra · corrige las falsas', bai: 'Bai ala ez',
              abc: 'Hutsuneak · elige una opción', auk: 'Aukeratu · elige una', mark: 'Markatu · marca las que correspondan', taula: 'Taula · completa la tabla',
              idaz: 'Idazlana · redacción', tx: 'Erantzun · escribe las respuestas' };
  function lbl(l){ return l === '' || l == null ? '' : '<span class="l' + (String(l).length > 3 ? ' luze' : '') + '">' + inl(l) + '</span>'; }
  function seg(u, fk, ops){
    return '<span class="orf or-seg" data-orf="' + esc(fk) + '" role="radiogroup">' + ops.map(function(o){
      return '<label><input type="radio" name="' + esc(u.id + ':' + fk) + '" value="' + esc(o) + '"><span>' + esc(o) + '</span></label>'; }).join('') + '</span>';
  }
  function chk(fk, l, cls){ return '<label class="orf or-chk' + (cls || '') + '" data-orf="' + esc(fk) + '"><input type="checkbox" value="1"' + (l ? '' : ' aria-label="' + esc(fk) + '"') + '>' + (l ? '<span>' + inl(l) + '</span>' : '') + '</label>'; }
  function emana(o){
    if (o === true) return '<span class="or-adibl" title="El libro lo trae resuelto">adib. · lo da el libro</span>';
    return '<span class="or-adib" title="El libro lo trae resuelto">' + esc(o) + '</span><span class="or-adibl">adib.</span>';
  }
  function gapS(fk){ return '<span class="gap" data-fk="' + esc(fk) + '"></span>'; }

  /* lecciones propias: el texto de cada punto («___» = dónde va su hueco; si no lo lleva, el hueco va detrás) */
  function galT(q, gap){
    var t = inl(q), barruan = gap && t.indexOf('___') >= 0;
    return '<span class="gq">' + (barruan ? t.replace('___', gap) : t) + '</span>' + (gap && !barruan ? gap : '');
  }
  /* lecciones propias: diálogo o texto, vocabulario y gramática */
  function blokea(b){
    var h = '<div class="ik-b ik-' + esc(b.t) + '"><h4>' + inl(b.iz) + (b.t === 'elk' ? '<button type="button" class="ik-itz" aria-pressed="false">Itzulpena · traducción</button>' : '') + '</h4>';
    if (b.t === 'elk') h += b.l.map(function(x){
      return '<p>' + (x[0] ? '<b>' + esc(x[0]) + '</b>' : '') + '<span class="ik-eu" lang="eu">' + inl(x[1]) + '</span>' + (x[2] ? '<span class="ik-es" lang="es">' + inl(x[2]) + '</span>' : '') + '</p>'; }).join('');
    else if (b.t === 'hiz') h += '<dl>' + b.l.map(function(x){ return '<div><dt lang="eu">' + inl(x[0]) + '</dt><dd lang="es">' + inl(x[1]) + '</dd></div>'; }).join('') + '</dl>';
    else {
      h += (b.p || []).map(function(p){ return '<p lang="es">' + inl(p) + '</p>'; }).join('');
      if (b.taula) h += '<div class="or-taula"><table><tr>' + b.taula.cols.map(function(c){ return '<th>' + inl(c) + '</th>'; }).join('') + '</tr>' +
        b.taula.rows.map(function(r){ return '<tr>' + r.map(function(c){ return '<td>' + inl(c).replace(/(^|[\s(])-(?=[a-z(])/g, '$1\u2011') + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>';   // el guion de un sufijo no se separa de él al partirse la celda
    }
    return h + '</div>';
  }

  function kontrolak(ex, u, ekey){
    var f = function(x){ return ekey + ':' + x; }, it = ex.it || [], h = '', gi = 0;
    function nq(){ return ex.gal ? ex.gal[gi++] : null; }
    if (ex.en) h += '<p class="or-en">' + inl(ex.en) + '</p>';
    if (ex.kutxa) h += '<p class="or-kutxa" lang="eu">' + ex.kutxa.map(function(w){ return '<span>' + inl(w) + '</span>'; }).join('') + '</p>';
    if (ex.tes) h += '<div class="or-tes" lang="eu">' + [].concat(ex.tes).map(function(p){ return '<p>' + inl(p) + '</p>'; }).join('') + '</div>';
    if (ex.hint) h += '<p class="or-hint">' + inl(ex.hint) + '</p>';
    if (ex.adib) h += '<p class="or-hint">El libro trae antes un ejemplo resuelto (Adib.).</p>';
    switch (ex.m){
      case 'ikus':
        h += '<p class="or-hint">Solo hay que leer o escuchar: no se escribe nada. Márcalo cuando lo hayas hecho.</p>'; break;
      case 'lib':
        h += '<p class="or-hint">En el libro se hace sobre el dibujo o el texto. Apunta aquí tu respuesta, o márcalo sin más cuando esté hecho.</p>';
        if (ex.oh) h += '<div class="or-grid one">' + ex.oh.map(function(l, i){ return '<div class="or-it">' + lbl(l) + gapS(f('o' + i)) + '</div>'; }).join('') + '</div>';
        else h += '<ol class="items"><li data-fk="' + esc(f('o')) + '"></li></ol>';
        break;
      case 'eg':
        h += '<div class="or-grid one">' + it.map(function(l, i){ var k = ik(l, i), q = nq(); return '<div class="or-it' + (q ? ' or-gal' : '') + '">' + lbl(l) + (q ? galT(q) : '') + seg(u, f(k), ['E', 'G']) + gapS(f(k) + ':z') + '</div>'; }).join('') + '</div>'; break;
      case 'bai': case 'abc': case 'auk':
        (ex.grp || [['', it]]).forEach(function(g, gi){
          var pf = ex.grp ? gi + ':' : '';
          if (g[0]) h += '<div class="or-sub">' + inl(g[0]) + '</div>';
          h += '<div class="or-grid' + (ex.gal ? ' one' : ex.m === 'auk' || ex.zabal ? ' wide' : '') + '">' + g[1].map(function(x, i){
            var l = Array.isArray(x) ? x[0] : x, ops = Array.isArray(x) ? x[1] : OPS(ex), pre = !ex.grp && ex.pre && ex.pre[l], q = nq();
            return '<div class="or-it' + (q ? ' or-gal' : '') + '">' + lbl(l) + (q ? galT(q) : '') + (pre ? emana(pre) : seg(u, f(pf + ik(l, i)), ops)) + '</div>'; }).join('') + '</div>';
        });
        break;
      case 'mark':
        h += '<div class="or-it or-marks">' + it.map(function(l, i){
          return ex.pre && ex.pre.indexOf(l) >= 0 ? '<span class="or-chk or-emana" title="El libro lo trae marcado">☑ ' + inl(l) + ' <span class="or-adibl">adib.</span></span>' : chk(f(ik(l, i)), l); }).join('') + '</div>'; break;
      case 'taula':
        h += '<div class="or-taula"><table><tr><th></th>' + ex.cols.map(function(c){ return '<th>' + inl(c) + '</th>'; }).join('') + '</tr>' + ex.rows.map(function(r, i){
          return '<tr><td>' + inl(r) + '</td>' + ex.cols.map(function(c, j){ var k = f(i + ':' + j);
            return '<td>' + (ex.pre && ex.pre.indexOf(i + ':' + j) >= 0 ? '<span class="or-adibl">adib.</span>' : ex.tx ? gapS(k) : chk(k, '', ' or-cell')) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>'; break;
      case 'idaz':
        h += '<ol class="items"><li class="or-idaz" data-fk="' + esc(f('t')) + '"></li></ol>'; break;
      default:
        (ex.grp || [['', it]]).forEach(function(g, gi){
          var pf = ex.grp ? gi + ':' : '';
          if (g[0]) h += '<div class="or-sub">' + inl(g[0]) + '</div>';
          if (ex.luze) h += '<ol class="items">' + g[1].map(function(l, i){ var q = nq(); return '<li data-fk="' + esc(f(pf + ik(l, i))) + '">' + (l ? '<span class="q">' + inl(l) + '</span>' : '') + (q ? galT(q) : '') + '</li>'; }).join('') + '</ol>';
          else h += '<div class="or-grid' + (ex.gal || ex.bat ? ' one' : ex.zabal ? ' wide' : '') + '">' + g[1].map(function(l, i){
            var pre = ex.pre && ex.pre[l], q = nq(), gp = pre ? emana(pre) : gapS(f(pf + ik(l, i)));
            return '<div class="or-it' + (q ? ' or-gal' + (ex.motz ? ' motz' : '') : '') + '">' + lbl(l) + (q ? galT(q, gp) : gp) + '</div>'; }).join('') + '</div>';
        });
    }
    return h;
  }
  function atala(s, u){
    var body = (s.ar || []).map(function(ex){
      if (ex.g != null) return '<div class="it-azpi"><h4>' + inl(ex.g) + '</h4></div>';
      if (ex.t) return blokea(ex);
      var ekey = gakoa(s, ex), tracks = ex.au ? String(ex.au) : '';
      return '<div class="ar ar-orria" data-or="' + esc(ekey) + '"' + (ex.p ? ' data-p="' + esc(ex.p) + '"' : '') + (ex.sp ? ' data-sp="' + esc(ex.sp) + '"' : '') + '>' +
        '<div class="h"><span class="k">' + esc(ikusgai(u, s, ex)) + '</span><h3>' + inl(ex.zer || ZER[ex.m] || ZER.tx) +
          (tracks ? ' <span class="it-entzun" data-au="' + esc(tracks) + '" title="Pista ' + esc(tracks) + ' del audio del libro">🎧 ' + esc(tracks) + '</span>' : '') + '</h3>' +
          '<span class="or-meta">' + (ex.p ? '<span class="or-orr" data-p="' + esc(ex.p) + '" title="' + esc((IT() ? IT().label(u.src) : '') + ' · ' + orr(ex.pp || ex.p)) + '">' + esc(orr(ex.pp || ex.p)) + '</span>' : '') +
          '<label class="orf or-done" data-orf="' + esc(ekey + ':done') + '"><input type="checkbox" value="1"> Eginda</label></span></div>' +
        '<div class="b">' + kontrolak(ex, u, ekey) + '</div></div>';
    }).join('');
    var head = s.k || s.lan || s.falta;
    return (head ? '<div class="it-atala" id="' + esc(u.id + '-' + s.id) + '">' + (s.k ? '<span class="k">' + esc(s.k) + '</span>' : '') + '<div class="tx">' +
      (s.lan ? '<p class="or-who">' + badge('claude') + '<span>nota propia</span></p><p class="or-lan">' + inl(s.lan) + '</p>' : '') +
      (s.lot && s.lot.length ? '<div class="or-lot">' + s.lot.map(function(l){ return '<a href="geruzak.html#s' + esc(l[0]) + '">Geruzak §' + esc(l[0]) + ' · ' + esc(l[1]) + ' →</a>'; }).join('') + '</div>' : '') +
      (s.falta ? '<p class="or-falta">⚠ ' + inl(s.falta) + '</p>' : '') + '</div>' + (s.ref ? badge(s.ref[0], orr(s.ref[1])) : s.orr ? badge(u.src, orr(s.orr)) : '') + '</div>' : '') + body;
  }
  function unitatea(u){
    var at = u.atalak || [], nav = at.filter(function(s){ return s.k; });
    return '<section class="unit unit-orria" id="' + esc(u.id) + '" data-src="' + esc(u.src) + '"><div class="wrap">' +
      '<div class="uhead"><span class="n">' + esc(u.n) + '</span><h2>' + inl(u.eu) + '</h2>' + badge(u.src, u.orr ? u.orr + '. or.' : '') + '</div>' +
      '<p class="uintro">' + (u.sarrera ? inl(u.sarrera) : 'Erantzun-orria · hoja de respuestas. Los enunciados están en el libro; aquí van el número de cada ejercicio, su página y las casillas.' + (u.oharra ? ' ' + inl(u.oharra) : '')) + '</p>' +
      '<div class="or-prog"><span class="or-n"></span><span class="track"><i></i></span></div>' +
      (nav.length < 2 ? '' : '<nav class="it-nav" aria-label="Apartados de la unidad">' + nav.map(function(s){ return '<a href="#' + esc(u.id + '-' + s.id) + '">' + esc(s.k) + '</a>'; }).join('') + '</nav>') +
      at.map(function(s){ return atala(s, u); }).join('') +
      '</div></section>';
  }

  /* ── casillas: escribir y guardar ───────────────────────────────────── */
  var FIELDS = 'input.gapf, textarea.ansf, .orf';
  var areas = [];
  function grow(t){ if (t.offsetParent === null) return; t.style.height = 'auto'; t.style.height = (t.scrollHeight + 2) + 'px'; }
  /* las casillas de opción y de marca se leen y se escriben como un campo de texto (propiedad value) */
  function orfValue(el){
    var ins = el.querySelectorAll('input');
    Object.defineProperty(el, 'value', {
      get: function(){ for (var i = 0; i < ins.length; i++) if (ins[i].checked) return ins[i].value; return ''; },
      set: function(v){ v = v == null ? '' : String(v); for (var i = 0; i < ins.length; i++){ ins[i].checked = v !== '' && ins[i].value === v; ins[i].toggleAttribute('data-on', ins[i].checked); } }
    });
  }
  function lotu(sec){
    var uid = sec.id, LSKEY = 'koadernoa:' + uid, DOCID = 'koad-' + uid, state = gordea(uid), fields = {};
    function persist(){ if (G.HUB && HUB.save) HUB.save(DOCID, LSKEY, state); else try { localStorage.setItem(LSKEY, JSON.stringify(state)); } catch (e) {} }
    function register(el, key, type){
      fields[key] = { el: el, type: type };
      el.setAttribute('data-k', key);
      if (state[key] != null) el.value = state[key];
      el.addEventListener('input', function(){ state[key] = el.value; if (type === 'area') grow(el); persist(); });
    }
    Array.prototype.forEach.call(sec.querySelectorAll('span.gap'), function(span){
      var inp = document.createElement('input');
      inp.type = 'text'; inp.className = 'gapf'; inp.autocomplete = 'off'; inp.spellcheck = false; inp.setAttribute('autocapitalize', 'off');
      inp.setAttribute('aria-label', 'Erantzuna · respuesta');
      var fk = span.getAttribute('data-fk');
      span.parentNode.replaceChild(inp, span);
      register(inp, 'f:' + fk, 'gap');
    });
    Array.prototype.forEach.call(sec.querySelectorAll('ol.items > li[data-fk]'), function(li){
      var ta = document.createElement('textarea');
      ta.className = 'ansf'; ta.rows = 1; ta.placeholder = 'Idatzi hemen…'; ta.autocomplete = 'off'; ta.spellcheck = false;
      ta.setAttribute('aria-label', 'Zure erantzuna · tu respuesta');
      li.appendChild(ta);
      register(ta, 'f:' + li.getAttribute('data-fk'), 'area');
      areas.push(ta);
      if (ta.value) grow(ta);
    });
    Array.prototype.forEach.call(sec.querySelectorAll('.orf[data-orf]'), function(el){ orfValue(el); register(el, 'f:' + el.getAttribute('data-orf'), 'orria'); });
    /* si llega una versión más nueva (otro dispositivo), repuebla las casillas */
    if (G.HUB && HUB.bind) HUB.bind(DOCID, LSKEY, function(v){
      if (!v || typeof v !== 'object') return;
      state = v;
      Object.keys(fields).forEach(function(k){ var f = fields[k]; f.el.value = v[k] != null ? v[k] : ''; if (f.type === 'area' && (f.el.value || f.el.style.height)) grow(f.el); });
      aurrerapena(sec);
    }, function(){ return state; });
  }
  function landua(ar){ return Array.prototype.some.call(ar.querySelectorAll(FIELDS), function(f){ return String(f.value || '').trim(); }); }
  function aurrerapena(sec){
    var ars = sec.querySelectorAll('.ar-orria'), n = 0;
    Array.prototype.forEach.call(ars, function(ar){ var on = landua(ar); ar.classList.toggle('or-on', on); if (on) n++; });
    var t = sec.querySelector('.or-prog .or-n'), b = sec.querySelector('.or-prog .track i');
    if (t) t.textContent = n + ' / ' + ars.length + ' ariketa landuta';
    if (b) b.style.width = (ars.length ? n / ars.length * 100 : 0) + '%';
    var a = document.querySelector('nav.toc a[href="#' + sec.id + '"]');
    if (a){ var p = a.querySelector('.p'); if (p) p.textContent = n + '/' + ars.length; a.classList.toggle('osoa', ars.length > 0 && n === ars.length); }
  }

  /* ── el cuaderno entero ─────────────────────────────────────────────── */
  function render(o){
    var root = typeof o.root === 'string' ? document.querySelector(o.root) : o.root, L = o.liburua;
    if (!root || !L) return;
    var main = root.querySelector('main'), nav = root.querySelector('nav.toc .inner'), U = L.unitateak || [];
    U.forEach(function(u){ u.src = u.src || L.src; });
    var foot = main.querySelector(':scope > footer'), html = U.map(unitatea).join('');
    if (foot) foot.insertAdjacentHTML('beforebegin', html); else main.insertAdjacentHTML('beforeend', html);
    if (nav) nav.insertAdjacentHTML('beforeend', '<div class="grp">' + esc(L.taldea || 'Unitateak') + '</div><ol>' + U.map(function(u){
      return '<li><a href="#' + esc(u.id) + '"><span class="n">' + esc(u.n) + '</span><span class="t">' + inl(u.eu) + '</span><span class="p"></span></a></li>'; }).join('') + '</ol>');

    var secs = Array.prototype.slice.call(root.querySelectorAll('section.unit-orria'));
    secs.forEach(lotu);
    secs.forEach(aurrerapena);
    /* tocar otra vez la opción marcada la quita */
    root.addEventListener('click', function(e){
      var itz = e.target.closest && e.target.closest('.ik-itz');                       // lecciones propias: enseñar u ocultar la traducción
      if (itz){ itz.setAttribute('aria-pressed', String(itz.closest('.ik-b').classList.toggle('itz'))); return; }
      var r = e.target; if (!r || r.type !== 'radio' || !r.closest('.or-seg')) return;
      if (r.hasAttribute('data-on')){ r.checked = false; r.removeAttribute('data-on'); r.dispatchEvent(new Event('input', { bubbles: true })); return; }
      Array.prototype.forEach.call(r.closest('.or-seg').querySelectorAll('input'), function(x){ x.toggleAttribute('data-on', x === r); });
    });
    root.addEventListener('input', function(e){ var s = e.target.closest && e.target.closest('section.unit-orria'); if (s) aurrerapena(s); });

    /* índice: marca la unidad que se está viendo */
    var links = nav ? Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')) : [];
    function mark(){
      var y = window.scrollY + 140, cur = -1;
      secs.forEach(function(s, i){ if (s.offsetTop <= y) cur = i; });
      links.forEach(function(a, i){ a.classList.toggle('cur', i === cur); });
    }
    window.addEventListener('scroll', mark, { passive: true }); mark();
    /* con content-visibility las alturas se estiman: al saltar a un ancla se reajusta hasta que asienta */
    function settle(){
      var el = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1))); if (!el) return;
      var n = 0, last = -1;
      (function step(){
        var y = Math.round(el.getBoundingClientRect().top);
        if (n++ > 12 || (y === last && Math.abs(y - (parseFloat(getComputedStyle(el).scrollMarginTop) || 0)) < 3)) return;
        last = y; el.scrollIntoView(); requestAnimationFrame(function(){ setTimeout(step, 60); });
      })();
    }
    window.addEventListener('hashchange', settle); setTimeout(settle, 0);
  }

  O.render = render; O.aurrerapena = aurrerapena; O.FIELDS = FIELDS;
})(typeof window !== 'undefined' ? window : globalThis);
