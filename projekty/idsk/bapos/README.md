# BAPOS — IDSK 3 návrh

Prvá pracovná ukážka pre Bardejovský podnik služieb BAPOS. Návrh používa jasné vstupy podľa hlavných potrieb občanov: odpad, parkovanie, cintoríny a hlásenie porúch.

## Stav

- Kandidát: BAPOS, mestský podnik Bardejov
- Zdroj: https://www.bapos.sk/
- Exclusion check: v dostupnom verejnom obsahu nebol identifikovaný WEBY GROUP ani InterWay; treba potvrdiť technického prevádzkovateľa priamo s BAPOS pred oslovením.
- Návrh: `index.html`
- Stav: discovery preview, nie hotová implementácia

## Ďalší krok

Overiť s BAPOS technického prevádzkovateľa, kontaktnú osobu a záujem o krátky accessibility/UX audit. Až potom pripraviť druhú iteráciu s reálnymi dátami, formulárom podnetu a mobilným testom.
# BAPOS IDSK 3 preview

Preview otváraj cez HTTP, nie dvojklikom na `index.html`. Chrome blokuje oficiálny IDSK ES module JavaScript pri protokole `file://`.

```sh
./serve.sh
```

Potom otvor <http://localhost:4173/>.
