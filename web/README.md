# Sugupuu veebirakendus

Geni GEDCOM-ekspordi visualiseerija: sugupuu, nimeotsing, lähteisiku valik ja sünnikohtade kaart.

## Kasutamine

Lihtsaim viis: laadi hoidla juurest `Sugupuu.html` alla ja ava brauseris. See sisaldab kõiki vajalikke ressursse. Vajuta „Lisa Geni eksport” ja vali `.ged`, `.gedcom` või ühte GEDCOM-faili sisaldav `.zip`. ZIP-tugi vajab kaasaegset brauserit, mis toetab DecompressionStream('deflate-raw'). Faili suuruse piir on 10 MB.

Veebiserveris kasutamiseks avalda selle `web/` kausta sisu staatilise saidina. Ehitussammu ega sõltuvuste paigaldamist pole vaja. Näiteks `npx --yes http-server web` hoidla juurkaustas.

## Andmed ja piirangud

- Isikuandmeid töödeldakse brauseris ja neid ei salvestata serverisse. Lehe värskendamisel tuleb fail uuesti valida.
- Näidispere on väljamõeldud. Kasutaja GEDCOM-eksport ei ole lähtekoodi lisatud.
- Sugupuu näitab lähteisikut ja kuni nelja põlvkonda tema esivanemaid. Teise haru vaatamiseks vali teine lähteisik.
- Kaart kasutab väikest kohanimede sõnastikku. Koordinaadid tähistavad ligikaudseid asulakeskusi. Puuduvad ja sobitamata kohad on loetletud kaardi kohal; neid ei hinnata automaatselt.
- Puuduvad sünniajad jäävad puuduvaks. Kattuvad kaardipunktid nihutatakse loetavuse jaoks.
- Rakendus ei ühendu Geni kontoga ja ei sisalda veel ChatGPT MCP-integratsiooni.

## Kontrollimine

JavaScripti süntaks kontrollitud Node.js-ga. ZIP-ist GEDCOM-i lugemine kontrollitud 20 isiku ja 11 perega failil; kõik pereseoste viited lahenesid. Näidisandmetel kontrollitud puu- ja kaardivaate SVG genereerimist. Brauseri visuaalne kontroll on veel tegemata.

## Kaardi allikas

`map.json`: Natural Earth (avalik omand), võetud Hannes Seebergi MIT-litsentsiga projektist https://github.com/hseeberg/sugupuu-kaardil. Vaata `NOTICE.txt`.
