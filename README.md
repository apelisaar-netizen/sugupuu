# sugupuu-kaardil

See variant on aluseks võetud `@hseeberg/sugupuu-kaardil` projektist ja muudetud selliselt, et seda saab mugavalt kasutada ka ChatGPT-is / ChatGPT-iga töötades.

Kokkuvõte:
- Saad kasutada sama Geni eksporti .md kujul.
- ChatGPT saab uploadida failid ja anda lihtsa käsu.
- Projekt genereerib HTML-kaardi, kus sugupuu liikmed ilmuvad Eesti kaardil aja jooksul.

Mida repo sisaldab:
- `build_map.py` – kaardi loomine
- `parse.py` – .md parseerimine ja geokodeerimine
- `build_html.py` – HTML renderdus
- `sample_descendants.md` – testpuu
- `SPEC_family_migration_map.md` – tehniline dokumentatsioon

Kuidas ChatGPT-ga kasutada:
1. Lae repo failid ChatGPT projekti või konteksti.
2. Lisa Geni eksport .md failina.
3. Kasuta selle käsu:

```text
Visualise this family tree as an animated map in Estonia.
Use the scripts in this workspace: parse.py and build_html.py.
Run parse.py on the uploaded .md file, then build_html.py.
Output a single HTML file.
Default: names visible, forward direction, 0.5x speed.
Only ask for clarification if the direction or language is unclear.
```

4. Kui soovid anonüümsust või inglise keelt, lisa näiteks:

```text
Visualise this family tree, anonymous, in English, forward direction.
```

5. Ava genereeritud HTML brauseris.

Lisaks on projekt algselt mõeldud Claude Projecti jaoks, kuid sama töövoog toimib ka ChatGPT-is, kui failid on kontekstis saadaval.

Tehniline dokumentatsioon: `SPEC_family_migration_map.md`
