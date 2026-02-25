import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Wrench, Heart } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: Award, title: "Tapasztalat", desc: "Évek szakmai gyakorlata a prémium autóápolásban" },
    { icon: Wrench, title: "Minőség", desc: "Professzionális eszközök és anyagok használata" },
    { icon: Heart, title: "Szenvedély", desc: "Minden autó egyedi figyelmet és törődést kap" },
  ];

  return (
    <section id="about" className="py-24 bg-secondary grunge-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            RÓLUNK
          </h2>
          <div className="scratch-line w-32 mx-auto mb-6" />
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A <span className="text-primary font-semibold">CMG Carpolish</span>-t{" "}
            <span className="text-foreground font-semibold">Gyarmati István</span> alapította 
            Nagykanizsán. Egyéni vállalkozóként minden munkát személyesen, a legnagyobb 
            odafigyeléssel végez – legyen szó egy egyszerű polírozásról vagy komplex 
            fényezésjavításról.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="bg-card border border-border p-8 text-center hover:border-primary/40 transition-colors duration-300"
            >
              <f.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-xl uppercase tracking-wider text-foreground mb-3">{f.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
