"use client";

import { useMemo } from "react";
import { Lock, Trophy, Sparkles } from "lucide-react";

// 8 schoolplaten — grafheuvelplaat MUST be on position 2.
// Balanced 4×2 grid layout.
export const PLATEN = [
  { id: 1, title: "Vorming van het landschap", subtitle: "Jagers en verzamelaars", region: "Nunspeet", available: false, emoji: "🏔️", gradient: "linear-gradient(135deg,#3a2410,#5a3a1a)" },
  { id: 2, title: "De eerste boeren", subtitle: "Hun grafheuvelritueel", region: "Barneveld", available: true, emoji: "⚱️", gradient: "linear-gradient(135deg,#7B4F2E,#C0392B)", featured: true, image: "/Picture1.png" },
  { id: 3, title: "Oog in oog met de Romeinen", subtitle: "Veluwse Romeinen", region: "Ermelo", available: false, emoji: "🛡️", gradient: "linear-gradient(135deg,#4a2a14,#8B5E3C)" },
  { id: 4, title: "De ijzersterke middeleeuwen", subtitle: "Burchten en boeren", region: "Apeldoorn", available: false, emoji: "🏰", gradient: "linear-gradient(135deg,#3a1f10,#6b4226)" },
  { id: 5, title: "Menselijke invloed op landschap", subtitle: "Ontstaan Veluwse natuur", region: "Putten", available: false, emoji: "🌾", gradient: "linear-gradient(135deg,#5a3a1a,#8b5e3c)" },
  { id: 6, title: "Beken, sprengen en watermolens", subtitle: "Stromend water", region: "Epe", available: false, emoji: "💧", gradient: "linear-gradient(135deg,#2c1a0e,#5a3218)" },
  { id: 7, title: "Agrarisch landschap", subtitle: "Boerenland op de Veluwe", region: "Staverden", available: false, emoji: "🌽", gradient: "linear-gradient(135deg,#4a3018,#a07840)" },
  { id: 8, title: "Oorlog, vrede en veiligheid", subtitle: "20e eeuw op de Veluwe", region: "De Veluwe", available: false, emoji: "🕊️", gradient: "linear-gradient(135deg,#1e0f05,#3a2010)" },
];

export default function Startscherm({ onOpen }) {
  const bestScore = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("veluwe_leaderboard");
      if (!raw) return null;
      const board = JSON.parse(raw);
      if (!board.length) return null;
      return [...board].sort((a, b) => b.score - a.score)[0];
    } catch { return null; }
  }, []);

  return (
    <div className="start-root">
      {/* Bewegende dieren / vogels in de achtergrond */}
      <div className="start-critters" aria-hidden>
        <span className="critter bird b1">🦅</span>
        <span className="critter bird b2">🕊️</span>
        <span className="critter bird b3">🐦</span>
        <span className="critter leaf l1">🍂</span>
        <span className="critter leaf l2">🍁</span>
        <span className="critter leaf l3">🍂</span>
      </div>
      <style>{`
        .start-critters { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
        .critter { position: absolute; font-size: 1.6rem; opacity: 0.55; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4)); }
        @keyframes flyAcross { 0% { transform: translateX(-10vw) translateY(0) scale(1); } 50% { transform: translateX(50vw) translateY(-12px) scale(1.05); } 100% { transform: translateX(110vw) translateY(0) scale(1); } }
        @keyframes flutter { 0%,100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-6px) rotate(6deg); } }
        @keyframes fall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; } 10% { opacity: 0.7; } 100% { transform: translateY(110vh) rotate(540deg); opacity: 0; } }
        .bird { top: 12%; left: 0; animation: flyAcross 24s linear infinite; }
        .bird.b2 { top: 28%; animation-duration: 32s; animation-delay: -8s; font-size: 1.3rem; }
        .bird.b3 { top: 56%; animation-duration: 28s; animation-delay: -16s; font-size: 1.1rem; opacity: 0.4; }
        .leaf { top: 0; animation: fall 18s linear infinite; }
        .leaf.l1 { left: 18%; animation-delay: -3s; }
        .leaf.l2 { left: 62%; animation-delay: -9s; animation-duration: 22s; font-size: 1.4rem; }
        .leaf.l3 { left: 86%; animation-delay: -14s; animation-duration: 26s; font-size: 1.2rem; opacity: 0.4; }
        @media (prefers-reduced-motion: reduce) { .critter { display: none; } }

        .start-root {
          position: relative;
          min-height: 100vh;
          background:
            radial-gradient(ellipse at 20% 10%, rgba(217,119,6,0.16), transparent 55%),
            radial-gradient(ellipse at 80% 90%, rgba(192,57,43,0.16), transparent 55%),
            linear-gradient(160deg, #1e0f05 0%, #2c1a0e 50%, #3a2010 100%);
          display: flex; flex-direction: column; align-items: center;
          padding: 36px 16px 60px; font-family: 'Nunito','Segoe UI',sans-serif;
          color: #f5d9a8;
          overflow: hidden;
        }
        .start-root > *:not(.start-critters) { position: relative; z-index: 1; }
        .start-hero { text-align: center; max-width: 800px; margin-bottom: 28px; opacity: 0; transform: translateY(-12px); animation: heroIn 0.6s 0.05s ease forwards; }
        .start-eyebrow { color:#c8a97a; font-size:0.72rem; letter-spacing:5px; text-transform:uppercase; margin-bottom:14px; display:flex; align-items:center; gap:8px; justify-content:center; }
        .start-title { font-family: var(--font-playfair, 'Playfair Display'), serif; font-size: clamp(1.8rem, 5vw, 3rem); font-weight: 800; margin: 0 0 10px; background: linear-gradient(135deg,#fde2a8,#d97706 60%,#92400e); -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: 0 2px 22px rgba(0,0,0,0.4); }
        .start-sub { color:#c8a97a; font-size: clamp(0.92rem, 2vw, 1.05rem); margin: 0 auto; max-width: 640px; line-height:1.6; }

        .start-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          width: 100%;
          max-width: 1180px;
        }
        @media (max-width: 980px) { .start-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 540px) { .start-grid { grid-template-columns: 1fr; } }

        .plaat-card {
          position: relative; aspect-ratio: 4 / 5; border-radius: 16px; overflow: hidden;
          border: 2px solid rgba(245,217,168,0.18);
          background: #1a0f08; cursor: not-allowed; opacity: 0.6;
          transition: transform 0.25s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.25s, border-color 0.25s;
          opacity: 0; transform: translateY(14px);
          animation: cardIn 0.5s ease forwards;
        }
        .plaat-card.available { cursor: pointer; opacity: 1; }
        .plaat-card.available:hover { transform: translateY(-4px) scale(1.015); border-color:#d97706; box-shadow: 0 20px 50px rgba(0,0,0,0.6), 0 0 0 4px rgba(217,119,6,0.18); }
        .plaat-card.featured { border-color:#d97706; box-shadow: 0 12px 40px rgba(217,119,6,0.25); }
        .plaat-card.featured::before {
          content: 'Pilot'; position: absolute; top: 10px; right: 10px; z-index: 4;
          background: linear-gradient(135deg,#d97706,#92400e); color:#fff; font-size:0.62rem; letter-spacing:1.5px;
          padding: 3px 9px; border-radius: 999px; font-weight: 700; text-transform: uppercase;
        }
        .plaat-bg { position:absolute; inset:0; }
        .plaat-bg img { width:100%; height:100%; object-fit: cover; opacity: 0.85; }
        .plaat-overlay { position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(10,5,2,0.92) 100%); }
        .plaat-emoji { position:absolute; top: 14px; left: 14px; font-size: 1.8rem; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.6)); z-index:2; }
        .plaat-index { position:absolute; top: 14px; right: 14px; color:#c8a97a; font-size:0.7rem; letter-spacing:2px; font-weight:600; z-index:2; background: rgba(0,0,0,0.5); padding: 3px 8px; border-radius: 999px; }
        .plaat-card.featured .plaat-index { right: 70px; }
        .plaat-text { position:absolute; left: 14px; right: 14px; bottom: 14px; z-index: 3; }
        .plaat-region { color: #d97706; font-size: 0.66rem; letter-spacing: 3px; text-transform: uppercase; font-weight: 700; margin-bottom: 4px; }
        .plaat-title { color:#fde2a8; font-size: 0.98rem; font-weight: 800; margin: 0 0 4px; line-height: 1.22; font-family: var(--font-playfair,'Playfair Display'),serif; }
        .plaat-sub { color:#c8a97a; font-size: 0.74rem; line-height: 1.35; }
        .plaat-soon { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:6px; color:#8b6240; background: rgba(20,10,4,0.65); backdrop-filter: blur(2px); z-index: 5; }
        .plaat-soon svg { width: 22px; height: 22px; }
        .plaat-soon-label { font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }

        .start-footer { margin-top: 36px; text-align: center; color: #6b4226; font-size: 0.78rem; line-height: 1.7; }
        .best-badge { display:inline-flex; align-items:center; gap:6px; margin-top:14px; padding: 6px 14px; border-radius: 999px; background: rgba(217,119,6,0.12); border: 1px solid rgba(217,119,6,0.35); color:#fde2a8; font-size:0.78rem; font-weight: 600; }

        @keyframes heroIn { to { opacity:1; transform: translateY(0); } }
        @keyframes cardIn { to { opacity:1; transform: translateY(0); } }
      `}</style>

      <div className="start-hero">
        <div className="start-eyebrow"><Sparkles size={14} /> Vensters Veluws Verleden</div>
        <h1 className="start-title">De Schoolplaten van de Veluwe</h1>
        <p className="start-sub">
          Acht historische schoolplaten brengen het verhaal van de Veluwe tot leven. Klik op een plaat om de
          archeologie en geschiedenis te ontdekken. De pilot — <strong style={{ color: "#fde2a8" }}>De eerste boeren en hun grafheuvelritueel</strong> — is volledig interactief.
        </p>
        {bestScore && (
          <div className="best-badge"><Trophy size={14} />Top score: {bestScore.name} — {bestScore.score} punten</div>
        )}
      </div>

      <div className="start-grid">
        {PLATEN.map((p, i) => (
          <button
            key={p.id}
            className={`plaat-card ${p.available ? "available" : ""} ${p.featured ? "featured" : ""}`}
            style={{
              background: p.gradient,
              animationDelay: `${0.1 + i * 0.05}s`,
            }}
            onClick={() => p.available && onOpen?.(p.id)}
            aria-label={`Schoolplaat ${p.id}: ${p.title}${p.available ? "" : " (binnenkort)"}`}
            disabled={!p.available}
          >
            <div className="plaat-bg">
              {p.image && <img src={p.image} alt="" draggable={false} />}
              <div className="plaat-overlay" />
            </div>
            <div className="plaat-emoji">{p.emoji}</div>
            <div className="plaat-index">#{p.id}</div>
            <div className="plaat-text">
              <div className="plaat-region">{p.region}</div>
              <div className="plaat-title">{p.title}</div>
              <div className="plaat-sub">{p.subtitle}</div>
            </div>
            {!p.available && (
              <div className="plaat-soon">
                <Lock />
                <div className="plaat-soon-label">Binnenkort</div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="start-footer">
        Gemeente Apeldoorn · Vakgroep Cultuur &amp; Erfgoed · 2026<br />
        Pilot voor de digitalisering van het Veluwse cultureel erfgoed
      </div>
    </div>
  );
}
