# Family migration map — ChatGPT-friendly version

Use this prompt inside ChatGPT after uploading the genealogy markdown export and the project scripts.

Prompt (Estonian):

```text
Visualiseeri see sugupuu animeeritud Eesti kaardil.
Kasuta selle tööruumi skripte: parse.py ja build_html.py.
Jooksuta parse.py antud .md failil, siis build_html.py.
Anna tulemus alati ühe HTML-failina.
Vaikimisi: nimedega, edasisuunaline, 0.5x kiirus.
Kui ei ole selge, küsi ainult suuna, anonüümsuse või keele kohta.
```

Prompt (English):

```text
Visualise this family tree as an animated map of Estonia.
Use the scripts in this workspace: parse.py and build_html.py.
Run parse.py on the uploaded .md file, then build_html.py.
Always output a single HTML file.
Default: named, forward direction, 0.5x speed.
Only ask for clarification if direction, anonymity, or language is unclear.
```

Optional variants:

```text
Visualise this family tree anonymously.
```

```text
Visualise this family tree in English.
```

```text
Visualise this family tree backwards.
```

```text
Visualise this family tree as descendants, forward direction.
```

This is the same workflow as the original `@hseeberg/sugupuu-kaardil` project, adapted to be usable from ChatGPT with a simple natural-language instruction.
