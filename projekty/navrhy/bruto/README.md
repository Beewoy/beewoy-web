# BRUTO – koncept redizajnu homepage

Statická, responzívna ukážka novej domovskej stránky pre **BRUTO s.r.o.** Stránku otvoríte dvojklikom na `index.html`; nepotrebuje zostavenie ani externé knižnice.

## Analýza a návrhové rozhodnutia

BRUTO vyvíja, vyrába a servisuje váhy a vážiace systémy. Hlavnými segmentmi sú priemysel, obchod, poľnohospodárstvo, odpadové hospodárstvo a ďalšie prevádzky, ktoré potrebujú presné váženie, atypické vyhotovenie alebo prepojenie so softvérom. Primárnym cieľom homepage je relevantný dopyt; sekundárnymi cieľmi sú telefonát, výber kategórie váh a objednanie servisu či kalibrácie.

Pôvodná homepage má hodnotné fakty a širokú ponuku, ale informácie sa opakujú, navigácia je rozsiahla a hlavná cesta k dopytu nie je dostatočne prioritizovaná. Dôveryhodnostné údaje sú rozptýlené a niektoré čísla sa medzi stránkami líšia. Redizajn preto používa jasnú hierarchiu: ponuka → riešenie na mieru → postup → dôveryhodnosť → dopyt. Identitu zachováva pôvodné logo, červená farba a technický, vecný charakter značky.

## Overené údaje použité v návrhu

- Výroba a servis váh od roku 1993.
- Vlastný vývoj hardvéru a softvéru, atypické rozmery a integrácie (napr. SAP, Navision, K2).
- Záručný a pozáručný servis dodaných váh.
- Registrovaný výrobca podľa zákona č. 142/2000 Z. z.; rozhodnutie ÚNMS SR č. R/I-086/2002.
- Akreditované laboratórium od roku 2022 pre kalibráciu podľa ISO/IEC 17025:2017.
- Viac ako 3 000 váhových aplikácií je uvedených na stránke Referencie. Toto číslo bolo zvolené namiesto staršieho a odlišného údaja na homepage.
- Kontakt: Trnavská cesta 913, 926 01 Sereď; +421 31 789 28 30; bruto@bruto.sk.

## Zdroje obsahu a obrázkov

Textové fakty a odkazy: [bruto.sk](https://bruto.sk/), [Váhy na mieru](https://bruto.sk/vahy-na-mieru/), [Servis a kalibrácia](https://bruto.sk/servis-a-kalibracia/), [O nás](https://bruto.sk/o-nas/), [Referencie](https://bruto.sk/referencie/).

Všetky súbory v `assets/` pochádzajú z verejnej mediálnej knižnice pôvodného webu BRUTO:

- `bruto-logo.png` – pôvodné logo BRUTO
- `vahy-na-mieru.png` – pôvodný produktový vizuál
- `tlac-stitkov.jpg` – pôvodná fotografia systému s tlačou štítkov
- `bruto-vyroba.jpg` – pôvodná fotografia (zachovaná ako dostupný podklad)
- `mostove-vahy.png`, `plosinove-vahy.png`, `obchodne-vahy.png`, `zeriavove-vahy.png` – pôvodné kategóriové obrázky

Práva na logo, fotografie a značku patria ich príslušným vlastníkom. Sú použité iba na účel konceptu redizajnu.

## Formulár

Ide o statickú ukážku bez backendu. Formulár nič neposiela ani neukladá. Po validácii vytvorí `mailto:` odkaz a otvorí predvolený e-mailový program s predvyplneným dopytom na `bruto@bruto.sk`. Pri nasadení odporúčame formulár napojiť na existujúce zabezpečené spracovanie formulárov, pridať antispam a serverovú validáciu.

## Technické poznámky

- CSS a JavaScript sú vložené priamo v `index.html`.
- Obrázky sú lokálne v `assets/`; stránka nemá závislosť od CDN.
- Obsahuje responzívne menu, klávesnicové focus stavy, odkaz na preskočenie obsahu, zmysluplné alternatívne texty, `prefers-reduced-motion`, SEO meta údaje a sémantickú HTML štruktúru.
- Externé odkazy smerujú na existujúce podstránky pôvodného webu, pretože predmetom konceptu je iba homepage.
