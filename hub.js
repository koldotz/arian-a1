/* ══════════════════════════════════════════════════════════════════════
   Liburuen koadernoa · HUB — perfil y guardado
   ----------------------------------------------------------------------
   Todo lo que se escribe se guarda al instante en el navegador
   (localStorage, un documento por unidad: «koadernoa:<unidad>»). Si hay
   banco de perfiles (config.js + cloud.js), el perfil con nombre y PIN lo
   lleva además a la nube y a los demás dispositivos; cloud.js se engancha
   a este HUB sin reescribirlo.
     HUB.save(id, clave, valor)            guarda un documento
     HUB.bind(id, clave, aplicar, obtener) registra quién lo pinta
     HUB.onChange(fn) · HUB.name() · HUB.open()
   La pantalla de perfil (#gate) y el botón (#who) están en cada página.
   ══════════════════════════════════════════════════════════════════════ */
window.HUB = (function(){
  var NAMEK = 'euskara-izena';
  var entries = {}, watchers = [], state = 'local', izena = '';

  function emit(){
    var chip = document.getElementById('who');
    if (chip){
      chip.setAttribute('data-state', state);
      chip.querySelector('.nm').textContent = izena || 'Sin perfil';
      chip.querySelector('.st').textContent = !izena ? 'Toca para crear tu perfil' : 'Solo en este navegador';
    }
    watchers.forEach(function(f){ try { f(state, izena); } catch(e){} });
  }

  function tKey(k){ return k + '__t'; }
  function readT(k){ try { return Number(localStorage.getItem(tKey(k))) || 0; } catch(e){ return 0; } }
  function writeLocal(k, val, t){
    try { localStorage.setItem(k, JSON.stringify(val)); localStorage.setItem(tKey(k), String(t)); } catch(e){}
  }

  /* ── perfil ── */
  function saveName(n){ izena = n; try { localStorage.setItem(NAMEK, n); } catch(e){} emit(); }
  function openGate(){
    var g = document.getElementById('gate'); if (!g) return;
    g.hidden = false;
    var i = document.getElementById('gateName'); i.value = izena || '';
    setTimeout(function(){ i.focus(); i.select(); }, 30);
  }
  function closeGate(){ var g = document.getElementById('gate'); if (g) g.hidden = true; }
  function wireGate(){
    var f = document.getElementById('gateForm');
    if (f) f.addEventListener('submit', function(ev){
      ev.preventDefault();
      var v = document.getElementById('gateName').value.trim();
      if (!v) return;
      saveName(v); closeGate();
    });
    var l = document.getElementById('gateLater');
    if (l) l.addEventListener('click', closeGate);
    document.addEventListener('keydown', function(ev){
      var g = document.getElementById('gate');
      if (ev.key === 'Escape' && g && !g.hidden) closeGate();
    });
    var chip = document.getElementById('who');
    if (chip) chip.addEventListener('click', openGate);
  }

  try { izena = localStorage.getItem(NAMEK) || ''; } catch(e){}

  var api = {
    save: function(id, lsKey, val){
      var t = Date.now();
      writeLocal(lsKey, val, t);
      var e = entries[id]; if (e) e.t = t;
    },
    bind: function(id, lsKey, apply, get){
      return (entries[id] = { id:id, lsKey:lsKey, apply:apply, get:get, t:readT(lsKey) });
    },
    onChange: function(fn){ watchers.push(fn); fn(state, izena); },
    name: function(){ return izena; },
    open: openGate
  };

  function start(){ wireGate(); emit(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  return api;
})();

/* PWA · service worker para uso sin conexión */
if ('serviceWorker' in navigator){ window.addEventListener('load', function(){ navigator.serviceWorker.register('sw.js').catch(function(){}); }); }
