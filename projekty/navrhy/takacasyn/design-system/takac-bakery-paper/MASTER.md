# Takáč Bakery Paper

Design system pre web Pekárne Takáč a syn. Je postavený na atmosfére tradičnej pekárenskej etikety, teplom papieri a editoriálnej typografii. Vizuálnou predlohou je útulná remeselná pekáreň, nie moderný e-shop ani generická firemná šablóna.

## Design read

- Produkt: lokálna rodinná pekáreň s kamennou predajňou a B2B týždennými objednávkami.
- Publikum: domácnosti v Trnave a obchodní partneri, ktorí potrebujú rýchlo nájsť sortiment, otváracie hodiny a objednávku.
- Vizuálny jazyk: warm editorial, paper packaging, heritage bakery print.
- Redesign mód: úplný vizuálny overhaul so zachovaním obsahu, navigácie, formulárových polí a konverzných ciest.
- Dials: variance 6/10, motion 3/10, density 4/10.
- Téma: automatická light/dark, bez striedania svetlých a tmavých sekcií v rámci jednej stránky.

## Princípy

1. Fotografie výrobkov sú hlavný vizuálny argument.
2. Nadpisy majú pôsobiť ako z kvalitnej pekárenskej etikety, nie ako SaaS landing page.
3. Dekorácie sú jemné: tenké linky, papierová textúra, organické orezanie fotografie a jedna kruhová pečať.
4. Jeden akcent slúži na CTA, odkazy, aktívne kroky a focus ring.
5. Dôležité praktické informácie, najmä otvorené alebo zatvorené a Excel záloha, nesmú byť ukryté.
6. Objednávkový formulár zostáva vecný, čitateľný a prístupný aj keď zvyšok webu pôsobí remeselne.

## Farebné tokeny

| Rola | Light | Dark | CSS token |
|---|---|---|---|
| Papier | `#F7EFDF` | `#211A16` | `--paper` |
| Čistý papier | `#FFF9EF` | `#2C221C` | `--paper-clean` |
| Papierový tieň | `#EFE0C7` | `#35281F` | `--paper-deep` |
| Atrament | `#342119` | `#F5E8D5` | `--ink` |
| Tlmený text | `#725E51` | `#CDBCA9` | `--ink-muted` |
| Tehlový akcent | `#A43F28` | `#D96D4D` | `--accent` |
| Akcent hover | `#81301F` | `#ED8A69` | `--accent-strong` |
| Medová značka | `#D79624` | `#E7B65C` | `--wheat` |
| Deliaca linka | `#D8C3A2` | `#594838` | `--line` |
| Otvorené | `#416341` | `#8BB681` | `--success` |
| Chyba | `#9A3025` | `#FF8B79` | `--danger` |

Akcent `--accent` je jediná interakčná farba. Zelená sa používa iba pre reálny stav otvorenia.

## Typografia

- Display: Georgia, `Times New Roman`, serif. Používa sa na H1 až H3, veľké citácie a podpis.
- Text a UI: Takáč Sans, lokálne hostovaný DM Sans, system-ui, sans-serif.
- Handwritten akcent: kurzívna Georgia, maximálne raz v hero a raz pri príbehu.
- H1: `clamp(3.35rem, 6.7vw, 6.8rem)`, line-height 0.9, max 2 riadky.
- H2: `clamp(2.55rem, 5vw, 5rem)`, line-height 0.96.
- H3: `clamp(1.5rem, 2.4vw, 2.3rem)`, line-height 1.05.
- Body: `1rem`, line-height 1.65; lead text `clamp(1.05rem, 1.4vw, 1.25rem)`.
- UI label: 0.78rem až 0.92rem, weight 650; nepoužívať drobný sivý text pod 12 px.

## Priestor a mriežka

```css
--space-1: .375rem;
--space-2: .625rem;
--space-3: 1rem;
--space-4: 1.5rem;
--space-5: 2rem;
--space-6: 3rem;
--space-7: 4.5rem;
--space-8: 7rem;
--site-gutter: clamp(1rem, 4vw, 4.5rem);
--site-max: 1440px;
--content-max: 1180px;
```

- Desktop používa 12-stĺpcovú mriežku, ale sekcie menia kompozíciu.
- Hero je asymetrický split 43/57.
- Sortiment používa 4 vizuálne rovnaké produktové karty, pretože ide o reálny katalógový vzor.
- Príbeh, remeslo, objednávka a prevádzka nesmú opakovať rovnaký split layout.
- Mobil: jeden stĺpec, gutter 16 px, interaktívne prvky min. 44 px.

## Tvary, linky a hĺbka

- Radius malý 8 px, stredný 16 px, organický 28 px.
- Produktové fotografie majú 12 px radius. Hero používa organický `clip-path` iba na desktop.
- Border je 1 px `--line`; hrubé rámiky sa nepoužívajú.
- Tieň: `0 18px 50px rgb(74 42 24 / 10%)` iba na hero pečať, formulár a plávajúce plochy.
- Papierová textúra vzniká z nízko-kontrastných CSS gradientov, nie z videa alebo animovaného šumu.

## Komponenty

### Navigácia

- Výška maximálne 76 px, logo vľavo, linky a jeden plný CTA vpravo.
- Sticky header môže mať takmer nepriehľadné papierové pozadie a tenkú deliacu linku.
- Na mobile sa menu otvorí ako jeden papierový panel pod hlavičkou.

### Tlačidlá

- Primárne: plný tehlový akcent, svetlý text, radius 8 px, min-height 46 px.
- Sekundárne: transparentné, 1 px akcentový border, text v akcente.
- Hover: posun hore o 1 px a zmena farby, bez scale transformácie.
- Focus: 3 px ring s dostatočným offsetom.

### Fotografie

- `object-fit: cover`, teplé farebné ladenie pomocou mierneho `saturate` a `sepia`.
- Neorezávať chlieb agresívne; hlavný výrobok musí byť čitateľný aj na mobile.
- Archívne fotografie majú priznane tlmenejší kontrast, nie falošný filmový filter.

### Produktová karta

- Bez tieňa a bez zbytočného bieleho boxu. Fotografia, názov, krátka veta a jemná linka.
- Celá karta sa nesmie tváriť klikateľne, ak nemá akciu.

### Formulár

- Label vždy nad poľom.
- Polia na `--paper-clean`, 1 px border, min-height 50 px.
- Dvojstĺpcové rozloženie len od 760 px.
- Chyba priamo pod poľom, `aria-invalid` a viditeľný focus.
- Kroky sú textový postup s reálnym stavom, nie dekoratívne pilulky.

### Mapa a otváracie hodiny

- Mapa má rovnaký radius a border ako fotografie.
- Stav otvorenia je v hero pečati a podrobné hodiny v sekcii prevádzky.
- Odkaz na Google mapy je vždy dostupný mimo iframe.

## Pohyb

- Trvanie 220 až 380 ms, ease-out.
- Reveal: opacity 0 na 1 a translateY 14 px na 0 pri vstupe do viewportu.
- Hover fotografie: maximálne scale 1.02 vo vnútri overflow masky.
- Žiadny parallax, scroll hijacking, nekonečný marquee ani kurzorové efekty.
- `prefers-reduced-motion: reduce` vypne posuny a prechody.

## Responzívne pravidlá

- 375 px: hero text nad fotografiou, pečať vo vnútri spodnej časti fotografie, CTA môžu byť vedľa seba len ak sa nezalamujú.
- 768 px: dvojstĺpcové formulárové polia a dvojstĺpcový sortiment.
- 1024 px: desktop navigácia, asymetrický hero a štyri produktové karty.
- 1440 px: obsah zostáva v max-width a papierové okraje vytvárajú pokoj.

## Zakázané vzory

- Žiadne emoji, ručne kreslené SVG ikonky, glassmorphism ani AI-fialová.
- Žiadne generické modro-zelené SaaS farby.
- Žiadne opakované tri identické karty v každej sekcii.
- Žiadne skryté otváracie hodiny a žiadny formulár bez Excel zálohy.
- Žiadne em dash znaky vo viditeľnom texte.
- Žiadne dekoratívne štítky položené na fotografiách okrem jedinej obsahovej hero pečate.

## Pre-flight

- Kontrast textu a CTA minimálne WCAG AA.
- H1 najviac 2 riadky na desktop, CTA viditeľné bez scrollu.
- Navigácia v jednom riadku a do 80 px.
- Žiadny horizontálny overflow na 375, 768, 1024 a 1440 px.
- Všetky touch targets minimálne 44 krát 44 px.
- Light aj dark farebné tokeny otestované.
- Formulár, 94 produktov, kontrola objednávky a Excel download funkčné.
- Obrázky majú rozmery, alt text a lazy loading mimo LCP hero.
