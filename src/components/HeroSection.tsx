import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.jpeg";
import workshop from "@/assets/workshop.jpeg";

const HeroSection = () => {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Workshop background */}
      <div className="absolute inset-0">
        <img src={workshop} alt="CMG műhely" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Diagonal scratches */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 100px, hsl(0 0% 30%) 100px, hsl(0 0% 30%) 101px)`,
      }} />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="mb-6 inline-block">
            <img 
              src={logo} 
              alt="C.M.G. PDR&Carpolish logó" 
              className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full border-2 border-primary object-cover shadow-lg shadow-primary/20"
            />
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wider mb-2">
            <span className="text-primary">C.M.G.</span>{" "}
            <span className="text-foreground">PDR&Carpolish</span>
          </h1>
          
          <div className="scratch-line w-48 mx-auto my-6" />
          
          <p className="font-heading text-xl md:text-2xl uppercase tracking-[0.3em] text-muted-foreground mb-2">
            Ahol az autód újjászületik
          </p>
          <p className="font-body text-sm text-muted-foreground mb-10">
            Nagykanizsa · Gyarmati István e.v.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={scrollToContact}
            className="rust-gradient text-primary-foreground font-heading text-lg uppercase tracking-widest px-10 py-4 hover:brightness-110 transition-all duration-300 border border-primary/30"
          >
            Kérj időpontot
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
