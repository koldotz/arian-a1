/* ── Liburuen koadernoa · service worker ────────────────────────────────
   Cachea las páginas y los datos para que el cuaderno funcione sin conexión.
   Estrategia: stale-while-revalidate para el mismo origen; las fuentes y el
   banco de perfiles (Supabase) van siempre a la red.
   Lo de pribatua/ (tu libro y tus audios, solo en tu ordenador) no se cachea. */
var CACHE = 'koadernoa-v4';
var ASSETS = [
  'index.html', 'ikasgaiak.html', 'arian.html', 'bakarka.html', 'geruzak.html', 'glosarioa.html',
  'oinarria.css', 'hub.js', 'iturriak.js', 'orriak.js', 'egiaztatu.js', 'libreta.js',
  'datuak/ikasgaiak-a1.js', 'datuak/ikasgaiak-a1-erantzunak.js',
  'datuak/arian-a1.js', 'datuak/arian-a1-erantzunak.js', 'datuak/bakarka-1.js', 'datuak/bakarka-1-erantzunak.js',
  'kopiatu.js', 'glosarioa.js', 'geruzak-betaurrekoak.js',
  'cloud.js', 'config.js',
  'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return c.addAll(ASSETS.map(function(u){ return new Request(u, { cache: 'reload' }); }));
    }).then(function(){ return self.skipWaiting(); }).catch(function(){})
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(ks){
      return Promise.all(ks.map(function(k){ return k === CACHE ? null : caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET') return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;            // fuentes, Supabase… → red normal
  if (/\/pribatua\//.test(url.pathname) || /\/liburua\.js$/.test(url.pathname)) return;   // tu libro: nunca en caché

  e.respondWith(
    caches.match(req).then(function(cached){
      var net = fetch(req).then(function(res){
        if (res && res.ok && res.type === 'basic'){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
        }
        return res;
      }).catch(function(){
        return cached || (req.mode === 'navigate' ? caches.match('index.html') : undefined);
      });
      return cached || net;
    })
  );
});
