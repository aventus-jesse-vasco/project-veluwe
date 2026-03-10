export default function Home() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-transparent">
        <div className="flex items-center gap-2">
          <TreeIcon />
          <span
            className="text-white text-xl font-bold tracking-wide"
            style={{ fontFamily: "var(--font-playfair), serif", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            De Veluwe
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Natuur", "Activiteiten", "Bezienswaardigheden", "Verblijf"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium hover:bg-white/25 transition-all"
        >
          Plan je bezoek
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background gradient forest */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, #0a2e13 0%, #1a4726 25%, #2d6a4f 55%, #1e5c30 75%, #132b18 100%)",
          }}
        />
        {/* Mist overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 60% at 50% 100%, rgba(180,220,180,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Sun rays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 60% 20%, rgba(255,230,120,0.08) 0%, transparent 60%)",
          }}
        />
        {/* Tree silhouettes bottom */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 1440 280"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Back trees – darker */}
          <g fill="#0c2710" opacity="0.8">
            {[0,80,180,290,410,550,680,810,940,1060,1160,1280,1380].map((x, i) => (
              <polygon key={i} points={`${x},280 ${x+40},${140-i*3%40} ${x+80},280`} />
            ))}
          </g>
          {/* Front trees – darkest */}
          <g fill="#071a0a">
            {[-20,60,140,230,320,440,560,660,760,860,980,1100,1220,1340,1420].map((x, i) => (
              <polygon key={i} points={`${x+10},280 ${x+45},${100+i*5%60} ${x+90},280`} />
            ))}
          </g>
        </svg>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-medium tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Nationaal Landschap · Gelderland
          </div>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6"
            style={{ fontFamily: "var(--font-playfair), serif", textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
          >
            De Veluwe
          </h1>
          <p
            className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            Het grootste aaneengesloten natuurgebied van Nederland. Uitgestrekte bossen,
            gouden heidevelden en wilde dieren wachten op je.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#natuur"
              className="px-8 py-4 rounded-full bg-green-500 hover:bg-green-400 text-white font-semibold text-base transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(74,197,130,0.4)]"
            >
              Ontdek de natuur
            </a>
            <a
              href="#activiteiten"
              className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-semibold text-base transition-all"
            >
              Plan je avontuur →
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-[#1a4726] text-white py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "100.000", label: "Hectare natuur", icon: "🌲" },
            { num: "1.200+", label: "km fiets- & wandelpad", icon: "🚴" },
            { num: "5.000+", label: "jaar bewoningsgeschiedenis", icon: "🏺" },
            { num: "50+", label: "bijzondere diersoorten", icon: "🦌" },
          ].map(({ num, label, icon }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl mb-1">{icon}</span>
              <span
                className="text-3xl md:text-4xl font-bold text-green-300"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {num}
              </span>
              <span className="text-white/60 text-xs uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Natuur & Highlights ── */}
      <section id="natuur" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Wat maakt de Veluwe uniek</span>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-3"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Natuur in zijn puurste vorm
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-base leading-relaxed">
            Van dichte dennenbossen tot open stuifzanden en paarse heidevelden —
            de Veluwe biedt een rijkdom aan landschappen die nergens anders te vinden is.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Bossen & Heidevelden",
              desc: "Wandel door eindeloze dennenbossen of bewonder het paarse tapijt van bloeiende heide in augustus en september.",
              gradient: "from-[#1a4726] to-[#40916c]",
              icon: "🌲",
              tag: "Landschap",
            },
            {
              title: "Wilde Dieren",
              desc: "Ontmoet edelherten, reeën, wilde zwijnen en de zeldzame Veluwerand. De Veluwe telt meer dan 50 inheemse zoogdiersoorten.",
              gradient: "from-[#3d2b1f] to-[#8b5e3c]",
              icon: "🦌",
              tag: "Wildlife",
            },
            {
              title: "Stuifzanden",
              desc: "Het Kootwijkerzand is het grootste binnenstuifzand van West-Europa — een spectaculair woestijnlandschap midden in Nederland.",
              gradient: "from-[#5c4a1e] to-[#c8962a]",
              icon: "🏜️",
              tag: "Uniek",
            },
          ].map(({ title, desc, gradient, icon, tag }) => (
            <div
              key={title}
              className="group relative rounded-3xl overflow-hidden cursor-pointer"
              style={{ minHeight: 380 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
              {/* Texture overlay */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }} />
              <div className="relative p-8 h-full flex flex-col justify-between" style={{ minHeight: 380 }}>
                <div>
                  <span className="inline-flex px-3 py-1 rounded-full bg-white/15 text-white/80 text-xs font-medium uppercase tracking-wider mb-6">
                    {tag}
                  </span>
                  <div className="text-5xl mb-4">{icon}</div>
                  <h3
                    className="text-2xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-white/60 group-hover:text-white/90 text-sm font-medium transition-colors">
                  Meer ontdekken
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured: Nationaal Park Hoge Veluwe ── */}
      <section className="bg-[#f5f0e8] py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="relative">
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #2d6a4f 0%, #1a4726 40%, #40916c 70%, #52b788 100%)",
                aspectRatio: "4/3",
              }}
            >
              <div className="absolute inset-0 flex items-end p-8">
                <svg viewBox="0 0 400 300" className="w-full opacity-30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  {/* Simplified park map silhouette */}
                  <ellipse cx="200" cy="150" rx="180" ry="120" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                  <path d="M80,150 Q120,80 200,60 Q280,80 320,150 Q280,220 200,240 Q120,220 80,150Z" fill="white" opacity="0.1" />
                  <text x="200" y="155" textAnchor="middle" fill="white" fontSize="14" opacity="0.6" fontFamily="serif">Nationaal Park</text>
                  <text x="200" y="175" textAnchor="middle" fill="white" fontSize="12" opacity="0.4" fontFamily="serif">Hoge Veluwe</text>
                </svg>
              </div>
              {/* Decorative trees */}
              <div className="absolute top-6 left-6 text-4xl opacity-60">🌲</div>
              <div className="absolute top-10 right-10 text-3xl opacity-40">🌳</div>
              <div className="absolute bottom-16 left-12 text-2xl opacity-50">🦌</div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-3">
              <span className="text-2xl">🎨</span>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Binnen het park</div>
                <div className="text-sm font-semibold text-gray-800">Kröller-Müller Museum</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Iconische bestemming</span>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Nationaal Park<br />Hoge Veluwe
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Het kroonjuweel van de Veluwe: 5.400 hectare ongerepte natuur,
              afgewisseld met zandverstuivingen, bossen en heidevelden.
              Een paradijs voor wandelaars, fietsers en natuurliefhebbers.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Beleef het park op de witte fietsen die gratis voor bezoekers beschikbaar zijn,
              of bezoek het wereldberoemde Kröller-Müller Museum met zijn indrukwekkende
              collectie Van Gogh-schilderijen.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Oppervlakte", val: "5.400 ha" },
                { label: "Witte fietsen", val: "1.700+" },
                { label: "Van Gogh werken", val: "90+" },
                { label: "Bezoekerscentra", val: "3" },
              ].map(({ label, val }) => (
                <div key={label} className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="text-xl font-bold text-[#1a4726]" style={{ fontFamily: "var(--font-playfair), serif" }}>{val}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">{label}</div>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a4726] hover:bg-[#2d6a4f] text-white rounded-full font-semibold transition-colors"
            >
              Bezoek het park →
            </a>
          </div>
        </div>
      </section>

      {/* ── Activiteiten ── */}
      <section id="activiteiten" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Voor iedereen iets</span>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-3"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Activiteiten op de Veluwe
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: "🚴", title: "Fietsen", desc: "Meer dan 1.200 km aan fietspaden door bos en hei.", color: "#d1fae5" },
            { icon: "🥾", title: "Wandelen", desc: "Van korte natuurwandelingen tot meerdaagse trektochten.", color: "#dbeafe" },
            { icon: "🏕️", title: "Kamperen", desc: "Overnacht onder de sterren in de hart van de natuur.", color: "#fef3c7" },
            { icon: "🔭", title: "Sterrenkijken", desc: "De Veluwe heeft donkere luchten, perfect voor sterrenamateurs.", color: "#ede9fe" },
            { icon: "🦅", title: "Vogelspotten", desc: "Observeer zeldzame soorten zoals de wespendief en klapekster.", color: "#fce7f3" },
            { icon: "🏊", title: "Zwemmen", desc: "Verfrissende recreatieplassen verspreid over het gebied.", color: "#cffafe" },
            { icon: "🎨", title: "Cultuur", desc: "Musea, historische landhuizen en kunstcollecties.", color: "#fef9c3" },
            { icon: "🌅", title: "Zonsopgang", desc: "De meest spectaculaire zonsopgangen van Nederland.", color: "#ffe4e6" },
          ].map(({ icon, title, desc, color }) => (
            <div
              key={title}
              className="group rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all cursor-pointer"
              style={{ backgroundColor: color + "50" }}
            >
              <span className="text-4xl mb-4 block">{icon}</span>
              <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bezienswaardigheden ── */}
      <section id="bezienswaardigheden" className="bg-gray-950 text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-widest">Niet te missen</span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mt-3"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Bezienswaardigheden
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Paleis Het Loo",
                place: "Apeldoorn",
                desc: "Het voormalige koninklijk paleis en jachtslot omgeven door prachtige baroktuinen. Een must-see voor liefhebbers van geschiedenis en architectuur.",
                color: "#1a4726",
              },
              {
                num: "02",
                title: "Kröller-Müller Museum",
                place: "Nationaal Park Hoge Veluwe",
                desc: "Een van de grootste Van Gogh collecties ter wereld, gecombineerd met een adembenemend beeldentuin van 26 hectare in het bos.",
                color: "#3b1f5e",
              },
              {
                num: "03",
                title: "Kootwijkerzand",
                place: "Kootwijk",
                desc: "Het grootste binnenstuifzand van West-Europa. Een surreëel landschap van witte zandduinen omringd door donker dennenbos.",
                color: "#5c3a1e",
              },
              {
                num: "04",
                title: "Otterlo",
                place: "Gelderland",
                desc: "Schilderachtig dorp met authentieke Veluwse architectuur, lokale winkels en het bekende Museumplein als vertrekpunt.",
                color: "#1e3a4a",
              },
              {
                num: "05",
                title: "Burgers' Zoo",
                place: "Arnhem",
                desc: "Een van de meest bijzondere dierentuinen van Europa met indrukwekkende ecosystemen en unieke dierenparken.",
                color: "#2d4a1e",
              },
              {
                num: "06",
                title: "Airborne Museum",
                place: "Arnhem",
                desc: "Herdenkingsmuseum over de Slag om Arnhem in 1944. Een ontroerend en informatief monument voor de gevallen soldaten.",
                color: "#4a1e1e",
              },
            ].map(({ num, title, place, desc, color }) => (
              <div
                key={title}
                className="group relative rounded-2xl p-7 border border-white/5 hover:border-white/15 transition-all cursor-pointer overflow-hidden"
                style={{ backgroundColor: color + "80" }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${color}ff 0%, transparent 70%)` }}
                />
                <div className="relative">
                  <div className="text-white/20 text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {num}
                  </div>
                  <div className="text-green-400 text-xs uppercase tracking-wider mb-2">{place}</div>
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Seizoenen ── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Het hele jaar door mooi</span>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-3"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Elk seizoen een belevenis
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              season: "Lente",
              months: "Mrt – Mei",
              desc: "Jonge dieren, bloeiende struiken en het bos ontwaakt. Ideaal voor vogelspotten en fietsen.",
              gradient: "from-[#d1fae5] to-[#a7f3d0]",
              textColor: "text-green-800",
              icon: "🌸",
            },
            {
              season: "Zomer",
              months: "Jun – Aug",
              desc: "Lange zonnige dagen, zwemmen in de meren en genieten van de uitgestrekte natuur.",
              gradient: "from-[#fef9c3] to-[#fde68a]",
              textColor: "text-yellow-800",
              icon: "☀️",
            },
            {
              season: "Herfst",
              months: "Sep – Nov",
              desc: "De beroemde bronst van de edelherten, kleurrijke bossen en bloeiende heide.",
              gradient: "from-[#fee2e2] to-[#fecaca]",
              textColor: "text-red-800",
              icon: "🍂",
              highlight: true,
            },
            {
              season: "Winter",
              months: "Dec – Feb",
              desc: "Mistige sfeer, berijpte bomen en rustige wandelpaden. De Veluwe op z'n mysterieuws.",
              gradient: "from-[#dbeafe] to-[#bfdbfe]",
              textColor: "text-blue-800",
              icon: "❄️",
            },
          ].map(({ season, months, desc, gradient, textColor, icon, highlight }) => (
            <div
              key={season}
              className={`relative rounded-3xl p-7 bg-gradient-to-br ${gradient} ${highlight ? "ring-2 ring-orange-400" : ""}`}
            >
              {highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full uppercase tracking-wider whitespace-nowrap">
                  Meest populair
                </div>
              )}
              <span className="text-4xl block mb-4">{icon}</span>
              <div className={`text-xs font-semibold uppercase tracking-widest ${textColor} opacity-60 mb-1`}>{months}</div>
              <h3 className={`text-2xl font-bold ${textColor} mb-3`} style={{ fontFamily: "var(--font-playfair), serif" }}>
                {season}
              </h3>
              <p className={`${textColor} opacity-70 text-sm leading-relaxed`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quote ── */}
      <section
        className="py-24 px-6 text-white text-center"
        style={{ background: "linear-gradient(135deg, #1a4726 0%, #2d6a4f 50%, #1e5c30 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-6xl mb-8 opacity-30" style={{ fontFamily: "Georgia, serif" }}>"</div>
          <blockquote
            className="text-2xl md:text-3xl font-medium leading-relaxed text-white/90 mb-8"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            De Veluwe is niet zomaar een natuurgebied.
            Het is een belofte — van rust, van ruimte,
            van het echte Nederland.
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-px bg-white/30" />
            <span className="text-white/50 text-sm tracking-wider uppercase">Veluwe Magazine</span>
            <div className="w-10 h-px bg-white/30" />
          </div>
        </div>
      </section>

      {/* ── Verblijf ── */}
      <section id="verblijf" className="py-24 px-6 bg-[#f8f6f0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">Slaap in de natuur</span>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mt-3"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Verblijfsmogelijkheden
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏕️",
                type: "Glamping & Kamperen",
                desc: "Van eenvoudige kampeerplaatsen tot luxe glamping-tenten diep in het bos. Ontwaken met vogelgezang inbegrepen.",
                price: "Vanaf €35 / nacht",
                bg: "#e8f5e9",
              },
              {
                icon: "🏡",
                type: "Vakantiehuizen",
                desc: "Sfeervolle boshuisjes en luxe villa's verspreid over het Veluwse landschap. Compleet ingericht voor een perfect verblijf.",
                price: "Vanaf €120 / nacht",
                bg: "#fff8e1",
                featured: true,
              },
              {
                icon: "🏨",
                type: "Hotels & Landgoederen",
                desc: "Historische landgoederen en sfeervolle hotels aan de rand van het bos. Luxe en natuur in perfecte harmonie.",
                price: "Vanaf €95 / nacht",
                bg: "#e3f2fd",
              },
            ].map(({ icon, type, desc, price, bg, featured }) => (
              <div
                key={type}
                className={`rounded-3xl p-8 border-2 ${featured ? "border-green-400 shadow-xl shadow-green-100" : "border-transparent"}`}
                style={{ backgroundColor: bg }}
              >
                <span className="text-5xl block mb-5">{icon}</span>
                {featured && (
                  <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                    Meest gekozen
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  {type}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-700 font-semibold text-sm">{price}</span>
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors">
                    Bekijk →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="py-24 px-6 bg-gray-950 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-4xl block mb-6">🌲</span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Klaar voor je Veluwe-avontuur?
          </h2>
          <p className="text-white/60 mb-10 leading-relaxed text-lg">
            Laat je inspireren, plan je route en ontdek waarom de Veluwe
            jaar na jaar miljoenen bezoekers trekt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="px-8 py-4 rounded-full bg-green-500 hover:bg-green-400 text-white font-semibold transition-all hover:scale-105"
            >
              Plan mijn bezoek
            </a>
            <a
              href="#"
              className="px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-white font-semibold transition-all"
            >
              Download routegids
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-black text-white/40 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <TreeIcon className="text-green-600" />
            <span className="text-white text-lg font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>
              De Veluwe
            </span>
          </div>
          <div className="flex gap-8 text-sm">
            {["Privacy", "Contact", "Sitemap", "Partners"].map((item) => (
              <a key={item} href="#" className="hover:text-white/70 transition-colors">
                {item}
              </a>
            ))}
          </div>
          <p className="text-sm text-center md:text-right">
            © 2026 De Veluwe · Gelderland, Nederland
          </p>
        </div>
      </footer>
    </div>
  );
}

function TreeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`text-green-400 ${className}`}
      aria-hidden="true"
    >
      <path d="M12 2L4 9h3l-3 5h4l-3 5h6v3h2v-3h6l-3-5h4l-3-5h3L12 2z" />
    </svg>
  );
}
