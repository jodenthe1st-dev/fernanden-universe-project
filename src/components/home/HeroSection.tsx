import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { placeholderImages } from "@/components/ui/BrandedPlaceholder";

export function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden pt-16" style={{ position: 'relative' }}>
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop')`,
          }}
        />
        {/* Sophisticated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/25 via-transparent to-primary/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
        
      </motion.div>

      {/* Content with Parallax */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 container-main w-full"
      >
        <div className="max-w-2xl">
          {/* Elegant Text with Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Tagline with blur backdrop */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <div className="w-8 md:w-10 h-[2px] bg-terracotta" />
              <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground/95">
                Un design 3en1 aux multiples facettes
              </span>
            </motion.div>

            {/* Main Headline with elegant blur */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="inline-block px-6 py-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-[1.15]">
                <span className="font-serif text-terracotta">CafEE</span>
                <span className="text-secondary mx-2">•</span>
                <span className="font-serif text-terracotta">DENSE</span>
                <span className="text-secondary mx-2">•</span>
                <span className="font-serif text-terracotta">SHE</span>
              </h1>
            </motion.div>

            {/* Description with soft blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="max-w-lg"
            >
              <p 
                className="text-base sm:text-lg md:text-xl text-foreground/95 leading-relaxed px-5 py-4 rounded-xl inline-block"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                Mode, espaces, éducation et création graphique — nous transformons vos visions en réalité depuis 2017.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button 
                asChild 
                size="lg" 
                className="text-sm sm:text-base px-8 sm:px-10 h-14 sm:h-16 bg-terracotta hover:bg-terracotta/90 text-white font-semibold group rounded-full shadow-lg shadow-terracotta/25"
              >
                <Link to="/about" className="flex items-center gap-3">
                  <span>Découvrir nos univers</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-sm sm:text-base px-8 sm:px-10 h-14 sm:h-16 rounded-full border-2 border-foreground/30 text-foreground hover:bg-foreground hover:text-white hover:border-foreground transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Minimal */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={28} strokeWidth={1.5} />
        </motion.div>
      </motion.button>

      {/* Side Decoration - Modern Touch */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4">
        <div className="w-[1px] h-20 bg-foreground/20" />
        <span className="text-foreground/40 text-xs uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">
          Scroll
        </span>
        <div className="w-[1px] h-20 bg-foreground/20" />
      </div>
    </section>
  );
}
