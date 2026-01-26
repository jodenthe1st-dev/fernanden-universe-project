import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Heart, Users, Target } from "lucide-react";
import { useRef } from "react";

const values = [
  {
    icon: Heart,
    title: "Authenticité",
    description: "Un engagement sincère envers l'héritage culturel africain",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description: "La quête constante de la qualité dans chaque détail",
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Créer des liens durables avec nos clients et partenaires",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Fusionner tradition et modernité avec audace",
  },
];

export function BrandDNA() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-cream relative overflow-hidden">
      {/* Clean Animated Background */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-secondary/5 to-transparent blur-3xl"
      />
      
      <div className="container-main relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[2px] bg-primary" />
              <span className="font-heading text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Notre ADN
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              Une marque ancrée dans
              <span className="text-primary block">l'excellence africaine</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Fernanden incarne la rencontre entre tradition et modernité. Nous créons des expériences uniques qui célèbrent l'héritage africain tout en embrassant l'innovation contemporaine.
            </p>

            {/* OAPI Badge with 3D effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="inline-flex items-center gap-4 bg-card p-4 pr-6 rounded-xl shadow-lg border border-border/30"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-terracotta">
                <span className="text-white font-heading font-bold text-sm">OAPI</span>
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">
                  Marque Déposée
                </p>
                <p className="text-xs text-muted-foreground">
                  Protection intellectuelle certifiée
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Values Grid with 3D hover */}
          <div className="grid grid-cols-2 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  rotateX: 5,
                  rotateY: -5,
                  transition: { duration: 0.3 }
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="group bg-card p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-border/30"
              >
                <motion.div 
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                  whileHover={{ rotate: 5 }}
                >
                  <value.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
