// Todas las páginas, en escritorio y en móvil: sin errores de JavaScript, sin
// recursos locales que falten, sin ids repetidos y sin desbordamiento
// horizontal (la página no debe moverse de lado en el móvil).
const PAGES = ['index.html', 'arian.html', 'bakarka.html', 'geruzak.html', 'glosarioa.html'];

export default async function(t){
  for (const [w, mobile] of [[1280, false], [390, true], [320, true]]) {
    for (const page of PAGES) {
      const p = await t.tab({ width: w, height: 800, mobile });
      await p.go(t.base + '/' + page + '?w=' + w, 1800);
      const where = w + 'px ' + page;
      const o = await p.ev(`document.documentElement.scrollWidth - document.documentElement.clientWidth`);
      t.ok(o <= 0, where + ': sin desbordamiento horizontal' + (o > 0 ? ' (sobran ' + o + ' px)' : ''));
      const dup = await p.ev(`(function(){ var s = {}, d = []; document.querySelectorAll('[id]').forEach(function(e){ if (s[e.id]) d.push(e.id); s[e.id] = 1; }); return d.join(','); })()`);
      t.ok(!dup, where + ': sin ids repetidos' + (dup ? ' (' + dup + ')' : ''));
      const bad = await p.ev(`JSON.stringify(performance.getEntriesByType('resource').filter(function(e){ return e.name.indexOf(location.origin) === 0 && e.responseStatus >= 400 && e.name.indexOf('/pribatua/') < 0 && !/\\/sw\\.js$/.test(e.name); }).map(function(e){ return e.name.replace(location.origin, ''); }))`);
      t.ok(bad === '[]', where + ': todos los recursos locales cargan' + (bad !== '[]' ? ' — ' + bad : ''));
      const errs = p.errs.filter(e => !/pribatua/.test(e));
      t.ok(!errs.length, where + ': sin errores de JavaScript' + (errs.length ? ' — ' + errs.slice(0, 2).join(' | ') : ''));
      await p.close();
    }
  }
  // enlaces internos: que el destino exista
  const p = await t.tab({ width: 1280, height: 900 });
  const seen = new Map();
  for (const page of PAGES) {
    await p.go(t.base + '/' + page, 1500);
    const found = JSON.parse(await p.ev(`JSON.stringify([].slice.call(document.querySelectorAll('a[href]')).map(function(a){ return a.href; }).filter(function(u){ return u.indexOf(location.origin) === 0; }))`));
    found.forEach(u => { const rel = u.slice(t.base.length + 1); if (!seen.has(rel)) seen.set(rel, page); });
  }
  const bad = [];
  let loaded = null;
  for (const [rel, from] of [...seen].sort((a, b) => a[0].localeCompare(b[0]))) {
    const [file, hash = ''] = rel.split('#');
    const f = (file || 'index.html').split('?')[0];
    if (!PAGES.includes(f)) { bad.push(rel + ' (desde ' + from + '): la página no existe'); continue; }
    if (!hash) continue;
    if (loaded !== f) { await p.go(t.base + '/' + f, 1500); loaded = f; }
    if (!(await p.ev(`!!document.getElementById(${JSON.stringify(decodeURIComponent(hash))})`))) bad.push(rel + ' (desde ' + from + '): el ancla no existe');
  }
  t.ok(seen.size > 100 && !bad.length, `los ${seen.size} enlaces internos llevan a algo que existe` + (bad.length ? ' — ' + bad.slice(0, 4).join(' | ') : ''));
  await p.close();
}
