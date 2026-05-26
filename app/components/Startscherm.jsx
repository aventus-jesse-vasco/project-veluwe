"use client";

import { useMemo } from "react";
import { Lock, Trophy, Play, Sparkles } from "lucide-react";

export const PLATEN = [
  { id: 1, label: "Landschap",     emoji: "🏔️", color: "#fbbf24", available: false },
  { id: 2, label: "Eerste Boeren", emoji: "⚱️", color: "#e63946", available: true, image: "/Picture1.png" },
  { id: 3, label: "Romeinen",      emoji: "🛡️", color: "#fb8500", available: false },
  { id: 4, label: "Middeleeuwen",  emoji: "🏰", color: "#dc2626", available: false },
  { id: 5, label: "Natuur",        emoji: "🌾", color: "#facc15", available: false },
  { id: 6, label: "Watermolens",   emoji: "💧", color: "#4cc9f0", available: false },
  { id: 7, label: "Boerenland",    emoji: "🌽", color: "#eab308", available: false },
  { id: 8, label: "Vrede",         emoji: "🕊️", color: "#84cc16", available: false },
];

export default function Startscherm({ onOpen }) {
  const bestScore = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const board = JSON.parse(localStorage.getItem("veluwe_leaderboard") || "[]");
      return [...board].sort((a, b) => b.score - a.score)[0] || null;
    } catch { return null; }
  }, []);

  return (
    <div className="start">
      <style>{`
        .start {
          min-height: 100dvh;
          width: 100%;
          background:
            radial-gradient(circle at 20% 10%, #ffe89a 0%, transparent 55%),
            radial-gradient(circle at 80% 90%, #fb8500 0%, transparent 60%),
            linear-gradient(180deg, #ffd089 0%, #fb8500 100%);
          display: flex; flex-direction: column;
          padding: 28px 20px 40px;
          font-family: var(--font-body), sans-serif;
          color: #2d1605;
        }
        .start-header { text-align: center; opacity: 0; animation: headIn 0.6s 0.1s cubic-bezier(0.34,1.4,0.64,1) forwards; }
        @keyframes headIn { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: translateY(0); } }
        .start-title {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(2.2rem, 6vw, 4rem);
          font-weight: 700; margin: 0; line-height: 1;
          color: #2d1605;
          display: inline-flex; align-items: center; gap: 14px;
        }
        .start-title-spark { color: #ffb703; animation: sparkSpin 3s linear infinite; }
        @keyframes sparkSpin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        .start-sub {
          font-size: clamp(1.1rem, 2.4vw, 1.5rem);
          font-weight: 700; color: #6b3410;
          margin: 10px 0 0;
        }
        .start-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          width: 100%; max-width: 1200px;
          margin: 32px auto;
          flex: 1;
          align-content: center;
        }
        @media (max-width: 900px) { .start-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; } }
        @media (max-width: 480px) { .start-grid { grid-template-columns: 1fr; gap: 16px; } }
        .card {
          position: relative;
          aspect-ratio: 1;
          border-radius: 32px;
          border: 6px solid #fff;
          background: var(--c);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          color: #fff;
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: clamp(1rem, 2vw, 1.4rem);
          text-align: center;
          box-shadow: 0 8px 0 rgba(45,22,5,0.25), 0 18px 38px rgba(45,22,5,0.22);
          transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
          opacity: 0; transform: translateY(20px) scale(0.95);
          animation: cardIn 0.55s cubic-bezier(0.34,1.4,0.64,1) forwards;
        }
        @keyframes cardIn { to { opacity: 1; transform: translateY(0) scale(1); } }
        .card:disabled { cursor: not-allowed; }
        .card.available:hover { transform: translateY(-6px) scale(1.03); box-shadow: 0 12px 0 rgba(45,22,5,0.3), 0 22px 46px rgba(45,22,5,0.28); }
        .card.available:active { transform: translateY(2px) scale(0.96); box-shadow: 0 3px 0 rgba(45,22,5,0.25), 0 10px 22px rgba(45,22,5,0.22); }
        .card.featured {
          box-shadow: 0 10px 0 rgba(45,22,5,0.3), 0 22px 50px rgba(230,57,70,0.55);
        }
        .card.featured::after {
          content: ""; position: absolute;
          inset: -16px; border-radius: 40px; pointer-events: none;
          border: 4px solid rgba(255,255,255,0.45);
          animation: featuredHalo 1.8s ease-in-out infinite;
        }
        @keyframes featuredHalo {
          0%,100% { opacity: 0.85; transform: scale(0.96); }
          50%     { opacity: 0.3;  transform: scale(1.05); }
        }
        .card .card-emoji { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
        .card.available:hover .card-emoji { transform: scale(1.12) rotate(-6deg); }
        .card-emoji {
          font-size: clamp(3rem, 8vw, 5.4rem);
          margin-bottom: 10px;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));
        }
        .card-label {
          padding: 0 12px;
          text-shadow: 0 2px 6px rgba(0,0,0,0.4);
        }
        .card.locked {
          background: #d4b894;
          color: #6b3410;
          opacity: 0.85;
        }
        .card.locked .card-emoji { filter: grayscale(0.5); opacity: 0.5; }
        .card.locked .card-label { color: #6b3410; text-shadow: none; }
        .lock-pill {
          position: absolute; top: 14px; right: 14px;
          background: #fff; color: #6b3410;
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 8px rgba(0,0,0,0.18);
        }
        .play-pill {
          position: absolute; bottom: -22px; left: 50%;
          transform: translateX(-50%);
          width: 64px; height: 64px; border-radius: 50%;
          background: #fff; color: var(--c);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 16px rgba(0,0,0,0.28);
        }
        .start-footer {
          display: flex; justify-content: center;
        }
        .score-pill {
          display: inline-flex; align-items: center; gap: 10px;
          background: #fff; color: #2d1605;
          padding: 14px 22px; border-radius: 999px;
          font-family: var(--font-display); font-weight: 700;
          font-size: 1.1rem;
          box-shadow: 0 6px 16px rgba(45,22,5,0.2);
        }
        .score-pill svg { color: #ffb703; }
      `}</style>

      <div className="start-header">
        <h1 className="start-title">
          <Sparkles size={36} className="start-title-spark" />
          Vensters Veluws Verleden
          <Sparkles size={36} className="start-title-spark" />
        </h1>
        <p className="start-sub">Kies een schoolplaat!</p>
      </div>

      <div className="start-grid">
        {PLATEN.map((p, i) => (
          <button
            key={p.id}
            className={`card ${p.available ? "available" : "locked"} ${p.available ? "featured" : ""}`}
            style={{ "--c": p.color, animationDelay: `${0.15 + i * 0.06}s` }}
            onClick={() => p.available && onOpen?.(p.id)}
            disabled={!p.available}
            aria-label={p.label + (p.available ? "" : " (binnenkort)")}
          >
            <div className="card-emoji">{p.emoji}</div>
            <div className="card-label">{p.label}</div>
            {!p.available && (
              <div className="lock-pill"><Lock size={20} /></div>
            )}
            {p.available && (
              <div className="play-pill"><Play size={28} fill="currentColor" /></div>
            )}
          </button>
        ))}
      </div>

      <div className="start-footer">
        {bestScore && (
          <div className="score-pill">
            <Trophy size={20} fill="currentColor" />
            {bestScore.name} — {bestScore.score}
          </div>
        )}
      </div>
    </div>
  );
}
