import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Wrench, Target, Heart, Star, Car } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Évek tapasztalata",
    desc: "Több száz sikeresen javított és polírozott autó áll mögöttem – a parkolási horpadástól a teljes fényezéskorrekcióig.",
  },
  {
    icon: Wrench,
    title: "Prémium eszközök",
    desc: "Kizárólag professzionális, iparágvezető eszközökkel és anyagokkal dolgozom a tartós, tökéletes eredményért.",
  },
  {
    icon: Target,
    title: "Precíz kivitelezés",
    desc: "Minden autó egyedi odafigyelést kap. Nem sietünk – a minőség mindig elsőbbséget élvez.",
  },
  {
    icon: Heart,
    title: "Autórajongó szemlélet",
    desc: "Nem csak munka – szenvedély. Úgy bánok az autóddal, mintha a sajátom lenne.",
  },
];

const stats = [
  { value: "500+", label: "Javított autó" },
  { value: "5★", label: "Ügyfél értékelés" },
  { value: "100%", label: "Elégedettség" },
];

const WhyChooseUsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-us" className="py-24 bg-secondary grunge-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            MIÉRT VÁLASSZ MINKET?
          </h2>
          <div className="scratch-line w-32 mx-auto mb-6" />
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Nagykanizsán prémium autóápolási szolgáltatást nyújtunk – a legapróbb részletekig
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center bg-card border border-border p-6">
              <p className="font-display text-3xl md:text-4xl text-primary mb-1">{s.value}</p>
              <p className="font-heading text-sm uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-card border border-border p-8 text-center hover:border-primary/50 transition-colors duration-300"
            >
              <div className="w-14 h-14 border border-primary/40 flex items-center justify-center mx-auto mb-5">
                <r.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg uppercase tracking-wider text-foreground mb-3">
                {r.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Reviews side by side */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-card border border-border p-8 text-center"
          >
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-primary fill-primary" />
              ))}
            </div>
            <blockquote className="font-body text-foreground italic leading-relaxed mb-3">
              „Amikor megláttam a végeredményt alig hittem a szememnek! 6 éve van nálunk az autó, de amikor megvettük még akkor sem volt ilyen szép! Köszönjük szépen Pisti a gyors és korrekt munkát! :)"
            </blockquote>
            <p className="font-heading text-sm uppercase tracking-wider text-muted-foreground">
              – Elégedett ügyfél, Nagykanizsa
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="bg-card border border-border p-8 text-center"
          >
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-primary fill-primary" />
              ))}
            </div>
            <blockquote className="font-body text-foreground italic leading-relaxed mb-3">
              „Pár napja kapuk vissza a VOLKSWAGEN TOURAN kocsinkat. Eszméletlenül gyönyörű lett. Mindenki megcsodálja. Ilyen precíz munkával ritkán találkozik az ember. István munkájával 100%-ban elégedettek vagyunk és ahol lehet ajánljuk Őt. 5*"
            </blockquote>
            <p className="font-heading text-sm uppercase tracking-wider text-muted-foreground">
              – Elégedett ügyfél, Nagykanizsa
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
