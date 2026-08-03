# Pezinské tehelne – návrh nového prezentačného webu

Kompletný statický návrh v slovenčine. Web funguje bez frameworku a build procesu, používa sémantické HTML, jeden zdieľaný CSS súbor, malé množstvo čistého JavaScriptu a lokálne optimalizované obrázky.

## Spustenie

Najjednoduchšie je otvoriť `index.html` priamo v prehliadači. Pre presnejšie lokálne testovanie možno v priečinku projektu spustiť ľubovoľný jednoduchý HTTP server, napríklad:

```text
python3 -m http.server 8080
```

Potom otvorte `http://localhost:8080/`.

## Stručná analýza pôvodného webu

### Firma a ponuka

Pezinské tehelne – Paneláreň, a.s. vyrábajú kompletný sortiment pálených murovacích materiálov pre obvodové murivo, nosné steny, priečky, akustické a ostatné murivo. Sortiment dopĺňajú keramické nosníky s priestorovou výstužou, keramické stropné vložky a keramické preklady.

Hlavné produktové skupiny:

- tehly TermoBRIK vrátane radov SUPRA, SUPRA PLUS, Brúsená, DRYsystem, Nebrúsená, AKUSTIK a AKUSTIK PLUS,
- keramický stropný systém TermoBRIK,
- nosné keramické preklady KP 23,8,
- nenosné keramické preklady KP 12.

Hlavné služby:

- technické poradenstvo pri spracovaní projektovej dokumentácie,
- bezplatný orientačný výpočet spotreby materiálu TermoBRIK pre hrubú stavbu,
- výpis prvkov stropného systému a kladačský plán,
- prístup k technickým listom, vyhláseniam o parametroch, certifikátom, pracovným postupom, technickej príručke a CAD detailom.

### Pravdepodobné cieľové skupiny

Nasledujúce skupiny sú odvodené z ponuky a charakteru služieb, nie sú explicitne definované pôvodným webom:

- súkromní investori a stavebníci rodinných domov,
- stavebné firmy a realizačné tímy,
- projektanti, architekti a statici,
- stavebniny, zmluvní predajcovia a obchodní partneri,
- investori bytových a iných pozemných stavieb.

### Hodnota a dôveryhodnosť

Overiteľné silné stránky obsahu:

- ucelená ponuka pre hlavné časti hrubej stavby,
- tri opísané výrobné strediská: PE II, OK-1 a Paneláreň,
- technické poradenstvo a práca s projektovou dokumentáciou,
- bezplatné výpočtové služby v rozsahu a za podmienok uvedených na pôvodnom webe,
- verejne dostupné technické dokumenty a certifikáty,
- dlhá pezinská tehliarska tradícia; prvá písomná zmienka je z roku 1615 a pôvodný web uvádza založenie pezinskej tehelne v roku 1872,
- priame kontakty na obchodných zástupcov podľa regiónov.

### Pravdepodobný konverzný cieľ

Hlavným cieľom má byť kvalifikovaný dopyt: návštevník si vyberie časť stavby alebo službu, pošle základné údaje o projekte a následne projektovú dokumentáciu. Sekundárne ciele sú telefonický kontakt na správneho zástupcu a stiahnutie technických podkladov.

## Najväčšie slabé miesta pôvodného webu

1. Obrovský prekryvný oznam na priloženom screenshote zakrýva takmer celý obsah aj hlavné menu. Zároveň súťaží s cookie panelom, takže používateľ pri prvej návšteve rieši dve vrstvy namiesto ponuky firmy.
2. Domovská stránka komunikuje všeobecné heslo, no nevysvetlí rýchlo, pre koho je ponuka, aké časti stavby pokrýva a aký je ďalší krok.
3. Navigácia má veľa vnorených úrovní a technických názvov. Cesta k riešeniu podľa potreby stavby je zbytočne dlhá.
4. Produktová časť pôsobí ako e-shop s radením podľa ceny a hodnotenia, hoci pri produktoch nie je jasná nákupná cesta. Pre dopytový web je vhodnejší výber podľa použitia a projektu.
5. Hlavné CTA nie je konzistentné. Cenník, produkty, kontakty a regionálni zástupcovia sú roztrúsení a neskladajú jednu konverznú cestu.
6. Pôvodný web zobrazuje v menu chybný rýchly kontakt `+61 (0) 3 8376 6284`, ktorý pôsobí ako neodstránený údaj zo šablóny. V novom návrhu sa nepoužíva.
7. Vizuál je nekonzistentný: veľké množstvo štýlov, staršie fotografie rôzneho pomeru a kvality, prázdne alebo generické alternatívne texty a text `OLYMPUS DIGITAL CAMERA` v galérii.
8. Dôveryhodnostné prvky existujú, ale sú schované hlboko v sekcii na stiahnutie. Certifikáty, výrobné zázemie a technická podpora by mali byť viditeľné skôr.
9. Kontaktná stránka obsahuje veľa oddelení bez jasnej hierarchie. Používateľ musí sám určiť, komu napísať.
10. Niektoré obsahové a technické stopy pôsobia zastarano alebo nedotiahnuto: duplicity, veľmi staré komponenty webu, preklep v názve environmentálnej sekcie a položky šablóny v angličtine.
11. Veľký modal a hustá navigácia predstavujú vysoké riziko problémov na mobile. Tento bod treba pri pôvodnom webe overiť na reálnych zariadeniach; samotný screenshot dokumentuje problém na širokej obrazovke.
12. SEO je oslabené všeobecnými textami, hlbokou a duplicitnou informačnou architektúrou a slabým previazaním produktov na dopytovú potrebu.

## Hlavné UX/UI rozhodnutia

### Informačná architektúra

Navigácia je zredukovaná na šesť položiek:

1. Domov
2. Produkty
3. Služby
4. Spoločnosť
5. Dokumenty
6. Kontakt

Produkty sa najprv vyberajú podľa časti stavby: obvodová stena, nosná stena, priečka, akustické murivo, strop alebo preklad. Technické názvy prichádzajú až v druhom kroku.

### Poradie domovskej stránky

1. jasná ponuka a dve hlavné CTA,
2. tri overiteľné dôvody dôvery,
3. rýchla voľba podľa potreby stavby,
4. tri produktové piliere,
5. bezplatný výpočet spotreby,
6. spoločnosť a výrobné zázemie,
7. fotografie z pôvodnej galérie,
8. FAQ,
9. kontaktné CTA.

### Konverzná cesta

```text
Potreba stavby → skupina výrobkov → technické podklady → služba/výpočet → dopyt → regionálny alebo centrálny kontakt
```

### CTA

- hlavné: `Požiadať o výpočet`, `Odoslať dopyt`,
- sekundárne: `Vybrať riešenie`, `Pozrieť technické podklady`, `Nájsť zástupcu`,
- na mobile je trvalo dostupné volanie a dopyt.

### Vizuálny smer

- tmavozelená ako technická a dôveryhodná základná farba,
- tehlová oranžová prevzatá z identity firmy ako konverzný akcent,
- teplé neutrálne pozadie namiesto čistej šablónovej sivej,
- výrazná úzka typografia nadpisov a pokojná systémová typografia textov,
- veľké plochy, jasná hierarchia, minimum dekorácií,
- žiadne externé fonty, knižnice ikon ani hotlinkované obrázky.

### Responzivita a prístupnosť

- desktop: široký dvojstĺpcový hero a trojstĺpcové prehľady,
- tablet: dvojstĺpcové karty a jednosmerná navigácia obsahu,
- mobil: jedný stĺpec, plnohodnotné CTA, trvalá kontaktná lišta,
- skip link, sémantické nadpisy, viditeľné focus stavy, ovládanie menu klávesnicou a klávesom Escape,
- rešpektovanie `prefers-reduced-motion`,
- natívne HTML validácie formulára a oznam cez `aria-live`.

## Formulár

Formulár zámerne nič neodosiela. JavaScript iba skontroluje natívnu HTML validáciu a zobrazí informáciu, že ide o statickú ukážku.

Pre produkčné nasadenie:

1. vyberte formulárovú službu alebo vlastný backend,
2. doplňte do elementu `<form>` metódu a cieľový `action`,
3. odstráňte atribút `data-static-form` alebo upravte obsluhu v `assets/js/main.js`,
4. nastavte serverovú validáciu, antispam a spracovanie súhlasu,
5. ak pridáte upload projektu, obmedzte typy, počet a veľkosť súborov a nastavte bezpečné úložisko,
6. až potom zmeňte text, ktorý návštevníka upozorňuje na neodosielanie údajov.

## Obrázky a zdroje

Všetky použité obrázky a logo pochádzajú z pôvodného webu spoločnosti a boli uložené lokálne. Neboli použité ilustračné fotografie z fotobánk. Pred produkčným nasadením treba potvrdiť, že spoločnosť má práva na ďalšie použitie všetkých fotografií z pôvodnej galérie.

Použité zdroje:

- logo: `https://www.pezinske-tehelne.sk/wp-content/uploads/2018/02/logoweb.png`
- hero fotografia: `https://www.pezinske-tehelne.sk/wp-content/uploads/2018/02/fotoslider2.jpg`
- produkt TermoBRIK: `https://www.pezinske-tehelne.sk/wp-content/uploads/2016/01/240-Akustik-Plus-2.jpg`
- výrobný areál: `https://www.pezinske-tehelne.sk/wp-content/uploads/2018/02/halda.jpg`
- keramické preklady: `https://www.pezinske-tehelne.sk/wp-content/uploads/2018/02/g_preklady_02.jpg`
- keramické nosníky: `https://www.pezinske-tehelne.sk/wp-content/uploads/2018/02/g_nosniky_05.jpg`
- galéria 1: `https://www.pezinske-tehelne.sk/wp-content/uploads/2018/02/g_referencie_01.jpg`
- galéria 2: `https://www.pezinske-tehelne.sk/wp-content/uploads/2018/02/g_referencie_03_zilinska1.jpg`
- galéria 3: `https://www.pezinske-tehelne.sk/wp-content/uploads/2018/02/g_referencie_06_zilinska4.jpg`
- katalóg: `https://www.pezinske-tehelne.sk/wp-content/uploads/2026/03/katalog_Tehelne_2025.pdf`

Rastrové fotografie boli skonvertované do WebP. Logo zostalo v pôvodnom PNG s priehľadným pozadím.

## Externé odkazy

Samotné stránky, štýly, skripty, obrázky, logo a katalóg fungujú bez súborov mimo projektu. Odkazy na technické listy, vyhlásenia o parametroch, certifikáty, pracovné postupy, príručku, CAD detaily, reklamačný poriadok, zásady ochrany osobných údajov a mapu vedú na externé aktuálne zdroje. To je zámerné, aby sa v ZIP archíve nezachovali neaktuálne legislatívne dokumenty.

## Čo treba potvrdiť alebo doplniť

Pred produkčným nasadením je potrebné potvrdiť:

- aktuálnosť katalógu: serverová cesta je z roku 2026, názov súboru obsahuje rok 2025,
- aktuálnosť cien; nový web žiadne ceny neuvádza,
- platnosť konkrétnych certifikátov a presné normy priamo z PDF dokumentov,
- aktuálnosť mien, telefónov, e-mailov a rozdelenia okresov obchodných zástupcov,
- či e-mail pre logistiku má byť `objednavky@pezinske-tehelne.sk` alebo všeobecný `info@pezinske-tehelne.sk`; aktuálna kontaktná stránka používa prvý, starý prekryvný oznam druhý,
- práva na použitie loga a fotografií z pôvodného webu,
- finálnu formulárovú službu alebo backend,
- finálny text súhlasu, ochrany osobných údajov a cookie režim podľa skutočne nasadených služieb,
- analytiku, meranie konverzií a prípadné reklamné integrácie,
- finálnu doménu pre canonical URL, Open Graph obrázok, sitemap a Search Console,
- či má nový web obsahovať úplnú databázu každého rozmeru výrobku; tento návrh používa konverzne zrozumiteľné produktové skupiny a aktuálny PDF katalóg,
- názvy, lokality a popisy referenčných projektov; preto sú dnes fotografie označené iba ako zábery z pôvodnej galérie.

## Štruktúra projektu

```text
pezinske-tehelne-redesign/
├── index.html
├── produkty.html
├── sluzby.html
├── spolocnost.html
├── dokumenty.html
├── kontakt.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero-building.webp
│   │   ├── factory.webp
│   │   ├── termobrik.webp
│   │   ├── nosniky.webp
│   │   ├── preklady.webp
│   │   ├── realizacia-1.webp
│   │   ├── realizacia-2.webp
│   │   └── realizacia-3.webp
│   └── docs/
│       └── katalog-termobrik.pdf
└── README.md
```

## Vykonaná kontrola

Overené automaticky:

- všetkých 6 HTML stránok má práve jeden hlavný nadpis `h1`, titulok a meta description,
- všetky interné odkazy, obrázky, štýly, skripty a lokálny PDF dokument existujú,
- žiadny obrázok sa nenačítava z externého servera,
- všetky obrázky majú `alt` atribút a formulárové popisy smerujú na existujúce polia,
- na stránkach nie sú duplicitné ID,
- JavaScript prešiel syntaktickou kontrolou,
- hlavné farebné kombinácie vrátane primárneho tlačidla a bežného sekundárneho textu dosahujú kontrast WCAG AA,
- lokálny server správne poskytol domovskú stránku,
- obrázky majú spolu približne 516 kB; PDF katalóg približne 4,4 MB.

Vizuálna kontrola v ovládanom prehliadači bola spustená, ale prostredie zablokovalo prístup k pôvodnej aj lokálnej adrese bezpečnostnou kontrolou. Nebol použitý obchádzkový prehliadač. Pred produkčným nasadením preto treba urobiť posledný manuálny render na šírkach približne 1440 px, 768 px a 390 px a overiť reálne kliknutie na mobilné menu, produktové filtre a formulár. Responzívne pravidlá, focus stavy a validácia sú implementované, no toto obmedzenie znamená, že nie je poctivé deklarovať hotový pixelový browser QA.

## Obsahové zdroje

- domovská stránka: `https://www.pezinske-tehelne.sk/`
- spoločnosť: `https://www.pezinske-tehelne.sk/spolocnost/`
- výrobné strediská: `https://www.pezinske-tehelne.sk/vyrobne-strediska/`
- dejiny tehliarstva: `https://www.pezinske-tehelne.sk/dejiny-tehliarstva-v-pezinku-2/`
- produkty: `https://www.pezinske-tehelne.sk/obchod/`
- služby: `https://www.pezinske-tehelne.sk/sluzby/`
- certifikáty: `https://www.pezinske-tehelne.sk/legislativa/certifikaty/`
- obchodní zástupcovia: `https://www.pezinske-tehelne.sk/obchodni-zastupcovia/`
- kontakt: `https://www.pezinske-tehelne.sk/kontakt/`
