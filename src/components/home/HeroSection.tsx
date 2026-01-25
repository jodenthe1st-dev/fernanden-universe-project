import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2532&auto=format&fit=crop')`,
        }}
      >
        {/* Modern Gradient Overlay - Inspired by OGNENS style */}
        <div className="absolute inset-0 bg-gradient-to-r from-deep-black/90 via-deep-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-deep-black/30" />
      </div>

      {/* Content - Left Aligned like OGNENS */}
      <div className="relative z-10 container-main w-full">
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
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[2px] bg-primary" />
              <span className="font-heading text-xs uppercase tracking-[0.25em] text-white/70">
                Un design aux multiples facettes
              </span>
            </motion.div>

            {/* Main Headline - Larger & Bolder */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
              <span className="font-serif">Bienvenue dans</span>
              <br />
              <span className="font-serif">l'univers de</span>
              <br />
              <motion.span 
                className="text-primary font-serif inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                fernanden
              </motion.span>
            </h1>

            {/* Description - Cleaner */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-white/70 max-w-lg mb-10 leading-relaxed"
            >
              Mode, espaces, éducation et création graphique — nous transformons vos visions en réalité.
            </motion.p>

            {/* CTAs - Modern Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                asChild 
                size="lg" 
                className="text-base px-8 h-14 bg-primary hover:bg-primary/90 group"
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
                className="text-base px-8 h-14 border-white/30 text-white hover:bg-white hover:text-deep-black backdrop-blur-sm bg-white/5"
              >
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

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
        <div className="w-[1px] h-20 bg-white/20" />
        <span className="text-white/40 text-xs uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">
          Scroll
        </span>
        <div className="w-[1px] h-20 bg-white/20" />
      </div>
    </section>
  );
}
