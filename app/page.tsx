import Image from "next/image";
import Link from "next/link";
import { SCHOOLPLATEN, type Schoolplaat } from "./data/schoolplaten";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <main className="mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-20">
        <header className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-500/80">
            Gemeente Apeldoorn · Vakgroep Cultuur &amp; Erfgoed
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-amber-50 sm:text-5xl">
            Vensters Veluws Verleden
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-400">
            Acht schoolplaten over de archeologie en geschiedenis van de Veluwe,
            getekend door Kimberley Olijslager. Kies een plaat om hem interactief
            te verkennen.
          </p>
        </header>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SCHOOLPLATEN.map((plaat) => (
            <li key={plaat.nummer}>
              <PlaatKaart plaat={plaat} />
            </li>
          ))}
        </ul>

        <footer className="mt-20 border-t border-stone-800 pt-8 text-sm text-stone-600">
          <p>
            Vensters Veluws Verleden · Gemeente Apeldoorn – Vakgroep Cultuur &amp;
            Erfgoed
          </p>
          <p className="mt-1">
            Contact: M. Parlevliet · J. Zuyderwyk
          </p>
        </footer>
      </main>
    </div>
  );
}

function PlaatKaart({ plaat }: { plaat: Schoolplaat }) {
  const inhoud = (
    <>
      <div className="relative aspect-16/10 overflow-hidden bg-stone-800">
        {plaat.afbeelding ? (
          <Image
            src={plaat.afbeelding}
            alt={`Schoolplaat ${plaat.nummer}: ${plaat.titel}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={
              plaat.ontgrendeld
                ? "object-cover transition duration-300 group-hover:scale-[1.03]"
                : "object-cover opacity-35 grayscale"
            }
          />
        ) : (
          <NogGeenPlaat />
        )}

        <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-stone-950/85 text-sm font-semibold text-amber-300 ring-1 ring-white/15">
          {plaat.nummer}
        </span>

        {!plaat.ontgrendeld && (
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-stone-950/85 text-stone-400 ring-1 ring-white/10">
            <SlotIcoon />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h2
          className={`text-base font-semibold leading-snug ${
            plaat.ontgrendeld ? "text-amber-50" : "text-stone-400"
          }`}
        >
          {plaat.titel}
        </h2>
        <p className="text-sm text-stone-500">{plaat.locatie}</p>

        <p className="mt-auto pt-3 text-sm font-medium">
          {plaat.ontgrendeld ? (
            <span className="inline-flex items-center gap-1.5 text-amber-400">
              Open de schoolplaat
              <PijlIcoon />
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-stone-600">
              <SlotIcoon />
              Nog niet beschikbaar
            </span>
          )}
        </p>
      </div>
    </>
  );

  const basis =
    "flex h-full flex-col overflow-hidden rounded-2xl border bg-stone-900 transition duration-300";

  if (!plaat.ontgrendeld) {
    return (
      <div
        aria-disabled="true"
        className={`${basis} cursor-not-allowed border-stone-800/70 opacity-70`}
      >
        {inhoud}
      </div>
    );
  }

  return (
    <Link
      href={`/schoolplaat/${plaat.slug}`}
      className={`group ${basis} border-amber-700/40 hover:-translate-y-1 hover:border-amber-500/70 hover:shadow-2xl hover:shadow-amber-950/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400`}
    >
      {inhoud}
    </Link>
  );
}

function NogGeenPlaat() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(135deg,#292524_0px,#292524_10px,#1c1917_10px,#1c1917_20px)]">
      <span className="text-xs uppercase tracking-widest text-stone-600">
        Plaat volgt
      </span>
    </div>
  );
}

function SlotIcoon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function PijlIcoon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
