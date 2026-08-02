# DOVOZY.SK — návrh nového prezentačného webu

Kompletný statický web v slovenčine. Funguje bez frameworku, balíčkov a build procesu. Stačí otvoriť `index.html` alebo priečinok spustiť cez jednoduchý lokálny server.

## 1. Stručná analýza pôvodného webu

### Firma a ponuka

DOVOZY.SK s.r.o. má prevádzku v Ivanke pri Dunaji. Pôvodný web prezentuje najmä:

- autoservis pre osobné, terénne a ľahké úžitkové vozidlá do 5 ton,
- pneuservis, opravy diskov, uskladnenie a 3D geometriu,
- značkovú aj univerzálnu diagnostiku a servis klimatizácií,
- klampiarske opravy vrátane pomoci po nehode,
- NON-STOP odťahovú službu v rámci EÚ,
- pick-up servis a náhradné vozidlá,
- predaj nových náhradných dielov a použitých dielov Mercedes-Benz,
- dovoz nových a jazdených vozidiel z EÚ a prihlásenie v okresoch BA, SC a GA.

Firma uvádza špecializáciu na vozidlá koncernu Daimler (Mercedes-Benz, AMG, Smart a Maybach), no servisuje aj európske, ázijské a americké značky. Pravdepodobným zákazníkom je súkromný vodič alebo menšia firemná flotila z Ivanky pri Dunaji a širšieho okolia Bratislavy, ktorá potrebuje vyriešiť servis, kolesá, odťah alebo opravu po nehode bez presúvania medzi viacerými dodávateľmi.

Hlavný konverzný cieľ pôvodného aj nového webu je telefonát alebo relevantný servisný dopyt. Pri urgentnej situácii je cieľom priame volanie na odťahovú službu.

### Hodnota a dôveryhodnosť podložená pôvodným webom

- široké vlastné servisné vybavenie pre mechanické aj elektrikárske práce,
- technológie HUNTER ELITE, HUNTER SmartWeight, ROMESS, CELETTE a viacero diagnostických systémov,
- servis podľa servisného plánu výrobcu a deklarovaný servis v rámci blokovej výnimky,
- náhradné vozidlá a pick-up servis,
- reálne fotografie dielne, pracovníkov, techniky a prevádzky,
- história firmy od roku 2007,
- reálne firemné údaje, adresa a viacero priamych kontaktov.

Pôvodný web neobsahuje textové zákaznícke referencie ani overiteľné hodnotenia. Nový návrh si ich preto nevymýšľa.

### Hlavné slabé miesta pôvodného webu

- Domovská stránka nemá jeden jasný prísľub ani výrazné CTA. Osem slidov používa viacero H1 nadpisov, no návštevníka priamo nevedie k objednaniu.
- Navigácia je rozsiahla, viacúrovňová a mieša hlavné služby s doplnkovými témami, starým COVID oznamom, motoršportom, videami a Mercedes zónou.
- Kľúčové kontakty sa opakujú v niekoľkých blokoch a nie sú úplne konzistentné. Prevádzka uvádza číslo `0905 850 834`, globálny kontaktný blok `0911 850 834`; domovská stránka uvádza 12 náhradných vozidiel, stránka autoservisu 11 a cenník zobrazuje len tri vozidlá.
- Niektoré dôležité e-maily sa zobrazia iba cez JavaScriptové maskovanie. Pri zlyhaní skriptu návštevník vidí len upozornenie o ochrane pred spamom.
- Vizuál, Joomla šablóna, galérie a interakcie pôsobia zastarano. Na stránke sa načítava množstvo starých CSS a JavaScriptových súborov vrátane nešifrovaných HTTP závislostí.
- Mobilná použiteľnosť je obmedzená starými responzívnymi pravidlami, pevnými rozmermi obrázkov a hustou navigáciou.
- Slabšia čitateľnosť, malé texty, text umiestnený v obrázkoch a miestami slabý kontrast znižujú prístupnosť.
- SEO oslabuje nejasný obsah domovskej stránky, viacnásobné H1, generické titulky niektorých stránok a zastaraný obsah.
- Výkon zhoršujú početné pluginy, galérie, slider, staré knižnice, Facebook modul a externé skripty.
- Chýba stručný kontaktný formulár, ktorý by zozbieral typ auta, problém a kontakt ešte pred telefonátom.
- Web nie je dostupný cez funkčné HTTPS, čo je významný problém dôvery, SEO aj bezpečnosti.

## 2. Hlavné UX/UI rozhodnutia

- **Štyri položky hlavnej navigácie:** Domov, Služby, O nás a Kontakt. Doplnkové služby sú zoskupené na stránke služieb.
- **Dve jasné konverzie:** objednanie servisu a samostatný urgentný kontakt na odťah NON-STOP.
- **Najdôležitejšie informácie v prvom zobrazení:** lokalita, typ prevádzky, rozsah služieb a priame CTA.
- **Reálne fotografie namiesto fotobanky:** dielňa, technik, odťah a náhradné vozidlá patria do kontextu firmy a zvyšujú dôveryhodnosť.
- **Dynamický automoto vizuál:** tmavý grafitový základ, červená z existujúcej značky, šikmé tvary a výrazná kondenzovaná typografia. Efekty sú striedme a podporujú hierarchiu.
- **Služby zoskupené podľa problému zákazníka:** servis, kolesá, diagnostika/klíma, nehoda, odťah a doplnkové služby.
- **Dôvera bez vymyslených tvrdení:** používa sa len vybavenie, história, služby a kontakty uvedené na pôvodnom webe. Nepridávajú sa recenzie, garancie ani nepodložené čísla.
- **Konverzná cesta:** problém → vhodná služba → vysvetlenie → telefonát alebo pripravený dopyt.
- **Mobilná verzia:** jednoduché menu, veľké dotykové prvky a trvalá spodná lišta pre servis a odťah.
- **Prístupnosť:** sémantické nadpisy, preskočenie na obsah, viditeľné focus stavy, ovládanie menu klávesnicou, natívne FAQ a popísané formulárové polia.

## 3. Veci na potvrdenie pred ostrým spustením

1. Ktoré objednávkové telefónne číslo je aktuálne: `0905 850 834` alebo `0911 850 834`. Návrh používa `0911 850 834` medzi prijímacími kontaktmi a `0905 850 834` pri klampiarskych prácach podľa pôvodnej kontaktnej stránky.
2. Aktuálne otváracie hodiny a dostupnosť odťahu NON-STOP.
3. Aktuálny počet, typy, ceny a podmienky náhradných vozidiel. Starý cenník nie je v novom webe zobrazený.
4. Aktuálny cenník odťahu a pick-up servisu.
5. Či stále platí prihlásenie dovezených áut pre okresy BA, SC a GA.
6. Presné a právne aktuálne znenie servisu v rámci blokovej výnimky.
7. Názvy, vydavatelia a platnosť certifikátov. Pôvodný web ich zobrazuje len ako obrázky bez popisu.
8. Aktuálna účasť firmy v motoršporte a či ju ponechať vo verejnej prezentácii.
9. Platobné možnosti zobrazené na pôvodnom webe.
10. Cieľový e-mail alebo formulárová služba, zásady ochrany osobných údajov a presné znenie súhlasu pri formulári.
11. Práva na ďalšie používanie loga a fotografií z pôvodného webu.
12. Nasadenie platného TLS certifikátu a presmerovanie celej domény na HTTPS. Po nasadení treba zmeniť URL v JSON-LD, `robots.txt` a `sitemap.xml` na finálnu HTTPS adresu.

## 4. Kontaktný formulár

Formulár je zámerne statický. Validácia povinných polí funguje v prehliadači, ale dáta sa nikam neposielajú. Používateľ po kontrole dostane jasnú informáciu a priame telefónne/e-mailové kontakty.

Pred spustením treba:

1. zvoliť formulárovú službu alebo vlastný backend,
2. upraviť `action` a `method` vo formulári v `kontakt.html`,
3. nahradiť ukážkovú obsluhu formulára v `assets/js/main.js`,
4. doplniť zásady ochrany osobných údajov a odsúhlasené právne znenie,
5. otestovať úspešné odoslanie, chybu a ochranu proti spamu.

## 5. Obrázky a zdroje

Všetky fotografie a logo sú uložené lokálne. Neboli použité externé fotobanky ani hotlinking.

Zdrojom je pôvodný firemný web a jeho vlastné galérie:

- logo: <http://www.dovozy.sk/images/dovozy-logo.png>
- dielňa / hero: <http://www.dovozy.sk/images/slider/02.jpg>
- pneuservis: <http://www.dovozy.sk/images/slider/04.jpg>
- diagnostika: <http://www.dovozy.sk/images/slider/05.jpg>
- náhradné vozidlá: <http://www.dovozy.sk/images/slider/08.jpg>
- autoservis: <http://www.dovozy.sk/images/autoservis/2015_02_22_Dovozy.sk_0262.jpg>
- klampiarske práce: <http://www.dovozy.sk/images/klampiarsky-servis/dovozy.sk-webfoto-02.jpg>
- odťah: <http://www.dovozy.sk/images/odtahovka/dovozy-sk-atego.jpg>
- prevádzka: <http://www.dovozy.sk/images/o-nas/2015_02_22_Dovozy.sk_0010.jpg>

Fotografie boli prevedené do WebP pri kvalite 82, čím sa znížila ich celková veľkosť bez viditeľného zhoršenia pre webové použitie. Pred ostrým nasadením je vhodné interne potvrdiť autorské práva k všetkým podkladom.

## 6. Spustenie

- Najjednoduchšie: otvorte `index.html` v modernom prehliadači.
- Odporúčané na kontrolu odkazov: spustite priečinok cez ľubovoľný jednoduchý lokálny HTTP server a otvorte jeho adresu.

Web nemá žiadne externé runtime závislosti.

## 7. Štruktúra projektu

```text
dovozy-redesign/
├── index.html
├── sluzby.html
├── o-nas.html
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
        ├── hero-workshop.webp
        ├── facility.webp
        ├── replacement-cars.webp
        ├── service-bodywork.webp
        ├── service-diagnostics.webp
        ├── service-engine.webp
        ├── service-towing.webp
        └── service-tyres.webp
```

## 8. Zdrojová analýza

Obsah bol overovaný na domovskej stránke a podstránkach Autoservis, Diagnostika vozidiel, Servis klimatizácií, Pneuservis, Geometria, Klampiarsky servis, Odťahová služba, Dovoz automobilov zo zahraničia, Pick-up servis, Náhradné diely, Náhradné vozidlá, O nás, Certifikáty, Motoršport a Kontakt na pôvodnej doméne `dovozy.sk`.
