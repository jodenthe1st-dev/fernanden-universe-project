import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/she", label: "SHE" },
  { href: "/densen", label: "DENSEN" },
  { href: "/cafee", label: "CaFEE" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/podcasts", label: "Podcasts" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-card/98 backdrop-blur-xl shadow-lg py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-main flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            {/* Modern Droplet Logo */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <path
                d="M15 8C10 16 5 20 5 25C5 30.5228 9.47715 35 15 35C20.5228 35 25 30.5228 25 25C25 20 20 16 15 8Z"
                fill="hsl(var(--primary))"
                opacity="0.7"
              />
              <path
                d="M25 5C21 11.5 17 15 17 19C17 23.4183 20.5817 27 25 27C29.4183 27 33 23.4183 33 19C33 15 29 11.5 25 5Z"
                fill="hsl(var(--primary))"
              />
            </svg>
          </div>
          <span className={cn(
            "font-serif text-xl font-bold transition-colors",
            isScrolled ? "text-foreground" : "text-white"
          )}>
            fernanden
          </span>
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "font-heading text-sm font-medium px-4 py-2 rounded-full transition-all duration-300",
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : isScrolled 
                    ? "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            className={cn(
              "rounded-full",
              isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
            )}
          >
            <Heart size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className={cn(
              "rounded-full relative",
              isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
            )}
          >
            <ShoppingBag size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
              0
            </span>
          </Button>
          <Button 
            asChild 
            size="sm" 
            className="ml-2 rounded-full px-6 bg-primary hover:bg-primary/90"
          >
            <Link to="/contact">Contact</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "lg:hidden p-2 rounded-full transition-colors",
            isScrolled 
              ? "text-foreground hover:bg-muted" 
              : "text-white hover:bg-white/10"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-card border-t border-border lg:hidden shadow-xl"
          >
            <div className="container-main py-6">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        "font-heading text-base font-medium block py-3 px-4 rounded-lg transition-colors",
                        location.pathname === link.href
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-border flex gap-3">
                <Button asChild size="lg" className="flex-1 rounded-full">
                  <Link to="/contact">Contactez-nous</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
