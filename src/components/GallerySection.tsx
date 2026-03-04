import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { GripVertical, X, ChevronLeft, ChevronRight } from "lucide-react";

import horpadasBefore from "@/assets/gallery/horpadas-before.jpeg";
import horpadasAfter from "@/assets/gallery/horpadas-after.jpeg";
import horpiBefore from "@/assets/gallery/horpi-before.jpeg";
import horpiAfter from "@/assets/gallery/horpi-after.jpeg";
import polirBefore from "@/assets/gallery/polir-before.jpeg";
import polirAfter from "@/assets/gallery/polir-after.jpeg";
import merciBefore from "@/assets/gallery/merci-before.jpeg";
import merciAfter from "@/assets/gallery/merci-after.jpeg";
import szepAuto1 from "@/assets/gallery/szep-auto-1.jpeg";
import szepAuto3 from "@/assets/gallery/szep-auto-3.jpeg";

const sliderItems = [
{ label: "PDR horpadásjavítás – fényezés nélkül javítva", tag: "FORD KORREKCIÓS POLÍR", before: horpadasAfter, after: horpadasBefore },
{ label: "PDR horpadásjavítás – gyári állapot visszaállítva", tag: "FORD KORREKCIÓS POLÍR", before: horpiAfter, after: horpiBefore },
{ label: "Többlépcsős polírozás – tükörfényes eredmény", tag: "FORD KORREKCIÓS POLÍR", before: polirAfter, after: polirBefore }];


const sliderItemsRow2 = [
{ label: "Mercedes – korrekciós polírozás, showroom fény", tag: "MERCEDES KORREKCIÓS POLÍR", before: merciAfter, after: merciBefore }];


const photoItems = [
{ src: szepAuto1, label: "Nissan 350Z – Teljes detailing és fényezéskorrekció" },
{ src: szepAuto3, label: "Subaru Impreza STI – Prémium polírozás Nagykanizsán" }];


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

          {/* Before/After sliders row */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sliderItems.map((item, i) =>
            <BeforeAfterSlider key={i} label={item.label} before={item.before} after={item.after} index={i} inView={inView} />
            )}
          </div>

          {/* Row 2: 1 slider + 2 photos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {sliderItemsRow2.map((item, i) =>
            <BeforeAfterSlider key={`r2-${i}`} label={item.label} before={item.before} after={item.after} index={i + 3} inView={inView} />
            )}
            {photoItems.map((item, i) =>
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="group relative aspect-[4/3] bg-card border border-border overflow-hidden hover:border-primary/40 transition-colors duration-300 cursor-pointer"
              onClick={() => setLightboxIndex(i)}>
              
                <img src={item.src} alt={item.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-heading uppercase tracking-wider text-foreground bg-background/80 px-3 py-1.5">
                    Nagyítás
                  </span>
                </div>
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-xs font-heading uppercase tracking-wider text-primary bg-background/80 px-2 py-1">EREDMÉNY</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null &&
        <Lightbox
          images={photoItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + photoItems.length) % photoItems.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % photoItems.length)} />

        }
      </AnimatePresence>
    </>);

};

export default GallerySection;