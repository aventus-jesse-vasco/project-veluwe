import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SCHOOLPLATEN,
  PLAAT_ROMEINEN_GROOT,
  VERHAALLIJNEN_ROMEINEN,
  getSchoolplaat,
} from "../../data/schoolplaten";

export function generateStaticParams() {
  return SCHOOLPLATEN.filter((p) => p.ontgrendeld).map((p) => ({
    slug: p.slug,
  }));
}

export default async function SchoolplaatPagina({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plaat = getSchoolplaat(slug);

  // Platen die nog op slot staan, hebben geen pagina.
  if (!plaat || !plaat.ontgrendeld) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-stone-950 text-stone-100 xl:h-screen xl:flex-row xl:overflow-hidden">
      {/* ── Menu links van de plaat ── */}
      <aside className="flex shrink-0 flex-col border-b border-stone-800 bg-stone-900 xl:h-full xl:w-88 xl:border-b-0 xl:border-r">
        <div className="border-b border-stone-800 p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-stone-400 transition hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            <PijlTerugIcoon />
            Alle schoolplaten
          </Link>

          <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-amber-500/80">
            Schoolplaat {plaat.nummer} · {plaat.locatie}
          </p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight text-amber-50">
            {plaat.titel}
          </h1>
        </div>

        <nav
          aria-label="Verhaallijnen"
          className="flex-1 overflow-y-auto p-4 xl:p-5"
        >
          <h2 className="px-2 pb-3 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            De tien verhaallijnen
          </h2>
          <ol className="flex flex-col gap-1">
            {VERHAALLIJNEN_ROMEINEN.map((lijn) => (
              <li
                key={lijn.nummer}
                className="flex items-start gap-3 rounded-lg px-2 py-2.5 text-sm leading-snug text-stone-300"
              >
                <span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-800 text-xs font-semibold text-amber-300">
                  {lijn.nummer}
                </span>
                <span>{lijn.titel}</span>
              </li>
            ))}
          </ol>
        </nav>

        <div className="hidden border-t border-stone-800 p-5 text-xs leading-relaxed text-stone-600 xl:block">
          Vensters Veluws Verleden · Gemeente Apeldoorn
          <br />
          Tekening: Kimberley Olijslager
        </div>
      </aside>

      {/* ── De schoolplaat, volledig in beeld ── */}
      <main className="flex items-center justify-center overflow-hidden p-4 sm:p-6 xl:flex-1 xl:p-8">
        <div className="relative aspect-[1.603] max-h-[78vh] w-full xl:aspect-auto xl:max-h-none xl:h-full">
          <Image
            src={PLAAT_ROMEINEN_GROOT}
            alt={`Schoolplaat ${plaat.nummer}: ${plaat.titel}`}
            fill
            sizes="(max-width: 1280px) 100vw, calc(100vw - 22rem)"
            className="object-contain"
            priority
          />
        </div>
      </main>
    </div>
  );
}

function PijlTerugIcoon() {
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
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}
