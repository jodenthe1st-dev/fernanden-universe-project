import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, Calendar, PenTool, Home, ShoppingBag, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  badge?: string;
}

interface DropdownSection {
  title: string;
  items: DropdownItem[];
}

const dropdownSections: DropdownSection[] = [
  {
    title: "Blog",
    items: [
      {
        title: "Tous les articles",
        description: "Explorez tout notre contenu",
        icon: ({ size, className }: { size?: number; className?: string }) => <FileText size={size} className={className} />,
        href: "/blog",
      },
      {
        title: "SHE - Spaces & Events",
        description: "Design d'intérieur et événements",
        icon: ({ size, className }: { size?: number; className?: string }) => <Home size={size} className={className} />,
        href: "/blog/she",
      },
      {
        title: "DENSE - Fashion",
        description: "Mode et tendances africaines",
        icon: ({ size, className }: { size?: number; className?: string }) => <ShoppingBag size={size} className={className} />,
        href: "/blog/dense",
      },
      {
        title: "CaFEE - Éducation",
        description: "Pédagogie et développement",
        icon: ({ size, className }: { size?: number; className?: string }) => <GraduationCap size={size} className={className} />,
        href: "/blog/cafee",
      },
    ],
  },
  {
    title: "Actualités",
    items: [
      {
        title: "Toutes les actualités",
        description: "Nouvelles et mises à jour",
        icon: ({ size, className }: { size?: number; className?: string }) => <Calendar size={size} className={className} />,
        href: "/actualites",
        badge: "Nouveau",
      },
      {
        title: "Actualités SHE",
        description: "Projets et événements",
        icon: ({ size, className }: { size?: number; className?: string }) => <Home size={size} className={className} />,
        href: "/actualites/she",
      },
      {
        title: "Actualités DENSE",
        description: "Collections et fashion weeks",
        icon: ({ size, className }: { size?: number; className?: string }) => <ShoppingBag size={size} className={className} />,
        href: "/actualites/dense",
      },
      {
        title: "Actualités CaFEE",
        description: "Ateliers et formations",
        icon: ({ size, className }: { size?: number; className?: string }) => <GraduationCap size={size} className={className} />,
        href: "/actualites/cafee",
      },
    ],
  },
];

export const BlogDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const isBlogPage = location.pathname.startsWith('/blog') || location.pathname.startsWith('/actualites');

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        className={cn(
          "flex items-center gap-1 px-4 py-2 text-sm font-heading font-medium transition-all duration-300",
          isBlogPage
            ? "text-primary"
            : "text-foreground hover:text-primary"
        )}
      >
        <span>Blog & Actualités</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 w-[600px] bg-deep-black/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-white">
                    Blog & Actualités
                  </h3>
                  <p className="text-xs text-white/70">
                    Explorez nos contenus par univers
                  </p>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-8">
                {dropdownSections.map((section, sectionIndex) => (
                  <div key={section.title} className="space-y-4">
                    <h4 className="font-heading font-semibold text-sm text-white uppercase tracking-wide flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {section.title}
                    </h4>
                    
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className={cn(
                            "group flex items-start gap-3 p-3 rounded-xl transition-all duration-200",
                            "hover:bg-white/5 hover:border-white/20 border border-transparent",
                            location.pathname === item.href
                              ? "bg-primary/20 border-primary/40"
                              : ""
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                            location.pathname === item.href
                              ? "bg-primary text-white"
                              : "bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white"
                          )}>
                            <item.icon size={16} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-heading font-medium text-sm text-white group-hover:text-primary transition-colors">
                                {item.title}
                              </h5>
                              {item.badge && (
                                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-white/60 line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white/5 px-6 py-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/60">
                  Découvrez toutes nos publications
                </p>
                <Link
                  to="/blog"
                  className="text-xs font-heading font-medium text-primary hover:text-primary/80 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Voir tout →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
