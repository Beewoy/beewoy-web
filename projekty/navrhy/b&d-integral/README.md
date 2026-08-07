# B&D Integral — návrh novej homepage

Statická ukážka redesignu domovskej stránky pripravená na otvorenie priamo cez `index.html` alebo cez jednoduchý lokálny HTTP server.

## Súbory

- `index.html` — kompletná responzívna homepage; CSS aj JavaScript sú vložené priamo v HTML
- `assets/images/brand-header.jpg` — pôvodný brand/header vizuál (referenčný zdroj; v návrhu nahradený SVG monogramom)
- `assets/images/firma.jpg` — fotografia prevádzky z pôvodného webu
- `assets/images/cnc-ilustracne.jpg` — ilustračná fotografia CNC obrábania z Pexels
- `assets/images/vyroba-ilustracne.jpg` — ilustračná fotografia priemyselnej výroby z Pexels

## Obsahové zdroje

Návrh vychádza z verejne dostupného obsahu pôvodného webu B&D Integral, overeného 7. 8. 2026:

- https://www.bdintegral.sk/
- https://www.bdintegral.sk/index.php?jazyk=sk&m=2 — činnosť firmy / engineering / prototypy
- https://www.bdintegral.sk/index.php?jazyk=sk&m=3 — nástroje a formy / referencie
- https://www.bdintegral.sk/index.php?jazyk=sk&m=4 — lisovanie termoplastov / materiály / referencie
- https://www.bdintegral.sk/index.php?jazyk=sk&m=5 — 3D laserové obrábanie
- https://www.bdintegral.sk/index.php?jazyk=sk&m=8 — kvalita a environment
- https://www.bdintegral.sk/index.php?jazyk=sk&m=11 — kontakty

E-mail `office@bdintegral.sk` je verejne uvádzaný vo firemných katalógoch a bol overený pri predchádzajúcom researchi. Sociálne profily ani aktuálny rating Google recenzií sa nepodarilo spoľahlivo overiť, preto nie sú v návrhu použité.

## Externé fotografie

Fotografie z Pexels sú v návrhu zámerne označené ako **ilustračné**, aby nevznikol dojem, že zobrazujú konkrétnu technológiu alebo prevádzku B&D Integral.

1. CNC obrábanie — Daniel Smyth / Pexels  
   Zdroj: https://www.pexels.com/photo/close-up-of-a-cnc-milling-machine-20607184/

2. Priemyselná výrobná hala — Mazhar Ulazhar / Pexels  
   Zdroj: https://www.pexels.com/photo/industrial-factory-floor-with-machinery-31352672/

## Referencie v návrhu

BMW, Volkswagen, Volvo, MAN, Peugeot/Faurecia, Whirlpool, Siemens a Leoni sú použité iba ako výber značiek, ktoré B&D Integral uvádza medzi referenciami na pôvodnom webe. Homepage preto explicitne uvádza, že nejde o tvrdenie o aktuálne prebiehajúcich zmluvách.

## Formulár

Formulár je zámerne statický a nič neodosiela. JavaScript iba validuje povinné polia a zobrazí informáciu, že ide o ukážku.

Pri realizácii je možné formulár napojiť napríklad na:

- vlastný backend / API endpoint,
- Netlify Forms,
- Formspree,
- Resend alebo inú e-mailovú službu.

Pri napojení treba doplniť spracovanie osobných údajov a súhlas/legitímny právny základ podľa zvoleného spôsobu spracovania.

## Dizajnový smer

Vizuál vychádza z existujúcej identity firmy — tlmená oceľová modrá, olivový tón a výrazný žlto-zelený akcent z pôvodného brand vizuálu. Rozloženie je zámerne technické, čisté a industriálne, bez generického SaaS/card-heavy štýlu.

## Accessibility a SEO

Návrh obsahuje:

- skip link,
- logickú hierarchiu nadpisov,
- klávesnicovo ovládateľné mobilné menu,
- viditeľné focus stavy,
- min. 48 px interaktívne prvky,
- formulárové labely a natívnu validáciu,
- `prefers-reduced-motion`,
- alt texty,
- title a meta description,
- základné schema.org `Organization` údaje.

Návrh nie je prezentovaný ako certifikovaný WCAG audit.
