/* ══════════════════════════════════════════════════════════════════════
   Liburuen koadernoa · «Ikasgaiak»: lecciones propias de nivel A1 — ⚠ Claude
   ----------------------------------------------------------------------
   Para trabajar SIN el libro. Cada lección sigue el temario de una unidad
   de «Arian A1» (cada apartado dice en qué páginas lo trata el libro), pero
   no lleva nada de su texto:
     · el temario, las formas gramaticales y las palabras son las de la unidad
       (no se añade vocabulario ni gramática que la unidad no tenga);
     · las frases, los diálogos, los textos y los ejercicios están escritos de
       nuevo, con otros nombres y otras situaciones. No se han redactado a
       partir de los del libro, ni cambiándoles palabras.
   Por eso este fichero se puede publicar. Todo va marcado ⚠ Claude: conviene
   contrastarlo con el libro, que es el que manda.
   Las soluciones van aparte, en ikasgaiak-a1-erantzunak.js.
   Formato: orriak.js (el de las hojas, más lo de las lecciones propias).
   Las claves de lo escrito salen de «id» de unidad + apartado + número +
   rótulo: en lo ya publicado no se cambian.
   hizk:'es' = los puntos de ese ejercicio («gal») están en castellano.
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  function L(a, b){
    var o = [], i;
    if (typeof a === 'number') for (i = a; i <= b; i++) o.push(String(i));
    else for (i = a.charCodeAt(0); i <= b.charCodeAt(0); i++) o.push(String.fromCharCode(i));
    return o;
  }
  var IZAN = ['naiz', 'zara', 'da', 'gara', 'zarete', 'dira'];
  var U = [];

  /* ── 1 · Kaixo! Nor zara? (mismo temario que Arian A1, unidad 1) ─────── */
  U.push({ id:'ika-01', n:1, eu:'Kaixo! Nor zara?',
    sarrera:'Saludar, presentarte, presentar a otros y dar tus datos. Sigue el temario de la unidad 1 de *Arian A1* (13–35. or.) y usa solo sus palabras y sus formas; las frases, los diálogos y los ejercicios están escritos de nuevo, no son los del libro. Todavía no tiene audio.',
    atalak:[

    { id:'At', k:'1', ref:['arian', '14–17'],
      lan:'**Agurrak eta aurkezpena.** Saludos, despedidas y respuestas de cortesía. Presentarse con *izan*: **ni … naiz**, **zu … zara**; para negar, **ez naiz**.',
      lot:[[9, 'IZAN'], [15, 'La negación y el partitivo']],
      ar:[
        { t:'hiz', iz:'Agurrak · saludos y cortesía', l:[
          ['kaixo', 'hola'], ['egun on', 'buenos días'], ['eguerdi on', 'buen mediodía'], ['arratsalde on', 'buenas tardes'], ['gabon', 'buenas noches'],
          ['agur', 'adiós'], ['gero arte', 'hasta luego'], ['bihar arte', 'hasta mañana'],
          ['zer moduz?', '¿qué tal?'], ['ondo · ongi', 'bien'], ['oso ondo', 'muy bien'],
          ['eskerrik asko · mila esker', 'muchas gracias'], ['ez horregatik', 'de nada'], ['barkatu', 'perdón'], ['mesedez', 'por favor'],
          ['aspaldiko!', '¡cuánto tiempo!'], ['baita zuri ere', 'igualmente'], ['ongi etorri', 'bienvenido, bienvenida'], ['zorionak', 'felicidades'],
          ['bai', 'sí'], ['ez', 'no'] ] },
        { t:'elk', iz:'Elkarrizketa · dos personas se conocen', l:[
          ['Garazi', 'Egun on! Ni Garazi naiz. Eta zu, nor zara?', '¡Buenos días! Yo soy Garazi. Y tú, ¿quién eres?'],
          ['Julen', 'Kaixo, Garazi. Ni Julen naiz.', 'Hola, Garazi. Yo soy Julen.'],
          ['Garazi', 'Zer moduz, Julen?', '¿Qué tal, Julen?'],
          ['Julen', 'Oso ondo. Eta zu?', 'Muy bien. ¿Y tú?'],
          ['Garazi', 'Ni ere ondo, eskerrik asko.', 'Yo también bien, muchas gracias.'] ] },
        { t:'elk', iz:'Elkarrizketa · una confusión', l:[
          ['Oihana', 'Barkatu, zu Uxue zara?', 'Perdona, ¿tú eres Uxue?'],
          ['Maddi', 'Ez, ni ez naiz Uxue. Ni Maddi naiz.', 'No, yo no soy Uxue. Yo soy Maddi.'],
          ['Oihana', 'A, barkatu! Eskerrik asko.', '¡Ah, perdona! Muchas gracias.'],
          ['Maddi', 'Ez horregatik. Agur!', 'De nada. ¡Adiós!'],
          ['Oihana', 'Agur, gero arte!', '¡Adiós, hasta luego!'] ] },
        { t:'gram', iz:'Izan · ser',
          p:['El verbo va al final: **Ni Garazi naiz** (yo Garazi soy).',
             'Para negar, **ez** va justo delante del verbo, y los dos se adelantan: **Ni ez naiz Uxue**.',
             'Quién se pregunta con **nor**, y el verbo va pegado detrás: **Nor zara zu?** o **Zu nor zara?**'],
          taula:{ cols:['', 'baiezkoa · afirmativa', 'ezezkoa · negativa'], rows:[['ni', 'naiz', 'ez naiz'], ['zu', 'zara', 'ez zara'], ['hura', 'da', 'ez da']] } },

        { n:'1', m:'auk', hizk:'es', zer:'Zer esan? · qué se dice en cada situación', en:'Elige la expresión que corresponde.',
          it:[['1', ['Egun on', 'Gabon', 'Gero arte']], ['2', ['Barkatu', 'Eskerrik asko', 'Ez horregatik']], ['3', ['Ez horregatik', 'Mesedez', 'Agur']],
              ['4', ['Aspaldiko!', 'Arratsalde on', 'Bihar arte']], ['5', ['Kaixo', 'Barkatu', 'Ondo']], ['6', ['Gabon', 'Aspaldiko!', 'Ez horregatik']],
              ['7', ['Arratsalde on', 'Egun on', 'Bihar arte']], ['8', ['Egun on', 'Kaixo', 'Gabon']], ['9', ['Zorionak', 'Barkatu', 'Agur']],
              ['10', ['Ongi etorri', 'Gero arte', 'Ez horregatik']]],
          gal:['Entras en la panadería a las nueve de la mañana.', 'Te dan el cambio y das las gracias.', 'Te dan las gracias. Contestas:',
               'Te vas, pero mañana vuelves.', 'Pisas a alguien sin querer.', 'Ves a una amiga a la que no veías desde hace meses.',
               'Son las cinco de la tarde y entras en una tienda.', 'Te vas a dormir.', 'Es el cumpleaños de un compañero.',
               'Llega una persona nueva al grupo y la recibes.'] },
        { n:'2', m:'tx', zer:'Osatu · completa con las palabras del recuadro', en:'Cada palabra se usa una vez.', it:L(1,6),
          kutxa:['naiz', 'zara', 'ez', 'nor', 'zu', 'ni'],
          gal:['— Kaixo! Ni Eneko ___.', '— Eta zu, ___ zara?', '— ___ Nahia naiz.', '— Zu Izaro ___?', '— Ez, ni ___ naiz Izaro.', '— Ni Miren naiz. Eta ___?'] },
        { n:'3', m:'tx', zer:'Ezezko esaldiak · pásalo a negativa', en:'Adib.: *Ni Peru naiz.* → *Ni ez naiz Peru.*', it:L(1,5),
          gal:['Ni Koldo naiz.', 'Zu Enara zara.', 'Hura Oier da.', 'Ni irakaslea naiz.', 'Zu ikaslea zara.'] },
        { n:'4', m:'tx', zer:'Esaldiak egin · ordena las palabras', it:L(1,6),
          gal:['naiz / Haizea / ni', 'zara / nor / zu', 'ez / Aimar / naiz / ni', 'moduz / zer', 'asko / eskerrik / ondo', 'arte / agur / bihar'] },
        { n:'5', m:'tx', luze:true, it:[''], zer:'Aurkezpena · preséntate', en:'Saluda, di quién eres y pregunta al otro quién es.' } ] },

    { id:'A', k:'2', ref:['arian', '18–23'],
      lan:'**Hau nor da?** Presentar a otros y decir a qué se dedican: **hau / hori / hura** y **hauek / horiek / haiek**, *ala* para preguntar entre dos opciones, y las profesiones con **-a / -ak**.',
      lot:[[4, 'Hau, hori, hura'], [3, 'El sintagma nominal'], [9, 'IZAN']],
      ar:[
        { t:'hiz', iz:'Lanbideak · profesiones', l:[
          ['irakaslea', 'profesor, profesora'], ['ikaslea', 'estudiante'], ['medikua', 'médico, médica'], ['erizaina', 'enfermero, enfermera'],
          ['sukaldaria', 'cocinero, cocinera'], ['zerbitzaria', 'camarero, camarera'], ['kazetaria', 'periodista'], ['idazkaria', 'secretario, secretaria'],
          ['abokatua', 'abogado, abogada'], ['iturgina', 'fontanero, fontanera'], ['mekanikaria', 'mecánico, mecánica'], ['lorezaina', 'jardinero, jardinera'],
          ['postaria', 'cartero, cartera'], ['udaltzaina', 'policía municipal'], ['suhiltzailea', 'bombero, bombera'], ['musikaria', 'músico, música'],
          ['argazkilaria', 'fotógrafo, fotógrafa'], ['ile-apaintzailea', 'peluquero, peluquera'] ] },
        { t:'hiz', iz:'Pertsonak · personas', l:[
          ['mutila', 'chico'], ['neska', 'chica'], ['gizona', 'hombre'], ['emakumea', 'mujer'], ['umea', 'niño, niña'],
          ['laguna', 'amigo, amiga'], ['lankidea', 'compañero de trabajo'], ['ikaskidea', 'compañero de clase'], ['senarra', 'marido'], ['emaztea', 'esposa'] ] },
        { t:'elk', iz:'Elkarrizketa · mirando una foto', l:[
          ['Hodei', 'Hau nor da?', '¿Quién es este?'],
          ['Nahia', 'Hau Peru da. Irakaslea da.', 'Este es Peru. Es profesor.'],
          ['Hodei', 'Eta horiek?', '¿Y esos?'],
          ['Nahia', 'Horiek Izaro eta Oier dira. Sukaldariak dira.', 'Esos son Izaro y Oier. Son cocineros.'],
          ['Hodei', 'Eta hura? Medikua ala erizaina da?', '¿Y aquella? ¿Es médica o enfermera?'],
          ['Nahia', 'Hura Enara da. Erizaina da.', 'Aquella es Enara. Es enfermera.'],
          ['Hodei', 'Eta zu? Zu ere erizaina zara?', '¿Y tú? ¿Tú también eres enfermera?'],
          ['Nahia', 'Ez, ni ez naiz erizaina. Ni kazetaria naiz.', 'No, yo no soy enfermera. Yo soy periodista.'] ] },
        { t:'gram', iz:'Erakusleak · hau, hori, hura',
          p:['El demostrativo depende de la distancia y de si es uno o son varios.'],
          taula:{ cols:['', 'cerca de mí', 'cerca de ti', 'lejos'], rows:[['uno', 'hau', 'hori', 'hura'], ['varios', 'hauek', 'horiek', 'haiek']] } },
        { t:'gram', iz:'Izan · todas las personas',
          p:['La profesión lleva artículo: **-a** si es uno y **-ak** si son varios: *irakaslea da*, *irakasleak dira*.',
             '**ala** pregunta entre dos opciones: *Medikua ala erizaina da?* Y **ere** es *también*: *Zu ere erizaina zara?*'],
          taula:{ cols:['', 'izan', '', 'izan'], rows:[['ni', 'naiz', 'gu', 'gara'], ['zu', 'zara', 'zuek', 'zarete'], ['hura', 'da', 'haiek', 'dira']] } },

        { n:'1', m:'tx', zer:'Osatu · la forma de *izan*', it:L(1,8), kutxa:IZAN,
          gal:['Ni sukaldaria ___.', 'Zu ikaslea ___.', 'Hau Aimar ___.', 'Gu irakasleak ___.', 'Zuek medikuak ___.', 'Horiek kazetariak ___.', 'Hura erizaina ___.', 'Uxue eta Koldo abokatuak ___.'] },
        { n:'2', m:'abc', zer:'Erakusleak · elige el demostrativo', it:L(1,6), op:['Hau', 'Hori', 'Hura', 'Hauek', 'Horiek', 'Haiek'],
          gal:['(aquí, a mi lado: una persona) ___ Maddi da.', '(ahí, a tu lado: una persona) ___ Julen da.', '(allí, lejos: una persona) ___ Oihana da.',
               '(aquí: dos personas) ___ Ekaitz eta Miren dira.', '(ahí: varias personas) ___ ikasleak dira.', '(allí, lejos: varias personas) ___ medikuak dira.'] },
        { n:'3', m:'auk', zer:'Aukeratu · *-a* ala *-ak*',
          it:[['1', ['irakaslea', 'irakasleak']], ['2', ['erizaina', 'erizainak']], ['3', ['ikaslea', 'ikasleak']], ['4', ['postaria', 'postariak']],
              ['5', ['sukaldaria', 'sukaldariak']], ['6', ['kazetaria', 'kazetariak']], ['7', ['iturgina', 'iturginak']], ['8', ['mekanikaria', 'mekanikariak']]],
          gal:['Garazi eta Eneko ___ dira.', 'Ni ___ naiz.', 'Zuek ___ zarete?', 'Hura ___ da.', 'Gu ___ gara.', 'Zu ___ zara.', 'Horiek ___ dira.', 'Hau ___ da.'] },
        { n:'4', m:'tx', zer:'Plurala · pásalo al plural', en:'Adib.: *Hau irakaslea da.* → *Hauek irakasleak dira.*', it:L(1,5),
          gal:['Hau ikaslea da.', 'Hori medikua da.', 'Hura zerbitzaria da.', 'Ni musikaria naiz.', 'Zu udaltzaina zara.'] },
        { n:'5', m:'tx', zer:'Irakurri eta erantzun · lee y contesta', it:L(1,4),
          tes:'Haizea erizaina da. Aimar eta Uxue sukaldariak dira. Koldo ez da postaria: lorezaina da.',
          gal:['Haizea medikua ala erizaina da?', 'Aimar eta Uxue zerbitzariak ala sukaldariak dira?', 'Koldo postaria da?', 'Nor da lorezaina?'] } ] },

    { id:'B', k:'3', ref:['arian', '24–28'],
      lan:'**Nongoa zara?** Decir quién es quién y de dónde es: nombre + demostrativo (**mutil hau**), la partícula **al** en las preguntas y **nongoa** (-koa, -goa).',
      lot:[[4, 'Hau, hori, hura'], [8, 'Los interrogativos'], [6, 'Los casos']],
      ar:[
        { t:'elk', iz:'Elkarrizketa · de dónde es cada uno', l:[
          ['Ekaitz', 'Kaixo! Zu Bilbokoa al zara?', '¡Hola! ¿Tú eres de Bilbao?'],
          ['Miren', 'Ez, ni ez naiz Bilbokoa. Donostiakoa naiz. Eta zu, nongoa zara?', 'No, yo no soy de Bilbao. Soy de Donostia. Y tú, ¿de dónde eres?'],
          ['Ekaitz', 'Ni Irungoa naiz. Eta neska hori? Hori ere Donostiakoa al da?', 'Yo soy de Irun. ¿Y esa chica? ¿Esa también es de Donostia?'],
          ['Miren', 'Ez, neska hori Andoaingoa da.', 'No, esa chica es de Andoain.'],
          ['Ekaitz', 'Eta mutil horiek, nongoak dira?', 'Y esos chicos, ¿de dónde son?'],
          ['Miren', 'Mutil horiek Baionakoak dira.', 'Esos chicos son de Baiona.'] ] },
        { t:'gram', iz:'Nongoa · de dónde',
          p:['Para decir de dónde es alguien se añade un sufijo al nombre del lugar. Si son varios, **-koak** o **-goak**: *Baionakoak dira*.',
             'El nombre que va delante de un demostrativo no lleva artículo: **mutil hau**, **gizon horiek** (y no *mutila hau*).',
             'La partícula **al**, delante del verbo, marca las preguntas de sí o no: *Bilbokoa al zara?*'],
          taula:{ cols:['El lugar acaba en…', 'Sufijo', 'Adibidea'],
            rows:[['vocal', '-koa', 'Bilbo → Bilbokoa'], ['n, l', '-goa', 'Irun → Irungoa · Usurbil → Usurbilgoa'], ['otra consonante', '-koa (o -ekoa)', 'Gasteiz → Gasteizkoa']] } },

        { n:'1', m:'tx', motz:true, zer:'Osatu · *-koa*, *-goa*, *-koak*, *-goak*', en:'Escribe solo el sufijo.', it:L(1,8),
          gal:['Hodei Bilbo___ da.', 'Ni Irun___ naiz.', 'Izaro Donostia___ da.', 'Peru Usurbil___ da.', 'Zu Gasteiz___ zara?', 'Oier eta Nahia Baiona___ dira.', 'Gu Andoain___ gara.', 'Zuek Hernani___ zarete?'] },
        { n:'2', m:'tx', zer:'Galdera egin · pregunta con *al*', en:'Adib.: *Zu ikaslea zara.* → *Zu ikaslea al zara?*', it:L(1,5),
          gal:['Zu Donostiakoa zara.', 'Hura Julen da.', 'Zuek Irungoak zarete.', 'Emakume hori medikua da.', 'Haiek ikasleak dira.'] },
        { n:'3', m:'tx', hizk:'es', zer:'Euskaraz · dilo en euskera', en:'El nombre va delante y sin artículo.', it:L(1,6),
          gal:['este chico → ___', 'esa chica → ___', 'aquel hombre → ___', 'estas mujeres → ___', 'esos niños → ___', 'aquellas chicas → ___'] },
        { n:'4', m:'bai', zer:'Irakurri · lee y di si es verdad (Bai) o no (Ez)', it:L(1,5),
          tes:'Kaixo! Ni Garazi naiz. Lasartekoa naiz, eta irakaslea naiz. Mutil hau Aimar da. Aimar ez da Lasartekoa: Irungoa da, eta sukaldaria da. Neska horiek Maddi eta Uxue dira. Baionakoak dira, eta ikasleak dira.',
          gal:['Garazi Lasartekoa da.', 'Aimar irakaslea da.', 'Aimar Irungoa da.', 'Maddi eta Uxue Donostiakoak dira.', 'Maddi eta Uxue ikasleak dira.'] },
        { n:'5', m:'tx', zer:'Erantzun · contesta sobre el texto del ejercicio anterior', it:L(1,5),
          gal:['Nongoa da Aimar?', 'Nongoak dira Maddi eta Uxue?', 'Nor da sukaldaria?', 'Garazi ikaslea al da?', 'Eta zu, nongoa zara?'] } ] },

    { id:'C', k:'4', ref:['arian', '29–33'],
      lan:'**Non bizi zara?** Dar y pedir datos personales: dónde vives (**non** → -n, -en; *bizi izan*), la dirección, el teléfono y los números del 0 al 10.',
      lot:[[6, 'Los casos'], [17, 'Números, hora y calendario'], [9, 'IZAN']],
      ar:[
        { t:'hiz', iz:'Zenbakiak · del 0 al 10', l:[
          ['zero', '0'], ['bat', '1'], ['bi', '2'], ['hiru', '3'], ['lau', '4'], ['bost', '5'], ['sei', '6'], ['zazpi', '7'], ['zortzi', '8'], ['bederatzi', '9'], ['hamar', '10'] ] },
        { t:'hiz', iz:'Datu pertsonalak · datos personales', l:[
          ['izena', 'nombre'], ['abizenak · deiturak', 'apellidos'], ['helbidea', 'dirección'], ['kalea', 'calle'], ['herria', 'pueblo'], ['hiria', 'ciudad'],
          ['telefono-zenbakia', 'número de teléfono'], ['posta-kodea', 'código postal'], ['lanbidea', 'profesión'], ['jaioterria', 'lugar de nacimiento'], ['bizilekua', 'lugar de residencia'] ] },
        { t:'elk', iz:'Elkarrizketa · pedir los datos', l:[
          ['Enara', 'Non bizi zara, Koldo?', '¿Dónde vives, Koldo?'],
          ['Koldo', 'Zarautzen bizi naiz. Eta zu?', 'Vivo en Zarautz. ¿Y tú?'],
          ['Enara', 'Ni Orion bizi naiz. Zein da zure helbidea?', 'Yo vivo en Orio. ¿Cuál es tu dirección?'],
          ['Koldo', 'Bizkaia kalea, zazpi.', 'Calle Bizkaia, siete.'],
          ['Enara', 'Eta zure telefono-zenbakia?', '¿Y tu número de teléfono?'],
          ['Koldo', 'Sei, bost, zero, hiru, bat, lau, zortzi, bi, bederatzi.', 'Seis, cinco, cero, tres, uno, cuatro, ocho, dos, nueve.'],
          ['Enara', 'Eskerrik asko!', '¡Muchas gracias!'] ] },
        { t:'gram', iz:'Non · dónde',
          p:['**bizi izan** (vivir) se conjuga con *izan*: **bizi naiz, bizi zara, bizi da, bizi gara, bizi zarete, bizi dira**.',
             'En negativa, *ez* y el verbo se adelantan y *bizi* queda al final: **Ez naiz Bilbon bizi**.'],
          taula:{ cols:['El lugar acaba en…', 'Sufijo', 'Adibidea'],
            rows:[['vocal', '-n', 'Orio → Orion · Baiona → Baionan'], ['consonante', '-en', 'Zarautz → Zarautzen · Usurbil → Usurbilen']] } },

        { n:'1', m:'tx', zer:'Zenbakiak · escribe el número con letras', it:['3', '7', '0', '9', '5', '10', '2', '8', '1', '4', '6'] },
        { n:'2', m:'tx', zer:'Telefono-zenbakiak · escribe el número con cifras', it:L(1,3),
          gal:['sei, lau, bost, bat, bi, hiru, zazpi, zortzi, bederatzi', 'bederatzi, lau, hiru, zero, zero, bat, sei, bi, bost', 'sei, zero, zortzi, lau, lau, bat, hiru, bederatzi, bi'] },
        { n:'3', m:'tx', motz:true, zer:'Osatu · *-n* ala *-en*', en:'Escribe solo el sufijo.', it:L(1,8),
          gal:['Miren Orio___ bizi da.', 'Ni Zarautz___ bizi naiz.', 'Ikasle horiek Baiona___ bizi dira.', 'Zu Gasteiz___ bizi zara?', 'Gu Usurbil___ bizi gara.', 'Peru Hendaia___ bizi da.', 'Zuek Oiartzun___ bizi zarete?', 'Haizea Durango___ bizi da.'] },
        { n:'4', m:'tx', zer:'Osatu · la forma de *izan* con *bizi*', it:L(1,6), kutxa:IZAN,
          gal:['Ni Gernikan bizi ___.', 'Zu non bizi ___?', 'Oihana eta Eneko Baionan bizi ___.', 'Gu ez ___ Donostian bizi.', 'Nahia Beasainen bizi ___.', 'Zuek Gasteizen bizi ___?'] },
        { n:'5', m:'tx', bat:true, zer:'Fitxa osatu · rellena la ficha con los datos del texto', it:['Izena', 'Abizena', 'Jaioterria', 'Bizilekua', 'Lanbidea', 'Helbidea', 'Telefonoa'],
          tes:'Kaixo! Ni Hodei Mendizabal naiz. Usurbilgoa naiz, baina Gasteizen bizi naiz. Erizaina naiz. Helbidea: Araba kalea, bost. Telefono-zenbakia: sei, hiru, zero, bi, lau, zortzi, bat, bat, bost.' } ] },

    { id:'E', k:'5', ref:['arian', '34'],
      lan:'**Erabili.** Práctica de toda la unidad: la pregunta que corresponde a cada respuesta, un repaso de elegir, tu ficha y tu presentación por escrito.',
      ar:[
        { n:'1', m:'tx', zer:'Galdera idatzi · escribe la pregunta de cada respuesta', it:L(1,6),
          gal:['— Ni Uxue naiz.', '— Ondo, eskerrik asko.', '— Hernanikoa naiz.', '— Orion bizi naiz.', '— Ez, ez naiz irakaslea. Ikaslea naiz.', '— Hura Ekaitz da.'] },
        { n:'2', m:'auk', zer:'Aukeratu · elige la opción correcta',
          it:[['1', ['Ez horregatik', 'Aspaldiko!', 'Gabon']], ['2', ['dira', 'gara', 'zarete']], ['3', ['hau', 'hauek', 'haiek']], ['4', ['da', 'zara', 'naiz']],
              ['5', ['-koa', '-goa', '-n']], ['6', ['zara', 'zarete', 'gara']], ['7', ['zazpi', 'sei', 'zortzi']], ['8', ['-n', '-en', '-koa']],
              ['9', ['al', 'ala', 'ere']], ['10', ['-a', '-ak', '-en']]],
          gal:['— Eskerrik asko. — ___', 'Gu ikasleak ___.', 'Mutil ___ Irungoa da.', 'Ni ez ___ medikua.', 'Enara Usurbil___ da.', 'Zuek non bizi ___?', '6 = ___',
               'Mutil horiek Gasteiz___ bizi dira.', 'Medikua ___ erizaina zara?', 'Horiek irakasle___ dira.'] },
        { n:'3', m:'tx', bat:true, zer:'Zure fitxa · rellena la ficha con tus datos', it:['Izena', 'Abizenak', 'Jaioterria', 'Bizilekua', 'Lanbidea', 'Telefonoa'] },
        { n:'4', m:'idaz', zer:'Idatzi · preséntate por escrito', en:'Saluda y di quién eres, de dónde eres, dónde vives y a qué te dedicas.' } ] },

    { id:'Bd', k:'6', ref:['arian', '35'],
      lan:'**Badakizu?** Autoevaluación de la unidad: siete puntos, cada uno con Bai o Ez. Lo que marques con Ez, repásalo en su apartado.',
      ar:[
        { n:'', m:'bai', hizk:'es', zer:'Badakizu? · ¿ya sabes…?', it:L(1,7),
          gal:['Saludar y despedirme según el momento del día.', 'Presentarme y preguntar a otro quién es.', 'Negar con *ez*.',
               'Presentar a otras personas y decir a qué se dedican.', 'Preguntar y decir de dónde es alguien.', 'Decir dónde vivo y preguntarlo.',
               'Los números del 0 al 10 y dar un teléfono.'] } ] }
  ] });

  /* ── 2 · Gure herrian (mismo temario que Arian A1, unidad 2) ─────────── */
  var EGON = ['nago', 'zaude', 'dago', 'gaude', 'zaudete', 'daude'];
  U.push({ id:'ika-02', n:2, eu:'Gure herrian',
    sarrera:'Los lugares de un pueblo o una ciudad: decir dónde está cada cosa, si hay o no hay, cómo es, qué hora es y qué tiempo hace. Sigue el temario de la unidad 2 de *Arian A1* (37–60. or.) y usa solo sus palabras y sus formas (y las de la unidad 1); las frases, los diálogos y los ejercicios están escritos de nuevo, no son los del libro. Todavía no tiene audio.',
    atalak:[

    { id:'At', k:'1', ref:['arian', '38–41'],
      lan:'**Herriko lekuak.** Los lugares de la ciudad y dónde está cada uno: **non** en nombres comunes (**-an / -ean**, en plural **-etan**) y el verbo *egon* (**nago, dago, gaude, daude**).',
      lot:[[6, 'Los casos'], [12, 'Verbos sintéticos']],
      ar:[
        { t:'hiz', iz:'Lekuak · lugares', l:[
          ['udaletxea', 'ayuntamiento'], ['eliza', 'iglesia'], ['plaza', 'plaza'], ['parkea', 'parque'], ['eskola', 'escuela'], ['liburutegia', 'biblioteca'],
          ['kiroldegia', 'polideportivo'], ['osasun-zentroa', 'centro de salud'], ['ospitalea', 'hospital'], ['botika', 'farmacia'], ['postetxea', 'correos'],
          ['banketxea', 'banco'], ['kutxazain automatikoa', 'cajero automático'], ['okindegia', 'panadería'], ['janari-denda', 'tienda de alimentación'],
          ['jantzi-denda', 'tienda de ropa'], ['liburu-denda', 'librería'], ['supermerkatua', 'supermercado'], ['merkatua', 'mercado'], ['taberna', 'bar'],
          ['kafetegia', 'cafetería'], ['jatetxea', 'restaurante'], ['zinema-aretoa', 'cine'], ['antzokia', 'teatro'], ['museoa', 'museo'], ['hotela', 'hotel'],
          ['autobus-geltokia', 'parada de autobús'], ['tren-geltokia', 'estación de tren'], ['gasolindegia', 'gasolinera'], ['aparkalekua', 'aparcamiento'],
          ['hondartza', 'playa'], ['portua', 'puerto'] ] },
        { t:'elk', iz:'Elkarrizketa · dónde está cada cosa', l:[
          ['Nahia', 'Barkatu, non dago liburutegia?', 'Perdona, ¿dónde está la biblioteca?'],
          ['Koldo', 'Liburutegia plazan dago.', 'La biblioteca está en la plaza.'],
          ['Nahia', 'Eta kiroldegia? Kiroldegia ere plazan dago?', '¿Y el polideportivo? ¿El polideportivo también está en la plaza?'],
          ['Koldo', 'Ez, kiroldegia ez dago plazan. Parkean dago.', 'No, el polideportivo no está en la plaza. Está en el parque.'],
          ['Nahia', 'Eskerrik asko. Eta zu, non zaude orain?', 'Muchas gracias. Y tú, ¿dónde estás ahora?'],
          ['Koldo', 'Ni kafetegian nago. Eta zuek?', 'Yo estoy en la cafetería. ¿Y vosotros?'],
          ['Nahia', 'Gu hondartzan gaude.', 'Nosotros estamos en la playa.'] ] },
        { t:'gram', iz:'Non · dónde, en nombres comunes',
          p:['Para decir dónde está algo o alguien se usa **egon**, no *izan*: **Non dago botika?** — **Plazan dago**.'],
          taula:{ cols:['La palabra acaba en…', 'Sufijo', 'Adibidea'],
            rows:[['vocal', '-an', 'parke → parkean · museo → museoan'], ['-a (no se repite)', '-n', 'plaza → plazan · taberna → tabernan'],
                  ['consonante', '-ean', 'hotel → hotelean · autobus → autobusean'], ['varios (plural)', '-etan', 'denda → dendetan · herri → herrietan']] } },
        { t:'gram', iz:'Egon · estar',
          taula:{ cols:['', 'egon', '', 'egon'], rows:[['ni', 'nago', 'gu', 'gaude'], ['zu', 'zaude', 'zuek', 'zaudete'], ['hura', 'dago', 'haiek', 'daude']] } },

        { n:'1', m:'tx', zer:'Osatu · la forma de *egon*', it:L(1,8), kutxa:EGON,
          gal:['Ni etxean ___.', 'Zu non ___?', 'Udaletxea plazan ___.', 'Gu hondartzan ___.', 'Zuek museoan ___?', 'Umeak parkean ___.', 'Julen eta Uxue ez ___ tabernan.', 'Botika ez ___ hemen.'] },
        { n:'2', m:'tx', zer:'Non? · pon cada palabra en *non*', en:'Adib.: *etxe* → *etxean*.', it:L(1,10),
          gal:['parke → ___', 'museo → ___', 'hotel → ___', 'plaza → ___', 'taberna → ___', 'autobus → ___', 'herri → ___', 'kale → ___', 'denda (varias) → ___', 'kafetegi (varias) → ___'] },
        { n:'3', m:'auk', zer:'Aukeratu · *izan* ala *egon*',
          it:[['1', ['da', 'dago']], ['2', ['da', 'dago']], ['3', ['gara', 'gaude']], ['4', ['gara', 'gaude']], ['5', ['zara', 'zaude']], ['6', ['zara', 'zaude']], ['7', ['dira', 'daude']], ['8', ['naiz', 'nago']]],
          gal:['Enara irakaslea ___.', 'Enara eskolan ___.', 'Gu ikasleak ___.', 'Gu liburutegian ___.', 'Zu non ___?', 'Zu nongoa ___?', 'Okindegia eta botika kalean ___.', 'Ni Aimar ___.'] },
        { n:'4', m:'tx', zer:'Irakurri eta erantzun · lee y contesta', it:L(1,5),
          tes:'Gure herrian plaza handi bat dago. Udaletxea eta eliza plazan daude. Liburutegia ez dago plazan: parkean dago. Hotela hondartzan dago, eta jatetxea portuan.',
          gal:['Non dago udaletxea?', 'Liburutegia plazan dago?', 'Non dago hotela?', 'Non daude udaletxea eta eliza?', 'Eta zu, non zaude orain?'] } ] },

    { id:'A', k:'2', ref:['arian', '42–47'],
      lan:'**Badago okindegirik?** Preguntar si hay algo y contestar: **badago …-(r)ik?**, **bai, badago / badaude**, **ez dago …-(r)ik**. Y *en este, en ese, en aquel*: **honetan, horretan, hartan**.',
      lot:[[15, 'La negación y el partitivo'], [4, 'Hau, hori, hura'], [12, 'Verbos sintéticos']],
      ar:[
        { t:'elk', iz:'Elkarrizketa · en un barrio nuevo', l:[
          ['Laia', 'Barkatu, badago okindegirik auzo honetan?', 'Perdona, ¿hay alguna panadería en este barrio?'],
          ['Jurgi', 'Bai, badago. Kale horretan dago.', 'Sí, hay. Está en esa calle.'],
          ['Laia', 'Eta botikarik?', '¿Y farmacia?'],
          ['Jurgi', 'Ez, auzo honetan ez dago botikarik. Baina plaza hartan badaude bi.', 'No, en este barrio no hay farmacia. Pero en aquella plaza hay dos.'],
          ['Laia', 'Eta kutxazain automatikorik badago?', '¿Y hay cajero automático?'],
          ['Jurgi', 'Bai, banketxean.', 'Sí, en el banco.'],
          ['Laia', 'Eskerrik asko!', '¡Muchas gracias!'] ] },
        { t:'gram', iz:'Badago …-rik? · ¿hay…?',
          p:['Para preguntar si hay algo, el nombre lleva **-(r)ik** y el verbo **ba-**: **Badago okindegirik?**',
             'Si hay: **Bai, badago** (uno) o **Bai, badaude** (varios). Si no hay: **Ez, ez dago okindegirik**.',
             '**-rik** tras vocal (*botikarik*) y **-ik** tras consonante (*hotelik*).'] },
        { t:'gram', iz:'Honetan, horretan, hartan',
          p:['El nombre va delante y sin sufijo: **kale honetan** (en esta calle), **herri horretan**, **auzo hartan**.'],
          taula:{ cols:['', 'hau', 'hori', 'hura'], rows:[['uno', 'honetan', 'horretan', 'hartan'], ['varios', 'hauetan', 'horietan', 'haietan']] } },

        { n:'1', m:'tx', motz:true, zer:'Osatu · *-rik* ala *-ik*', en:'Escribe solo el sufijo.', it:L(1,8),
          gal:['Badago taberna___?', 'Ez dago hotel___.', 'Badago parke___ hemen?', 'Ez dago tren-geltoki___.', 'Badago autobus___?', 'Ez dago hondartza___.', 'Badago ospitale___ herri honetan?', 'Ez dago aparkaleku___.'] },
        { n:'2', m:'tx', zer:'Ezezko esaldiak · pásalo a negativa', en:'Adib.: *Auzo honetan botika bat dago.* → *Auzo honetan ez dago botikarik.*', it:L(1,5),
          gal:['Herri honetan museo bat dago.', 'Kale horretan taberna bat dago.', 'Auzo hartan parke bat dago.', 'Hemen jatetxe bat dago.', 'Plaza honetan banketxe bat dago.'] },
        { n:'3', m:'abc', zer:'Erakusleak · elige el demostrativo', it:L(1,6), op:['honetan', 'horretan', 'hartan', 'hauetan', 'horietan', 'haietan'],
          gal:['(aquí: una) Kale ___ okindegi bat dago.', '(ahí: uno) Auzo ___ ez dago botikarik.', '(allí, lejos: uno) Herri ___ hondartza dago.',
               '(aquí: varias) Kale ___ denda asko daude.', '(ahí: varias) Plaza ___ ez dago zuhaitzik.', '(allí, lejos: varios) Herri ___ ez dago ospitalerik.'] },
        { n:'4', m:'tx', zer:'Irakurri eta erantzun · lee y contesta', it:L(1,5),
          tes:'Nire auzoan bi okindegi eta supermerkatu bat daude. Kafetegi asko daude, baina ez dago jatetxerik. Botika bat badago, eta osasun-zentroa ere bai. Zinema-aretorik ez dago.',
          gal:['Badago okindegirik?', 'Badago jatetxerik?', 'Badago botikarik?', 'Badago zinema-aretorik?', 'Eta zure auzoan, badago liburutegirik?'] } ] },

    { id:'B', k:'3', ref:['arian', '48–52'],
      lan:'**Aurrean, atzean, ondoan.** Situar algo o a alguien: las posposiciones de lugar (**aurrean, atzean, gainean, azpian, ondoan, artean…**), los adverbios **hemen / hor / han** y las indicaciones para llegar a un sitio.',
      lot:[[16, 'Adjetivos y posposiciones'], [4, 'Hau, hori, hura']],
      falta:'Las indicaciones (*segi aurrera, hartu eskuinera*) son imperativos, que todavía no están explicados en Geruzak.',
      ar:[
        { t:'hiz', iz:'Kokapena · dónde, respecto a otra cosa', l:[
          ['aurrean', 'delante'], ['atzean', 'detrás'], ['ondoan · aldamenean', 'al lado'], ['gainean', 'encima'], ['azpian', 'debajo'], ['artean', 'entre'],
          ['barruan', 'dentro'], ['kanpoan', 'fuera'], ['inguruan', 'alrededor'], ['erdian', 'en medio'], ['izkinan', 'en la esquina'],
          ['eskuinean', 'a la derecha'], ['ezkerrean', 'a la izquierda'], ['hurbil', 'cerca'], ['urruti', 'lejos'], ['hemen', 'aquí'], ['hor', 'ahí'], ['han', 'allí'] ] },
        { t:'hiz', iz:'Kalean · en la calle', l:[
          ['semaforoa', 'semáforo'], ['zebra-bidea', 'paso de cebra'], ['espaloia', 'acera'], ['biribilgunea', 'rotonda'], ['zubia', 'puente'], ['ibaia', 'río'],
          ['iturria', 'fuente'], ['eserlekua', 'banco para sentarse'], ['zakarrontzia', 'papelera'], ['zuhaitza', 'árbol'], ['erlojua', 'reloj'], ['errepidea', 'carretera'] ] },
        { t:'elk', iz:'Elkarrizketa · cómo se llega', l:[
          ['Unax', 'Barkatu, non dago postetxea?', 'Perdona, ¿dónde está correos?'],
          ['Aiora', 'Postetxea? Udaletxearen atzean dago.', '¿Correos? Está detrás del ayuntamiento.'],
          ['Unax', 'Urruti dago?', '¿Está lejos?'],
          ['Aiora', 'Ez, hurbil dago. Segi aurrera, eta bigarren kalean hartu eskuinera.', 'No, está cerca. Sigue adelante y en la segunda calle coge a la derecha.'],
          ['Unax', 'Eta gero?', '¿Y luego?'],
          ['Aiora', 'Gero, pasatu zubia. Postetxea hantxe dago, botikaren eta okindegiaren artean.', 'Luego, pasa el puente. Correos está allí mismo, entre la farmacia y la panadería.'],
          ['Unax', 'Eskerrik asko!', '¡Muchas gracias!'] ] },
        { t:'gram', iz:'Noren aurrean · delante de qué',
          p:['El lugar de referencia va delante y lleva **-aren**: **udaletxearen aurrean** (delante del ayuntamiento), **parkearen ondoan**. Si la palabra ya acaba en *-a*, queda **-ren**: *plazaren erdian*.',
             'Entre dos cosas: **botikaren eta okindegiaren artean**.',
             'Indicaciones: **segi aurrera** (sigue adelante), **segi zuzen** (sigue recto), **hartu eskuinera / ezkerrera** (coge a la derecha / a la izquierda), **pasatu zubia** (pasa el puente). Se ordenan con **lehenengo**, **gero** y **azkenik**.'] },

        { n:'1', m:'auk', zer:'Aukeratu · la posposición',
          it:[['1', ['aurrean', 'atzean', 'azpian']], ['2', ['gainean', 'ondoan', 'artean']], ['3', ['atzean', 'aurrean', 'barruan']], ['4', ['ondoan', 'artean', 'erdian']],
              ['5', ['kanpoan', 'barruan', 'gainean']], ['6', ['azpian', 'gainean', 'atzean']], ['7', ['azpian', 'gainean', 'aurrean']], ['8', ['erdian', 'artean', 'kanpoan']]],
          gal:['(delante) Autobus-geltokia eskolaren ___ dago.', '(al lado) Botika okindegiaren ___ dago.', '(detrás) Aparkalekua hotelaren ___ dago.',
               '(entre) Kafetegia banketxearen eta liburu-dendaren ___ dago.', '(dentro) Kutxazain automatikoa supermerkatuaren ___ dago.',
               '(encima) Erlojua udaletxearen ___ dago.', '(debajo) Ibaia zubiaren ___ dago.', '(en medio) Iturria plazaren ___ dago.'] },
        { n:'2', m:'tx', motz:true, zer:'Osatu · *-aren* ala *-ren*', en:'Escribe solo el sufijo.', it:L(1,8),
          gal:['udaletxe___ aurrean', 'plaza___ erdian', 'parke___ ondoan', 'eliza___ atzean', 'hotel___ aurrean', 'taberna___ ondoan', 'zubi___ azpian', 'museo___ atzean'] },
        { n:'3', m:'abc', zer:'Aukeratu · *hemen*, *hor* ala *han*', it:L(1,6), op:['hemen', 'hor', 'han'],
          gal:['(aquí, donde estoy yo) Okindegia ___ dago.', '(ahí, donde estás tú) Zure autoa ___ dago.', '(allí, lejos) Hondartza ___ dago.',
               '(aquí) Gu ___ gaude.', '(allí, lejos) Mendiak ___ daude.', '(ahí) Zu ___ zaude?'] },
        { n:'4', m:'tx', zer:'Osatu · unas indicaciones', en:'Cada palabra se usa una vez.', it:L(1,6),
          kutxa:['lehenengo', 'segi', 'hartu', 'pasatu', 'gero', 'azkenik'],
          gal:['— Barkatu, non dago museoa? — ___, segi aurrera kale honetan.', 'Biribilgunean, ___ zuzen.', 'Semaforoan, ___ ezkerrera.', '___ zubia.',
               '___, hartu eskuinera bigarren kalean.', '___, museoa hantxe dago, eskuinean.'] },
        { n:'5', m:'bai', zer:'Irakurri · lee y di si es verdad (Bai) o no (Ez)', it:L(1,5),
          tes:'Plazaren erdian iturri bat dago. Udaletxea plazan dago, elizaren aurrean. Liburutegia udaletxearen ondoan dago. Botika liburutegiaren eta kafetegiaren artean dago. Aparkalekua elizaren atzean dago.',
          gal:['Iturria plazaren erdian dago.', 'Udaletxea elizaren atzean dago.', 'Liburutegia udaletxearen ondoan dago.', 'Kafetegia udaletxearen eta liburutegiaren artean dago.', 'Aparkalekua elizaren atzean dago.'] } ] },

    { id:'C', k:'4', ref:['arian', '53–57'],
      lan:'**Nolakoa da?** Describir lugares: el adjetivo va detrás del nombre y es el que lleva el artículo (**etxe txikia, kale luzeak**). Además, los puntos cardinales, la hora y el tiempo que hace.',
      lot:[[3, 'El sintagma nominal'], [16, 'Adjetivos y posposiciones'], [17, 'Números, hora y calendario']],
      ar:[
        { t:'hiz', iz:'Adjektiboak · cómo es', l:[
          ['handia', 'grande'], ['txikia', 'pequeño'], ['luzea', 'largo'], ['motza', 'corto'], ['zabala', 'ancho'], ['estua', 'estrecho'], ['altua', 'alto'], ['baxua', 'bajo'],
          ['polita', 'bonito'], ['itsusia', 'feo'], ['ederra', 'hermoso'], ['zoragarria', 'maravilloso'], ['garbia', 'limpio'], ['zikina', 'sucio'],
          ['lasaia', 'tranquilo'], ['zaratatsua', 'ruidoso'], ['isila', 'silencioso'], ['jendetsua', 'con mucha gente'], ['modernoa', 'moderno'], ['famatua', 'famoso'],
          ['atsegina', 'agradable'], ['aldapatsua', 'en cuesta'], ['laua', 'llano'] ] },
        { t:'hiz', iz:'Eguraldia · el tiempo, y dónde', l:[
          ['eguzkitsu dago', 'hace sol'], ['hodeituta dago', 'está nublado'], ['lainotuta dago', 'hay niebla'], ['euria ari du', 'está lloviendo'], ['elurra ari du', 'está nevando'],
          ['haizea dabil', 'hace viento'], ['bero dago', 'hace calor'], ['hotz dago', 'hace frío'], ['eguraldi ona', 'buen tiempo'], ['eguraldi txarra', 'mal tiempo'],
          ['udan', 'en verano'], ['neguan', 'en invierno'],
          ['iparraldean', 'en el norte'], ['hegoaldean', 'en el sur'], ['ekialdean', 'en el este'], ['mendebaldean', 'en el oeste'], ['kostaldean', 'en la costa'], ['mendialdean', 'en la montaña'] ] },
        { t:'elk', iz:'Elkarrizketa · cómo es tu pueblo', l:[
          ['Maddi', 'Nolakoa da zure herria, Ekaitz?', '¿Cómo es tu pueblo, Ekaitz?'],
          ['Ekaitz', 'Txikia da, baina oso polita. Kale estuak eta plaza handi bat ditu.', 'Es pequeño, pero muy bonito. Tiene calles estrechas y una plaza grande.'],
          ['Maddi', 'Non dago? Kostaldean?', '¿Dónde está? ¿En la costa?'],
          ['Ekaitz', 'Ez, mendialdean dago, Gipuzkoaren hegoaldean.', 'No, está en la montaña, en el sur de Gipuzkoa.'],
          ['Maddi', 'Eta zer eguraldi dago han orain?', '¿Y qué tiempo hace allí ahora?'],
          ['Ekaitz', 'Neguan hotz dago, eta elurra ari du. Eta zure hirian?', 'En invierno hace frío, y está nevando. ¿Y en tu ciudad?'],
          ['Maddi', 'Hemen eguzkitsu dago. Zer ordu da?', 'Aquí hace sol. ¿Qué hora es?'],
          ['Ekaitz', 'Hamaikak eta laurden.', 'Las once y cuarto.'] ] },
        { t:'gram', iz:'Adjektiboa · el adjetivo',
          p:['El adjetivo va detrás del nombre, y el artículo lo lleva el adjetivo: **etxe txikia**, **kale luzeak** (y no *etxea txiki*).',
             '**Nolakoa da?** pregunta cómo es una cosa; **Nolakoak dira?**, cómo son varias. **oso** es *muy*: *oso handia*.'] },
        { t:'gram', iz:'Zer ordu da? · qué hora es',
          p:['La una va en singular (**ordu bata da**); las demás, en plural (**hirurak dira**).'],
          taula:{ cols:['', 'ordua', '', 'ordua'],
            rows:[['1:00', 'ordu bata', '2:00', 'ordu biak'], ['3:00', 'hirurak', '4:00', 'laurak'], ['5:00', 'bostak', '10:00', 'hamarrak'], ['11:00', 'hamaikak', '12:00', 'hamabiak'],
                  ['3:15', 'hirurak eta laurden', '3:30', 'hiru eta erdiak'], ['3:45', 'laurak laurden gutxi', '', '']] } },

        { n:'1', m:'tx', zer:'Adjektiboak · escribe el contrario', it:L(1,8),
          gal:['handia ↔ ___', 'luzea ↔ ___', 'zabala ↔ ___', 'altua ↔ ___', 'polita ↔ ___', 'garbia ↔ ___', 'zaratatsua ↔ ___', 'hurbil ↔ ___'] },
        { n:'2', m:'tx', zer:'Plurala · pásalo al plural', en:'Adib.: *Kale hau luzea da.* → *Kale hauek luzeak dira.*', it:L(1,5),
          gal:['Plaza hau handia da.', 'Parke hori polita da.', 'Zubi hura estua da.', 'Hondartza hau garbia da.', 'Taberna hori zaratatsua da.'] },
        { n:'3', m:'tx', hizk:'es', zer:'Euskaraz · dilo en euskera', en:'El adjetivo va detrás y lleva el artículo.', it:L(1,6),
          gal:['la casa pequeña → ___', 'las calles largas → ___', 'el puente estrecho → ___', 'las playas limpias → ___', 'la plaza grande → ___', 'los parques bonitos → ___'] },
        { n:'4', m:'tx', bat:true, zer:'Zer ordu da? · escribe la hora', it:['1:00', '4:00', '10:00', '12:00', '3:15', '6:30', '8:45'] },
        { n:'5', m:'auk', hizk:'es', zer:'Eguraldia · qué tiempo hace',
          it:[['1', ['Euria ari du', 'Eguzkitsu dago', 'Bero dago']], ['2', ['Elurra ari du', 'Bero dago', 'Haizea dabil']], ['3', ['Hotz dago', 'Bero dago', 'Lainotuta dago']],
              ['4', ['Eguzkitsu dago', 'Hodeituta dago', 'Bero dago']], ['5', ['Hotz dago', 'Eguzkitsu dago', 'Bero dago']], ['6', ['Haizea dabil', 'Elurra ari du', 'Hodeituta dago']]],
          gal:['Necesitas paraguas.', 'El monte está todo blanco y sigue cayendo.', 'Estás en la playa en agosto, a 35 grados.', 'No se ve el sol: el cielo está gris.',
               'Te pones abrigo, gorro y guantes.', 'Se te vuela el sombrero.'] } ] },

    { id:'E', k:'5', ref:['arian', '58–59'],
      lan:'**Erabili.** Práctica de toda la unidad: preguntas sobre un texto que describe un pueblo, un repaso de elegir, tu pueblo o tu barrio y su descripción por escrito.',
      ar:[
        { n:'1', m:'tx', zer:'Irakurri eta erantzun · lee y contesta', it:L(1,5),
          tes:'Gure herria kostaldean dago, Bizkaiaren iparraldean. Txikia eta lasaia da. Portu polit bat eta hondartza luze bat ditu. Plazaren erdian eliza dago, eta elizaren ondoan, udaletxea. Bi taberna eta jatetxe bat badaude, baina ez dago zinema-aretorik. Udan bero dago, eta jende asko dago hondartzan.',
          gal:['Non dago herria?', 'Nolakoa da herria?', 'Non dago eliza?', 'Badago zinema-aretorik?', 'Zer eguraldi dago udan?'] },
        { n:'2', m:'auk', zer:'Aukeratu · elige la opción correcta',
          it:[['1', ['naiz', 'nago', 'dago']], ['2', ['-rik', '-an', '-a']], ['3', ['hau', 'honetan', 'hauek']], ['4', ['-an', '-aren', '-rik']], ['5', ['-an', '-etan', '-aren']],
              ['6', ['txikia', 'txikiak', 'txiki']], ['7', ['laurak', 'lau', 'laurden']], ['8', ['zaude', 'zaudete', 'daude']], ['9', ['ez dago', 'badago', 'badaude']], ['10', ['bero', 'hotz', 'eguzkitsu']]],
          gal:['Ni etxean ___.', 'Badago botika___?', 'Kale ___ ez dago tabernarik.', 'Museoa udaletxe___ atzean dago.', 'Umeak parke___ daude.', 'Etxe ___ dira.', '4:00 = ___',
               'Zuek non ___?', '— Badago hotelik? — Ez, ___.', 'Elurra ari du: ___ dago.'] },
        { n:'3', m:'tx', bat:true, zer:'Zure herria · contesta sobre tu pueblo o tu ciudad', it:L(1,5),
          gal:['Non dago zure herria?', 'Nolakoa da?', 'Badago hondartzarik?', 'Badago liburutegirik? Non dago?', 'Zer eguraldi dago orain?'] },
        { n:'4', m:'idaz', zer:'Idatzi · describe tu pueblo o tu barrio', en:'Di dónde está, cómo es, qué hay y qué no hay, y dónde está alguna cosa.' } ] },

    { id:'Bd', k:'6', ref:['arian', '60'],
      lan:'**Badakizu?** Autoevaluación de la unidad: ocho puntos, cada uno con Bai o Ez. Lo que marques con Ez, repásalo en su apartado.',
      ar:[
        { n:'', m:'bai', hizk:'es', zer:'Badakizu? · ¿ya sabes…?', it:L(1,8),
          gal:['Nombrar los lugares de un pueblo o una ciudad.', 'Decir dónde está algo con *-an* y *egon*.', 'Preguntar si hay algo y contestar que sí o que no.',
               'Situar algo: delante, detrás, al lado, entre…', 'Dar y entender indicaciones sencillas para llegar a un sitio.', 'Describir un lugar con adjetivos.',
               'Preguntar y decir la hora.', 'Decir qué tiempo hace.'] } ] }
  ] });

  /* ── 3 · Nire familia (mismo temario que Arian A1, unidad 3) ─────────── */
  U.push({ id:'ika-03', n:3, eu:'Nire familia',
    sarrera:'La familia y los amigos: quién es quién, con quién vive, cómo es y cómo está, cuántos años tiene y sus datos personales. Sigue el temario de la unidad 3 de *Arian A1* (61–84. or.) y usa solo sus palabras y sus formas (y las de las unidades 1 y 2); las frases, los diálogos y los ejercicios están escritos de nuevo, no son los del libro. Todavía no tiene audio.',
    atalak:[

    { id:'At', k:'1', ref:['arian', '62–63'],
      lan:'**Familia.** Los nombres de parentesco y de quién es cada uno: **noren** con nombres propios (**-(r)en**).',
      lot:[[6, 'Los casos'], [7, 'Animados y nombres propios']],
      ar:[
        { t:'hiz', iz:'Ahaideak · la familia', l:[
          ['aita', 'padre'], ['ama', 'madre'], ['gurasoak', 'padres'], ['semea', 'hijo'], ['alaba', 'hija'], ['seme-alabak', 'hijos'],
          ['anaia', 'hermano (de un chico)'], ['neba', 'hermano (de una chica)'], ['arreba', 'hermana (de un chico)'], ['ahizpa', 'hermana (de una chica)'], ['anai-arrebak', 'hermanos'],
          ['aitona', 'abuelo'], ['amona', 'abuela'], ['aitona-amonak', 'abuelos'], ['biloba', 'nieto, nieta'], ['osaba', 'tío'], ['izeba', 'tía'], ['osaba-izebak', 'tíos'],
          ['iloba', 'sobrino, sobrina'], ['lehengusua', 'primo, prima'], ['senarra', 'marido'], ['emaztea', 'esposa'], ['senar-emazteak', 'marido y mujer'],
          ['aitaginarreba', 'suegro'], ['amaginarreba', 'suegra'], ['koinatua', 'cuñado'], ['koinata', 'cuñada'] ] },
        { t:'elk', iz:'Elkarrizketa · mirando una foto de familia', l:[
          ['Laia', 'Nor da gizon hau?', '¿Quién es este hombre?'],
          ['Eneko', 'Hau Koldo da, Uxueren aita.', 'Este es Koldo, el padre de Uxue.'],
          ['Laia', 'Eta emakume hau? Uxueren ama da?', '¿Y esta mujer? ¿Es la madre de Uxue?'],
          ['Eneko', 'Ez, hau ez da Uxueren ama. Izeba da: Koldoren arreba.', 'No, esta no es la madre de Uxue. Es su tía: la hermana de Koldo.'],
          ['Laia', 'Eta ume horiek?', '¿Y esos niños?'],
          ['Eneko', 'Horiek Julenen seme-alabak dira. Julen Uxueren neba da.', 'Esos son los hijos de Julen. Julen es el hermano de Uxue.'],
          ['Laia', 'A, Uxueren ilobak dira!', '¡Ah, son los sobrinos de Uxue!'],
          ['Eneko', 'Bai, horixe!', '¡Sí, eso es!'] ] },
        { t:'gram', iz:'Noren · de quién (nombres propios)',
          p:['Lo que se tiene va detrás: **Uxueren ama** (la madre de Uxue), **Julenen emaztea** (la mujer de Julen).',
             'Se pregunta con **noren**: *Noren arreba da?*'],
          taula:{ cols:['El nombre acaba en…', 'Sufijo', 'Adibidea'], rows:[['vocal', '-ren', 'Uxue → Uxueren · Koldo → Koldoren'], ['consonante', '-en', 'Julen → Julenen · Amets → Ametsen']] } },

        { n:'1', m:'auk', zer:'Irakurri eta aukeratu · quién es quién',
          tes:'Koldo eta Enara senar-emazteak dira. Bi seme-alaba dituzte: Uxue eta Julen. Julenen emaztea Nahia da. Julenek eta Nahiak bi ume dituzte: Hodei eta Izaro. Nora Koldoren arreba da.',
          it:[['1', ['emaztea', 'arreba', 'alaba']], ['2', ['ama', 'alaba', 'izeba']], ['3', ['neba', 'senarra', 'aita']], ['4', ['amona', 'izeba', 'ahizpa']],
              ['5', ['semea', 'biloba', 'iloba']], ['6', ['iloba', 'alaba', 'lehengusua']], ['7', ['aita', 'osaba', 'aitona']], ['8', ['izeba', 'ama', 'amona']]],
          gal:['Enara Koldoren ___ da.', 'Uxue Enararen ___ da.', 'Julen Uxueren ___ da.', 'Nora Uxueren ___ da.', 'Hodei Koldoren ___ da.', 'Izaro Uxueren ___ da.', 'Koldo Hodeiren ___ da.', 'Uxue Hodeiren ___ da.'] },
        { n:'2', m:'tx', motz:true, zer:'Osatu · *-ren* ala *-en*', en:'Escribe solo el sufijo.', it:L(1,8),
          gal:['Uxue___ ama', 'Julen___ emaztea', 'Koldo___ arreba', 'Ekaitz___ aita', 'Enara___ senarra', 'Amets___ izeba', 'Nahia___ seme-alabak', 'Unax___ lehengusua'] },
        { n:'3', m:'tx', zer:'Erantzun · contesta sobre el texto del ejercicio 1', it:L(1,5),
          gal:['Noren emaztea da Nahia?', 'Noren arreba da Nora?', 'Noren seme-alabak dira Hodei eta Izaro?', 'Nor da Uxueren aita?', 'Nor da Izaroren amona?'] },
        { n:'4', m:'tx', hizk:'es', zer:'Euskaraz · dilo en euskera', it:L(1,6),
          gal:['la madre de Uxue → ___', 'el marido de Enara → ___', 'los hijos de Julen → ___', 'la tía de Hodei → ___', 'los abuelos de Izaro → ___', 'el primo de Amets → ___'] } ] },

    { id:'A', k:'2', ref:['arian', '64–69'],
      lan:'**Norekin bizi zara?** Decir quién es quién, dónde vive y con quién: **noren** en nombres comunes (**-aren / -en**) y en los posesivos (*nire, zure, gure…*), **noren ondoan / atzean / artean**, *bizi izan* y **norekin** (**-arekin / -ekin**).',
      lot:[[6, 'Los casos'], [16, 'Adjetivos y posposiciones'], [9, 'IZAN']],
      ar:[
        { t:'elk', iz:'Elkarrizketa · con quién vives', l:[
          ['Aiora', 'Norekin bizi zara, Ugaitz?', '¿Con quién vives, Ugaitz?'],
          ['Ugaitz', 'Gurasoekin eta arrebarekin bizi naiz. Eta zu?', 'Vivo con mis padres y con mi hermana. ¿Y tú?'],
          ['Aiora', 'Ni bakarrik bizi naiz, baina nire ahizpa hurbil bizi da.', 'Yo vivo sola, pero mi hermana vive cerca.'],
          ['Ugaitz', 'Zure ahizpa ere bakarrik bizi da?', '¿Tu hermana también vive sola?'],
          ['Aiora', 'Ez, bere senarrarekin eta seme-alabekin bizi da.', 'No, vive con su marido y con sus hijos.'],
          ['Ugaitz', 'Eta zuen gurasoak, non bizi dira?', 'Y vuestros padres, ¿dónde viven?'],
          ['Aiora', 'Gure gurasoak Hernanin bizi dira, amonaren etxean.', 'Nuestros padres viven en Hernani, en casa de la abuela.'] ] },
        { t:'gram', iz:'Noren · de quién (posesivos y nombres comunes)',
          p:['En los nombres comunes, **-aren** si es uno y **-en** si son varios: *lagunaren etxea* (la casa del amigo), *lagunen etxea* (la casa de los amigos).',
             'Las posposiciones de lugar también piden *noren*: **amaren ondoan**, **aitaren atzean**, **gurasoen artean**.'],
          taula:{ cols:['', 'noren', 'adibidea'], rows:[['ni', 'nire', 'nire ama'], ['zu', 'zure', 'zure aita'], ['hura', 'bere', 'bere anaia'], ['gu', 'gure', 'gure etxea'], ['zuek', 'zuen', 'zuen amona'], ['haiek', 'haien', 'haien alaba']] } },
        { t:'gram', iz:'Norekin · con quién',
          p:['«Solo» es **bakarrik**: *Norekin bizi zara?* — *Bakarrik bizi naiz.* Y «contigo» es **zurekin**.'],
          taula:{ cols:['', 'Sufijo', 'Adibidea'], rows:[['uno', '-arekin', 'lagun → lagunarekin · ama → amarekin'], ['varios', '-ekin', 'lagun → lagunekin · guraso → gurasoekin'], ['nombres propios', '-(r)ekin', 'Uxue → Uxuerekin · Julen → Julenekin']] } },

        { n:'1', m:'abc', zer:'Aukeratu · el posesivo', it:L(1,6), op:['nire', 'zure', 'bere', 'gure', 'zuen', 'haien'],
          gal:['(ni) Hau ___ ama da.', '(zu) Non bizi da ___ aita?', '(gu) Hau ___ etxea da.', '(zuek) Nor da ___ irakaslea?', '(haiek) Hori ___ alaba da.', '(hura) Jurgi ___ arrebarekin bizi da.'] },
        { n:'2', m:'tx', zer:'Norekin? · pon cada palabra en *norekin*', en:'Adib.: *aita* → *aitarekin*.', it:L(1,10),
          gal:['ama → ___', 'lagun (uno) → ___', 'lagun (varios) → ___', 'guraso (varios) → ___', 'senar → ___', 'emazte → ___', 'Uxue → ___', 'Julen → ___', 'osaba-izeba (varios) → ___', 'zu → ___'] },
        { n:'3', m:'tx', zer:'Irakurri eta erantzun · lee y contesta', it:L(1,6),
          tes:'Hodei Donostian bizi da, bere andregaiarekin. Hodeiren gurasoak Tolosan bizi dira, aitonarekin. Hodeiren arreba, Izaro, bakarrik bizi da Bilbon. Izaroren etxea oso txikia da.',
          gal:['Norekin bizi da Hodei?', 'Non bizi dira Hodeiren gurasoak?', 'Norekin bizi dira Hodeiren gurasoak?', 'Norekin bizi da Izaro?', 'Nolakoa da Izaroren etxea?', 'Eta zu, norekin bizi zara?'] },
        { n:'4', m:'auk', zer:'Aukeratu · *noren* ala *norekin*',
          it:[['1', ['amaren', 'amarekin', 'ama']], ['2', ['aita', 'aitaren', 'aitarekin']], ['3', ['aitona-amonak', 'aitona-amonen', 'aitona-amonekin']],
              ['4', ['aitona-amonen', 'aitona-amonekin', 'aitona-amonak']], ['5', ['izebaren', 'izebarekin', 'izeba']], ['6', ['osabaren', 'osabarekin', 'osaba']]],
          gal:['(al lado de la madre) Uxue ___ ondoan dago.', '(detrás del padre) Julen ___ atzean dago.', '(entre los abuelos) Umea ___ artean dago.',
               '(con los abuelos) Umea ___ bizi da.', '(delante de la tía) Iloba ___ aurrean dago.', '(con el tío) Laia ___ dago.'] } ] },

    { id:'B', k:'3', ref:['arian', '70–77'],
      lan:'**Nolakoa da? Nola dago?** Describir a alguien: adjetivos de carácter y de aspecto, **nolakoa da?** (cómo es) frente a **nola dago?** (cómo está), los números del 10 al 100 y la edad con *ukan*: **nork** (**-k / -ek**) + **ditu**.',
      lot:[[10, 'UKAN'], [6, 'Los casos'], [17, 'Números, hora y calendario'], [16, 'Adjetivos y posposiciones']],
      ar:[
        { t:'hiz', iz:'Izaera · el carácter', l:[
          ['alaia', 'alegre'], ['serioa', 'serio'], ['langilea', 'trabajador'], ['alferra', 'vago'], ['ausarta', 'valiente'], ['beldurtia', 'miedoso'],
          ['berritsua', 'hablador'], ['isila', 'callado'], ['lotsatia', 'tímido'], ['lotsagabea', 'descarado'], ['zintzoa', 'formal, honrado'], ['bihurria', 'travieso'],
          ['gaiztoa', 'malo'], ['eskuzabala', 'generoso'], ['jatorra', 'majo'], ['urduria', 'nervioso'], ['lasaia', 'tranquilo'] ] },
        { t:'hiz', iz:'Itxura · el aspecto', l:[
          ['altua', 'alto'], ['baxua', 'bajo'], ['argala', 'delgado'], ['gizena · lodia', 'gordo'], ['gaztea', 'joven'], ['zaharra', 'viejo'], ['ederra', 'guapo'],
          ['ilehoria', 'rubio'], ['ilebeltza', 'de pelo negro'], ['ilegorria', 'pelirrojo'], ['ilezuria', 'de pelo blanco'], ['ilekizkurra', 'de pelo rizado'],
          ['ileluzea', 'de pelo largo'], ['ilemotza', 'de pelo corto'], ['burusoila', 'calvo'], ['bizarduna', 'con barba'], ['biboteduna', 'con bigote'] ] },
        { t:'hiz', iz:'Nola dago? · cómo está', l:[
          ['pozik', 'contento'], ['haserre', 'enfadado'], ['nekatuta', 'cansado'], ['aspertuta', 'aburrido'], ['gaixorik', 'enfermo'], ['urduri', 'nervioso'], ['lasai', 'tranquilo'],
          ['maiteminduta', 'enamorado'], ['eserita', 'sentado'], ['zutik', 'de pie'], ['lotan', 'dormido'], ['esna', 'despierto'] ] },
        { t:'hiz', iz:'Zenbakiak · del 10 al 100', l:[
          ['hamar', '10'], ['hamaika', '11'], ['hamabi', '12'], ['hamahiru', '13'], ['hamalau', '14'], ['hamabost', '15'], ['hamasei', '16'], ['hamazazpi', '17'], ['hamazortzi', '18'], ['hemeretzi', '19'],
          ['hogei', '20'], ['hogeita bat', '21'], ['hogeita hamar', '30'], ['berrogei', '40'], ['berrogeita hamar', '50'], ['hirurogei', '60'], ['hirurogeita hamar', '70'],
          ['laurogei', '80'], ['laurogeita hamar', '90'], ['ehun', '100'] ] },
        { t:'elk', iz:'Elkarrizketa · cómo es tu hermano', l:[
          ['Nora', 'Nolakoa da zure neba, Uxue?', '¿Cómo es tu hermano, Uxue?'],
          ['Uxue', 'Julen? Altua eta argala da, eta ilekizkurra. Oso jatorra da, baina oso berritsua.', '¿Julen? Es alto y delgado, y de pelo rizado. Es muy majo, pero muy hablador.'],
          ['Nora', 'Zenbat urte ditu?', '¿Cuántos años tiene?'],
          ['Uxue', 'Nire nebak hogeita hamazazpi urte ditu. Eta zuk, zenbat urte dituzu?', 'Mi hermano tiene treinta y siete años. Y tú, ¿cuántos años tienes?'],
          ['Nora', 'Nik berrogeita bi urte ditut.', 'Yo tengo cuarenta y dos años.'],
          ['Uxue', 'Eta nola zaude? Nekatuta?', '¿Y cómo estás? ¿Cansada?'],
          ['Nora', 'Ez, oso pozik nago!', '¡No, estoy muy contenta!'] ] },
        { t:'gram', iz:'Nolakoa da? · Nola dago?',
          p:['**Nolakoa da?** pregunta cómo es alguien (carácter, aspecto): va con *izan* y con artículo, **Alaia da**. **Nola dago?** pregunta cómo está ahora: va con *egon* y sin artículo, **Pozik dago**.'] },
        { t:'gram', iz:'Zenbat urte ditu? · la edad',
          p:['La edad se dice con *ukan* y **urte**: **Zenbat urte ditu?** — **Hogei urte ditu**.',
             'Quien tiene (los años, los hijos…) va en **nork**: **-k** tras vocal y **-ek** tras consonante: *Uxuek*, *Julenek*.',
             'Las formas de *gu* y *zuek* con varias cosas todavía no salen en esta unidad.'],
          taula:{ cols:['nork', 'una cosa', 'varias cosas'], rows:[['nik', 'dut', 'ditut'], ['zuk', 'duzu', 'dituzu'], ['hark', 'du', 'ditu'], ['guk', 'dugu', '—'], ['zuek', 'duzue', '—'], ['haiek', 'dute', 'dituzte']] } },

        { n:'1', m:'tx', zabal:true, zer:'Zenbakiak · escribe el número con letras', it:['11', '15', '19', '20', '23', '30', '40', '56', '70', '100'] },
        { n:'2', m:'auk', zer:'Aukeratu · *izan* ala *egon*',
          it:[['1', ['da', 'dago']], ['2', ['da', 'dago']], ['3', ['da', 'dago']], ['4', ['dira', 'daude']], ['5', ['da', 'dago']], ['6', ['dira', 'daude']], ['7', ['naiz', 'nago']], ['8', ['zara', 'zaude']]],
          gal:['Amets oso alaia ___.', 'Amets pozik ___.', 'Nire aitona burusoila ___.', 'Umeak lotan ___.', 'Gure izeba gaixorik ___.', 'Zure lehengusuak ilegorriak ___.', 'Ni nekatuta ___.', 'Zu oso jatorra ___.'] },
        { n:'3', m:'tx', zer:'Osatu · la edad', it:L(1,6), kutxa:['ditut', 'dituzu', 'ditu', 'dituzte'],
          gal:['Nik hogei urte ___.', 'Zuk zenbat urte ___?', 'Laiak hamazazpi urte ___.', 'Nire gurasoek hirurogei urte ___.', 'Ugaitzek berrogei urte ___.', 'Bikiek hamar urte ___.'] },
        { n:'4', m:'tx', motz:true, zer:'Osatu · *-k* ala *-ek*', en:'Escribe solo el sufijo.', it:L(1,6),
          gal:['Uxue___ bi neba ditu.', 'Julen___ hogei urte ditu.', 'Koldo___ hiru seme-alaba ditu.', 'Ekaitz___ bi arreba ditu.', 'Nahia___ hamabost urte ditu.', 'Amets___ lau lehengusu ditu.'] },
        { n:'5', m:'bai', zer:'Irakurri · lee y di si es verdad (Bai) o no (Ez)', it:L(1,6),
          tes:'Nire osaba Jurgik berrogeita zortzi urte ditu. Baxua eta gizena da, eta bizarduna. Oso alaia eta eskuzabala da, baina oso alferra. Orain gaixorik dago: etxean dago, aspertuta. Bere emaztea, Aiora, langilea eta serioa da. Altua da, eta ilehoria.',
          gal:['Jurgik berrogeita zortzi urte ditu.', 'Jurgi altua eta argala da.', 'Jurgi alferra da.', 'Jurgi pozik dago orain.', 'Aiora Jurgiren emaztea da.', 'Aiora ilebeltza da.'] },
        { n:'6', m:'tx', zer:'Adjektiboak · escribe el contrario', it:L(1,8),
          gal:['langilea ↔ ___', 'ausarta ↔ ___', 'berritsua ↔ ___', 'altua ↔ ___', 'argala ↔ ___', 'gaztea ↔ ___', 'lotsatia ↔ ___', 'zintzoa ↔ ___'] } ] },

    { id:'C', k:'4', ref:['arian', '78–82'],
      lan:'**Datu pertsonalak eta zaletasunak.** Dar y pedir datos personales: el estado civil (**ezkondua da** o **ezkonduta dago**), las aficiones y las preguntas con **zenbat, nongoa, non, norekin, nolakoa, zein**. Tener o no tener: **baduzu …-(r)ik?**, **ez dut …-(r)ik**.',
      lot:[[8, 'Los interrogativos'], [15, 'La negación y el partitivo'], [10, 'UKAN']],
      ar:[
        { t:'hiz', iz:'Egoera zibila · estado civil y pareja', l:[
          ['ezkongabea', 'soltero'], ['ezkondua', 'casado'], ['dibortziatua', 'divorciado'], ['banandua', 'separado'], ['alarguna', 'viudo'],
          ['senargaia', 'novio, prometido'], ['andregaia', 'novia, prometida'], ['mutil-laguna', 'novio'], ['neska-laguna', 'novia'], ['bikotekidea', 'pareja'] ] },
        { t:'hiz', iz:'Zaletasunak · aficiones', l:[
          ['futbola', 'fútbol'], ['musika', 'música'], ['zinema', 'cine'], ['surfa', 'surf'], ['eskia', 'esquí'], ['yoga', 'yoga'], ['pintura', 'pintura'],
          ['zeramika', 'cerámica'], ['atletismoa', 'atletismo'], ['piraguismoa', 'piragüismo'], ['ekitazioa', 'equitación'] ] },
        { t:'elk', iz:'Elkarrizketa · datos personales', l:[
          ['Amets', 'Ezkondua zara, Enara?', '¿Estás casada, Enara?'],
          ['Enara', 'Ez, ezkongabea naiz, baina mutil-laguna dut.', 'No, soy soltera, pero tengo novio.'],
          ['Amets', 'Baduzu seme-alabarik?', '¿Tienes hijos?'],
          ['Enara', 'Ez, ez dut seme-alabarik. Eta zuk?', 'No, no tengo hijos. ¿Y tú?'],
          ['Amets', 'Nik bai, baditut bi: seme bat eta alaba bat.', 'Yo sí, tengo dos: un hijo y una hija.'],
          ['Enara', 'Eta baduzu zaletasunik?', '¿Y tienes alguna afición?'],
          ['Amets', 'Bai, musika eta mendia. Eta zuk?', 'Sí, la música y el monte. ¿Y tú?'],
          ['Enara', 'Nik surfa eta zinema.', 'Yo, el surf y el cine.'] ] },
        { t:'gram', iz:'Baduzu …-rik? · ¿tienes…?',
          p:['El estado civil se dice de dos maneras: **ezkondua da** (con *izan*) o **ezkonduta dago** (con *egon*).',
             'Tener: **Baduzu seme-alabarik?** — **Bai, baditut bi** o **Ez, ez dut seme-alabarik**. En las preguntas y en las negaciones el nombre lleva **-(r)ik**.',
             'Las preguntas: **zenbat** (cuántos), **nongoa** (de dónde), **non** (dónde), **norekin** (con quién), **nolakoa** (cómo es) y **zein** (cuál).'] },

        { n:'1', m:'tx', zer:'Osatu · la palabra que pregunta', en:'Cada palabra se usa una vez.', it:L(1,6), kutxa:['zenbat', 'nongoa', 'non', 'norekin', 'nolakoa', 'zein'],
          gal:['— ___ urte dituzu? — Hogeita lau.', '— ___ zara? — Zarauzkoa naiz.', '— ___ bizi zara? — Donostian.', '— ___ bizi zara? — Nire bikotekidearekin.',
               '— ___ da zure ahizpa? — Altua eta ilegorria.', '— ___ da zure zaletasuna? — Futbola.'] },
        { n:'2', m:'tx', zer:'Ezezko esaldiak · pásalo a negativa', en:'Adib.: *Seme-alabak ditut.* → *Ez dut seme-alabarik.*', it:L(1,5),
          gal:['Anai-arrebak ditut.', 'Mutil-laguna dut.', 'Bilobak ditut.', 'Lehengusuak ditut.', 'Zaletasunak ditut.'] },
        { n:'3', m:'tx', bat:true, zer:'Fitxa osatu · rellena la ficha con los datos del texto',
          it:['Izena', 'Adina', 'Jaioterria', 'Bizilekua', 'Norekin', 'Egoera zibila', 'Lanbidea', 'Zaletasunak'],
          tes:'Kaixo! Unax naiz. Hogeita bederatzi urte ditut. Zarauzkoa naiz, baina Donostian bizi naiz, nire neska-lagunarekin. Ezkongabea naiz, eta ez dut seme-alabarik. Erizaina naiz. Nire zaletasunak surfa eta musika dira.' },
        { n:'4', m:'auk', zer:'Aukeratu · la respuesta que corresponde a cada pregunta',
          it:[['1', ['Hirurogei urte ditu', 'Tolosan bizi da', 'Alaia da']], ['2', ['Bai, baditut bi', 'Ez, ezkongabea naiz', 'Hamabost urte ditut']],
              ['3', ['Burusoila da', 'Gure izebarekin bizi da', 'Laurogei urte ditu']], ['4', ['Lotsatia eta isila da', 'Pozik dago', 'Bilbon bizi da']],
              ['5', ['Ilezuria da', 'Oso ondo dago', 'Alarguna da']], ['6', ['Ez, dibortziatua naiz', 'Ez, ez dut zaletasunik', 'Bai, baditut bi']]],
          gal:['Zenbat urte ditu zure amak?', 'Baduzu anai-arrebarik?', 'Norekin bizi da zure aitona?', 'Nolakoa da zure lehengusua?', 'Nola dago zure amona?', 'Ezkonduta zaude?'] } ] },

    { id:'E', k:'5', ref:['arian', '83'],
      lan:'**Erabili.** Práctica de toda la unidad: preguntas sobre una presentación, un repaso de elegir, tus datos y la presentación de tu familia por escrito.',
      ar:[
        { n:'1', m:'tx', zer:'Irakurri eta erantzun · lee y contesta', it:L(1,7),
          tes:'Kaixo, Maddi naiz. Hogeita sei urte ditut. Nire gurasoak Ekaitz eta Laia dira. Aitak hirurogei urte ditu, eta amak berrogeita hamazortzi. Ahizpa bat dut, Nora. Nora ezkonduta dago, eta bi seme ditu. Nire ilobak oso bihurriak dira! Ni nire mutil-lagunarekin bizi naiz, Gasteizen. Ez dugu seme-alabarik.',
          gal:['Zenbat urte ditu Maddik?', 'Nor da Laia?', 'Zenbat urte ditu Maddiren aitak?', 'Noren ahizpa da Nora?', 'Nolakoak dira Maddiren ilobak?', 'Norekin bizi da Maddi?', 'Ezkonduta dago Nora?'] },
        { n:'2', m:'auk', zer:'Aukeratu · elige la opción correcta',
          it:[['1', ['-ren', '-en', '-rekin']], ['2', ['naiz', 'nago', 'dut']], ['3', ['ditu', 'dituzu', 'zara']], ['4', ['da', 'dago', 'ditu']], ['5', ['da', 'dago', 'ditu']],
              ['6', ['-k', '-ek', '-en']], ['7', ['hogei', 'berrogei', 'laurogei']], ['8', ['-rik', '-rekin', '-ren']], ['9', ['amona', 'izeba', 'iloba']], ['10', ['Non', 'Norekin', 'Noren']]],
          gal:['Hau Uxue___ ama da.', 'Ni gurasoekin bizi ___.', 'Zenbat urte ___ zuk?', 'Nire aitona oso alaia ___.', 'Nire amona gaixorik ___.', 'Julen___ hogei urte ditu.', '40 = ___',
               'Ez dut seme-alaba___.', 'Nire amaren ahizpa nire ___ da.', '— ___ bizi zara? — Bakarrik.'] },
        { n:'3', m:'tx', bat:true, zer:'Zure datuak · contesta sobre ti', it:L(1,5),
          gal:['Zenbat urte dituzu?', 'Norekin bizi zara?', 'Baduzu anai-arrebarik? Zenbat?', 'Nolakoa zara?', 'Zein dira zure zaletasunak?'] },
        { n:'4', m:'idaz', zer:'Idatzi · presenta a tu familia', en:'Di quiénes son, cuántos años tienen, cómo son y con quién vives.' } ] },

    { id:'Bd', k:'6', ref:['arian', '84'],
      lan:'**Badakizu?** Autoevaluación de la unidad: seis puntos, cada uno con Bai o Ez. Lo que marques con Ez, repásalo en su apartado.',
      ar:[
        { n:'', m:'bai', hizk:'es', zer:'Badakizu? · ¿ya sabes…?', it:L(1,6),
          gal:['Nombrar a los miembros de la familia.', 'Decir de quién es cada uno (*noren*).', 'Decir con quién vivo (*norekin*).', 'Describir a alguien: cómo es y cómo está.',
               'Contar hasta 100 y decir la edad.', 'Dar y pedir datos personales: estado civil, hijos y aficiones.'] } ] }
  ] });

  /* ── 4 · Etxe berria (mismo temario que Arian A1, unidad 4) ──────────── */
  var EDUKI = ['daukat', 'daukazu', 'dauka', 'daukagu', 'dauzkat', 'dauzka', 'dauzkagu', 'dauzkate'];
  U.push({ id:'ika-04', n:4, eu:'Etxe berria',
    sarrera:'La casa: sus partes, lo que tiene, lo que cuesta, cómo es comparada con otra y qué muebles hay en cada habitación. Sigue el temario de la unidad 4 de *Arian A1* (85–102. or.) y usa solo sus palabras y sus formas (y las de las unidades anteriores); las frases, los diálogos y los ejercicios están escritos de nuevo, no son los del libro. Todavía no tiene audio.',
    atalak:[

    { id:'At', k:'1', ref:['arian', '86–87'],
      lan:'**Etxeko gelak.** Las partes de la casa y el verbo *eduki*: **daukat** con una cosa, **dauzkat** con varias. En preguntas y negaciones el nombre lleva **-(r)ik**.',
      lot:[[12, 'Verbos sintéticos'], [15, 'La negación y el partitivo']],
      ar:[
        { t:'hiz', iz:'Etxea · la casa por partes', l:[
          ['sukaldea', 'cocina'], ['egongela', 'sala de estar'], ['jangela', 'comedor'], ['logela', 'dormitorio'], ['bainugela', 'cuarto de baño'], ['komuna', 'váter, aseo'],
          ['langela', 'despacho'], ['sarrera', 'entrada'], ['balkoia', 'balcón'], ['terraza', 'terraza'], ['garajea', 'garaje'], ['trastelekua', 'trastero'], ['ganbara', 'desván'],
          ['despentsa', 'despensa'], ['lorategia', 'jardín'], ['patioa', 'patio'], ['igogailua', 'ascensor'], ['solairua', 'piso, planta'], ['atea', 'puerta'], ['leihoa', 'ventana'],
          ['berogailua', 'calefacción, radiador'], ['tximinia', 'chimenea'] ] },
        { t:'elk', iz:'Elkarrizketa · la casa nueva', l:[
          ['Izaro', 'Nolakoa da zure etxe berria, Hodei?', '¿Cómo es tu casa nueva, Hodei?'],
          ['Hodei', 'Txikia da, baina oso argitsua. Hiru logela dauzka, eta bainugela bat.', 'Es pequeña, pero muy luminosa. Tiene tres dormitorios y un baño.'],
          ['Izaro', 'Eta sukaldea? Handia da?', '¿Y la cocina? ¿Es grande?'],
          ['Hodei', 'Ez, sukalde txikia dauka, baina egongela handia da.', 'No, tiene una cocina pequeña, pero la sala es grande.'],
          ['Izaro', 'Badauka balkoirik?', '¿Tiene balcón?'],
          ['Hodei', 'Bai, balkoi bat badauka. Baina ez dauka garajerik.', 'Sí, tiene un balcón. Pero no tiene garaje.'],
          ['Izaro', 'Eta igogailurik?', '¿Y ascensor?'],
          ['Hodei', 'Ez, eta bosgarren solairuan bizi naiz!', '¡No, y vivo en el quinto piso!'] ] },
        { t:'gram', iz:'Eduki · tener',
          p:['**eduki** es *tener*, y cambia según se tenga una cosa o varias: **Etxe bat daukat** · **Bi logela dauzkat**.',
             'En las preguntas y en las negaciones el nombre lleva **-(r)ik** y el verbo va en singular: **Badauka trastelekurik?** — **Ez, ez dauka trastelekurik**.'],
          taula:{ cols:['nork', 'una cosa', 'varias cosas'], rows:[['nik', 'daukat', 'dauzkat'], ['zuk', 'daukazu', 'dauzkazu'], ['hark', 'dauka', 'dauzka'], ['guk', 'daukagu', 'dauzkagu'], ['zuek', 'daukazue', 'dauzkazue'], ['haiek', 'daukate', 'dauzkate']] } },

        { n:'1', m:'tx', zer:'Osatu · la forma de *eduki*', en:'Fíjate en si se tiene una cosa o varias. Cada forma se usa una vez.', it:L(1,8), kutxa:EDUKI,
          gal:['Nik etxe txiki bat ___.', 'Nik bi logela ___.', 'Gure etxeak terraza handi bat ___.', 'Etxe horrek lau leiho ___.', 'Guk garaje bat ___.', 'Guk hiru bainugela ___.', 'Zuk balkoi bat ___?', 'Uxuek eta Julenek bi komun ___.'] },
        { n:'2', m:'auk', zer:'Aukeratu · una cosa o varias',
          it:[['1', ['dauka', 'dauzka']], ['2', ['dauka', 'dauzka']], ['3', ['daukat', 'dauzkat']], ['4', ['daukazue', 'dauzkazue']], ['5', ['daukate', 'dauzkate']], ['6', ['daukagu', 'dauzkagu']]],
          gal:['Etxeak sukalde bat ___.', 'Etxeak hiru logela ___.', 'Nik ordenagailu bat ___.', 'Zuek bi auto ___?', 'Haiek lorategi handi bat ___.', 'Guk lau aulki ___.'] },
        { n:'3', m:'tx', zer:'Ezezko esaldiak · pásalo a negativa', en:'Adib.: *Etxeak garajea dauka.* → *Etxeak ez dauka garajerik.*', it:L(1,5),
          gal:['Etxeak balkoia dauka.', 'Etxeak igogailua dauka.', 'Nik telebista daukat.', 'Guk terraza daukagu.', 'Etxeak berogailua dauka.'] },
        { n:'4', m:'bai', zer:'Irakurri · lee y di si es verdad (Bai) o no (Ez)', it:L(1,6),
          tes:'Laiaren etxea hirugarren solairuan dago. Bi logela, egongela bat, sukaldea eta bainugela dauzka. Egongelak balkoi txiki bat dauka. Etxeak ez dauka terrazarik, baina trasteleku bat badauka. Eraikinak igogailua dauka.',
          gal:['Laiaren etxea bigarren solairuan dago.', 'Etxeak bi logela dauzka.', 'Balkoia sukaldean dago.', 'Etxeak terraza dauka.', 'Etxeak trastelekua dauka.', 'Eraikinak ez dauka igogailurik.'] } ] },

    { id:'A', k:'2', ref:['arian', '88–92'],
      lan:'**Pisu bila.** Pedir los datos de un piso: *behar* y *nahi* con una cosa o con varias (**dut / ditut**), el precio con *balio izan* y los números a partir de 100.',
      lot:[[14, 'Nahi, behar, ahal y ari izan'], [10, 'UKAN'], [17, 'Números, hora y calendario']],
      ar:[
        { t:'hiz', iz:'Zenbakiak · a partir de 100', l:[
          ['ehun', '100'], ['berrehun', '200'], ['hirurehun', '300'], ['laurehun', '400'], ['bostehun', '500'], ['seiehun', '600'], ['zazpiehun', '700'], ['zortziehun', '800'],
          ['bederatziehun', '900'], ['mila', '1.000'], ['ehun eta hogei', '120'], ['mila eta berrehun', '1.200'], ['bi mila', '2.000'], ['milioi bat', '1.000.000'] ] },
        { t:'hiz', iz:'Iragarkiak · en los anuncios', l:[
          ['iragarkia', 'anuncio'], ['alokairua', 'alquiler'], ['alokatzeko', 'para alquilar'], ['saltzeko · salgai', 'en venta'], ['jabea', 'propietario'], ['agentzia', 'agencia'],
          ['hilean', 'al mes'], ['gastuak', 'gastos'], ['erdigunean', 'en el centro'], ['berrituta', 'reformado'], ['estreinatzeko', 'a estrenar'], ['altzariz jantzita', 'amueblado'],
          ['merkea', 'barato'], ['garestia', 'caro'], ['argitsua', 'luminoso'] ] },
        { t:'elk', iz:'Elkarrizketa · en la agencia', l:[
          ['Aimar', 'Egun on. Pisu bat behar dut, alokatzeko.', 'Buenos días. Necesito un piso, para alquilar.'],
          ['Agentzia', 'Zenbat logela nahi dituzu?', '¿Cuántos dormitorios quiere?'],
          ['Aimar', 'Bi logela nahi ditut, eta balkoi bat.', 'Quiero dos dormitorios y un balcón.'],
          ['Agentzia', 'Pisu bat daukagu erdigunean. Bi logela dauzka, eta altzariz jantzita dago.', 'Tenemos un piso en el centro. Tiene dos dormitorios y está amueblado.'],
          ['Aimar', 'Zenbat balio du?', '¿Cuánto cuesta?'],
          ['Agentzia', 'Hilean zortziehun eta berrogeita hamar balio du.', 'Cuesta ochocientos cincuenta al mes.'],
          ['Aimar', 'Garestia da. Merkeagoa nahi dut.', 'Es caro. Quiero uno más barato.'],
          ['Agentzia', 'Beste bat daukagu, baina urrunago dago, eta ez dauka igogailurik.', 'Tenemos otro, pero está más lejos y no tiene ascensor.'] ] },
        { t:'gram', iz:'Behar, nahi eta balio',
          p:['**behar** (necesitar) y **nahi** (querer) van con *ukan*: **dut** si es una cosa y **ditut** si son varias: *Pisu bat behar dut* · *Bi logela nahi ditut*.',
             'En negativa el auxiliar se adelanta y el nombre lleva **-(r)ik**: **Ez dut garajerik behar**.',
             'El precio: **Zenbat balio du?** — **Zazpiehun balio du**. Si son varias cosas, **Zenbat balio dute?**'],
          taula:{ cols:['nork', 'una cosa', 'varias cosas'], rows:[['nik', 'dut', 'ditut'], ['zuk', 'duzu', 'dituzu'], ['hark', 'du', 'ditu'], ['guk', 'dugu', 'ditugu'], ['zuek', 'duzue', 'dituzue'], ['haiek', 'dute', 'dituzte']] } },

        { n:'1', m:'tx', zabal:true, zer:'Zenbakiak · escribe el número con letras', it:['100', '200', '300', '500', '700', '900', '1.000', '150', '420', '1.200'] },
        { n:'2', m:'auk', zer:'Aukeratu · una cosa o varias',
          it:[['1', ['dut', 'ditut']], ['2', ['dut', 'ditut']], ['3', ['duzu', 'dituzu']], ['4', ['dugu', 'ditugu']], ['5', ['du', 'ditu']], ['6', ['duzue', 'dituzue']], ['7', ['dute', 'dituzte']], ['8', ['dute', 'dituzte']]],
          gal:['Pisu bat behar ___.', 'Hiru logela behar ___.', 'Zuk garaje bat nahi ___?', 'Guk bi bainugela nahi ___.', 'Enarak terraza bat nahi ___.', 'Zuek zenbat logela behar ___?',
               'Nire gurasoek etxe handi bat behar ___.', 'Haiek lau aulki nahi ___.'] },
        { n:'3', m:'tx', zer:'Irakurri eta erantzun · lee los dos anuncios y contesta', it:L(1,5),
          tes:['Pisua alokatzeko, erdigunean. Hiru logela, egongela handia eta bi bainugela. Altzariz jantzita. Igogailua dauka. 950 € hilean.',
               'Apartamentua alokatzeko, hondartzatik hurbil. Logela bat eta sukalde-egongela. Terraza txikia. Ez dauka igogailurik. 600 € hilean.'],
          gal:['Zenbat logela dauzka pisuak?', 'Zenbat balio du pisuak hilean?', 'Non dago apartamentua?', 'Apartamentuak igogailua dauka?', 'Zein dago altzariz jantzita?'] },
        { n:'4', m:'tx', zer:'Ezezko esaldiak · pásalo a negativa', en:'Adib.: *Garaje bat behar dut.* → *Ez dut garajerik behar.*', it:L(1,4),
          gal:['Balkoi bat behar dut.', 'Igogailua behar dugu.', 'Terraza bat nahi dut.', 'Berogailua behar dute.'] } ] },

    { id:'B', k:'3', ref:['arian', '93–95'],
      lan:'**Zein da handiagoa?** Comparar dos casas: **-ago(a)** en adjetivos y adverbios (handiagoa, hurbilago) y **gehiago / gutxiago** con cantidades.',
      lot:[[16, 'Adjetivos y posposiciones']],
      falta:'*gehiago / gutxiago* todavía no está explicado en Geruzak.',
      ar:[
        { t:'hiz', iz:'Adjektiboak · para comparar casas', l:[
          ['handia', 'grande'], ['txikia', 'pequeño'], ['berria', 'nuevo'], ['zaharra', 'viejo'], ['merkea', 'barato'], ['garestia', 'caro'], ['argitsua', 'luminoso'], ['iluna', 'oscuro'],
          ['lasaia', 'tranquilo'], ['zaratatsua', 'ruidoso'], ['erosoa', 'cómodo'], ['xumea', 'sencillo'], ['hurbil', 'cerca'], ['urrun', 'lejos'] ] },
        { t:'elk', iz:'Elkarrizketa · dos pisos', l:[
          ['Nahia', 'Bi pisu daude kale honetan. Zein nahi duzu?', 'Hay dos pisos en esta calle. ¿Cuál quieres?'],
          ['Ekaitz', 'Nolakoak dira?', '¿Cómo son?'],
          ['Nahia', 'Lehenengoa handia eta argitsua da, baina garestia.', 'El primero es grande y luminoso, pero caro.'],
          ['Ekaitz', 'Eta bigarrena?', '¿Y el segundo?'],
          ['Nahia', 'Bigarrena txikiagoa eta ilunagoa da, baina merkeagoa. Eta erdigunetik hurbilago dago.', 'El segundo es más pequeño y más oscuro, pero más barato. Y está más cerca del centro.'],
          ['Ekaitz', 'Zenbat logela dauzkate?', '¿Cuántos dormitorios tienen?'],
          ['Nahia', 'Lehenengoak hiru dauzka. Bigarrenak logela gutxiago dauzka: bi.', 'El primero tiene tres. El segundo tiene menos dormitorios: dos.'],
          ['Ekaitz', 'Nik bigarrena nahi dut: merkeagoa da, eta ez dut logela gehiago behar.', 'Yo quiero el segundo: es más barato, y no necesito más dormitorios.'] ] },
        { t:'gram', iz:'-ago · más…',
          p:['Para comparar se añade **-ago** al adjetivo y, detrás, el artículo: **handiagoa** (más grande), **handiagoak** (más grandes). En los adverbios, sin artículo: **hurbilago**, **urrunago**.',
             'Con cantidades, **gehiago** (más) y **gutxiago** (menos), detrás del nombre: *logela gehiago*, *leiho gutxiago*.'],
          taula:{ cols:['', 'cómo es', 'más…'], rows:[['grande', 'handia', 'handiagoa'], ['barato', 'merkea', 'merkeagoa'], ['viejo', 'zaharra', 'zaharragoa'], ['oscuro', 'iluna', 'ilunagoa'], ['cerca', 'hurbil', 'hurbilago'], ['lejos', 'urrun', 'urrunago']] } },

        { n:'1', m:'tx', zer:'Konparazioak · forma el comparativo', en:'Adib.: *polita* → *politagoa*.', it:L(1,10),
          gal:['handia → ___', 'txikia → ___', 'merkea → ___', 'garestia → ___', 'berria → ___', 'zaharra → ___', 'argitsua → ___', 'lasaia → ___', 'hurbil → ___', 'urrun → ___'] },
        { n:'2', m:'bai', zer:'Irakurri · lee y di si es verdad (Bai) o no (Ez)', it:L(1,5),
          tes:'Uxueren pisuak lau logela dauzka, eta 900 € balio du hilean. Erdigunean dago, kale zaratatsu batean. Koldoren pisuak bi logela dauzka, eta 600 € balio du hilean. Erdigunetik urrun dago, baina oso lasaia da.',
          gal:['Uxueren pisua handiagoa da.', 'Koldoren pisua garestiagoa da.', 'Uxueren pisuak logela gehiago dauzka.', 'Koldoren pisua erdigunetik hurbilago dago.', 'Koldoren pisua lasaiagoa da.'] },
        { n:'3', m:'auk', zer:'Aukeratu · compara',
          it:[['1', ['merkeagoa', 'garestiagoa']], ['2', ['gehiago', 'gutxiago']], ['3', ['gehiago', 'gutxiago']], ['4', ['berriagoa', 'zaharragoa']], ['5', ['argitsuagoa', 'ilunagoa']], ['6', ['lasaiagoa', 'zaratatsuagoa']]],
          gal:['Pisu honek 500 € balio du; horrek, 800 €. Pisu hau ___ da.', 'Etxe honek bi logela dauzka; horrek, lau. Etxe horrek logela ___ dauzka.',
               'Egongelak hiru leiho dauzka; sukaldeak, bat. Sukaldeak leiho ___ dauzka.', 'Etxe hau berria da; hori, zaharra. Etxe hau ___ da.',
               'Logela honek leiho handi bat dauka; horrek ez dauka leihorik. Logela hori ___ da.', 'Kale hau lasaia da; hori, zaratatsua. Kale hau ___ da.'] },
        { n:'4', m:'tx', hizk:'es', zer:'Euskaraz · dilo en euskera', it:L(1,6),
          gal:['más grande → ___', 'más caras (varias) → ___', 'más cerca → ___', 'más dormitorios → ___', 'menos ventanas → ___', 'más barato → ___'] } ] },

    { id:'C', k:'4', ref:['arian', '96–98'],
      lan:'**Altzariak.** Muebles y utensilios, habitación por habitación. Decir qué hay y qué no (**badago / ez dago …-rik**) y qué necesitas y qué no (**behar dut / ez dut …-rik behar**).',
      lot:[[15, 'La negación y el partitivo'], [14, 'Nahi, behar, ahal y ari izan']],
      ar:[
        { t:'hiz', iz:'Egongela eta logela · la sala y el dormitorio', l:[
          ['sofa', 'sofá'], ['besaulkia', 'sillón'], ['mahaia', 'mesa'], ['aulkia', 'silla'], ['apalategia', 'estantería'], ['telebista', 'televisión'], ['lanpara', 'lámpara'],
          ['alfonbra', 'alfombra'], ['gortinak', 'cortinas'], ['kuxina', 'cojín'], ['ohea', 'cama'], ['gau-mahaia', 'mesilla de noche'], ['armairua', 'armario'], ['ispilua', 'espejo'],
          ['burkoa', 'almohada'], ['izara', 'sábana'], ['iratzargailua', 'despertador'], ['ordenagailua', 'ordenador'] ] },
        { t:'hiz', iz:'Sukaldea eta bainugela · la cocina y el baño', l:[
          ['hozkailua', 'frigorífico'], ['labea', 'horno'], ['mikrouhin-labea', 'microondas'], ['garbigailua', 'lavadora'], ['ontzi-garbigailua', 'lavavajillas'], ['harraska', 'fregadero'],
          ['platera', 'plato'], ['edalontzia', 'vaso'], ['koilara', 'cuchara'], ['sardexka', 'tenedor'], ['labana', 'cuchillo'], ['lapikoa', 'cazuela'], ['zartagina', 'sartén'],
          ['bainuontzia', 'bañera'], ['dutxa', 'ducha'], ['konketa', 'lavabo'], ['eskuoihala', 'toalla'] ] },
        { t:'elk', iz:'Elkarrizketa · qué hay y qué falta', l:[
          ['Maddi', 'Zer dago zure logelan, Jurgi?', '¿Qué hay en tu dormitorio, Jurgi?'],
          ['Jurgi', 'Ohe bat, armairu bat eta mahai txiki bat. Baina ez dago aulkirik.', 'Una cama, un armario y una mesa pequeña. Pero no hay sillas.'],
          ['Maddi', 'Eta sukaldean, zer daukazu?', 'Y en la cocina, ¿qué tienes?'],
          ['Jurgi', 'Hozkailua eta labea dauzkat, baina ez daukat garbigailurik.', 'Tengo frigorífico y horno, pero no tengo lavadora.'],
          ['Maddi', 'Garbigailu bat behar duzu!', '¡Necesitas una lavadora!'],
          ['Jurgi', 'Bai, eta platerak eta edalontziak ere behar ditut. Bi bakarrik dauzkat!', 'Sí, y también necesito platos y vasos. ¡Solo tengo dos!'],
          ['Maddi', 'Eta telebista?', '¿Y televisión?'],
          ['Jurgi', 'Ez, ez dut telebistarik behar. Ordenagailua daukat.', 'No, no necesito televisión. Tengo el ordenador.'] ] },
        { t:'gram', iz:'Zer dago? Zer behar duzu?',
          p:['Qué hay: **Logelan ohe bat dago** · **Bi aulki daude**. Qué no hay: **Ez dago aulkirik**.',
             'Qué necesitas: **Garbigailu bat behar dut** · **Platerak behar ditut**. Y qué no: **Ez dut ispilurik behar**.',
             'La habitación va en *non*: **sukaldean**, **egongelan**, **logelan**, **bainugelan**.'] },

        { n:'1', m:'abc', zer:'Non dago? · en qué habitación suele estar', it:L(1,10), op:['sukaldean', 'egongelan', 'logelan', 'bainugelan'],
          gal:['hozkailua', 'ohea', 'sofa', 'bainuontzia', 'labea', 'gau-mahaia', 'konketa', 'besaulkia', 'harraska', 'burkoa'] },
        { n:'2', m:'auk', zer:'Aukeratu · *dago* ala *daude*',
          it:[['1', ['dago', 'daude']], ['2', ['dago', 'daude']], ['3', ['dago', 'daude']], ['4', ['dago', 'daude']], ['5', ['dago', 'daude']], ['6', ['dago', 'daude']]],
          gal:['Egongelan sofa bat ___.', 'Sukaldean lau aulki ___.', 'Logelan ez ___ ispilurik.', 'Bainugelan bi eskuoihal ___.', 'Balkoian mahai txiki bat ___.', 'Sukaldean platerak eta edalontziak ___.'] },
        { n:'3', m:'tx', zer:'Zer behar duzu? · di qué necesitas', en:'Adib.: *Ez daukat oherik.* → *Ohe bat behar dut.*', it:L(1,5),
          gal:['Ez daukat hozkailurik.', 'Ez daukat aulkirik.', 'Ez daukagu garbigailurik.', 'Ez daukat platerik.', 'Ez daukagu mahairik.'] },
        { n:'4', m:'tx', zer:'Irakurri eta erantzun · lee y contesta', it:L(1,5),
          tes:'Enararen pisua altzariz jantzita dago. Egongelan sofa bat, bi besaulki eta telebista daude. Sukaldean hozkailua, labea eta ontzi-garbigailua daude, baina ez dago mikrouhin-laberik. Logelan ohe handi bat eta armairu bat daude. Bainugelak dutxa dauka, baina ez dauka bainuontzirik.',
          gal:['Zer dago egongelan?', 'Badago mikrouhin-laberik sukaldean?', 'Zenbat besaulki daude?', 'Bainugelak bainuontzia dauka?', 'Eta zure logelan, zer dago?'] } ] },

    { id:'E', k:'5', ref:['arian', '99–101'],
      lan:'**Erabili.** Práctica de toda la unidad: preguntas sobre dos anuncios, un repaso de elegir, tu casa y tu anuncio por escrito.',
      ar:[
        { n:'1', m:'tx', zer:'Irakurri eta erantzun · lee los dos anuncios y contesta', it:L(1,6),
          tes:['A · Pisua salgai Getxon. Lau logela, bi bainugela eta egongela handia. Garajea eta trastelekua dauzka. Berrituta dago. Tren-geltokitik hurbil.',
               'B · Apartamentua alokatzeko Zarautzen, hondartzatik hurbil. Logela bat, sukalde-egongela eta terraza. Altzariz jantzita. Ez dauka garajerik. 700 € hilean.'],
          gal:['Zein dago salgai?', 'Zenbat bainugela dauzka pisuak?', 'Non dago apartamentua?', 'Apartamentuak garajea dauka?', 'Zenbat balio du apartamentuak hilean?', 'Zein da handiagoa?'] },
        { n:'2', m:'auk', zer:'Aukeratu · elige la opción correcta',
          it:[['1', ['daukat', 'dauzkat', 'dauka']], ['2', ['-rik', '-a', '-an']], ['3', ['dut', 'ditut', 'dago']], ['4', ['dut', 'ditut', 'daukat']], ['5', ['bostehun', 'berrehun', 'bederatziehun']],
              ['6', ['du', 'dago', 'dauka']], ['7', ['merkeagoa', 'merkea', 'merke']], ['8', ['gehiago', 'handiagoa', 'hurbilago']], ['9', ['sukaldean', 'logelan', 'bainugelan']], ['10', ['behar', 'dago', 'balio']]],
          gal:['Nik bi logela ___.', 'Etxeak ez dauka garaje___.', 'Pisu bat behar ___.', 'Hiru aulki nahi ___.', '500 = ___', '— Zenbat balio ___ pisuak? — 800 €.',
               'Pisu hau merkea da, baina hori ___ da.', 'Etxe honek logela ___ dauzka.', 'Hozkailua ___ dago.', 'Ez dut telebistarik ___.'] },
        { n:'3', m:'tx', bat:true, zer:'Zure etxea · contesta sobre tu casa', it:L(1,5),
          gal:['Nolakoa da zure etxea?', 'Zenbat logela dauzka?', 'Badauka balkoirik edo terrazarik?', 'Zer dago zure egongelan?', 'Zer behar duzu zure etxean?'] },
        { n:'4', m:'idaz', zer:'Idatzi · escribe el anuncio de tu piso', en:'Di cómo es, cuántas habitaciones tiene, qué tiene y qué no, dónde está y cuánto cuesta.' } ] },

    { id:'Bd', k:'6', ref:['arian', '102'],
      lan:'**Badakizu?** Autoevaluación de la unidad: seis puntos, cada uno con Bai o Ez. Lo que marques con Ez, repásalo en su apartado.',
      ar:[
        { n:'', m:'bai', hizk:'es', zer:'Badakizu? · ¿ya sabes…?', it:L(1,6),
          gal:['Nombrar las partes de una casa.', 'Decir qué tiene una casa con *eduki* (dauka / dauzka).', 'Decir qué necesito y qué quiero, y preguntar el precio.',
               'Los números a partir de 100.', 'Comparar dos casas (-ago, gehiago, gutxiago).', 'Nombrar los muebles y decir qué hay y qué no en cada habitación.'] } ] }
  ] });

  window.LIBURUAK = window.LIBURUAK || {};
  window.LIBURUAK.ikasgaiak = { src:'claude', izena:'Ikasgaiak A1', taldea:'Ikasgaiak', unitateak:U };
})();
