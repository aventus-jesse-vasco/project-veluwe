"use client";

import { useState, useCallback } from "react";
import Startscherm, { PLATEN } from "./components/Startscherm";
import InteractiveSchoolplaat from "./components/InteractiveSchoolplaat";

export default function Page() {
  const [view, setView] = useState<{ kind: "start" } | { kind: "plaat"; id: number }>({ kind: "start" });

  const handleOpen = useCallback((id: number) => setView({ kind: "plaat", id }), []);
  const handleBack = useCallback(() => setView({ kind: "start" }), []);

  if (view.kind === "start") return <Startscherm onOpen={handleOpen} />;
  const plaat = PLATEN.find((p) => p.id === view.id);
  return <InteractiveSchoolplaat onBack={handleBack} image={plaat?.image ?? "/Picture1.png"} pois={plaat?.pois} />;
}
