# KOVMONT PLUS — návrh novej homepage

Samostatný návrh novej úvodnej stránky spoločnosti KOVMONT PLUS s.r.o. vychádza z analýzy pôvodného webu a zachováva reálnu ponuku, kontaktné údaje, pôvodné logo aj fotografie firmy.

## Obsah projektu

- `index.html` — kompletná responzívna homepage s CSS a JavaScriptom priamo v súbore
- `assets/images/kovmont/` — lokálne logo a fotografie prevzaté z pôvodného webu spoločnosti
- `report.html` — samostatný report z predchádzajúcej etapy; nie je súčasťou homepage
- `assets/images/beewoy-logo.svg` — asset používaný iba samostatným reportom

Homepage neobsahuje report, audit, hodnotenie, Beewoy logo ani Beewoy branding.

## Spustenie

Stránka funguje otvorením súboru `index.html` v modernom prehliadači. Nevyžaduje framework, balíčkovací systém, externé písma ani build proces.

Pre vývoj je možné použiť ľubovoľný jednoduchý lokálny server, nie je to však podmienka.

## Informačná architektúra

Poradie obsahu sleduje rozhodovanie potenciálneho zákazníka:

1. okamžité vysvetlenie dvoch hlavných oblastí ponuky,
2. stručné predstavenie firmy a používaných materiálov,
3. služby rozdelené podľa konkrétnej potreby,
4. reálne výhody deklarované spoločnosťou,
5. autentické fotografie výroby a realizácií,
6. referencie označené ako údaje z pôvodného webu,
7. FAQ s praktickými informáciami k dopytu,
8. priamy kontakt a ukážkový formulár.

Primárna konverzná cesta vedie na sekciu `#kontakt`. Odkazy v kartách služieb zároveň predvyberú príslušnú oblasť vo formulári.

## Obsah a pravdivosť

Homepage používa iba služby a údaje dostupné na pôvodnom webe alebo vo verejnom obchodnom registri:

- výroba a servis potravinárskych strojov,
- potravinárske prevádzky na kľúč,
- kovové a nerezové konštrukcie,
- brány, dvere, mreže, ploty, zábradlia, schodiská, oplotenia, markízy, prekrytia a atypické výrobky,
- zváranie, rezanie, strihanie, sústruženie a frézovanie,
- bazár potravinárskych strojov,
- konzultačno-poradenská činnosť.

Nevytvorili sa nové recenzie, hodnotenia, certifikáty, ocenenia, počty realizácií ani sociálne profily. Verejné vyhľadávanie nepotvrdilo oficiálne aktívne sociálne siete alebo spravovaný Google Business Profile, preto sa v návrhu nezobrazujú.

Referencie sú výslovne označené ako výber názvov uvádzaných spoločnosťou na pôvodnom webe. Pred ostrým publikovaním treba potvrdiť ich aktuálnosť a súhlas s použitím.

## Vizuálny smer

- pôvodné logo zostalo bez úprav,
- tmavý grafit vytvára industriálny základ,
- tmavšia bordovo-ružová nadväzuje na farbu loga a zlepšuje kontrast bieleho textu,
- fotografie sú prezentované bez predstierania názvu alebo rozsahu konkrétnej zákazky,
- rozhranie používa systémové písma a nevyžaduje externé fontové súbory.

## Zdroje obrázkov

Všetky obrázky použité v návrhu pochádzajú z pôvodného webu KOVMONT a sú uložené lokálne:

- `assets/images/kovmont/logo-kovmont.png` — [pôvodné logo](http://kovmont.sk/image/logo-kovmont.png)
- `assets/images/kovmont/food-machine-01.jpg` — [pôvodná fotografia](http://kovmont.sk/images/image-1.jpg)
- `assets/images/kovmont/food-machine-02.jpg` — [pôvodná fotografia](http://kovmont.sk/images/image-4.jpg)
- `assets/images/kovmont/steel-stairs.jpg` — [pôvodná fotografia](http://kovmont.sk/images/image-11.jpg)
- `assets/images/kovmont/steel-gate.jpg` — [pôvodná fotografia](http://kovmont.sk/images/image-18.jpg)
- `assets/images/kovmont/steel-railing.jpg` — [pôvodná fotografia](http://kovmont.sk/images/image-21.jpg)
- `assets/images/kovmont/workshop-01.jpg` — [pôvodná fotografia](http://kovmont.sk/image/back-020.jpg)
- `assets/images/kovmont/workshop-02.jpg` — [pôvodná fotografia](http://kovmont.sk/image/back-021.jpg)
- `assets/images/kovmont/workshop-03.jpg` — [pôvodná fotografia](http://kovmont.sk/image/back-022.jpg)

Neboli použité fotografie z fotobánk ani hotlinking.

## Formulár a napojenie backendu

Formulár `#inquiry-form` je zámerne v ukážkovom režime:

- vykonáva HTML validáciu povinných polí,
- kontroluje, či používateľ uviedol aspoň e-mail alebo telefón,
- údaje nikam neodosiela,
- po úspešnej kontrole zobrazí jasnú informáciu o neaktívnom odosielaní.

Miesto na integráciu je označené komentárom `FORM ENDPOINT` v JavaScripte na konci `index.html`. Pri nasadení treba:

1. nastaviť cieľový endpoint alebo formulárovú službu,
2. nahradiť ukážkový submit handler skutočným odoslaním,
3. pridať úspešný a chybový stav,
4. doplniť ochranu proti spamu,
5. doplniť a prepojiť klientom schválené informácie o spracovaní osobných údajov.

Kým backend nie je pripojený, používateľ môže použiť priamy odkaz na e-mail alebo klikateľné telefónne čísla.

## Prístupnosť

Návrh obsahuje:

- logickú hierarchiu nadpisov a sémantické HTML5 prvky,
- odkaz na preskočenie navigácie,
- klávesnicovo ovládateľné mobilné menu s podporou klávesu Escape,
- viditeľné `focus-visible` stavy,
- minimálne 44–52 px vysoké hlavné interaktívne prvky,
- popisky formulárov, typy polí a automatické dopĺňanie,
- alternatívne texty fotografií,
- dostatočné textové kontrasty,
- podporu `prefers-reduced-motion`,
- živý oznamovací región pre stav ukážkového formulára.

Návrh nepredstavuje certifikovaný audit ani právnu garanciu zhody.

## SEO

`index.html` obsahuje:

- popisný titulok a meta description,
- jediný hlavný nadpis `h1`,
- logickú hierarchiu ďalších nadpisov,
- popisné alternatívne texty,
- základné JSON-LD údaje typu `LocalBusiness` s overeným názvom, adresou, e-mailom, telefónom a IČO.

Pred produkčným nasadením treba aktualizovať kanonickú URL, overiť HTTPS, doplniť favicon a podľa finálnej domény doplniť Open Graph údaje.

## Kontaktné údaje použité v návrhu

- Samuel Lederleitner — 0903 311 486
- Boris Rášo — 0905 533 627
- pevná linka — +421 33 649 02 37
- e-mail — kovmont@yahoo.com
- adresa — Družstevná 1, 900 89 Častá
- IČO — 44331703
- IČ DPH — SK 2022661223

## Pred ostrým publikovaním

- potvrdiť aktuálnosť služieb, kontaktov a referencií,
- doplniť texty a parametre konkrétnych realizácií,
- napojiť formulár a schválené informácie o ochrane osobných údajov,
- potvrdiť vlastníctvo a aktuálnosť prípadného Google Business Profile,
- nasadiť funkčnú HTTPS doménu a vykonať finálne SEO, výkonové a prístupnostné testovanie.
