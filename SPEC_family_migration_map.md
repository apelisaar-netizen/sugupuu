# Family Migration Map — Reusable Specification

Goal: turn a genealogy export (.md ahnentafel) into a self-contained .html animation that visualizes where family members were born over time on a map.

The source project by Hannes Seeberg (`@hseeberg/sugupuu-kaardil`) is adapted here into a simpler ChatGPT-friendly workflow.

Input format:
- One person per line
- Each line starts with generation number
- Format looks like:

```md
3\. [Johannes Seeberg](https://www.geni.com/profile-94116782) b. October 18, 1914, Kõo v, Pilistvere khk, Viljandimaa
```

Pipeline:

```bash
python3 parse.py mytree.md
python3 build_html.py
```

Variants:
- `--forward`
- `--descendants`
- `--anon`
- `--en`

This repo is intended to be used in a ChatGPT conversation by uploading the `.md` file and the scripts, then issuing a prompt.

See also:
- `README.md`
- `chatgpt_prompt.md`
