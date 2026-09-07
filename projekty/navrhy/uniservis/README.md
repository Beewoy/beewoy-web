# UNISERVIS Levice

Statický prezentačný web bez frameworku a bez build kroku. Projekt tvoria súbory `index.html`, `styles.css` a `main.js`.

## Lokálne spustenie

V tomto priečinku spustite ľubovoľný statický server, napríklad:

```bash
python3 -m http.server 4173
```

Web bude dostupný na `http://localhost:4173`.

## Centrálna konfigurácia

Firemné údaje sú na jednom mieste v JSON bloku `#site-config` v `index.html`. Odtiaľ sa vkladajú do kontaktov, odkazov, otváracích hodín a štruktúrovaných dát.

Pred nasadením doplňte:

- `productionUrl`: finálna verejná URL vrátane `https://`. Až potom sa automaticky aktivuje canonical, `og:url`, `og:image` a URL v JSON-LD.
- `openingHours`: overený text otváracích hodín. Ak zostane prázdny, blok sa na stránke nezobrazí a údaj sa nepridáva do JSON-LD.
- `formEndpoint`: URL funkčného POST endpointu pre formulár.

## Formulár

Odosielanie je oddelené v adaptéri `submitInquiry()` v `main.js`. Kým `formEndpoint` nie je nastavený, formulár po validácii pravdivo oznámi, že online odoslanie nie je nakonfigurované, a ponúkne telefón a e-mail. Nezobrazuje falošný úspešný stav.

Endpoint musí prijímať JSON POST s poľami:

- `machineType`
- `machineModel`
- `problem`
- `location`
- `name`
- `phone`
- `email`

Úspešnú HTTP odpoveď signalizujte stavom 2xx. Pred reálnym zberom osobných údajov doplňte odkaz na zásady ochrany osobných údajov a spracovanie formulára zabezpečte na serveri.

## Obrázok

Hero používa existujúcu fotografiu opravy motora z repozitára ako transparentne označenú ilustračnú fotografiu. WebP verzia znižuje prenos a JPEG zostáva ako fallback. Pred ostrým nasadením ju nahraďte reálnou fotografiou dielne alebo servisnej práce v odporúčanom rozmere 1600 x 1200 px. Zachovajte názvy súborov alebo upravte cesty v HTML.

## SEO súbory

`robots.txt` je pripravený. Sitemap a riadok `Sitemap:` v `robots.txt` doplňte až po potvrdení produkčnej domény, aby sa do vyhľadávačov neposielala vymyslená alebo neplatná URL.

Príklad minimálnej sitemap po potvrdení domény:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://potvrdena-domena.sk/</loc></url>
</urlset>
```
