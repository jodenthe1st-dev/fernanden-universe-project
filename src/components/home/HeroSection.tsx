import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import logoMain from "@/assets/logo-fernanden-main.png";

export function HeroSection() {
  const containerRef = useRef(null);
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
            backgroundImage: `url('https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2532&auto=format&fit=crop')`,
          }}
        />
        {/* Gradient Overlay with brand colors - reduced opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black/30 via-transparent to-transparent" />
        
      </motion.div>

      {/* Content with Parallax */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 container-main w-full"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            
            {/* Tagline with Line */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6"
            >
              <div className="w-8 md:w-12 h-[2px] bg-secondary" />
              <span className="font-heading text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.25em] text-foreground/80">
                Un design 3en1 aux multiples facettes
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6 sm:mb-8 md:mb-10 leading-[1.1] md:leading-[1.15]">
              <span className="font-serif text-terracotta block mb-1 md:mb-0">CafEE</span>
              <span className="text-secondary mx-1 md:mx-2 inline-block">•</span>
              <span className="font-serif text-terracotta block mb-1 md:mb-0">DENSE</span>
              <span className="text-secondary mx-1 md:mx-2 inline-block">•</span>
              <span className="font-serif text-terracotta block md:inline">SHE</span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/90 max-w-lg mb-6 sm:mb-8 md:mb-10 leading-relaxed px-2 sm:px-4 md:px-0"
            >
              Mode, espaces, éducation et création graphique — nous transformons vos visions en réalité depuis 2017.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Button 
                asChild 
                size="lg" 
                className="text-sm sm:text-base px-6 sm:px-8 h-12 sm:h-14 bg-terracotta hover:bg-terracotta/90 text-white font-semibold group"
              >
                <Link to="/about" className="flex items-center gap-3">
                  <span>Découvrir nos univers</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-sm sm:text-base px-6 sm:px-8 h-12 sm:h-14 border-foreground/30 text-foreground hover:bg-foreground hover:text-white backdrop-blur-sm bg-foreground/5"
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
