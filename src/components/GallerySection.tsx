import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { GripVertical, X, ChevronLeft, ChevronRight } from "lucide-react";

import horpadasBefore from "@/assets/gallery/horpadas-before.jpeg";
import horpadasAfter from "@/assets/gallery/horpadas-after.jpeg";
import horpiBefore from "@/assets/gallery/horpi-before.jpeg";
import horpiAfter from "@/assets/gallery/horpi-after.jpeg";
import merciBefore from "@/assets/gallery/merci-before.jpeg";
import merciAfter from "@/assets/gallery/merci-after.jpeg";
import tetoHorpadasBefore from "@/assets/gallery/teto-horpadas-before.jpeg";
import tetoHorpadasAfter from "@/assets/gallery/teto-horpadas-after.jpeg";
import nissan350zBefore from "@/assets/gallery/350z-before.jpeg";
import nissan350zAfter from "@/assets/gallery/350z-after.jpeg";
import lampaBefore from "@/assets/gallery/lampa-before.jpeg";
import lampaAfter from "@/assets/gallery/lampa-after.jpeg";

const sliderItemsRow1 = [
  { label: "PDR horpadásjavítás – fényezés nélkül javítva", tag: "HORPADÁSJAVÍTÁS", before: horpadasAfter, after: horpadasBefore },
  { label: "PDR horpadásjavítás – gyári állapot visszaállítva", tag: "JÉGKÁRJAVÍTÁS", before: horpiAfter, after: horpiBefore },
  { label: "Mercedes – korrekciós polírozás, showroom fény", tag: "MERCEDES KORREKCIÓS POLÍR", before: merciAfter, after: merciBefore },
];

const sliderItemsRow2 = [
  { label: "Tető horpadásjavítás – PDR technológiával", tag: "TETŐ HORPADÁSJAVÍTÁS", before: tetoHorpadasBefore, after: tetoHorpadasAfter },
  { label: "Nissan 350Z – korrekciós polírozás, tükörfény", tag: "NISSAN 350Z KORREKCIÓS POLÍR", before: nissan350zBefore, after: nissan350zAfter },
  { label: "BMW fényszóró felújítás – kristálytiszta eredmény", tag: "BMW FÉNYSZÓRÓ FELÚJÍTÁS", before: lampaBefore, after: lampaAfter },
];


const BeforeAfterSlider = ({ label, before, after, tag, index, inView }: {label: string;before: string;after: string;tag: string;index: number;inView: boolean;}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos(x / rect.width * 100);
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
      className="group relative aspect-[4/3] bg-card border border-border overflow-hidden hover:border-primary/40 transition-colors duration-300">
      
      <div
        ref={containerRef}
        className="absolute inset-0 select-none touch-none cursor-col-resize"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}>
        
        {/* Before image */}
        <img src={before} alt={`${label} - Előtte`} className="absolute inset-0 w-full h-full object-cover" />

        {/* After image - clipped */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
          
          <img src={after} alt={`${label} - Utána`} className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* Slider line & handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
          style={{ left: `${sliderPos}%` }}>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <GripVertical className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-xs font-heading uppercase tracking-wider text-foreground bg-background/70 px-2 py-1">Előtte</span>
        </div>
        <div className="absolute bottom-3 right-3 z-10">
          <span className="text-xs font-heading uppercase tracking-wider text-primary bg-background/70 px-2 py-1">Utána</span>
        </div>
      </div>

      {/* Tag overlay */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-xs font-heading uppercase tracking-wider text-primary bg-background/80 px-2 py-1">{tag}</span>
      </div>
    </motion.div>);

};

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext





}: {images: typeof photoItems;currentIndex: number;onClose: () => void;onPrev: () => void;onNext: () => void;}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center"
      onClick={onClose}>
      
      <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 text-muted-foreground hover:text-foreground transition-colors">
        <X className="w-8 h-8" />
      </button>
      <button
        onClick={(e) => {e.stopPropagation();onPrev();}}
        className="absolute left-4 z-50 p-2 text-muted-foreground hover:text-foreground transition-colors">
        
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={(e) => {e.stopPropagation();onNext();}}
        className="absolute right-4 z-50 p-2 text-muted-foreground hover:text-foreground transition-colors">
        
        <ChevronRight className="w-8 h-8" />
      </button>
      <motion.img
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        src={images[currentIndex].src}
        alt={images[currentIndex].label}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()} />
      
      <p className="absolute bottom-6 text-center text-sm font-heading text-muted-foreground">
        {images[currentIndex].label}
      </p>
    </motion.div>);

};

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section id="gallery" className="py-24 bg-secondary grunge-overlay" ref={ref}>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
              GALÉRIA
            </h2>
            <div className="scratch-line w-32 mx-auto mb-6" />
            <p className="font-body text-muted-foreground">
              Munkáim – az eredmények magukért beszélnek
            </p>
          </motion.div>

          {/* Row 1 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sliderItemsRow1.map((item, i) =>
            <BeforeAfterSlider key={i} label={item.label} before={item.before} after={item.after} tag={item.tag} index={i} inView={inView} />
            )}
          </div>

          {/* Row 2 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {sliderItemsRow2.map((item, i) =>
            <BeforeAfterSlider key={`r2-${i}`} label={item.label} before={item.before} after={item.after} tag={item.tag} index={i + 3} inView={inView} />
            )}
          </div>
        </div>
      </section>
    </>);

};

export default GallerySection;