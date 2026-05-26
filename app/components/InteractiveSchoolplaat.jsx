"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Home, Star, Check, X, RotateCcw, Trophy, Flame } from "lucide-react";

const IDLE_MS = 120_000;
const STAR_SCORE = { 1: 50, 2: 100, 3: 150 };
const NAME_KEY = "veluwe_last_name";
const BOARD_KEY = "veluwe_leaderboard";

const POIS = [
  {
    id: 1, label: "Grafheuvel", emoji: "⚱️", x: 62, y: 40, color: "#c0392b",
    game: { type: "quiz", q: "Welke vorm heeft een grafheuvel?", opts: [
      { e: "📐", label: "Plat",     correct: false },
      { e: "⛰️", label: "Heuvel",   correct: true  },
      { e: "🕳️", label: "Kuil",     correct: false },
      { e: "🌀", label: "Spiraal",  correct: false },
    ]},
  },
  {
    id: 2, label: "Vuur & Rituelen", emoji: "🔥", x: 54, y: 66, color: "#ea580c",
    game: { type: "order", title: "Zet het ritueel op volgorde", items: [
      { e: "👥", label: "Samenkomen", order: 1 },
      { e: "🌿", label: "Versieren",  order: 2 },
      { e: "🎁", label: "Offers",     order: 3 },
      { e: "🔥", label: "Vuur",       order: 4 },
      { e: "🪦", label: "Heuvel",     order: 5 },
    ]},
  },
  {
    id: 3, label: "Kleding", emoji: "👕", x: 22, y: 50, color: "#7c3aed",
    game: { type: "quiz", q: "Waar maakten ze kleding van?", opts: [
      { e: "🧶", label: "Wol",     correct: true  },
      { e: "🪨", label: "Steen",   correct: false },
      { e: "💎", label: "Diamant", correct: false },
      { e: "🧊", label: "IJs",     correct: false },
    ]},
  },
  {
    id: 4, label: "Sieraden", emoji: "💍", x: 14, y: 36, color: "#f59e0b",
    game: { type: "match", title: "Koppel het sieraad", pairs: [
      { a: { e: "💪", label: "Armband" }, b: { e: "🥉", label: "Brons" }},
      { a: { e: "📿", label: "Ketting" }, b: { e: "🟠", label: "Barnsteen" }},
      { a: { e: "📌", label: "Speld"   }, b: { e: "🦴", label: "Bot" }},
      { a: { e: "👑", label: "Kroon"   }, b: { e: "🥇", label: "Goud" }},
    ]},
  },
  {
    id: 5, label: "Koken", emoji: "🍲", x: 38, y: 46, color: "#e64a19",
    game: { type: "order", title: "Hoe kook je met stenen?", items: [
      { e: "⛏️", label: "Kuil graven",      order: 1 },
      { e: "🔥", label: "Stenen verhitten", order: 2 },
      { e: "🪨", label: "Stenen in kuil",   order: 3 },
      { e: "💧", label: "Water erop",       order: 4 },
      { e: "🍖", label: "Voedsel koken",    order: 5 },
    ]},
  },
  {
    id: 6, label: "Klokbeker", emoji: "🏺", x: 22, y: 20, color: "#6a1b9a",
    game: { type: "quiz", q: "Welke vorm heeft een klokbeker?", opts: [
      { e: "🔔", label: "Klok",     correct: true  },
      { e: "🥣", label: "Kom",      correct: false },
      { e: "📦", label: "Vierkant", correct: false },
      { e: "🥃", label: "Glas",     correct: false },
    ]},
  },
  {
    id: 7, label: "Zwaard", emoji: "⚔️", x: 8, y: 60, color: "#37474f",
    game: { type: "quiz", q: "Waar is het zwaard van gemaakt?", opts: [
      { e: "🥉", label: "Brons", correct: true  },
      { e: "🪵", label: "Hout",  correct: false },
      { e: "🪨", label: "Steen", correct: false },
      { e: "🧊", label: "IJs",   correct: false },
    ]},
  },
  {
    id: 8, label: "Landschap", emoji: "🌳", x: 50, y: 16, color: "#388e3c",
    game: { type: "quiz", q: "Wat is typisch Veluws?", opts: [
      { e: "🌳", label: "Bos & hei", correct: true  },
      { e: "🌊", label: "Zee",       correct: false },
      { e: "🏔️", label: "Berg",      correct: false },
      { e: "🏜️", label: "Woestijn",  correct: false },
    ]},
  },
  {
    id: 9, label: "Dieren", emoji: "🐕", x: 88, y: 72, color: "#00695c",
    game: { type: "match", title: "Welk dier hoort waarbij?", pairs: [
      { a: { e: "🦌", label: "Wild" },   b: { e: "🏹", label: "Jagen" }},
      { a: { e: "🐄", label: "Tam"  },   b: { e: "🏠", label: "Boerderij" }},
      { a: { e: "🐕", label: "Hond" },   b: { e: "🤝", label: "Vriend" }},
      { a: { e: "🐗", label: "Zwijn" },  b: { e: "🌳", label: "Bos" }},
    ]},
  },
  {
    id: 10, label: "Afscheid", emoji: "🪦", x: 78, y: 38, color: "#546e7a",
    game: { type: "quiz", q: "Wat ging mee in het graf?", opts: [
      { e: "📿", label: "Sieraden", correct: true  },
      { e: "📱", label: "Telefoon", correct: false },
      { e: "💡", label: "Lamp",     correct: false },
      { e: "📺", label: "TV",       correct: false },
    ]},
  },
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function InteractiveSchoolplaat({ onBack }) {
  const [active, setActive] = useState(null);
  const [results, setResults] = useState({}); // { [poiId]: { stars: 1-3, scored: int } }
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [confettiKey, setConfettiKey] = useState(0);
  const [pops, setPops] = useState([]); // floating "+N" popups
  const [end, setEnd] = useState(false);
  const [imgRatio, setImgRatio] = useState(4 / 3);
  const [imgReady, setImgReady] = useState(false);
  const idleTimer = useRef(null);

  // Image ratio detection + preload
  useEffect(() => {
    if (typeof window === "undefined") return;
    const i = new window.Image();
    i.src = "/Picture1.png";
    i.onload = () => {
      if (i.naturalWidth && i.naturalHeight) {
        setImgRatio(i.naturalWidth / i.naturalHeight);
      }
      setImgReady(true);
    };
    i.onerror = () => setImgReady(true);
  }, []);

  // Animated score ticker
  useEffect(() => {
    if (displayScore === score) return;
    const diff = score - displayScore;
    const step = Math.max(1, Math.ceil(Math.abs(diff) / 20));
    const t = setTimeout(() => {
      setDisplayScore((d) => {
        if (d < score) return Math.min(score, d + step);
        if (d > score) return Math.max(score, d - step);
        return d;
      });
    }, 28);
    return () => clearTimeout(t);
  }, [displayScore, score]);

  const resetAll = useCallback(() => {
    setActive(null); setResults({}); setScore(0); setDisplayScore(0); setStreak(0); setEnd(false);
  }, []);

  // Idle reset
  useEffect(() => {
    const arm = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(resetAll, IDLE_MS);
    };
    arm();
    const events = ["pointerdown", "touchstart", "keydown"];
    events.forEach((ev) => window.addEventListener(ev, arm, { passive: true }));
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, arm));
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [resetAll]);

  // ESC: close overlay first, then exit to startscherm
  useEffect(() => {
    function onKey(e) {
      if (e.key !== "Escape") return;
      if (end) return;
      if (active !== null) setActive(null);
      else onBack?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, end, onBack]);

  function pushPop(text, color) {
    const id = Date.now() + Math.random();
    setPops((p) => [...p, { id, text, color }]);
    setTimeout(() => setPops((p) => p.filter((x) => x.id !== id)), 1500);
  }

  function finishGame({ stars }) {
    const id = active;
    if (id == null) return;
    const base = STAR_SCORE[stars] || 0;
    const newStreak = stars === 3 ? streak + 1 : 0;
    const mult = newStreak >= 6 ? 2 : newStreak >= 3 ? 1.5 : 1;
    const earned = Math.round(base * mult);

    setResults((r) => ({ ...r, [id]: { stars, scored: earned } }));
    setScore((s) => s + earned);
    setStreak(newStreak);

    if (earned > 0) {
      pushPop(`+${earned}`, stars === 3 ? "#06d6a0" : stars === 2 ? "#ffb703" : "#fb8500");
    }
    if (stars === 3) {
      setConfettiKey((k) => k + 1);
    }

    setTimeout(() => {
      setActive(null);
      const newResults = { ...results, [id]: { stars, scored: earned } };
      if (Object.keys(newResults).length >= POIS.length) {
        setTimeout(() => setEnd(true), 600);
      }
    }, 1500);
  }

  const activePoi = POIS.find((p) => p.id === active);
  const completedCount = Object.keys(results).length;

  return (
    <div className="game-root">
      <style>{`
        .game-root {
          position: fixed; inset: 0;
          width: 100vw; height: 100dvh;
          background: #2d1605;
          font-family: var(--font-body), sans-serif;
          color: #fff;
          overflow: hidden;
        }
        .stage {
          position: absolute; inset: 0;
          display: grid; place-items: center;
        }
        .plaat {
          position: relative;
          width: min(100vw, 100dvh * var(--r));
          height: min(100dvh, 100vw / var(--r));
          opacity: 0;
          animation: plaatIn 0.6s 0.05s cubic-bezier(0.34,1.4,0.64,1) forwards;
        }
        .plaat.idle { animation: none; opacity: 1; }
        @keyframes plaatIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .plaat img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }
        .plaat-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.5) 100%);
          pointer-events: none;
        }
        .hud {
          position: absolute; top: 22px; left: 22px; right: 22px;
          display: flex; justify-content: space-between; align-items: center;
          gap: 12px;
          z-index: 50; pointer-events: none;
        }
        .hud > * { pointer-events: auto; }
        .hud-btn {
          background: #fff; color: #2d1605;
          width: 64px; height: 64px; border-radius: 50%;
          display: grid; place-items: center;
          box-shadow: 0 6px 0 rgba(45,22,5,0.3), 0 14px 30px rgba(0,0,0,0.35);
          transition: transform 0.12s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hud-btn:hover { transform: translateY(-2px); }
        .hud-btn:active { transform: translateY(3px) scale(0.94); box-shadow: 0 3px 0 rgba(45,22,5,0.3), 0 8px 18px rgba(0,0,0,0.35); }
        .hud-right { display: flex; align-items: center; gap: 12px; }
        .hud-pill {
          display: flex; align-items: center; gap: 12px;
          background: #fff; color: #2d1605;
          padding: 14px 22px; border-radius: 999px;
          font-family: var(--font-display); font-weight: 700;
          font-size: 1.3rem;
          box-shadow: 0 6px 0 rgba(45,22,5,0.3), 0 14px 30px rgba(0,0,0,0.35);
          transition: transform 0.2s ease;
        }
        .hud-pill.bump { animation: scoreBump 0.45s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes scoreBump { 0% { transform: scale(1); } 50% { transform: scale(1.12); } 100% { transform: scale(1); } }
        .hud-pill .sep { opacity: 0.25; font-weight: 400; }
        .hud-pill .star-i { color: #ffb703; }
        .streak-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg,#fb8500,#e63946);
          color: #fff;
          padding: 12px 18px; border-radius: 999px;
          font-family: var(--font-display); font-weight: 700;
          font-size: 1.05rem;
          box-shadow: 0 6px 0 rgba(45,22,5,0.3), 0 14px 30px rgba(0,0,0,0.35);
          animation: streakIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes streakIn { from { transform: scale(0) rotate(-12deg); } to { transform: scale(1) rotate(0); } }
        .poi {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 92px; height: 92px;
          border-radius: 50%;
          background: var(--c);
          border: 6px solid #fff;
          display: grid; place-items: center;
          font-size: 2.8rem;
          color: #fff;
          z-index: 30;
          box-shadow: 0 8px 0 rgba(0,0,0,0.32), 0 18px 36px rgba(0,0,0,0.5);
          transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1);
          animation: poiPulse 2.2s ease-in-out infinite;
        }
        .poi:hover { transform: translate(-50%, -50%) scale(1.08); }
        .poi:active { transform: translate(-50%, -50%) scale(0.92); }
        .poi.done { animation: none; opacity: 0.92; }
        .poi.done-3 { background: #06d6a0; }
        .poi.done-2 { background: #ffb703; }
        .poi.done-1 { background: #fb8500; }
        .poi-stars {
          position: absolute;
          top: -10px; right: -12px;
          background: #fff;
          border-radius: 999px;
          padding: 4px 8px;
          display: flex; gap: 2px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.3);
        }
        .poi-stars svg { color: #ffb703; }
        @keyframes poiPulse {
          0%, 100% { box-shadow: 0 8px 0 rgba(0,0,0,0.32), 0 18px 36px rgba(0,0,0,0.5), 0 0 0 0 var(--c); }
          50%      { box-shadow: 0 8px 0 rgba(0,0,0,0.32), 0 18px 36px rgba(0,0,0,0.5), 0 0 0 22px transparent; }
        }
        .pop {
          position: fixed; left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(2.4rem, 6vw, 4rem);
          color: var(--pc);
          text-shadow: 0 4px 0 rgba(0,0,0,0.25), 0 8px 30px rgba(0,0,0,0.6);
          z-index: 200; pointer-events: none;
          animation: popFloat 1.5s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes popFloat {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
          15%  { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
          30%  { transform: translate(-50%, -55%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -130%) scale(0.85); }
        }
        @media (max-width: 700px) {
          .poi { width: 68px; height: 68px; font-size: 2.1rem; border-width: 4px; }
          .poi-stars { padding: 2px 6px; }
          .hud { top: 14px; left: 14px; right: 14px; }
          .hud-btn { width: 52px; height: 52px; }
          .hud-pill { padding: 10px 16px; font-size: 1.05rem; gap: 8px; }
          .streak-pill { padding: 9px 14px; font-size: 0.92rem; }
        }
      `}</style>

      <div className="stage">
        <div className={`plaat ${!imgReady ? "idle" : ""}`} style={{ "--r": imgRatio }}>
          <img src="/Picture1.png" alt="" draggable={false} />
          <div className="plaat-vignette" />

          {POIS.map((p) => {
            const res = results[p.id];
            const stars = res?.stars || 0;
            return (
              <button
                key={p.id}
                className={`poi ${res ? `done done-${stars}` : ""}`}
                style={{ left: `${p.x}%`, top: `${p.y}%`, "--c": p.color }}
                onClick={() => setActive(p.id)}
                aria-label={p.label}
              >
                <span>{p.emoji}</span>
                {res && (
                  <span className="poi-stars">
                    {Array.from({ length: stars }, (_, i) => (
                      <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                    ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="hud">
        <button className="hud-btn" onClick={onBack} aria-label="Terug naar overzicht">
          <Home size={28} />
        </button>
        <div className="hud-right">
          {streak >= 2 && (
            <div className="streak-pill" key={streak}>
              <Flame size={18} fill="currentColor" /> Streak {streak}
            </div>
          )}
          <div className={`hud-pill ${displayScore !== score ? "bump" : ""}`}>
            <Star size={24} fill="currentColor" className="star-i" />
            <span>{displayScore}</span>
            <span className="sep">|</span>
            <span>{completedCount}/{POIS.length}</span>
          </div>
        </div>
      </div>

      {activePoi && (
        <GameOverlay
          key={activePoi.id}
          poi={activePoi}
          onDone={finishGame}
          onClose={() => setActive(null)}
        />
      )}

      {pops.map((p) => (
        <div key={p.id} className="pop" style={{ "--pc": p.color }}>{p.text}</div>
      ))}

      {confettiKey > 0 && <Confetti key={confettiKey} />}

      {end && <EndScreen score={score} results={results} pois={POIS} onReset={resetAll} onBack={onBack} />}
    </div>
  );
}

// ─── GAME OVERLAY ─────────────────────────────────────────────────────────────
function GameOverlay({ poi, onDone, onClose }) {
  const [stamp, setStamp] = useState(null); // "great" | "good" | "miss"

  const handleResult = ({ stars }) => {
    setStamp(stars === 3 ? "great" : stars >= 2 ? "good" : "miss");
    onDone({ stars });
  };

  return (
    <div className="overlay">
      <style>{`
        .overlay {
          position: fixed; inset: 0; z-index: 100;
          background: linear-gradient(160deg, rgba(45,22,5,0.96), rgba(120,53,15,0.96));
          backdrop-filter: blur(10px);
          display: flex; flex-direction: column;
          animation: overlayIn 0.32s cubic-bezier(0.34,1.4,0.64,1);
          padding: 24px 20px 28px;
          color: #fff;
        }
        @keyframes overlayIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
        .ov-close {
          position: absolute; top: 20px; right: 20px; z-index: 5;
          background: #fff; color: #2d1605;
          width: 64px; height: 64px; border-radius: 50%;
          display: grid; place-items: center;
          box-shadow: 0 6px 0 rgba(0,0,0,0.3), 0 14px 28px rgba(0,0,0,0.4);
          transition: transform 0.12s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ov-close:hover { transform: scale(1.06) rotate(8deg); }
        .ov-close:active { transform: scale(0.9); }
        .ov-head { text-align: center; padding: 28px 20px 22px; }
        .ov-emoji {
          font-size: clamp(4rem, 9vw, 6.5rem);
          margin-bottom: 6px;
          filter: drop-shadow(0 4px 14px rgba(0,0,0,0.5));
          animation: emBob 2.2s ease-in-out infinite;
        }
        @keyframes emBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .ov-title {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 4vw, 2.6rem);
          font-weight: 700; margin: 0;
        }
        .ov-q {
          font-family: var(--font-display);
          font-size: clamp(1.1rem, 2.6vw, 1.6rem);
          font-weight: 700; margin: 10px 0 0;
          color: #ffd089;
        }
        .ov-body { flex: 1; display: grid; place-items: center; padding: 16px 0; }
        .ov-stamp {
          position: fixed; top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0);
          background: var(--stamp-c);
          color: #fff;
          padding: 22px 40px; border-radius: 28px;
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5.5vw, 4rem);
          font-weight: 700;
          box-shadow: 0 12px 0 rgba(0,0,0,0.3), 0 28px 70px rgba(0,0,0,0.55);
          animation: stampIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards;
          z-index: 200; pointer-events: none;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
        }
        .ov-stamp-stars { display: flex; gap: 4px; font-size: 1.4rem; }
        @keyframes stampIn { 0% { transform: translate(-50%, -50%) scale(0) rotate(-20deg); } 60% { transform: translate(-50%, -50%) scale(1.15) rotate(-4deg); } 100% { transform: translate(-50%, -50%) scale(1) rotate(-6deg); } }
      `}</style>

      <button className="ov-close" onClick={onClose} aria-label="Sluiten">
        <X size={32} strokeWidth={3} />
      </button>

      <div className="ov-head">
        <div className="ov-emoji">{poi.emoji}</div>
        <h2 className="ov-title">{poi.label}</h2>
        {poi.game.q && <p className="ov-q">{poi.game.q}</p>}
        {poi.game.title && <p className="ov-q">{poi.game.title}</p>}
      </div>

      <div className="ov-body">
        {poi.game.type === "quiz"  && <Quiz  game={poi.game} onDone={handleResult} />}
        {poi.game.type === "order" && <Order game={poi.game} onDone={handleResult} />}
        {poi.game.type === "match" && <Match game={poi.game} onDone={handleResult} />}
      </div>

      {stamp && (
        <div className="ov-stamp" style={{
          "--stamp-c": stamp === "great" ? "#06d6a0" : stamp === "good" ? "#ffb703" : "#e63946",
        }}>
          <span>{stamp === "great" ? "Top!" : stamp === "good" ? "Goed!" : "Bijna!"}</span>
          <div className="ov-stamp-stars">
            {Array.from({ length: stamp === "great" ? 3 : stamp === "good" ? 2 : 1 }, (_, i) => (
              <Star key={i} size={28} fill="currentColor" strokeWidth={0} style={{ animationDelay: `${i * 0.1}s`, animation: "stampStarIn 0.4s cubic-bezier(0.34,1.56,0.64,1) backwards" }} />
            ))}
          </div>
          <style>{`@keyframes stampStarIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
        </div>
      )}
    </div>
  );
}

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
function Quiz({ game, onDone }) {
  const [picked, setPicked] = useState(null);
  const [shuffled] = useState(() => [...game.opts].sort(() => Math.random() - 0.5));
  function pick(i) {
    if (picked !== null) return;
    setPicked(i);
    const correct = shuffled[i].correct;
    setTimeout(() => onDone({ stars: correct ? 3 : 1 }), 850);
  }
  return (
    <div className="opt-grid">
      <style>{`
        .opt-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 240px));
          gap: 22px;
          width: 100%; max-width: 580px;
          justify-content: center;
        }
        @media (max-width: 500px) {
          .opt-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
        }
        .opt {
          aspect-ratio: 1;
          border-radius: 28px;
          background: #fff; color: #2d1605;
          border: 6px solid #fff;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px;
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(0.95rem, 2vw, 1.3rem);
          box-shadow: 0 10px 0 rgba(0,0,0,0.25), 0 22px 40px rgba(0,0,0,0.32);
          transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, border-color 0.2s;
        }
        .opt:hover { transform: translateY(-3px); }
        .opt:active { transform: translateY(5px) scale(0.96); box-shadow: 0 4px 0 rgba(0,0,0,0.25), 0 12px 24px rgba(0,0,0,0.3); }
        .opt-e {
          font-size: clamp(2.6rem, 6vw, 4.4rem);
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.22));
        }
        .opt.correct { background: #06d6a0; color: #fff; border-color: #06d6a0; animation: optBounce 0.5s cubic-bezier(0.34,1.56,0.64,1); }
        .opt.wrong   { background: #e63946; color: #fff; border-color: #e63946; animation: optShake 0.45s ease; }
        .opt.reveal  { background: #06d6a0; color: #fff; border-color: #06d6a0; }
        .opt.fade    { opacity: 0.35; transform: scale(0.94); }
        @keyframes optBounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.13); } }
        @keyframes optShake  { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-14px); } 75% { transform: translateX(14px); } }
      `}</style>
      {shuffled.map((opt, i) => {
        let cls = "";
        if (picked !== null) {
          if (picked === i) cls = opt.correct ? "correct" : "wrong";
          else if (!shuffled[picked].correct && opt.correct) cls = "reveal";
          else cls = "fade";
        }
        return (
          <button key={i} className={`opt ${cls}`} onClick={() => pick(i)}>
            <div className="opt-e">{opt.e}</div>
            <div>{opt.label}</div>
          </button>
        );
      })}
    </div>
  );
}

// ─── ORDER ────────────────────────────────────────────────────────────────────
function Order({ game, onDone }) {
  const [shuffled] = useState(() => [...game.items].sort(() => Math.random() - 0.5));
  const [placed, setPlaced] = useState([]);
  const [done, setDone] = useState(false);
  const remaining = shuffled.filter((s) => !placed.find((p) => p.label === s.label));

  function place(s) {
    const next = [...placed, s];
    setPlaced(next);
    if (next.length === game.items.length) {
      setDone(true);
      const okCount = next.filter((x, i) => x.order === i + 1).length;
      const stars = okCount === next.length ? 3 : okCount >= next.length - 1 ? 2 : 1;
      setTimeout(() => onDone({ stars }), 1200);
    }
  }

  function undo() {
    if (done || placed.length === 0) return;
    setPlaced(placed.slice(0, -1));
  }

  return (
    <div className="order">
      <style>{`
        .order {
          display: flex; flex-direction: column; gap: 18px;
          width: 100%; max-width: 920px; align-items: center;
        }
        .slots {
          display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
          min-height: 130px;
        }
        .slot, .pick {
          border-radius: 22px;
          padding: 12px 14px;
          min-width: 110px;
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          font-family: var(--font-display); font-weight: 700;
          border: 5px solid #fff;
          background: #fff; color: #2d1605;
          box-shadow: 0 8px 0 rgba(0,0,0,0.25);
          font-size: 0.95rem;
        }
        .slot-e { font-size: 2.2rem; }
        .slot-i {
          font-size: 0.75rem;
          background: rgba(45,22,5,0.12);
          padding: 2px 8px; border-radius: 999px;
          font-weight: 700;
        }
        .slot.ok  { background: #06d6a0; color: #fff; border-color: #06d6a0; animation: slotIn 0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .slot.bad { background: #e63946; color: #fff; border-color: #e63946; animation: slotShake 0.4s ease; }
        .slot.ok .slot-i, .slot.bad .slot-i { background: rgba(255,255,255,0.3); color: #fff; }
        @keyframes slotIn { 0% { transform: scale(0.85); } 50% { transform: scale(1.06); } 100% { transform: scale(1); } }
        @keyframes slotShake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
        .picks { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
        .pick {
          background: #ffb703; color: #2d1605; border-color: #ffb703;
          transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1);
          animation: pickIn 0.3s cubic-bezier(0.34,1.56,0.64,1) backwards;
        }
        .pick:hover { transform: translateY(-3px); }
        .pick:active { transform: translateY(5px) scale(0.95); box-shadow: 0 3px 0 rgba(0,0,0,0.25); }
        @keyframes pickIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        .order-hint {
          color: rgba(255,255,255,0.7);
          font-family: var(--font-display); font-weight: 700;
          font-size: 0.95rem;
        }
        .undo-btn {
          background: rgba(255,255,255,0.15);
          color: #fff;
          padding: 8px 16px; border-radius: 999px;
          font-family: var(--font-display); font-weight: 700;
          display: inline-flex; align-items: center; gap: 6px;
          border: 2px solid rgba(255,255,255,0.3);
          transition: all 0.15s ease;
        }
        .undo-btn:hover { background: rgba(255,255,255,0.25); }
        .undo-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      {!done && (
        <div className="order-hint">
          {placed.length === 0 ? "Tik in volgorde" : `Volgende: ${placed.length + 1} van ${game.items.length}`}
        </div>
      )}

      <div className="slots">
        {placed.map((s, i) => {
          const ok = done && s.order === i + 1;
          const bad = done && s.order !== i + 1;
          return (
            <div key={s.label} className={`slot ${ok ? "ok" : ""} ${bad ? "bad" : ""}`}>
              <div className="slot-e">{s.e}</div>
              <div>{s.label}</div>
              <div className="slot-i">{i + 1}</div>
            </div>
          );
        })}
      </div>

      {!done && (
        <>
          <div className="picks">
            {remaining.map((s, i) => (
              <button
                key={s.label}
                className="pick"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => place(s)}
              >
                <div className="slot-e">{s.e}</div>
                <div>{s.label}</div>
              </button>
            ))}
          </div>
          {placed.length > 0 && (
            <button className="undo-btn" onClick={undo}>
              <RotateCcw size={14} /> Wis laatste
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ─── MATCH ────────────────────────────────────────────────────────────────────
function Match({ game, onDone }) {
  const [bShuffled] = useState(() =>
    game.pairs.map((p, i) => ({ ...p.b, i })).sort(() => Math.random() - 0.5)
  );
  const [pickA, setPickA] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [wrongB, setWrongB] = useState(null);
  const [mistakes, setMistakes] = useState(0);

  function tapB(b) {
    if (pickA === null || matched.has(b.i)) return;
    if (pickA === b.i) {
      const next = new Set([...matched, b.i]);
      setMatched(next);
      setPickA(null);
      if (next.size === game.pairs.length) {
        const stars = mistakes === 0 ? 3 : mistakes <= 1 ? 2 : 1;
        setTimeout(() => onDone({ stars }), 800);
      }
    } else {
      setWrongB(b.i);
      setMistakes((m) => m + 1);
      setTimeout(() => { setWrongB(null); setPickA(null); }, 600);
    }
  }

  return (
    <div className="match">
      <style>{`
        .match {
          display: flex; gap: 28px;
          justify-content: center; flex-wrap: wrap;
          width: 100%; max-width: 720px;
        }
        .col { display: flex; flex-direction: column; gap: 12px; }
        .mbtn {
          background: #fff; color: #2d1605;
          border: 5px solid #fff;
          border-radius: 20px;
          padding: 12px 16px;
          min-width: 200px;
          display: flex; align-items: center; gap: 12px;
          font-family: var(--font-display); font-weight: 700;
          font-size: 1rem;
          box-shadow: 0 8px 0 rgba(0,0,0,0.25);
          transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1), background 0.2s, border-color 0.2s;
          animation: mbtnIn 0.35s cubic-bezier(0.34,1.56,0.64,1) backwards;
        }
        @keyframes mbtnIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .mbtn:hover { transform: translateY(-2px); }
        .mbtn:active { transform: translateY(4px); box-shadow: 0 3px 0 rgba(0,0,0,0.25); }
        .mbtn .me { font-size: 2rem; flex-shrink: 0; }
        .mbtn.sel  { background: #ffb703; color: #2d1605; border-color: #ffb703; animation: mbtnPick 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .mbtn.ok   { background: #06d6a0; color: #fff; border-color: #06d6a0; animation: mbtnOk 0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .mbtn.bad  { background: #e63946; color: #fff; border-color: #e63946; animation: matchShake 0.4s ease; }
        .mbtn:disabled { cursor: default; }
        @keyframes mbtnPick { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes mbtnOk   { 0% { transform: scale(0.85); } 60% { transform: scale(1.1); } 100% { transform: scale(1); } }
        @keyframes matchShake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
      `}</style>

      <div className="col">
        {game.pairs.map((p, i) => {
          const isMatched = matched.has(i);
          const isSel = pickA === i;
          return (
            <button
              key={i}
              className={`mbtn ${isMatched ? "ok" : isSel ? "sel" : ""}`}
              style={{ animationDelay: `${i * 0.05}s` }}
              disabled={isMatched}
              onClick={() => !isMatched && setPickA(i)}
            >
              <span className="me">{p.a.e}</span>
              <span>{p.a.label}</span>
            </button>
          );
        })}
      </div>

      <div className="col">
        {bShuffled.map((b, idx) => {
          const isMatched = matched.has(b.i);
          const isWrong = wrongB === b.i;
          return (
            <button
              key={b.i}
              className={`mbtn ${isMatched ? "ok" : isWrong ? "bad" : ""}`}
              style={{ animationDelay: `${idx * 0.05}s` }}
              disabled={isMatched}
              onClick={() => tapB(b)}
            >
              <span className="me">{b.e}</span>
              <span>{b.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── CONFETTI ─────────────────────────────────────────────────────────────────
function Confetti() {
  const [bits] = useState(() => {
    const palette = ["#ffb703", "#fb8500", "#06d6a0", "#e63946", "#7c3aed", "#ffd089", "#4cc9f0"];
    return Array.from({ length: 90 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 1.4 + Math.random() * 1.6,
      color: palette[Math.floor(Math.random() * palette.length)],
      rotation: Math.random() * 360,
      size: 8 + Math.random() * 10,
      drift: (Math.random() - 0.5) * 200,
    }));
  });
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}>
      <style>{`
        @keyframes confettiDrop {
          0%   { transform: translate(0, -10vh) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--dx, 0), 110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {bits.map((b) => (
        <span key={b.id} style={{
          position: "absolute", top: 0, left: `${b.left}%`,
          width: b.size, height: b.size * 0.55,
          background: b.color, borderRadius: 2,
          "--dx": `${b.drift}px`,
          transform: `rotate(${b.rotation}deg)`,
          animation: `confettiDrop ${b.duration}s ${b.delay}s ease-in forwards`,
        }} />
      ))}
    </div>
  );
}

// ─── END SCREEN ───────────────────────────────────────────────────────────────
function EndScreen({ score, results, pois, onReset, onBack }) {
  const [name, setName] = useState(() => {
    if (typeof window === "undefined") return "";
    try { return localStorage.getItem(NAME_KEY) || ""; } catch { return ""; }
  });
  const [saved, setSaved] = useState(false);
  const [reveal, setReveal] = useState(0);

  // Reveal stars one row at a time
  useEffect(() => {
    if (reveal >= pois.length) return;
    const t = setTimeout(() => setReveal((r) => r + 1), 220);
    return () => clearTimeout(t);
  }, [reveal, pois.length]);

  const totalStars = pois.reduce((sum, p) => sum + (results[p.id]?.stars || 0), 0);
  const maxStars = pois.length * 3;
  const ratingStars = totalStars >= maxStars * 0.9 ? 3 : totalStars >= maxStars * 0.6 ? 2 : 1;

  function save() {
    if (saved) return;
    const finalName = (name.trim().slice(0, 18) || "Anoniem");
    try {
      const board = JSON.parse(localStorage.getItem(BOARD_KEY) || "[]");
      board.push({ name: finalName, score, totalStars, at: Date.now() });
      localStorage.setItem(BOARD_KEY, JSON.stringify(board.sort((a, b) => b.score - a.score).slice(0, 50)));
      localStorage.setItem(NAME_KEY, finalName);
    } catch {}
    setSaved(true);
  }

  return (
    <div className="end">
      <style>{`
        .end {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(45,22,5,0.96);
          backdrop-filter: blur(12px);
          display: grid; place-items: center;
          padding: 20px;
          animation: endIn 0.5s cubic-bezier(0.34,1.4,0.64,1);
          overflow-y: auto;
        }
        @keyframes endIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        .end-card {
          background: #fff; color: #2d1605;
          border-radius: 36px;
          padding: 32px 28px;
          width: 100%; max-width: 520px;
          text-align: center;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }
        .end-trophy {
          font-size: 5rem;
          animation: endBob 1.6s ease-in-out infinite;
          margin-bottom: 4px;
        }
        @keyframes endBob { 0%,100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-12px) rotate(4deg); } }
        .end-title {
          font-family: var(--font-display);
          font-size: 2.4rem; font-weight: 700;
          margin: 0;
        }
        .end-rating {
          display: flex; justify-content: center; gap: 6px;
          margin: 10px 0 16px;
        }
        .end-rating svg { color: #ffb703; }
        .end-score {
          font-family: var(--font-display);
          font-size: 1.4rem; font-weight: 700;
          color: #6b3410; margin: 0 0 18px;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .end-grid {
          display: grid; grid-template-columns: repeat(5, 1fr);
          gap: 8px; margin-bottom: 22px;
        }
        .end-tile {
          aspect-ratio: 1; border-radius: 14px;
          background: #fff5e0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 2px; padding: 6px 4px;
          font-size: 1.5rem;
          border: 3px solid #fff5e0;
          transition: all 0.3s ease;
          opacity: 0; transform: scale(0.85);
        }
        .end-tile.show { opacity: 1; transform: scale(1); }
        .end-tile.s1 { background: #ffe8d6; border-color: #fb8500; }
        .end-tile.s2 { background: #fff1c2; border-color: #ffb703; }
        .end-tile.s3 { background: #b8f5dc; border-color: #06d6a0; }
        .end-tile-stars { display: flex; gap: 1px; }
        .end-tile-stars svg { color: #ffb703; }
        .end-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 16px;
          border: 4px solid #ffb703;
          font-size: 1.15rem;
          font-family: var(--font-body); font-weight: 700;
          color: #2d1605; text-align: center;
          margin-bottom: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .end-input:focus { border-color: #fb8500; }
        .end-btns { display: flex; flex-direction: column; gap: 10px; }
        .end-btn {
          padding: 16px 22px;
          border-radius: 18px;
          font-size: 1.15rem;
          font-family: var(--font-display); font-weight: 700;
          color: #fff;
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          box-shadow: 0 6px 0 rgba(0,0,0,0.22);
          transition: transform 0.12s cubic-bezier(0.34,1.56,0.64,1);
        }
        .end-btn:hover { transform: translateY(-2px); }
        .end-btn:active { transform: translateY(4px); box-shadow: 0 2px 0 rgba(0,0,0,0.22); }
        .saved-msg {
          background: #06d6a0; color: #fff;
          padding: 10px 16px; border-radius: 12px;
          font-family: var(--font-display); font-weight: 700;
          margin-bottom: 12px;
        }
      `}</style>

      <div className="end-card">
        <div className="end-trophy">🏆</div>
        <h2 className="end-title">Klaar!</h2>
        <div className="end-rating">
          {Array.from({ length: 3 }, (_, i) => (
            <Star key={i} size={32} fill={i < ratingStars ? "currentColor" : "none"} strokeWidth={i < ratingStars ? 0 : 2.5} />
          ))}
        </div>
        <p className="end-score">
          <Trophy size={22} fill="currentColor" color="#ffb703" />
          {score} punten · {totalStars}/{maxStars} sterren
        </p>

        <div className="end-grid">
          {pois.map((p, i) => {
            const r = results[p.id];
            const stars = r?.stars || 0;
            return (
              <div key={p.id} className={`end-tile ${i < reveal ? "show" : ""} s${stars}`}>
                <div>{p.emoji}</div>
                <div className="end-tile-stars">
                  {Array.from({ length: stars }, (_, j) => (
                    <Star key={j} size={10} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {saved && <div className="saved-msg">Opgeslagen! 🎉</div>}

        {!saved && (
          <input
            className="end-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={18}
            placeholder="Jouw naam"
          />
        )}

        <div className="end-btns">
          {!saved && (
            <button className="end-btn" style={{ background: "#06d6a0" }} onClick={save}>
              <Star size={22} fill="currentColor" /> Opslaan
            </button>
          )}
          <button className="end-btn" style={{ background: "#e63946" }} onClick={onBack}>
            <Home size={22} /> Overzicht
          </button>
          <button className="end-btn" style={{ background: "#7c3aed" }} onClick={onReset}>
            <RotateCcw size={22} /> Opnieuw
          </button>
        </div>
      </div>
    </div>
  );
}
