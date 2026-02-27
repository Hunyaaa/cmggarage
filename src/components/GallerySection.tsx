import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera } from "lucide-react";

const galleryItems = [
  { label: "Többlépcsős polírozás", tag: "ELŐTTE / UTÁNA" },
  { label: "Kerámia bevonat", tag: "EREDMÉNY" },
  { label: "PDR horpadásjavítás", tag: "ELŐTTE / UTÁNA" },
  { label: "Fényszóró felújítás", tag: "ELŐTTE / UTÁNA" },
  { label: "Teljes detailing", tag: "EREDMÉNY" },
  { label: "Belső tisztítás", tag: "EREDMÉNY" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="gallery" className="py-24 bg-secondary grunge-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            GALÉRIA
          </h2>
          <div className="scratch-line w-32 mx-auto mb-6" />
          <p className="font-body text-muted-foreground">
            Munkáim – az eredmények magukért beszélnek
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group relative aspect-[4/3] bg-card border border-border overflow-hidden hover:border-primary/40 transition-colors duration-300"
            >
              {/* Placeholder area */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-muted to-card">
                <Camera className="w-10 h-10 text-muted-foreground/40 mb-3" />
                <p className="font-heading text-sm uppercase tracking-wider text-muted-foreground/60">{item.label}</p>
                <p className="font-body text-xs text-muted-foreground/40 mt-1">Kép helye</p>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <span className="text-xs font-heading uppercase tracking-wider text-primary">{item.tag}</span>
                  <p className="font-heading text-sm uppercase tracking-wider text-foreground">{item.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 font-body">
          💡 A képek placeholder-ek – cseréld ki saját fotóidra a Facebook oldaladról!
        </p>
      </div>
    </section>
  );
};

export default GallerySection;
