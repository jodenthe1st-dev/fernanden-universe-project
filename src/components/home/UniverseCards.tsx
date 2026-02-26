import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const universes = [
  {
    id: "cafee",
    title: "CafEE",
    subtitle: "Education & Expressive",
    tagline: "Apprendre autrement, s'exprimer pleinement !",
    description: "Accompagnement psychopédagogique et design graphique.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    href: "/cafee",
    accentColor: "from-cafee-mint/80",
    bgImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "dense",
    title: "DENSE",
    subtitle: "Fashion Design",
    tagline: "Le chic intemporel à l'africaine",
    description: "Mode, Sens, Identité et Inspiration africaine contemporaine.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
    href: "/dense",
    accentColor: "from-primary/80",
    bgImage: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "she",
    title: "SHE",
    subtitle: "Spaces, Home & Event Design",
    tagline: "L'atmosphère qu'il vous faut !",
    description: "Transformez vos espaces et événements en expériences mémorables.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
    href: "/she",
    accentColor: "from-she-saffron/80",
    bgImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
  },
];

// 3D Card Component
function Universe3DCard({ universe, index }: Readonly<{ universe: typeof universes[0]; index: number }>) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <Link
          to={universe.href}
          className="group relative block bg-card rounded-xl overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.img
              src={universe.image}
              alt={universe.title}
              className="w-full h-full object-cover"
              style={{ transform: "translateZ(-20px) scale(1.1)" }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.7 }}
            />
            {/* Clean Overlay with accent color */}
            <div className={`absolute inset-0 bg-gradient-to-t ${universe.accentColor} via-deep-black/60 to-transparent`} />

            {/* Content - 3D Lifted */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6"
              style={{ transform: "translateZ(30px)" }}
            >
              <p className="font-heading text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-secondary mb-1 sm:mb-1.5 md:mb-2">
                {universe.subtitle}
              </p>
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-1.5 md:mb-2">
                {universe.title}
              </h3>
              <p className="text-[11px] sm:text-xs md:text-sm text-white/90 italic mb-2 sm:mb-2.5 md:mb-3">
                {universe.tagline}
              </p>
              <p className="text-[11px] sm:text-xs md:text-sm text-white/70 mb-2.5 sm:mb-3 md:mb-4 line-clamp-2">
                {universe.description}
              </p>
              
              {/* CTA */}
              <div className="flex items-center gap-2 text-white/90 group-hover:text-secondary transition-colors duration-300">
                <span className="text-[11px] sm:text-xs md:text-sm font-medium">Explorer</span>
                <ArrowUpRight 
                  size={14} 
                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom Accent Line - Now Secondary Color */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1 bg-secondary origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function UniverseCards() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-gradient-to-tr from-secondary/5 to-transparent blur-3xl"
        />
      </div>

      <div className="container-main relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* Minimal Decorative Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring" }}
            className="flex justify-center mb-6"
          >
            <div className="w-12 h-[1px] bg-primary" />
          </motion.div>

          <p className="font-heading text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Nos univers
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground">
            Découvrez nos <span className="text-primary">expertises</span>
          </h2>
        </motion.div>

        {/* Universe Cards - Same Line - Force Change */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {universes.map((universe, index) => (
            <Universe3DCard key={universe.id} universe={universe} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
