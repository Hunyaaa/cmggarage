import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lightbulb, CheckCircle, Phone } from "lucide-react";

const FenysziroFelujitas = () => (
  <>
    <Helmet>
      <title>Fényszóró felújítás Nagykanizsa | Garanciális | C.M.G. PDR & CarPolish</title>
      <meta name="description" content="Fényszóró felújítás Nagykanizsán garanciával. Matt, besárgult fényszórók teljes átlátszóságának visszaállítása UV-álló védőréteggel. Kérj ajánlatot!" />
      <link rel="canonical" href="https://www.cmggarage.hu/fenyszoro-felujitas" />
      <meta property="og:title" content="Fényszóró felújítás Nagykanizsa | C.M.G. PDR & CarPolish" />
      <meta property="og:description" content="Fényszóró felújítás Nagykanizsán garanciával. Matt, besárgult fényszórók visszaállítása." />
      <meta property="og:url" content="https://www.cmggarage.hu/fenyszoro-felujitas" />
    </Helmet>
    <Navbar />
    <main className="pt-24 pb-16 bg-background min-h-screen">
      <div className="container max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 border border-primary/40 flex items-center justify-center">
            <Lightbulb className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-foreground">
            Fényszóró felújítás Nagykanizsán
          </h1>
        </div>

        <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
          <p className="text-lg text-foreground">
            Matt, besárgult fényszórók felújítása Nagykanizsán – nemcsak esztétikai, hanem biztonsági kérdés. Állítsuk vissza az átlátszóságot tartósan, UV-álló védőréteggel.
          </p>

          <h2 className="font-heading text-xl uppercase tracking-wider text-foreground pt-4">
            Mit kínálunk?
          </h2>
          <ul className="space-y-3">
            {[
              "Teljes átlátszóság visszaállítása",
              "UV-álló védőréteg alkalmazása",
              "1,5 vagy 2,5 éves garanciás csomag",
              "Tartós, professzionális eredmény",
              "Biztonságosabb közlekedés – jobb látási viszonyok",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p>
            Nagykanizsán, az Egry József u. 7. szám alatt várlak. A fényszóród újra tökéletesen világít – garantáltan.
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

export default FenysziroFelujitas;
