# KONTRAKT SK — návrh novej homepage

Statický projekt obsahuje samostatné stručné zhodnotenie pôvodného webu a oddelený funkčný návrh novej homepage. Začnite otvorením `report.html`; jeho tlačidlo smeruje relatívnym odkazom na `index.html`. Nie je potrebný build proces ani internetové pripojenie.

## Štruktúra

- `report.html` — samostatný stručný report s neutrálnym vizuálnym systémom
- `index.html` — samostatný redizajn homepage; všetko HTML, CSS a JavaScript
- `assets/images/` — lokálne logo a firemné fotografie
- `README.md` — dokumentácia projektu

## Overené podklady

Obsah bol spracovaný z verejných stránok `https://www.kontraktsk.sk/`: Úvod, O nás, Výroba paliet, Oprava paliet, Nákup paliet a Kontakt (kontrola 5. augusta 2026). Použité logo a fotografie pochádzajú priamo z pôvodného webu spoločnosti. Nie sú použité externé ilustračné fotografie ani hotlinking.

Farebný systém redizajnu nadväzuje na pôvodnú identitu: červenú z loga dopĺňajú teplé drevené a neutrálne sivé tóny. Samostatný report zámerne používa neutrálny, opakovateľný analytický vizuál.

Report pripravený štúdiom Beewoy používa lokálne uložené oficiálne logo zo zdroja `https://beewoy.sk/logo.svg`. Čierno-žltý vizuálny systém reportu je oddelený od firemnej identity klienta; logo Beewoy sa v `index.html` nepoužíva.

## Formulár

Projekt je statický, preto formulár nepredstiera serverové odoslanie. Po validácii otvorí predvyplnenú správu pre `info@kontraktsk.sk` v e-mailovom programe používateľa. Pri nasadení odporúčame napojiť formulár na overený backend alebo formulárovú službu, doplniť ochranu proti spamu a informácie o spracúvaní osobných údajov.

## Údaje na potvrdenie pred publikovaním

- aktuálnosť kapacít 150 000 ks výroby a 200 000 ks opráv ročne,
- počet zamestnancov, rozloha skladu a presné znenie licencie/garanta,
- rozsah dopravy, likvidácie odpadu a paliet opravovaných priamo u zákazníka,
- otváracie hodiny (pôvodný web neuvádza štvrtok),
- firemné identifikačné údaje, zásady ochrany súkromia a cookies,
- definitívny spôsob odosielania formulára a osoba zodpovedná za dopyty.

## Prístupnosť a technické poznámky

Návrh používa sémantické HTML, odkaz na preskočenie navigácie, viditeľné focus stavy, ovládateľné mobilné menu, popisy polí a obrázkov, responzívne rozloženie a rešpektuje `prefers-reduced-motion`. Ide o návrh so zohľadnením základných pravidiel prístupnosti, nie o certifikovaný audit alebo garanciu súladu.
