/* ══════════════════════════════════════════════════════════════════════
   Liburuen koadernoa · Iturriak — de dónde sale cada cosa
   ----------------------------------------------------------------------
   Etiqueta de procedencia:
     ⚠ Claude        → preparado por Claude (notas, descripciones, soluciones
                        resueltas leyendo la página): contrástalo con el libro
     Arian A1 · …    → referencia a una página del libro
   ITURRIAK.badge(src, ref)  → HTML de la etiqueta (src: clave de SRC)
   ITURRIAK.label(src, ref)  → el mismo texto, sin HTML
   Los estilos se inyectan una sola vez; usan las variables de color de la
   página, así que respetan el modo claro y el oscuro.
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  if (window.ITURRIAK) return;

  var SRC = {
    claude:   { tag: '⚠ Claude', doc: false, full: 'Preparado por Claude: no sale del libro. Contrástalo con él.' },
    arian:    { tag: 'Arian A1', doc: true, full: 'Arian A1 · Euskara ikasteko metodoa · ikaslearen liburua · Elkar' },
    bakarka1: { tag: 'Bakarka 1', doc: true, full: 'Bakarka 1 · J.A. Letamendia · Elkar' }
  };

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  function label(src, ref){ var s = SRC[src] || SRC.claude; return s.tag + (ref ? ' · ' + ref : ''); }
  function badge(src, ref){
    var s = SRC[src] || SRC.claude;
    return '<span class="itb ' + (s.doc ? 'itb-doc' : 'itb-claude') + '" data-src="' + esc(src) + '" title="' + esc(s.full + (ref ? ' · ' + ref : '')) + '">' + esc(label(src, ref)) + '</span>';
  }
  function css(){
    if (document.getElementById('itb-css')) return;
    var st = document.createElement('style'); st.id = 'itb-css';
    st.textContent =
      '.itb{display:inline-flex;align-items:center;gap:3px;font-family:var(--f-mono,ui-monospace,Menlo,monospace);font-size:10px;font-weight:500;letter-spacing:.04em;line-height:1.5;' +
        'padding:0 6px;border-radius:3px;border:1px solid;white-space:nowrap;vertical-align:middle;text-transform:none;font-style:normal}' +
      '.itb-claude{color:var(--gold,#8A6A19);background:var(--gold-soft,#F0E6CC);border-color:var(--gold,#8A6A19)}' +
      '.itb-doc{color:var(--sea,#1F5E4C);background:var(--sea-soft,#DCE9E2);border-color:var(--sea,#1F5E4C)}';
    (document.head || document.documentElement).appendChild(st);
  }
  css();
  window.ITURRIAK = { SRC: SRC, badge: badge, label: label, css: css, esc: esc };
})();
