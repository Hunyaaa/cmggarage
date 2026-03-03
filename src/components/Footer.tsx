import { Facebook } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => (
  <footer className="py-10 bg-secondary border-t border-border">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 font-display text-lg tracking-wider">
          <img src={logo} alt="C.M.G. logó" className="w-8 h-8 rounded-full object-cover" />
          <span>
            <span className="text-primary">C.M.G.</span>{" "}
            <span className="text-foreground">PDR&Carpolish</span>
          </span>
        </div>
        <p className="font-body text-sm text-muted-foreground">
          © {new Date().getFullYear()} C.M.G. PDR&Carpolish – Gyarmati István e.v. Minden jog fenntartva.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/CMGCarpolish/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.tiktok.com/@gyaresziii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
