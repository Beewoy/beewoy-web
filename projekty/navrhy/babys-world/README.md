# Baby’s world — návrh webu

Samostatný statický návrh vedľa ostatných projektov v `projekty/navrhy/`. Vizuálne vychádza z kompozície návrhu Hrášok, má vlastnú modro-koralovú paletu a jednoduché logo vytvorené v CSS.

Nadpisové písmo Baloo 2 je uložené lokálne v `assets/`; podporuje slovenskú diakritiku. Licencia OFL je v `assets/Baloo2-OFL.txt`.

## Obsah

Úvod, o nás, režim dňa, aktivity, cenník, recenzie rodičov, predbežná prihláška, kontakt a kariéra.

## Pred zverejnením

- Potvrdiť aktuálnosť cenníka, prevádzkových hodín, kontaktných a firemných údajov.
- Schváliť použitie recenzií a fotografií. Fotografie sú ilustračné a ich zdroje sú v `PHOTO-CREDITS.md`.
- Prihláška teraz pripraví e-mail vo vlastnom poštovom programe návštevníka; nemá serverové odosielanie ani úložisko. Pre ostrú prevádzku treba odsúhlasiť spôsob bezpečného odoslania a text ochrany osobných údajov.
- Nahradiť ilustračné fotografie autentickými zábermi, ak ich škôlka dodá so súhlasmi.

Lokálny náhľad: `python3 -m http.server 8777 --directory beewoy-web`, potom otvoriť `http://localhost:8777/projekty/navrhy/babys-world/`.
