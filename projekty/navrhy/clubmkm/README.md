# Club M.K.M. — redizajn homepage a stručný report

Výstup obsahuje dve úplne samostatné stránky:

- `report.html` — krátke obchodné a používateľské zhodnotenie pôvodného webu,
- `index.html` — funkčný návrh novej úvodnej stránky.

Oba súbory fungujú bez frameworku a build procesu. Stačí ich otvoriť v modernom prehliadači alebo spustiť cez jednoduchý lokálny server.

## Stručná analýza pôvodného webu

Club M.K.M. je penzión v centre Modry, približne 24 km od Bratislavy. Pôvodný web uvádza ubytovanie, reštauráciu, bistro, bar, krytý bazén, saunu, fitness, tenis, bowling, biliard, garáže, požičanie bicyklov a priestory na pracovné i spoločenské podujatia. Pravdepodobné cieľové skupiny sú hostia hľadajúci pobyt v Modre, organizátori menších podujatí a miestni návštevníci gastronómie.

Pôvodná stránka je jedna veľmi dlhá šablónová stránka so stálou bočnou navigáciou. Ponuka penziónu je zhrnutá v dlhých odsekoch, po ktorých nasleduje galéria bez popisov, osem rámcov s menu a rozsiahly jedálny lístok v tabuľkách. Telefón je viditeľný, no chýba priamy dopyt na ubytovanie, výber termínu a vysvetlený rezervačný postup. Nenašli sa prezentované referencie, certifikáty, partnerstvá ani konkrétne kapacity izieb a priestorov.

## Tri problémy vybrané do reportu

1. Penzión, izby a možnosti oddychu nemajú jasnú prioritu ani presvedčivý kontext.
2. Rámce s denným menu a dlhé tabuľky prekrývajú cestu k pobytu a komplikujú mobilné používanie.
3. Chýba priamy dopyt na ubytovanie alebo podujatie, hoci telefón a e-mail sú dostupné.

Orientačné skóre 38/100 vzniklo prepočtom ôsmich rovnako vážených oblastí: jasnosť ponuky, cesta ku kontaktu, dôveryhodnosť, mobilná použiteľnosť, čitateľnosť, základná prístupnosť, vizuálna konzistentnosť a základné SEO/výkon. Ide o zhodnotenie viditeľných oblastí, nie certifikovaný audit.

## Hlavné UX/UI rozhodnutia

- Úvod jednoznačne vysvetľuje lokalitu, ubytovanie a hlavné vybavenie.
- Hlavná konverzia je overenie dostupnosti; telefonát zostáva rýchlou alternatívou.
- Obsah je rozdelený na ubytovanie, oddych, podujatia a gastronómiu.
- Reálne fotografie z pôvodného webu sú použité s vecnými alternatívnymi textami.
- Vínová farba pôvodnej identity je modernizovaná a doplnená teplým neutrálnym systémom.
- Homepage obsahuje skip link, viditeľné focus stavy, klávesnicové mobilné menu, popisy formulára, zrozumiteľnú validáciu a režim obmedzeného pohybu.
- Formulár je zámerne označený ako statická ukážka a nepredstiera odoslanie.

## Údaje na potvrdenie alebo doplnenie

- aktuálna cena ubytovania a spôsob rezervácie,
- typy izieb, kapacity, vybavenie a dostupné fotografie vo vyššom rozlíšení,
- aktuálna prevádzka bazéna, sauny, fitness, bowlingu, tenisu, solária, garáží a požičovne bicyklov,
- otváracie hodiny reštaurácie a baru, ceny a spôsob aktualizácie denného menu,
- kapacity, technické vybavenie a podmienky prenájmu priestorov na podujatia,
- obchodné údaje, zásady ochrany osobných údajov a prípadné storno podmienky,
- overené referencie, partnerstvá alebo certifikáty, ak ich firma má,
- aktuálnosť oboch telefónnych čísel a e-mailovej adresy,
- formulárová služba alebo backend, kam sa majú dopyty odosielať.

## Formulár

V `index.html` je pripravená validácia a používateľská spätná väzba. Pred nasadením treba v obsluhe udalosti `submit` nahradiť ukážkovú správu reálnym odoslaním do zvolenej formulárovej služby alebo backendu a doplniť požadované informácie o ochrane osobných údajov.

## Zdroje podkladov

- Obsah, kontakty a firemné fotografie: [pôvodný web Club M.K.M.](https://www.clubmkm.sk/), skontrolované 5. augusta 2026.
- Všetky fotografie v `assets/images/` pochádzajú z verejne dostupnej galérie pôvodného webu. Boli uložené lokálne a prevedené do formátu WebP; nepoužívajú hotlinking.
- Neboli použité fotografie tretích strán ani externé fonty.

## Štruktúra

```text
report.html
index.html
assets/
  images/
  icons/
  fonts/
README.md
```
