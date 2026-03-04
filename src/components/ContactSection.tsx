import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Facebook, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const serviceOptions = [
"PDR – Horpadásjavítás",
"Jégkár javítás",
"Egy- és többlépcsős polírozás",
"Kerámia bevonat",
"Fényszóró felújítás",
"Workshop",
"Egyéb"];


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
      toast({ title: "Hiba", description: "Kérjük, töltsd ki a kötelező mezőket (Név, Telefon).", variant: "destructive" });
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Hiba", description: "Érvénytelen e-mail cím.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // Upload images if any
      const imageUrls: string[] = [];
      for (const img of images) {
        const fileName = `${Date.now()}-${img.name}`;
        const { data, error: uploadError } = await supabase.storage.
        from("contact-images").
        upload(fileName, img);
        if (uploadError) {
          console.error("Upload error:", uploadError);
        } else if (data) {
          const { data: urlData } = supabase.storage.
          from("contact-images").
          getPublicUrl(data.path);
          imageUrls.push(urlData.publicUrl);
        }
      }

      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { name, phone, email, carType, service, message, imageUrls }
      });
      if (error) throw error;
      toast({ title: "Üzenet elküldve!", description: "Hamarosan felvesszük Veled a kapcsolatot." });
      form.reset();
      setSelectedService("");
      setCustomService("");
      setImages([]);
    } catch (err) {
      toast({ title: "Hiba", description: "Nem sikerült elküldeni az üzenetet. Próbáld újra később.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background grunge-overlay" ref={ref}>
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">KAPCSOLAT</h2>
          <div className="scratch-line w-32 mx-auto mb-6" />
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Küldj fotót az autó sérüléséről és rövid időn belül árajánlatot adunk. Gyors válaszidő, rejtett költségek nélkül.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-2 block">
                  Név <span className="text-primary">*</span>
                </label>
                <Input name="name" placeholder="Teljes neved" className="bg-card border-border focus:border-primary" />
              </div>
              <div>
                <label className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-2 block">
                  Telefon <span className="text-primary">*</span>
                </label>
                <Input name="phone" placeholder="+36 30 123 4567" className="bg-card border-border focus:border-primary" />
              </div>
              <div>
                <label className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-2 block">
                  Email
                </label>
                <Input name="email" type="email" placeholder="email@pelda.hu" className="bg-card border-border focus:border-primary" />
              </div>
              <div>
                <label className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-2 block">
                  Autó típusa
                </label>
                <Input name="carType" placeholder="Pl. BMW E46 320d" className="bg-card border-border focus:border-primary" />
              </div>
              <div>
                <label className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-2 block">
                  Szolgáltatás
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value);
                    if (e.target.value !== "Egyéb") setCustomService("");
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  
                  <option value="">Válassz szolgáltatást...</option>
                  {serviceOptions.map((s) =>
                  <option key={s} value={s}>{s}</option>
                  )}
                </select>
              </div>
              {selectedService === "Egyéb" &&
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}>
                
                  <label className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-2 block">
                    Milyen szolgáltatást keresel?
                  </label>
                  <Input
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  placeholder="Írd le, miben segíthetünk..."
                  className="bg-card border-border focus:border-primary" />
                
                </motion.div>
              }
              <div>
                <label className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-2 block">
                  Üzenet
                </label>
                <Textarea name="message" placeholder="Miben segíthetünk?" rows={4} className="bg-card border-border focus:border-primary" />
              </div>

              {/* Image upload */}
              <div>
                <label className="font-heading text-sm uppercase tracking-wider text-muted-foreground mb-2 block">
                  Képek csatolása
                </label>
                <div className="space-y-3">
                  {images.length > 0 &&
                  <div className="flex flex-wrap gap-2">
                      {images.map((img, i) =>
                    <div key={i} className="relative group">
                          <img
                        src={URL.createObjectURL(img)}
                        alt={`Feltöltött kép ${i + 1}`}
                        className="w-20 h-20 object-cover rounded border border-border" />
                      
                          <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                    )}
                    </div>
                  }
                  {images.length < 5 &&
                  <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                      <Upload className="w-4 h-4" />
                      <span>Kép feltöltése (max. 5)</span>
                      <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden" />
                    
                    </label>
                  }
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rust-gradient text-primary-foreground font-heading text-base uppercase tracking-widest px-8 py-3 hover:brightness-110 transition-all duration-300 border border-primary/30 disabled:opacity-50">
                
                {loading ? "Küldés..." : "Üzenet küldése"}
              </button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8">
            
            <div className="bg-card border border-border p-8">
              <h3 className="font-heading text-xl uppercase tracking-wider text-foreground mb-6">Elérhetőségek</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-foreground">Nagykanizsa, Egry József u. 7.</p>
                    <p className="font-body text-sm text-muted-foreground">Gyarmati István e.v.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href="tel:+36304418737" className="font-body text-foreground hover:text-primary transition-colors">
                    +36 30 441 8737
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href="mailto:info@cmgcarpolish.hu" className="font-body text-foreground hover:text-primary transition-colors">
                    info@cmgcarpolish.hu
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Facebook className="w-5 h-5 text-primary shrink-0" />
                  <a
                    href="https://www.facebook.com/CMGCarpolish/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-foreground hover:text-primary transition-colors">
                    
                    C.M.G. PDR&Carpolish – Facebook
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z"/>
                  </svg>
                  <a
                    href="https://www.tiktok.com/@gyaresziii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-foreground hover:text-primary transition-colors">
                    C.M.G. PDR&Carpolish – TikTok
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-8">
              <h3 className="font-heading text-xl uppercase tracking-wider text-foreground mb-3">Nyitvatartás</h3>
              <div className="space-y-2 font-body text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Hétfő – Péntek</span>
                  <span className="text-foreground">8:00 – 18:00</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Szombat</span>
                  <span className="text-foreground">Előzetes egyeztetés</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Vasárnap</span>
                  <span className="text-foreground">Zárva</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default ContactSection;