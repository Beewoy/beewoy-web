const root = document.body.dataset.base || './';
const page = document.body.dataset.page || 'home';
const path = slug => `${root}${slug ? `${slug}/` : ''}`;
const asset = name => `${root}assets/${name}`;

const services = [
  {
    slug: 'restauracia-a-cukraren', short: 'Reštaurácia', name: 'Reštaurácia a cukráreň',
    eyebrow: 'Na jedlo aj bez podujatia', title: 'Na jedlo, kávu aj sladkú bodku',
    intro: 'Obed v historickej budove, pokojnejší salónik či letná terasa. Príďte aj na kávu a koláčik; stôl si podľa súčasného webu rezervujte vopred.',
    teaser: 'Príďte na jedlo, kávu a dezert aj bez plánovania podujatia.',
    image: 'restaurant-served-concept.png', alt: 'Ilustrovaný stôl so zeleninovým jedlom a dezertom, návrhový obraz, nie fotografia reštaurácie Castel Mierovo ani položka jej jedálneho lístka.',
    cardCta: 'Objaviť reštauráciu', cta: 'Ako rezervovať stôl',
    note: 'Verejná reštaurácia a rezervácia vopred sú uvedené na súčasnom webe.',
    module: 'restaurant',
    storyTitle: 'Vyberte si miesto pri stole',
    story: 'Reštaurácia v historickej budove, menší salónik a sezónna terasa dávajú návšteve rôzny charakter. Dostupnosť konkrétneho priestoru si overte pri rezervácii.',
    detailTitle: 'Jedlo, ktoré patrí k miestu',
    detail: 'Jedálny, nápojový a vínny lístok majú svoje miesto hneď pri plánovaní návštevy. Aktuálnu ponuku a možnosti pri stravovacích obmedzeniach si overte priamo s prevádzkou.',
    faq: [
      ['Treba si rezervovať stôl?', 'Áno, vopred. Presný kontakt a otváracie hodiny si pred návštevou overte priamo s Castel Mierovo.'],
      ['Dá sa prísť aj bez oslavy?', 'Áno. Reštaurácia je určená aj hosťom bez podujatia.'],
      ['Kde nájdem cukrárske produkty?', 'Torty, dezerty, sladký aj slaný catering nájdete na samostatnom webe Bakery Castel Mierovo.'],
      ['Sú v ponuke aj jedlá pri stravovacích obmedzeniach?', 'Súčasný web spomína vegetariánske a vegánske možnosti, detské menu a jedlá pri intoleranciách. Konkrétne zloženie a bezpečnosť si overte s prevádzkou.']
    ]
  },
  {
    slug: 'izby-a-apartmany', short: 'Ubytovanie', name: 'Izby a apartmány',
    eyebrow: 'Pobyt má vlastný dôvod', title: 'Zostaňte aj cez noc',
    intro: 'Izby a apartmány v penzióne s raňajkami, aj keď neprichádzate na podujatie. Vyberte si podobu pobytu a termín si overte priamo s Castel Mierovo.',
    teaser: 'Zostaňte cez noc v izbách a apartmánoch priamo v Castel Mierovo.',
    image: 'rooms-concept.png', alt: 'Ilustrovaný detail lôžka a lampy, návrhový obraz, nie fotografia izby Castel Mierovo.',
    cardCta: 'Pozrieť ubytovanie', cta: 'Overiť možnosti ubytovania',
    note: 'Izby, apartmány a raňajky sú uvedené na súčasnom webe. Dostupnosť nie je overená.',
    module: 'rooms',
    storyTitle: 'Izba alebo apartmán?',
    story: 'Izby ponúkajú zázemie na noc s vlastnou kúpeľňou. Apartmány majú podľa súčasnej ponuky oddelenú spálňu a obytnú časť. Pri výbere rozhodnú fotografie, počet hostí a aktuálne podmienky.',
    detailTitle: 'Ráno bez ponáhľania',
    detail: 'Súčasná stránka opisuje pobyt s raňajkami a parkovanie pred budovou. Rozsah služieb si potvrďte pri konkrétnej rezervácii.',
    faq: [
      ['Je pobyt len pre hostí podujatí?', 'Ubytovať sa možno aj bez účasti na podujatí. Termín a pravidlá sa môžu líšiť podľa dňa.'],
      ['Ako zistím cenu a dostupnosť?', 'Orientačný cenník zo súčasného webu je nižšie. Pri dopyte uveďte termín, počet hostí a typ ubytovania; platnú cenu a dostupnosť potvrdí prevádzka.'],
      ['Kedy je príchod a odchod?', 'Súčasný web uvádza príchod od 14:30 do 19:00 a odchod do 11:00. Iný čas treba dohodnúť vopred; pri neskoršom odchode web uvádza doplatok.'],
      ['Čo je podľa webu zahrnuté?', 'Web uvádza vlastnú kúpeľňu, televízor, trezor, minibar, kontinentálne raňajky, Wi-Fi vo verejných priestoroch a parkovanie pred budovou. Rozsah si potvrďte pri rezervácii.'],
      ['Je k dispozícii wellness alebo pobyt so zvieraťom?', 'Wellness na mieste podľa súčasného webu nie je. Pobyt so zvieraťom web štandardne neumožňuje; výnimku treba riešiť priamo s prevádzkou.'],
      ['Dá sa v Castel Mierovo aj obedovať?', 'Áno, súčasný web uvádza reštauráciu s ponukou à la carte. Stôl treba rezervovať vopred.']
    ]
  },
  {
    slug: 'svadby', short: 'Svadby', name: 'Svadby',
    eyebrow: 'Viac podôb jedného dňa', title: 'Svadba s priestorom pre váš plán',
    intro: 'Svadobná hostina v interiéri, v stane alebo na letnej terase pod stromami. Spoznajte priestory, možnosti stolovania a prvý krok k obhliadke.',
    teaser: 'Preskúmajte priestory, podobu hostiny a možnosti spoločného plánovania.',
    image: 'weddings-concept.png', alt: 'Ilustrované slávnostné stolovanie v zeleni, návrhový obraz, nie fotografia svadby v Castel Mierovo.',
    cardCta: 'Preskúmať svadby', cta: 'Pozrieť dopyt na termín',
    note: 'Interiér, stan a terasa sú uvedené na súčasnom webe; kapacita závisí od koncepcie.',
    module: 'weddings',
    storyTitle: 'Začnite pri priestore',
    story: 'Slávnostná hostina vnútri, uvoľnenejší program v stane alebo stretnutie na terase. Každá podoba potrebuje vlastný plán. Presnú vhodnosť priestoru pre váš termín potvrdí až prevádzka.',
    detailTitle: 'Pri stole a medzi hosťami',
    detail: 'Jedlo, cukrárska výroba a možnosť ubytovania pomáhajú poskladať deň od príchodu hostí po večer. Pri obhliadke sa dá prejsť tým, čo má pre vás najväčšiu váhu.',
    faq: [
      ['Dá sa priestor vidieť pred rozhodnutím?', 'Obhliadku si môžete dohodnúť vopred. Konkrétny čas potvrdí prevádzka.'],
      ['Je možný iba jeden svadobný program?', 'Súčasný web predstavuje klasickú hostinu, poobedný brunch a slávnostné posedenie. Zmeny programu sú podľa neho možné po dohode.'],
      ['Ako začať s ponukou a obhliadkou?', 'Web odporúča najprv e-mail s orientačným dátumom a počtom hostí. Následne možno dohodnúť obhliadku priestorov a prejsť svadobné podmienky.'],
      ['Čo môže zahŕňať svadobná ponuka?', 'Na súčasnom webe sú jedlo, nápoje, torty a výslužky, ubytovanie, dekorácia aj koordinácia. Konkrétny rozsah, dodávateľov a cenu treba potvrdiť individuálne.'],
      ['Dá sa usporiadať aj menšia svadba?', 'Súčasný web uvádza, že pripravuje malé aj väčšie svadby. Vhodnosť priestoru pre váš počet hostí potvrdí prevádzka.'],
      ['Ako sa potvrdzuje termín?', 'Web opisuje nezáväzný dopyt a následný rezervačný postup. Toto demo termín neblokuje; aktuálne podmienky a poplatky treba overiť priamo s Castel Mierovo.']
    ]
  },
  {
    slug: 'firemne-stretnutia', short: 'Firmy', name: 'Firemné stretnutia',
    eyebrow: 'Priestor pre prácu aj rozhovor', title: 'Stretnutie, ktoré má svoj rytmus',
    intro: 'Porada, školenie, pracovný obed aj firemná oslava. Súčasný web uvádza flexibilné usporiadanie, techniku, občerstvenie a ubytovanie hostí.',
    teaser: 'Dajte pracovnému stretnutiu priestor na sústredenie, jedlo aj rozhovor.',
    image: 'corporate-concept.png', alt: 'Ilustrovaný pracovný stôl so zápisníkmi a vodou, návrhový obraz, nie fotografia firemnej miestnosti Castel Mierovo.',
    cardCta: 'Pozrieť firemné možnosti', cta: 'Pozrieť dopyt na ponuku',
    note: 'Miestnosti, technika a občerstvenie sú uvedené na súčasnom webe; presný inventár nie je potvrdený.',
    module: 'corporate',
    storyTitle: 'Najskôr formát, potom miestnosť',
    story: 'Menšie rokovanie, školenie a večerné stretnutie s kolegami majú rozdielne potreby. Hlavnú miestnosť aj salónik je vhodné posúdiť podľa počtu ľudí a požadovaného usporiadania.',
    detailTitle: 'Deň sa skladá aj z prestávok',
    detail: 'Obed, kávová prestávka či večera môžu nadviazať na pracovný program. Ak hostia cestujú, v mieste sú aj izby a apartmány.',
    faq: [
      ['Je k dispozícii technika?', 'Prezentácia a pracovný program môžu mať technické zázemie. Konkrétny inventár a funkčnosť treba potvrdiť pri dopyte.'],
      ['Dá sa zabezpečiť občerstvenie?', 'Web uvádza coffee break, obed, slávnostnú večeru aj sladký a slaný catering. Rozsah a cenu určí konkrétna ponuka.'],
      ['Je priestor aj na večierok?', 'Áno, aktuálny web uvádza firemné a vianočné večierky, interiér, stan aj letnú terasu. Dostupnosť potvrďte pri dopyte.']
    ]
  },
  {
    slug: 'rodinne-podujatia', short: 'Oslavy', name: 'Rodinné podujatia',
    eyebrow: 'Čas pre ľudí pri jednom stole', title: 'Keď sa rodina stretne pri stole',
    intro: 'Narodeniny, jubileum, krstiny či promócie v spoločnosti blízkych. Castel Mierovo na súčasnom webe spája priestory, jedlo a pomoc s prípravou oslavy.',
    teaser: 'Naplánujte oslavu pri jednom stole, s jedlom a časom pre ľudí, na ktorých záleží.',
    image: 'family-concept.png', alt: 'Ilustrovaný spoločný stôl s kvetmi a dezertom, návrhový obraz, nie fotografia rodinnej oslavy v Castel Mierovo.',
    cardCta: 'Pozrieť rodinné oslavy', cta: 'Pozrieť dopyt na oslavu',
    note: 'Typy osláv, jedlo a koordinácia sú uvedené na súčasnom webe; konkrétny rozsah treba potvrdiť.',
    module: 'family',
    storyTitle: 'Oslava podľa príležitosti',
    story: 'Pokojný obed po krstinách má iný priebeh než narodeninový večer. Salónik, väčšie priestory, terasa a záhrada dávajú oslave rôzne podoby. Vhodnosť závisí od termínu a počtu hostí.',
    detailTitle: 'Jedlo, ktoré spája program',
    detail: 'K rodinným podujatiam patrí slávnostné jedlo, koláčiky aj torty. Ak hostia prichádzajú zďaleka, v budove sú aj izby a apartmány.',
    faq: [
      ['Je miesto iba na veľké oslavy?', 'Miesto prijíma rozličné typy osláv. Vhodnosť priestoru a podmienky si overte pri dopyte.'],
      ['Dá sa riešiť aj torta?', 'Cukrárska výroba patrí k ponuke. Konkrétny výber a postup objednávky si treba overiť.'],
      ['Aké príležitosti sa tu podľa webu organizujú?', 'Okrem narodenín a jubileí sú na súčasnej stránke krstiny, prvé sväté prijímania, birmovky, promócie, zásnuby a oslavy konca školského roka.'],
      ['Dá sa spojiť oslava s fotografovaním?', 'Súčasný web predstavuje tematické rodinné a párové fotenia v dohodnutých termínoch. Ich aktuálnu ponuku treba potvrdiť.']
    ]
  }
];

const bySlug = Object.fromEntries(services.map(s => [s.slug, s]));
const contactUrl = slug => `${path('kontakt')}?tema=${encodeURIComponent(slug)}`;
const chevron = '<span aria-hidden="true">↗</span>';
const buttonIcon = name => `<span class="button-icon" aria-hidden="true"><animate-icons name="${name}" size="20" is-animated="false"></animate-icons></span>`;
const indexMeta = {
  restaurant: { description: 'Na obed, večeru aj koláč.', icon: 'utensils' },
  rooms: { description: 'Pobyt v izbách a apartmánoch.', icon: 'house' },
  weddings: { description: 'Priestor pre váš svadobný deň.', icon: 'calendar-heart' },
  corporate: { description: 'Na poradu aj firemné podujatie.', icon: 'presentation' },
  family: { description: 'Na oslavu s blízkymi.', icon: 'gift' }
};
const galleryPhotos = [
  { file: 'gallery/exterier-vstup.jpg', alt: 'Vstup do budovy Castel Mierovo cez záhradu.' },
  { file: 'gallery/zahrada-strom.jpg', alt: 'Strom a chodník v záhrade Castel Mierovo.' },
  { file: 'gallery/budova-terasa.jpg', alt: 'Priečelie budovy a terasa Castel Mierovo.' },
  { file: 'gallery/zahrada-terasa.jpg', alt: 'Záhradná terasa so zeleňou.' },
  { file: 'gallery/budova-zahrada.jpg', alt: 'Budova Castel Mierovo pri záhradnom chodníku.' }
];
const servicePhotos = {
  restaurant: [
    ['restauracia-a-cukraren-02.jpg','Letná terasa pri budove Castel Mierovo.'],
    ['restauracia-a-cukraren-01.jpg','Prestretý stôl s jedlami v Castel Mierovo.'],
    ['restauracia-a-cukraren-03.jpg','Dezert z ponuky zachytený na súčasnom webe.'],
    ['restauracia-a-cukraren-04.jpg','Výber tort a dezertov na sladkom stole.'],
    ['restauracia-a-cukraren-05.jpg','Slané občerstvenie na servírovacom podnose.']
  ],
  rooms: [
    ['izby-a-apartmany-02.jpg','Posteľ v izbe Castel Mierovo.'],
    ['izby-a-apartmany-01.jpg','Detail zariadenia ubytovacej izby.'],
    ['izby-a-apartmany-03.jpg','Priečelie penziónu pri terase.'],
    ['izby-a-apartmany-04.jpg','Detail exteriéru budovy penziónu.'],
    ['izby-a-apartmany-05.jpg','Vstup do penziónu medzi záhradnou zeleňou.']
  ],
  weddings: [
    ['svadby-06.jpg','Budova Castel Mierovo pripravená na svadobný deň.'],
    ['svadby-01.jpg','Svadobné stolovanie v záhrade Castel Mierovo.'],
    ['svadby-03.jpg','Svadobná sála so slávnostným prestretím.'],
    ['svadby-04.jpg','Detail slávnostne prestretého svadobného stola.'],
    ['svadby-02.jpg','Svadobná torta v exteriéri.'],
    ['svadby-05.jpg','Svadobný pár v záhrade Castel Mierovo.'],
    ['svadby-07.jpg','Kvetinová výzdoba svadobného stola.']
  ],
  corporate: [
    ['firemne-stretnutia-02.jpg','Pripravená miestnosť na pracovné stretnutie.'],
    ['firemne-stretnutia-01.jpg','Detail rokovacieho stola s písacími potrebami.'],
    ['firemne-stretnutia-04.jpg','Slávnostné stolovanie v interiéri.'],
    ['firemne-stretnutia-05.jpg','Výber slaného cateringu.']
  ],
  family: [
    ['rodinne-podujatia-01.jpg','Stôl pripravený na rodinné podujatie.'],
    ['rodinne-podujatia-02.jpg','Detail slávnostne prestretého stola.'],
    ['restauracia-a-cukraren-04.jpg','Výber tort a dezertov z cukrárskej výroby.'],
    ['svadby-06.jpg','Budova Castel Mierovo s terasou pripravenou na oslavu.']
  ]
};
const mapsQuery = 'Castel Mierovo, Mierovo 20, 930 41 Mierovo';
const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`;

function header() {
  return `<a class="skip" href="#main">Preskočiť na obsah</a>
    <div class="concept-bar">Klientsky návrh webu <span aria-hidden="true">·</span> Obrazy sú ilustračné</div>
    <header class="site-header">
      <div class="header-inner">
        <a class="brand-link" href="${path('')}" aria-label="Castel Mierovo, úvod"><img src="${asset('logo.svg')}" alt="" width="232" height="80"></a>
        <button class="menu-toggle" type="button" aria-controls="primary-nav" aria-expanded="false">Menu ${buttonIcon('menu')}</button>
        <nav class="primary-nav" id="primary-nav" aria-label="Hlavná navigácia">
          ${services.map(s => `<a href="${path(s.slug)}"${page === s.slug ? ' aria-current="page"' : ''}>${s.short}</a>`).join('')}
          <a class="nav-contact" href="${path('kontakt')}"${page === 'kontakt' ? ' aria-current="page"' : ''}>Kontakt ${buttonIcon('move-right')}</a>
        </nav>
      </div>
    </header>`;
}
function footer() {
  return `<footer class="footer"><div class="footer-inner">
    <div class="footer-about"><a class="footer-brand" href="${path('')}" aria-label="Castel Mierovo, úvod"><img src="${asset('logo.svg')}" alt="" width="232" height="80"></a><p>Miesto pre jedlo, pobyt a spoločné chvíle v Mierove.</p></div>
    <nav class="footer-links" aria-label="Navigácia v päte"><h2>Služby</h2>${services.map(s=>`<a href="${path(s.slug)}">${s.name}</a>`).join('')}<a href="${path('kontakt')}">Kontakt</a></nav>
    <div class="footer-contact"><h2>Kontakt</h2><address>Castel Mierovo<br>Mierovo 20<br>930 41 Mierovo</address><a href="tel:+421315693750">+421 31 56 93 750</a><a href="tel:+421903838243">+421 903 838 243</a><a href="mailto:info@castel.sk">info@castel.sk</a><div class="footer-social"><a href="https://www.facebook.com/castelmierovo/" target="_blank" rel="noopener noreferrer">Facebook <span aria-hidden="true">↗</span></a><a href="https://www.instagram.com/castelmierovo/" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a></div></div>
    <p class="footer-disclaimer">Klientska ukážka návrhu. Ilustrácie služieb nie sú fotografiami prevádzky. Formulár údaje neodosiela ani neukladá.</p>
  </div></footer>`;
}
function image(s, extra='') {
  return `<figure class="concept-image ${extra}"><img src="${asset(s.image)}" alt="${s.alt}" decoding="async"><figcaption>Ilustračná vizualizácia návrhu</figcaption></figure>`;
}
function serviceIndex() {
  return `<section class="service-index" id="sluzby" aria-labelledby="service-index-title"><div class="section-shell">
    <h2 id="service-index-title">Čo vás sem privádza</h2>
    <div class="index-grid">${services.map(s=>`<a href="${path(s.slug)}" class="index-item index-item--${s.module}"><span class="index-icon" aria-hidden="true"><animate-icons name="${indexMeta[s.module].icon}" size="30" is-animated="false"></animate-icons></span><span class="index-copy"><strong>${s.name}</strong><span>${indexMeta[s.module].description}</span></span></a>`).join('')}</div>
  </div></section>`;
}
function gallerySection() {
  const photos = duplicate => `<div class="gallery-set"${duplicate ? ' aria-hidden="true"' : ''}>${galleryPhotos.map(photo => `<figure class="gallery-photo"><img src="${asset(photo.file)}" alt="${duplicate ? '' : photo.alt}" width="360" height="420" decoding="async"></figure>`).join('')}</div>`;
  return `<section class="gallery-section" aria-labelledby="gallery-title"><div class="section-shell gallery-heading"><div><p class="kicker">Galéria miesta</p><h2 id="gallery-title">Castel Mierovo zblízka</h2><p>Budova a záhrada na fotografiách zo súčasného webu.</p></div><button class="gallery-toggle" type="button" aria-pressed="false" aria-label="Zastaviť posúvanie fotografií">${buttonIcon('pause')}</button></div><div class="gallery-viewport"><div class="gallery-track">${photos(false)}${photos(true)}</div></div><p class="gallery-credit section-shell">Fotografie zo súčasného webu Castel Mierovo.</p></section>`;
}
function locationSection() {
  return `<section class="location-section" aria-labelledby="location-title"><div class="section-shell location-layout"><div class="location-copy"><p class="kicker">Kde nás nájdete</p><h2 id="location-title">V Mierove.</h2><address>Castel Mierovo<br>Mierovo 20<br>930 41 Mierovo</address><a class="text-link location-directions" href="${mapsSearchUrl}" target="_blank" rel="noopener noreferrer">Otvoriť v Google Maps ${chevron}</a><div class="location-hours"><h3>Otváracie hodiny</h3><dl><div><dt>Po – Ut</dt><dd>zatvorené</dd></div><div><dt>St – Št</dt><dd>12:00 – 19:00</dd></div><div><dt>Pi – So</dt><dd>12:00 – 21:00</dd></div><div><dt>Ne</dt><dd>12:00 – 19:00</dd></div></dl><p>Adresa a hodiny sú podľa súčasného webu. Pred návštevou si overte ich aktuálnosť.</p></div></div><div class="location-map"><iframe title="Google Maps: Castel Mierovo, Mierovo 20" src="${mapsEmbedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div></div></section>`;
}
function calendarSection() {
  return `<section class="calendar-section" id="program" aria-labelledby="calendar-title"><div class="section-shell">
    <div class="calendar-intro"><div><p class="kicker">Program a váš termín</p><h2 id="calendar-title">Kedy sa stretneme?</h2></div><p>Prezrite si ukážku kalendára a vyberte predbežný dátum dopytu. <strong>Nezobrazuje voľné termíny.</strong> Vyznačené podujatia sú iba príklady, nie skutočný program Castel Mierovo.</p></div>
    <div class="calendar-layout"><div class="calendar-panel"><div class="calendar-toolbar"><h3 id="calendar-month" aria-live="polite"></h3><div class="calendar-controls"><button type="button" id="calendar-prev" aria-label="Predchádzajúci mesiac">${buttonIcon('move-left')}</button><button type="button" id="calendar-next" aria-label="Nasledujúci mesiac">${buttonIcon('move-right')}</button></div></div><div class="calendar-weekdays" aria-hidden="true"><span>Po</span><span>Ut</span><span>St</span><span>Št</span><span>Pi</span><span>So</span><span>Ne</span></div><div class="calendar-grid" id="calendar-grid" role="group" aria-label="Výber dátumu"></div></div>
    <aside class="calendar-aside"><p class="kicker">Váš plán</p><h3>Máte termín na mysli?</h3><p>Vyberte deň v kalendári. Dátum sa doplní do ukážkového dopytu; jeho dostupnosť nie je potvrdená.</p><p id="calendar-selection" class="calendar-selection" aria-live="polite">Zatiaľ nemáte vybraný dátum.</p><a class="text-link" href="#dopyt">Prejsť k dopytu ${chevron}</a></aside></div>
  </div></section>`;
}
function inquirySection() {
  return `<section class="inquiry-section" id="dopyt" aria-labelledby="inquiry-title"><div class="section-shell inquiry-layout"><div class="inquiry-intro"><p class="kicker">Napíšte nám svoj plán</p><h2 id="inquiry-title">Začnite konkrétnou otázkou.</h2><p>Vyberte službu, predbežný dátum a opíšte, čo potrebujete. Skutočnú dostupnosť, cenu a ďalší postup by potvrdila až prevádzka.</p><p class="inquiry-demo-note"><strong>Ukážkový formulár.</strong> Údaje sa neodosielajú, neukladajú a nevzniká rezervácia.</p></div>
  <form id="demo-inquiry-form" class="inquiry-form" autocomplete="off" novalidate><div class="form-row"><label for="inquiry-name">Vaše meno <span aria-hidden="true">*</span></label><input id="inquiry-name" name="meno" type="text" autocomplete="off" required></div><div class="form-row"><label for="inquiry-email">E-mail <span aria-hidden="true">*</span></label><input id="inquiry-email" name="email" type="email" autocomplete="off" required></div><div class="form-row form-row-pair"><div><label for="inquiry-topic">Čo plánujete? <span aria-hidden="true">*</span></label><select id="inquiry-topic" name="tema" required><option value="">Vyberte službu</option>${services.map(s=>`<option value="${s.slug}">${s.name}</option>`).join('')}</select></div><div><label for="inquiry-date">Predbežný dátum</label><input id="inquiry-date" name="termin" type="date"></div></div><div class="form-row"><label for="inquiry-message">Vaša požiadavka <span aria-hidden="true">*</span></label><textarea id="inquiry-message" name="sprava" rows="4" placeholder="Napríklad počet hostí, čas alebo predstava o podujatí" required></textarea></div><button class="button button-light" type="submit">Skontrolovať dopyt ${buttonIcon('move-right')}</button><p class="form-fineprint">* Povinné polia. Tlačidlo iba overí vyplnenie; nič neodosiela.</p><p id="inquiry-status" class="inquiry-status" role="status" aria-live="polite" hidden></p></form></div></section>`;
}
function home() {
  return `<main id="main">
    <section class="home-hero" aria-labelledby="hero-title"><img class="hero-art" src="${asset('building-hero-concept.png')}" alt="Návrhová ilustrácia budovy Castel Mierovo a záhrady" fetchpriority="high"><div class="hero-wash"></div>
      <div class="hero-copy"><p class="kicker">Castel Mierovo</p><h1 id="hero-title"><span>Miesto pre Vaše</span> <span class="hero-script">dôležité momenty</span></h1><p>Príďte na obed alebo koláč, zostaňte cez noc, usporiadajte svadbu, rodinnú oslavu či firemné stretnutie.</p><div class="hero-actions"><a class="button button-hero" href="#sluzby">Objaviť služby ${buttonIcon('move-right')}</a><a class="hero-review" href="https://www.google.com/search?q=Castel+Mierovo+recenzie" target="_blank" rel="noopener noreferrer" aria-label="Pozrieť recenzie Castel Mierovo na Google, hodnotenie 4,9 z 5; otvorí sa nová karta"><span class="hero-review-stars" aria-hidden="true">★</span><strong>4,9 / 5</strong><span>na Google</span><span aria-hidden="true">↗</span></a></div></div>
      <span class="hero-caption">Návrhová ilustrácia podľa fotografickej predlohy</span>
    </section>
    ${serviceIndex()}
    <section class="editorial" aria-label="Päť služieb Castel Mierovo"><div class="section-shell"><div class="story-list">${services.map((s,i)=>`<article class="story ${i%2?'story-reverse':''}"><div class="story-copy"><h3>${s.name}</h3><p>${s.teaser}</p><a class="button button-story" href="${path(s.slug)}">${s.cardCta} ${buttonIcon('move-right')}</a></div>${image(s)}</article>`).join('')}</div></div></section>
    ${gallerySection()}
    ${calendarSection()}
    ${inquirySection()}
    ${locationSection()}
  </main>`;
}
function moduleHtml(s) {
  const card = (icon, title, copy) => `<article class="service-option"><span class="service-option-icon" aria-hidden="true"><animate-icons name="${icon}" size="34" is-animated="false"></animate-icons></span><h3>${title}</h3><p>${copy}</p></article>`;
  if(s.module==='restaurant') return `<section class="module module-restaurant"><div class="section-shell"><p class="kicker">Reštaurácia a Bakery</p><h2>Čo si vyberiete?</h2><div class="service-option-grid">${card('utensils','Pri stole','Jedlo v historickej budove, v salóniku alebo na letnej terase. Stôl si podľa súčasného webu rezervujte telefonicky vopred.')}${card('coffee','Sladké z vlastnej výroby','Torty, dezerty a koláčiky majú samostatnú ponuku na webe Bakery Castel Mierovo.')}${card('gift','Catering a poukazy','Súčasný web uvádza sladký aj slaný catering a darčekové poukazy. Podmienky si overte u prevádzky.')}</div><div class="resource-block"><h3>Pozrite si ponuku</h3><div class="resource-links"><a href="https://new.castelmierovo.sk/assets/web_menu.pdf" target="_blank" rel="noopener noreferrer">Jedálny lístok <span aria-hidden="true">↗</span></a><a href="https://castelmierovo.sk/assets/web_napoje.pdf" target="_blank" rel="noopener noreferrer">Nápojový lístok <span aria-hidden="true">↗</span></a><a href="https://castelmierovo.sk/assets/web_vina.pdf" target="_blank" rel="noopener noreferrer">Vínny lístok <span aria-hidden="true">↗</span></a><a href="https://www.bakerycastelmierovo.sk/produkty" target="_blank" rel="noopener noreferrer">Produkty Bakery <span aria-hidden="true">↗</span></a><a href="https://www.bakerycastelmierovo.sk/kategorie/slany-catering" target="_blank" rel="noopener noreferrer">Slaný catering <span aria-hidden="true">↗</span></a><a href="https://www.bakerycastelmierovo.sk/produkt/darcekovy-poukaz" target="_blank" rel="noopener noreferrer">Darčekový poukaz <span aria-hidden="true">↗</span></a></div><p class="module-footnote">Externé odkazy vedú na aktuálne weby prevádzky. Obsah lístkov a dostupnosť produktov sa môžu zmeniť.</p></div></div></section>`;
  if(s.module==='rooms') return `<section class="module module-rooms"><div class="section-shell"><p class="kicker">Ubytovanie podľa súčasného webu</p><h2>Izby, apartmány a praktické údaje</h2><div class="service-option-grid">${card('house','Sedem izieb','Nefajčiarske izby s vlastnou kúpeľňou, televízorom, trezorom a minibarom. Vyberte podľa počtu hostí.')}${card('gift','Dva apartmány','Apartmán tvorí spálňa, obytná izba, kúpeľňa, predsieň a šatník; web ich odporúča aj rodinám.')}${card('coffee','Raňajky a pobyt','Súčasný web uvádza kontinentálne raňajky, parkovanie pred budovou a možnosť prístelky.')}</div><div class="price-block"><div><p class="kicker">Orientačný cenník</p><h3>Ceny uvedené na súčasnom webe</h3><p>Pred dopytom si overte aktuálnu cenu, termín a podmienky. Tento cenník nie je ponukou ani potvrdením dostupnosti.</p></div><table><caption>Cenník prevzatý z produkčnej stránky, platnosť čaká na potvrdenie</caption><tbody><tr><th scope="row">Apartmán</th><td>160 €</td></tr><tr><th scope="row">Izba</th><td>120 €</td></tr><tr><th scope="row">Izba pre jednu osobu</th><td>85 €</td></tr><tr><th scope="row">Prístelka</th><td>40 €</td></tr><tr><th scope="row">Neskorý odchod do 14:30</th><td>35 €</td></tr></tbody></table></div></div></section>`;
  if(s.module==='weddings') return `<section class="module module-weddings"><div class="section-shell"><p class="kicker">Podoba vášho dňa</p><h2>Vyberte priestor aj rytmus oslavy</h2><div class="service-option-grid">${card('house','Interiér','Slávnostná hostina v budove s pevnou oporou celého programu.')}${card('tent','Stan','Uvoľnený program s blízkosťou záhrady a možnosťou odlišného usporiadania.')}${card('utensils','Terasa','Vonkajšie stolovanie pod stromami s nadväznosťou na interiér.')}</div><div class="resource-block"><h3>Tri koncepcie zo súčasného webu</h3><div class="wedding-concepts"><p><strong>Klasická hostina</strong><span>Od privítania cez slávnostnú večeru, tortu až po večerný program.</span></p><p><strong>Poobedný brunch</strong><span>Neskorší obed, spoločný čas pri stole a voľnejší priebeh.</span></p><p><strong>Slávnostné posedenie</strong><span>Kratší program s jedlom, tortou a rodinným stretnutím.</span></p></div><p class="module-footnote">Možnosti úpravy programu, kapacitu a cenu potvrdí prevádzka.</p></div></div></section>`;
  if(s.module==='corporate') return `<section class="module module-corporate"><div class="section-shell"><p class="kicker">Pracovný deň aj oslavy tímu</p><h2>Priestor, technika a občerstvenie</h2><div class="service-option-grid">${card('presentation','Porady a školenia','Hlavná miestnosť alebo menší salónik s denným svetlom a flexibilným sedením. Súčasný web uvádza projektor, plátno, flipchart, tlačiareň a Wi-Fi.')}${card('coffee','Prestávky pri stole','Coffee break, obed, večera, zákusky aj slaný catering z vlastnej výroby podľa zvoleného formátu.')}${card('gift','Večierky a catering','Vianočné a firemné večierky, záhrada, stan či terasa. Web uvádza aj catering mimo areálu a darčekové balíčky.')}</div><p class="module-footnote">Kapacity, techniku a rozsah služieb treba potvrdiť pri príprave ponuky.</p></div></section>`;
  return `<section class="module module-family"><div class="section-shell"><p class="kicker">Príležitosti zo súčasného webu</p><h2>Čo môže mať u vás svoj deň</h2><div class="service-option-grid">${card('gift','Oslavy a jubileá','Narodeniny, výročia a rodinné stretnutia, od pokojného obeda po vlastný program.')}${card('utensils','Rodinné míľniky','Krstiny, prvé sväté prijímanie, birmovka, promócie, zásnuby aj koniec školského roka.')}${card('calendar-heart','Stôl aj spomienky','Jedlo, torty, dekorácie, ubytovanie a podľa webu aj tematické rodinné fotenie v dohodnutých termínoch.')}</div><p class="module-footnote">Konkrétne služby a termíny fotografovania potvrdí prevádzka.</p></div></section>`;
}
function serviceGallery(s) {
  const photos = servicePhotos[s.module];
  return `<section class="service-gallery" aria-labelledby="service-gallery-title"><div class="section-shell"><p class="kicker">Fotografie zo súčasného webu</p><h2 id="service-gallery-title">${s.module === 'weddings' ? 'Svadby v Castel Mierovo' : s.module === 'rooms' ? 'Pohľad do izieb a okolia' : s.module === 'restaurant' ? 'Pri stole a v záhrade' : s.module === 'corporate' ? 'Stretnutia a stolovanie' : 'Rodinné chvíle pri stole'}</h2><div class="service-gallery-grid">${photos.slice(1).map(([file,alt])=>`<figure><img src="${asset('service/'+file)}" alt="${alt}" loading="lazy" decoding="async"></figure>`).join('')}</div><p class="gallery-rights-note">Fotografie Castel Mierovo zo súčasného webu.</p></div></section>`;
}
function weddingReviews() {
  return `<section class="wedding-reviews"><div class="section-shell"><p class="kicker">Napísali o nás</p><h2>Hlasy zo svadobnej stránky</h2><div class="review-grid"><blockquote><p>„Krásne miesto na svadbu, jedinečná atmosféra, úžasné jedlo…“</p><footer>Michal s manželkou</footer></blockquote><blockquote><p>„Úžasné miesto s kúzelnou atmosférou a priateľským personálom…“</p><footer>Martina s manželom</footer></blockquote></div><p>Krátke úryvky referencií z <a href="https://castelmierovo.sk/svadby" target="_blank" rel="noopener noreferrer">aktuálnej svadobnej stránky ↗</a>. Súhlas s použitím referencií v novej prezentácii treba potvrdiť.</p></div></section>`;
}
function servicePage(s) {
  const placePhoto = servicePhotos[s.module][0];
  const closingHeadings = {
    restaurant: 'Dohodnite si miesto pri stole.',
    rooms: 'Napíšte nám termín vášho pobytu.',
    weddings: 'Začnite dátumom a predstavou o dni.',
    corporate: 'Povedzte nám, aké stretnutie plánujete.',
    family: 'Povedzte nám, čo oslavujete.'
  };
  return `<main id="main">
    <section class="service-hero service-hero--${s.module}" aria-labelledby="page-title"><div class="service-hero-copy"><a class="back-link" href="${path('')}#sluzby">← Všetky služby</a><p class="kicker">${s.eyebrow}</p><h1 id="page-title">${s.title}</h1><p class="lead">${s.intro}</p><a class="button button-dark" href="${contactUrl(s.slug)}">${s.cta} ${buttonIcon('move-right')}</a><p class="service-hero-note">Klientska ukážka · termíny a rozsah služieb potvrdí prevádzka</p></div>${image(s,'service-hero-image')}</section>
    <section class="service-story"><div class="section-shell service-story-grid"><div><p class="kicker">Miesto a možnosti</p><h2>${s.storyTitle}</h2><figure class="service-proof"><img src="${asset('service/'+placePhoto[0])}" alt="${placePhoto[1]}" loading="lazy" decoding="async"><figcaption>Fotografia zo súčasného webu Castel Mierovo</figcaption></figure></div><div class="service-story-content"><p class="large-copy">${s.story}</p><h3>${s.detailTitle}</h3><p>${s.detail}</p><a class="text-link" href="${contactUrl(s.slug)}">${s.cta} ${chevron}</a></div></div></section>
    ${moduleHtml(s)}
    ${serviceGallery(s)}
    ${s.module === 'weddings' ? weddingReviews() : ''}
    <section class="faq"><div class="section-shell faq-grid"><div><p class="kicker">Prakticky</p><h2>Pred rozhodnutím</h2></div><div>${s.faq.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></div></section>
    <section class="service-cta"><div class="section-shell"><p class="kicker">Váš ďalší krok</p><h2>${closingHeadings[s.module]}</h2><p>Kontaktný náhľad ukáže, aké údaje pomôžu pri prvom rozhovore. V tejto ukážke nič neodosiela ani nepotvrdzuje.</p><a class="button button-light" href="${contactUrl(s.slug)}">${s.cta} ${buttonIcon('move-right')}</a></div></section>
    <section class="other-services"><div class="section-shell"><p class="kicker">Ďalšie možnosti</p><h2>Preskúmajte aj</h2><div>${services.filter(other=>other.slug!==s.slug).map(other=>`<a href="${path(other.slug)}">${other.name} ${chevron}</a>`).join('')}</div></div></section>
  </main>`;
}
const contactTopics = {
  'restauracia-a-cukraren': { title:'Stôl v reštaurácii', lead:'Pri telefonáte pomôže dátum, čas a počet hostí.', items:['Požadovaný deň a čas','Počet hostí','Prípadné potreby pri stolovaní'], caveat:'Stôl sa rezervuje vopred. Toto demo telefonát nespúšťa.' },
  'izby-a-apartmany': { title:'Ubytovanie', lead:'Pri prvom dopyte pomôže termín, počet hostí a predstava o type izby.', items:['Termín pobytu','Počet hostí','Preferovaná izba alebo apartmán'], caveat:'Dostupnosť a cenu potvrdí až prevádzka.' },
  'svadby': { title:'Svadba', lead:'Začnite predbežným dátumom a predstavou o priebehu dňa.', items:['Predbežný dátum alebo obdobie','Približný počet hostí','Preferovaný priestor alebo typ oslavy'], caveat:'Dopyt nie je potvrdením termínu.' },
  'firemne-stretnutia': { title:'Firemné stretnutie', lead:'Pre zmysluplnú ponuku je dobré vedieť formát akcie a potreby účastníkov.', items:['Typ stretnutia a termín','Približný počet účastníkov','Potreba techniky, jedla či ubytovania'], caveat:'Techniku, kapacitu a cenu treba potvrdiť.' },
  'rodinne-podujatia': { title:'Rodinná oslava', lead:'Príležitosť a počet hostí pomôžu vybrať vhodný priestor.', items:['Typ oslavy','Predbežný dátum','Približný počet hostí'], caveat:'Dopyt negarantuje termín ani rozsah služieb.' }
};
function contactPage() {
  return `<main id="main"><section class="contact-hero"><div class="section-shell"><a class="back-link" href="${path('')}#sluzby">← Všetky služby</a><p class="kicker">Kontaktný náhľad</p><h1>Ako by sa začal rozhovor?</h1><p>Vyberte si tému a pozrite sa, čo by pomohlo pri prvom kontakte s Castel Mierovo.</p><div class="demo-warning" role="note"><strong>Toto je ukážka návrhu webu.</strong> Údaje nezbiera ani neodosiela. Žiadny termín ani rezerváciu nepotvrdzuje.</div></div></section>
  <section class="contact-workspace"><div class="section-shell contact-grid"><div class="topic-nav" role="group" aria-label="Vyberte tému kontaktu"><h2>Čo plánujete?</h2>${services.map(s=>`<button type="button" data-topic="${s.slug}">${s.name} <span aria-hidden="true">↗</span></button>`).join('')}</div><div class="topic-panel" id="topic-panel" aria-live="polite"></div></div></section>
  ${locationSection()}<section class="contact-foot"><div class="section-shell"><p>Aktuálne telefónne čísla, e-mail a otváracie hodiny si pred návštevou overte priamo u Castel Mierovo. Kontaktná integrácia patrí do prípadnej realizácie po dohode.</p><a class="text-link" href="${path('')}">Späť na úvod ${chevron}</a></div></section></main>`;
}

const app = document.getElementById('app');
app.innerHTML = header() + (page === 'home' ? home() : page === 'kontakt' ? contactPage() : servicePage(bySlug[page] || services[0])) + footer();

// Ikona reaguje na myš, klávesnicu aj dotyk; pri obmedzenom pohybe ostáva statická.
document.querySelectorAll('.button, .nav-contact, .index-item, .menu-toggle, .gallery-toggle, .calendar-controls button, .service-option').forEach(control => {
  const play = () => {
    if (control.disabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    control.querySelector('animate-icons')?.startAnimation?.();
  };
  control.addEventListener('pointerenter', play);
  control.addEventListener('focus', play);
  control.addEventListener('pointerdown', play);
});

const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('primary-nav');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  toggle.innerHTML = `${open ? 'Menu' : 'Zavrieť'} ${buttonIcon(open ? 'menu' : 'x')}`;
  nav.classList.toggle('open', !open);
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  if (toggle) { toggle.setAttribute('aria-expanded','false'); toggle.innerHTML=`Menu ${buttonIcon('menu')}`; nav.classList.remove('open'); }
}));

if(page === 'kontakt') {
  const buttons = [...document.querySelectorAll('[data-topic]')];
  const panel = document.getElementById('topic-panel');
  function selectTopic(slug) {
    const topic = contactTopics[slug] || contactTopics['restauracia-a-cukraren'];
    buttons.forEach(b => { const selected=b.dataset.topic===slug; b.classList.toggle('selected',selected); b.setAttribute('aria-pressed',String(selected)); });
    panel.innerHTML=`<p class="kicker">Navrhovaný prvý krok</p><h2>${topic.title}</h2><p class="topic-lead">${topic.lead}</p><h3>Čo si pripraviť</h3><ul>${topic.items.map(item=>`<li>${item}</li>`).join('')}</ul><p class="topic-caveat">${topic.caveat}</p><p class="topic-static">Náhľad obsahu, bez zadávania a odosielania údajov.</p>`;
  }
  buttons.forEach(b=>b.addEventListener('click',()=>selectTopic(b.dataset.topic)));
  const requested=new URLSearchParams(location.search).get('tema');
  selectTopic(requested in contactTopics ? requested : 'restauracia-a-cukraren');
}

if (page === 'home') {
  const gallery = document.querySelector('.gallery-section');
  const galleryToggle = gallery?.querySelector('.gallery-toggle');
  galleryToggle?.addEventListener('click', () => {
    const paused = gallery.classList.toggle('is-paused');
    galleryToggle.setAttribute('aria-pressed', String(paused));
    galleryToggle.setAttribute('aria-label', paused ? 'Spustiť posúvanie fotografií' : 'Zastaviť posúvanie fotografií');
    galleryToggle.innerHTML = buttonIcon(paused ? 'play' : 'pause');
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const toIso = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const fromIso = value => { const [year, month, day] = value.split('-').map(Number); return new Date(year, month - 1, day); };
  const longDate = date => new Intl.DateTimeFormat('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  const sampleEvents = [
    { offset: 3, title: 'Večer pri stole' },
    { offset: 9, title: 'Sladké popoludnie' },
    { offset: 16, title: 'Rodinné stretnutie' }
  ].map(({ offset, title }) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    return { date: toIso(date), title };
  });
  const eventByDate = Object.fromEntries(sampleEvents.map(item => [item.date, item.title]));
  const dateInput = document.getElementById('inquiry-date');
  const monthHeading = document.getElementById('calendar-month');
  const grid = document.getElementById('calendar-grid');
  const selection = document.getElementById('calendar-selection');
  const prev = document.getElementById('calendar-prev');
  const next = document.getElementById('calendar-next');
  const firstAllowedMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let calendarMonth = new Date(firstAllowedMonth);
  let selectedDate = '';
  dateInput.min = toIso(today);

  function renderCalendar() {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const start = (new Date(year, month, 1).getDay() + 6) % 7;
    const days = new Date(year, month + 1, 0).getDate();
    monthHeading.textContent = new Intl.DateTimeFormat('sk-SK', { month: 'long', year: 'numeric' }).format(calendarMonth);
    prev.disabled = calendarMonth.getTime() <= firstAllowedMonth.getTime();
    grid.innerHTML = `${Array.from({ length: start }, () => '<span class="calendar-empty" aria-hidden="true"></span>').join('')}${Array.from({ length: days }, (_, index) => {
      const date = new Date(year, month, index + 1);
      const iso = toIso(date);
      const eventTitle = eventByDate[iso];
      const past = date < today;
      return `<button type="button" class="calendar-day${eventTitle ? ' has-event' : ''}${iso === selectedDate ? ' is-selected' : ''}" data-date="${iso}" aria-label="${longDate(date)}${eventTitle ? `, ukážkové podujatie ${eventTitle}` : ''}${past ? ', uplynulý deň' : ', vybrať pre dopyt'}" aria-pressed="${iso === selectedDate}"${past ? ' disabled' : ''}><span class="calendar-day-number">${index + 1}</span>${eventTitle ? `<span class="calendar-event-title">${eventTitle}</span>` : ''}</button>`;
    }).join('')}`;
    grid.querySelectorAll('[data-date]:not([disabled])').forEach(button => button.addEventListener('click', () => selectDate(button.dataset.date, true)));
  }
  function selectDate(iso, focusDay = false) {
    selectedDate = iso;
    const date = fromIso(iso);
    calendarMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    dateInput.value = iso;
    selection.textContent = `${eventByDate[iso] ? `Ukážkové podujatie „${eventByDate[iso]}“. ` : ''}${longDate(date)} je predbežný dátum vášho dopytu. Dostupnosť nie je potvrdená.`;
    renderCalendar();
    if (focusDay) grid.querySelector(`[data-date="${iso}"]`)?.focus();
  }
  prev.addEventListener('click', () => { calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1); renderCalendar(); });
  next.addEventListener('click', () => { calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1); renderCalendar(); });
  dateInput.addEventListener('change', () => {
    if (!dateInput.value) { selectedDate = ''; selection.textContent = 'Zatiaľ nemáte vybraný dátum.'; renderCalendar(); return; }
    if (dateInput.validity.valid && fromIso(dateInput.value) >= today) selectDate(dateInput.value);
  });
  renderCalendar();

  const form = document.getElementById('demo-inquiry-form');
  const status = document.getElementById('inquiry-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    status.hidden = false;
    status.textContent = 'Polia sú vyplnené. Toto je však iba ukážka: dopyt sa neodoslal, údaje sa neuložili a rezervácia nevznikla.';
  });
}

// Ak odhaľovanie nie je dostupné alebo je pohyb obmedzený, nevkladaj skryté stavy.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealTargets = document.querySelectorAll(
    '.story, .calendar-intro, .calendar-layout, .inquiry-intro, .service-story-grid, .module .section-shell, .faq-grid'
  );
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('reveal-pending');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px 100px 0px', threshold: 0.05 });

  revealTargets.forEach(element => {
    if (element.getBoundingClientRect().top <= window.innerHeight + 80) return;
    element.classList.add('reveal-motion', 'reveal-pending');
    revealObserver.observe(element);
  });
}
