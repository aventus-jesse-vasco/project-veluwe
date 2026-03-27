"use client";

import { useState } from "react";
import {
  Mountain,
  Flame,
  Shirt,
  Gem,
  CookingPot,
  Wine,
  Swords,
  Trees,
  Dog,
  Leaf,
  Map,
  ChevronLeft,
  CheckCircle,
  Lightbulb,
  BarChart3,
  Pencil,
} from "lucide-react";

const ICONS = {
  1: Mountain,
  2: Flame,
  3: Shirt,
  4: Gem,
  5: CookingPot,
  6: Wine,
  7: Swords,
  8: Trees,
  9: Dog,
  10: Leaf,
};

const HOTSPOTS = [
  { id: 1,  label: "Geheimen onder de grond",   x: 62, y: 40, color: "#7B4F2E", original: "De grafheuvel" },
  { id: 2,  label: "Vuur voor de voorouders",   x: 54, y: 66, color: "#C0392B", original: "Grafrituelen" },
  { id: 3,  label: "Wat droegen ze?",           x: 22, y: 50, color: "#8E44AD", original: "Kleding" },
  { id: 4,  label: "Glimmende schatten",        x: 14, y: 36, color: "#F9A825", original: "Sieraden" },
  { id: 5,  label: "Koken met stenen",          x: 38, y: 46, color: "#E64A19", original: "Stoomkuilen" },
  { id: 6,  label: "De mooiste beker",          x: 22, y: 20, color: "#6A1B9A", original: "De Veluwse klokbeker" },
  { id: 7,  label: "Een bijzonder zwaard",      x: 8,  y: 60, color: "#37474F", original: "Het zwaard van Bergsham" },
  { id: 8,  label: "Bos, heide en akkers",      x: 50, y: 16, color: "#388E3C", original: "Het landschap" },
  { id: 9,  label: "Trouwe vrienden",           x: 88, y: 72, color: "#00695C", original: "De dieren" },
  { id: 10, label: "Afscheid nemen",            x: 78, y: 38, color: "#546E7A", original: "Omgaan met de dood" },
];

export default function InteractiveSchoolplaat() {
  const [active, setActive] = useState(null);
  const [variant, setVariant] = useState("a");
  const selected = HOTSPOTS.find((h) => h.id === active);

  return (
    <div className="schoolplaat-container">
      <style>{`
        .schoolplaat-container {
          min-height: 100vh;
          background: linear-gradient(160deg, #2c1a0e 0%, #3d2510 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px 16px 40px;
          font-family: 'Nunito', 'Segoe UI', sans-serif;
        }
        
        .header {
          text-align: center;
          margin-bottom: 24px;
          max-width: 700px;
        }
        
        .header-subtitle {
          color: #c8a97a;
          font-size: 0.78rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        
        .header h1 {
          color: #f5d9a8;
          font-size: clamp(1.3rem, 3.5vw, 1.9rem);
          margin: 0 0 8px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .header p {
          color: #a0856a;
          font-size: 0.88rem;
          margin: 0;
        }
        
        .variant-toggle {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        
        .variant-btn {
          background: rgba(255,255,255,0.1);
          border: 2px solid #6b4226;
          color: #c8a97a;
          padding: 10px 20px;
          border-radius: 30px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .variant-btn:hover {
          background: rgba(255,255,255,0.15);
        }
        
        .variant-btn.active {
          background: #e67e22;
          border-color: #e67e22;
          color: white;
        }
        
        .main-layout {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          width: 100%;
          max-width: 1120px;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .schoolplaat-frame {
          position: relative;
          flex: 1 1 520px;
          max-width: 700px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.8);
          border: 3px solid #6b4226;
        }
        
        .schoolplaat-frame.with-border {
          padding: 50px;
          background: #5a3d2b;
          overflow: visible;
        }
        
        .schoolplaat-frame.with-border img {
          border-radius: 8px;
        }
        
        .schoolplaat-img {
          display: block;
          width: 100%;
          height: auto;
        }
        
        .poi {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff9500, #ff6b00);
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transform: translate(-50%, -50%);
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 10;
          animation: pulse 2s infinite;
        }
        
        .poi:hover {
          transform: translate(-50%, -50%) scale(1.2);
          box-shadow: 0 6px 25px rgba(0,0,0,0.5), 0 0 0 8px rgba(255,149,0,0.3);
          animation: none;
        }
        
        .poi.active {
          background: var(--poi-color);
          transform: translate(-50%, -50%) scale(1.15);
          animation: none;
        }
        
        .poi svg {
          color: white;
          width: 20px;
          height: 20px;
        }
        
        .poi .tooltip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(5px);
          background: rgba(0,0,0,0.9);
          color: white;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.85rem;
          white-space: nowrap;
          opacity: 0;
          transition: all 0.2s ease;
          pointer-events: none;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .poi .tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 6px solid transparent;
          border-top-color: rgba(0,0,0,0.9);
        }
        
        .poi:hover .tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        
        .poi .tooltip svg {
          width: 16px;
          height: 16px;
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 4px 15px rgba(0,0,0,0.4), 0 0 0 0 rgba(255,149,0,0.5); }
          50% { box-shadow: 0 4px 15px rgba(0,0,0,0.4), 0 0 0 8px rgba(255,149,0,0); }
        }
        
        .target-dot {
          position: absolute;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #e67e22;
          border: 2px solid white;
          transform: translate(-50%, -50%);
          z-index: 6;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          pointer-events: none;
        }
        
        .border-poi {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(60, 40, 25, 0.95);
          padding: 8px 14px 8px 10px;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 20;
          border: 2px solid #6b4226;
        }
        
        .border-poi:hover {
          background: #e67e22;
          border-color: #e67e22;
          transform: scale(1.05);
        }
        
        .border-poi .icon-wrap {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff9500, #ff6b00);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .border-poi .icon-wrap svg {
          width: 16px;
          height: 16px;
          color: white;
        }
        
        .border-poi .label {
          font-size: 0.78rem;
          color: #f5d9a8;
          white-space: nowrap;
        }
        
        @media (max-width: 700px) {
          .border-poi .label {
            display: none;
          }
          .schoolplaat-frame.with-border {
            padding: 35px 8px;
          }
        }
        
        .info-panel {
          flex: 1 1 280px;
          max-width: 360px;
        }
        
        .info-card {
          background: rgba(15, 8, 3, 0.88);
          border-radius: 12px;
          padding: 28px 24px;
          color: #f0e0c0;
          box-shadow: 0 6px 28px rgba(0,0,0,0.6);
          animation: fadeSlide 0.22s ease;
          text-align: center;
        }
        
        .info-card .icon-large {
          width: 48px;
          height: 48px;
          margin: 0 auto 12px;
        }
        
        .info-card .subtitle {
          color: #a0856a;
          font-size: 0.7rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        
        .info-card h2 {
          margin: 0 0 16px;
          font-size: 1.15rem;
          color: #f5d9a8;
        }
        
        .info-card .divider {
          height: 2px;
          margin-bottom: 18px;
          border-radius: 2px;
          opacity: 0.6;
        }
        
        .info-card .content-placeholder {
          background: rgba(255,255,255,0.04);
          border: 1px dashed #6b4226;
          border-radius: 8px;
          padding: 16px;
          color: #a0856a;
          font-size: 0.85rem;
          line-height: 1.6;
        }
        
        .back-btn {
          margin-top: 16px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: #a0856a;
          border-radius: 6px;
          padding: 5px 16px;
          cursor: pointer;
          font-size: 0.82rem;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        
        .back-btn:hover {
          background: rgba(255,255,255,0.05);
        }
        
        .empty-state {
          background: rgba(15,8,3,0.6);
          border: 2px dashed #6b4226;
          border-radius: 12px;
          padding: 20px 18px;
          color: #a0856a;
          text-align: center;
        }
        
        .empty-state .icon-large {
          width: 40px;
          height: 40px;
          margin: 0 auto 8px;
          color: #c8a97a;
        }
        
        .empty-state p {
          margin: 0 0 16px;
          font-size: 0.88rem;
          line-height: 1.6;
        }
        
        .hotspot-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
          text-align: left;
        }
        
        .hotspot-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: #ddc99a;
          border-radius: 6px;
          padding: 7px 12px;
          font-size: 0.82rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }
        
        .hotspot-btn:hover {
          background: rgba(255,255,255,0.08);
          transform: translateX(4px);
        }
        
        .hotspot-btn svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }
        
        .hotspot-btn .id {
          color: #6b4226;
          font-size: 0.72rem;
        }
        
        .comparison-section {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 2px dashed #6b4226;
          width: 100%;
          max-width: 900px;
        }
        
        .comparison-section h2 {
          text-align: center;
          color: #f5d9a8;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        @media (max-width: 700px) {
          .pros-cons {
            grid-template-columns: 1fr;
          }
        }
        
        .pros-cons > div {
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 20px;
        }
        
        .pros-cons h4 {
          margin: 0 0 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .pros-cons ul {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 0.88rem;
          color: #c8a97a;
        }
        
        .pros-cons li {
          padding: 7px 0 7px 22px;
          position: relative;
        }
        
        .pros-cons li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #e67e22;
          font-size: 1.2em;
        }
        
        .names-section {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 2px dashed #6b4226;
          width: 100%;
          max-width: 900px;
        }
        
        .names-section h2 {
          text-align: center;
          color: #f5d9a8;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .names-section .intro {
          text-align: center;
          color: #a0856a;
          margin-bottom: 25px;
          font-size: 0.9rem;
        }
        
        .names-table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(255,255,255,0.03);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .names-table th,
        .names-table td {
          padding: 14px 16px;
          text-align: left;
          border-bottom: 1px solid rgba(107, 66, 38, 0.3);
        }
        
        .names-table th {
          background: rgba(107, 66, 38, 0.3);
          color: #f5d9a8;
          font-weight: 500;
        }
        
        .names-table td {
          color: #c8a97a;
        }
        
        .names-table td:nth-child(2) {
          color: #e67e22;
        }
        
        .names-table td:nth-child(3) {
          color: #f5d9a8;
        }
        
        .names-table tr:hover {
          background: rgba(255,255,255,0.05);
        }
        
        .names-table svg {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
        
        .footer {
          color: #4a2e14;
          font-size: 0.74rem;
          margin-top: 28px;
          text-align: center;
        }
        
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="header">
        <div className="header-subtitle">
          Gemeente Apeldoorn · Cultuur &amp; Erfgoed · Vensters Veluws Verleden
        </div>
        <h1>
          <Map size={28} />
          De Eerste Boeren en hun Grafheuvelritueel
        </h1>
        <p>Klik op een stip om meer te ontdekken</p>
      </div>

      <div className="variant-toggle">
        <button
          className={`variant-btn ${variant === "a" ? "active" : ""}`}
          onClick={() => setVariant("a")}
        >
          Variant A: POI's op de plaat
        </button>
        <button
          className={`variant-btn ${variant === "b" ? "active" : ""}`}
          onClick={() => setVariant("b")}
        >
          Variant B: POI's in de rand
        </button>
      </div>

      <div className="main-layout">
        {variant === "a" ? (
          <VariantA active={active} setActive={setActive} />
        ) : (
          <VariantB active={active} setActive={setActive} />
        )}

        <div className="info-panel">
          {selected ? (
            <SelectedPanel selected={selected} setActive={setActive} />
          ) : (
            <EmptyState setActive={setActive} />
          )}
        </div>
      </div>

      <ComparisonSection />
      <NamesSection />

      <p className="footer">
        Vensters Veluws Verleden · Gemeente Apeldoorn – Vakgroep Cultuur &amp; Erfgoed · 2026<br />
        Contact: M. Parlevliet · J. Zuyderwyk
      </p>
    </div>
  );
}

function VariantA({ active, setActive }) {
  return (
    <div className="schoolplaat-frame">
      <img
        src="/Picture1.png"
        alt="Schoolplaat: De eerste boeren en hun grafheuvelritueel"
        className="schoolplaat-img"
        draggable={false}
      />
      {HOTSPOTS.map((h) => {
        const Icon = ICONS[h.id];
        const isActive = active === h.id;
        return (
          <button
            key={h.id}
            className={`poi ${isActive ? "active" : ""}`}
            style={{
              left: `${h.x}%`,
              top: `${h.y}%`,
              "--poi-color": h.color,
            }}
            onClick={() => setActive(isActive ? null : h.id)}
            aria-label={h.label}
          >
            <Icon />
            <span className="tooltip">
              <Icon size={16} />
              {h.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function VariantB({ active, setActive }) {
  const borderPositions = [
    { id: 6, pos: { left: "15%", top: "8px", transform: "translateX(-50%)" } },
    { id: 8, pos: { left: "45%", top: "8px", transform: "translateX(-50%)" } },
    { id: 10, pos: { left: "78%", top: "8px", transform: "translateX(-50%)" } },
    { id: 4, pos: { left: "8px", top: "30%", transform: "translateY(-50%)" } },
    { id: 3, pos: { left: "8px", top: "50%", transform: "translateY(-50%)" } },
    { id: 7, pos: { left: "8px", top: "72%", transform: "translateY(-50%)" } },
    { id: 1, pos: { right: "8px", top: "38%", transform: "translateY(-50%)" } },
    { id: 9, pos: { right: "8px", top: "65%", transform: "translateY(-50%)" } },
    { id: 5, pos: { left: "30%", bottom: "8px", transform: "translateX(-50%)" } },
    { id: 2, pos: { left: "60%", bottom: "8px", transform: "translateX(-50%)" } },
  ];

  return (
    <div className="schoolplaat-frame with-border">
      <img
        src="/Picture1.png"
        alt="Schoolplaat: De eerste boeren en hun grafheuvelritueel"
        className="schoolplaat-img"
        draggable={false}
      />
      
      {HOTSPOTS.map((h) => (
        <div
          key={h.id}
          className="target-dot"
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
        />
      ))}

      {borderPositions.map(({ id, pos }) => {
        const h = HOTSPOTS.find((spot) => spot.id === id);
        const Icon = ICONS[id];
        return (
          <button
            key={id}
            className="border-poi"
            style={pos}
            onClick={() => setActive(active === id ? null : id)}
          >
            <div className="icon-wrap">
              <Icon />
            </div>
            <span className="label">{h.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function SelectedPanel({ selected, setActive }) {
  const Icon = ICONS[selected.id];
  return (
    <div className="info-card" style={{ border: `2px solid ${selected.color}` }}>
      <Icon className="icon-large" style={{ color: selected.color }} />
      <div className="subtitle">Verhaallijn {selected.id} van 10</div>
      <h2>{selected.label}</h2>
      <div className="divider" style={{ background: selected.color }} />
      <div className="content-placeholder">
        Inhoud volgt in de volgende versie
      </div>
      <button className="back-btn" onClick={() => setActive(null)}>
        <ChevronLeft size={16} />
        Terug
      </button>
    </div>
  );
}

function EmptyState({ setActive }) {
  return (
    <div className="empty-state">
      <Map className="icon-large" />
      <p>
        Er zijn <strong style={{ color: "#f5d9a8" }}>10 verhaallijnen</strong> te ontdekken.
        Klik op een stip, of kies hieronder:
      </p>
      <div className="hotspot-list">
        {HOTSPOTS.map((h) => {
          const Icon = ICONS[h.id];
          return (
            <button
              key={h.id}
              className="hotspot-btn"
              style={{ borderLeft: `3px solid ${h.color}` }}
              onClick={() => setActive(h.id)}
            >
              <Icon style={{ color: h.color }} />
              <span style={{ flex: 1 }}>{h.label}</span>
              <span className="id">#{h.id}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ComparisonSection() {
  return (
    <div className="comparison-section">
      <h2>
        <BarChart3 size={24} />
        Vergelijking van beide varianten
      </h2>
      <div className="pros-cons">
        <div>
          <h4 style={{ color: "#27ae60" }}>
            <CheckCircle size={18} />
            Variant A (op de plaat)
          </h4>
          <ul>
            <li>Direct duidelijk waar je moet klikken</li>
            <li>Intuïtief voor kinderen: "klik op wat je ziet"</li>
            <li>Minder visuele complexiteit (geen lijntjes)</li>
            <li>Werkt goed op mobiel/tablet</li>
            <li>Snellere interactie</li>
            <li>Pulserende animatie trekt aandacht</li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: "#3498db" }}>
            <CheckCircle size={18} />
            Variant B (in de rand)
          </h4>
          <ul>
            <li>Schoolplaat blijft 'schoon' en onverstoord</li>
            <li>Alle POI-labels direct zichtbaar</li>
            <li>Meer ruimte voor langere titels</li>
            <li>Klassiekere, museale uitstraling</li>
            <li>Makkelijker om alle 10 onderwerpen te overzien</li>
            <li>Lijntjes tonen de connectie met de plaat</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function NamesSection() {
  return (
    <div className="names-section">
      <h2>
        <Pencil size={24} />
        Kindvriendelijke namen voor de POI's
      </h2>
      <p className="intro">Voorstel voor namen die nieuwsgierigheid opwekken bij kinderen van groep 7/8</p>
      
      <table className="names-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Icoon</th>
            <th>Nieuw voorstel</th>
            <th>Oorspronkelijk</th>
            <th>Waarom dit werkt</th>
          </tr>
        </thead>
        <tbody>
          {HOTSPOTS.map((h) => {
            const Icon = ICONS[h.id];
            const reasons = {
              1: "Wekt nieuwsgierigheid: wat ligt daar?",
              2: "Concreet beeld, mysterieus",
              3: "Vraagvorm nodigt uit tot ontdekken",
              4: "\"Schatten\" spreekt tot verbeelding",
              5: "Verrassend: hoe kan dat?",
              6: "Simpel, roept vraag op: waarom mooi?",
              7: "Zwaarden zijn spannend voor kinderen",
              8: "Concreter, maakt het tastbaar",
              9: "Emotionele connectie met dieren",
              10: "Zachter, minder confronterend",
            };
            return (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td><Icon /></td>
                <td>{h.label}</td>
                <td>{h.original}</td>
                <td>{reasons[h.id]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
