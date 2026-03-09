import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Facebook, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const serviceOptions = [
  "PDR – Horpadásjavítás",
  "Jégkár javítás",
  "Egy- és többlépcsős polírozás",
  "Kerámia bevonat",
  "Fényszóró felújítás",
  "Workshop",
  "Egyéb"
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [customService, setCustomService] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const name = (formData.get("name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const carType = (formData.get("carType") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();
    const service = selectedService === "Egyéb" ? `Egyéb: ${customService}` : selectedService;

    if (!name || !phone) {
      toast({ title: "Hiba", description: "A név és a telefon kötelező.", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, carType, service, message }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Hiba a küldés során");
      }

      toast({ title: "Sikeres küldés!", description: "Hamarosan keresünk!" });
      form.reset();
      setImages([]);
      setSelectedService("");
    } catch (err: any) {
      console.error("Küldési hiba:", err);
      toast({ 
        title: "Hiba", 
        description: "Nem sikerült elküldeni. Próbáld újra később!", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false); // Gomb visszakapcsolása mindenképpen
    }
  };

  return (
    <section id="contact" className="py-24 bg-background grunge-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">KAPCSOLAT</h2>
          <div className="scratch-line w-32 mx-auto mb-6" />
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Küldj fotót az autó sérüléséről és rövid időn belül árajánlatot adunk.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input name="name" placeholder="Név *" className="bg-card" required />
              <Input name="phone" placeholder="Telefon *" className="bg-card" required />
              <Input name="email" type="email" placeholder="Email" className="bg-card" />
              <Input name="carType" placeholder="Autó típusa" className="bg-card" />
              
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
              >
                <option value="">Válassz szolgáltatást...</option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <Textarea name="message" placeholder="Üzenet" rows={4} className="bg-card" />

              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-primary transition-colors text-sm">
                  <Upload className="w-4 h-4" />
                  <span>Kép feltöltése (max. 5)</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                </label>
                <div className="flex flex-wrap gap-2">
                  {images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={URL.createObjectURL(img)} className="w-16 h-16 object-cover rounded" />
                      <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-destructive rounded-full p-0.5"><X className="w-3 h-3 text-white" /></button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rust-gradient text-white font-heading py-3 uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
              >
                {loading ? "Küldés..." : "Üzenet küldése"}
              </button>
            </form>
          </motion.div>

          <div className="bg-card border border-border p-8 space-y-6">
            <h3 className="font-heading text-xl uppercase text-foreground">Elérhetőségek</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4"><MapPin className="text-primary w-5" /> <a href="https://www.google.com/maps/dir/?api=1&destination=Nagykanizsa,+Egry+József+u.+7." target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline underline-offset-2">Nagykanizsa, Egry József u. 7.</a></div>
              <div className="flex items-center gap-4"><Phone className="text-primary w-5" /> <a href="tel:+36304418737">+36 30 441 8737</a></div>
              <div className="flex items-center gap-4"><Mail className="text-primary w-5" /> <a href="mailto:info@cmggarage.hu">info@cmggarage.hu</a></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
