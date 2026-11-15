# Linienplan Informationstechnik · Dein Weg zum Laborserver

Das Schuljahr als Liniennetz: Drei Linien – **Programmieren**, **Systeme** und **Netze** – führen durch alle Lernsituationen und Kurse. Sie treffen sich an den Knoten des Leitprojekts: **Laborserver Version 1**, **Laborserver Version 2** und der **Abnahme**. Jede Station zeigt, wie viele Prüfsiegel oder Dojo-Gürtel schon gesammelt sind. Die Siegel bauen ein Server-Rack mit sechs Einschüben aus, bis der Laborserver zur Abnahme bereit ist.

Staatliche Fachschule für Elektrotechnik, Jakob-Preh-Schule Bad Neustadt a. d. Saale ([bsnes.de](https://www.bsnes.de)) · Fach Informationstechnik (ITec) · 1. Schuljahr

**Live:** <https://flowthetensor.github.io/Linienplan-ITec/>


## Die drei Linien

| Linie | Lerngebiet | Stationen |
|---|---|---|
| Programmieren (rot) | LG 3 Algorithmen entwickeln und codieren | C++-Einstieg, Algorithmen-Koch, if-Entscheidung, Schleifen, Tresorknacker I, Funktionen, Arrays und Structs, Tresorknacker II, Dateiarbeit, Tresorknacker III → Laborserver Version 2 |
| Systeme (blau) | LG 1 Computersysteme konfigurieren | Bit-Bahnhof, Platinenstadt, Linux Unhatched, Docker Essentials → Laborserver Version 1, danach „eigener Container läuft“ bis Version 2 |
| Netze (grün) | LG 2 Computernetzwerke planen | Dojo Seriell, MAC, Topologien, Kabel, IPv4 → Laborserver Version 1 → Dojo OSI, Paketreise, Dojo Dienste, IPv6, Sicherheit → Abnahme |

Die Seite enthält bewusst keine Monate oder Termine. Die Reihenfolge von links nach rechts entspricht dem Ablauf im Unterricht.

## Stationsarten

| Symbol | Art | Fortschritt |
|---|---|---|
| Kreis | Lernsituation | Prüfsiegel der Freigabestufen |
| Quadrat | Kurs | Gürtel im Netzwerk-Dojo; Linux Unhatched und Docker Essentials hakt man selbst ab |
| kleiner Punkt | Unterrichtsthema | ohne Siegel |
| Kasten | Laborserver | leuchtet, sobald die nötigen Einschübe online sind |

Ein Klick auf eine Station zeigt Inhalt, alle Siegel bzw. Gürtel und den Link zur Lernsituation. Ohne Auswahl steht dort der **nächste offene Halt**: die erste Station von links, deren Ziel noch nicht erreicht ist. Er pulsiert auch im Plan.

## Die Ausbaustufen des Laborservers

| Einschub | Bedingung | schaltet frei |
|---|---|---|
| U1 Rechenkern | Bit-Bahnhof und Platinenstadt komplett | |
| U2 Steuerlogik | Algorithmen-Koch Stufe 1–4, Tresorknacker Raum 1–3 | |
| U3 Netzanschluss | Dojo Seriell (3 Gürtel), MAC (3), Topologien (2), Kabel (3), IPv4 (4), Linux und Docker abgehakt | Laborserver Version 1 |
| U4 Netzdienste & Sicherheit | Paketreise komplett, Dojo OSI (2), Dienste (3), IPv6 (2), Sicherheit (2) | |
| U5 Messdaten-Auswertung | Algorithmen-Koch Stufe 5–6, Tresorknacker Raum 4–8, 10 und 11 | Laborserver Version 2 |
| U6 Bereit zur Abnahme | U1 bis U5 online | Abnahme |

Das Labyrinth (Zeiger) im Tresorknacker ist Bonus und zählt nicht. Die Gürtelzahlen sind bewusst niedrig gewählt: Die ersten Gürtel decken den Unterrichtsstoff ab, die höheren sind Differenzierung. Wird ein Einschub neu online, erscheint eine kurze Meldung. Oben im Rack kann jeder seinen Hostnamen eintragen.

## Woher kommen die Siegel?

Die Lernsituationen speichern ihre Prüfsiegel im `localStorage` des Browsers. Alle Seiten liegen unter `flowthetensor.github.io` und teilen sich deshalb diesen Speicher. Der Linienplan liest ihn nur aus. Es wird nichts verschickt, es gibt keine Anmeldung und keinen Server.

| Quelle | Schlüssel im localStorage | Format |
|---|---|---|
| Bit-Bahnhof, Algorithmen-Koch, Platinenstadt, Paketreise | `bitbahnhof-freigaben`, `algokoch-freigaben`, `platinenstadt-freigaben`, `paketreise-freigaben` | Array mit 6 Wahrheitswerten |
| Tresorknacker | `tresorknacker-siegel` (alt: `tresorknacker-freigaben`) | Objekt Raum-id → true |
| Netzwerk-Dojo | `netzwerk-dojo:seriell-belts`, `…:mac-belts`, `…:belts` (IPv4) usw. | Objekt Gürtel-id → true |
| Linux, Docker | `fahrplan-itec-abgehakt` | Objekt, vom Linienplan selbst gespeichert |

Folgen für den Unterricht:

- Der Fortschritt gilt **pro Browser und Gerät**. Wer den Laptop wechselt, einen anderen Browser nimmt oder die Websitedaten löscht, sieht leere Stationen. Die Siegel sind also eine Lernhilfe und kein Nachweis.
- Auf **nerdifant.de** würde der Linienplan keine Siegel sehen (anderer Ursprung). Er muss deshalb auf GitHub Pages unter `flowthetensor.github.io` laufen. Vom Dashboard aus kann er natürlich verlinkt werden.
- Wird eine Lernsituation umbenannt oder ändert sich ihr Speicherschlüssel, muss `plan.js` angepasst werden.

## Bedienung

| Aktion | Wirkung |
|---|---|
| Klick oder Enter auf eine Station | Details unter dem Plan |
| Esc | zurück zum nächsten offenen Halt |
| Klick auf einen Einschub | zeigt, was noch fehlt; die Namen springen zur Station |
| „Siegel neu einlesen“ | liest den Speicher neu (passiert auch automatisch beim Zurückkehren in den Tab) |

## Ideen für den Unterricht

- Zum Start jeder Sequenz den Linienplan zeigen: Wo stehen wir, was kommt als Nächstes, wozu brauchen wir das für den Laborserver?
- Vor dem ersten Labor kurz prüfen lassen, ob „Netzanschluss“ online ist. Wer noch Lücken hat, holt die fehlenden Gürtel nach.
- Vor der Abnahme als Checkliste nutzen: Welche Einschübe fehlen noch?

## Seite für ein anderes Fach (z. B. KoKI)

Alle Inhalte stehen in `plan.js`, die Darstellung in `fahrplan.js` ist allgemein. Für KoKI im 2. Jahr den Ordner kopieren (z. B. `Linienplan-KoKI`), in `plan.js` `fach`, Titel, Linien, Wege, Quellen, Stationen und Ausbaustufen anpassen. Die Speicherschlüssel der Seite enthalten `fach` und kommen sich deshalb nicht in die Quere.

Eine Station ergänzen:

```js
{
  id: "neue-ls", linie: "P", monat: 6.8, spur: 0, typ: "ls",
  name: "Neue Lernsituation", kurz: "Thema", zeitraum: "März",
  text: "Worum es geht, in ein bis zwei Sätzen.",
  link: LS_URL + "LS-Neue-Lernsituation/",
  siegel: { quelle: "neue-ls" }
}
```

Dazu in `quellen` den Speicherschlüssel und die Stufen eintragen und die Station bei Bedarf in einer Ausbaustufe unter `bedingungen` aufführen. `monat` ist die Position von links (0 bis etwa 10,5; der Name stammt aus einer früheren Fassung mit Monaten), `spur` 0/1/2 ist die obere, mittlere und untere Linie. Schräge Abschnitte in `wege` brauchen für 45° pro halber Spur 0,67 Einheiten.

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Seitengerüst |
| `plan.js` | alle Inhalte: Linien, Stationen, Quellen der Siegel, Ausbaustufen |
| `fahrplan.js` | Siegel einlesen, Linienplan als SVG zeichnen, Detailansicht, Rack |
| `style.css` | Corporate Design der Jakob-Preh-Schule |
| `assets/logo-jps.png` | Schullogo |

## Lokal starten

In VS Code mit der Erweiterung **Live Server** `index.html` öffnen. Lokal sieht man nur Siegel, die unter derselben Adresse (z. B. `127.0.0.1:5500`) gespeichert wurden. Die echten Siegel erscheinen erst auf GitHub Pages.

## Technische Hinweise

- Reines HTML, CSS und JavaScript ohne Bibliotheken. Der Plan ist ein SVG und auf schmalen Bildschirmen waagrecht scrollbar.
- Alle Zugriffe auf `localStorage` stehen in try/catch. Ist der Speicher gesperrt (privates Fenster), erscheint ein Hinweis.

## Lizenz

[![CC BY 4.0](https://img.shields.io/badge/Lizenz-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/deed.de)

**Linienplan Informationstechnik · Dein Weg zum Laborserver** von **Christoph Rothaug, Jakob-Preh-Schule Bad Neustadt**, steht unter der Lizenz [Creative Commons Namensnennung 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/deed.de). Der vollständige Lizenztext steht in der Datei [`LICENSE`](LICENSE).

Du darfst das Material (Quellcode, Texte und Grafiken) kopieren, weitergeben und verändern, auch kommerziell. Dafür musst du

- den Urheber nennen: *Christoph Rothaug, Jakob-Preh-Schule Bad Neustadt*,
- auf die Lizenz verlinken: <https://creativecommons.org/licenses/by/4.0/deed.de>,
- angeben, ob du etwas verändert hast.

Vorschlag für die Namensnennung: *„Linienplan Informationstechnik“ von Christoph Rothaug, Jakob-Preh-Schule Bad Neustadt, CC BY 4.0, https://github.com/FlowTheTensor/Linienplan-ITec*

**Ausgenommen** von dieser Lizenz sind:

| Bestandteil | Rechte |
|---|---|
| `assets/logo-jps.png` | Logo der Jakob-Preh-Schule – alle Rechte bei der Schule |
| Schriften Quicksand, Inter, JetBrains Mono | über Google Fonts eingebunden, SIL Open Font License 1.1 |
