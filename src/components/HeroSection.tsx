import { motion } from "framer-motion";
import { ChevronDown, CheckCircle, Camera, Phone } from "lucide-react";
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
        <img src={workshop} alt="C.M.G. autópolírozás és PDR műhely Nagykanizsán" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Diagonal scratches */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 100px, hsl(0 0% 30%) 100px, hsl(0 0% 30%) 101px)`
      }} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          
          {/* Logo */}
          <div className="mb-6 inline-block">
            <img
              src={logo}
              alt="C.M.G. PDR&Carpolish logó – autópolírozás és horpadásjavítás Nagykanizsa"
              className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full border-2 border-primary object-cover shadow-lg shadow-primary/20" />
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wider mb-2">
            <span className="text-primary">Autópolírozás</span>{" "}
            <span className="text-foreground">és PDR horpadásjavítás Nagykanizsán</span>
          </h1>
          <p className="font-display text-2xl md:text-3xl tracking-wider mb-0 text-primary">
            C.M.G. PDR&Carpolish
          </p>
          
          <div className="scratch-line w-48 mx-auto my-6" />
          
          <p className="font-heading text-xl md:text-2xl uppercase tracking-[0.3em] text-foreground mb-4">
            Prémium autópolírozás és PDR horpadásjavítás Nagykanizsán
          </p>
          <p className="font-body text-base text-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
            Fényezés nélküli horpadásjavítás, professzionális polírozás, kerámia bevonat és jégkár javítás – egy helyen, szakértő kézzel.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
            <span className="flex items-center gap-1.5 font-body text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              Gyári fényezés megőrzése
            </span>
            <span className="flex items-center gap-1.5 font-body text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              Gyors kivitelezés
            </span>
            <span className="flex items-center gap-1.5 font-body text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              Több száz javított autó
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center gap-4">
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToContact}
              className="rust-gradient text-primary-foreground font-heading text-lg uppercase tracking-widest px-10 py-4 hover:brightness-110 transition-all duration-300 border border-primary/30">
              Kérj időpontot
            </button>
            <button
              onClick={scrollToContact}
              className="font-heading text-base uppercase tracking-widest px-8 py-3.5 border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Küldj fotót – kérj árajánlatot
            </button>
          </div>

          <div className="flex flex-col items-center gap-2 mt-2">
            <p className="font-body text-sm text-foreground font-medium">
              Gyors kérdésed van? Hívj minket közvetlenül!
            </p>
            <span className="font-heading text-lg tracking-wider text-foreground">
              +36 30 441 8737
            </span>
            <a
              href="tel:+36304418737"
              className="group rust-gradient text-primary-foreground font-heading text-sm uppercase tracking-widest px-8 py-3 sm:px-10 w-full sm:w-auto text-center rounded-full hover:brightness-110 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Hívás most
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-16">
          <p className="font-body text-xs text-foreground mb-1">Nagykanizsa, Egry József u. 7. · Gyarmati István e.v.</p>
          <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce mx-auto mt-4" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
