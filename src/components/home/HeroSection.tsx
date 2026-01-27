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
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2532&auto=format&fit=crop')`,
          }}
        />
        {/* Gradient Overlay with brand colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-transparent" />
        
        {/* Decorative citron arc */}
        <motion.div 
          className="absolute top-1/4 right-[10%] w-[40vw] h-[40vw] opacity-20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M100 20 C60 20, 20 60, 20 100 C20 140, 60 180, 100 180"
              stroke="hsl(var(--secondary))"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* 3D Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-1/4 right-[15%] w-32 h-32"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              rotateX: [0, 15, 0, -15, 0],
            }}
            transition={{ 
              rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
              rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-full h-full border border-white/10 rounded-2xl backdrop-blur-sm"
            style={{ transformStyle: "preserve-3d" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-1/3 right-[25%] w-20 h-20"
        >
          <motion.div
            animate={{ 
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-full h-full rotate-45 border border-primary/30"
          />
        </motion.div>

        {/* Gradient Orb */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[8%] w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
        />
      </div>

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
            {/* Logo Badge - with background for visibility */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8 inline-block"
            >
              <div className="bg-cream/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                <img 
                  src={logoMain} 
                  alt="fernanden" 
                  className="h-16 md:h-20 object-contain"
                />
              </div>
            </motion.div>

            {/* Tagline with Line */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-[2px] bg-secondary" />
              <span className="font-heading text-xs uppercase tracking-[0.25em] text-white/80">
                Un design 3en1 aux multiples facettes
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.15]">
              <span className="font-serif">CaFEE</span>
              <span className="text-secondary mx-2">•</span>
              <span className="font-serif">DENSEN</span>
              <span className="text-secondary mx-2">•</span>
              <span className="font-serif">SHE</span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-white/80 max-w-lg mb-10 leading-relaxed"
            >
              Mode, espaces, éducation et création graphique — nous transformons vos visions en réalité depuis 2017.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                asChild 
                size="lg" 
                className="text-base px-8 h-14 bg-secondary hover:bg-secondary/90 text-deep-black font-semibold group"
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
                className="text-base px-8 h-14 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm bg-white/5"
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
        <div className="w-[1px] h-20 bg-white/20" />
        <span className="text-white/40 text-xs uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">
          Scroll
        </span>
        <div className="w-[1px] h-20 bg-white/20" />
      </div>
    </section>
  );
}
