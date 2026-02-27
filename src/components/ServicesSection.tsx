import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Shield, Hammer, CloudSnow, Lightbulb, GraduationCap, ChevronDown, ChevronUp } from "lucide-react";

const services = [
  {
    icon: Hammer,
    title: "Horpadásjavítás fényezés nélkül – PDR technológia",
    desc: "A PDR (Paintless Dent Repair) technológia lehetővé teszi a horpadások eltávolítását az elem újrafényezése nélkül.",
    details: [
      "Megmarad a gyári festékréteg",
      "Nem csökken az autó értéke",
      "Gyors javítási idő",
      "Költséghatékony megoldás",
    ],
    extra: "Parkolási sérülések, ajtórányitások, kisebb benyomódások vagy akár extrémebb horpadások szakszerű javítása akár néhány órán belül.",
  },
  {
    icon: CloudSnow,
    title: "Jégkár javítás – Teljes körű ügyintézéssel",
    desc: "Jégeső okozta sérülések javítása PDR technológiával.",
    details: [
      "Teljes ügyintézés",
      "Kárfelvétel koordinálása",
      "Gyors javítási folyamat",
      "Privát javítást is vállalunk",
    ],
    extra: "Önnek csak az autót kell elhoznia – a többit mi intézzük.",
  },
  {
    icon: Sparkles,
    title: "Autópolírozás – Fényezéskorrekció mesterfokon",
    desc: "Professzionális autópolírozás, legyen szó egylépcsős fényesítésről, többlépcsős korrekciós polírozásról, karceltávolításról vagy hologrammentesítésről.",
    details: [
      "Gyári fényezés állapotának visszaállítása",
      "Mély, tükörfényes felület elérése",
      "Állapotfelmérés után személyre szabott kezelés",
    ],
    extra: "Minden járművet állapotfelmérés után kezelünk, így pontosan azt kapja, amire az autója valóban igényt tart.",
  },
  {
    icon: Shield,
    title: "Kerámia bevonat – Tartós fényezésvédelem akár 4 évig",
    desc: "A kerámia bevonat hosszú távú védelmet biztosít UV sugárzás, vegyszerek, szennyeződések, madárürülék és bogármaradványok ellen.",
    details: [
      "Könnyebb tisztíthatóság",
      "Szélvédő kerámia bevonat",
      "Külső műanyag elemek tartós felújítása",
      "Felni védelem",
    ],
    extra: "Kizárólag korrekciós polírozás után alkalmazzuk a maximális tapadás és tartósság érdekében. Minőségi, professzionális bevonatokkal dolgozunk.",
  },
  {
    icon: Lightbulb,
    title: "Fényszóró felújítás – Tartós, garanciális megoldás",
    desc: "A matt, besárgult fényszórók nemcsak esztétikai, hanem biztonsági problémát is jelentenek.",
    details: [
      "Visszaállítjuk az átlátszóságot",
      "UV védő réteggel látjuk el",
      "Tartós eredményt biztosítunk",
    ],
    extra: "Garancia: 1,5 év vagy 2,5 év a választott csomagtól függően.",
  },
  {
    icon: GraduationCap,
    title: "Workshop – Tanulj szakembertől",
    desc: "Gyakorlatorientált képzések: fényszórófelújítás, autópolírozás alapjai és haladó technikák.",
    details: [
      "Havi rendszerességgel induló csoportok",
      "Valódi, piacképes tudás",
      "Azonnal alkalmazható technikák",
    ],
    extra: "Időpontért érdeklődj elérhetőségeinken.",
  },
];

const ServiceCard = ({ s, i, inView }: { s: typeof services[0]; i: number; inView: boolean }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      key={s.title}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
      className="group bg-card border border-border p-8 hover:border-primary/50 transition-all duration-300 relative overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div className="w-14 h-14 border border-primary/40 flex items-center justify-center group-hover:border-primary transition-colors duration-300">
            <s.icon className="w-7 h-7 text-primary" />
          </div>
          {open ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <h3 className="font-heading text-lg uppercase tracking-wider text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {s.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.desc}</p>

        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-3"
          >
            <ul className="space-y-1.5">
              {s.details.map((d) => (
                <li key={d} className="font-body text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  {d}
                </li>
              ))}
            </ul>
            {s.extra && (
              <p className="font-body text-sm text-foreground/80 leading-relaxed border-t border-border pt-3">
                {s.extra}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 bg-background grunge-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            SZOLGÁLTATÁSOK
          </h2>
          <div className="scratch-line w-32 mx-auto mb-6" />
          <p className="font-body text-muted-foreground">
            Prémium Autópolírozás és PDR Horpadásjavítás
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
