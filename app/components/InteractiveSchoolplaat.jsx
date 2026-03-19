"use client";

import { useState } from "react";

// ─── 10 VERHAALLIJNEN uit het adviesrapport van Mireille Hogenboom ────────────
// x/y = positie op de afbeelding in procenten (pas aan als een stip verkeerd staat)
const HOTSPOTS = [
  { id: 1,  label: "De Grafheuvel",          emoji: "⛰️", x: 58, y: 35, color: "#7B4F2E" },
  { id: 2,  label: "Grafrituelen",            emoji: "🔥", x: 28, y: 38, color: "#C0392B" },
  { id: 3,  label: "Kleding",                 emoji: "🧥", x: 13, y: 50, color: "#2E7D32" },
  { id: 4,  label: "Sieraden",                emoji: "✨", x: 20, y: 62, color: "#F9A825" },
  { id: 5,  label: "Stookkuilen",             emoji: "♨️", x: 50, y: 57, color: "#E64A19" },
  { id: 6,  label: "De Veluwse Klokbeker",    emoji: "🏺", x: 66, y: 63, color: "#6A1B9A" },
  { id: 7,  label: "Het Zwaard van Bergsham", emoji: "⚔️", x: 80, y: 52, color: "#37474F" },
  { id: 8,  label: "Het Landschap",           emoji: "🌲", x: 72, y: 18, color: "#388E3C" },
  { id: 9,  label: "De Dieren",               emoji: "🐕", x: 88, y: 70, color: "#00695C" },
  { id: 10, label: "Omgaan met de Dood",      emoji: "🌿", x: 40, y: 72, color: "#546E7A" },
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
                padding: "28px 24px",
                color: "#f0e0c0",
                boxShadow: `0 6px 28px rgba(0,0,0,0.6)`,
                animation: "fadeSlide 0.22s ease",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "3rem", lineHeight: 1 }}>{selected.emoji}</span>
              <div style={{ color: "#a0856a", fontSize: "0.7rem", letterSpacing: 2, textTransform: "uppercase", margin: "12px 0 4px" }}>
                Verhaallijn {selected.id} van 10
              </div>
              <h2 style={{ margin: "0 0 16px", fontSize: "1.15rem", color: "#f5d9a8" }}>
                {selected.label}
              </h2>
              <div style={{ height: 2, background: selected.color, marginBottom: 18, borderRadius: 2, opacity: 0.6 }} />
              <div style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px dashed #6b4226",
                borderRadius: 8,
                padding: "16px",
                color: "#a0856a",
                fontSize: "0.85rem",
                lineHeight: 1.6,
              }}>
                🚧 Inhoud volgt in de volgende versie
              </div>
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
