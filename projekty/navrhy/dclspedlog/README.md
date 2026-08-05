# DCL SpedLog – návrh redizajnu homepage

Statická ukážka funguje bez frameworku a build procesu. Otvorte `index.html` v prehliadači alebo priečinok spustite cez jednoduchý lokálny webový server.

## Analýza pôvodného webu

Pôvodný web je jednostránkový a komunikuje skladovanie, import a export tovaru, colné, distribučné, letecké a námorné prepravné služby do celého sveta. Hlavnou konverziou je žiadosť o cenovú ponuku a priamy kontakt. Zverejňuje kontaktné osoby, telefóny, e-mail, dve adresné informácie, GPS, pracovné hodiny a tvrdenie o dostupnosti 24/7.

Najväčšie slabiny: veľmi stručná informačná architektúra, nejasná hierarchia služieb, málo vysvetlená cesta k dopytu, slabé textové alternatívy obrázkov, rozdielne adresy bez vysvetlenia, nefunkčné placeholder odkazy na sociálne siete a chýbajúce doložené referencie, certifikáty či firemné fakty. Formulár pôvodného webu používa externú službu viazanú na pôvodnú platformu.

## UX/UI rozhodnutia

- Jednostránková navigácia vedie od ponuky cez služby a spôsob dopytu ku kontaktu.
- Zlatá a tmavá paleta vychádza priamo z loga; logo nebolo upravené.
- Hlavné CTA vedie na formulár, sekundárne na telefonát.
- Služby sú rozdelené do čitateľných kariet bez vymyslených parametrov, čísel alebo garancií.
- Obe adresy sú zachované a jasne označené podľa miesta, kde sa nachádzali na pôvodnom webe.
- Mobilné menu, focus stavy, skip link, sémantické prvky, formulárové popisy a reduced-motion podpora zlepšujú prístupnosť.

## Formulár

Ukážkový formulár zámerne nič neodosiela. Má natívnu validáciu a stavovú správu. Pred nasadením treba doplniť schválený backend alebo formulárovú službu, nastaviť `action`/odosielanie a doplniť právne texty o spracovaní osobných údajov.

## Podklady a zdroje

- Logo: pôvodný firemný web – `https://dclspedlog.sk/ws/media-library/d1dda25b7ba14a2ebe37472406263df5/unnamed.png`
- Fotografia skladu: pôvodný firemný web – `https://dclspedlog.sk/ws/alt-imgs/orig/2c7d48e8e6f8915a85ed71263284da4a.webp`
- Fotografia prístavu: pôvodný firemný web – `https://dclspedlog.sk/ws/alt-imgs/orig/86a1a2c5fdebce0c6da6df0857a9af27.webp`
- Firemné tvrdenia a kontakty: pôvodná homepage `https://dclspedlog.sk/`, analyzovaná 5. 8. 2026.

Všetky médiá sú uložené lokálne v `assets/`; stránka nepoužíva hotlinking ani externé fonty.

## Potrebné potvrdiť pred publikovaním

1. Či adresa 292 označuje prevádzku/sklad a adresa 273 sídlo firmy.
2. Presný rozsah colných a distribučných služieb a podporované druhy zásielok.
3. Vzťah medzi dostupnosťou 24/7 a pracovnými hodinami 8.00–17.00.
4. Právne údaje firmy (IČO, DIČ/IČ DPH), zásady ochrany osobných údajov a cookies.
5. Referencie, certifikáty, partnerstvá alebo merateľné výsledky, ak ich firma môže doložiť.
6. Cieľová formulárová služba/backend a príjemca dopytov.

## Štruktúra

```
index.html
assets/
  hero.webp
  logo.png
  warehouse.webp
README.md
```
