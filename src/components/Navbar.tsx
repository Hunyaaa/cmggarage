import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Főoldal", href: "#hero" },
  { label: "Rólunk", href: "#about" },
  { label: "Szolgáltatások", href: "#services" },
  { label: "Galéria", href: "#gallery" },
  { label: "Kapcsolat", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <button onClick={() => scrollTo("#hero")} className="font-display text-xl tracking-wider text-primary">
          CMG<span className="text-foreground"> CARPOLISH</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="font-heading text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border pb-4">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="block w-full text-left px-6 py-3 font-heading text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
