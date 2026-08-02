# CHESTREAL PROGRESS — návrh statického webu

Kompletný responzívny návrh prezentačného webu v slovenčine. Projekt nevyžaduje build proces, framework ani externé súbory. Hlavný cieľ návrhu je získanie relevantného technického dopytu.

## 1. Zhrnutie analýzy pôvodného webu

### Firma a ponuka

CHESTREAL PROGRESS a.s. sa venuje filtrácii vzduchu, strojnej a stavebnej údržbe pre priemysel. Spoločnosť uvádza, že pokračuje v tradícii Chestreal a.s. založenej v roku 1996. Ponuka je rozdelená najmä do týchto oblastí:

- vzduchové filtre, stacionárne a mobilné filtračné zariadenia vrátane jadrového programu,
- ochrana, sanácia a izolácia betónových konštrukcií,
- priemyselné podlahové systémy,
- ochrana kovov a technologických zariadení,
- tesniaci program a hydraulické/pneumatické tesnenia,
- strojná údržba a produkty pre údržbu,
- bezprašné otryskávanie SPONGE‑JET a ďalšie progresívne technológie.

Pravdepodobná cieľová skupina: technickí riaditelia, vedúci údržby, prevádzkoví inžinieri, projektanti a nákupcovia priemyselných podnikov — najmä v energetike a jadrovej energetike, chemickom, hutníckom, papierenskom a ďalšom výrobnom priemysle. Ide o záver odvodený zo zverejnených služieb a referencií.

Hlavná hodnota firmy je v kombinácii analýzy stavu, technického návrhu, dokumentácie, dodávky, realizácie a následného servisu. Dôležité dôkazy predstavujú historické realizácie, tri odborné divízie, zverejnená politika IMS, Etický kódex, platný certifikát ISO 45001:2018 a oprávnenie organizácie ČEZ.

Pravdepodobný hlavný konverzný cieľ pôvodného aj nového webu je technická konzultácia a relevantný dopyt na konkrétne zariadenie, konštrukciu alebo prevádzkový problém.

### Slabé miesta pôvodného webu

- Domovská stránka ponúka široký katalóg názvov služieb, no nevysvetľuje, pre koho sú, aký problém riešia a aký má byť ďalší krok.
- Chýba dominantná výzva na technickú konzultáciu a kontaktný formulár; kontakt je oddelený v navigácii a pätičke.
- Silné referencie a výsledky sú ukryté na viacerých podstránkach a na domovskej stránke nie sú zhrnuté.
- Automatický obrazový slider, čiernobiele dlaždice s efektom pri prejdení myšou a prevažne verzálkové nadpisy pôsobia zastarano a zhoršujú rýchle skenovanie obsahu.
- Informačná architektúra je veľmi široká: služby, produktové kategórie a podkategórie sú rozdelené do veľkého počtu stránok bez jasnej prioritizácie.
- Viaceré obrázky služieb a certifikátov majú prázdny alternatívny text, čo oslabuje prístupnosť a význam obrázkov pre vyhľadávače.
- Logo má v zdrojovom štýle pevnú šírku 300 px a staršie blokové rozloženia nie sú optimálne prispôsobené malej obrazovke.
- Web načítava WordPress tému, doplnky, slider, jQuery a externé fonty. Na jednoduchý prezentačný web je to zbytočne veľa vrstiev a potenciálnych bodov spomalenia.
- Sekcia dôveryhodnosti je umiestnená až za dlhým zoznamom služieb a nerozlišuje aktuálne a staršie dokumenty.
- Zverejnené certifikáty ISO 9001 a ISO 14001 uvádzajú platnosť do 15. 7. 2025. V roku 2026 by ich web nemal prezentovať ako aktuálne bez nových dokumentov.
- Na podstránkach sú dlhé nečlenené odseky, jazykové a typografické nepresnosti a staršie referencie bez stručných výsledkov či novších prípadových štúdií.

## 2. Hlavné UX/UI rozhodnutia

- **Jedna hlavná konverzia:** „Konzultovať technický problém“ vedie na formulár technického dopytu.
- **Ponuka zoskupená do šiestich zrozumiteľných oblastí:** návštevník nemusí prechádzať množstvo produktových podstránok, aby pochopil rozsah služieb.
- **Dôkazy pred detailmi:** na domovskej stránke sú zvýraznené zverejnené objemy realizácií, reálne fotografie, dokumenty a historické referencie.
- **Transparentné certifikáty:** aktuálne dokumenty majú uvedenú platnosť; ISO 9001 a ISO 14001 sú označené ako podklady na aktualizáciu, nie ako platné certifikáty.
- **Konverzná cesta:** problém → vhodná oblasť služby → spôsob spolupráce → dôkazy → technický dopyt.
- **Vizuálny smer:** tmavá priemyselná zelená, svetlé neutrálne plochy a jasný zelený akcent vychádzajú z pôvodnej značky, ale pôsobia modernejšie a technickejšie.
- **Typografia:** systémové písmo bez externého načítania zvyšuje rýchlosť; kondenzovaný charakter nadpisov podporuje technický vizuál bez zhoršenia čitateľnosti textu.
- **Reálne fotografie:** použité sú iba fotografie z pôvodného firemného webu, aby nevznikol dojem falošných realizácií.
- **Responzívny návrh:** desktop používa viacstĺpcové rozloženie, tablet znižuje počet stĺpcov a mobil prechádza na jednu kolónu s veľkými dotykovými cieľmi a plnohodnotným menu.
- **Prístupnosť:** sémantické nadpisy, skip link, viditeľný focus, ovládanie menu klávesnicou, natívne FAQ prvky, popisy obrázkov a rešpektovanie `prefers-reduced-motion`.

## 3. Čo treba potvrdiť alebo doplniť

Pred ostrým publikovaním odporúčame potvrdiť:

1. aktuálne certifikáty ISO 9001 a ISO 14001 (zverejnené verzie skončili 15. 7. 2025),
2. platnosť, rozsah a verejné použitie certifikátu ISO 45001 a oprávnenia ČEZ,
3. aktuálnosť firemných údajov, zápisu v ORSR, telefónu a e-mailu,
4. oprávnenie opätovne použiť logo, fotografie realizácií a dokumenty z pôvodného webu,
5. novšie referencie po roku 2017 a povolenie uvádzať názvy zákazníkov,
6. mená, funkcie a fotografie kontaktných alebo odborných osôb,
7. geografický rozsah pôsobnosti a reálne priemerné reakčné lehoty,
8. či má byť nový web aj v angličtine, nemčine a ruštine,
9. finálne znenie ochrany osobných údajov a dobu uchovávania údajov z formulára,
10. cieľovú formulárovú službu alebo backend, analytiku a prípadný cookie režim.

## 4. Spustenie

Web funguje otvorením súboru `index.html` v prehliadači. Pre presnejšie lokálne testovanie je možné v priečinku projektu spustiť jednoduchý server, napríklad:

```bash
python3 -m http.server 8080
```

Následne otvoriť `http://localhost:8080/`.

## 5. Formulár

Aktuálna statická verzia nič neposiela na server. Po validácii otvorí predvolený e‑mailový program návštevníka s pripravenou správou pre `chestrealprogress@chestreal.sk`. Táto funkcia je v `assets/js/main.js` a je jasne vysvetlená priamo pri formulári.

Pre ostrú prevádzku treba formulár pripojiť k schválenej formulárovej službe (napríklad Formspree/Basin) alebo k vlastnému backendu. Pri implementácii treba doplniť serverovú validáciu, antispam, potvrdenie o odoslaní, spracovanie súhlasu, zásady ochrany osobných údajov a bezpečné doručenie príloh. Následne sa v JavaScripte nahradí tvorba `mailto:` odkazu požiadavkou na zvolený endpoint.

## 6. Obrázky a zdroje

Všetky použité obrázky boli stiahnuté z verejného pôvodného webu CHESTREAL PROGRESS a uložené lokálne. Fotografie sa používajú ako firemné realizácie len preto, že ich pôvodný web zverejňuje v sekciách referencií alebo v hlavnom firemnom slajderi. Pred ostrým publikovaním treba vlastníctvo/povolenie potvrdiť.

- Logo: https://chestrealprogress.sk/wp-content/uploads/2020/03/Chestreal-progress-logo.png
- Pôvodný alternatívny hero — ochrana betónu: https://chestrealprogress.sk/wp-content/uploads/2020/03/chestreal_progress_banner_1.jpg
- Jadrový program: https://chestrealprogress.sk/wp-content/uploads/2020/03/chestreal_progress_banner_3.jpg
- Hero a filtrácia: https://chestrealprogress.sk/wp-content/uploads/2020/04/filtre_01.jpg
- Betón a podlahy: https://chestrealprogress.sk/wp-content/uploads/2020/04/betony_02.jpg
- Ochrana kovov: https://chestrealprogress.sk/wp-content/uploads/2020/04/kovy_08.jpg
- ISO 45001: https://chestrealprogress.sk/wp-content/uploads/2026/05/cert_45k_sk.png
- Oprávnenie ČEZ: https://chestrealprogress.sk/wp-content/uploads/2025/03/Opravnenie_CEZ_30-4-2028.jpg
- ENVI‑PAK 2024: https://chestrealprogress.sk/wp-content/uploads/2025/06/ENVI-17098-certifikat.jpg

Fotografie a dokumenty boli prevedené do formátu WebP a zmenšené tam, kde to neohrozilo čitateľnosť. Celý priečinok `assets/images/` má približne 700 kB.

## 7. Štruktúra projektu

```text
chestreal-progress-web/
├── index.html
├── sluzby.html
├── referencie.html
├── o-spolocnosti.html
├── kontakt.html
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    └── images/
        ├── logo.png
        ├── hero-realizacia.webp
        ├── nuklearny-program.webp
        ├── filtracia.webp
        ├── beton-podlahy.webp
        ├── ochrana-kovov.webp
        ├── iso-45001.webp
        ├── opravnenie-cez.webp
        └── envi-pak-2024.webp
```

## 8. Kontrola

Projekt obsahuje samostatné responzívne pravidlá pre desktop, tablet a mobil. Automaticky boli overené existujúce lokálne súbory a fragmenty odkazov, dostupnosť všetkých stránok a assetov cez lokálny server, syntax JavaScriptu, XML sitemap a základné sémantické podmienky (jeden `h1` a `main` na stránku, alternatívne texty obrázkov, unikátne ID, popisy formulárových polí a bezpečné externé odkazy).

Kontrolované oblasti návrhu:

- hlavná a mobilná navigácia,
- interné odkazy a CTA,
- sémantická štruktúra nadpisov,
- formulárové povinné polia, typy vstupov a natívna validácia,
- focus stavy, ovládanie menu klávesnicou a kláves Escape,
- kontrast a redukcia pohybu,
- lokálne obrázky bez hotlinkingu,
- meta titulky, popisy, canonical odkazy a štruktúrované firemné údaje,
- responzívne rozloženie a veľkosti dotykových prvkov,
- transparentné označenie neaktualizovaných dokumentov a statického formulára.

Automatizovaný vizuálny prehliadač v pracovnom prostredí neprešiel jeho bezpečnostnou kontrolou ani pre lokálnu adresu. Preto je pred ostrým nasadením ešte potrebný krátky manuálny vizuálny priechod na reálnom mobile, tablete a desktope; nejde o chýbajúcu závislosť projektu.
