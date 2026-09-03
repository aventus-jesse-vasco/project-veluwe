// De acht schoolplaten van "Vensters Veluws Verleden" (Gemeente Apeldoorn).
// Tekeningen: Kimberley Olijslager.
// Alleen plaat 3 is dit jaar in ontwikkeling; de rest staat op slot.

export type Schoolplaat = {
  nummer: number;
  slug: string;
  titel: string;
  locatie: string;
  /** Afbeelding in /public, of null zolang de plaat er nog niet is. */
  afbeelding: string | null;
  /** Alleen een ontgrendelde plaat is aanklikbaar. */
  ontgrendeld: boolean;
};

export const SCHOOLPLATEN: Schoolplaat[] = [
  {
    nummer: 1,
    slug: "vorming-van-het-landschap",
    titel: "Vorming van het landschap en de jagers/verzamelaars",
    locatie: "Nunspeet",
    afbeelding: "/Picture1.png",
    ontgrendeld: false,
  },
  {
    nummer: 2,
    slug: "de-eerste-boeren",
    titel: "De eerste boeren en hun grafheuvelritueel",
    locatie: "Barneveld",
    afbeelding: null,
    ontgrendeld: false,
  },
  {
    nummer: 3,
    slug: "oog-in-oog-met-de-romeinen",
    titel: "Oog in oog met de Romeinen",
    locatie: "Ermelo",
    afbeelding: "/schoolplaat-3-romeinen-800.jpg",
    ontgrendeld: true,
  },
  {
    nummer: 4,
    slug: "de-ijzersterke-middeleeuwen",
    titel: "De ijzersterke middeleeuwen",
    locatie: "Apeldoorn",
    afbeelding: null,
    ontgrendeld: false,
  },
  {
    nummer: 5,
    slug: "ingrijpen-in-het-landschap",
    titel: "Hoe de mens in het landschap ingreep en het Veluws natuurgebied ontstond",
    locatie: "Putten",
    afbeelding: null,
    ontgrendeld: false,
  },
  {
    nummer: 6,
    slug: "beken-sprengen-en-watermolens",
    titel: "Beken, sprengen en watermolens in het Veluws landschap",
    locatie: "Epe",
    afbeelding: null,
    ontgrendeld: false,
  },
  {
    nummer: 7,
    slug: "het-agrarisch-landschap",
    titel: "Het agrarisch landschap van de Veluwe",
    locatie: "Staverden",
    afbeelding: null,
    ontgrendeld: false,
  },
  {
    nummer: 8,
    slug: "oorlog-vrede-en-veiligheid",
    titel: "Oorlog, vrede en veiligheid op de Veluwe",
    locatie: "Locatie nog te bepalen",
    afbeelding: null,
    ontgrendeld: false,
  },
];

export function getSchoolplaat(slug: string) {
  return SCHOOLPLATEN.find((p) => p.slug === slug);
}

// ─── De tien verhaallijnen van schoolplaat 3 ─────────────────────────────────
// Volgorde en titels komen uit de opdrachtomschrijving van de gemeente.

export type Verhaallijn = {
  nummer: number;
  titel: string;
};

export const VERHAALLIJNEN_ROMEINEN: Verhaallijn[] = [
  { nummer: 1, titel: "Romeinse legerkampen op de Veluwe" },
  { nummer: 2, titel: "De verdediging van het legerkamp" },
  { nummer: 3, titel: "De inrichting van het legerkamp" },
  { nummer: 4, titel: "Kleding en uitrusting van de Romeinen" },
  { nummer: 5, titel: "De samenstelling van het Romeins leger" },
  { nummer: 6, titel: "De lokale bevolking, kleding en hoe ze woonden" },
  { nummer: 7, titel: "De meloenkraal en andere vondsten" },
  { nummer: 8, titel: "Het contact tussen de Romeinen en de lokale bevolking" },
  { nummer: 9, titel: "Het molenspel" },
  { nummer: 10, titel: "Het landschap en de dieren" },
];

// De grote versies van plaat 3, gemaakt uit public/Picture1.jpg
export const PLAAT_ROMEINEN_GROOT = "/schoolplaat-3-romeinen-2600.jpg";
