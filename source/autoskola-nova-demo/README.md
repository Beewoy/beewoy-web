# AUTOŠKOLA NOVA · prezentačné demo

Samostatná statická Astro šablóna pre ukážku moderného webu autoškoly. Pre Beewoy sa publikuje ako náhľad na `/projekty/navrhy/autoskola-nova/`. Značka, ceny, termíny, profily, vozidlá a kontakty sú ilustračné.

## Spustenie

```bash
npm install
npm run dev
```

Lokálny náhľad: `http://127.0.0.1:4321/`.

```bash
npm run check
npm run build
```

Statický výstup vznikne v `dist/`. Projekt má `noindex` v meta značke a blokovanie indexovania v `robots.txt`.

Pre publikovanie v podpriečinku webu Beewoy spusti `npm run build:beewoy`.
Tento build upraví interné odkazy a cesty k súborom na
`/projekty/navrhy/autoskola-nova/`; jeho `dist/` patrí do rovnomenného
priečinka repozitára `beewoy-web`. Bežný `npm run build` ponecháva lokálne
odkazy od koreňa webu.

## Stránky

`/`, `/kurzy/`, `/kurzy/skupina-b/`, `/kurzy/skupina-b-automat/`, `/kondicne-jazdy/`, `/cennik/`, `/o-nas/`, `/kontakt/`, `/prihlaska/` a doplnková stránka `/informacie-o-deme/`.

## Prispôsobenie

- `src/data/schoolConfig.ts`: názov, slogan, farby, logo, lokalita, kontakt, sociálne odkazy.
- `src/data/courses.ts`: kurzy a ceny.
- `src/data/terms.ts`: ukážkové termíny; pred prezentáciou neskôr ako v decembri 2026 ich aktualizuj.
- `src/data/instructors.ts`, `vehicles.ts`, `reviews.ts`, `faq.ts`: ďalší obsah. Prázdne polia pri inštruktoroch, autách a referenciách príslušné sekcie skryjú.
- `src/styles/global.css`: spoločný vizuálny systém a responzívne rozloženie.
- `public/images/`: originálne generované ilustračné fotografie. Neprezentujú reálnych ľudí ani vozidlá autoškoly.

Pri použití pre konkrétnu autoškolu vymeň všetky ilustračné údaje za potvrdené informácie, doplň skutočné právne stránky, súhlasy k fotografiám a až potom zapni indexovanie. Kontaktný formulár a prihláška sú iba frontendové demo; validujú údaje lokálne, nič neodosielajú ani neukladajú. Sociálne odkazy sú zámerne prázdne, aby neodkazovali na fiktívne účty.
