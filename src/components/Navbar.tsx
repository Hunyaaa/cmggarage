import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const links = [
  { label: "Főoldal", href: "#hero" },
  { label: "Rólam", href: "#about" },
  { label: "Hogyan működik?", href: "#how-it-works" },
  { label: "Szolgáltatások", href: "#services" },
  { label: "Galéria", href: "#gallery" },
  { label: "Árlista", href: "#pricing" },
  { label: "Kapcsolat", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#hero" onClick={(e) => handleClick(e, "#hero")} className="flex items-center gap-2">
          <img src={logo} alt="C.M.G. PDR&Carpolish logó" className="w-8 h-8 rounded-full object-cover" />
          <span className="font-display text-lg tracking-wider">
            <span className="text-primary">C.M.G.</span>
            <span className="text-foreground"> PDR&Carpolish</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              className="font-heading text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menü megnyitása">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border pb-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              className="block w-full text-left px-6 py-3 font-heading text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
