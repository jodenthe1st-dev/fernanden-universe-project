import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import logoMain from "@/assets/logo-fernanden-main.png";
import { BlogDropdown } from "./DropdownMenu";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/she", label: "SHE" },
  { href: "/dense", label: "DENSE" },
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
          ? "bg-background/95 backdrop-blur-xl shadow-lg py-3 border-b border-border/20"
          : "bg-transparent backdrop-blur-xl py-4"
      )}
    >
      <div className="container-main flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img
            src={logoMain}
            alt="fernanden"
            className={cn(
              "transition-all duration-300 group-hover:scale-105 object-contain drop-shadow-lg",
              isScrolled ? "h-20 md:h-24 lg:h-28" : "h-24 md:h-28 lg:h-32"
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          />
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
                    : "text-foreground/90 hover:text-foreground hover:bg-foreground/5"
              )}
            >
              {link.label}
            </Link>
          ))}
          <BlogDropdown />
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button 
            asChild 
            size="sm" 
            className="rounded-full px-6 bg-primary hover:bg-primary/90"
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
              : "text-foreground hover:bg-foreground/5"
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
            className="fixed inset-x-0 top-[60px] sm:top-[64px] md:top-[72px] z-40 bg-card/98 backdrop-blur-xl border-t border-border lg:hidden shadow-xl"
          >
            <div className="container-main py-3 sm:py-4 md:py-6">
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
                        "font-heading text-sm sm:text-base md:text-base font-medium block py-2 sm:py-2.5 md:py-3 px-3 sm:px-3.5 md:px-4 rounded-lg transition-colors",
                        location.pathname === link.href
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Blog & Actualités Mobile Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <div className="py-3 px-4">
                    <div className="flex items-center gap-2 mb-3">
                      <PenTool size={18} className="text-primary" />
                      <span className="font-heading text-base font-medium text-foreground">
                        Blog & Actualités
                      </span>
                    </div>
                    <div className="space-y-1 ml-6">
                      <Link
                        to="/blog"
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        📝 Tous les articles
                      </Link>
                      <Link
                        to="/blog/she"
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        🏠 Blog SHE
                      </Link>
                      <Link
                        to="/blog/densen"
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        🛍️ Blog DENSE
                      </Link>
                      <Link
                        to="/blog/cafee"
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        🎓 Blog CaFEE
                      </Link>
                      <div className="border-t border-border/50 my-2"></div>
                      <Link
                        to="/actualites"
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                      >
                        📰 Toutes les actualités
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
