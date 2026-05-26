"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
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
  ChevronRight,
  Lightbulb,
  Gamepad2,
  RotateCcw,
  Eye,
  EyeOff,
  Home,
  Trophy,
  PlayCircle,
  Film,
  Compass,
} from "lucide-react";

// ─── RECOMMENDED ORDER (per REQUIREMENTS PART2 §3) ────────────────────────────
// 1. zwaard van Bergsham, 2. grafheuvel, 3. grafrituelen, 4. stoomkuilen,
// 5. klokbeker, 6. (open), 7. kleding, 8. sieraden, 9. landschap, 10. dieren
const RECOMMENDED_ORDER = [7, 1, 2, 5, 6, 10, 3, 4, 8, 9];

// ─── DIFFICULTY ───────────────────────────────────────────────────────────────
const DIFFICULTIES = [
  { id: "easy", label: "Makkelijk", age: "8-9 jaar", color: "#52b788", multiplier: 1 },
  { id: "medium", label: "Gemiddeld", age: "10-12 jaar", color: "#d97706", multiplier: 1.5 },
  { id: "hard", label: "Moeilijk", age: "13-14 jaar", color: "#C0392B", multiplier: 2 },
];

// ─── IDLE RESET (auto reset after ~2 min inactivity) ──────────────────────────
const IDLE_MS = 120_000;

// ─── LEADERBOARD HELPERS ──────────────────────────────────────────────────────
function readLeaderboard() {
  try { return JSON.parse(localStorage.getItem("veluwe_leaderboard") || "[]"); } catch { return []; }
}
function saveLeaderboard(list) {
  try { localStorage.setItem("veluwe_leaderboard", JSON.stringify(list.slice(0, 20))); } catch {}
}

// ─── HOTSPOT DATA WITH STORY + GAMES ──────────────────────────────────────────
const HOTSPOTS = [
  {
    id: 1, label: "Geheimen onder de grond", x: 62, y: 40, color: "#7B4F2E", original: "De grafheuvel",
    videoUrl: "https://www.youtube.com/watch?v=oH3PgTctaOA",
    detailed: true,
    info: "In het midden van de schoolplaat zie je een grafheuvel — een opgestapelde heuvel van aarde die werd aangelegd als graf. Op de Veluwe zijn meer dan 5.000 van zulke heuvels te vinden! Ze dateren uit de periode 2500–800 voor Christus. De heuvel was zichtbaar van ver en markeerde de rustplaats van een belangrijk persoon. Rondom de heuvel was soms een greppel gegraven als heilige grens.",
    game: {
      type: "quiz", title: "Test je kennis!",
      questions: [
        { q: "Hoeveel grafheuvels zijn er nog op de Veluwe?", options: ["Ruim 500", "Ruim 1.000", "Ruim 5.000", "Ruim 10.000"], answer: 2, explanation: "Op de Veluwe zijn meer dan 5.000 grafheuvels te vinden — de meest grafheuveldichte regio van Nederland!" },
        { q: "Waarvoor diende de greppel rondom een grafheuvel?", options: ["Afwatering van regenwater", "Als heilige grens", "Om dieren weg te houden", "Voor opslag van offers"], answer: 1, explanation: "De greppel markeerde de heilige grens rondom het graf — de scheiding tussen de levenden en de doden." },
        { q: "Uit welke periode dateren de meeste Veluwse grafheuvels?", options: ["10.000–8.000 v.Chr.", "5.000–3.500 v.Chr.", "2.500–800 v.Chr.", "100 v.Chr.–400 n.Chr."], answer: 2, explanation: "De meeste grafheuvels dateren uit de Bronstijd: 2.500–800 voor Christus." },
      ]
    }
  },
  {
    id: 2, label: "Vuur voor de voorouders", x: 54, y: 66, color: "#C0392B", original: "Grafrituelen",
    videoUrl: "https://www.youtube.com/watch?v=PzhP8jVj6Qw",
    detailed: true,
    info: "Links op de plaat brandt een groot vuur. Dit hoort bij de grafrituelen. De overledene werd soms verbrand (crematie) of begraven. Rondom het vuur kwamen mensen samen om afscheid te nemen. Er werden offers gebracht: aardewerk, voedsel en waardevolle voorwerpen. Muziek, dans en gezang hoorden waarschijnlijk ook bij de plechtigheid.",
    game: {
      type: "sequence", title: "Zet het ritueel in de goede volgorde!",
      steps: [
        { id: "a", text: "De gemeenschap komt samen bij de overledene", order: 1 },
        { id: "b", text: "Het lichaam wordt gewassen en versierd met sieraden", order: 2 },
        { id: "c", text: "Offers van voedsel en aardewerk worden neergelegd", order: 3 },
        { id: "d", text: "Het vuur wordt aangestoken voor de crematie", order: 4 },
        { id: "e", text: "De grafheuvel wordt opgeworpen over het graf", order: 5 },
      ]
    }
  },
  {
    id: 3, label: "Wat droegen ze?", x: 22, y: 50, color: "#8E44AD", original: "Kleding",
    videoUrl: "https://www.youtube.com/watch?v=KbeoFCYZ6gA",
    detailed: true,
    info: "De mensen op de voorgrond dragen typische kleding uit de bronstijd. Kleding werd gemaakt van dierenhuid, wol en geweven plantvezels zoals vlas. De man draagt een mantel van dierenhuid. De vrouw draagt een geweven tuniek. Kleding was niet alleen bescherming — het toonde ook de status van de drager. Rijkere mensen hadden fijner geweven stoffen en versierde randen.",
    game: {
      type: "quiz", title: "Waar of niet waar?",
      questions: [
        { q: "Bronstijdmensen maakten kleding alleen van dierenhuid.", options: ["Waar", "Niet waar — ze gebruikten ook wol en plantenvezels"], answer: 1, explanation: "Ze gebruikten dierenhuid, maar ook wol van schapen en vlasvezels voor linnen stoffen." },
        { q: "Kleding zei iets over de status van de drager.", options: ["Waar — rijkeren hadden fijnere stoffen", "Niet waar — iedereen droeg precies hetzelfde"], answer: 0, explanation: "Rijke en machtige mensen hadden fijner geweven stoffen en meer versieringen." },
        { q: "Vlas is een plant waarmee je stof kunt weven.", options: ["Waar", "Niet waar — vlas werd alleen gegeten"], answer: 0, explanation: "Vlasvezels worden gebruikt om linnen te weven. Vlaszaad (lijnzaad) is ook eetbaar!" },
      ]
    }
  },
  {
    id: 4, label: "Glimmende schatten", x: 14, y: 36, color: "#F9A825", original: "Sieraden",
    videoUrl: "https://www.youtube.com/watch?v=tMqbB4_KK6w",
    info: "Op de voorgrond zie je mensen met sieraden. Die werden gemaakt van bot, steen, barnsteen en later ook brons en goud. Armbanden, halskettingen, haarspelden en fibulae (mantelspelden) waren populair. Sieraden waren een teken van rijkdom en macht. De mooiste sieraden werden mee begraven in de grafheuvel.",
    game: {
      type: "match", title: "Koppel het sieraad aan het materiaal!",
      pairs: [
        { item: "Armband", match: "Brons", itemEmoji: "💪", matchEmoji: "🥉" },
        { item: "Halsketting", match: "Barnsteen", itemEmoji: "📿", matchEmoji: "🟠" },
        { item: "Haarspeld", match: "Bot", itemEmoji: "📌", matchEmoji: "🦴" },
        { item: "Mantelspeld", match: "Goud", itemEmoji: "🪡", matchEmoji: "🥇" },
      ]
    }
  },
  {
    id: 5, label: "Koken met stenen", x: 38, y: 46, color: "#E64A19", original: "Stoomkuilen",
    videoUrl: "https://www.youtube.com/watch?v=2KE0gCh2znc",
    info: "Midden op de plaat zijn mensen bezig bij een stookkuil — een kuil gevuld met verhitte stenen. Door water over de hete stenen te gieten ontstond stoom, waarmee voedsel gegaard werd. Dit is een van de oudste kooktechnieken ter wereld. Archeologen herkennen stookkuilen als donkere vlekken in de grond vol gebarsten stenen en houtskool.",
    game: {
      type: "steps", title: "Hoe werkt een stookkuil?",
      steps: [
        { icon: "⛏️", title: "Stap 1: Graaf een kuil", desc: "Graaf een kuil in de aarde, groot genoeg voor het voedsel dat je wilt garen. Maak hem stevig zodat hij de warmte vasthoudt." },
        { icon: "🔥", title: "Stap 2: Verhit de stenen", desc: "Bouw een vuur naast de kuil en leg grote stenen erin. Verhit ze totdat ze gloeiend heet zijn — dit duurt een paar uur." },
        { icon: "🪨", title: "Stap 3: Leg stenen in de kuil", desc: "Haal de hete stenen uit het vuur en leg ze voorzichtig in de kuil. Ze geven de warmte langzaam af." },
        { icon: "💧", title: "Stap 4: Voeg water en voedsel toe!", desc: "Giet water over de hete stenen: er ontstaat stoom die het voedsel gaart. Vlees, groenten of granen worden zo bereid. Klaar!" },
      ]
    }
  },
  {
    id: 6, label: "De mooiste beker", x: 22, y: 20, color: "#6A1B9A", original: "De Veluwse klokbeker",
    videoUrl: "https://www.youtube.com/watch?v=h0aR3iLnHpY",
    info: "Rechts op de plaat zie je aardewerk — waaronder de beroemde klokbeker. Dit is een bijzonder stuk aardewerk in de vorm van een omgekeerde klok, versierd met ingegraveerde patronen. De klokbeker werd gemaakt door de 'Klokbekercultuur' (2700–2100 v.Chr.) en gevonden over heel Europa. Op de Veluwe zijn meerdere exemplaren opgegraven.",
    game: { type: "decorate", title: "Versier de klokbeker!" }
  },
  {
    id: 7, label: "Een bijzonder zwaard", x: 8, y: 60, color: "#37474F", original: "Het zwaard van Bergsham",
    videoUrl: "https://www.youtube.com/watch?v=qwfqgHzxXNk",
    info: "Rechts op de plaat staat een man met een bronzen zwaard. Het zwaard van Bergsham is een echt opgegraven bronzen zwaard gevonden op de Veluwe, daterend uit de Midden-Bronstijd (1500–1100 v.Chr.). Zulke zwaarden waren zeldzaam en kostbaar — echte statussymbolen voor krijgers en leiders.",
    game: {
      type: "quiz", title: "Het Zwaard van Bergsham",
      questions: [
        { q: "Van welk materiaal is het Zwaard van Bergsham gemaakt?", options: ["IJzer", "Brons (koper + tin)", "Vuursteen", "Hout met metalen punt"], answer: 1, explanation: "Brons is een legering van koper en tin. In de Bronstijd was dit het sterkste beschikbare metaal." },
        { q: "Wat werd er vaak met kostbare bronzen zwaarden gedaan als offer?", options: ["Verbrand in het vuur", "Vermalen tot poeder", "In de grond of in water gestopt", "Weggegeven aan vijanden"], answer: 2, explanation: "Veel bronzen zwaarden werden als offer in veenmoerassen of rivieren gegooid — waarschijnlijk als gave aan de goden." },
        { q: "Wat symboliseerde een bronzen zwaard?", options: ["Armoede en tegenspoed", "Vredelievendheid", "Macht en hoge status", "Goede oogst"], answer: 2, explanation: "Alleen rijke leiders konden zich een kostbaar bronzen zwaard veroorloven. Het was het ultieme statussymbool." },
      ]
    }
  },
  {
    id: 8, label: "Bos, heide en akkers", x: 50, y: 16, color: "#388E3C", original: "Het landschap",
    videoUrl: "https://www.youtube.com/watch?v=R-skKfEgmFs",
    info: "Op de achtergrond zie je het typische Veluwse landschap: open zandvlaktes afgewisseld met herfstkleurige bossen. In de prehistorie zag de Veluwe er heel anders uit. De eerste boeren kapten bomen om landbouwgrond te maken. Door overbegrazing en ontbossing ontstonden kale zandvlaktes en later de heidevelden.",
    game: { type: "landscape", title: "Hoe veranderde het landschap?" }
  },
  {
    id: 9, label: "Trouwe vrienden", x: 88, y: 72, color: "#00695C", original: "De dieren",
    videoUrl: "https://www.youtube.com/watch?v=4Pp19YBkP00",
    info: "Rechtsonder op de plaat zie je een hond — al duizenden jaren de trouwe metgezel van de mens. De eerste boeren op de Veluwe leefden samen met tamme dieren: koeien, schapen, geiten en varkens. Ze jaagden ook op wilde dieren zoals edelherten en everzwijnen. Dieren speelden een grote rol in het dagelijks leven én in rituelen.",
    game: {
      type: "memory", title: "Dieren-memory!",
      cards: [
        { id: "a", emoji: "🦌", label: "Edelhert" },
        { id: "b", emoji: "🐗", label: "Everzwijn" },
        { id: "c", emoji: "🐕", label: "Hond" },
        { id: "d", emoji: "🐄", label: "Koe" },
        { id: "e", emoji: "🐑", label: "Schaap" },
        { id: "f", emoji: "🐐", label: "Geit" },
      ]
    }
  },
  {
    id: 10, label: "Afscheid nemen", x: 78, y: 38, color: "#546E7A", original: "Omgaan met de dood",
    videoUrl: "https://www.youtube.com/watch?v=6vDpvCmZTM4",
    info: "Voor de eerste boeren was de dood een overgang naar een andere wereld. Ze geloofden dat voorouders bescherming boden aan de levenden. Overledenen werden begraven met hun bezittingen: eten, gereedschap, sieraden en wapens. De grafheuvel bleef een heilige plek. Het eren van voorouders hield de gemeenschap samen.",
    game: {
      type: "burial", title: "Wat leg je mee in het graf?",
      description: "Kies 5 voorwerpen die jij mee zou begraven:",
      items: [
        { id: "a", emoji: "⚔️", label: "Bronzen zwaard", correct: true, reason: "Wapens werden vaak meegegeven voor de andere wereld." },
        { id: "b", emoji: "🏺", label: "Klokbeker", correct: true, reason: "Aardewerk met voedsel of drank was een klassieke grafgift." },
        { id: "c", emoji: "🍖", label: "Vlees en voedsel", correct: true, reason: "Voedsel voor de reis naar het hiernamaals werd mee begraven." },
        { id: "d", emoji: "📿", label: "Barnstenen ketting", correct: true, reason: "Sieraden van barnsteen zijn gevonden in Veluwse grafheuvels." },
        { id: "e", emoji: "🪓", label: "Bijl", correct: true, reason: "Gereedschap hoorde bij de uitrusting van de overledene." },
        { id: "f", emoji: "📱", label: "Smartphone", correct: false, reason: "Smartphones bestonden 4.000 jaar geleden niet — maar leuk idee!" },
        { id: "g", emoji: "🌱", label: "Zaden", correct: true, reason: "Zaden symboliseerden nieuw leven en hoop voor de andere wereld." },
        { id: "h", emoji: "🧸", label: "Knuffelbeer", correct: false, reason: "Knuffelberen bestonden niet in de bronstijd." },
        { id: "i", emoji: "🦴", label: "Dierenbotten", correct: true, reason: "Botten van geofferde dieren zijn gevonden in grafheuvels." },
        { id: "j", emoji: "💡", label: "Gloeilamp", correct: false, reason: "De gloeilamp is pas in 1879 uitgevonden — ruim 3.000 jaar te laat!" },
      ]
    }
  },
];

const ICONS = { 1: Mountain, 2: Flame, 3: Shirt, 4: Gem, 5: CookingPot, 6: Wine, 7: Swords, 8: Trees, 9: Dog, 10: Leaf };

// ─── SHARED STYLE HELPERS ──────────────────────────────────────────────────────
const gBtn = (color, full) => ({
  background: `${color}22`,
  border: `1px solid ${color}88`,
  color: "#f5d9a8",
  borderRadius: 7, padding: "7px 14px",
  fontSize: "0.82rem", cursor: "pointer",
  fontFamily: "inherit", transition: "all 0.18s",
  width: full ? "100%" : undefined,
});

// ─── QUIZ GAME ────────────────────────────────────────────────────────────────
function QuizGame({ questions, color, difficulty, onResult }) {
  const [qIdx, setQIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const reported = useRef(false);
  // Adjust UI hint based on difficulty
  const showHint = difficulty !== "hard";
  const q = questions[qIdx];

  useEffect(() => {
    if (done && !reported.current) {
      reported.current = true;
      onResult?.({ correct: score, total: questions.length });
    }
  }, [done, score, questions.length, onResult]);

  function pick(i) {
    if (sel !== null) return;
    setSel(i);
    if (i === q.answer) setScore((s) => s + 1);
  }
  function next() {
    if (qIdx + 1 >= questions.length) setDone(true);
    else { setQIdx((n) => n + 1); setSel(null); }
  }
  function reset() { setQIdx(0); setSel(null); setScore(0); setDone(false); reported.current = false; }

  if (done) {
    const pct = score / questions.length;
    return (
      <div style={{ textAlign: "center", padding: "6px 0" }}>
        <div style={{ fontSize: "2rem", marginBottom: 6 }}>{pct === 1 ? "🏆" : pct >= 0.5 ? "⭐" : "📚"}</div>
        <div style={{ color: "#f5d9a8", fontWeight: "bold", fontSize: "1rem", marginBottom: 4 }}>{score} van {questions.length} goed!</div>
        <div style={{ color: "#a0856a", fontSize: "0.78rem", marginBottom: 12, lineHeight: 1.5 }}>
          {pct === 1 ? "Perfect! Je bent een echte prehistorie-expert!" : pct >= 0.5 ? "Goed gedaan! Lees nog eens voor meer details." : "Lees de tekst hierboven en probeer het nog eens!"}
        </div>
        <button onClick={reset} style={gBtn(color)}><RotateCcw size={12} style={{ marginRight: 5 }} />Nog een keer</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ color: "#a0856a", fontSize: "0.7rem" }}>Vraag {qIdx + 1} / {questions.length}</span>
        <span style={{ color: "#a0856a", fontSize: "0.7rem" }}>Score: {score}</span>
      </div>
      <p style={{ color: "#f0e0c0", fontSize: "0.86rem", lineHeight: 1.6, marginBottom: 10, marginTop: 0 }}>{q.q}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {q.options.map((opt, i) => {
          const reveal = sel !== null;
          const isCorrect = i === q.answer;
          const isWrong = reveal && sel === i && !isCorrect;
          return (
            <button key={i} onClick={() => pick(i)} style={{
              background: reveal && isCorrect ? `${color}44` : isWrong ? "rgba(192,57,43,0.3)" : "rgba(255,255,255,0.04)",
              border: reveal && isCorrect ? `2px solid ${color}` : isWrong ? "2px solid #C0392B" : "1px solid rgba(255,255,255,0.12)",
              color: reveal && isCorrect ? "#f5d9a8" : isWrong ? "#ff9999" : "#ddc99a",
              borderRadius: 6, padding: "8px 12px", fontSize: "0.81rem",
              cursor: reveal ? "default" : "pointer",
              textAlign: "left", display: "flex", alignItems: "center", gap: 8,
              fontFamily: "inherit", transition: "all 0.2s",
            }}>
              <span style={{
                width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                background: reveal && isCorrect ? color : isWrong ? "#C0392B" : "rgba(255,255,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.65rem", color: "#fff", fontWeight: "bold",
              }}>
                {reveal && isCorrect ? "✓" : isWrong ? "✗" : "ABCD"[i]}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <>
          {q.explanation && showHint && (
            <div style={{ marginTop: 8, padding: "8px 10px", background: `${color}18`, borderRadius: 6, fontSize: "0.76rem", color: "#c8a97a", lineHeight: 1.55, display: "flex", gap: 6 }}>
              <Lightbulb size={14} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{q.explanation}</span>
            </div>
          )}
          <button onClick={next} style={{ ...gBtn(color, true), marginTop: 8 }}>
            {qIdx + 1 >= questions.length ? "Bekijk resultaat →" : "Volgende vraag →"}
          </button>
        </>
      )}
    </div>
  );
}

// ─── SEQUENCE GAME ────────────────────────────────────────────────────────────
function SequenceGame({ steps, color, onResult }) {
  const [shuffled] = useState(() => [...steps].sort(() => Math.random() - 0.5));
  const [clicked, setClicked] = useState([]);
  const [done, setDone] = useState(false);
  const reported = useRef(false);
  const remaining = shuffled.filter((s) => !clicked.find((c) => c.id === s.id));

  function handleClick(step) {
    if (done) return;
    const next = [...clicked, step];
    setClicked(next);
    if (next.length === steps.length) setDone(true);
  }
  function reset() { setClicked([]); setDone(false); reported.current = false; }

  const score = done ? clicked.filter((s, i) => s.order === i + 1).length : 0;
  const allCorrect = done && score === steps.length;

  useEffect(() => {
    if (done && !reported.current) {
      reported.current = true;
      onResult?.({ correct: score, total: steps.length });
    }
  }, [done, score, steps.length, onResult]);

  return (
    <div>
      <p style={{ color: "#a0856a", fontSize: "0.78rem", marginTop: 0, marginBottom: 10 }}>
        Klik de stappen in de <strong style={{ color: "#f5d9a8" }}>juiste volgorde</strong>:
      </p>
      {clicked.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          {clicked.map((step, i) => {
            const correct = !done || step.order === i + 1;
            return (
              <div key={step.id} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "5px 8px", marginBottom: 3,
                background: done ? (correct ? `${color}28` : "rgba(192,57,43,0.2)") : "rgba(255,255,255,0.05)",
                border: done ? (correct ? `1px solid ${color}88` : "1px solid #C0392B88") : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 5,
              }}>
                <span style={{
                  background: done ? (correct ? color : "#C0392B") : "#6b4226",
                  color: "#fff", borderRadius: "50%", width: 18, height: 18,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.62rem", flexShrink: 0, fontWeight: "bold",
                }}>{i + 1}</span>
                <span style={{ fontSize: "0.78rem", color: "#e8d5b0", flex: 1 }}>{step.text}</span>
                {done && <span>{correct ? "✓" : "✗"}</span>}
              </div>
            );
          })}
        </div>
      )}
      {!done && remaining.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {remaining.map((step) => (
            <button key={step.id} onClick={() => handleClick(step)} style={{
              background: "rgba(255,255,255,0.04)", border: `1px solid ${color}44`,
              color: "#ddc99a", borderRadius: 6, padding: "7px 10px",
              fontSize: "0.78rem", cursor: "pointer", textAlign: "left", fontFamily: "inherit",
            }}>{step.text}</button>
          ))}
        </div>
      )}
      {done && (
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <div style={{ fontSize: "1.8rem", marginBottom: 4 }}>{allCorrect ? "🎉" : score >= 3 ? "👍" : "🔄"}</div>
          <div style={{ color: "#f5d9a8", fontSize: "0.85rem", marginBottom: 4 }}>{score}/{steps.length} stappen op de juiste plek!</div>
          <div style={{ color: "#a0856a", fontSize: "0.76rem", marginBottom: 10 }}>
            {allCorrect ? "Perfect! Je kent het ritueel van voor naar achter!" : "Probeer het nog eens — je weet nu al meer!"}
          </div>
          <button onClick={reset} style={gBtn(color)}><RotateCcw size={12} style={{ marginRight: 5 }} />Opnieuw</button>
        </div>
      )}
    </div>
  );
}

// ─── MATCH GAME ───────────────────────────────────────────────────────────────
function MatchGame({ pairs, color, onResult }) {
  const [shuffledMatches] = useState(() => [...pairs.map((p) => ({ label: p.match, emoji: p.matchEmoji }))].sort(() => Math.random() - 0.5));
  const [selItem, setSelItem] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrong, setWrong] = useState(null);
  const reported = useRef(false);
  const done = matched.length === pairs.length;

  useEffect(() => {
    if (done && !reported.current) {
      reported.current = true;
      onResult?.({ correct: pairs.length, total: pairs.length });
    }
  }, [done, pairs.length, onResult]);

  function clickItem(item) {
    if (done || matched.find((m) => m.item === item)) return;
    setSelItem(item === selItem ? null : item);
    setWrong(null);
  }
  function clickMatch(matchLabel) {
    if (done || !selItem || matched.find((m) => m.match === matchLabel)) return;
    const pair = pairs.find((p) => p.item === selItem);
    if (pair && pair.match === matchLabel) {
      setMatched((prev) => [...prev, { item: selItem, match: matchLabel }]);
      setSelItem(null);
    } else {
      setWrong(matchLabel);
      setTimeout(() => setWrong(null), 700);
    }
  }
  function reset() { setSelItem(null); setMatched([]); setWrong(null); reported.current = false; }

  if (done) return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "2rem", marginBottom: 6 }}>🎊</div>
      <div style={{ color: "#f5d9a8", fontSize: "0.9rem", marginBottom: 4 }}>Alle koppels gevonden!</div>
      <div style={{ color: "#a0856a", fontSize: "0.76rem", marginBottom: 12 }}>Zo werden sieraden gemaakt in de bronstijd.</div>
      <button onClick={reset} style={gBtn(color)}><RotateCcw size={12} style={{ marginRight: 5 }} />Opnieuw</button>
    </div>
  );

  return (
    <div>
      <p style={{ color: "#a0856a", fontSize: "0.76rem", marginTop: 0, marginBottom: 10 }}>
        {selItem ? <span>Je hebt <strong style={{ color: "#f5d9a8" }}>{selItem}</strong> gekozen — klik nu het bijpassende materiaal:</span> : "Klik een sieraad (links), dan het bijpassende materiaal (rechts):"}
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {pairs.map((p) => {
            const isMatched = !!matched.find((m) => m.item === p.item);
            const isSelected = selItem === p.item;
            return (
              <button key={p.item} onClick={() => clickItem(p.item)} style={{
                background: isMatched ? `${color}33` : isSelected ? `${color}44` : "rgba(255,255,255,0.05)",
                border: isMatched ? `2px solid ${color}` : isSelected ? `2px solid ${color}` : "1px solid rgba(255,255,255,0.15)",
                color: "#ddc99a", borderRadius: 6, padding: "7px 8px", fontSize: "0.76rem",
                cursor: isMatched ? "default" : "pointer", fontFamily: "inherit", textAlign: "center",
                transition: "all 0.18s", opacity: isMatched ? 0.6 : 1,
              }}>
                {p.itemEmoji} {p.item}{isMatched && " ✓"}
              </button>
            );
          })}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {shuffledMatches.map((m) => {
            const isMatched = !!matched.find((mm) => mm.match === m.label);
            const isWrong = wrong === m.label;
            return (
              <button key={m.label} onClick={() => clickMatch(m.label)} style={{
                background: isMatched ? `${color}33` : isWrong ? "rgba(192,57,43,0.35)" : "rgba(255,255,255,0.05)",
                border: isMatched ? `2px solid ${color}` : isWrong ? "2px solid #C0392B" : "1px solid rgba(255,255,255,0.15)",
                color: isMatched ? "#f5d9a8" : isWrong ? "#ff9999" : "#ddc99a",
                borderRadius: 6, padding: "7px 8px", fontSize: "0.76rem",
                cursor: isMatched ? "default" : "pointer", fontFamily: "inherit", textAlign: "center",
                transition: "all 0.18s", opacity: isMatched ? 0.6 : 1,
              }}>
                {m.emoji} {m.label}{isMatched && " ✓"}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: 8, color: "#546E7A", fontSize: "0.72rem", textAlign: "center" }}>{matched.length}/{pairs.length} gevonden</div>
    </div>
  );
}

// ─── STEPS GAME ───────────────────────────────────────────────────────────────
function StepsGame({ steps, color }) {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  function next() { if (current + 1 >= steps.length) setDone(true); else setCurrent((n) => n + 1); }
  function reset() { setCurrent(0); setDone(false); }

  if (done) return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "2rem", marginBottom: 6 }}>🍖</div>
      <div style={{ color: "#f5d9a8", fontSize: "0.9rem", marginBottom: 4 }}>Het eten is klaar!</div>
      <div style={{ color: "#a0856a", fontSize: "0.76rem", marginBottom: 12, lineHeight: 1.5 }}>
        Zo kookten de eerste boeren op de Veluwe hun maaltijden. Eenvoudig maar effectief!
      </div>
      <button onClick={reset} style={gBtn(color)}><RotateCcw size={12} style={{ marginRight: 5 }} />Opnieuw bekijken</button>
    </div>
  );

  const step = steps[current];
  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
        {steps.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= current ? color : "rgba(255,255,255,0.12)", transition: "background 0.3s" }} />
        ))}
      </div>
      <div style={{ background: `${color}18`, border: `1px solid ${color}44`, borderRadius: 10, padding: "14px 14px 12px", textAlign: "center", minHeight: 110 }}>
        <div style={{ fontSize: "2.4rem", marginBottom: 6 }}>{step.icon}</div>
        <div style={{ color: "#f5d9a8", fontSize: "0.88rem", fontWeight: "bold", marginBottom: 6 }}>{step.title}</div>
        <div style={{ color: "#c8a97a", fontSize: "0.8rem", lineHeight: 1.6 }}>{step.desc}</div>
      </div>
      <button onClick={next} style={{ ...gBtn(color, true), marginTop: 10 }}>
        {current + 1 >= steps.length ? "Klaar! 🎉" : "Volgende stap →"}
      </button>
    </div>
  );
}

// ─── DECORATE GAME ────────────────────────────────────────────────────────────
const PATTERNS = ["geen", "zigzag", "stippen", "lijnen", "diamanten"];
const PAT_COLORS = { zigzag: "#a855f7", stippen: "#f59e0b", lijnen: "#38bdf8", diamanten: "#f43f5e" };
const PAT_LABELS = { geen: "Leeg", zigzag: "Zigzag", stippen: "Stippen", lijnen: "Lijnen", diamanten: "Diamanten" };

function renderPat(type, color, w, h) {
  if (type === "stippen") {
    const d = []; for (let x = 8; x < w; x += 14) d.push(<circle key={x} cx={x} cy={h / 2} r={2.5} fill={color} />);
    return <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}><g>{d}</g></svg>;
  }
  if (type === "zigzag") {
    const pts = []; for (let x = 0; x <= w + 10; x += 14) { pts.push(`${x},${h * 0.15}`); pts.push(`${x + 7},${h * 0.85}`); }
    return <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}><polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={1.8} /></svg>;
  }
  if (type === "lijnen") {
    return <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <line x1={0} y1={h * 0.35} x2={w} y2={h * 0.35} stroke={color} strokeWidth={1.5} />
      <line x1={0} y1={h * 0.65} x2={w} y2={h * 0.65} stroke={color} strokeWidth={1.5} />
    </svg>;
  }
  if (type === "diamanten") {
    const shapes = []; for (let x = 12; x < w; x += 20) shapes.push(<polygon key={x} points={`${x},${h*0.1} ${x+8},${h*0.5} ${x},${h*0.9} ${x-8},${h*0.5}`} fill="none" stroke={color} strokeWidth={1.5} />);
    return <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>{shapes}</svg>;
  }
  return null;
}

function DecorateGame({ color }) {
  const [bands, setBands] = useState(["geen", "geen", "geen", "geen", "geen"]);
  const [activeBand, setActiveBand] = useState(null);
  const allDone = bands.every((b) => b !== "geen");
  const bandH = [18, 24, 30, 24, 18];

  function setPattern(p) { if (activeBand === null) return; setBands((prev) => { const n = [...prev]; n[activeBand] = p; return n; }); }
  function reset() { setBands(["geen", "geen", "geen", "geen", "geen"]); setActiveBand(null); }

  return (
    <div>
      <p style={{ color: "#a0856a", fontSize: "0.76rem", marginTop: 0, marginBottom: 10 }}>
        Klik een band op de beker → kies een patroon rechts:
      </p>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <svg width={90} height={124} viewBox="0 0 90 124">
            <defs><clipPath id="beker"><path d="M 10 8 Q 45 0 80 8 L 85 114 Q 45 125 5 114 Z" /></clipPath></defs>
            <path d="M 10 8 Q 45 0 80 8 L 85 114 Q 45 125 5 114 Z" fill="#3a1f0a" stroke="#8b5e3c" strokeWidth={2} />
            {bandH.map((h, i) => {
              const y = 10 + bandH.slice(0, i).reduce((a, b) => a + b, 0);
              const pat = bands[i]; const patC = PAT_COLORS[pat] || "transparent"; const isAct = activeBand === i;
              return (
                <g key={i} clipPath="url(#beker)" onClick={() => setActiveBand(i)} style={{ cursor: "pointer" }}>
                  <rect x={0} y={y} width={90} height={h} fill={isAct ? "rgba(255,255,255,0.08)" : "transparent"} stroke={isAct ? "#f5d9a8" : "rgba(255,255,255,0.1)"} strokeWidth={0.8} />
                  {pat !== "geen" && (
                    <foreignObject x={5} y={y} width={80} height={h}>
                      <div xmlns="http://www.w3.org/1999/xhtml" style={{ position: "relative", width: 80, height: h, overflow: "hidden" }}>
                        {renderPat(pat, patC, 80, h)}
                      </div>
                    </foreignObject>
                  )}
                </g>
              );
            })}
            <ellipse cx={45} cy={114} rx={40} ry={6} fill="#5c3317" stroke="#8b5e3c" strokeWidth={1.5} />
          </svg>
          <div style={{ color: "#a0856a", fontSize: "0.62rem", textAlign: "center", marginTop: 2 }}>Klokbeker</div>
        </div>
        <div style={{ flex: 1 }}>
          {activeBand !== null ? (
            <>
              <div style={{ color: "#c8a97a", fontSize: "0.68rem", marginBottom: 6 }}>Band {activeBand + 1} — kies een patroon:</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {PATTERNS.map((p) => (
                  <button key={p} onClick={() => setPattern(p)} style={{
                    background: bands[activeBand] === p ? `${color}44` : "rgba(255,255,255,0.04)",
                    border: bands[activeBand] === p ? `1px solid ${color}` : "1px solid rgba(255,255,255,0.12)",
                    color: "#ddc99a", borderRadius: 5, padding: "5px 8px", fontSize: "0.73rem",
                    cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                  }}>
                    {p !== "geen" && <span style={{ color: PAT_COLORS[p], marginRight: 4 }}>◆</span>}
                    {PAT_LABELS[p]}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div style={{ color: "#a0856a", fontSize: "0.75rem", lineHeight: 1.6 }}>
              Klik een band op de beker om te versieren! Echte klokbekers hadden ingegraveerde patronen.
            </div>
          )}
          {allDone && (
            <div style={{ marginTop: 8, padding: "6px 8px", background: `${color}22`, borderRadius: 6, fontSize: "0.72rem", color: "#c8a97a" }}>
              🎨 Prachtig! Precies zoals de prehistorische pottenbakkers het deden.
            </div>
          )}
        </div>
      </div>
      <button onClick={reset} style={{ ...gBtn(color), marginTop: 10, fontSize: "0.74rem" }}><RotateCcw size={11} style={{ marginRight: 4 }} />Begin opnieuw</button>
    </div>
  );
}

// ─── MEMORY GAME ──────────────────────────────────────────────────────────────
function MemoryGame({ cards, color, difficulty, onResult }) {
  // On easy reduce pairs to 4, on hard keep all
  const usedCards = difficulty === "easy" ? cards.slice(0, 4) : cards;
  const [grid] = useState(() => {
    const doubled = [...usedCards, ...usedCards].map((c, i) => ({ ...c, uid: `${c.id}-${i}` }));
    for (let i = doubled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [doubled[i], doubled[j]] = [doubled[j], doubled[i]]; }
    return doubled;
  });
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const reported = useRef(false);
  const done = matched.length === usedCards.length;

  useEffect(() => {
    if (done && !reported.current) {
      reported.current = true;
      // Score memory by efficiency: perfect = pairs, +1 per extra move counts against you
      onResult?.({ correct: usedCards.length, total: Math.max(moves, usedCards.length) });
    }
  }, [done, moves, usedCards.length, onResult]);

  function flip(uid) {
    if (locked || flipped.includes(uid)) return;
    const card = grid.find((g) => g.uid === uid);
    if (matched.includes(card.id)) return;
    const newFlipped = [...flipped, uid];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [u1, u2] = newFlipped;
      const c1 = grid.find((g) => g.uid === u1); const c2 = grid.find((g) => g.uid === u2);
      if (c1.id === c2.id) { setMatched((m) => [...m, c1.id]); setFlipped([]); setLocked(false); }
      else setTimeout(() => { setFlipped([]); setLocked(false); }, 900);
    }
  }
  function reset() { setFlipped([]); setMatched([]); setMoves(0); setLocked(false); reported.current = false; }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ color: "#a0856a", fontSize: "0.7rem" }}>Vind alle {usedCards.length} paren!</span>
        <span style={{ color: "#a0856a", fontSize: "0.7rem" }}>Beurten: {moves} · Gevonden: {matched.length}/{usedCards.length}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
        {grid.map((card) => {
          const isFlipped = flipped.includes(card.uid) || matched.includes(card.id);
          const isMatched = matched.includes(card.id);
          return (
            <button key={card.uid} onClick={() => flip(card.uid)} style={{
              aspectRatio: "1",
              background: isFlipped ? (isMatched ? `${color}44` : "rgba(255,255,255,0.12)") : `${color}22`,
              border: isFlipped ? `2px solid ${isMatched ? color : "rgba(255,255,255,0.3)"}` : `1px solid ${color}55`,
              borderRadius: 7, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              cursor: isFlipped ? "default" : "pointer", fontSize: isFlipped ? "1.3rem" : "1rem",
              transition: "all 0.18s", color: isFlipped ? "#f5d9a8" : "#6b4226", gap: 1,
            }}>
              {isFlipped ? (<><span>{card.emoji}</span><span style={{ fontSize: "0.5rem", color: isMatched ? "#f5d9a8" : "#a0856a" }}>{card.label}</span></>) : "?"}
            </button>
          );
        })}
      </div>
      {done && (
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <div style={{ fontSize: "1.8rem", marginBottom: 4 }}>🏆</div>
          <div style={{ color: "#f5d9a8", fontSize: "0.86rem", marginBottom: 4 }}>Alle dieren gevonden in {moves} beurten!</div>
          <div style={{ color: "#a0856a", fontSize: "0.74rem", marginBottom: 10, lineHeight: 1.5 }}>Dit zijn de dieren waarmee de eerste boeren op de Veluwe samenleefden.</div>
          <button onClick={reset} style={gBtn(color)}><RotateCcw size={12} style={{ marginRight: 5 }} />Opnieuw spelen</button>
        </div>
      )}
    </div>
  );
}

// ─── LANDSCAPE GAME ───────────────────────────────────────────────────────────
const ERAS = [
  { label: "5000 v.Chr.", icon: "🌳", color: "#1a5c2a", sub: "Vóór de eerste boeren", items: [{ icon: "🌲", text: "Dicht oerbos van eiken, beuken en berken" }, { icon: "🐺", text: "Wolven, beren en lynxen leven vrij rond" }, { icon: "🏞️", text: "Heldere beekjes en vochtige moerassen" }, { icon: "🦅", text: "Rijke vogelpopulaties in het dichte bos" }] },
  { label: "2500 v.Chr.", icon: "🌾", color: "#7B6F2E", sub: "De eerste boeren arriveren", items: [{ icon: "🪓", text: "Eerste bomen worden gekapt voor akkers" }, { icon: "🐄", text: "Koeien en schapen begrazen de open plekken" }, { icon: "🌾", text: "Kleine graanvelden verschijnen" }, { icon: "🏕️", text: "Kleine nederzettingen van houten huizen" }] },
  { label: "800 v.Chr.", icon: "🏜️", color: "#8B5E3C", sub: "Na eeuwen van landbouw", items: [{ icon: "🏜️", text: "Grote zandvlaktes door overbegrazing" }, { icon: "🌿", text: "Heide neemt de overhand op zandgrond" }, { icon: "💨", text: "Stuifzanden waaien over het landschap" }, { icon: "🌳", text: "Alleen op beschutte plekken blijft bos" }] },
  { label: "Nu — 2026", icon: "🌿", color: "#388E3C", sub: "Het Veluwse landschap vandaag", items: [{ icon: "🌲", text: "Heide én naaldbossen naast elkaar" }, { icon: "🦌", text: "Edelherten en wilde zwijnen zijn terug" }, { icon: "🏞️", text: "Beschermd nationaal park Veluwezoom" }, { icon: "👨‍👩‍👧", text: "Miljoenen bezoekers per jaar" }] },
];

function LandscapeGame({ color }) {
  const [era, setEra] = useState(0);
  const e = ERAS[era];
  return (
    <div>
      <p style={{ color: "#a0856a", fontSize: "0.76rem", marginTop: 0, marginBottom: 10 }}>Klik door de tijdperken en zie hoe het landschap veranderde:</p>
      <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
        {ERAS.map((s, i) => (
          <button key={i} onClick={() => setEra(i)} style={{
            flex: 1, background: era === i ? `${s.color}55` : "rgba(255,255,255,0.04)",
            border: era === i ? `2px solid ${s.color}` : "1px solid rgba(255,255,255,0.1)",
            color: era === i ? "#f5d9a8" : "#a0856a", borderRadius: 6, padding: "5px 3px",
            fontSize: "0.62rem", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
          }}>
            <div style={{ fontSize: "1rem" }}>{s.icon}</div>
            <div style={{ lineHeight: 1.2 }}>{s.label}</div>
          </button>
        ))}
      </div>
      <div style={{ background: `${e.color}22`, border: `1px solid ${e.color}66`, borderRadius: 8, padding: "12px 12px 10px", transition: "all 0.3s" }}>
        <div style={{ color: "#f5d9a8", fontSize: "0.85rem", fontWeight: "bold", marginBottom: 2 }}>{e.icon} {e.label}</div>
        <div style={{ color: "#a0856a", fontSize: "0.72rem", marginBottom: 8 }}>{e.sub}</div>
        {e.items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 5 }}>
            <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>{item.icon}</span>
            <span style={{ color: "#e8d5b0", fontSize: "0.78rem", lineHeight: 1.5 }}>{item.text}</span>
          </div>
        ))}
      </div>
      {era === ERAS.length - 1 && (
        <div style={{ marginTop: 8, padding: "7px 10px", background: `${color}18`, borderRadius: 6, fontSize: "0.72rem", color: "#c8a97a", lineHeight: 1.5, display: "flex", gap: 6 }}>
          <Lightbulb size={13} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>Het Veluwse landschap van nu is direct gevormd door de eerste boeren van duizenden jaren geleden!</span>
        </div>
      )}
    </div>
  );
}

// ─── BURIAL GAME ──────────────────────────────────────────────────────────────
function BurialGame({ items, description, color, onResult }) {
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const reported = useRef(false);
  const MAX = 5;

  function toggle(id) {
    if (submitted) return;
    if (selected.includes(id)) setSelected(selected.filter((s) => s !== id));
    else if (selected.length < MAX) setSelected([...selected, id]);
  }
  function reset() { setSelected([]); setSubmitted(false); reported.current = false; }

  const correctCount = submitted ? selected.filter((id) => items.find((it) => it.id === id)?.correct).length : 0;

  useEffect(() => {
    if (submitted && !reported.current) {
      reported.current = true;
      onResult?.({ correct: correctCount, total: MAX });
    }
  }, [submitted, correctCount, onResult]);

  return (
    <div>
      {!submitted ? (
        <>
          <p style={{ color: "#a0856a", fontSize: "0.76rem", marginTop: 0, marginBottom: 8 }}>
            {description} ({selected.length}/{MAX} gekozen)
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
            {items.map((item) => {
              const isSel = selected.includes(item.id);
              const disabled = !isSel && selected.length >= MAX;
              return (
                <button key={item.id} onClick={() => toggle(item.id)} style={{
                  background: isSel ? `${color}44` : disabled ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
                  border: isSel ? `2px solid ${color}` : "1px solid rgba(255,255,255,0.12)",
                  color: isSel ? "#f5d9a8" : disabled ? "#555" : "#ddc99a",
                  borderRadius: 6, padding: "7px 6px",
                  fontSize: "0.72rem", cursor: disabled ? "not-allowed" : "pointer",
                  textAlign: "center", fontFamily: "inherit", transition: "all 0.18s",
                }}>
                  <div style={{ fontSize: "1.2rem" }}>{item.emoji}</div>
                  <div style={{ lineHeight: 1.3, marginTop: 2 }}>{item.label}</div>
                </button>
              );
            })}
          </div>
          {selected.length === MAX && (
            <button onClick={() => setSubmitted(true)} style={{ ...gBtn(color, true), marginTop: 8 }}>Bekijk het resultaat →</button>
          )}
        </>
      ) : (
        <div>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: "1.8rem", marginBottom: 4 }}>{correctCount >= 4 ? "🏺" : correctCount >= 2 ? "⚗️" : "📚"}</div>
            <div style={{ color: "#f5d9a8", fontSize: "0.9rem", fontWeight: "bold", marginBottom: 2 }}>{correctCount}/{MAX} historisch correcte keuzes!</div>
            <div style={{ color: "#a0856a", fontSize: "0.74rem" }}>{correctCount >= 4 ? "Jij zou een prima prehistorisch grafmeester zijn!" : "Goed geprobeerd! Zie hieronder de uitleg."}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {selected.map((id) => {
              const item = items.find((it) => it.id === id);
              return (
                <div key={id} style={{
                  display: "flex", gap: 8, alignItems: "flex-start",
                  background: item.correct ? `${color}22` : "rgba(192,57,43,0.2)",
                  border: `1px solid ${item.correct ? color : "#C0392B"}66`,
                  borderRadius: 6, padding: "6px 8px",
                }}>
                  <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.emoji}</span>
                  <div>
                    <div style={{ color: "#f5d9a8", fontSize: "0.76rem", fontWeight: "bold" }}>{item.label} {item.correct ? "✓" : "✗"}</div>
                    <div style={{ color: "#a0856a", fontSize: "0.7rem", lineHeight: 1.5 }}>{item.reason}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={reset} style={{ ...gBtn(color, true), marginTop: 10 }}><RotateCcw size={12} style={{ marginRight: 5 }} />Probeer opnieuw</button>
        </div>
      )}
    </div>
  );
}

// ─── GAME DISPATCHER ──────────────────────────────────────────────────────────
function GameSection({ game, color, difficulty, onResult }) {
  if (!game) return null;
  return (
    <div style={{ marginTop: 16, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 14px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#c8a97a", fontSize: "0.7rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
        <Gamepad2 size={12} />{game.title || "Mini-spel"}
        {difficulty && <span style={{ marginLeft: "auto", textTransform: "none", letterSpacing: 0, color: "#8b6240", fontSize: "0.66rem" }}>· {DIFFICULTIES.find((d) => d.id === difficulty)?.label}</span>}
      </div>
      {game.type === "quiz" && <QuizGame questions={game.questions} color={color} difficulty={difficulty} onResult={onResult} />}
      {game.type === "sequence" && <SequenceGame steps={game.steps} color={color} onResult={onResult} />}
      {game.type === "match" && <MatchGame pairs={game.pairs} color={color} onResult={onResult} />}
      {game.type === "steps" && <StepsGame steps={game.steps} color={color} />}
      {game.type === "decorate" && <DecorateGame color={color} />}
      {game.type === "memory" && <MemoryGame cards={game.cards} color={color} difficulty={difficulty} onResult={onResult} />}
      {game.type === "landscape" && <LandscapeGame color={color} />}
      {game.type === "burial" && <BurialGame items={game.items} description={game.description} color={color} onResult={onResult} />}
    </div>
  );
}

// ─── CONFETTI BURST ───────────────────────────────────────────────────────────
// Parent remounts this with `key={trigger}` so the lazy initializer runs once per burst.
function ConfettiBurst() {
  const [bits] = useState(() => {
    const palette = ["#fde2a8", "#d97706", "#92400e", "#C0392B", "#7B4F2E", "#F9A825"];
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 1.4 + Math.random() * 1.4,
      color: palette[Math.floor(Math.random() * palette.length)],
      rotation: Math.random() * 360,
      size: 6 + Math.random() * 6,
    }));
  });
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}>
      <style>{`@keyframes vConfetti { 0%{transform: translateY(-10vh) rotate(0deg); opacity:1;} 100%{transform: translateY(110vh) rotate(720deg); opacity:0;} }`}</style>
      {bits.map((b) => (
        <span key={b.id} style={{
          position: "absolute", top: 0, left: `${b.left}%`,
          width: b.size, height: b.size * 0.5, background: b.color,
          transform: `rotate(${b.rotation}deg)`,
          animation: `vConfetti ${b.duration}s ${b.delay}s ease-in forwards`,
          borderRadius: 1,
        }} />
      ))}
    </div>
  );
}

// ─── LEADERBOARD MODAL ────────────────────────────────────────────────────────
function LeaderboardModal({ open, onClose, score, totals, onSave, boardVersion }) {
  const [name, setName] = useState("");
  // Recompute when the modal opens or when boardVersion bumps (after a new save)
  // boardVersion is intentionally read inside to force recompute on save.
  const board = useMemo(() => {
    void boardVersion;
    if (!open) return [];
    return readLeaderboard().sort((a, b) => b.score - a.score);
  }, [open, boardVersion]);

  if (!open) return null;
  function submit(e) {
    e?.preventDefault();
    const trimmed = (name || "Anoniem").trim().slice(0, 18);
    onSave?.(trimmed);
    setName("");
  }
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.78)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%", maxWidth: 440, background: "rgba(20,10,4,0.97)",
        border: "2px solid #d97706", borderRadius: 14, padding: "22px 20px",
        color: "#f5d9a8", boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Trophy size={20} style={{ color: "#d97706" }} />
          <h2 style={{ margin: 0, fontSize: "1.1rem", color: "#fde2a8" }}>Klassement</h2>
          <button onClick={onClose} style={{ marginLeft: "auto", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#c8a97a", borderRadius: "50%", width: 28, height: 28, cursor: "pointer" }}>✕</button>
        </div>
        {score != null && (
          <form onSubmit={submit} style={{ marginBottom: 16, padding: "10px 12px", background: "rgba(217,119,6,0.12)", border: "1px solid rgba(217,119,6,0.4)", borderRadius: 10 }}>
            <div style={{ fontSize: "0.8rem", marginBottom: 6, color: "#fde2a8" }}>Jouw score: <strong>{score}</strong> punten · {totals?.correct}/{totals?.total} goed</div>
            <div style={{ display: "flex", gap: 6 }}>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jouw naam" maxLength={18} style={{
                flex: 1, padding: "7px 10px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(0,0,0,0.4)", color: "#fde2a8", fontSize: "0.85rem", fontFamily: "inherit",
              }} />
              <button type="submit" style={{ background: "linear-gradient(135deg,#d97706,#92400e)", border: "none", color: "#fff", padding: "7px 14px", borderRadius: 6, cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, fontFamily: "inherit" }}>Opslaan</button>
            </div>
          </form>
        )}
        <div style={{ maxHeight: 320, overflowY: "auto" }}>
          {board.length === 0 ? (
            <div style={{ color: "#8b6240", textAlign: "center", padding: "20px 0", fontSize: "0.85rem" }}>Nog geen scores. Wees de eerste!</div>
          ) : board.map((row, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 10px", marginBottom: 4,
              background: i === 0 ? "rgba(217,119,6,0.16)" : "rgba(255,255,255,0.03)",
              border: i === 0 ? "1px solid rgba(217,119,6,0.5)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 7,
            }}>
              <span style={{ width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: i < 3 ? "#d97706" : "rgba(255,255,255,0.08)", fontSize: "0.7rem", fontWeight: 700, color: "#fff" }}>{i + 1}</span>
              <span style={{ flex: 1, fontSize: "0.84rem" }}>{row.name}</span>
              <span style={{ color: "#c8a97a", fontSize: "0.7rem" }}>{row.difficulty}</span>
              <span style={{ color: "#fde2a8", fontWeight: 700, fontSize: "0.88rem" }}>{row.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function InteractiveSchoolplaat({ onBack }) {
  const [active, setActive] = useState(null);
  const [visited, setVisited] = useState(new Set());
  const [closeExpanded, setCloseExpanded] = useState(null);
  const [poiVisible, setPoiVisible] = useState(true);
  const [difficulty, setDifficulty] = useState("medium");
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [showBoard, setShowBoard] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [boardVersion, setBoardVersion] = useState(0);
  const [splash, setSplash] = useState(true);
  const infoPanelRef = useRef(null);
  const idleTimer = useRef(null);
  const selected = HOTSPOTS.find((h) => h.id === active);
  const diff = DIFFICULTIES.find((d) => d.id === difficulty);

  // Suggested next POI based on REQUIREMENTS PART2 §3
  const suggestedNextId = RECOMMENDED_ORDER.find((id) => !visited.has(id));
  const suggestedNext = HOTSPOTS.find((h) => h.id === suggestedNextId);

  // Idle auto-reset
  const resetAll = useCallback(() => {
    setActive(null); setVisited(new Set()); setScore(0); setCorrect(0); setAttempted(0); setPoiVisible(true);
    if (closeExpanded) closeExpanded();
  }, [closeExpanded]);

  const armIdle = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => { resetAll(); }, IDLE_MS);
  }, [resetAll]);

  useEffect(() => {
    armIdle();
    const events = ["pointerdown", "keydown", "wheel", "touchstart"];
    events.forEach((ev) => window.addEventListener(ev, armIdle, { passive: true }));
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, armIdle));
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [armIdle]);

  // Splash dismiss
  useEffect(() => { const t = setTimeout(() => setSplash(false), 1600); return () => clearTimeout(t); }, []);

  function openHotspot(id) {
    setActive(id);
    setVisited((v) => {
      const nv = new Set([...v, id]);
      // Trigger confetti the moment the last POI gets visited
      if (nv.size === HOTSPOTS.length && v.size < HOTSPOTS.length) {
        queueMicrotask(() => setConfettiKey((k) => k + 1));
      }
      return nv;
    });
    if (closeExpanded) closeExpanded();
    setTimeout(() => infoPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
  }

  // Game result callback for scoring
  const onGameResult = useCallback((result) => {
    // result = { correct, total }
    const earned = Math.round(result.correct * 100 * (diff?.multiplier || 1));
    setScore((s) => s + earned);
    setCorrect((c) => c + result.correct);
    setAttempted((a) => a + result.total);
    if (result.correct === result.total && result.total > 0) {
      setConfettiKey((k) => k + 1);
    }
  }, [diff]);

  function handleSaveScore(name) {
    const list = readLeaderboard();
    list.push({ name, score, difficulty: diff?.label || difficulty, correct, total: attempted, at: Date.now() });
    saveLeaderboard(list.sort((a, b) => b.score - a.score));
    setBoardVersion((v) => v + 1);
    setShowBoard(false);
  }


  return (
    <div className="schoolplaat-container">
      {confettiKey > 0 && <ConfettiBurst key={confettiKey} />}
      {splash && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9998,
          background: "linear-gradient(160deg,#1e0f05,#2c1a0e,#3a2010)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "splashOut 0.5s 1.1s forwards",
        }}>
          <div style={{ textAlign: "center", animation: "splashIn 0.6s ease" }}>
            <div style={{ fontSize: "3.2rem", marginBottom: 10 }}>⚱️</div>
            <div style={{ color: "#fde2a8", fontSize: "1.2rem", fontFamily: "var(--font-playfair,serif)", fontWeight: 700, marginBottom: 4 }}>De Eerste Boeren</div>
            <div style={{ color: "#c8a97a", fontSize: "0.78rem", letterSpacing: 3, textTransform: "uppercase" }}>en hun grafheuvelritueel</div>
          </div>
        </div>
      )}
      <LeaderboardModal
        open={showBoard}
        onClose={() => setShowBoard(false)}
        score={attempted > 0 ? score : null}
        totals={{ correct, total: attempted }}
        onSave={handleSaveScore}
        boardVersion={boardVersion}
      />
      <style>{`
        @keyframes splashIn { from { opacity: 0; transform: scale(0.94); } to { opacity:1; transform: scale(1);} }
        @keyframes splashOut { to { opacity: 0; visibility: hidden; } }
      `}</style>
      <style>{`
        .schoolplaat-container {
          min-height: 100vh;
          background: linear-gradient(160deg, #1e0f05 0%, #2c1a0e 50%, #3a2010 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px 16px 40px;
          font-family: 'Nunito', 'Segoe UI', sans-serif;
        }
        .header { text-align: center; margin-bottom: 6px; max-width: 700px; }
        .header-subtitle { color: #8b6240; font-size: 0.7rem; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 6px; }
        .header h1 { color: #f5d9a8; font-size: clamp(1.15rem, 3.5vw, 1.75rem); margin: 0 0 6px; text-shadow: 0 2px 12px rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; gap: 10px; }
        .header p { color: #8b6240; font-size: 0.84rem; margin: 0; }
        .progress-bar { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 10px 0 16px; }
        .progress-dots { display: flex; gap: 3px; }
        .main-layout { display: flex; gap: 20px; align-items: flex-start; width: 100%; max-width: 1140px; flex-wrap: wrap; justify-content: center; }
        .schoolplaat-frame { position: relative; flex: 1 1 520px; max-width: 720px; border-radius: 12px; overflow: hidden; box-shadow: 0 16px 60px rgba(0,0,0,0.85); border: 3px solid #5a3218; }
        .schoolplaat-img { display: block; width: 100%; height: auto; }
        .poi { position: absolute; width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, rgba(255,149,0,0.45), rgba(255,107,0,0.45)); border: 2px solid rgba(255,255,255,0.55); display: flex; align-items: center; justify-content: center; cursor: pointer; transform: translate(-50%, -50%); box-shadow: 0 4px 15px rgba(0,0,0,0.35); transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index: 10; animation: poiPulse 2.5s infinite; backdrop-filter: blur(2px); }
        .poi:hover { transform: translate(-50%, -50%) scale(1.2); background: linear-gradient(135deg, rgba(255,149,0,0.75), rgba(255,107,0,0.75)); border-color: rgba(255,255,255,0.85); box-shadow: 0 6px 25px rgba(0,0,0,0.5), 0 0 0 8px rgba(255,149,0,0.2); animation: none; }
        .poi.active { transform: translate(-50%, -50%) scale(1.15); background: linear-gradient(135deg, rgba(255,149,0,0.85), rgba(255,107,0,0.85)); border-color: rgba(255,255,255,0.9); animation: none; box-shadow: 0 0 0 6px rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.5); }
        .poi.visited { background: linear-gradient(135deg, rgba(86,171,47,0.45), rgba(168,224,99,0.45)); }
        .poi svg { color: white; width: 18px; height: 18px; }
        .poi .tooltip { position: absolute; bottom: calc(100% + 10px); left: 50%; transform: translateX(-50%) translateY(5px); background: rgba(0,0,0,0.92); color: white; padding: 7px 12px; border-radius: 8px; font-size: 0.8rem; white-space: nowrap; opacity: 0; transition: all 0.2s ease; pointer-events: none; z-index: 100; display: flex; align-items: center; gap: 5px; }
        .poi .tooltip::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 6px solid transparent; border-top-color: rgba(0,0,0,0.92); }
        .poi:hover .tooltip { opacity: 1; transform: translateX(-50%) translateY(0); }
        @keyframes poiPulse { 0%, 100% { box-shadow: 0 4px 15px rgba(0,0,0,0.5), 0 0 0 0 rgba(255,149,0,0.5); } 50% { box-shadow: 0 4px 15px rgba(0,0,0,0.5), 0 0 0 8px rgba(255,149,0,0); } }
        .info-panel { flex: 1 1 290px; max-width: 380px; }
        .info-card { background: rgba(10, 5, 2, 0.94); border-radius: 14px; padding: 20px 18px; color: #f0e0c0; box-shadow: 0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04); animation: fadeSlide 0.22s ease; max-height: 82vh; overflow-y: auto; }
        .info-card::-webkit-scrollbar { width: 4px; } .info-card::-webkit-scrollbar-track { background: transparent; } .info-card::-webkit-scrollbar-thumb { background: #5a3218; border-radius: 2px; }
        .empty-state { background: rgba(10,5,2,0.75); border: 2px dashed #4a2e14; border-radius: 14px; padding: 18px 16px; color: #8b6240; text-align: center; }
        .hotspot-btn { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #ddc99a; border-radius: 6px; padding: 7px 10px; font-size: 0.79rem; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.18s ease; font-family: inherit; width: 100%; text-align: left; margin-bottom: 4px; }
        .hotspot-btn:hover { background: rgba(255,255,255,0.07); transform: translateX(3px); }
        .hotspot-btn svg { width: 16px; height: 16px; flex-shrink: 0; }
        .footer { color: #3a1e0a; font-size: 0.7rem; margin-top: 28px; text-align: center; line-height: 1.8; }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        button:hover { filter: brightness(1.1); }

        /* Top bar */
        .top-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 14px; padding: 8px 10px; background: rgba(10,5,2,0.6); border: 1px solid rgba(217,119,6,0.25); border-radius: 12px; max-width: 1140px; width: 100%; }
        .top-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: 8px; background: rgba(217,119,6,0.12); border: 1px solid rgba(217,119,6,0.35); color: #fde2a8; font-family: inherit; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.18s; }
        .top-btn:hover { background: rgba(217,119,6,0.22); border-color: #d97706; }
        .top-difficulty { display: inline-flex; align-items: center; gap: 4px; background: rgba(0,0,0,0.35); padding: 4px; border-radius: 9px; border: 1px solid rgba(255,255,255,0.08); }
        .diff-btn { display: inline-flex; flex-direction: column; align-items: center; gap: 0; padding: 5px 10px; border-radius: 6px; background: transparent; border: 1px solid transparent; color: #a0856a; font-family: inherit; font-size: 0.74rem; font-weight: 700; cursor: pointer; transition: all 0.18s; line-height: 1.1; }
        .diff-btn .diff-age { font-size: 0.58rem; font-weight: 500; color: #6b4226; margin-top: 1px; letter-spacing: 0.5px; }
        .diff-btn.active { background: color-mix(in srgb, var(--diff-c) 18%, transparent); color: #fde2a8; border-color: var(--diff-c); }
        .diff-btn.active .diff-age { color: #c8a97a; }
        .top-score { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: 8px; background: linear-gradient(135deg, rgba(217,119,6,0.16), rgba(146,64,14,0.16)); border: 1px solid rgba(217,119,6,0.4); color: #fde2a8; font-size: 0.78rem; cursor: pointer; transition: all 0.2s; }
        .top-score:hover { transform: scale(1.03); }

        /* Suggested next */
        .suggested-next { display: inline-flex; align-items: center; gap: 7px; margin-bottom: 12px; padding: 7px 14px; border-radius: 999px; background: rgba(217,119,6,0.10); border: 1px dashed rgba(217,119,6,0.55); color: #fde2a8; font-family: inherit; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
        .suggested-next:hover { background: rgba(217,119,6,0.18); border-style: solid; }
        .suggested-next svg { color: #d97706; }

        @media (max-width: 640px) {
          .top-score { margin-left: 0; width: 100%; justify-content: center; }
        }
      `}</style>

      {/* ── TOP BAR ── */}
      <div className="top-bar">
        {onBack && (
          <button className="top-btn" onClick={onBack} title="Terug naar overzicht">
            <Home size={14} /> Overzicht
          </button>
        )}
        <button className="top-btn" onClick={() => setPoiVisible((v) => !v)} title="POI's tonen/verbergen">
          {poiVisible ? <Eye size={14} /> : <EyeOff size={14} />} {poiVisible ? "Verberg POI's" : "Toon POI's"}
        </button>
        <div className="top-difficulty" role="radiogroup" aria-label="Moeilijkheidsgraad">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.id}
              onClick={() => setDifficulty(d.id)}
              className={`diff-btn ${difficulty === d.id ? "active" : ""}`}
              style={{ "--diff-c": d.color }}
              title={d.age}
              role="radio"
              aria-checked={difficulty === d.id}
            >{d.label}<span className="diff-age">{d.age}</span></button>
          ))}
        </div>
        <div className="top-score" onClick={() => setShowBoard(true)} title="Bekijk klassement">
          <Trophy size={14} /><strong>{score}</strong> pt · {correct}/{attempted}
        </div>
      </div>

      {/* ── HEADER ── */}
      <div className="header">
        <div className="header-subtitle">Gemeente Apeldoorn · Cultuur &amp; Erfgoed · Vensters Veluws Verleden</div>
        <h1><Map size={26} />De Eerste Boeren en hun Grafheuvelritueel</h1>
        <p>Klik op een hotspot om het verhaal te ontdekken en een mini-spel te spelen</p>
      </div>

      {/* Suggested next */}
      {suggestedNext && (
        <button
          className="suggested-next"
          onClick={() => openHotspot(suggestedNext.id)}
          title="Volg de aanbevolen verhaalvolgorde"
        >
          <Compass size={14} />
          <span style={{ color: "#c8a97a" }}>Aanbevolen volgende:</span>
          <strong>{suggestedNext.original}</strong>
          <ChevronRight size={14} />
        </button>
      )}

      {/* Progress dots */}
      <div className="progress-bar">
        <div className="progress-dots">
          {HOTSPOTS.map((h) => (
            <div key={h.id} title={h.label} onClick={() => openHotspot(h.id)} style={{
              width: 10, height: 10, borderRadius: "50%", cursor: "pointer",
              background: visited.has(h.id) ? h.color : "rgba(255,255,255,0.1)",
              border: `1px solid ${visited.has(h.id) ? h.color : "rgba(255,255,255,0.2)"}`,
              transition: "all 0.3s",
            }} />
          ))}
        </div>
        <span style={{ color: "#5a3218", fontSize: "0.68rem" }}>{visited.size}/{HOTSPOTS.length} ontdekt</span>
      </div>

      {/* Main layout */}
      <div className="main-layout">
        <VariantA
          active={active}
          visited={visited}
          openHotspot={openHotspot}
          registerCloseExpanded={setCloseExpanded}
          poiVisible={poiVisible}
        />

        <div className="info-panel" ref={infoPanelRef}>
          {selected ? (
            <SelectedPanel
              key={selected.id}
              selected={selected}
              setActive={setActive}
              openHotspot={openHotspot}
              difficulty={difficulty}
              onGameResult={onGameResult}
            />
          ) : (
            <EmptyState visited={visited} openHotspot={openHotspot} />
          )}
        </div>
      </div>

      <p className="footer">
        Vensters Veluws Verleden · Gemeente Apeldoorn – Vakgroep Cultuur &amp; Erfgoed · 2026<br />
        Contact: M. Parlevliet · J. Zuyderwyk
      </p>
    </div>
  );
}

// ─── VARIANT A: HOTSPOTS OP DE PLAAT (met zoom & expand) ─────────────────────
function VariantA({ active, visited, openHotspot, registerCloseExpanded, poiVisible = true }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);

  // Auto-hide POIs while zoomed in (per requirement: tijdens zoom POI's verbergen)
  const hideForZoom = zoom > 1.4;
  const showPois = poiVisible && !hideForZoom;

  useEffect(() => {
    if (registerCloseExpanded) {
      registerCloseExpanded(() => () => { setExpanded(false); setZoom(1); setPan({ x: 0, y: 0 }); });
    }
  }, [registerCloseExpanded]);
  const dragging = useRef(false);
  const hasMoved = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panAtStart = useRef({ x: 0, y: 0 });
  const [outerEl, setOuterEl] = useState(null);

  // Wheel-to-zoom – must be non-passive to prevent page scroll
  useEffect(() => {
    if (!outerEl) return;
    function onWheel(e) {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      setZoom((z) => {
        const nz = Math.max(1, Math.min(6, z * factor));
        if (nz <= 1) setPan({ x: 0, y: 0 });
        return nz;
      });
    }
    outerEl.addEventListener("wheel", onWheel, { passive: false });
    return () => outerEl.removeEventListener("wheel", onWheel);
  }, [outerEl]);

  // Close expanded with Escape
  useEffect(() => {
    if (!expanded) return;
    function onKey(e) { if (e.key === "Escape") setExpanded(false); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  function onPointerDown(e) {
    if (e.button !== 0) return;
    dragging.current = true;
    hasMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    panAtStart.current = { ...pan };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
    setPan({ x: panAtStart.current.x + dx, y: panAtStart.current.y + dy });
  }

  function onPointerUp() { dragging.current = false; }

  function changeZoom(factor) {
    setZoom((z) => {
      const nz = Math.max(1, Math.min(6, z * factor));
      if (nz <= 1) setPan({ x: 0, y: 0 });
      return nz;
    });
  }

  const zBtnStyle = {
    background: "rgba(20,10,4,0.85)", border: "1px solid rgba(255,255,255,0.25)",
    color: "#f5d9a8", width: 34, height: 34, borderRadius: 7, cursor: "pointer",
    fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "inherit", flexShrink: 0,
  };

  const mapInner = (
    <div
      ref={setOuterEl}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        cursor: zoom > 1 ? "grab" : "default",
        userSelect: "none",
        touchAction: "none",
        borderRadius: expanded ? 10 : 0,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Zoomable layer – hotspots stay correct because they use % positions */}
      <div style={{
        position: "relative",
        transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
        transformOrigin: "top center",
        willChange: "transform",
      }}>
        <img
          src="/Picture1.png"
          alt="Schoolplaat: De eerste boeren en hun grafheuvelritueel"
          className="schoolplaat-img"
          draggable={false}
        />
        {showPois && HOTSPOTS.map((h) => {
          const Icon = ICONS[h.id];
          return (
            <button
              key={h.id}
              className={`poi ${active === h.id ? "active" : ""} ${visited.has(h.id) ? "visited" : ""}`}
              style={{ left: `${h.x}%`, top: `${h.y}%`, "--poi-color": h.color }}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); openHotspot(h.id); }}
              aria-label={h.label}
            >
              <Icon />
              <span className="tooltip"><Icon size={14} />{h.label}</span>
            </button>
          );
        })}
      </div>

      {/* Controls overlay */}
      <div
        style={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 5, zIndex: 30 }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <button style={zBtnStyle} onClick={() => changeZoom(1.3)} title="Inzoomen">+</button>
        <button style={zBtnStyle} onClick={() => changeZoom(1 / 1.3)} title="Uitzoomen">−</button>
        {zoom > 1.05 && (
          <button style={zBtnStyle} onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} title="Reset">↺</button>
        )}
        <button
          style={{ ...zBtnStyle, width: "auto", padding: "0 10px", fontSize: "0.75rem", gap: 5 }}
          onClick={() => { setExpanded((e) => !e); setZoom(1); setPan({ x: 0, y: 0 }); }}
          title={expanded ? "Sluiten" : "Vergroot de kaart"}
        >
          {expanded ? "✕ Sluiten" : "⛶ Vergroot"}
        </button>
      </div>

      {/* Zoom level badge */}
      {zoom > 1.05 && (
        <div style={{
          position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.65)",
          color: "#c8a97a", padding: "2px 8px", borderRadius: 4,
          fontSize: "0.68rem", zIndex: 20, pointerEvents: "none",
        }}>
          {Math.round(zoom * 100)}%
        </div>
      )}

      {/* Hint when at zoom=1 and not expanded */}
      {zoom <= 1 && !expanded && (
        <div style={{
          position: "absolute", bottom: 10, left: 10, background: "rgba(0,0,0,0.55)",
          color: "#8b6240", padding: "3px 9px", borderRadius: 4,
          fontSize: "0.65rem", pointerEvents: "none", zIndex: 20,
        }}>
          Scroll of + om in te zoomen · klik ⛶ om te vergroten
        </div>
      )}
    </div>
  );

  if (expanded) {
    return (
      <>
        {/* Backdrop */}
        <div
          onClick={() => { setExpanded(false); setZoom(1); setPan({ x: 0, y: 0 }); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
            zIndex: 998, cursor: "pointer",
          }}
        />
        {/* Expanded frame */}
        <div style={{
          position: "fixed", inset: "16px", zIndex: 999,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div style={{
            width: "100%", maxWidth: 1100,
            border: "3px solid #5a3218", borderRadius: 12,
            boxShadow: "0 20px 80px rgba(0,0,0,0.9)",
            overflow: "hidden", pointerEvents: "all",
          }}>
            {mapInner}
          </div>
        </div>
      </>
    );
  }

  return <div className="schoolplaat-frame">{mapInner}</div>;
}

// ─── SELECTED PANEL ───────────────────────────────────────────────────────────
function SelectedPanel({ selected, setActive, openHotspot, difficulty, onGameResult }) {
  const Icon = ICONS[selected.id];
  // Suggest the next POI in the recommended order
  const recIdx = RECOMMENDED_ORDER.indexOf(selected.id);
  const nextRecId = recIdx >= 0 ? RECOMMENDED_ORDER[recIdx + 1] : null;
  const next = HOTSPOTS.find((h) => h.id === nextRecId) || HOTSPOTS.find((h) => h.id === selected.id + 1);
  return (
    <div className="info-card" style={{ border: `2px solid ${selected.color}` }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <Icon size={28} style={{ color: selected.color, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ color: "#5a3218", fontSize: "0.65rem", letterSpacing: 2, textTransform: "uppercase" }}>
            Verhaallijn {selected.id} van 10 {selected.detailed && <span style={{ color: selected.color, marginLeft: 4 }}>· Uitgewerkt</span>}
          </div>
          <h2 style={{ margin: 0, fontSize: "0.98rem", color: "#f5d9a8", lineHeight: 1.2 }}>{selected.label}</h2>
          <div style={{ color: "#6b4226", fontSize: "0.68rem" }}>{selected.original}</div>
        </div>
        <button onClick={() => setActive(null)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#6b4226", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
      </div>

      <div style={{ height: 1.5, background: selected.color, marginBottom: 12, borderRadius: 2, opacity: 0.5 }} />

      {/* Story */}
      <p style={{ margin: "0 0 10px", lineHeight: 1.75, fontSize: "0.84rem", color: "#e0cda8" }}>{selected.info}</p>

      {/* Detailed storyline (3 fully developed: grafheuvel, grafrituelen, kleding) */}
      {selected.detailed && <DetailedStory id={selected.id} color={selected.color} />}

      {/* Video link */}
      {selected.videoUrl && (
        <a href={selected.videoUrl} target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          marginTop: 6, padding: "7px 12px", borderRadius: 8,
          background: `${selected.color}22`, border: `1px solid ${selected.color}66`,
          color: "#fde2a8", textDecoration: "none", fontSize: "0.8rem", fontWeight: 600,
        }}>
          <Film size={14} /> Bekijk het filmpje
        </a>
      )}

      {/* Game */}
      <GameSection game={selected.game} color={selected.color} difficulty={difficulty} onResult={onGameResult} />

      {/* Navigation */}
      <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
        <button onClick={() => setActive(null)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#6b4226", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 3, fontFamily: "inherit" }}>
          <ChevronLeft size={14} /> Terug
        </button>
        {next && (
          <button onClick={() => openHotspot(next.id)} style={{ flex: 1, background: `${selected.color}22`, border: `1px solid ${selected.color}66`, color: "#f5d9a8", borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 3, fontFamily: "inherit" }}>
            {next.original} <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── DETAILED STORY (3 uitgewerkte verhaallijnen) ─────────────────────────────
const DETAILED_STORIES = {
  1: {
    title: "Hoe wordt een grafheuvel gebouwd?",
    frames: [
      { icon: "🏞️", title: "Een belangrijke plek", text: "De plek wordt zorgvuldig gekozen — vaak hoog in het landschap, zichtbaar van ver." },
      { icon: "⚱️", title: "De begrafenis", text: "Het lichaam wordt in een kuil of houten kist geplaatst, samen met grafgiften zoals aardewerk en sieraden." },
      { icon: "🌾", title: "Plaggen stapelen", text: "Familie en gemeenschap stapelen heideplaggen en zand op tot een ronde heuvel — soms wel meters hoog." },
      { icon: "🌀", title: "De heilige greppel", text: "Een ronde greppel wordt gegraven rondom de heuvel: de scheiding tussen de wereld van de levenden en de doden." },
      { icon: "🕯️", title: "Eeuwig zichtbaar", text: "De heuvel blijft eeuwen staan. Op de Veluwe staan er nog steeds duizenden — soms zichtbaar in het bos!" },
    ],
  },
  2: {
    title: "Het grafritueel stap voor stap",
    frames: [
      { icon: "🫂", title: "Samenkomen", text: "De gemeenschap verzamelt bij de overledene. Verdriet én eer worden samen gedeeld." },
      { icon: "🌿", title: "Voorbereiden", text: "Het lichaam wordt gewassen, gezalfd en versierd met de mooiste sieraden." },
      { icon: "🎁", title: "Grafgiften", text: "Aardewerk met eten en drinken, gereedschap en wapens worden klaargezet — uitrusting voor de reis." },
      { icon: "🔥", title: "Het vuur", text: "Bij crematie wordt een groot vuur ontstoken. Bij begraving brandt een offervuur naast het graf." },
      { icon: "🥁", title: "Muziek en dans", text: "Trommels, gezangen en dans begeleiden het afscheid — een ritueel dat soms dagen duurt." },
      { icon: "⛰️", title: "De heuvel opwerpen", text: "Tot slot wordt de grafheuvel opgeworpen — een blijvend monument voor de voorouder." },
    ],
  },
  3: {
    title: "Hoe maakten zij hun kleding?",
    frames: [
      { icon: "🐑", title: "Wol verzamelen", text: "Schapen worden geschoren. De ruwe wol wordt schoongemaakt en gekamd." },
      { icon: "🌾", title: "Vlas oogsten", text: "Vlasstengels worden geweekt en geklopt — daaruit komen de fijne vezels voor linnen." },
      { icon: "🧵", title: "Spinnen", text: "Met een spinklos draaien vezels tot stevige draden — uren werk per spoel." },
      { icon: "🪡", title: "Weven", text: "Op een houten weefgetouw worden draden gekruist tot stof. Patronen ontstaan met verschillende kleuren." },
      { icon: "🎨", title: "Verven", text: "Planten zoals meekrap (rood), wede (blauw) en walnoten (bruin) geven kleur." },
      { icon: "👗", title: "Naaien & dragen", text: "Stoffen worden tot tunieken, mantels en gordels gemaakt — versierd met bot- of bronzen spelden." },
    ],
  },
};

function DetailedStory({ id, color }) {
  const story = DETAILED_STORIES[id];
  const [frame, setFrame] = useState(0);
  if (!story) return null;
  const f = story.frames[frame];
  return (
    <div style={{
      marginBottom: 12, padding: "12px 12px 10px",
      background: `linear-gradient(135deg, ${color}18, ${color}08)`,
      border: `1px solid ${color}55`, borderRadius: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#fde2a8", fontSize: "0.7rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
        <PlayCircle size={13} /> {story.title}
      </div>
      <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
        {story.frames.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= frame ? color : "rgba(255,255,255,0.12)", transition: "background 0.3s" }} />
        ))}
      </div>
      <div style={{ textAlign: "center", padding: "6px 0" }}>
        <div style={{ fontSize: "2.2rem", marginBottom: 4 }}>{f.icon}</div>
        <div style={{ color: "#fde2a8", fontSize: "0.86rem", fontWeight: 700, marginBottom: 4 }}>{f.title}</div>
        <div style={{ color: "#c8a97a", fontSize: "0.78rem", lineHeight: 1.55 }}>{f.text}</div>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        <button
          onClick={() => setFrame((n) => Math.max(0, n - 1))}
          disabled={frame === 0}
          style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
            color: "#c8a97a", borderRadius: 6, padding: "5px 10px", fontSize: "0.74rem",
            cursor: frame === 0 ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: frame === 0 ? 0.4 : 1,
          }}
        ><ChevronLeft size={12} /></button>
        <button
          onClick={() => setFrame((n) => Math.min(story.frames.length - 1, n + 1))}
          disabled={frame === story.frames.length - 1}
          style={{
            flex: 1, background: `${color}33`, border: `1px solid ${color}88`,
            color: "#fde2a8", borderRadius: 6, padding: "5px 10px", fontSize: "0.74rem",
            cursor: frame === story.frames.length - 1 ? "default" : "pointer", fontFamily: "inherit",
            opacity: frame === story.frames.length - 1 ? 0.6 : 1, fontWeight: 600,
          }}
        >{frame === story.frames.length - 1 ? "✓ Klaar" : "Volgende stap →"}</button>
      </div>
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
function EmptyState({ visited, openHotspot }) {
  return (
    <div className="empty-state">
      <Map size={36} style={{ color: "#c8a97a", margin: "0 auto 10px", display: "block" }} />
      <p style={{ margin: "0 0 6px", fontSize: "0.86rem", lineHeight: 1.65 }}>
        Er zijn <strong style={{ color: "#f5d9a8" }}>10 verhaallijnen</strong> te ontdekken.<br />
        Elk verhaal heeft een <strong style={{ color: "#f5d9a8" }}>🎮 mini-spel</strong>!
      </p>
      <p style={{ margin: "0 0 14px", fontSize: "0.78rem", color: "#6b4226" }}>
        Klik op een hotspot of kies hieronder:
      </p>
      <div>
        {HOTSPOTS.map((h) => {
          const Icon = ICONS[h.id]; const done = visited.has(h.id);
          return (
            <button key={h.id} className="hotspot-btn" style={{ borderLeft: `3px solid ${h.color}`, background: done ? `${h.color}12` : undefined }} onClick={() => openHotspot(h.id)}>
              <Icon style={{ color: h.color }} />
              <span style={{ flex: 1 }}>{h.label}</span>
              <span style={{ color: done ? h.color : "#4a2e14", fontSize: "0.68rem" }}>{done ? "✓" : `#${h.id}`}</span>
            </button>
          );
        })}
      </div>
      {visited.size === HOTSPOTS.length && (
        <div style={{ marginTop: 12, padding: "8px 10px", background: "rgba(200,169,122,0.1)", border: "1px solid #c8a97a33", borderRadius: 8, fontSize: "0.76rem", color: "#c8a97a", lineHeight: 1.6 }}>
          🏆 Je hebt alle 10 verhaallijnen ontdekt! Goed gedaan!
        </div>
      )}
    </div>
  );
}


