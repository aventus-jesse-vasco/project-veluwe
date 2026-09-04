// Punten (POI's) per schoolplaat. x/y zijn percentages van de afbeelding.
// Elk punt heeft één spel: "quiz" (4 opties), "order" (volgorde), "match" (koppelen)
// of "multiquiz" (meerdere vragen na elkaar). Optioneel: "video" (YouTube) die eerst
// wordt getoond voordat het spel begint.

export const BOEREN_POIS = [
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

// Romeinen: marskamp op de Veluwe (o.a. Ermelo). Punten volgen de plaat:
// soldaat met schild rechtsboven, gracht en wal met puntpalen rechts,
// ontmoeting op het pad in het midden, molenspel en kralen linksonder.
export const ROMEINEN_POIS = [
  {
    id: 1, label: "Legerkampen op de Veluwe", emoji: "⛺", x: 47, y: 37, color: "#b91c1c",
    game: { type: "quiz", q: "Hoe lang bleven de Romeinen in zo'n marskamp?", opts: [
      { e: "🌙", label: "Een paar nachten", correct: true  },
      { e: "🏰", label: "Voor altijd",      correct: false },
      { e: "⏳", label: "Honderd jaar",     correct: false },
      { e: "⏱️", label: "Eén minuut",       correct: false },
    ]},
  },
  {
    id: 2, label: "Verdediging van het kamp", emoji: "🛡️", x: 59, y: 76, color: "#374151",
    game: { type: "order", title: "Zo verdedig je het kamp", items: [
      { e: "📏", label: "Kamp uitmeten",   order: 1 },
      { e: "⛏️", label: "Gracht graven",   order: 2 },
      { e: "⛰️", label: "Wal opwerpen",    order: 3 },
      { e: "🪵", label: "Puntpalen erin",  order: 4 },
      { e: "👀", label: "Wacht lopen",     order: 5 },
    ]},
  },
  {
    id: 3, label: "Inrichting van het kamp", emoji: "🗺️", x: 88, y: 72, color: "#0e7490",
    game: { type: "quiz", q: "Welke vorm had een Romeins legerkamp?", opts: [
      { e: "🟥", label: "Rechthoek", correct: true  },
      { e: "⭐", label: "Ster",      correct: false },
      { e: "🔺", label: "Driehoek",  correct: false },
      { e: "🌀", label: "Spiraal",   correct: false },
    ]},
  },
  {
    id: 4, label: "Kleding & uitrusting", emoji: "🪖", x: 82, y: 36, color: "#b45309",
    game: { type: "match", title: "Waar draagt de soldaat het?", pairs: [
      { a: { e: "🪖", label: "Helm"     }, b: { e: "🧠", label: "Hoofd"  }},
      { a: { e: "🛡️", label: "Schild"   }, b: { e: "💪", label: "Arm"    }},
      { a: { e: "🥋", label: "Harnas"   }, b: { e: "🫁", label: "Borst"  }},
      { a: { e: "🩴", label: "Sandalen" }, b: { e: "🦶", label: "Voeten" }},
    ]},
  },
  {
    id: 5, label: "Het Romeinse leger", emoji: "🦅", x: 61, y: 43, color: "#7f1d1d",
    game: { type: "quiz", q: "Hoe heet een groep van wel 5000 Romeinse soldaten?", opts: [
      { e: "🦅", label: "Legioen",  correct: true  },
      { e: "🎒", label: "Klas",     correct: false },
      { e: "🎺", label: "Fanfare",  correct: false },
      { e: "👨‍👩‍👧", label: "Gezin", correct: false },
    ]},
  },
  {
    id: 6, label: "De lokale bevolking", emoji: "🏠", x: 39, y: 44, color: "#15803d",
    game: { type: "match", title: "Waar is het van gemaakt?", pairs: [
      { a: { e: "🏠", label: "Dak"      }, b: { e: "🌾", label: "Riet"        }},
      { a: { e: "🧱", label: "Muur"     }, b: { e: "🪵", label: "Hout en leem" }},
      { a: { e: "👕", label: "Kleding"  }, b: { e: "🐑", label: "Wol"         }},
      { a: { e: "👞", label: "Schoenen" }, b: { e: "🐄", label: "Leer"        }},
    ]},
  },
  {
    id: 7, label: "De meloenkraal", emoji: "📿", x: 38, y: 71, color: "#0f766e",
    game: { type: "quiz", q: "Waarom heet de meloenkraal zo?", opts: [
      { e: "🍈", label: "Ribbels als een meloen", correct: true  },
      { e: "😋", label: "Smaakt naar meloen",     correct: false },
      { e: "🎈", label: "Zo groot als een meloen", correct: false },
      { e: "🌳", label: "Groeit aan een boom",    correct: false },
    ]},
  },
  {
    id: 8, label: "Romeinen & bewoners", emoji: "🤝", x: 52, y: 47, color: "#c2410c",
    game: { type: "order", title: "Ruilen met de Romeinen", items: [
      { e: "👋", label: "Hallo zeggen",       order: 1 },
      { e: "🧺", label: "Spullen laten zien", order: 2 },
      { e: "🪙", label: "Prijs afspreken",    order: 3 },
      { e: "🤝", label: "Ruilen",             order: 4 },
      { e: "🏠", label: "Naar huis",          order: 5 },
    ]},
  },
  {
    id: 9, label: "Het molenspel", emoji: "🎲", x: 28, y: 79, color: "#6d28d9",
    game: { type: "order", title: "Zo speel je het molenspel", items: [
      { e: "✏️", label: "Bord in het zand",    order: 1 },
      { e: "🪨", label: "Steentjes zoeken",    order: 2 },
      { e: "🔁", label: "Om de beurt leggen",  order: 3 },
      { e: "3️⃣", label: "Drie op een rij",     order: 4 },
      { e: "🏆", label: "Steentje afpakken",   order: 5 },
    ]},
  },
  {
    id: 10, label: "Landschap & dieren", emoji: "🦅", x: 71, y: 21, color: "#0369a1",
    // Eerst de wandelvlog over de Ermelose heide bekijken, daarna de quiz.
    video: {
      youtubeId: "gquwxevC2LM",
      title: "Romeinse Marskamp Route",
      subtitle: "Wandelvlog 5 · Ermelose heide",
    },
    game: { type: "multiquiz", title: "Quiz over het marskamp", questions: [
      { q: "Bij welke plaats op de Veluwe is het bekendste Romeinse marskamp gevonden?", opts: [
        { e: "🏕️", label: "Ermelo",    correct: true  },
        { e: "🏙️", label: "Apeldoorn", correct: false },
        { e: "🏰", label: "Arnhem",    correct: false },
        { e: "🌲", label: "Ede",       correct: false },
      ]},
      { q: "Hoeveel Romeinse soldaten verbleven er in het marskamp?", opts: [
        { e: "👥", label: "5.000 tot 6.000", correct: true  },
        { e: "🧍", label: "Ongeveer 50",     correct: false },
        { e: "👨‍👩‍👧", label: "Ongeveer 500",  correct: false },
        { e: "🏟️", label: "Een miljoen",     correct: false },
      ]},
      { q: "In welke eeuw werd het marskamp aangelegd?", opts: [
        { e: "2️⃣", label: "Tweede eeuw na Christus",  correct: true  },
        { e: "🕰️", label: "Eerste eeuw voor Christus", correct: false },
        { e: "🏰", label: "In de Middeleeuwen",       correct: false },
        { e: "📅", label: "Vorig jaar",               correct: false },
      ]},
      { q: "Welke vorm hadden de grachten rond het marskamp?", opts: [
        { e: "🔻", label: "Een V-vorm",   correct: true  },
        { e: "🟦", label: "Een U-vorm",   correct: false },
        { e: "⭕", label: "Een ronde vorm", correct: false },
        { e: "📐", label: "Een vierkant", correct: false },
      ]},
      { q: "Hoeveel kilometer legde een legioen per dag af in vijandelijk gebied?", opts: [
        { e: "🥾", label: "Ongeveer 15 km",  correct: true  },
        { e: "🐌", label: "Ongeveer 1 km",   correct: false },
        { e: "🚗", label: "Ongeveer 100 km", correct: false },
        { e: "🚀", label: "Ongeveer 500 km", correct: false },
      ]},
    ]},
  },
];
