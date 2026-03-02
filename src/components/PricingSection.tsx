import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pricingItems = [
  {
    title: "HORPADÁSJAVÍTÁS – PDR",
    subtitle: "Fényezés nélküli horpadásjavítás PDR technológiával",
    price: "10.000 Ft-tól",
    note: "Pontos ár a sérülés mérete és elhelyezkedése alapján",
    features: [
      "Fényezés megőrzése",
      "Gyári állapot visszaállítása",
      "Értékmegőrző javítás",
      "Gyors kivitelezés",
      "Jégkár javítás vállalása",
      "Teljeskörű biztosítás (CASCO) ügyintézés",
    ],
  },
  {
    title: "1 LÉPCSŐS POLÍR – FÉNYESÍTŐ POLÍR",
    subtitle: "Fényfrissítés és alap karceltávolítás",
    price: "60.000 Ft-tól",
    note: "Karosszéria mérettől függően",
    features: [
      "Alapos kézi mosás",
      "1 lépcsős polírozás",
      "Enyhe hologram és mikrokarc eltávolítás",
      "Wax védelem",
      "Külső műanyag ápolás",
      "Fényvisszaadás",
    ],
  },
  {
    title: "2–3 LÉPCSŐS KORREKCIÓS POLÍR",
    subtitle: "Mélyebb karcok és oxidáció eltávolítása",
    price: "120.000 Ft-tól",
    note: "Sérültségtől és lakkréteg állapottól függően",
    features: [
      "Mélytisztító előkészítés",
      "Többlépcsős gépi korrekció",
      "Mélyebb karcok csökkentése",
      "Lakkréteg finiselés",
      "Showroom fény",
      "Igény esetén kerámia előkészítés",
    ],
  },
  {
    title: "TELJES AUTÓ KERÁMIA BEVONAT",
    subtitle: "Hosszú távú fényezésvédelem a teljes karosszériára",
    price: "200.000 Ft-tól",
    note: "Karosszéria mérettől és állapottól függően",
    features: [
      "Teljes karosszéria kerámia bevonat",
      "UV és vegyszer védelem",
      "Könnyebb tisztíthatóság",
      "Tartós, mély fény",
      "Korrekciós polírozás után alkalmazva",
      "Akár 4 év tartósság",
    ],
  },
  {
    title: "SZÉLVÉDŐ KERÁMIA BEVONAT",
    subtitle: "Vízlepergető védelem és jobb kilátás",
    price: "20.000 Ft-tól",
    note: "Első szélvédőre",
    features: [
      "Erős vízlepergető hatás",
      "Jobb látási viszony esőben",
      "Könnyebb tisztíthatóság",
      "UV védelem",
      "Tartós bevonat",
    ],
  },
  {
    title: "MŰANYAG KERÁMIA BEVONAT",
    subtitle: "Külső műanyag elemek tartós védelme",
    price: "10.000 Ft-tól",
    note: "Felület nagyságától és darabszámtól függően",
    features: [
      "Fakulás elleni védelem",
      "Mély színvisszaadás",
      "UV védelem",
      "Tartós bevonat",
      "Időjárásálló felület",
    ],
  },
  {
    title: "FÉNYSZÓRÓ FELÚJÍTÁS – 1,5 ÉV GARANCIÁVAL",
    subtitle: "Matt, besárgult lámpák felújítása",
    price: "30.000 Ft/pár",
    note: null,
    features: [
      "Mélycsiszolás és korrekció",
      "UV álló bevonat",
      "Esztétikai helyreállítás",
      "1,5 év garancia",
    ],
  },
  {
    title: "FÉNYSZÓRÓ FELÚJÍTÁS – 2,5 ÉV GARANCIÁVAL",
    subtitle: "Prémium kerámia védelemmel",
    price: "35.000 Ft/pár",
    note: null,
    features: [
      "Mélycsiszolás és korrekció",
      "Esztétikai helyreállítás",
      "Kerámia bevonat",
      "2,5 év garancia",
    ],
  },
];

const scrollToContact = () => {
  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
};

const PricingCard = ({ item, index, inView }: { item: typeof pricingItems[0]; index: number; inView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
    className="bg-card border border-border p-8 hover:border-primary/50 transition-all duration-300 flex flex-col"
  >
    <h3 className="font-display text-lg text-foreground mb-1">{item.title}</h3>
    <p className="font-body text-sm text-muted-foreground mb-4">{item.subtitle}</p>

    <div className="mb-4">
      <span className="font-display text-2xl text-primary">{item.price}</span>
      {item.note && (
        <p className="font-body text-xs text-muted-foreground mt-1 italic">{item.note}</p>
      )}
    </div>

    <ul className="space-y-2 mb-6 flex-1">
      {item.features.map((f) => (
        <li key={f} className="font-body text-sm text-muted-foreground flex items-start gap-2">
          <span className="text-primary mt-0.5">▸</span>
          {f}
        </li>
      ))}
    </ul>

    <button
      onClick={scrollToContact}
      className="w-full py-3 font-heading text-sm uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
    >
      Kérek Ajánlatot
    </button>
  </motion.div>
);

const PricingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-24 bg-secondary grunge-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">ÁRLISTA</h2>
          <div className="scratch-line w-32 mx-auto mb-6" />
          <p className="font-body text-muted-foreground">Irányárak – pontos ár állapotfelmérés alapján</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingItems.map((item, i) => (
            <PricingCard key={item.title} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
