/* ══════════════════════════════════════════════════════════════════════
   Liburuen koadernoa · soluciones de «Ikasgaiak» (lecciones propias) — ⚠ Claude
   ----------------------------------------------------------------------
   Los ejercicios son de Claude y sus soluciones también: no salen de ningún
   libro ni de su solucionario.
   Formato (egiaztatu.js): por unidad y ejercicio («A5» = apartado A, ejercicio 5),
     { casilla: 'respuesta' }            cerrada; varias válidas: 'x / y'
     { casilla: M('Frase modelo.') }     abierta: modelo para comparar (nunca «mal»)
     { _oh: 'nota' }                     aviso bajo la corrección
     EZ('motivo')                        sin corrección, y por qué
   Las casillas se llaman como su rótulo en la lección (datuak/ikasgaiak-a1.js).
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  function M(s){ return '~' + s; }                 // modelo de respuesta abierta
  function EZ(s){ return '!' + s; }                // sin corrección, y por qué
  var NIREA = EZ('la respuesta es tuya: no hay una única solución.');
  var E = {};

  /* ── 1 · Kaixo! Nor zara? ────────────────────────────────────────────── */
  E['ika-01'] = {
    At1: { '1':'Egun on', '2':'Eskerrik asko', '3':'Ez horregatik', '4':'Bihar arte', '5':'Barkatu', '6':'Aspaldiko!', '7':'Arratsalde on', '8':'Gabon', '9':'Zorionak', '10':'Ongi etorri' },
    At2: { '1':'naiz', '2':'nor', '3':'ni', '4':'zara', '5':'ez', '6':'zu' },
    At3: { '1':M('Ni ez naiz Koldo. / Ez naiz Koldo.'), '2':M('Zu ez zara Enara. / Ez zara Enara.'), '3':M('Hura ez da Oier. / Ez da Oier.'),
           '4':M('Ni ez naiz irakaslea. / Ez naiz irakaslea.'), '5':M('Zu ez zara ikaslea. / Ez zara ikaslea.') },
    At4: { '1':M('Ni Haizea naiz.'), '2':M('Zu nor zara? / Nor zara zu?'), '3':M('Ni ez naiz Aimar.'), '4':M('Zer moduz?'), '5':M('Ondo, eskerrik asko.'), '6':M('Agur, bihar arte! / Bihar arte, agur!') },
    At5: { '0':M('Kaixo! Ni Garazi naiz. Eta zu, nor zara?'), _oh:'Es un modelo: pon tu nombre.' },

    A1: { '1':'naiz', '2':'zara', '3':'da', '4':'gara', '5':'zarete', '6':'dira', '7':'da', '8':'dira' },
    A2: { '1':'Hau', '2':'Hori', '3':'Hura', '4':'Hauek', '5':'Horiek', '6':'Haiek' },
    A3: { '1':'irakasleak', '2':'erizaina', '3':'ikasleak', '4':'postaria', '5':'sukaldariak', '6':'kazetaria', '7':'iturginak', '8':'mekanikaria' },
    A4: { '1':'Hauek ikasleak dira.', '2':'Horiek medikuak dira.', '3':'Haiek zerbitzariak dira.', '4':'Gu musikariak gara.', '5':'Zuek udaltzainak zarete.' },
    A5: { '1':M('Erizaina da. / Haizea erizaina da.'), '2':M('Sukaldariak dira. / Aimar eta Uxue sukaldariak dira.'),
          '3':M('Ez, Koldo ez da postaria. / Ez, ez da postaria. / Ez, lorezaina da. / Ez.'), '4':M('Koldo da lorezaina. / Koldo da. / Koldo.') },

    B1: { '1':'koa / Bilbokoa', '2':'goa / Irungoa', '3':'koa / Donostiakoa', '4':'goa / Usurbilgoa', '5':'koa / Gasteizkoa', '6':'koak / Baionakoak', '7':'goak / Andoaingoak', '8':'koak / Hernanikoak' },
    B2: { '1':M('Zu Donostiakoa al zara? / Donostiakoa al zara?'), '2':M('Hura Julen al da?'), '3':M('Zuek Irungoak al zarete? / Irungoak al zarete?'),
          '4':M('Emakume hori medikua al da?'), '5':M('Haiek ikasleak al dira?') },
    B3: { '1':'mutil hau', '2':'neska hori', '3':'gizon hura', '4':'emakume hauek', '5':'ume horiek', '6':'neska haiek' },
    B4: { '1':'Bai', '2':'Ez', '3':'Bai', '4':'Ez', '5':'Bai' },
    B5: { '1':M('Irungoa da. / Aimar Irungoa da.'), '2':M('Baionakoak dira. / Maddi eta Uxue Baionakoak dira.'), '3':M('Aimar da sukaldaria. / Aimar da. / Aimar.'),
          '4':M('Ez, irakaslea da. / Ez, Garazi ez da ikaslea. / Ez, ez da ikaslea. / Ez.'), _oh:'La 5 es sobre ti: no tiene una única respuesta.' },

    C1: { '3':'hiru', '7':'zazpi', '0':'zero', '9':'bederatzi', '5':'bost', '10':'hamar', '2':'bi', '8':'zortzi', '1':'bat', '4':'lau', '6':'sei' },
    C2: { '1':'645123789 / 645 123 789 / 645 12 37 89', '2':'943001625 / 943 001 625 / 943 00 16 25', '3':'608441392 / 608 441 392 / 608 44 13 92' },
    C3: { '1':'n / Orion', '2':'en / Zarautzen', '3':'n / Baionan', '4':'en / Gasteizen', '5':'en / Usurbilen', '6':'n / Hendaian', '7':'en / Oiartzunen', '8':'n / Durangon' },
    C4: { '1':'naiz', '2':'zara', '3':'dira', '4':'gara', '5':'da', '6':'zarete' },
    C5: { Izena:'Hodei', Abizena:'Mendizabal', Jaioterria:'Usurbil / Usurbilgoa', Bizilekua:'Gasteiz / Gasteizen', Lanbidea:'erizaina / erizain',
          Helbidea:'Araba kalea, 5 / Araba kalea, bost', Telefonoa:'630248115 / 630 248 115 / 630 24 81 15' },

    E1: { '1':M('Nor zara zu? / Zu nor zara? / Nor zara?'), '2':M('Zer moduz?'), '3':M('Nongoa zara? / Zu nongoa zara? / Nongoa zara zu?'), '4':M('Non bizi zara? / Zu non bizi zara?'),
          '5':M('Irakaslea al zara? / Zu irakaslea al zara? / Irakaslea zara? / Irakaslea ala ikaslea zara?'), '6':M('Nor da hura? / Hura nor da?') },
    E2: { '1':'Ez horregatik', '2':'gara', '3':'hau', '4':'naiz', '5':'-goa', '6':'zarete', '7':'sei', '8':'-en', '9':'ala', '10':'-ak' },
    E3: NIREA,
    E4: { t:M('Kaixo! Ni Garazi naiz. Lasartekoa naiz, baina Zarautzen bizi naiz. Irakaslea naiz. Eta zu, nor zara?'), _oh:'Es un modelo: cambia los datos por los tuyos.' }
  };

  /* ── 2 · Gure herrian ────────────────────────────────────────────────── */
  E['ika-02'] = {
    At1: { '1':'nago', '2':'zaude', '3':'dago', '4':'gaude', '5':'zaudete', '6':'daude', '7':'daude', '8':'dago' },
    At2: { '1':'parkean', '2':'museoan', '3':'hotelean', '4':'plazan', '5':'tabernan', '6':'autobusean', '7':'herrian', '8':'kalean', '9':'dendetan', '10':'kafetegietan' },
    At3: { '1':'da', '2':'dago', '3':'gara', '4':'gaude', '5':'zaude', '6':'zara', '7':'daude', '8':'naiz' },
    At4: { '1':M('Plazan dago. / Udaletxea plazan dago. / Plazan.'), '2':M('Ez, parkean dago. / Ez, liburutegia ez dago plazan. / Ez, ez dago plazan. / Ez.'),
           '3':M('Hondartzan dago. / Hotela hondartzan dago. / Hondartzan.'), '4':M('Plazan daude. / Plazan.'), _oh:'La 5 es sobre ti: no tiene una única respuesta.' },

    A1: { '1':'rik / tabernarik', '2':'ik / hotelik', '3':'rik / parkerik', '4':'rik / tren-geltokirik', '5':'ik / autobusik', '6':'rik / hondartzarik', '7':'rik / ospitalerik', '8':'rik / aparkalekurik' },
    A2: { '1':M('Herri honetan ez dago museorik.'), '2':M('Kale horretan ez dago tabernarik.'), '3':M('Auzo hartan ez dago parkerik.'), '4':M('Hemen ez dago jatetxerik.'), '5':M('Plaza honetan ez dago banketxerik.') },
    A3: { '1':'honetan', '2':'horretan', '3':'hartan', '4':'hauetan', '5':'horietan', '6':'haietan' },
    A4: { '1':M('Bai, badaude bi. / Bai, badaude. / Bai, bi daude. / Bai.'), '2':M('Ez, ez dago jatetxerik. / Ez, ez dago. / Ez.'), '3':M('Bai, badago bat. / Bai, badago. / Bai, bat dago. / Bai.'),
          '4':M('Ez, ez dago zinema-aretorik. / Ez, ez dago. / Ez.'), _oh:'La 5 es sobre tu barrio: no tiene una única respuesta.' },

    B1: { '1':'aurrean', '2':'ondoan', '3':'atzean', '4':'artean', '5':'barruan', '6':'gainean', '7':'azpian', '8':'erdian' },
    B2: { '1':'aren / udaletxearen', '2':'ren / plazaren', '3':'aren / parkearen', '4':'ren / elizaren', '5':'aren / hotelaren', '6':'ren / tabernaren', '7':'aren / zubiaren', '8':'aren / museoaren' },
    B3: { '1':'hemen', '2':'hor', '3':'han', '4':'hemen', '5':'han', '6':'hor' },
    B4: { '1':'lehenengo', '2':'segi', '3':'hartu', '4':'pasatu', '5':'gero / azkenik', '6':'azkenik' },
    B5: { '1':'Bai', '2':'Ez', '3':'Bai', '4':'Ez', '5':'Bai' },

    C1: { '1':'txikia', '2':'motza', '3':'estua', '4':'baxua', '5':'itsusia', '6':'zikina', '7':'lasaia / isila', '8':'urruti' },
    C2: { '1':'Plaza hauek handiak dira.', '2':'Parke horiek politak dira.', '3':'Zubi haiek estuak dira.', '4':'Hondartza hauek garbiak dira.', '5':'Taberna horiek zaratatsuak dira.' },
    C3: { '1':'etxe txikia', '2':'kale luzeak', '3':'zubi estua', '4':'hondartza garbiak', '5':'plaza handia', '6':'parke politak' },
    C4: { '100':M('Ordu bata da. / Ordu bata.'), '400':M('Laurak dira. / Laurak.'), '1000':M('Hamarrak dira. / Hamarrak.'), '1200':M('Hamabiak dira. / Hamabiak.'),
          '315':M('Hirurak eta laurden dira. / Hirurak eta laurden.'), '630':M('Sei eta erdiak dira. / Sei eta erdiak.'), '845':M('Bederatziak laurden gutxi dira. / Bederatziak laurden gutxi.') },
    C5: { '1':'Euria ari du', '2':'Elurra ari du', '3':'Bero dago', '4':'Hodeituta dago', '5':'Hotz dago', '6':'Haizea dabil' },

    E1: { '1':M('Kostaldean dago, Bizkaiaren iparraldean. / Kostaldean dago. / Bizkaiaren iparraldean dago. / Kostaldean.'), '2':M('Txikia eta lasaia da. / Txikia eta lasaia.'),
          '3':M('Plazaren erdian dago. / Plazaren erdian.'), '4':M('Ez, ez dago zinema-aretorik. / Ez, ez dago. / Ez.'), '5':M('Bero dago. / Udan bero dago.') },
    E2: { '1':'nago', '2':'-rik', '3':'honetan', '4':'-aren', '5':'-an', '6':'txikiak', '7':'laurak', '8':'zaudete', '9':'ez dago', '10':'hotz' },
    E3: NIREA,
    E4: { t:M('Nire herria txikia da, baina oso polita. Mendialdean dago. Plaza handi bat eta bi taberna daude, baina ez dago zinema-aretorik. Udaletxea plazan dago, elizaren ondoan. Neguan hotz dago.'),
          _oh:'Es un modelo: cambia los datos por los de tu pueblo.' }
  };

  /* ── 3 · Nire familia ────────────────────────────────────────────────── */
  E['ika-03'] = {
    At1: { '1':'emaztea', '2':'alaba', '3':'neba', '4':'izeba', '5':'biloba', '6':'iloba', '7':'aitona', '8':'izeba' },
    At2: { '1':'ren / Uxueren', '2':'en / Julenen', '3':'ren / Koldoren', '4':'en / Ekaitzen', '5':'ren / Enararen', '6':'en / Ametsen', '7':'ren / Nahiaren', '8':'en / Unaxen' },
    At3: { '1':M('Julenen emaztea da. / Julenen emaztea.'), '2':M('Koldoren arreba da. / Koldoren arreba.'), '3':M('Julenen eta Nahiaren seme-alabak dira. / Julenen eta Nahiaren seme-alabak.'),
           '4':M('Koldo da. / Koldo. / Koldo da Uxueren aita.'), '5':M('Enara da. / Enara. / Enara da Izaroren amona.') },
    At4: { '1':'Uxueren ama', '2':'Enararen senarra', '3':'Julenen seme-alabak', '4':'Hodeiren izeba', '5':'Izaroren aitona-amonak', '6':'Ametsen lehengusua' },

    A1: { '1':'nire', '2':'zure', '3':'gure', '4':'zuen', '5':'haien', '6':'bere' },
    A2: { '1':'amarekin', '2':'lagunarekin', '3':'lagunekin', '4':'gurasoekin', '5':'senarrarekin', '6':'emaztearekin', '7':'Uxuerekin', '8':'Julenekin', '9':'osaba-izebekin', '10':'zurekin' },
    A3: { '1':M('Bere andregaiarekin bizi da. / Andregaiarekin bizi da. / Bere andregaiarekin. / Andregaiarekin.'), '2':M('Tolosan bizi dira. / Tolosan.'), '3':M('Aitonarekin bizi dira. / Aitonarekin.'),
          '4':M('Bakarrik bizi da. / Bakarrik.'), '5':M('Oso txikia da. / Txikia da. / Oso txikia.'), _oh:'La 6 es sobre ti: no tiene una única respuesta.' },
    A4: { '1':'amaren', '2':'aitaren', '3':'aitona-amonen', '4':'aitona-amonekin', '5':'izebaren', '6':'osabarekin' },

    B1: { '11':'hamaika', '15':'hamabost', '19':'hemeretzi', '20':'hogei', '23':'hogeita hiru', '30':'hogeita hamar', '40':'berrogei', '56':'berrogeita hamasei', '70':'hirurogeita hamar', '100':'ehun' },
    B2: { '1':'da', '2':'dago', '3':'da', '4':'daude', '5':'dago', '6':'dira', '7':'nago', '8':'zara' },
    B3: { '1':'ditut', '2':'dituzu', '3':'ditu', '4':'dituzte', '5':'ditu', '6':'dituzte' },
    B4: { '1':'k / Uxuek', '2':'ek / Julenek', '3':'k / Koldok', '4':'ek / Ekaitzek', '5':'k / Nahiak', '6':'ek / Ametsek' },
    B5: { '1':'Bai', '2':'Ez', '3':'Bai', '4':'Ez', '5':'Bai', '6':'Ez' },
    B6: { '1':'alferra', '2':'beldurtia', '3':'isila', '4':'baxua', '5':'gizena / lodia', '6':'zaharra', '7':'lotsagabea', '8':'gaiztoa / bihurria' },

    C1: { '1':'zenbat', '2':'nongoa', '3':'non', '4':'norekin', '5':'nolakoa', '6':'zein' },
    C2: { '1':M('Ez dut anai-arrebarik.'), '2':M('Ez dut mutil-lagunik.'), '3':M('Ez dut bilobarik.'), '4':M('Ez dut lehengusurik.'), '5':M('Ez dut zaletasunik.') },
    C3: { Izena:'Unax', Adina:'29 / hogeita bederatzi / 29 urte / hogeita bederatzi urte', Jaioterria:'Zarautz / Zarauzkoa', Bizilekua:'Donostia / Donostian',
          Norekin:'neska-lagunarekin / bere neska-lagunarekin / nire neska-lagunarekin / neska-laguna', Egoerazibila:'ezkongabea / ezkongabe', Lanbidea:'erizaina / erizain',
          Zaletasunak:'surfa eta musika / musika eta surfa' },
    C4: { '1':'Hirurogei urte ditu', '2':'Bai, baditut bi', '3':'Gure izebarekin bizi da', '4':'Lotsatia eta isila da', '5':'Oso ondo dago', '6':'Ez, dibortziatua naiz' },

    E1: { '1':M('Hogeita sei urte ditu. / Hogeita sei.'), '2':M('Maddiren ama da. / Maddiren ama.'), '3':M('Hirurogei urte ditu. / Hirurogei.'), '4':M('Maddiren ahizpa da. / Maddiren ahizpa.'),
          '5':M('Oso bihurriak dira. / Bihurriak dira. / Bihurriak.'), '6':M('Bere mutil-lagunarekin bizi da. / Mutil-lagunarekin bizi da. / Mutil-lagunarekin.'), '7':M('Bai, ezkonduta dago. / Bai.') },
    E2: { '1':'-ren', '2':'naiz', '3':'dituzu', '4':'da', '5':'dago', '6':'-ek', '7':'berrogei', '8':'-rik', '9':'izeba', '10':'Norekin' },
    E3: NIREA,
    E4: { t:M('Nire familia txikia da. Nire aitak hirurogeita bi urte ditu, eta amak hirurogei. Neba bat dut, Hodei. Hodei altua eta ilebeltza da, eta oso jatorra. Ni bakarrik bizi naiz, baina nire gurasoak hurbil bizi dira.'),
          _oh:'Es un modelo: cambia los datos por los de tu familia.' }
  };

  /* ── 4 · Etxe berria ─────────────────────────────────────────────────── */
  E['ika-04'] = {
    At1: { '1':'daukat', '2':'dauzkat', '3':'dauka', '4':'dauzka', '5':'daukagu', '6':'dauzkagu', '7':'daukazu', '8':'dauzkate' },
    At2: { '1':'dauka', '2':'dauzka', '3':'daukat', '4':'dauzkazue', '5':'daukate', '6':'dauzkagu' },
    At3: { '1':M('Etxeak ez dauka balkoirik.'), '2':M('Etxeak ez dauka igogailurik.'), '3':M('Nik ez daukat telebistarik.'), '4':M('Guk ez daukagu terrazarik.'), '5':M('Etxeak ez dauka berogailurik.') },
    At4: { '1':'Ez', '2':'Bai', '3':'Ez', '4':'Ez', '5':'Bai', '6':'Ez' },

    A1: { '100':'ehun', '200':'berrehun', '300':'hirurehun', '500':'bostehun', '700':'zazpiehun', '900':'bederatziehun', '1000':'mila', '150':'ehun eta berrogeita hamar',
          '420':'laurehun eta hogei', '1200':'mila eta berrehun / mila berrehun' },
    A2: { '1':'dut', '2':'ditut', '3':'duzu', '4':'ditugu', '5':'du', '6':'dituzue', '7':'dute', '8':'dituzte' },
    A3: { '1':M('Hiru logela dauzka. / Hiru dauzka. / Hiru.'), '2':M('Bederatziehun eta berrogeita hamar balio du. / Bederatziehun eta berrogeita hamar. / 950 € / 950'),
          '3':M('Hondartzatik hurbil dago. / Hondartzatik hurbil.'), '4':M('Ez, ez dauka igogailurik. / Ez, ez dauka. / Ez.'), '5':M('Pisua dago altzariz jantzita. / Pisua.') },
    A4: { '1':M('Ez dut balkoirik behar.'), '2':M('Ez dugu igogailurik behar.'), '3':M('Ez dut terrazarik nahi.'), '4':M('Ez dute berogailurik behar.') },

    B1: { '1':'handiagoa', '2':'txikiagoa', '3':'merkeagoa', '4':'garestiagoa', '5':'berriagoa', '6':'zaharragoa', '7':'argitsuagoa', '8':'lasaiagoa', '9':'hurbilago', '10':'urrunago' },
    B2: { '1':'Bai', '2':'Ez', '3':'Bai', '4':'Ez', '5':'Bai' },
    B3: { '1':'merkeagoa', '2':'gehiago', '3':'gutxiago', '4':'berriagoa', '5':'ilunagoa', '6':'lasaiagoa' },
    B4: { '1':'handiagoa', '2':'garestiagoak', '3':'hurbilago', '4':'logela gehiago', '5':'leiho gutxiago', '6':'merkeagoa' },

    C1: { '1':'sukaldean', '2':'logelan', '3':'egongelan', '4':'bainugelan', '5':'sukaldean', '6':'logelan', '7':'bainugelan', '8':'egongelan', '9':'sukaldean', '10':'logelan' },
    C2: { '1':'dago', '2':'daude', '3':'dago', '4':'daude', '5':'dago', '6':'daude' },
    C3: { '1':M('Hozkailu bat behar dut. / Hozkailua behar dut.'), '2':M('Aulkiak behar ditut. / Aulki bat behar dut.'), '3':M('Garbigailu bat behar dugu. / Garbigailua behar dugu.'),
          '4':M('Platerak behar ditut.'), '5':M('Mahai bat behar dugu. / Mahaia behar dugu.') },
    C4: { '1':M('Sofa bat, bi besaulki eta telebista daude. / Sofa bat, bi besaulki eta telebista.'), '2':M('Ez, ez dago mikrouhin-laberik. / Ez, ez dago. / Ez.'), '3':M('Bi besaulki daude. / Bi daude. / Bi.'),
          '4':M('Ez, ez dauka bainuontzirik. / Ez, dutxa dauka. / Ez.'), _oh:'La 5 es sobre tu dormitorio: no tiene una única respuesta.' },

    E1: { '1':M('A pisua. / Pisua. / Getxoko pisua. / A.'), '2':M('Bi bainugela dauzka. / Bi dauzka. / Bi.'), '3':M('Zarautzen dago, hondartzatik hurbil. / Zarautzen dago. / Zarautzen.'),
          '4':M('Ez, ez dauka garajerik. / Ez, ez dauka. / Ez.'), '5':M('Zazpiehun balio du. / Zazpiehun. / 700 € / 700'), '6':M('Pisua da handiagoa. / A pisua. / Pisua. / A.') },
    E2: { '1':'dauzkat', '2':'-rik', '3':'dut', '4':'ditut', '5':'bostehun', '6':'du', '7':'merkeagoa', '8':'gehiago', '9':'sukaldean', '10':'behar' },
    E3: NIREA,
    E4: { t:M('Pisua alokatzeko, erdigunean. Bi logela, egongela argitsua, sukaldea eta bainugela dauzka. Balkoi bat badauka, baina ez dauka garajerik. Altzariz jantzita dago. Tren-geltokitik hurbil. 750 € hilean.'),
          _oh:'Es un modelo: cambia los datos por los de tu piso.' }
  };

  /* ── 5 · Mahaian ─────────────────────────────────────────────────────── */
  E['ika-05'] = {
    At1: { '1':'edaria', '2':'janaria', '3':'edaria', '4':'janaria', '5':'edaria', '6':'janaria', '7':'edaria', '8':'janaria' },
    At2: { '1':'zait', '2':'zaizkit', '3':'zaizu', '4':'zaizkizu', '5':'zaio', '6':'zaizkio' },
    At3: { '1':'zaigu', '2':'zaizkigu', '3':'zaizue', '4':'zaizkie', '5':'zaie', '6':'zaizkizue' },
    At4: { '1':'niri', '2':'guri', '3':'hari', '4':'haiei', '5':'zuri', '6':'zuei' },
    At5: { '1':M('Ez zait esnea gustatzen.'), '2':M('Ez zaizkit barazkiak gustatzen.'), '3':M('Ez zaio kafea gustatzen.'), '4':M('Ez zaizkigu sagarrak gustatzen.'), '5':M('Ez zaie haragia gustatzen.') },

    A1: { '1':'ri / Uxueri', '2':'i / Juleni', '3':'ari / umeari', '4':'ei / umeei', '5':'ri / Enarari', '6':'i / Unaxi', '7':'ari / lagunari', '8':'ei / lagunei' },
    A2: { '1':'dut', '2':'ditut', '3':'du', '4':'ditugu', '5':'duzu', '6':'dituzte' },
    A3: { '1':M('Barazki-menestra nahi du. / Barazki-menestra.'), '2':M('Hodeiri. / Hodeiri ez zaizkio gustatzen.'), '3':M('Makarroiak nahiago ditu. / Makarroiak.'),
          '4':M('Aiorak fruta nahi du, eta Hodeik izozkia. / Fruta eta izozkia.'), '5':M('Ura eta ardoa edan nahi dute. / Ura eta ardoa.') },
    A4: { '1':'lehenengo', '2':'postrerako', '3':'bigarren', '4':'lehenengo', '5':'postrerako', '6':'bigarren', '7':'lehenengo', '8':'postrerako' },

    B1: { '1':'zuritu', '2':'bota', '3':'egosi', '4':'nahasi', '5':'berotu', '6':'frijitu', '7':'irabiatu', '8':'estali' },
    B2: { '1':'lehenengo', '2':'gero', '3':'bitartean', '4':'azkenik' },
    B3: { '1':'litro', '2':'dozena', '3':'kilo', '4':'koilarakada', '5':'baso', '6':'pixka', '7':'zati', '8':'zurrusta' },
    B4: { '1':'Bai', '2':'Ez', '3':'Ez', '4':'Bai', '5':'Bai' },

    C1: { '1':'da', '2':'dira', '3':'da', '4':'dira', '5':'da', '6':'dira' },
    C2: { '1':'ona da', '2':'kaltegarria da', '3':'ona da', '4':'kaltegarria da', '5':'ona da', '6':'kaltegarria da', '7':'ona da', '8':'kaltegarria da' },
    C3: { '1':'lasaitzeko', '2':'egoteko', '3':'hozteko', '4':'jateko', '5':'askaltzeko' },
    C4: { '1':M('Fruta, esnea eta zerealak jatea komeni da. / Fruta, esnea eta zerealak.'), '2':M('Barazkiak eta fruta jatea. / Barazkiak eta fruta.'),
          '3':M('Ez, astean bitan edo hirutan jatea ona da. / Ez, astean bitan edo hirutan. / Ez.'), '4':M('Azukre asko daukate eta. / Azukre asko daukate.'), '5':M('Ura, ez ardoa. / Ura.') },

    E1: { '1':M('Aitari gustatzen zaio. / Aitari.'), '2':M('Arraina nahiago du. / Arraina.'), '3':M('Ez, ez zaizkio gustatzen. / Ez, makarroiak eta kroketak nahiago ditu. / Ez.'),
          '4':M('Zopa gustatzen zaie. / Zopa eta fruta. / Zopa.'), _oh:'La 5 es sobre ti: no tiene una única respuesta.' },
    E2: { '1':'zait', '2':'zaizkizu', '3':'-i', '4':'dut', '5':'postrerako', '6':'Zuritu', '7':'Dozena', '8':'da', '9':'kaltegarria', '10':'lasaitzeko' },
    E3: NIREA,
    E4: { t:M('Niri arraina eta barazkiak asko gustatzen zaizkit, baina ez zait haragia gustatzen. Ura nahiago dut, baina noizean behin ardo baso bat hartzea gustatzen zait. Nire aholkua: egunero fruta jatea komeni da, ona da eta.'),
          _oh:'Es un modelo: cambia los gustos por los tuyos.' }
  };

  /* ── 6 · Dendaz denda ────────────────────────────────────────────────── */
  E['ika-06'] = {
    At1: { '1':'okindegian', '2':'arrandegian', '3':'harategian', '4':'frutategian', '5':'lurrindegian', '6':'liburu-dendan', '7':'bitxi-dendan', '8':'zapata-dendan', '9':'loradendan', '10':'kirol-dendan' },
    At2: { '1':'dut', '2':'ditut', '3':'duzu', '4':'ditugu', '5':'du', '6':'dituzte' },
    At3: { '1':M('Ez dut arrainik erosi behar.'), '2':M('Ez dut sagarrik erosi behar.'), '3':M('Ez dugu oliorik erosi behar.'), '4':M('Ez du zapatarik erosi behar.') },
    At4: { '1':'Bai', '2':'Ez', '3':'Ez', '4':'Bai', '5':'Bai' },

    A1: { '1':'azkena', '2':'kilo', '3':'nolakoak', '4':'besterik', '5':'zenbat', '6':'txartelaz' },
    A2: { '2':M('Bi euro.'), '15':M('Hamabost euro.'), '40':M('Berrogei euro.'), '120':M('Ehun eta hogei euro.'), '080':M('Laurogei zentimo.'), '350':M('Hiru euro eta berrogeita hamar zentimo. / Hiru euro eta berrogeita hamar.') },
    A3: { '1':'dut', '2':'ditut', '3':'Nolakoa', '4':'Nolakoak', '5':'dugu', '6':'ditu' },
    A4: { '1':M('Supermerkatuan dago. / Supermerkatuan.'), '2':M('Dozena bat arrautza. / Dozena bat. / Hamabi.'), '3':M('Zazpi eurotan dago. / Zazpi eurotan. / Zazpi euro.'),
          '4':M('Hamaika euro dira. / Hamaika euro. / Hamaika.'), '5':M('Txartelaz ordaindu nahi du. / Txartelaz.') },

    B1: { '1':'zuria', '2':'beltza', '3':'gorria', '4':'urdina', '5':'berdea', '6':'horia', '7':'grisa', '8':'marroia' },
    B2: { '1':'txikiegi / txikiegia', '2':'handiegi / handiegia', '3':'luzeegi / luzeegia', '4':'motzegi / motzegia', '5':'estuegi / estuegia', '6':'zabalegi / zabalegia', '7':'garestiegi / garestiegia', '8':'ilunegi / ilunegia' },
    B3: { '1':'dauka', '2':'dauzka', '3':'dauzkat', '4':'daukazu', '5':'dauzka', '6':'daukat' },
    B4: { '1':'zait', '2':'zaizkit', '3':'zaio', '4':'zaizkizu', '5':'zaigu', '6':'zaizkie' },
    B5: { '1':M('Jantzi-dendan dago. / Jantzi-dendan.'), '2':M('Luzeegi dauzka. / Luzeegi.'), '3':M('Hamabi euro balio du. / Hamabi euro. / Hamabi.'),
          '4':M('Oso polita da, baina garestiegia. / Polita, baina garestiegia.'), '5':M('Kamiseta bakarrik erosi nahi du. / Kamiseta berdea. / Kamiseta.') },

    C1: { '1':'amarentzat', '2':'aitarentzat', '3':'umearentzat', '4':'umeentzat', '5':'Uxuerentzat', '6':'Julenentzat', '7':'niretzat', '8':'zuretzat', '9':'guretzat', '10':'haientzat' },
    C2: { '1':'delako', '2':'direlako', '3':'zaiolako', '4':'daukadalako', '5':'zaielako' },
    C3: { '1':'irakurtzea', '2':'pintatzea', '3':'mendira joatea', '4':'futbolean jokatzea', '5':'igeri egitea', '6':'korrika egitea' },
    C4: { '1':M('Hiru opari erosi behar ditu. / Hiru opari. / Hiru.'), '2':M('Bere aitarentzat dira. / Bere aitarentzat. / Aitarentzat.'), '3':M('Politak direlako.'),
          '4':M('Futbolean jokatzea asko gustatzen zaio. / Futbolean jokatzea.'), _oh:'La 5 es sobre ti: no tiene una única respuesta.' },

    E1: { a:'5', b:'1', c:'4', d:'2', e:'6', f:'3' },
    E2: { '1':'okindegian', '2':'ditut', '3':'-ik', '4':'Zenbat', '5':'Nolakoak', '6':'-egi', '7':'dauzka', '8':'-rentzat', '9':'delako', '10':'zaio' },
    E3: NIREA,
    E4: { t:M('Opari bat erosi behar dut nire lagun Maddirentzat. Gitarra bat erosi nahi dut, musika asko gustatzen zaiolako. Baina gitarra garestiegia da! Liburu bat ere ona da, irakurtzea gustatzen zaiolako eta merkeagoa delako.'),
          _oh:'Es un modelo: cambia la persona, el regalo y la razón.' }
  };

  /* ── 7 · Gaur, bihar, orain ──────────────────────────────────────────── */
  E['ika-07'] = {
    At1: { '1':'naiz', '2':'dut', '3':'da', '4':'du', '5':'gara', '6':'dugu', '7':'zara', '8':'dute' },
    At2: { '1':'naiz', '2':'duzu', '3':'da', '4':'gara', '5':'dut', '6':'zara', '7':'du', '8':'dugu' },
    At3: { '1':M('Ez naiz zinemara joan.'), '2':M('Ez dut gosaldu.'), '3':M('Uxue ez da etxera itzuli.'), '4':M('Ez dugu egunkaria erosi. / Ez dugu egunkaririk erosi.'), '5':M('Ez zara berandu iritsi.') },
    At4: { '1':M('Ez, berandu jaiki da. / Ez, ez da goiz jaiki. / Ez.'), '2':M('Ez, ez du gosaldu. / Ez.'), '3':M('Lankideekin bazkaldu du. / Lankideekin.'), '4':M('Afaria erosi du. / Afaria.'),
           '5':M('Telebista ikusi du, eta goiz joan da ohera. / Telebista ikusi du.'), _oh:'La 6 es sobre ti: no tiene una única respuesta.' },

    A1: { '1':'etxera', '2':'dendara', '3':'lanera', '4':'hotelera', '5':'mendira', '6':'hondartzara', '7':'Bilbora', '8':'tabernetara' },
    A2: { '1':'etxetik', '2':'plazatik', '3':'autobusetik', '4':'menditik', '5':'Bilbotik', '6':'Donostiatik', '7':'tabernetatik', '8':'igerilekutik' },
    A3: { '1':'erostera', '2':'bazkaltzera', '3':'ikastera', '4':'hartzera', '5':'moztera', '6':'bisitatzera' },
    A4: { '1':'Bai', '2':'Ez', '3':'Ez', '4':'Bai', '5':'Ez' },

    B1: { '1':'joango', '2':'etorriko', '3':'egingo', '4':'hartuko', '5':'jango', '6':'ikusiko', '7':'itzuliko', '8':'izango', '9':'bazkalduko', '10':'aterako' },
    B2: { '1':'joango', '2':'erosi', '3':'etorriko', '4':'jaiki', '5':'ikusiko', '6':'egin', '7':'itzuliko', '8':'hartu' },
    B3: { '1':M('Bihar ez dut lanik egingo. / Bihar ez dut lan egingo.'), '2':M('Etzi ez dira etorriko.'), '3':M('Datorren astean ez gara Bilbora joango.'), '4':M('Gauean ez dut telebista ikusiko. / Gauean ez dut telebistarik ikusiko.') },
    B4: { '1':M('Zarautzera joango dira. / Zarautzera.'), '2':M('Datorren asteburuan joango dira. / Datorren asteburuan. / Larunbat goizean.'), '3':M('Arraina jango dute. / Arraina.'),
          '4':M('Goiz jaikiko dira eta mendira joango dira. / Mendira joango dira.'), '5':M('Igande arratsaldean itzuliko dira. / Igande arratsaldean. / Arratsaldean.'), _oh:'La 6 es sobre ti: no tiene una única respuesta.' },

    C1: { '1':'idazten', '2':'irakurtzen', '3':'ikasten', '4':'entzuten', '5':'edaten', '6':'egiten', '7':'prestatzen', '8':'dantzatzen' },
    C2: { '1':'naiz', '2':'zara', '3':'da', '4':'gara', '5':'zarete', '6':'dira' },
    C3: { '1':'noa', '2':'zatoz', '3':'dabil', '4':'goaz', '5':'datoz', '6':'zoazte', '7':'nago', '8':'dator' },
    C4: { '1':M('Sukaldean dago. / Sukaldean.'), '2':M('Egunkaria irakurtzen ari da. / Egunkaria irakurtzen.'), '3':M('Bere logelan dago. / Bere logelan. / Logelan.'), '4':M('Musika entzuten ari da. / Musika.'),
          _oh:'La 5 es sobre ti: no tiene una única respuesta.' },

    E1: { '1':M('Donostian dago. / Donostian.'), '2':M('Unaxekin dago. / Unaxekin.'), '3':M('Gasteiztik etorri dira. / Gasteiztik.'), '4':M('Kafe bat hartzen ari dira portuan. / Kafe bat hartzen ari dira. / Kafe bat hartzen.'),
          '5':M('Museoa bisitatuko dute. / Museoa bisitatu.'), '6':M('Etzi itzuliko dira. / Etzi.') },
    E2: { '1':'naiz', '2':'dut', '3':'dut', '4':'-ra', '5':'-etik', '6':'erostera', '7':'joango', '8':'ari', '9':'zoaz', '10':'dabiltza' },
    E3: NIREA,
    E4: { t:M('Gaur goiz jaiki naiz, eta lanera joan naiz autobusean. Eguerdian lagun batekin bazkaldu dut. Orain etxean nago, euskara ikasten ari naiz. Bihar ez dut lanik egingo: mendira joango naiz.'),
          _oh:'Es un modelo: cuenta tu día y tus planes.' }
  };

  window.ERANTZUNAK = window.ERANTZUNAK || {};
  window.ERANTZUNAK.ikasgaiak = E;
})();
