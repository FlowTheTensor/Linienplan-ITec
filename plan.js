/* =====================================================================
   Linienplan ITec – alle Inhalte dieser Seite
   ---------------------------------------------------------------------
   Für ein anderes Fach (z. B. KoKI) nur diese Datei austauschen.

   monat:  Position von links nach rechts (0 … 10,5), keine echten Termine
   spur:   0 = obere Linie, 1 = mittlere, 2 = untere (0.5 / 1.5 = dazwischen)
   typ:    "ls" Lernsituation mit Prüfsiegeln, "kurs" Kurs (Gürtel oder
           Zertifikat), "info" Unterrichtsthema ohne Siegel, "hub" Laborserver
   ===================================================================== */

// Gürtel des Netzwerk-Dojos in der dort verwendeten Reihenfolge
const GUERTEL = [
  { id: "weiss", name: "Weißer Gürtel", farbe: "#f1ede4" },
  { id: "gelb", name: "Gelber Gürtel", farbe: "#e9c33b" },
  { id: "orange", name: "Oranger Gürtel", farbe: "#e58a2b" },
  { id: "gruen", name: "Grüner Gürtel", farbe: "#3f8f4f" },
  { id: "blau", name: "Blauer Gürtel", farbe: "#2f63a8" },
  { id: "lila", name: "Lila Gürtel", farbe: "#7a4a96" },
  { id: "braun", name: "Brauner Gürtel", farbe: "#7b5134" },
  { id: "schwarz", name: "Schwarzer Gürtel", farbe: "#1d1d1c" }
];

// die ersten n Gürtel (als Stufenliste bzw. als id-Liste)
function guertel(n) {
  return GUERTEL.slice(0, n);
}
function ersteGuertel(n) {
  return GUERTEL.slice(0, n).map((g) => g.id);
}

const LS_URL = "https://flowthetensor.github.io/";
const DOJO_URL = LS_URL + "LS-Netzwerk-Dojo/";

const FAHRPLAN = {
  fach: "itec",
  titel: "Linienplan Informationstechnik",
  untertitel: "Fachschule Elektrotechnik · 1. Schuljahr · Dein Weg zum Laborserver",
  einleitung:
    "Drei Linien führen dich durch das Fach: Programmieren, Systeme und Netze. " +
    "An jeder Lernsituation holst du dir Prüfsiegel, in den Dojo-Kursen Gürtel. " +
    "Jedes Siegel baut deinen Laborserver weiter aus, bis er zur Abnahme bereit ist.",
  ohneZeit: true,
  breite: 1470,

  // gestrichelter Übergang von der Abnahme zur Endstation Datenkrake
  umstieg: [[10.3, 1], [11.75, 1]],

  linien: {
    P: { name: "Programmieren", lg: "LG 3 · Algorithmen entwickeln und codieren", farbe: "#c81e3a" },
    S: { name: "Systeme", lg: "LG 1 · Computersysteme konfigurieren", farbe: "#2c5c96" },
    N: { name: "Netze", lg: "LG 2 · Computernetzwerke planen", farbe: "#348054" }
  },

  // Verlauf der Linien: [monat, spur, Versatz in px]
  wege: {
    N: [[0.3, 2], [4.93, 2], [5.6, 1.5], [6.27, 2], [8.96, 2], [10.3, 1, 7]],
    S: [[0.3, 1], [4.93, 1], [5.6, 1.5], [6.27, 1], [8.73, 1], [9.4, 0.5, 6], [9.63, 0.5, 6], [10.3, 1, 0]],
    P: [[0.3, 0], [8.73, 0], [9.4, 0.5, -6], [9.63, 0.5, -6], [10.3, 1, -7]]
  },

  // Beschriftungen an Linienabschnitten ohne Station
  wegtexte: [{ monat: 7.5, spur: 1, text: "eigener Container läuft", linie: "S" }],

  // Woher die Siegel kommen (localStorage der jeweiligen Seite)
  quellen: {
    bitbahnhof: {
      art: "liste", key: "bitbahnhof-freigaben", wort: "Prüfsiegel",
      stufen: [
        { id: "binaer", name: "Binär", rang: "Rangierer" },
        { id: "hex", name: "Hexadezimal", rang: "Weichensteller" },
        { id: "addition", name: "Addition", rang: "Lokführer" },
        { id: "zweier", name: "Zweierkomplement", rang: "Fahrdienstleiter" },
        { id: "subtraktion", name: "Subtraktion", rang: "Stellwerksmeister" },
        { id: "gleitpunkt", name: "Gleitpunkt", rang: "Bahnhofsvorsteher" }
      ]
    },
    algokoch: {
      art: "liste", key: "algokoch-freigaben", wort: "Prüfsiegel",
      stufen: [
        { id: "sequenz", name: "Sequenz", rang: "Küchenhilfe" },
        { id: "verzweigung", name: "Verzweigung", rang: "Beikoch" },
        { id: "zaehlschleife", name: "Zählschleife", rang: "Jungkoch" },
        { id: "bedschleife", name: "Bedingte Schleife", rang: "Koch" },
        { id: "listen", name: "Listen", rang: "Sous-Chef" },
        { id: "funktionen", name: "Funktionen", rang: "Küchenchef" }
      ]
    },
    platinenstadt: {
      art: "liste", key: "platinenstadt-freigaben", wort: "Prüfsiegel",
      stufen: [
        { id: "stadtplan", name: "Stadtplan", rang: "Stadtführer" },
        { id: "zyklus", name: "Befehlszyklus", rang: "Kurierfahrer" },
        { id: "einspeicher", name: "Ein Speicher", rang: "Hausverwalter" },
        { id: "spruenge", name: "Sprünge", rang: "Lotse" },
        { id: "harvard", name: "von Neumann · Harvard", rang: "Stadtplaner" },
        { id: "gpu", name: "CPU · GPU", rang: "Bürgermeister" }
      ]
    },
    paketreise: {
      art: "liste", key: "paketreise-freigaben", wort: "Prüfsiegel",
      stufen: [
        { id: "kapselung", name: "Kapselung", rang: "Praktikant" },
        { id: "dns", name: "DNS", rang: "Telefonist" },
        { id: "arp", name: "ARP & Pforte", rang: "Pförtner" },
        { id: "tcp", name: "TCP & Ports", rang: "Versandleiter" },
        { id: "https", name: "HTTP · HTTPS", rang: "Sicherheitschef" },
        { id: "fehler", name: "Fehlersuche", rang: "Netzwerk-Detektiv" }
      ]
    },
    tresorknacker: {
      art: "objekt", key: "tresorknacker-siegel", wort: "Prüfsiegel",
      alt: { key: "tresorknacker-freigaben", ids: ["eingang", "bibliothek", "uhren", "schliessfach", "spiegel", "kessel"] },
      stufen: [
        { id: "eingang", name: "Eingangshalle · Datentypen", rang: "Neuling" },
        { id: "bibliothek", name: "Bibliothek · Verzweigungen", rang: "Spurensucher" },
        { id: "uhren", name: "Uhrenzimmer · Schleifen", rang: "Rätsellöser" },
        { id: "schliessfach", name: "Schließfachraum · Arrays", rang: "Schließfachprofi" },
        { id: "lager", name: "Lagerhalle · vector", rang: "Lagerist" },
        { id: "spiegel", name: "Spiegelsaal · Funktionen", rang: "Schlossknacker" },
        { id: "funk", name: "Funkraum · Zeichenketten", rang: "Funker" },
        { id: "archiv", name: "Archiv · struct", rang: "Archivar" },
        { id: "labyrinth", name: "Labyrinth · Zeiger", rang: "Pfadfinder" },
        { id: "kessel", name: "Kesselraum · Überlauf", rang: "Kesselmeister" },
        { id: "tresor", name: "Tresorraum · Dateien", rang: "Tresorknacker" }
      ]
    },
    "dojo-seriell": { art: "dojo", key: "netzwerk-dojo:seriell-belts", wort: "Gürtel", stufen: guertel(6) },
    "dojo-mac": { art: "dojo", key: "netzwerk-dojo:mac-belts", wort: "Gürtel", stufen: guertel(5) },
    "dojo-topo": { art: "dojo", key: "netzwerk-dojo:topo-belts", wort: "Gürtel", stufen: guertel(4) },
    "dojo-kabel": { art: "dojo", key: "netzwerk-dojo:kabel-belts", wort: "Gürtel", stufen: guertel(5) },
    "dojo-ipv4": { art: "dojo", key: "netzwerk-dojo:belts", wort: "Gürtel", stufen: guertel(8) },
    "dojo-osi": { art: "dojo", key: "netzwerk-dojo:osi-belts", wort: "Gürtel", stufen: guertel(4) },
    "dojo-dienste": { art: "dojo", key: "netzwerk-dojo:dienste-belts", wort: "Gürtel", stufen: guertel(6) },
    "dojo-ipv6": { art: "dojo", key: "netzwerk-dojo:v6-belts", wort: "Gürtel", stufen: guertel(6) },
    "dojo-krypto": { art: "dojo", key: "netzwerk-dojo:krypto-belts", wort: "Gürtel", stufen: guertel(6) },
    linux: { art: "manuell", wort: "Zertifikat", stufen: [{ id: "erledigt", name: "Kurszertifikat erhalten" }] },
    docker: { art: "manuell", wort: "Abschluss", stufen: [{ id: "erledigt", name: "Kurs abgeschlossen" }] }
  },

  stationen: [
    // ---------------- Linie Programmieren ----------------
    {
      id: "cpp", linie: "P", monat: 0.95, spur: 0, typ: "info",
      name: "C++-Einstieg",
      text: "Compiler und Entwicklungsumgebung, Ein- und Ausgabe, Variablen und die Datentypen int, char und double.",
      material: "Skript C++",
      wozu: {"text": "Die Datenkrake hört der Anlage zu: Ein Arduino UNO Q nimmt mit einem Mikrofon die Geräusche auf. Programmiert wird er in C++."}
    },
    {
      id: "algokoch", linie: "P", monat: 1.45, spur: 0, typ: "ls",
      name: "Algorithmen-Koch", kurz: "Struktogramm und PAP",
      text: "Ein Küchenroboter kocht nach Struktogrammen. Du füllst die Lücken und testest jedes Rezept mit allen Testfällen. Listen und Funktionen kommen später dazu.",
      link: LS_URL + "LS-Algorithmen-Koch/",
      siegel: { quelle: "algokoch", ziel: ["sequenz", "verzweigung", "zaehlschleife", "bedschleife"], zusatz: "später" },
      wozu: {"text": "Abläufe der Modellanlage planst du im 2. Jahr genauso: erst als Struktogramm, dann als Programm, etwa in SCL im TIA Portal.", "frage": "Welche Schritte braucht eine Station, bis eine Dose befüllt ist?"}
    },
    {
      id: "if", linie: "P", monat: 2.25, spur: 0, typ: "info",
      name: "if-Entscheidung",
      text: "Verzweigungen mit if, else if und else, Vergleiche und logische Operatoren, dazu switch.",
      material: "Skript C++, Übungsblatt if",
      wozu: {"text": "Ist ein Messwert über dem Grenzwert, meldet die Datenkrake eine Auffälligkeit. Dahinter steckt eine einfache if-Entscheidung."}
    },
    {
      id: "schleifen", linie: "P", monat: 2.9, spur: 0, typ: "info",
      name: "Schleifen",
      text: "Die Schleifen for, while und do-while.",
      material: "Skript C++",
      wozu: {"text": "Der Anomalie-Poller der Datenkrake fragt Messwerte in einer Schleife immer wieder ab und meldet, wenn etwas auffällt.", "frage": "Wie sieht das Struktogramm aus: alle 5 Sekunden einen Wert holen, bei Grenzwert melden?"}
    },
    {
      id: "tresor1", linie: "P", monat: 3.55, spur: 0, typ: "ls",
      name: "Tresorknacker I", kurz: "Code-Tracing: Raum 1 bis 3",
      text: "Escape-Room: Du verfolgst C++-Programme Schritt für Schritt und öffnest jedes Schloss mit der richtigen Ausgabe. Die ersten drei Räume: Datentypen, Verzweigungen und Schleifen.",
      link: LS_URL + "LS-Tresorknacker/",
      siegel: { quelle: "tresorknacker", ids: ["eingang", "bibliothek", "uhren"] },
      wozu: {"text": "Code lesen gehört im 2. Jahr zum Alltag: Du verfolgst Bausteine der SPS und die Programme der KI-Agenten Schritt für Schritt."}
    },
    {
      id: "funktionen", linie: "P", monat: 6.2, spur: 0, typ: "info",
      name: "Funktionen",
      text: "Parameter als Wert und als Referenz, Rückgabewerte, Lebensdauer und Geltungsbereich von Variablen.",
      material: "Skript C++, Übungsblatt Funktionen",
      wozu: {"text": "Die KI-Agenten der Datenkrake benutzen Werkzeuge. Jedes Werkzeug ist eine Funktion mit Parametern und Rückgabewert.", "frage": "Welche Parameter braucht eine Funktion, die den Füllstand einer Station liefert?"}
    },
    {
      id: "arrays", linie: "P", monat: 7.3, spur: 0, typ: "info",
      name: "Arrays & Structs",
      text: "Messwertreihen als Array von Structs speichern und durchlaufen.",
      material: "Skript C++",
      wozu: {"text": "In der SPS der Presse sind die Auftragsnummern ein Array aus 10 Zahlen. Der Datenbaustein „dbMESStation“ fasst zusammengehörige Werte zusammen, wie ein struct.", "frage": "Wie würdest du diesen Datenbaustein in C++ nachbauen?"},
      medien: [{"datei": "assets/datenkrake/fotos/tia-datenbaustein.webp", "text": "Der Datenbaustein dbMESStation im TIA Portal"}]
    },
    {
      id: "tresor2", linie: "P", monat: 7.8, spur: 0, typ: "ls",
      name: "Tresorknacker II", kurz: "Code-Tracing: Raum 4 bis 8 und 10",
      text: "Arrays, vector, Funktionen, Zeichenketten, struct und im Kesselraum Überlauf und Rundungsfehler.",
      link: LS_URL + "LS-Tresorknacker/",
      siegel: { quelle: "tresorknacker", ids: ["schliessfach", "lager", "spiegel", "funk", "archiv", "kessel"] },
      wozu: {"text": "Arrays, Funktionen und struct aus diesen Räumen stecken in jedem Programm, das Anlagendaten verarbeitet."}
    },
    {
      id: "dateien", linie: "P", monat: 8.15, spur: 0, typ: "info",
      name: "Dateiarbeit",
      text: "Messdaten aus einer CSV-Datei lesen und eine HTML-Datei schreiben.",
      material: "Skript C++, Exkurs Dateiarbeit",
      wozu: {"text": "Die Datenkrake speichert jede Messung als Zeile mit Zeitstempel und Werten. Als CSV-Datei exportiert, liest dein Programm echte Anlagendaten.", "frage": "Findet dein Programm die Ausreißer in echten Messdaten?"},
      medien: [{"datei": "assets/datenkrake/audio-dashboard.webp", "text": "Akustik-Dashboard der Datenkrake: jede Messung eine Zeile, darüber der Verlauf"}]
    },
    {
      id: "tresor3", linie: "P", monat: 8.5, spur: 0, typ: "ls",
      name: "Tresorknacker III", kurz: "Tresorraum (Dateien), Labyrinth als Bonus",
      text: "Im Tresorraum liest und schreibst du Dateien mit fstream. Das Labyrinth mit Zeigern ist ein Bonus für Schnelle und zählt nicht für den Laborserver.",
      link: LS_URL + "LS-Tresorknacker/",
      siegel: { quelle: "tresorknacker", ids: ["tresor", "labyrinth"], ziel: ["tresor"] }
    },

    // ---------------- Linie Systeme ----------------
    {
      id: "bitbahnhof", linie: "S", monat: 0.55, spur: 1, typ: "ls",
      name: "Bit-Bahnhof", kurz: "Zahlensysteme",
      text: "Waggons sind Bits: Dual- und Hexadezimalzahlen, Addition, Zweierkomplement, Subtraktion durch Addition und Gleitpunktzahlen.",
      link: LS_URL + "LS-Bit-Bahnhof/",
      siegel: { quelle: "bitbahnhof" },
      wozu: {"text": "Die SPSen der Modellanlage liefern rund 640 Werte als 16-Bit-Zahlen ohne Vorzeichen (UInt16), über 100 mit Vorzeichen (Int16) und einige als Gleitpunktzahl (Float).", "frage": "Warum springt ein Zähler plötzlich von 32767 auf −32768?"},
      medien: [{"datei": "assets/datenkrake/fotos/uaexpert-datentypen.webp", "text": "Die Werte der Presse mit ihren Datentypen in UAExpert"}]
    },
    {
      id: "platinenstadt", linie: "S", monat: 2.35, spur: 1, typ: "ls",
      name: "Platinenstadt", kurz: "von-Neumann-Rechner",
      text: "Steuerwerk, Rechenwerk, Register und Speicher arbeiten in der Platinenstadt zusammen. Du verfolgst den Befehlszyklus und vergleichst von Neumann mit Harvard und CPU mit GPU. Dazu stellst du ein eigenes PC-Angebot zusammen.",
      link: LS_URL + "LS-Platinenstadt/",
      siegel: { quelle: "platinenstadt" },
      wozu: {"text": "Die Datenkrake läuft auf einem Raspberry Pi 5, die Akustik auf einem Arduino UNO Q. Die Datenbank liegt auf einer SSD, weil viele kleine Schreibzugriffe eine SD-Karte schnell verschleißen.", "frage": "Warum geht die SD-Karte kaputt, wenn die Datenbank ständig darauf schreibt?"},
      medien: [{"datei": "assets/datenkrake/fotos/raspberry-ssd.webp", "text": "Der Raspberry Pi 5 der Datenkrake mit SSD"}, {"datei": "assets/datenkrake/fotos/arduino-uno-q.webp", "text": "Der Arduino UNO Q mit Mikrofon"}]
    },
    {
      id: "dojo-seriell", linie: "N", monat: 1.3, spur: 2, typ: "kurs",
      name: "Dojo · Seriell",
      text: "Serielle und parallele Schnittstellen: RS-232, UART, I²C und SPI, dazu das Paritätsbit. Die Gürtel holst du im Dojo-Training am Ende des Themas.",
      link: DOJO_URL + "#ser-grundlagen",
      siegel: { quelle: "dojo-seriell", ziel: ersteGuertel(3) },
      wozu: {"text": "Mikrofon und Webcam hängen per USB an einer Dockingstation am Arduino UNO Q. Die Reihenfolge beim Einstecken entscheidet, ob die Geräte erkannt werden.", "frage": "Warum erkennt der Arduino das Mikrofon nicht?"},
      medien: [{"datei": "assets/datenkrake/fotos/dockingstation.webp", "text": "Arduino UNO Q, Dockingstation, Mikrofon und Webcam"}]
    },
    {
      id: "linux", linie: "S", monat: 3.75, spur: 1, typ: "kurs",
      name: "Linux Unhatched",
      text: "Shell, Dateisystem und Rechte. Online-Kurs der Cisco Networking Academy. Hake ihn hier ab, sobald du dein Kurszertifikat hast.",
      link: "https://www.netacad.com/courses/linux-unhatched",
      siegel: { quelle: "linux" },
      wozu: {"text": "Der Raspberry der Datenkrake läuft unter Linux. Installiert und aktualisiert wird er mit Shell-Skripten.", "frage": "Wie startest du ein Skript mit Root-Rechten?"}
    },
    {
      id: "docker", linie: "S", monat: 4.55, spur: 1, typ: "kurs",
      name: "Docker Essentials",
      text: "Container, Images, Ports und Volumes. Damit läuft später dein Laborserver. Hake den Kurs hier ab, wenn du ihn abgeschlossen hast.",
      link: "https://cognitiveclass.ai/courses/docker-essentials",
      siegel: { quelle: "docker" },
      wozu: {"text": "Alle Dienste der Datenkrake laufen als Docker-Container: MQTT, Datenbanken, Node-RED und Grafana. Mit „docker compose ps“ siehst du, ob alles läuft.", "frage": "Ein Dienst antwortet nicht. Wie prüfst du den Container-Status?"},
      medien: [{"datei": "assets/datenkrake/fotos/docker-compose-ps.webp", "text": "„docker compose ps“ auf dem Raspberry der Datenkrake"}]
    },

    // ---------------- Linie Netze ----------------
    {
      id: "dojo-mac", linie: "N", monat: 2.05, spur: 2, typ: "kurs",
      name: "Dojo · MAC",
      text: "MAC-Adressen, Switch und MAC-Tabelle.",
      link: DOJO_URL + "#mac-grundlagen",
      siegel: { quelle: "dojo-mac", ziel: ersteGuertel(3) },
      wozu: {"text": "Im Anlagen-Netz verbinden Switches die zehn SPS-Stationen mit dem Raspberry der Datenkrake.", "frage": "Woher weiß der Switch, an welchen Port ein Paket für die Presse muss?"},
      medien: [{"datei": "assets/datenkrake/fotos/switch-anlage.webp", "text": "Switch im Schaltschrank der Modellanlage"}]
    },
    {
      id: "dojo-topo", linie: "N", monat: 2.8, spur: 2, typ: "kurs",
      name: "Dojo · Topologien",
      text: "Netzwerktopologien wie Stern, Bus und Ring.",
      link: DOJO_URL + "#topo-grundlagen",
      siegel: { quelle: "dojo-topo", ziel: ersteGuertel(2) },
      wozu: {"text": "Anlagen-Netz und Schulnetz sind getrennt. Der Raspberry hängt in beiden Netzen und verbindet sie.", "frage": "Wie zeichnest du ein Netz, in dem ein Gerät in zwei Netzen hängt?"}
    },
    {
      id: "dojo-kabel", linie: "N", monat: 3.55, spur: 2, typ: "kurs",
      name: "Dojo · Kabel",
      text: "Kabel, Signale und Ethernet-Standards.",
      link: DOJO_URL + "#kabel-typen",
      siegel: { quelle: "dojo-kabel", ziel: ersteGuertel(3) },
      wozu: {"text": "SPSen, Switches und der Raspberry sind per Ethernet verbunden. WLAN nutzt der Raspberry nur, um sich ins Schulnetz einzuwählen.", "frage": "Warum hängen die SPSen nicht einfach per WLAN am Netz?"}
    },
    {
      id: "dojo-ipv4", linie: "N", monat: 4.3, spur: 2, typ: "kurs",
      name: "Dojo · IPv4",
      text: "IPv4-Adressen und Subnetzmasken. Dazu planst du ein Netz im Packet Tracer.",
      link: DOJO_URL + "#grundlagen",
      siegel: { quelle: "dojo-ipv4", ziel: ersteGuertel(4) },
      wozu: {"text": "Die zehn SPS-Stationen haben feste Adressen im Anlagen-Netz 192.168.36.0/24, die Presse zum Beispiel 192.168.36.7.", "frage": "Welche IP-Adresse darf dein Laptop im Anlagen-Netz bekommen?"},
      medien: [{"datei": "assets/datenkrake/fotos/anlage-stationen.webp", "text": "Die Stationen der Modellanlage"}]
    },
    {
      id: "dojo-osi", linie: "N", monat: 6.65, spur: 2, typ: "kurs",
      name: "Dojo · OSI",
      text: "Das OSI-Modell mit sieben Schichten. Du ordnest deinen Wireshark-Mitschnitt aus dem Labor den Schichten zu.",
      link: DOJO_URL + "#osi-grundlagen",
      siegel: { quelle: "dojo-osi", ziel: ersteGuertel(2) },
      wozu: {"text": "Ein Messwert reist von der SPS über OPC UA und MQTT bis in die Datenbank, durch alle Schichten des OSI-Modells.", "frage": "Auf welcher Schicht arbeitet MQTT?"}
    },
    {
      id: "paketreise", linie: "N", monat: 7.15, spur: 2, typ: "ls",
      name: "Paketreise", kurz: "OSI, DNS und HTTPS",
      text: "Zwei Firmenzentralen schicken sich Pakete, ein Industriespion schneidet mit: Kapselung, DNS, ARP, TCP und Ports, HTTP und HTTPS und typische Laborfehler.",
      link: LS_URL + "LS-Paketreise/",
      siegel: { quelle: "paketreise" },
      wozu: {"text": "Die Datenkrake erreichst du im Browser unter datenkrake.local: den Leitstand, Node-RED auf Port 1880, Grafana auf 3000 und Forgejo auf 3001.", "frage": "Grafana ist nicht erreichbar. Woran kann das liegen?"},
      medien: [{"datei": "assets/datenkrake/fotos/leitstand.webp", "text": "Der Leitstand der Datenkrake im Browser"}]
    },
    {
      id: "dojo-dienste", linie: "N", monat: 7.65, spur: 2, typ: "kurs",
      name: "Dojo · Dienste",
      text: "DHCP, DNS, URL und Ports.",
      link: DOJO_URL + "#dienst-dhcp",
      siegel: { quelle: "dojo-dienste", ziel: ersteGuertel(3) },
      wozu: {"text": "Jeder Dienst der Datenkrake lauscht auf seinem eigenen Port, der OPC-UA-Server einer SPS zum Beispiel auf 4840.", "frage": "Wie findet dein Laptop die Adresse hinter datenkrake.local?"}
    },
    {
      id: "dojo-ipv6", linie: "N", monat: 8.1, spur: 2, typ: "kurs",
      name: "Dojo · IPv6",
      text: "Grundlagen von IPv6.",
      link: DOJO_URL + "#v6-grundlagen",
      siegel: { quelle: "dojo-ipv6", ziel: ersteGuertel(2) }
    },
    {
      id: "dojo-krypto", linie: "N", monat: 8.55, spur: 2, typ: "kurs",
      name: "Dojo · Sicherheit",
      text: "Symmetrische und asymmetrische Verschlüsselung, HTTPS und Zertifikate, Proxy und VPN.",
      link: DOJO_URL + "#sec-sym",
      siegel: { quelle: "dojo-krypto", ziel: ersteGuertel(2) },
      wozu: {"text": "Die Anlage hängt nicht direkt am Internet. Der Raspberry sitzt zwischen Anlagen-Netz und Schulnetz und spannt bewusst kein eigenes WLAN auf.", "frage": "Warum darf die Anlage nicht direkt ins Internet?"}
    },

    // ---------------- Laborserver ----------------
    {
      id: "v1", monat: 5.6, spur: 1.5, typ: "hub",
      name: "Laborserver v1", kopf: "LABORSERVER", zeile: "Version 1",
      text: "Im Labor baut ihr zu zweit ein Teamnetz am Switch auf. Ein nginx-Container liefert eure Seite „Laborserver Team X“ aus. Ihr ruft sie gegenseitig unter http://<IP>:8080 ab und schneidet den HTTP-GET mit Wireshark mit.",
      online: ["u3"],
      wozu: {"text": "So arbeitet auch die Datenkrake: Ein Docker-Container liefert eine Webseite im Netz aus. Dein Laborserver ist dasselbe, nur eine Nummer kleiner."}
    },
    {
      id: "v2", monat: 9.515, spur: 0.5, typ: "hub",
      name: "Laborserver v2", kopf: "LABORSERVER", zeile: "Version 2",
      text: "Dein C++-Programm liest eine Messdatendatei in ein Array von Structs, berechnet Minimum, Maximum, Mittelwert und Grenzwertverletzungen in eigenen Funktionen und schreibt eine HTML-Datei. Dein Container liefert sie im Netz aus. Geprüft wird mit einer Testdatei deiner Lehrkraft.",
      online: ["u5"],
      wozu: {"text": "Dein Programm erkennt Grenzwertverletzungen, die einfachste Form der Anomalie-Erkennung. Im 2. Jahr übernimmt das ein KI-Modell, das ihr mit echten Messdaten trainiert."},
      medien: [{"datei": "assets/datenkrake/ki-vorhersage.webp", "text": "Im 2. Jahr: Ein KI-Modell bewertet die Geräusche der Anlage"}]
    },
    {
      id: "abnahme", monat: 10.3, spur: 1, typ: "hub",
      name: "Abnahme", kopf: "LABORSERVER", zeile: "Abnahme",
      text: "Ihr schaltet das Klassennetz zusammen und führt euren Laborserver vor: Netzplan, IP-Plan, ping, Webseite des Partners, Wireshark-Mitschnitt, laufender Container und dein Messdaten-Programm mit der Testdatei. Danach geht es mit SCL im TIA Portal und einem kleinen p5.js-Spiel weiter.",
      online: ["u6"],
      wozu: {"text": "Nach der Abnahme steigst du um: Im 2. Jahr arbeitet ihr in Stationsteams an der echten Datenkrake."}
    },
    {
      id: "datenkrake", monat: 11.75, spur: 1, typ: "ziel",
      name: "Datenkrake", kopf: "UMSTEIGEN", zeile: "2. Schuljahr",
      text: "Im 2. Schuljahr arbeitet ihr an der echten Modellanlage: Ein Raspberry Pi sammelt die Daten der zehn SPS-Stationen und die Geräusche der Anlage, speichert sie in Datenbanken und stellt sie im Netz bereit. KI-Modelle erkennen Auffälligkeiten, KI-Agenten beantworten Fragen zur Anlage. Alles, was du in diesem Jahr lernst, steckt darin.",
      symbol: "assets/datenkrake/krake.webp",
      link: "https://flowthetensor.github.io/Datenkrake/", knopf: "Datenkrake ansehen",
      links: [{ text: "Digitaler Zwilling", url: "https://flowthetensor.github.io/Datenkrake/anlage-zwilling.html" }],
      medien: [
        { datei: "assets/datenkrake/fotos/anlage-video.mp4", text: "Die Modellanlage in Betrieb" },
        { datei: "assets/datenkrake/datenkrake-ueberblick.webp", text: "Die Datenkrake auf einen Blick" },
        { datei: "assets/datenkrake/ki-training.webp", text: "Ein KI-Modell lernt aus den Messdaten der Anlage" }
      ]
    }
  ],

  // Ausbaustufen des Laborservers
  ausbau: [
    {
      id: "u1", name: "Rechenkern",
      text: "Du weißt, wie ein Rechner Zahlen speichert und Befehle abarbeitet.",
      bedingungen: [{ quelle: "bitbahnhof", station: "bitbahnhof" }, { quelle: "platinenstadt", station: "platinenstadt" }]
    },
    {
      id: "u2", name: "Steuerlogik",
      text: "Du planst Abläufe als Struktogramm und verfolgst C++-Code sicher.",
      bedingungen: [
        { quelle: "algokoch", station: "algokoch", ids: ["sequenz", "verzweigung", "zaehlschleife", "bedschleife"] },
        { quelle: "tresorknacker", station: "tresor1", ids: ["eingang", "bibliothek", "uhren"] }
      ]
    },
    {
      id: "u3", name: "Netzanschluss",
      text: "Dein Laptop ist bereit für das Teamnetz: Schnittstellen, Switch, Kabel, Adressen, Linux und Docker.",
      bedingungen: [
        { quelle: "dojo-seriell", station: "dojo-seriell", ids: ersteGuertel(3) },
        { quelle: "dojo-mac", station: "dojo-mac", ids: ersteGuertel(3) },
        { quelle: "dojo-topo", station: "dojo-topo", ids: ersteGuertel(2) },
        { quelle: "dojo-kabel", station: "dojo-kabel", ids: ersteGuertel(3) },
        { quelle: "dojo-ipv4", station: "dojo-ipv4", ids: ersteGuertel(4) },
        { quelle: "linux", station: "linux" },
        { quelle: "docker", station: "docker" }
      ]
    },
    {
      id: "u4", name: "Netzdienste & Sicherheit",
      text: "Du verstehst, was im Netz zwischen zwei Rechnern passiert, und findest typische Fehler.",
      bedingungen: [
        { quelle: "paketreise", station: "paketreise" },
        { quelle: "dojo-osi", station: "dojo-osi", ids: ersteGuertel(2) },
        { quelle: "dojo-dienste", station: "dojo-dienste", ids: ersteGuertel(3) },
        { quelle: "dojo-ipv6", station: "dojo-ipv6", ids: ersteGuertel(2) },
        { quelle: "dojo-krypto", station: "dojo-krypto", ids: ersteGuertel(2) }
      ]
    },
    {
      id: "u5", name: "Messdaten-Auswertung",
      text: "Du schreibst die Bausteine für dein Auswerteprogramm: Funktionen, Arrays, Structs und Dateien.",
      bedingungen: [
        { quelle: "algokoch", station: "algokoch", ids: ["listen", "funktionen"] },
        { quelle: "tresorknacker", station: "tresor2", ids: ["schliessfach", "lager", "spiegel", "funk", "archiv", "kessel"] },
        { quelle: "tresorknacker", station: "tresor3", ids: ["tresor"] }
      ]
    },
    {
      id: "u6", name: "Bereit zur Abnahme",
      text: "Alle Einschübe sind online. Dein Laborserver kann zur Abnahme.",
      voraussetzung: ["u1", "u2", "u3", "u4", "u5"],
      bedingungen: []
    }
  ]
};

if (typeof module !== "undefined") module.exports = { FAHRPLAN, GUERTEL };
