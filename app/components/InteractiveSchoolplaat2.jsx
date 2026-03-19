"use client";

import { useState } from "react";

// ─── 10 VERHAALLIJNEN uit het adviesrapport van Mireille Hogenboom ────────────
// x/y = positie op de afbeelding in procenten (pas aan als een stip verkeerd staat)
const HOTSPOTS = [
  {
    id: 1,
    label: "De Grafheuvel",
    emoji: "⛰️",
    x: 58,
    y: 35,
    color: "#7B4F2E",
    info: "In het midden van de schoolplaat zie je een grafheuvel — een opgestapelde heuvel van aarde die werd aangelegd als graf. Op de Veluwe zijn nog honderden van zulke heuvels te vinden. Ze dateren uit de periode 2500–800 voor Christus. De heuvel was zichtbaar van ver en markeerde de rustplaats van een belangrijk persoon. Rondom de heuvel was soms een greppel gegraven. De heuvel groeide door de eeuwen heen aan omdat er steeds nieuwe mensen in of bij begraven werden.",
  },
  {
    id: 2,
    label: "Grafrituelen",
    emoji: "🔥",
    x: 28,
    y: 38,
    color: "#C0392B",
    info: "Links op de plaat brandt een groot vuur. Dit hoort bij de grafrituelen. De overledene werd soms verbrand (crematie) of begraven. Rondom het vuur kwamen mensen samen om afscheid te nemen. Er werden offers gebracht: aardewerk, voedsel en waardevolle voorwerpen. Muziek, dans en gezang hoorden waarschijnlijk ook bij de plechtigheid. Het ritueel hielp de gemeenschap om met de dood om te gaan en de overledene naar het hiernamaals te begeleiden.",
  },
  {
    id: 3,
    label: "Kleding",
    emoji: "🧥",
    x: 13,
    y: 50,
    color: "#2E7D32",
    info: "De twee mensen op de voorgrond links dragen typische kleding uit de bronstijd. Kleding werd gemaakt van dierenhuid, wol en geweven plantvezels zoals vlas. De man draagt een mantel van dierenhuid. De vrouw draagt een geweven tuniek. Kleding was niet alleen bescherming tegen de kou — het toonde ook de status van de drager. Rijkere mensen hadden fijner geweven stoffen en versierde randen.",
  },
  {
    id: 4,
    label: "Sieraden",
    emoji: "✨",
    x: 20,
    y: 62,
    color: "#F9A825",
    info: "Op de voorgrond zie je mensen met sieraden. Die werden gemaakt van bot, steen, barnsteen en later ook brons en goud. Armbanden, halskettingen, haarspelden en fibulae (mantelspelden) waren populair. Sieraden waren een teken van rijkdom en macht. De mooiste sieraden werden mee begraven in de grafheuvel, zodat de overledene ze ook in het hiernamaals kon dragen. Archeologen vinden ze daarom terug bij opgravingen.",
  },
  {
    id: 5,
    label: "Stookkuilen",
    emoji: "♨️",
    x: 50,
    y: 57,
    color: "#E64A19",
    info: "Midden op de plaat zijn mensen bezig bij een stookkuil — een kuil gevuld met verhitte stenen. Door water over de hete stenen te gieten ontstond stoom, waarmee voedsel gegaard werd. Dit is een van de oudste kooktechnieken ter wereld. Archeologen herkennen stookkuilen in de grond als donkere vlekken vol gebarsten stenen en houtskool. Ze komen voor op vrijwel alle prehistorische nederzettingen op de Veluwe.",
  },
  {
    id: 6,
    label: "De Veluwse Klokbeker",
    emoji: "🏺",
    x: 66,
    y: 63,
    color: "#6A1B9A",
    info: "Rechts op de plaat zie je aardewerk — waaronder de beroemde klokbeker. Dit is een bijzonder stuk aardewerk in de vorm van een omgekeerde klok, versierd met ingegraveerde patronen. De klokbeker werd gemaakt door de 'Klokbekercultuur' (2700–2100 v.Chr.) en gevonden over heel Europa. Op de Veluwe zijn meerdere exemplaren opgegraven. De beker had een rituele betekenis en werd gebruikt bij ceremonies en als grafgift.",
  },
  {
    id: 7,
    label: "Het Zwaard van Bergsham",
    emoji: "⚔️",
    x: 80,
    y: 52,
    color: "#37474F",
    info: "Rechts op de plaat staat een man met een bronzen zwaard. Het zwaard van Bergsham is een echt opgegraven bronzen zwaard gevonden op de Veluwe, daterend uit de Midden-Bronstijd (1500–1100 v.Chr.). Zulke zwaarden waren zeldzaam en kostbaar — echte statussymbolen voor krijgers en leiders. Ze werden zorgvuldig gesmeed van brons (koper en tin). Veel van dit soort zwaarden werden als offer in de grond of in water gestopt.",
  },
  {
    id: 8,
    label: "Het Landschap",
    emoji: "🌲",
    x: 72,
    y: 18,
    color: "#388E3C",
    info: "Op de achtergrond zie je het typische Veluwse landschap in de herfst: open zandvlaktes (stuifzanden) afgewisseld met herfstkleurige bossen. In de prehistorie zag de Veluwe er zo uit. De eerste boeren kapten bomen om landbouwgrond te maken. Door overbegrazing en ontbossing ontstonden de kale zandvlaktes. Later groeiden hier de heidevelden die de Veluwe zo kenmerken. Het landschap dat we nu kennen is dus mede gevormd door de mensen die hier duizenden jaren geleden leefden.",
  },
  {
    id: 9,
    label: "De Dieren",
    emoji: "🐕",
    x: 88,
    y: 70,
    color: "#00695C",
    info: "Rechtsonder op de plaat zie je een hond — al duizenden jaren de trouwe metgezel van de mens. De eerste boeren op de Veluwe leefden samen met tamme dieren: koeien, schapen, geiten en varkens. Ze jaagten ook op wilde dieren zoals edelherten en everzwijnen. Dieren speelden een grote rol in het dagelijks leven én in rituelen: soms werden dieren geofferd bij begrafenissen. Dierenbotten worden regelmatig gevonden bij opgravingen van grafheuvels.",
  },
  {
    id: 10,
    label: "Omgaan met de Dood",
    emoji: "🌿",
    x: 40,
    y: 72,
    color: "#546E7A",
    info: "Voor de eerste boeren was de dood geen einde maar een overgang naar een andere wereld. Ze geloofden dat voorouders bescherming boden aan de levenden. Daarom werden overledenen begraven met hun bezittingen: eten, gereedschap, sieraden en wapens. De grafheuvel bleef een heilige plek waar de gemeenschap terugkeerde voor rituelen en offers. Het eren van voorouders was een belangrijk onderdeel van het dagelijks leven en hield de gemeenschap samen.",
  },
];

export default function InteractiveSchoolplaat() {
  const [active, setActive] = useState(null);
  const selected = HOTSPOTS.find((h) => h.id === active);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #2c1a0e 0%, #3d2510 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "28px 16px 40px",
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>

      {/* ── HEADER ── */}
      <div style={{ textAlign: "center", marginBottom: 24, maxWidth: 700 }}>
        <div style={{ color: "#c8a97a", fontSize: "0.78rem", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
          Gemeente Apeldoorn · Cultuur &amp; Erfgoed · Vensters Veluws Verleden
        </div>
        <h1 style={{
          color: "#f5d9a8",
          fontSize: "clamp(1.3rem, 3.5vw, 1.9rem)",
          margin: "0 0 8px",
          textShadow: "0 2px 12px rgba(0,0,0,0.7)",
        }}>
          De Eerste Boeren en hun Grafheuvellandschap
        </h1>
        <p style={{ color: "#a0856a", fontSize: "0.88rem", margin: 0 }}>
          Klik op een stip op de afbeelding om meer te ontdekken
        </p>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{
        display: "flex",
        gap: 24,
        alignItems: "flex-start",
        width: "100%",
        maxWidth: 1120,
        flexWrap: "wrap",
        justifyContent: "center",
      }}>

        {/* ── SCHOOLPLAAT MET HOTSPOTS ── */}
        <div style={{
          position: "relative",
          flex: "1 1 520px",
          maxWidth: 700,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.8)",
          border: "3px solid #6b4226",
        }}>
          {/*
            Zet Picture1.png in de /public/ map van je Next.js project.
            Dan werkt src="/Picture1.png" automatisch.
          */}
          <img
            src="/Picture1.png"
            alt="Schoolplaat: De eerste boeren en hun grafheuvellandschap – Veluwe"
            style={{ display: "block", width: "100%", height: "auto" }}
            draggable={false}
          />

          {/* HOTSPOT KNOPPEN */}
          {HOTSPOTS.map((h) => {
            const isActive = active === h.id;
            return (
              <button
                key={h.id}
                onClick={() => setActive(isActive ? null : h.id)}
                title={h.label}
                aria-label={h.label}
                style={{
                  position: "absolute",
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  transform: "translate(-50%, -50%)",
                  width: isActive ? 44 : 34,
                  height: isActive ? 44 : 34,
                  borderRadius: "50%",
                  background: isActive ? h.color : "rgba(255,255,255,0.92)",
                  border: `3px solid ${h.color}`,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isActive ? "1.1rem" : "0.9rem",
                  boxShadow: isActive
                    ? `0 0 0 5px ${h.color}44, 0 4px 16px rgba(0,0,0,0.6)`
                    : "0 2px 8px rgba(0,0,0,0.5)",
                  transition: "all 0.18s ease",
                  zIndex: 10,
                  padding: 0,
                  outline: "none",
                }}
              >
                <span style={{ pointerEvents: "none" }}>{h.emoji}</span>
              </button>
            );
          })}
        </div>

        {/* ── INFO PANEL ── */}
        <div style={{ flex: "1 1 280px", maxWidth: 360 }}>
          {selected ? (
            <div
              key={selected.id}
              style={{
                background: "rgba(15, 8, 3, 0.88)",
                border: `2px solid ${selected.color}`,
                borderRadius: 12,
                padding: "22px 24px",
                color: "#f0e0c0",
                boxShadow: `0 6px 28px rgba(0,0,0,0.6)`,
                animation: "fadeSlide 0.22s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: "2rem", lineHeight: 1 }}>{selected.emoji}</span>
                <div>
                  <div style={{ color: "#a0856a", fontSize: "0.7rem", letterSpacing: 2, textTransform: "uppercase" }}>
                    Verhaallijn {selected.id} van 10
                  </div>
                  <h2 style={{ margin: 0, fontSize: "1.05rem", color: "#f5d9a8" }}>
                    {selected.label}
                  </h2>
                </div>
              </div>

              <div style={{ height: 2, background: selected.color, marginBottom: 14, borderRadius: 2, opacity: 0.7 }} />

              <p style={{ margin: 0, lineHeight: 1.75, fontSize: "0.88rem", color: "#e8d5b0" }}>
                {selected.info}
              </p>

              <button
                onClick={() => setActive(null)}
                style={{
                  marginTop: 16,
                  background: "transparent",
                  border: `1px solid ${selected.color}55`,
                  color: "#a0856a",
                  borderRadius: 6,
                  padding: "5px 16px",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                }}
              >
                ← Terug
              </button>
            </div>
          ) : (
            <div style={{
              background: "rgba(15,8,3,0.6)",
              border: "2px dashed #6b4226",
              borderRadius: 12,
              padding: "20px 18px",
              color: "#a0856a",
              textAlign: "center",
            }}>
              <p style={{ fontSize: "2rem", margin: "0 0 8px" }}>🗺️</p>
              <p style={{ margin: "0 0 16px", fontSize: "0.88rem", lineHeight: 1.6 }}>
                Er zijn <strong style={{ color: "#f5d9a8" }}>10 verhaallijnen</strong> te ontdekken.
                Klik op een stip op de afbeelding, of kies hieronder:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 5, textAlign: "left" }}>
                {HOTSPOTS.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActive(h.id)}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid ${h.color}44`,
                      borderLeft: `3px solid ${h.color}`,
                      color: "#ddc99a",
                      borderRadius: 6,
                      padding: "7px 12px",
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span>{h.emoji}</span>
                    <span style={{ flex: 1 }}>{h.label}</span>
                    <span style={{ color: "#6b4226", fontSize: "0.72rem" }}>#{h.id}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <p style={{ color: "#4a2e14", fontSize: "0.74rem", marginTop: 28, textAlign: "center" }}>
        Vensters Veluws Verleden · Gemeente Apeldoorn – Vakgroep Cultuur &amp; Erfgoed · 2026<br />
        Contact: M. Parlevliet · J. Zuyderwyk
      </p>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        button:hover { opacity: 0.82 !important; }
      `}</style>
    </div>
  );
}
