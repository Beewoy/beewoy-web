# Autoservis JKM — návrh novej homepage

Samostatná ukážka redizajnu úvodnej stránky Autoservisu JKM v Pezinku. Návrh vychádza z verejne dostupného obsahu pôvodného webu, zachováva logo, farby, reálne služby, fotografie, partnerov a zverejnené kontaktné údaje.

## Obsah projektu

- `index.html` — nový návrh homepage s CSS a JavaScriptom priamo v súbore
- `report.html` — oddelené stručné zhodnotenie pôvodného webu z prvej časti zadania
- `assets/images/jkm/` — lokálne logo, fotografie prevádzky a logá poisťovní
- `assets/images/beewoy-logo.svg` — asset používaný výhradne v oddelenom `report.html`

Homepage `index.html` neobsahuje zhodnotenie pôvodného webu ani branding Beewoy.

## Spustenie

Stránka funguje priamym otvorením súboru `index.html`. Pre lokálny server je možné v koreňovom priečinku použiť napríklad:

```bash
python3 -m http.server 4173
```

Potom otvorte `http://localhost:4173/index.html`.

## Informačná architektúra

1. navigácia s telefónom a online rezerváciou,
2. hero s jasným rozdelením na servis a poistnú udalosť,
3. dôveryhodnostný pás,
4. služby zoradené podľa potrieb zákazníka,
5. trojkrokový postup pri poistnej udalosti,
6. predstavenie rodinného servisu,
7. autentické fotografie a poďakovania zákazníkov,
8. zmluvné poisťovne,
9. FAQ,
10. kontakt, statický formulár a firemné údaje.

Hlavná konverzná cesta smeruje na existujúcu [online rezerváciu Bookio](https://services.bookio.com/jkm-trade-sk/widget). Telefonický kontakt a formulár sú dostupné ako alternatívne cesty.

## Statický formulár

Formulár zámerne neodosiela dáta. Po úspešnej kontrole povinných polí zobrazí jasnú správu, že dopyt nebol odoslaný.

Pred produkčným nasadením treba:

1. pripojiť formulárovú službu alebo vlastný serverový endpoint,
2. nahradiť prázdny atribút `action` v elemente `#contact-form`,
3. odstrániť alebo upraviť JavaScript, ktorý volá `event.preventDefault()`,
4. doplniť serverovú validáciu, ochranu proti spamu a bezpečné spracovanie údajov,
5. nastaviť reálne stavy odosielania, úspechu a chyby,
6. overiť text súhlasu a dobu uchovávania údajov s prevádzkovateľom.

Ak sa pridá nahrávanie fotografií poškodenia, treba nastaviť povolené formáty, maximálnu veľkosť, antivírusovú kontrolu a bezpečné úložisko.

## Kontakty na preverenie pred publikovaním

Návrh používa údaje aktuálne zverejnené na kontaktnej stránke:

- Andrej Jurík: `+421 918 882 573`, `jurik.jkm@gmail.com`
- Janka Juríková: `+421 908 512 627`, `jurikova.jkm@gmail.com`
- sídlo/prevádzka: Viničnianska cesta 6202/23, 902 01 Pezinok
- prijímacia kancelária podľa aktuálnej homepage: Viničnianska cesta 15, Strojárske centrum — bočný vchod
- prevádzkové hodiny: pondelok – piatok, 08:00–17:00

Pred produkčným nasadením odporúčame potvrdiť, ako sa majú dve adresy pomenovať a ktorá z nich má byť cieľom navigácie v Google Mapách.

## Zdroje lokálnych obrázkov

Všetky použité obrázky pochádzajú z pôvodného webu Autoservisu JKM. Nebol použitý Unsplash, Pexels ani hotlinking.

| Lokálny súbor | Pôvodný zdroj |
| --- | --- |
| `assets/images/jkm/logo.png` | [LogoWEB2.png](https://autoservisjkm.sk/wp-content/uploads/2025/06/LogoWEB2.png) |
| `assets/images/jkm/prevadzka.jpg` | [20260205_131236-scaled.jpg](https://autoservisjkm.sk/wp-content/uploads/2026/02/20260205_131236-scaled.jpg) |
| `assets/images/jkm/dielna.jpg` | [Dielna_1_opt-scaled-1.jpg](https://autoservisjkm.sk/wp-content/uploads/2025/06/Dielna_1_opt-scaled-1.jpg) |
| `assets/images/jkm/servis-vozidiel.jpg` | [Dielna_10_opt.jpg](https://autoservisjkm.sk/wp-content/uploads/2025/06/Dielna_10_opt.jpg) |
| `assets/images/jkm/lakovna.jpg` | [Lakovna_4_opt.jpg](https://autoservisjkm.sk/wp-content/uploads/2025/06/Lakovna_4_opt.jpg) |
| `assets/images/jkm/mechanicka-oprava.jpg` | [IMG-20251008-WA0003.jpg](https://autoservisjkm.sk/wp-content/uploads/2025/10/IMG-20251008-WA0003.jpg) |
| `assets/images/jkm/partner-wustenrot.jpg` | [poistovna1.jpg](https://autoservisjkm.sk/wp-content/uploads/2025/06/poistovna1.jpg) |
| `assets/images/jkm/partner-union.jpg` | [poistovna2.jpg](https://autoservisjkm.sk/wp-content/uploads/2025/06/poistovna2.jpg) |
| `assets/images/jkm/partner-generali.jpg` | [poistovna3.jpg](https://autoservisjkm.sk/wp-content/uploads/2025/06/poistovna3.jpg) |
| `assets/images/jkm/partner-csob.jpg` | [poistovna4.jpg](https://autoservisjkm.sk/wp-content/uploads/2025/06/poistovna4.jpg) |

Poďakovania zákazníkov sú prevzaté z [aktuálnej hlavnej stránky](https://autoservisjkm.sk/) a sú označené ako obsah zverejnený na pôvodnom webe. Texty služieb a partnerstvá vychádzajú zo stránok [Služby](https://autoservisjkm.sk/sluzby/), [O nás](https://autoservisjkm.sk/o-nas/), [Partneri](https://autoservisjkm.sk/partneri/) a [Kontakty](https://autoservisjkm.sk/kontakty/).

## Prístupnosť a technické riešenie

Návrh bol vytvorený so zohľadnením základných princípov digitálnej prístupnosti.

Obsahuje najmä:

- logickú hierarchiu nadpisov a sémantické HTML5 prvky,
- skip link a viditeľné focus stavy,
- klávesnicovo ovládateľné mobilné menu a FAQ,
- minimálne 50 px vysoké hlavné tlačidlá,
- popisy lokálnych obrázkov,
- explicitné labely a vhodné typy vstupov formulára,
- rešpektovanie `prefers-reduced-motion`,
- responzívne rozloženie pre mobil, tablet a desktop,
- lazy loading obrázkov pod prvou obrazovkou,
- základné metadáta a schema.org typ `AutoRepair`.

Pred ostrým nasadením je vhodné vykonať manuálne testovanie s klávesnicou, čítačkou obrazovky, reálnymi mobilnými zariadeniami a automatizovanými nástrojmi pre výkon a prístupnosť.
