# JŠ servis — ukážka redizajnu homepage

Projekt obsahuje samostatný návrh novej úvodnej stránky a samostatný analytický report. Súbory sa obsahovo ani vizuálne nemiešajú.

## Výstupy

- `index.html` — nový návrh homepage; CSS a JavaScript sú vložené priamo v súbore
- `report.html` — samostatné zhodnotenie pôvodnej webovej stránky
- `assets/images/jsservis/` — pôvodné logo a autentické fotografie firmy použité v homepage
- `assets/images/beewoy-logo.svg` — logo používané iba v samostatnom reporte

Homepage neobsahuje Beewoy branding, audit, skóre ani pripomienky k pôvodnému webu.

## Spustenie

`index.html` možno otvoriť priamo v prehliadači. Pre testovanie cez lokálny server možno v koreňovom priečinku spustiť napríklad:

```bash
python3 -m http.server 8000
```

Potom otvorte `http://localhost:8000/index.html`.

## Obsah a informačná architektúra

Homepage uprednostňuje hlavnú službu firmy — výrobu, dopravu a čerpanie certifikovaných betónových zmesí. Ostatné potvrdené činnosti sú oddelené do zrozumiteľných blokov:

- stavebná činnosť,
- prenájom priestorov,
- energetická certifikácia,
- motorové a technické oleje,
- poľovnícke a rybárske potreby,
- e-shop CHIRUCA.

Hlavná konverzná cesta vedie na telefón objednávok betónu `033 / 642 22 58` alebo do kontaktnej sekcie. V návrhu nie sú použité vymyslené referencie, recenzie, klienti, garancie ani počty realizácií.

## Formulár

Kontaktný formulár je zámerne statická ukážka. Po validácii otvorene oznámi, že údaje neboli odoslané.

Pred produkčným nasadením treba v skripte na konci `index.html` nahradiť obsluhu udalosti `submit` napojením na schválený backend alebo formulárovú službu. Pri integrácii treba doplniť:

- serverové overenie vstupov,
- ochranu proti spamu,
- stav odosielania, úspechu a chyby oznamovaný cez `aria-live`,
- pravidlá spracovania osobných údajov a príslušný odkaz,
- cieľovú e-mailovú adresu schválenú klientom.

## Zdroje obrázkov

Všetky obrázky homepage boli prevzaté z oficiálneho webu `https://www.jsservis.sk/` a sú uložené lokálne. Neboli použité fotobanky ani generované ilustračné realizácie.

| Lokálny súbor | Pôvodný zdroj |
|---|---|
| `assets/images/jsservis/logo.png` | `https://www.jsservis.sk/images/logo.png` |
| `assets/images/jsservis/hero-mixer.jpg` | `https://www.jsservis.sk/foto/1/_JAK6788.jpg` |
| `assets/images/jsservis/quality-control.jpg` | `https://www.jsservis.sk/foto/1/_JAK6612.jpg` |
| `assets/images/jsservis/company-building.jpg` | `https://www.jsservis.sk/foto/1/_JAK6546.jpg` |
| `assets/images/jsservis/concrete-blocks.jpg` | `https://www.jsservis.sk/foto/1/_JAK6585.jpg` |
| `assets/images/jsservis/mixer-fleet.jpg` | `https://www.jsservis.sk/foto/1/_JAK6800.jpg` |

Logo ani fotografie neboli obsahovo upravené.

## Overené firemné údaje

Použité údaje vychádzajú z oficiálneho webu a verejných firemných záznamov overených 10. augusta 2026:

- JŠ servis, s.r.o., Bratislavská 83, 902 01 Pezinok,
- IČO 34152181,
- recepcia `033 / 642 32 59`,
- objednávky betónu `033 / 642 22 58`,
- e-mail `jsservis@jsservis.sk`,
- certifikát vnútropodnikovej kontroly `SK-12ZSV-0900`,
- výroba betónov podľa STN EN 206,
- firemný Facebook `https://www.facebook.com/JSSERVISsro/`,
- e-shop a distribučný web `https://www.chiruca.sk/`.

Konkrétne Google hodnotenie ani počet recenzií neboli spoľahlivo overené, preto ich návrh nezobrazuje. Instagram, LinkedIn, YouTube a WhatsApp sa v návrhu nepoužívajú, pretože sa pri analýze nepotvrdili jednoznačné oficiálne profily.

## Prístupnosť a technické riešenie

Návrh obsahuje:

- sémantické HTML5 a logickú hierarchiu nadpisov,
- odkaz na preskočenie navigácie,
- mobilné menu s `aria-expanded`, podporou klávesu Escape a použiteľným stavom bez JavaScriptu,
- viditeľné focus stavy a aktívne prvky s výškou aspoň 44 px,
- priradené popisky formulárových polí a vhodné typy mobilnej klávesnice,
- zrozumiteľné alt texty pri významových fotografiách,
- responzívne obrázky s pevnými rozmermi proti posunu rozloženia a lazy loadingom mimo hero sekcie,
- rešpektovanie `prefers-reduced-motion`,
- základné `Organization` schema.org údaje,
- žiadne externé písma, frameworky ani build proces.

Návrh bol vytvorený so zohľadnením základných princípov digitálnej prístupnosti; nejde o certifikovaný audit ani právnu garanciu.
