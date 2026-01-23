import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
  { href: "/resources", label: "Ressources" },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-card py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-main flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            {/* Double Droplet Icon */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M15 8C10 16 5 20 5 25C5 30.5228 9.47715 35 15 35C20.5228 35 25 30.5228 25 25C25 20 20 16 15 8Z"
                fill="currentColor"
                opacity="0.8"
              />
              <path
                d="M25 5C21 11.5 17 15 17 19C17 23.4183 20.5817 27 25 27C29.4183 27 33 23.4183 33 19C33 15 29 11.5 25 5Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="font-serif text-2xl font-bold text-foreground">
            fernanden
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "font-heading text-sm font-medium transition-colors link-underline",
                location.pathname === link.href
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button asChild>
            <Link to="/contact">Contactez-nous</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
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
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 top-0 z-40 bg-card lg:hidden"
          >
            <div className="flex flex-col h-full pt-20 pb-8 px-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        "font-heading text-xl font-semibold block py-3 border-b border-border",
                        location.pathname === link.href
                          ? "text-primary"
                          : "text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto">
                <Button asChild size="lg" className="w-full">
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
