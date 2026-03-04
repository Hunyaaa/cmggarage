import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, Shield, Hammer, CloudSnow, Lightbulb, GraduationCap, ChevronDown, ChevronUp } from "lucide-react";

const services = [
  {
    icon: Hammer,
    title: "Horpadásjavítás fényezés nélkül – PDR technológia",
    desc: "PDR (Paintless Dent Repair) horpadásjavítás Nagykanizsán: a horpadás eltűnik, a gyári fényezésed megmarad. Értékmegőrző, gyors és költséghatékony megoldás.",
    details: [
      "Gyári festékréteg teljes megőrzése",
      "Az autó értéke nem csökken",
      "Akár néhány órás javítási idő",
      "Költséghatékonyabb, mint a hagyományos javítás",
    ],
    extra: "Parkolási sérülések, ajtórányitások, kisebb és nagyobb horpadások professzionális javítása – gyári állapot visszaállítása fényezés nélkül.",
  },
  {
    icon: CloudSnow,
    title: "Jégkár javítás Nagykanizsa – Teljes körű ügyintézéssel",
    desc: "Jégeső okozta horpadások javítása PDR technológiával Nagykanizsán. Teljes biztosítási ügyintézést vállalunk – Neked csak az autót kell elhoznod.",
    details: [
      "Teljes CASCO ügyintézés",
      "Kárfelvétel koordinálása a biztosítóval",
      "Gyors, fényezés nélküli javítás",
      "Privát (biztosítás nélküli) javítás is",
    ],
    extra: "Legyen szó pár horpadásról vagy teljes karosszéria jégkárról – megoldjuk, profin és gyorsan.",
  },
  {
    icon: Sparkles,
    title: "Autópolírozás Nagykanizsa – Fényezéskorrekció mesterfokon",
    desc: "Professzionális autópolírozás Nagykanizsán: egylépcsős fényesítés, többlépcsős fényezéskorrekció, karceltávolítás és hologrammentesítés.",
    details: [
      "Gyári fényezés állapotának visszaállítása",
      "Mély, tükörfényes, showroom-szintű felület",
      "Egyedi állapotfelmérés minden autónál",
    ],
    extra: "Minden járművet állapotfelmérés után kezelünk – pontosan azt kapod, amire az autód valóban szüksége van.",
  },
  {
    icon: Shield,
    title: "Kerámia bevonat Nagykanizsa – Védelem akár 4 évig",
    desc: "Tartós kerámia bevonat Nagykanizsán: védd autód fényezését UV sugárzás, vegyszerek, szennyeződések és időjárás ellen – akár 4 évre.",
    details: [
      "Könnyebb tisztíthatóság, víz- és szennyeződéslepergető hatás",
      "Szélvédő kerámia bevonat",
      "Külső műanyag elemek tartós felújítása",
      "Felni kerámia védelem",
    ],
    extra: "Kizárólag korrekciós polírozás után alkalmazzuk – maximális tapadás és tartósság érdekében. Prémium bevonatokkal dolgozunk.",
  },
  {
    icon: Lightbulb,
    title: "Fényszóró felújítás – Garanciális megoldás",
    desc: "Matt, besárgult fényszórók felújítása Nagykanizsán. Nemcsak esztétikai, hanem biztonsági kérdés – állítsuk vissza az átlátszóságot tartósan.",
    details: [
      "Teljes átlátszóság visszaállítása",
      "UV-álló védőréteg alkalmazása",
      "Tartós, garanciális eredmény",
    ],
    extra: "Válassz 1,5 vagy 2,5 éves garanciás csomagot – a fényszóród újra tökéletesen világít.",
  },
  {
    icon: GraduationCap,
    title: "Workshop – Tanulj autópolírozást szakembertől",
    desc: "Gyakorlatorientált autópolírozás és fényszóró felújítás képzés Nagykanizsán. Sajátítsd el a profi technikákat, és alkalmazd azonnal.",
    details: [
      "Havi rendszerességgel induló csoportok",
      "Valódi, piacképes tudás tapasztalt oktatótól",
      "Azonnal alkalmazható technikák és gyakorlat",
    ],
    extra: "Időpontért és részletekért keress minket elérhetőségeinken!",
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
          <p className="font-body text-muted-foreground mt-1">
            Autópolírozás – Fényezéskorrekció mesterfokon
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
