# Rehabilitácia Straka

Návrh redizajnu pôvodného webu `rehabilitacia-straka.webnode.sk` podľa kompozície referenčnej šablóny Webscale.

## Obsah

- `index.html` - sémantická one-page stránka so SEO metadátami a schema.org údajmi
- `styles.css` - responzívny tmavý dizajn a podpora redukovaného pohybu
- `main.js` - mobilná navigácia a animácie pri vstupe do viewportu
- `assets/*.webp` - fotografie vytvorené pre tento návrh pomocou vstavaného generátora obrázkov
- `assets/logo-rehabilitacia-straka.svg` - vlastný symbol pohybu a podpory pre značku
- `assets/icon-*.svg` - lokálne ikony z otvorenej knižnice Lucide Icons

Pätička obsahuje vloženú Google mapu prevádzky v Dolnej Súči.

## Lokálne spustenie

Z priečinka `beewoy-web` spustite jednoduchý statický server, napríklad:

```bash
python3 -m http.server 4173
```

Potom otvorte `http://localhost:4173/projekty/navrhy/rehabilitacia-straka/`.

## Poznámka k cenníku

Hodnoty boli prevzaté z pôvodného webu a v návrhu sú zámerne označené ako orientačné. Pred publikovaním ich treba potvrdiť s prevádzkovateľom.

## Použité obrazové prompty

Hero: fotorealistická široká fotografia fyzioterapeuta pri mobilizačnom cvičení s pacientkou, osoby vpravo, tmavý negatívny priestor vľavo, uhlíkovo-hnedá scéna s hrdzavými akcentmi, bez textu a loga.

Podporná fotografia: fotorealistický detail rúk pri vyšetrení ramena, tváre mimo záberu, denné svetlo, neutrálne prostredie s hrdzavým akcentom, bez textu a loga.

Obe fotografie boli vytvorené vstavaným nástrojom ImageGen.
