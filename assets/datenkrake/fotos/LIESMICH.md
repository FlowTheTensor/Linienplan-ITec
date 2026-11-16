# Fotos und Videos der Modellanlage

Der Linienplan zeigt bei einigen Stationen Fotos oder ein Video der echten Modellanlage. Er sucht dafür nach festen Dateinamen in diesem Ordner. Liegt eine Datei hier, erscheint sie automatisch unter „Wozu brauchst du das?“. Fehlt sie, bleibt der Platz einfach leer.

| Datei | Station | Was darauf zu sehen sein soll |
|---|---|---|
| `tia-datenbaustein.webp` | Arrays & Structs | Der Datenbaustein dbMESStation im TIA Portal |
| `uaexpert-datentypen.webp` | Bit-Bahnhof | Die Werte der Presse mit ihren Datentypen in UAExpert |
| `raspberry-ssd.webp` | Platinenstadt | Der Raspberry Pi 5 der Datenkrake mit SSD |
| `arduino-uno-q.webp` | Platinenstadt | Der Arduino UNO Q mit Mikrofon |
| `dockingstation.webp` | Dojo · Seriell | Arduino UNO Q, Dockingstation, Mikrofon und Webcam |
| `docker-compose-ps.webp` | Docker Essentials | „docker compose ps“ auf dem Raspberry der Datenkrake |
| `switch-anlage.webp` | Dojo · MAC | Switch im Schaltschrank der Modellanlage |
| `anlage-stationen.webp` | Dojo · IPv4 | Die Stationen der Modellanlage |
| `leitstand.webp` | Paketreise | Der Leitstand der Datenkrake im Browser |
| `anlage-video.mp4` | Datenkrake | Die Modellanlage in Betrieb |

## Hinweise

- **Fotos** als `.webp`, `.jpg` oder `.png` mit dem Namen aus der Tabelle (die Endung darf abweichen, der Plan probiert alle drei). Längste Seite höchstens 1600 px, möglichst unter 300 KB.
- **Videos** als `.mp4` (H.264), kurz halten (unter 30 s) und klein (unter 15 MB). GitHub erlaubt höchstens 100 MB pro Datei, und jede Datei macht das Repo für immer größer.
- **Bildschirmfotos** (UAExpert, TIA Portal, Leitstand, `docker compose ps`) gehen genauso.
- **Datenschutz:** keine erkennbaren Personen, keine Namen auf Bildschirmen, keine Zugangsdaten oder Passwörter im Bild.
- Weitere Fotos: im `plan.js` bei der Station unter `medien` einen Eintrag `{ "datei": "assets/datenkrake/fotos/name.webp", "text": "Bildunterschrift" }` ergänzen.
