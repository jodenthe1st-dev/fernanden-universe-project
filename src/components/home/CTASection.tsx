import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export function CTASection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={containerRef} className="relative py-32 lg:py-40 overflow-hidden bg-deep-black">
      {/* Clean Animated Background */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-primary/15 to-transparent blur-[100px]"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
        className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-gradient-to-tl from-secondary/10 to-transparent blur-[80px]"
      />

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            rotateY: [0, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[10%] w-24 h-24 border border-white/5 rounded-xl"
          style={{ transformStyle: "preserve-3d" }}
        />
        <motion.div
          animate={{ 
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[30%] left-[15%] w-16 h-16 border border-primary/20 rotate-45"
        />
      </div>

      <motion.div style={{ scale }} className="relative z-10 container-main">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Minimal Decorative Line */}
            <div className="flex justify-center mb-8">
              <motion.div 
                className="w-16 h-[1px] bg-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              />
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Prêt à transformer
              <br />
              <span className="text-primary">votre vision ?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Que ce soit pour un événement unique, une garde-robe distinctive ou une identité visuelle percutante — nous sommes là pour vous accompagner.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  className="text-base px-10 h-14 bg-primary hover:bg-primary/90 group"
                >
                  <Link to="/contact" className="flex items-center gap-3">
                    <span>Commencer un projet</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-base px-10 h-14 border-primary text-primary hover:border-transparent hover:bg-transparent hover:text-primary"
                >
                  <Link to="/portfolio">Voir nos réalisations</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
