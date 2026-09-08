# Pekáreň Takáč a syn

Statický responzívny návrh webu pre rodinnú pekáreň v Trnave.

Vizuálne a komponentové pravidlá sú zdokumentované v `design-system/takac-bakery-paper/MASTER.md`.

## Lokálne spustenie

```bash
python3 -m http.server 4173
```

Web bude dostupný na `http://127.0.0.1:4173`.

## Objednávka

Objednávkový sprievodca načítava 94 produktov z `assets/data/products.json`, uchováva rozpracovanú objednávku v prehliadači a pripraví e-mail pre `takacasyn@palmsoft.sk`. Pôvodný Excel je v `assets/downloads/Tyzdenna_objednavka.xls`.

Pred ostrým nasadením treba doplniť serverové odosielanie objednávok. Aktuálna verzia zámerne neoznačí objednávku ako odoslanú, kým používateľ nepotvrdí správu vo svojej e-mailovej aplikácii.

## Pracovné podklady

Logo je pracovný raster koncept a hlavná fotografia je generovaná pre návrh. Produktové a historické fotografie pochádzajú z pôvodného webu pekárne. Pred ostrým spustením odporúčame finálne vektorové logo a novú fotografickú sériu z výroby a predajne.
