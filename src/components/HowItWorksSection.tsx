import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, FileText, CalendarCheck, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Camera,
    step: "1",
    title: "Küldj képet",
    desc: "Fotózd le a sérülést vagy az autód állapotát, és küldd el nekünk az űrlapon keresztül.",
  },
  {
    icon: FileText,
    step: "2",
    title: "Gyors árajánlat",
    desc: "Rövid időn belül személyre szabott árajánlatot küldünk, átláthatóan, rejtett költségek nélkül.",
  },
  {
    icon: CalendarCheck,
    step: "3",
    title: "Időpont egyeztetés",
    desc: "Rugalmas időpont-egyeztetés – igazodunk a Te napirendedhez.",
  },
  {
    icon: Sparkles,
    step: "4",
    title: "Autód újjászületik",
    desc: "Precíz munkavégzés, prémium eredmény. Autódat gyári állapotban kapod vissza.",
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="how-it-works" className="py-24 bg-background grunge-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            HOGYAN MŰKÖDIK?
          </h2>
          <div className="scratch-line w-32 mx-auto mb-6" />
          <p className="font-body text-muted-foreground">
            Egyszerű folyamat – gyors eredmény
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-colors duration-300 relative"
            >
              <div className="absolute top-4 right-4 font-display text-4xl text-primary/10">
                {s.step}
              </div>
              <div className="w-14 h-14 border border-primary/40 flex items-center justify-center mx-auto mb-5">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg uppercase tracking-wider text-foreground mb-3">
                {s.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={scrollToContact}
            className="rust-gradient text-primary-foreground font-heading text-base uppercase tracking-widest px-10 py-4 hover:brightness-110 transition-all duration-300 border border-primary/30"
          >
            Kérj árajánlatot most
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
