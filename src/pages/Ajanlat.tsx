import { Helmet } from "react-helmet-async";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Phone, MessageCircle, AlertCircle, Calendar, ImageIcon, ArrowLeft, CheckCircle, Zap, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzBvscKehCduv9K3ClDEwiaWy0-65PYcdPEczP7RAnHfhmw3dnTRUC4xYzF-1XgNctDlg/exec";

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
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  const handleSearch = async () => {
    const trimmed = code.trim();
    if (!trimmed) {
      setState({ kind: "error", message: "Írd be a kódot, amit kaptál a kártyán." });
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
              ? "Írd be a kódot, amit kaptál a kártyán."
              : "Ilyen kódot nem találok. Nézd meg, hogy jól írtad-e be!",
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
        message: "Valami hiba történt. Próbáld meg kicsit később!",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const images =
    state.kind === "result"
      ? [state.data.kep1, state.data.kep2, state.data.kep3].filter(
          (u): u is string => typeof u === "string" && u.trim().length > 0
        )
      : [];

  return (
    <>
      <Helmet>
        <title>Sérülés felmérés és árajánlat | C.M.G. PDR & CarPolish Nagykanizsa</title>
        <meta
          name="description"
          content="Nézd meg az autódon talált sérülés előzetes felmérését és kérj pontos árajánlatot horpadás javításra, karosszéria javításra. C.M.G. PDR – Nagykanizsa."
        />
        <link rel="canonical" href="https://www.cmggarage.hu/ajanlat" />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-16 bg-background min-h-screen">
        {/* Back link */}
        <section className="container max-w-2xl pt-4">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-heading uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Vissza a főoldalra
          </a>
        </section>

        {/* Hero */}
        <section className="container max-w-2xl text-center py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl md:text-5xl text-foreground mb-4">
              Megnéztem az autódat –{" "}
              <span className="text-primary">itt a felmérés</span>
            </h1>
            <p className="font-body text-muted-foreground text-lg mb-2">
              Kaptál tőlem egy kártyát? Írd be a kódot, és megmutatom, mit találtam.
            </p>
            <p className="font-body text-muted-foreground text-sm">
              Ez egy gyors, előzetes becslés – nem kötelez semmire.
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
                  placeholder="Írd be a kódot (pl. A001 vagy 210)"
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
                  <CardContent className="p-6 md:p-8 space-y-6">
                    {/* 1. Code + date */}
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

                    {/* 2. Description */}
                    <div>
                      <h2 className="font-heading text-lg uppercase tracking-wider text-foreground mb-2">
                        Ezt találtam
                      </h2>
                      <p className="font-body text-muted-foreground text-base leading-relaxed">
                        {state.data.megjegyzes || "Részletes leírás a személyes felméréskor."}
                      </p>
                    </div>

                    {/* 3. Estimate */}
                    <div>
                      <h2 className="font-heading text-lg uppercase tracking-wider text-foreground mb-2">
                        Ez alapján kb. ennyire számolj
                      </h2>
                      {renderEstimate(state.data.becsles_tol, state.data.becsles_ig) ? (
                        <p className="font-display text-2xl md:text-3xl text-primary">
                          {renderEstimate(state.data.becsles_tol, state.data.becsles_ig)}
                        </p>
                      ) : (
                        <p className="font-body text-muted-foreground">
                          Pontos árhoz dobj egy üzenetet, és mondok egy korrekt számot.
                        </p>
                      )}
                      <p className="font-body text-sm text-muted-foreground mt-2">
                        Ez egy gyors becslés a sérülés alapján – a végleges ár a személyes megtekintés után alakul ki.
                      </p>
                    </div>

                    {/* 4. Photos */}
                    {images.length > 0 && (
                      <div>
                        <h2 className="font-heading text-lg uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                          <ImageIcon className="w-5 h-5 text-primary" />
                          Fotók a sérülésről
                        </h2>
                        <div className={`grid gap-4 ${images.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
                          {images.map((url, i) => (
                            <div
                              key={i}
                              className="relative group cursor-pointer"
                              onClick={() => setLightboxSrc(url)}
                            >
                              <img
                                src={url}
                                alt={`Sérülés fotó ${i + 1} – karosszéria javítás`}
                                className="w-full max-w-full block rounded-xl object-cover transition-opacity group-hover:opacity-90"
                                style={{ height: "auto" }}
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  target.style.display = "none";
                                  const fallback = document.createElement("p");
                                  fallback.textContent = "A kép jelenleg nem tölthető be.";
                                  fallback.className = "text-sm text-muted-foreground";
                                  target.parentElement?.appendChild(fallback);
                                }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl bg-black/20">
                                <span className="bg-black/60 text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                  <ImageIcon className="w-4 h-4" /> Nagyítás
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 5. Conversion block */}
                <Card className="border-primary/20 bg-card">
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <h2 className="font-display text-2xl md:text-3xl text-foreground text-center">
                      Szeretnél <span className="text-primary">pontos árat</span>?
                    </h2>

                    <p className="font-body text-muted-foreground text-center max-w-md mx-auto text-base leading-relaxed">
                      Ez csak egy gyors becslés. Ha akarsz egy pontos árat, írj rám –
                      ránézek rendesen és mondok egy korrekt számot.
                    </p>

                    {/* Trust badges */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                      {[
                        { icon: Zap, text: "Gyors válasz" },
                        { icon: MessageCircle, text: "Nem kell hívogatni" },
                        { icon: Shield, text: "Nem kötelez semmire" },
                        { icon: CheckCircle, text: "Én nézem meg személyesen" },
                      ].map(({ icon: Icon, text }) => (
                        <div
                          key={text}
                          className="flex flex-col items-center gap-2 p-3 rounded-lg bg-secondary/50 text-center"
                        >
                          <Icon className="w-5 h-5 text-primary" />
                          <span className="font-body text-xs text-muted-foreground leading-tight">
                            {text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                      <a
href="/#contact" aria-label="Ugrás a Kapcsolat űrlaphoz"
                        className="rust-gradient text-primary-foreground font-heading text-lg uppercase tracking-widest px-8 py-3.5 hover:brightness-110 transition-all border border-primary/30 flex items-center justify-center gap-2 rounded-md"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Írok Gyaresznek
                      </a>
                      <a
                        href="tel:+36304418737"
                        className="font-heading text-lg uppercase tracking-widest px-8 py-3.5 border border-primary/50 text-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2 rounded-md"
                      >
                        <Phone className="w-5 h-5" />
                        Felhívom
                      </a>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                      Nem kell hívogatni – csak küldj egy üzenetet, és válaszolok.
                    </p>
                  </CardContent>
                </Card>

                {/* Back to home */}
                <div className="text-center">
                  <a
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-heading uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Vissza a főoldalra
                  </a>
                </div>

                {/* Disclaimer */}
                <p className="text-center text-xs text-muted-foreground max-w-lg mx-auto">
                  Az itt megjelenő információk előzetes tájékoztatásnak minősülnek. A végleges
                  árajánlat személyes megtekintés vagy további fotók alapján pontosítható.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <ImageLightbox
        src={lightboxSrc || ""}
        alt="Sérülés fotó"
        isOpen={!!lightboxSrc}
        onClose={closeLightbox}
      />

      <Footer />
    </>
  );
};

export default Ajanlat;
