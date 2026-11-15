# Kohanimede andmestik

Rakenduses on EKI KNAB-i 15.02.2010 asustusüksuste loendist 4638 koordinaatidega kirjet ning 31 täiendavat linna/alevit. EKI kirjed sisaldavad tollast maakonda ja valda; tegu ei ole tänapäevase haldusjaotuse registriga. Päritolu: https://arhiiv.eki.ee/knn/amas_rs.htm, https://arhiiv.eki.ee/knn/amas_np.htm, https://arhiiv.eki.ee/knn/amas_tu.htm, https://arhiiv.eki.ee/knn/amas_lm.htm, https://arhiiv.eki.ee/knn/amas_vy.htm, https://arhiiv.eki.ee/knn/amas_k.htm, https://arhiiv.eki.ee/knn/amas_aj.htm . Loetud 15.11.2026.

Täiendavate linnade/alevite ning ajalooliste nimede lähteandmed: Hannes Seebergi MIT-litsentsiga projekt https://github.com/hseeberg/sugupuu-kaardil/blob/main/parse.py . Selise, Rõsna ja Võmmorski koordinaadid: EKI loend. Kaart: Natural Earth (avalik omand).

Asulat otsitakse kõigepealt nime järgi; samanimelisi asulaid eristatakse aadressi maakonna ja valla abil. Ebaselge vaste jääb valimiseks. Kirjavea soovitusi ei paigutata automaatselt kaardile. Kihelkonna/maakonna varuvaste on märgitud piirkonnana. Kõik koordinaadid on ligikaudsed asulakeskused.

Kohaparandusi saab eksportida ja importida versioonitud JSON-failina (format=sugupuu-places, version=1). Fail sisaldab kohatekste, silte ja koordinaate; inimeste nimesid ei lisata. Hoia faili privaatselt, sest ka kohatekstid võivad olla tundlikud. Impordi piir 2 MB, kuni 5000 parandust; kõik kirjed valideeritakse enne rakendamist. Parandused kehtivad sama normaliseeritud kohateksti puhul ja säilivad seansi jooksul ka uue GEDCOM-i valimisel. Serverit, brauseri püsimälu ja väliseid geokodeerimisteenuseid ei kasutata.

Kontrollitud: samanimelised külad; sama maakonna piires mitmetähenduslik koht; maakonna järgi eristamine; asula eelistamine kihelkonnale; kirjavea kinnitamist vajav soovitus; paranduste eksport-import; vigase impordi atomaarne tagasilükkamine; kaardi viitenimede sõltumatus isikute kohasobitusest.
