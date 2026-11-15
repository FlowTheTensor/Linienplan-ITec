/* =====================================================================
   Variante ohne Zeitangaben (ohne-zeit.html)
   ---------------------------------------------------------------------
   Nutzt dieselben Inhalte wie plan.js und ändert nur:
   - keine Monate, keine Leistungsnachweise, keine Markierung „heute“
   - alle drei Linien beginnen gleich weit links
   - Dojo · Seriell liegt auf der grünen Linie (Netze)
   Muss nach plan.js und vor fahrplan.js geladen werden.
   ===================================================================== */
(function () {
  const P = FAHRPLAN;
  P.ohneZeit = true;
  P.titel = "Linienplan Informationstechnik";
  P.einleitung =
    "Drei Linien führen dich durch das Fach: Programmieren, Systeme und Netze. " +
    "An jeder Lernsituation holst du dir Prüfsiegel, in den Dojo-Kursen Gürtel. " +
    "Jedes Siegel baut deinen Laborserver weiter aus, bis er zur Abnahme bereit ist.";

  // alle Linien starten an derselben Stelle
  const START = 0.3;
  P.wege.P[0] = [START, 0];
  P.wege.S[0] = [START, 1];
  P.wege.N[0] = [START, 2];

  function station(id) {
    return P.stationen.find((s) => s.id === id);
  }

  // Dojo · Seriell auf die Netz-Linie, vor Dojo · MAC
  const seriell = station("dojo-seriell");
  seriell.linie = "N";
  seriell.spur = 2;

  // ohne Zeitachse dürfen sich die Netz-Stationen gleichmäßig verteilen
  const netz = {
    "dojo-seriell": 1.3, "dojo-mac": 2.05, "dojo-topo": 2.8, "dojo-kabel": 3.55, "dojo-ipv4": 4.3,
    "dojo-osi": 6.65, paketreise: 7.15, "dojo-dienste": 7.65, "dojo-ipv6": 8.1, "dojo-krypto": 8.55
  };
  Object.keys(netz).forEach((id) => {
    station(id).monat = netz[id];
  });

  // Texte ohne Monats- und Prüfungsbezug
  station("bitbahnhof").text =
    "Waggons sind Bits: Dual- und Hexadezimalzahlen, Addition, Zweierkomplement, Subtraktion durch Addition und Gleitpunktzahlen.";
  const algokoch = station("algokoch");
  algokoch.text =
    "Ein Küchenroboter kocht nach Struktogrammen. Du füllst die Lücken und testest jedes Rezept mit allen Testfällen. Listen und Funktionen kommen später dazu.";
  algokoch.siegel.zusatz = "später";
  station("linux").zeitraum = "";
  station("v1").zeile = "Version 1";
  station("v2").zeile = "Version 2";
  const abnahme = station("abnahme");
  abnahme.kopf = "LABORSERVER";
  abnahme.zeile = "Abnahme";
})();
