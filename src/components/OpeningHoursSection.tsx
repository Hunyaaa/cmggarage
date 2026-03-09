import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock } from "lucide-react";

const schedule = [
  { day: "Hétfő", hours: "8:00 – 17:00" },
  { day: "Kedd", hours: "8:00 – 17:00" },
  { day: "Szerda", hours: "8:00 – 17:00" },
  { day: "Csütörtök", hours: "8:00 – 17:00" },
  { day: "Péntek", hours: "8:00 – 17:00" },
  { day: "Szombat", hours: "8:00 – 17:00" },
  { day: "Vasárnap", hours: "Zárva" },
];

const OpeningHoursSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const today = new Date().getDay();
  // JS: 0=Sun,1=Mon...6=Sat → map to schedule index
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <section id="opening-hours" className="py-24 bg-secondary grunge-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">NYITVATARTÁS</h2>
          <div className="scratch-line w-32 mx-auto mb-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto bg-card border border-border p-8 rounded"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-primary" />
            <h3 className="font-heading text-xl uppercase text-foreground">Munkaidő</h3>
          </div>
          <div className="space-y-3">
            {schedule.map((item, i) => (
              <div
                key={item.day}
                className={`flex justify-between items-center py-2 px-3 rounded transition-colors ${
                  i === todayIndex
                    ? "bg-primary/10 border border-primary/30"
                    : "border border-transparent"
                }`}
              >
                <span className={`font-heading uppercase tracking-wide text-sm ${
                  i === todayIndex ? "text-primary" : "text-foreground"
                }`}>
                  {item.day}
                </span>
                <span className={`font-body text-sm ${
                  item.hours === "Zárva"
                    ? "text-destructive"
                    : i === todayIndex
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}>
                  {item.hours}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OpeningHoursSection;
