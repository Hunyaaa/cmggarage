import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Shield, Hammer, Lightbulb, GraduationCap, Car } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Egy- és többlépcsős polírozás",
    desc: "Fényezés felújítás, karcolások és hologramok eltávolítása. Visszaadjuk autód fényezésének eredeti ragyogását.",
  },
  {
    icon: Shield,
    title: "Kerámia bevonat",
    desc: "Tartós védelem autó karosszériára és szélvédőre. A kerámia bevonat megvédi a fényezést az időjárástól és a szennyeződésektől.",
  },
  {
    icon: Hammer,
    title: "PDR – Horpadásjavítás",
    desc: "Fényezés nélküli horpadásjavítás kíméletes technológiával. A PDR megőrzi az eredeti gyári fényezést.",
  },
  {
    icon: Lightbulb,
    title: "Fényszóró felújítás",
    desc: "Homályos, megsárgult fényszórók visszaállítása eredeti átlátszóságukra. Javított láthatóság és megjelenés.",
  },
  {
    icon: GraduationCap,
    title: "Fényszóró felújítás oktatás",
    desc: "Tanulj meg fényszórót felújítani profitól! Gyakorlati oktatás professzionális eszközökkel és anyagokkal.",
  },
  {
    icon: Car,
    title: "Teljes detailing",
    desc: "Komplett belső és külső autóápolás a legkisebb részletekig. Prémium anyagokkal, kézzel végzett munka.",
  },
];

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
            Professzionális autóápolási szolgáltatások Nagykanizsán
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group bg-card border border-border p-8 hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 border border-primary/40 flex items-center justify-center mb-5 group-hover:border-primary transition-colors duration-300">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg uppercase tracking-wider text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
