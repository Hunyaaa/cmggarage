import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, CheckCircle, Phone } from "lucide-react";

const Polirozas = () => (
  <>
    <Helmet>
      <title>Autó polírozás Nagykanizsa | Fényezéskorrekció | C.M.G. PDR & CarPolish</title>
      <meta name="description" content="Professzionális autó polírozás és fényezéskorrekció Nagykanizsán. Egylépcsős fényesítés, többlépcsős korrekció, kerámia bevonat. Kérj ajánlatot!" />
      <link rel="canonical" href="https://www.cmggarage.hu/polirozas" />
      <meta property="og:title" content="Autó polírozás Nagykanizsa | C.M.G. PDR & CarPolish" />
      <meta property="og:description" content="Professzionális autó polírozás és fényezéskorrekció Nagykanizsán." />
      <meta property="og:url" content="https://www.cmggarage.hu/polirozas" />
    </Helmet>
    <Navbar />
    <main className="pt-24 pb-16 bg-background min-h-screen">
      <div className="container max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 border border-primary/40 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-foreground">
            Autó polírozás Nagykanizsán
          </h1>
        </div>

        <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
          <p className="text-lg text-foreground">
            Professzionális autó polírozás és fényezéskorrekció Nagykanizsán – egylépcsős fényesítés, többlépcsős korrekció, karceltávolítás és hologrammentesítés. Minden járművet egyedi állapotfelmérés után kezelünk.
          </p>

          <h2 className="font-heading text-xl uppercase tracking-wider text-foreground pt-4">
            Polírozási szolgáltatásaink
          </h2>
          <ul className="space-y-3">
            {[
              "Egylépcsős polírozás – gyors fényesítés",
              "Többlépcsős fényezéskorrekció – mély, tükörfényes felület",
              "Karceltávolítás és hologrammentesítés",
              "Kerámia bevonat – védelem akár 4 évig",
              "Egyedi állapotfelmérés minden autónál",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p>
            Nagykanizsán, az Egry József u. 7. szám alatt dolgozom – pontosan azt kapod, amire az autód valóban szüksége van. Prémium anyagokkal, profi technikával.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link
              to="/#contact"
              className="rust-gradient text-primary-foreground font-heading text-lg uppercase tracking-widest px-10 py-4 hover:brightness-110 transition-all duration-300 border border-primary/30 text-center"
            >
              Kérj ajánlatot
            </Link>
            <a
              href="tel:+36304418737"
              className="font-heading text-lg uppercase tracking-widest px-8 py-3.5 border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              +36 30 441 8737
            </a>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Polirozas;
