/* =====================================================================
   Linienplan – Darstellung und Prüfsiegel
   ---------------------------------------------------------------------
   Liest die Prüfsiegel und Gürtel, die die Lernsituationen im Browser
   speichern (localStorage). Das klappt, weil alle Seiten unter
   flowthetensor.github.io liegen und sich deshalb den Speicher teilen.
   Es wird nichts verschickt; alles bleibt auf diesem Gerät.
   ===================================================================== */
"use strict";

const P = FAHRPLAN;
const SPEICHER_HAKEN = "fahrplan-" + P.fach + "-abgehakt";
const SPEICHER_STAND = "fahrplan-" + P.fach + "-stand";
const SPEICHER_HOST = "fahrplan-" + P.fach + "-host";

const SVG_B = 1350;
const SVG_H = 560;
const SPUR_Y = [150, 300, 450];

let speicherOk = true;
let stand = {}; // quelle -> { id: true }
let gewaehlt = null; // id der gewählten Station

// ---------------------------------------------------------------------
// Hilfen
// ---------------------------------------------------------------------
function X(monat) {
  return 90 + monat * 112;
}
function Y(spur) {
  const i = Math.floor(spur);
  if (spur === i) {
    return SPUR_Y[i];
  }
  return SPUR_Y[i] + (SPUR_Y[i + 1] - SPUR_Y[i]) * (spur - i);
}
function esc(t) {
  return String(t).replace(/[&<>"']/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[z]);
}
function $(sel) {
  return document.querySelector(sel);
}
function lies(key) {
  try {
    const roh = window.localStorage.getItem(key);
    return roh === null ? null : JSON.parse(roh);
  } catch (e) {
    return null;
  }
}
function schreib(key, wert) {
  try {
    window.localStorage.setItem(key, JSON.stringify(wert));
  } catch (e) {
    // kein Speicher verfügbar
  }
}
function pruefeSpeicher() {
  try {
    const k = "__fahrplan_test";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch (e) {
    return false;
  }
}

// ---------------------------------------------------------------------
// Siegel einlesen
// ---------------------------------------------------------------------
function leseQuelle(qid) {
  const q = P.quellen[qid];
  const erg = {};
  if (!q) {
    return erg;
  }
  if (q.art === "liste") {
    const liste = lies(q.key);
    if (Array.isArray(liste)) {
      q.stufen.forEach((st, i) => {
        if (liste[i] === true) {
          erg[st.id] = true;
        }
      });
    }
  } else if (q.art === "objekt") {
    const obj = lies(q.key);
    if (obj && typeof obj === "object") {
      q.stufen.forEach((st) => {
        if (obj[st.id] === true) {
          erg[st.id] = true;
        }
      });
    } else if (q.alt) {
      const alt = lies(q.alt.key);
      if (Array.isArray(alt)) {
        q.alt.ids.forEach((id, i) => {
          if (alt[i] === true) {
            erg[id] = true;
          }
        });
      }
    }
  } else if (q.art === "dojo") {
    const obj = lies(q.key);
    if (obj && typeof obj === "object") {
      q.stufen.forEach((st) => {
        if (obj[st.id]) {
          erg[st.id] = true;
        }
      });
    }
  } else if (q.art === "manuell") {
    const haken = lies(SPEICHER_HAKEN) || {};
    if (haken[qid] === true) {
      erg.erledigt = true;
    }
  }
  return erg;
}

function leseAlles() {
  speicherOk = pruefeSpeicher();
  stand = {};
  Object.keys(P.quellen).forEach((qid) => {
    stand[qid] = leseQuelle(qid);
  });
}

// Fortschritt einer Liste von ids einer Quelle
function zaehle(qid, ids) {
  const q = P.quellen[qid];
  const liste = ids || q.stufen.map((s) => s.id);
  const hat = liste.filter((id) => stand[qid] && stand[qid][id]).length;
  return { hat, von: liste.length, fertig: hat === liste.length };
}

// Fortschritt einer Station (Ziel, sonst alle angezeigten Stufen)
function stationsStand(st) {
  if (!st.siegel) {
    return null;
  }
  const s = st.siegel;
  return zaehle(s.quelle, s.ziel || s.ids);
}

function ausbauStand(u) {
  let hat = 0;
  let von = 0;
  u.bedingungen.forEach((b) => {
    const z = zaehle(b.quelle, b.ids);
    hat += z.hat;
    von += z.von;
  });
  let fertig = hat === von;
  if (u.voraussetzung) {
    u.voraussetzung.forEach((vid) => {
      const v = P.ausbau.find((a) => a.id === vid);
      const vs = ausbauStand(v);
      hat += vs.fertig ? 1 : 0;
      von += 1;
      fertig = fertig && vs.fertig;
    });
  }
  return { hat, von, fertig, anteil: von ? hat / von : 0 };
}

function hubOnline(st) {
  return (st.online || []).every((uid) => ausbauStand(P.ausbau.find((a) => a.id === uid)).fertig);
}

// Ausbaustufen, zu denen eine Station beiträgt
function ausbauVon(st) {
  if (st.typ === "hub") {
    return P.ausbau.filter((u) => (st.online || []).includes(u.id));
  }
  return P.ausbau.filter((u) => u.bedingungen.some((b) => b.station === st.id));
}

// nächster offener Halt: erste Station in zeitlicher Reihenfolge mit offenem Ziel
function naechsterHalt() {
  const offen = P.stationen
    .filter((st) => st.siegel && !stationsStand(st).fertig)
    .sort((a, b) => a.monat - b.monat);
  return offen.length ? offen[0] : null;
}

// ---------------------------------------------------------------------
// Linienplan (SVG)
// ---------------------------------------------------------------------
function heuteMonat() {
  const d = new Date();
  const m = (d.getMonth() - 8 + 12) % 12; // September = 0
  const tage = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const wert = m + (d.getDate() - 1) / tage;
  return wert <= 11 ? wert : null;
}

function bogen(cx, cy, r, anteil) {
  if (anteil <= 0) {
    return "";
  }
  if (anteil >= 1) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" />`;
  }
  const w = anteil * Math.PI * 2;
  const x1 = cx;
  const y1 = cy - r;
  const x2 = cx + r * Math.sin(w);
  const y2 = cy - r * Math.cos(w);
  const gross = anteil > 0.5 ? 1 : 0;
  return `<path d="M ${x1} ${y1} A ${r} ${r} 0 ${gross} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}" />`;
}

function zeichnePlan() {
  const teile = [];
  const vb = P.ohneZeit ? `60 50 ${SVG_B - 60} ${SVG_H - 50}` : `0 0 ${SVG_B} ${SVG_H}`;
  teile.push(`<svg viewBox="${vb}" role="img" aria-labelledby="plan-titel" xmlns="http://www.w3.org/2000/svg">`);
  teile.push(`<title id="plan-titel">${esc(P.titel)}</title>`);

  if (!P.ohneZeit) {
    // Monatsraster
    for (let m = 0; m < P.monate.length; m++) {
      const x0 = X(m);
      const halbjahr = m === P.halbjahrAb;
      teile.push(`<line class="raster${halbjahr ? " halbjahr" : ""}" x1="${x0}" y1="52" x2="${x0}" y2="${SVG_H - 18}" />`);
      teile.push(`<text class="monat" x="${X(m + 0.5)}" y="34">${P.monate[m]}</text>`);
    }
    teile.push(`<line class="raster" x1="${X(P.monate.length)}" y1="52" x2="${X(P.monate.length)}" y2="${SVG_H - 18}" />`);
    teile.push(`<line class="achse" x1="${X(0)}" y1="52" x2="${X(P.monate.length)}" y2="52" />`);
    teile.push(`<text class="halbjahr-text" x="${X(0) + 6}" y="${SVG_H - 26}">1. Halbjahr</text>`);
    teile.push(`<text class="halbjahr-text" x="${X(P.halbjahrAb) + 6}" y="${SVG_H - 26}">2. Halbjahr</text>`);

    // Heute
    const heute = heuteMonat();
    if (heute !== null) {
      teile.push(`<g class="heute"><line x1="${X(heute)}" y1="52" x2="${X(heute)}" y2="${SVG_H - 18}" /><text x="${X(heute)}" y="${SVG_H - 6}">heute</text></g>`);
    }

    // Leistungsnachweise
    P.nachweise.forEach((n) => {
      const x = X(n.monat);
      const b = n.name.length * 8 + 16;
      teile.push(`<g class="nachweis" tabindex="0"><title>${esc(n.text)}</title><rect x="${x - b / 2}" y="41" width="${b}" height="22" rx="11" /><text x="${x}" y="56">${esc(n.name)}</text></g>`);
    });

  }

  // Linien
  Object.keys(P.wege).forEach((lid) => {
    const farbe = P.linien[lid].farbe;
    const punkte = P.wege[lid].map(([m, s, d]) => `${X(m).toFixed(1)},${(Y(s) + (d || 0)).toFixed(1)}`).join(" ");
    teile.push(`<polyline class="linie-schatten" points="${punkte}" />`);
    teile.push(`<polyline class="linie" points="${punkte}" stroke="${farbe}" />`);
  });

  (P.wegtexte || []).forEach((w) => {
    teile.push(`<text class="wegtext" x="${X(w.monat)}" y="${Y(w.spur) - 14}" fill="${P.linien[w.linie].farbe}">${esc(w.text)}</text>`);
  });

  // Stationen
  const halt = naechsterHalt();
  P.stationen.forEach((st) => {
    teile.push(zeichneStation(st, halt && halt.id === st.id));
  });

  teile.push("</svg>");
  $("#plan").innerHTML = teile.join("");

  // Bedienung
  document.querySelectorAll("#plan .station").forEach((el) => {
    el.addEventListener("click", () => waehle(el.dataset.id));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        waehle(el.dataset.id);
      }
    });
  });
}

function zeichneStation(st, istHalt) {
  const x = X(st.monat);
  const y = Y(st.spur);
  const farbe = st.linie ? P.linien[st.linie].farbe : "#1d1d1c";
  const z = stationsStand(st);
  const klassen = ["station", "typ-" + st.typ];
  if (gewaehlt === st.id) {
    klassen.push("gewaehlt");
  }
  if (istHalt) {
    klassen.push("halt");
  }
  if (z && z.fertig) {
    klassen.push("fertig");
  }
  let titel = st.name;
  if (z) {
    titel += ` – ${z.hat} von ${z.von} ${P.quellen[st.siegel.quelle].wort}`;
  }
  const t = [];
  t.push(`<g class="${klassen.join(" ")}" data-id="${st.id}" tabindex="0" role="button" aria-label="${esc(titel)}">`);
  t.push(`<title>${esc(titel)}</title>`);

  if (st.typ === "hub") {
    const on = hubOnline(st);
    t.push(`<g class="hub${on ? " online" : ""}">`);
    t.push(`<rect x="${x - 56}" y="${y - 23}" width="112" height="46" rx="10" />`);
    t.push(`<circle class="led" cx="${x - 42}" cy="${y}" r="4.5" />`);
    t.push(`<text class="hub-kopf" x="${x + 6}" y="${y - 4}">${esc(st.kopf)}</text>`);
    t.push(`<text class="hub-zeile" x="${x + 6}" y="${y + 13}">${esc(st.zeile)}</text>`);
    t.push(`</g>`);
  } else if (st.typ === "info") {
    t.push(`<circle class="ziel-flaeche" cx="${x}" cy="${y}" r="16" />`);
    t.push(`<circle class="info" cx="${x}" cy="${y}" r="6.5" stroke="${farbe}" />`);
  } else {
    const anteil = z ? z.hat / z.von : 0;
    if (istHalt) {
      t.push(`<circle class="puls" cx="${x}" cy="${y}" r="22" stroke="${farbe}" />`);
    }
    t.push(`<circle class="ziel-flaeche" cx="${x}" cy="${y}" r="22" />`);
    t.push(`<circle class="ring-grund" cx="${x}" cy="${y}" r="19" />`);
    t.push(`<g class="ring">${bogen(x, y, 19, anteil)}</g>`);
    if (st.typ === "ls") {
      t.push(`<circle class="knopf" cx="${x}" cy="${y}" r="13" stroke="${farbe}" fill="${z && z.fertig ? farbe : "#fff"}" />`);
    } else {
      t.push(`<rect class="knopf" x="${x - 11}" y="${y - 11}" width="22" height="22" rx="6" stroke="${farbe}" fill="${z && z.fertig ? farbe : "#fff"}" />`);
    }
    if (z && z.fertig) {
      t.push(`<path class="haken" d="M ${x - 5} ${y} l 3.5 3.8 l 6.5 -7.6" />`);
    } else if (z) {
      t.push(`<text class="zahl" x="${x}" y="${y + 4}">${z.hat}</text>`);
    }
  }

  // Beschriftung
  if (st.typ !== "hub") {
    const unten = st.spur >= 2;
    const dx = 10;
    const dy = unten ? 30 : -24;
    const winkel = unten ? 32 : -32;
    const klasse = st.typ === "info" ? "label klein" : "label";
    t.push(`<text class="${klasse}" transform="translate(${x + dx} ${y + dy}) rotate(${winkel})">${esc(st.name)}</text>`);
  }
  t.push(`</g>`);
  return t.join("");
}

// ---------------------------------------------------------------------
// Detailansicht
// ---------------------------------------------------------------------
function waehle(id) {
  gewaehlt = id;
  zeichnePlan();
  zeichneDetail();
  const el = document.querySelector(`#plan .station[data-id="${id}"]`);
  if (el) {
    el.focus({ preventScroll: true });
  }
  if (window.matchMedia("(max-width: 1180px)").matches) {
    $("#detail").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function linienKopf(st) {
  if (st.typ === "hub") {
    return `<span class="linienpunkt" style="background:#1d1d1c"></span>Laborserver`;
  }
  const l = P.linien[st.linie];
  return `<span class="linienpunkt" style="background:${l.farbe}"></span>Linie ${esc(l.name)} · ${esc(l.lg)}`;
}

function siegelListe(st) {
  const s = st.siegel;
  const q = P.quellen[s.quelle];
  const ids = s.ids || q.stufen.map((x) => x.id);
  const ziel = s.ziel || ids;
  const eintraege = ids.map((id) => {
    const stufe = q.stufen.find((x) => x.id === id);
    const hat = !!(stand[s.quelle] && stand[s.quelle][id]);
    const bonus = !ziel.includes(id);
    let symbol;
    if (q.art === "dojo") {
      symbol = `<span class="guertel${hat ? "" : " leer"}" style="--g:${stufe.farbe}"></span>`;
    } else {
      symbol = `<span class="siegel${hat ? " hat" : ""}">${hat ? "✓" : ""}</span>`;
    }
    const rang = stufe.rang ? `<small>${esc(stufe.rang)}</small>` : "";
    return `<li class="${hat ? "hat" : ""}${bonus ? " bonus" : ""}">${symbol}<span>${esc(stufe.name)}${rang}</span>${bonus ? `<em class="chip">${esc(s.zusatz || "Bonus")}</em>` : ""}</li>`;
  });
  return `<ul class="siegelliste${q.art === "dojo" ? " dojo" : ""}">${eintraege.join("")}</ul>`;
}

function zeichneDetail() {
  const box = $("#detail");
  let st = gewaehlt ? P.stationen.find((s) => s.id === gewaehlt) : null;
  let ueberschrift = "";
  if (!st) {
    st = naechsterHalt();
    ueberschrift = st ? "Dein nächster offener Halt" : "";
    if (!st) {
      box.innerHTML = `<div class="detail-kopf"><span class="punkt"></span>Alles geschafft</div>
        <div class="detail-inhalt"><h2>Alle Siegel sind gesammelt</h2><p>Stark! Dein Laborserver ist komplett ausgebaut. Klick auf eine Station, um nachzulesen, worum es dort ging.</p></div>`;
      return;
    }
  }
  const z = stationsStand(st);
  const teile = [];
  teile.push(`<div class="detail-kopf"><span class="punkt"></span>${ueberschrift ? esc(ueberschrift) : "Station"}</div>`);
  teile.push(`<div class="detail-inhalt">`);
  teile.push(`<div class="linienkopf">${linienKopf(st)}</div>`);
  teile.push(`<h2>${esc(st.name)}${st.kurz ? ` <span class="kurz">· ${esc(st.kurz)}</span>` : ""}</h2>`);
  if (!P.ohneZeit) {
    teile.push(`<p class="zeit">${esc(st.zeitraum)}</p>`);
  }
  teile.push(`<p>${esc(st.text)}</p>`);
  if (st.material) {
    teile.push(`<p class="material"><b>Material:</b> ${esc(st.material)}</p>`);
  }

  if (st.typ === "hub") {
    const on = hubOnline(st);
    const stufen = ausbauVon(st);
    teile.push(`<p class="hubstatus ${on ? "an" : ""}"><span class="led"></span>${on ? "Bereit: Alle nötigen Einschübe sind online." : `Noch nicht bereit. Dafür muss ${stufen.map((u) => `„${esc(u.name)}“`).join(", ")} online sein.`}</p>`);
  }

  if (z) {
    const q = P.quellen[st.siegel.quelle];
    if (q.art === "manuell") {
      const an = z.fertig;
      teile.push(`<label class="haken-feld"><input type="checkbox" id="haken" ${an ? "checked" : ""} ${speicherOk ? "" : "disabled"}> ${esc(q.stufen[0].name)}</label>`);
    } else {
      teile.push(`<p class="fortschritt"><b>${z.hat} von ${z.von}</b> ${q.wort}</p>`);
      teile.push(siegelListe(st));
    }
  }

  const beitrag = st.typ === "hub" ? [] : ausbauVon(st);
  if (beitrag.length) {
    teile.push(`<p class="beitrag">Baut am Laborserver: ${beitrag.map((u) => `<span class="chip">${esc(u.name)}</span>`).join(" ")}</p>`);
  }

  if (st.link) {
    const extern = !st.link.startsWith("https://flowthetensor.github.io/");
    const knopf = st.typ === "ls" ? "Lernsituation öffnen" : "Kurs öffnen";
    teile.push(`<p class="aktionen"><a class="knopf primaer" href="${esc(st.link)}"${extern ? ' target="_blank" rel="noopener"' : ""}>${knopf} →</a></p>`);
  }
  teile.push(`</div>`);
  box.innerHTML = teile.join("");

  const haken = $("#haken");
  if (haken) {
    haken.addEventListener("change", () => {
      const obj = lies(SPEICHER_HAKEN) || {};
      obj[st.siegel.quelle] = haken.checked;
      schreib(SPEICHER_HAKEN, obj);
      aktualisiere();
    });
  }
}

// ---------------------------------------------------------------------
// Laborserver (Rack)
// ---------------------------------------------------------------------
function zeichneRack() {
  const staende = P.ausbau.map((u) => ausbauStand(u));
  const online = staende.filter((s) => s.fertig).length;
  $("#rack-status").innerHTML = `<b>${online} von ${P.ausbau.length}</b> Einschüben online`;

  const teile = P.ausbau.map((u, i) => {
    const s = staende[i];
    const zustand = s.fertig ? "an" : s.hat > 0 ? "teil" : "aus";
    const text = s.fertig ? "online" : s.hat > 0 ? "im Aufbau" : "aus";
    const beds = u.bedingungen.map((b) => {
      const z = zaehle(b.quelle, b.ids);
      const st = P.stationen.find((x) => x.id === b.station);
      const q = P.quellen[b.quelle];
      const wort = q.art === "manuell" ? (z.fertig ? "abgehakt" : "offen") : `${z.hat}/${z.von} ${q.wort}`;
      return `<li class="${z.fertig ? "hat" : ""}"><button type="button" class="link" data-station="${b.station}">${esc(st ? st.name : b.quelle)}</button><span>${wort}</span></li>`;
    });
    if (u.voraussetzung) {
      beds.push(`<li class="${s.fertig ? "hat" : ""}"><span class="ohne-link">alle Einschübe darüber</span><span>${s.hat}/${s.von}</span></li>`);
    }
    return `<li class="einschub ${zustand}">
      <details>
        <summary>
          <span class="u">U${i + 1}</span>
          <span class="led"></span>
          <span class="einschub-text"><b>${esc(u.name)}</b><small>${text}</small></span>
          <span class="balken"><i style="width:${Math.round(s.anteil * 100)}%"></i></span>
        </summary>
        <div class="einschub-mehr"><p>${esc(u.text)}</p><ul>${beds.join("")}</ul></div>
      </details>
    </li>`;
  });
  $("#einschuebe").innerHTML = teile.join("");
  document.querySelectorAll("#einschuebe button.link").forEach((b) => {
    b.addEventListener("click", () => waehle(b.dataset.station));
  });
  return staende;
}

// neue Einschübe melden
function meldeNeues(staende) {
  const neu = staende.map((s) => s.fertig);
  const alt = lies(SPEICHER_STAND);
  if (Array.isArray(alt) && alt.length === neu.length) {
    const gerade = P.ausbau.filter((u, i) => neu[i] && !alt[i]);
    if (gerade.length) {
      zeigeToast(`⚡ ${gerade.map((u) => `„${esc(u.name)}“`).join(" und ")} ${gerade.length > 1 ? "sind" : "ist"} jetzt online!`);
    }
  }
  schreib(SPEICHER_STAND, neu);
}

function zeigeToast(html) {
  const t = $("#toast");
  t.innerHTML = html;
  t.classList.add("zeigen");
  clearTimeout(zeigeToast.timer);
  zeigeToast.timer = setTimeout(() => t.classList.remove("zeigen"), 5000);
}

// ---------------------------------------------------------------------
// Kopf: Zähler
// ---------------------------------------------------------------------
function zeichneZaehler() {
  const gesehen = new Set();
  let siegel = [0, 0];
  let guertel = [0, 0];
  P.stationen.forEach((st) => {
    if (!st.siegel) {
      return;
    }
    const q = P.quellen[st.siegel.quelle];
    if (q.art === "manuell") {
      return;
    }
    const ids = st.siegel.ids || q.stufen.map((s) => s.id);
    ids.forEach((id) => {
      const k = st.siegel.quelle + ":" + id;
      if (gesehen.has(k)) {
        return;
      }
      gesehen.add(k);
      const hat = stand[st.siegel.quelle][id] ? 1 : 0;
      if (q.art === "dojo") {
        guertel[0] += hat;
        guertel[1] += 1;
      } else {
        siegel[0] += hat;
        siegel[1] += 1;
      }
    });
  });
  $("#zaehler").innerHTML =
    `<span class="zahlfeld"><b>${siegel[0]}</b>/${siegel[1]}<small>Prüfsiegel</small></span>` +
    `<span class="zahlfeld"><b>${guertel[0]}</b>/${guertel[1]}<small>Dojo-Gürtel</small></span>`;
}

// ---------------------------------------------------------------------
// Legende, Hostname, Start
// ---------------------------------------------------------------------
function zeichneLegende() {
  const linien = Object.keys(P.linien).map((lid) => {
    const l = P.linien[lid];
    return `<li><span class="strich" style="background:${l.farbe}"></span><b>${esc(l.name)}</b> <small>${esc(l.lg)}</small></li>`;
  });
  $("#legende-linien").innerHTML = linien.join("");
}

function aktualisiere() {
  leseAlles();
  zeichnePlan();
  zeichneDetail();
  const staende = zeichneRack();
  zeichneZaehler();
  meldeNeues(staende);
  $("#hinweis-speicher").hidden = speicherOk;
}

function starteHost() {
  const feld = $("#host");
  const name = lies(SPEICHER_HOST);
  if (typeof name === "string") {
    feld.value = name;
  }
  feld.addEventListener("input", () => {
    feld.value = feld.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").slice(0, 28);
    schreib(SPEICHER_HOST, feld.value);
  });
}

function start() {
  document.title = P.titel + " · Jakob-Preh-Schule";
  $("#titel").textContent = P.titel;
  $("#untertitel").textContent = P.untertitel;
  $("#einleitung").textContent = P.einleitung;
  zeichneLegende();
  starteHost();
  aktualisiere();

  $("#neu-laden").addEventListener("click", () => {
    aktualisiere();
    zeigeToast("Siegel neu eingelesen.");
  });
  // zurück aus einer Lernsituation (anderer Tab) → neu einlesen
  window.addEventListener("storage", aktualisiere);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      aktualisiere();
    }
  });
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      aktualisiere();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && gewaehlt) {
      gewaehlt = null;
      zeichnePlan();
      zeichneDetail();
    }
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", start);
}
