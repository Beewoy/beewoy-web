# EUROBETON – návrh nového prezentačného webu

Kompletný statický web v slovenčine. Nevyžaduje framework, zostavenie ani externé knižnice. Otvorte `index.html` priamo v prehliadači alebo projekt spustite cez ľubovoľný jednoduchý lokálny server.

## Čo projekt obsahuje

- `index.html` – domovská stránka zameraná na dopyty,
- `sluzby.html` – betón, doprava, čerpanie, PUMI, kamenivo a dokumenty,
- `o-nas.html` – firma, výrobná technológia, recyklácia a partneri,
- `kontakt.html` – reálne kontakty, otváracie hodiny a dopytový formulár,
- `ochrana-osobnych-udajov.html` – jasne označená pracovná stránka, ktorú treba doplniť schváleným právnym textom,
- `assets/css/styles.css` – celý responzívny vizuál,
- `assets/js/main.js` – mobilné menu, rok v pätičke a správanie statického formulára,
- `assets/images/` – lokálne firemné logo a optimalizované fotografie,
- `assets/documents/` – lokálne kópie cenníkov a certifikátov,
- `robots.txt` a `sitemap.xml` – základná SEO príprava.

## Stručná analýza pôvodného webu

EUROBETON plus s.r.o. prevádzkuje betonáreň v Senci. Hlavnou činnosťou je výroba certifikovaných betónových zmesí. Ponuku dopĺňa vlastná doprava a čerpanie betónu, PUMI (domiešavač s pumpou), predaj a doprava ťaženého a drveného kameniva, štrkopieskov a ďalších sypkých materiálov.

Pravdepodobnými zákazníkmi sú stavebné a podlahárske firmy, realizátori rodinných domov a rekonštrukcií aj zákazníci, ktorí potrebujú kamenivo s dopravou. Hlavným konverzným cieľom je objednávka alebo kvalifikovaný dopyt telefonicky či e-mailom.

Overené hodnotové prvky:

- plnoautomatická technológia BHS 2.0 s kapacitou 80 m³/h,
- automatické dávkovanie a váženie s možnosťou spätnej kontroly dodávky,
- opatrenia pre zimnú prevádzku,
- vlastné autodomiešavače, betonpumpy a sklápače,
- certifikáty a verejné cenníky,
- certifikovaná váha TAMTRON pre kamenivo,
- uvedení referenční partneri zo stavebného a podlahárskeho segmentu.

### Hlavné slabiny pôvodného webu

- Domovská stránka začína všeobecným nadpisom „Úvod“ a nekomunikuje hneď hlavný prínos ani objednávkovú cestu.
- Navigácia má viac vnorených položiek a kľúčové dokumenty, služby a kontakty sú rozptýlené.
- Primárne CTA pre objednávku alebo dopyt nie je dostatočne výrazné a opakované v správnych miestach.
- Rozloženie, typografia, starší carousel a postranný blok aktualít pôsobia zastarano a odvádzajú pozornosť od ponuky.
- Na mobiloch sú položky menu a hustý obsah náročnejšie na skenovanie; niektoré odkazy a kontakty sú technicky nekonzistentné.
- Veľa staršieho HTML obsahuje vnorené tabuľky, inline štýly, zastarané značky a nepresné alebo opakované SEO kľúčové slová.
- Partneri sú prezentovaní iba logami bez kontextu a referencie neobsahujú detail zákazky, rozsah alebo výsledok.
- Kontakt neobsahuje kvalifikačný formulár, ktorý by vopred získal množstvo, miesto, termín a požiadavku na čerpanie.

## Hlavné UX/UI rozhodnutia

- Hlavná stránka okamžite vysvetľuje výsledok: betón vyrobiť, dopraviť a načerpať.
- Obsah je rozdelený do troch zrozumiteľných pilierov: betón, doprava/čerpanie a kamenivo.
- Telefón je viditeľný v hornej lište, hero sekcii, CTA pruhoch, pätičke a na mobile v stále dostupnej spodnej lište.
- Dopytová cesta vysvetľuje, aké údaje si zákazník pripraviť. Tým sa zvyšuje kvalita kontaktov.
- Cenníky a certifikáty sú uložené lokálne a dostupné z hlavnej navigácie.
- Namiesto fotobankových záberov sú použité fotografie z existujúceho firemného webu, aby sa realizácie a technika neprezentovali zavádzajúco.
- Vizuál používa tmavomodrú a bielu s jedným žltým konverzným akcentom. Typografia používa systémové fonty a web nemá externú fontovú závislosť.
- Rozhranie má viditeľné focus stavy, skip link, sémantické nadpisy, ovládanie menu klávesnicou, natívnu validáciu formulára a podporu `prefers-reduced-motion`.

## Dôležité: formulár zatiaľ neodosiela

Formulár je úmyselne statický. Kontroluje povinné polia, ale po odoslaní zobrazí správu s telefónom a e-mailom. Nepredstiera úspešné odoslanie.

Pred nasadením:

1. zvoľte formulárovú službu alebo vlastný backend,
2. doplňte `action`/API integráciu a serverovú validáciu,
3. nastavte ochranu proti spamu,
4. nahraďte pracovný súhlas schváleným právnym textom,
5. odoslanie otestujte vrátane chybových stavov a potvrdenia pre zákazníka.

## Veci, ktoré treba potvrdiť alebo doplniť

1. Aktuálne IČO, DIČ/IČ DPH a presný právny text v pätičke a zásadách ochrany údajov.
2. Schválené znenie ochrany osobných údajov a cookies podľa reálne nasadených služieb.
3. Formulárový backend, cieľová e-mailová adresa a interný postup spracovania dopytov.
4. Aktuálny obsluhovaný región, dodacie lehoty a podmienky objednávky – pôvodný web ich presne neuvádza.
5. Aktuálnosť strojového parku, partnerov, názvov noriem, certifikátov a cenníkov v deň nasadenia.
6. Súhlas s použitím fotografií, loga a názvov partnerov. Podklady pochádzajú z firemného webu, ale vlastníctvo práv treba potvrdiť.
7. Či má byť na novom webe analytika, mapa vložená priamo do stránky, správa cookies a napojenie sociálnych sietí.

## Pôvod obrázkov a dokumentov

Všetky fotografie a logo pochádzajú z verejného webu EUROBETON. Boli použité ako pravdepodobné firemné podklady, nie ako fotobankové ilustrácie, a fotografie boli lokálne optimalizované do WebP. Pred ostrým nasadením potvrďte licenciu a právo ďalšieho použitia.

- Logo: <https://www.eurobeton.sk/design/images/logo4.png>
- Hero/areál: <https://www.eurobeton.sk/repository/images/1-min.jpg>
- Betonáreň: <https://www.eurobeton.sk/repository/images/Betonaren-EUROBETON-Senec.jpg>
- Výrobná technológia: <https://www.eurobeton.sk/repository/images/IMG_6730.jpg>
- Čerpanie betónu: <https://www.eurobeton.sk/repository/images/Betonaz_Log.Park_Senec.JPG>
- PUMI: <https://www.eurobeton.sk/repository/images/1212.jpg>
- Doprava kameniva: <https://www.eurobeton.sk/repository/images/MAN-6x6-sklapac1.JPG>
- Kamenivo: <https://www.eurobeton.sk/repository/images/Makadan-0-63.jpg>

Lokálne PDF súbory boli stiahnuté z pôvodného webu 2. 8. 2026:

- <https://www.eurobeton.sk/repository/download/cennik-betonov-dopravy-a-cerpadiel-od-1.3.2026.pdf>
- <https://www.eurobeton.sk/repository/download/cennik-kameniva-platny-od-1.3.2026.pdf>
- <https://www.eurobeton.sk/repository/download/beton-206%2BA2-certifikat-15.5.2026.pdf>
- <https://www.eurobeton.sk/repository/download/CBGM-certifikat-15.5.2026.pdf>
- <https://www.eurobeton.sk/repository/download/CB-III-certifikat-15.5.2026.pdf>
- <https://www.eurobeton.sk/repository/download/medzerovity-beton-certifikat-15.5.2026.pdf>

## Obsahové zdroje

Analýza a texty vychádzajú z týchto verejných stránok:

- <https://www.eurobeton.sk/>
- <https://www.eurobeton.sk/profil-spolocnosti.htm>
- <https://www.eurobeton.sk/technologia.htm>
- <https://www.eurobeton.sk/vyroba-betonu.htm>
- <https://www.eurobeton.sk/doprava-betonu.htm>
- <https://www.eurobeton.sk/pumi-domiesavac-s-pumpou.htm>
- <https://www.eurobeton.sk/kamenivo.htm>
- <https://www.eurobeton.sk/kamenivodoprava.htm>
- <https://www.eurobeton.sk/referencie.htm>
- <https://www.eurobeton.sk/kontakt.htm>

## Kontrolný zoznam pred publikovaním

- potvrdiť všetky firemné a právne údaje,
- aktualizovať cenníky a certifikáty,
- pripojiť a end-to-end otestovať formulár,
- nastaviť finálne canonical URL a prípadné presmerovania starých adries,
- optimalizovať hostingovú cache a kompresiu,
- otestovať na reálnych mobilných zariadeniach a v podporovaných prehliadačoch,
- po produkčnom nasadení skontrolovať indexáciu, Core Web Vitals a chybné odkazy.

## Vykonaná technická kontrola

- overená existencia všetkých lokálnych odkazov, kotiev, obrázkov, dokumentov, CSS a JavaScript súborov,
- overené jedinečné ID prvkov a presne jeden nadpis H1 na každej HTML stránke,
- overené popisy stránky, `lang="sk"`, viewport a skip link na každej stránke,
- overené labely pre všetkých 9 formulárových ovládacích prvkov,
- overená syntax JavaScriptu a párovanie blokov v CSS,
- overené, že stránka nehotlinkuje obrázky ani externé štýly,
- responzívne pravidlá sú pripravené pre desktop, užší desktop/tablet a mobil v breakpointoch 1080, 960 a 620 px,
- hlavné farebné kombinácie dosahujú kontrast približne 5,70:1 až 17,01:1,
- všetky fotografie používané webom sú lokálne WebP; spolu majú približne 1 MB,
- lokálne PDF dokumenty boli overené ako platné PDF súbory.

Automatické otvorenie lokálnej ukážky v zabudovanom prehliadači bolo zablokované bezpečnostnou politikou prostredia. Finálnu vizuálnu kontrolu na reálnom mobile, tablete a desktope preto treba zopakovať pred produkčným nasadením; nejde o náhradu testovania na zariadeniach.
