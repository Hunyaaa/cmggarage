import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Phone, Mail, AlertCircle, Calendar, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_URL =
  "https://script.google.com/macros/s/AKfycbydb6X5rppDYg5uH6U1TEwnGFmgRJWy8ciYgeSf3jp_GZQw-kIrLaPWaC12vUKrQVi1xg/exec";

interface ApiData {
  kod: string;
  megjegyzes: string;
  becsles_tol: string;
  becsles_ig: string;
  kep1: string;
  kep2: string;
  kep3: string;
  statusz: string;
  letrehozas_datum: string;
}

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "result"; data: ApiData };

function formatDate(raw: string): string {
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function renderEstimate(tol: string, ig: string) {
  const hasTol = tol?.trim();
  const hasIg = ig?.trim();
  if (hasTol && hasIg) return `${hasTol} – ${hasIg} Ft`;
  if (hasTol) return `${hasTol} Ft-tól`;
  if (hasIg) return `${hasIg} Ft-ig`;
  return null;
}

const Ajanlat = () => {
  const [code, setCode] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  const handleSearch = async () => {
    const trimmed = code.trim();
    if (!trimmed) {
      setState({ kind: "error", message: "Kérjük, adja meg a kapott kódot." });
      return;
    }

    setState({ kind: "loading" });

    try {
      const res = await fetch(`${API_URL}?kod=${encodeURIComponent(trimmed)}`);
      if (!res.ok) throw new Error("network");
      const json = await res.json();

      if (!json.success) {
        setState({
          kind: "error",
          message:
            json.error === "Hiányzó kód."
              ? "Kérjük, adja meg a kapott kódot."
              : "Nem találtunk ilyen kódot. Ellenőrizze, hogy helyesen írta-e be.",
        });
        return;
      }

      const data = json.data as ApiData;

      if (data.statusz && data.statusz.toLowerCase() !== "aktiv") {
        setState({ kind: "error", message: "Ez a kód jelenleg nem elérhető." });
        return;
      }

      setState({ kind: "result", data });
    } catch {
      setState({
        kind: "error",
        message: "Hiba történt a lekérdezés során. Kérjük, próbálja meg újra később.",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const images =
    state.kind === "result"
      ? [state.data.kep1, state.data.kep2, state.data.kep3].filter((u) => u?.trim())
      : [];

  return (
    <>
      <Helmet>
        <title>Előzetes felmérés megtekintése | C.M.G. PDR & CarPolish Nagykanizsa</title>
        <meta
          name="description"
          content="Nézze meg az autójáról készült előzetes felmérést a kapott egyedi kód segítségével. C.M.G. PDR & CarPolish – Nagykanizsa."
        />
        <link rel="canonical" href="https://www.cmggarage.hu/ajanlat" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-16 bg-background min-h-screen">
        {/* Hero */}
        <section className="container max-w-2xl text-center py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl md:text-5xl text-foreground mb-4">
              Nézze meg az autójáról készült{" "}
              <span className="text-primary">előzetes felmérést</span>
            </h1>
            <p className="font-body text-muted-foreground text-lg mb-2">
              Ha kapott tőlünk egy kártyát, írja be az egyedi kódját, és megmutatjuk az autóján
              talált sérülés előzetes felmérését.
            </p>
            <p className="font-body text-muted-foreground text-sm">
              Az előzetes felmérés nem minősül végleges ajánlatnak, de segít gyorsan elindítani a
              kapcsolatfelvételt.
            </p>
          </motion.div>
        </section>

        {/* Search */}
        <section className="container max-w-lg mb-12">
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Írja be a kódját (pl. A001 vagy 210)"
                  className="bg-secondary text-foreground text-base"
                  autoFocus
                />
                <Button
                  onClick={handleSearch}
                  disabled={state.kind === "loading"}
                  className="rust-gradient text-primary-foreground font-heading uppercase tracking-widest px-6 hover:brightness-110 transition-all shrink-0"
                >
                  {state.kind === "loading" ? (
                    <span className="animate-spin w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-1" />
                      Megnézem
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* States */}
        <section className="container max-w-2xl">
          <AnimatePresence mode="wait">
            {/* Loading */}
            {state.kind === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-32 w-full" />
              </motion.div>
            )}

            {/* Error */}
            {state.kind === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Card className="border-destructive/40">
                  <CardContent className="p-6 flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
                    <p className="font-body text-foreground">{state.message}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Result */}
            {state.kind === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Data card */}
                <Card className="border-primary/30">
                  <CardContent className="p-6 md:p-8 space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-heading text-sm uppercase tracking-widest text-muted-foreground">
                        Kód: <span className="text-primary">{state.data.kod}</span>
                      </span>
                      {state.data.letrehozas_datum && formatDate(state.data.letrehozas_datum) && (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(state.data.letrehozas_datum)}
                        </span>
                      )}
                    </div>

                    <div className="scratch-line w-full" />

                    {/* Description */}
                    <div>
                      <h2 className="font-heading text-lg uppercase tracking-wider text-foreground mb-2">
                        Sérülés leírása
                      </h2>
                      <p className="font-body text-muted-foreground text-base leading-relaxed">
                        {state.data.megjegyzes || "Nincs részletes leírás."}
                      </p>
                    </div>

                    {/* Estimate */}
                    <div>
                      <h2 className="font-heading text-lg uppercase tracking-wider text-foreground mb-2">
                        Előzetes becslés
                      </h2>
                      {renderEstimate(state.data.becsles_tol, state.data.becsles_ig) ? (
                        <p className="font-display text-2xl text-primary">
                          {renderEstimate(state.data.becsles_tol, state.data.becsles_ig)}
                        </p>
                      ) : (
                        <p className="font-body text-muted-foreground">
                          Pontos árajánlathoz vegye fel velünk a kapcsolatot.
                        </p>
                      )}
                    </div>

                    {/* Images */}
                    {images.length > 0 && (
                      <div>
                        <h2 className="font-heading text-lg uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                          <ImageIcon className="w-5 h-5 text-primary" />
                          Fotók
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {images.map((url, i) => (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block overflow-hidden border border-border rounded group"
                            >
                              <img
                                src={url}
                                alt={`Sérülés fotó ${i + 1}`}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* CTA */}
                <Card className="border-primary/20 bg-card">
                  <CardContent className="p-6 md:p-8 text-center space-y-4">
                    <h2 className="font-display text-2xl text-foreground">
                      Szeretne pontos ajánlatot?
                    </h2>
                    <p className="font-body text-muted-foreground max-w-md mx-auto">
                      Vegye fel velünk a kapcsolatot, és segítünk a horpadás gyors javításában.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                      <a
                        href="tel:+36304418737"
                        className="rust-gradient text-primary-foreground font-heading text-lg uppercase tracking-widest px-8 py-3.5 hover:brightness-110 transition-all border border-primary/30 flex items-center justify-center gap-2"
                      >
                        <Phone className="w-5 h-5" />
                        Telefonálok
                      </a>
                      <a
                        href="/#contact"
                        className="font-heading text-lg uppercase tracking-widest px-8 py-3.5 border border-primary/50 text-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
                      >
                        <Mail className="w-5 h-5" />
                        Üzenetet küldök
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Disclaimer */}
                <p className="text-center text-xs text-muted-foreground max-w-lg mx-auto">
                  Az itt megjelenő információk előzetes tájékoztatásnak minősülnek, a végleges
                  ajánlat személyes vagy további fotók alapján pontosítható.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Ajanlat;
