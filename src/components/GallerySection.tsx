import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Camera, GripVertical } from "lucide-react";

const galleryItems = [
  { label: "Többlépcsős polírozás", tag: "ELŐTTE / UTÁNA" },
  { label: "Kerámia bevonat", tag: "EREDMÉNY" },
  { label: "PDR horpadásjavítás", tag: "ELŐTTE / UTÁNA" },
  { label: "Fényszóró felújítás", tag: "ELŐTTE / UTÁNA" },
  { label: "Teljes detailing", tag: "EREDMÉNY" },
  { label: "Belső tisztítás", tag: "EREDMÉNY" },
];

const BeforeAfterSlider = ({ label, tag, index, inView }: { label: string; tag: string; index: number; inView: boolean }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      className="group relative aspect-[4/3] bg-card border border-border overflow-hidden hover:border-primary/40 transition-colors duration-300"
    >
      <div
        ref={containerRef}
        className="absolute inset-0 select-none touch-none cursor-col-resize"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* "Before" side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-muted to-card">
          <Camera className="w-10 h-10 text-muted-foreground/40 mb-3" />
          <p className="font-heading text-sm uppercase tracking-wider text-muted-foreground/60">ELŐTTE</p>
          <p className="font-body text-xs text-muted-foreground/40 mt-1">{label}</p>
        </div>

        {/* "After" side - clipped */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-card"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <Camera className="w-10 h-10 text-primary/50 mb-3" />
          <p className="font-heading text-sm uppercase tracking-wider text-primary/70">UTÁNA</p>
          <p className="font-body text-xs text-muted-foreground/60 mt-1">{label}</p>
        </div>

        {/* Slider line & handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <GripVertical className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-xs font-heading uppercase tracking-wider text-muted-foreground/60 bg-background/70 px-2 py-1">Előtte</span>
        </div>
        <div className="absolute bottom-3 right-3 z-10">
          <span className="text-xs font-heading uppercase tracking-wider text-primary/80 bg-background/70 px-2 py-1">Utána</span>
        </div>
      </div>

      {/* Tag overlay */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-xs font-heading uppercase tracking-wider text-primary bg-background/80 px-2 py-1">{tag}</span>
      </div>
    </motion.div>
  );
};

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
            <BeforeAfterSlider key={i} label={item.label} tag={item.tag} index={i} inView={inView} />
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
