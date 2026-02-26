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
        <a
          href="https://www.facebook.com/CMGCarpolish/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Facebook className="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
