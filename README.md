# Liburuen koadernoa · Arian A1 eta Bakarka 1

Hojas de respuestas para trabajar dos libros de euskera de nivel A1 desde la pantalla, con corrección, y una guía de gramática. Web estática (HTML y JavaScript sin dependencias), publicada con GitHub Pages:

**https://koldotz.github.io/arian-a1/**

| Página | Qué es |
|---|---|
| `index.html` | Portada: los dos libros, con el progreso de cada unidad |
| `ikasgaiak.html` | *Ikasgaiak*: lecciones propias para trabajar **sin el libro** (lecciones 1 a 7) |
| `arian.html` | *Arian A1 · ikaslearen liburua* (Elkar): 12 unidades, 457 ejercicios, 109 con audio |
| `bakarka.html` | *Bakarka 1* (J.A. Letamendia, Elkar): lecciones 2 a 14, 144 ejercicios |
| `geruzak.html` | *Euskararen Geruzak*: la gramática del nivel en 20 bloques, con «gafas» de traducción y morfemas |
| `glosarioa.html` | Glosario de los términos gramaticales que usa la guía |

## Qué hay y qué no

**No está el texto de los libros.** De cada ejercicio la web lleva solo lo que hace falta para contestar: su número, su página, la pista de audio y las casillas (cuántas, de qué tipo y qué trae ya resuelto el libro). Los enunciados, los diálogos, las lecturas y la teoría se leen en el libro, que hay que tener delante.

Lo que sí es texto es propio y va marcado con **⚠ Claude**: la nota de cada apartado (qué se trabaja y en qué bloque de Geruzak se explica), la descripción de cada ejercicio, la guía Geruzak y el glosario. Conviene contrastarlo con los libros.

## Ikasgaiak · lecciones sin libro

Las hojas de respuestas no sirven sin el libro delante. *Ikasgaiak* es la parte que sí: cada apartado trae su texto, su vocabulario, su gramática y sus ejercicios, con corrección. Están hechas las lecciones 1 a 7 (157 ejercicios), que siguen las unidades 1 a 7 de *Arian A1*.

- **Del libro sale el temario, no el texto.** Los puntos que se trabajan, las formas gramaticales y las palabras son los de la unidad y las anteriores; cada apartado dice en qué páginas lo trata el libro. No se añade vocabulario ni gramática que esas unidades no tengan.
- **Las frases son nuevas.** Diálogos, textos, ejercicios y soluciones están escritos por Claude (⚠), con otros nombres y otras situaciones; no son los del libro ni una versión de ellos. Las traducciones y las explicaciones en castellano también son de Claude.
- **Cómo se comprueba.** En el ordenador donde está el libro, `node pribatua/tresnak/ikasgaiak-iturria.mjs` verifica las dos cosas contra cada unidad (con su transcripción personal o, donde no la hay, con la lista de palabras sueltas y las huellas de frases que saca `hitzak-atera.mjs` de las páginas; nada de eso está en este repositorio): que ninguna palabra en euskera de la lección queda fuera del vocabulario de su unidad y las anteriores, y que ninguna frase coincide con una del libro, tampoco cambiando los nombres. Las siete lecciones dan 0 y 0.
- **Lo que falta.** Las lecciones 8 a 12 (de cada unidad hay que sacar antes su lista de palabras), el audio (no hay) y que alguien que sepa euskera revise las frases.

## Corrección («Egiaztatu»)

- **Arian A1.** El libro en papel trae solucionario, pero no estaba disponible al preparar esto. Las soluciones las ha resuelto Claude **leyendo cada página**, y no están contrastadas con las del libro: si una no cuadra, manda el libro. De los 457 ejercicios, 311 tienen corrección; 75 no la tienen y dicen por qué (la respuesta solo está en el audio, es personal, se hace sobre el libro o la página falta en el escaneado); el resto son notas de repaso, autoevaluación o lectura.
- **Bakarka 1.** Se comprueba contra el solucionario del libro, sin reproducirlo: en los huecos va la palabra que falta; en las frases, solo una **huella** (un resumen numérico) que permite decir «coincide» o «no coincide». Si no coincide no se da por mala: puede haber otra respuesta válida, y la solución se mira en la página del libro que se indica.

Las respuestas abiertas nunca se marcan como error: si no coinciden con el modelo, se enseña el modelo para compararlo.

## Guardado y perfil

Lo que escribes se guarda al momento en el navegador (un documento por unidad). Con un perfil (nombre y PIN) se sincroniza entre dispositivos a través del mismo banco de perfiles de [Euskara Armairua](https://github.com/koldotz/euskara-armairua) (Supabase): `config.js` lleva solo la URL y la clave **pública**; nunca la clave secreta. La **libreta** (📓) reúne lo trabajado en un libro en un documento para guardar como PDF. Funciona sin conexión (service worker).

## Tu libro al lado (solo en tu ordenador)

Para no depender del papel, puedes enlazar tus propios PDF y audios:

```
node tools/liburua.mjs --arian <tu PDF de Arian A1> --arian-audio <carpeta de pistas> --bakarka <tu PDF de Bakarka 1> --idatzi
python3 -m http.server 8000          # y abre http://localhost:8000
```

Las rutas se recuerdan en `pribatua/bideak.json`; la siguiente vez basta con `node tools/liburua.mjs --idatzi`. El mapa de páginas (qué página del PDF es cada página impresa) está en la propia herramienta y vale para los escaneados con los que se prepararon las hojas.

Con la app abierta en local, la página de cada ejercicio (📖) abre tu PDF por ahí en un panel lateral, y la pista (▶) suena. En Bakarka hay además un botón a la página de las soluciones. `pribatua/` está en `.gitignore`: nada de eso se publica, y en la web publicada ni se pide.

## Estructura

```
oinarria.css                 estilos
hub.js · cloud.js · config.js   perfil, guardado y sincronización
orriak.js                    pinta las hojas y sus casillas (formato de datos en su cabecera)
egiaztatu.js                 corrección
libreta.js                   libreta en PDF
liburua.js                   visor de tu PDF (solo se carga en local)
datuak/ikasgaiak-a1.js       lecciones propias          datuak/ikasgaiak-a1-erantzunak.js  sus soluciones (⚠ Claude)
datuak/arian-a1.js           hojas de Arian A1          datuak/arian-a1-erantzunak.js    sus soluciones (⚠ Claude)
datuak/bakarka-1.js          hojas de Bakarka 1         datuak/bakarka-1-erantzunak.js   palabras y huellas
tools/liburua.mjs            enlaza tus PDF y audios en pribatua/
tools/bakarka-orriak.mjs     genera los dos ficheros de Bakarka 1
tests/                       pruebas
```

Las hojas de Bakarka 1 se **generan** (`node tools/bakarka-orriak.mjs --idatzi`) a partir de la estructura de una transcripción personal del libro que no está en este repositorio; al repositorio solo llega lo descrito arriba. Las claves de lo que escribes salen del `id` de la unidad, del número del ejercicio y del rótulo de la casilla: no se cambian.

## Pruebas

```
npm install          # una vez (PostgreSQL en memoria para emular el banco de perfiles)
npm test             # todas: datos + la web entera en Chrome sin ventana
npm run test:rapido  # solo las de datos
```

- `datos/orriak`: hojas bien formadas, **ningún rótulo es una frase** (no llevan el texto del libro), cada solución corresponde a una casilla, y de Bakarka solo van en claro palabras sueltas.
- `datos/ikasgaiak`: lecciones bien formadas, cada apartado con su referencia a las páginas del libro, ningún ejercicio con página ni pista, y cada solución en una casilla que existe.
- `datos/pribatua`: `pribatua/` y el visor no se publican; `config.js` lleva solo la clave pública.
- `datos/service-worker`: todo lo que cargan las páginas está en la caché sin conexión.
- `e2e/paginas`: las cinco páginas a 1280, 390 y 320 px, y los enlaces internos.
- `e2e/egiaztatu`: con las soluciones puestas en sus casillas, todos los ejercicios salen bien; lo mal contestado se señala; las frases de Bakarka coinciden con su huella (si la transcripción está en este ordenador).
- `e2e/orriak`: escribir, guardar, recargar, libreta, portada, perfil en dos dispositivos y el visor del libro.

## Derechos

*Arian A1* y *Bakarka 1* son obras de sus autores, publicadas por Elkar. Este proyecto no las reproduce ni las sustituye: hace falta tener el libro. Los títulos de unidad y de apartado se citan para localizar los ejercicios. El resto (código, notas, guía y soluciones de Arian A1) es de uso personal de estudio.
