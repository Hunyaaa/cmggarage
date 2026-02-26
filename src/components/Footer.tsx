import { Facebook } from "lucide-react";

const Footer = () => (
  <footer className="py-10 bg-secondary border-t border-border">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-lg tracking-wider">
          <span className="text-primary">C.M.G.</span>{" "}
          <span className="text-foreground">PDR&Carpolish</span>
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
