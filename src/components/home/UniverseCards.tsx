import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Shirt, GraduationCap, ArrowUpRight } from "lucide-react";

const universes = [
  {
    id: "she",
    title: "SHE",
    subtitle: "Spaces, Home & Event Design",
    description: "Transformez vos espaces et événements en expériences mémorables.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2798&auto=format&fit=crop",
    icon: Home,
    href: "/she",
  },
  {
    id: "densen",
    title: "DENSEN",
    subtitle: "Fashion Design",
    description: "Mode, Sens, Identité et Inspiration africaine contemporaine.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=2787&auto=format&fit=crop",
    icon: Shirt,
    href: "/densen",
  },
  {
    id: "cafee",
    title: "CaFEE",
    subtitle: "Education & Expressive",
    description: "Accompagnement psychopédagogique et design graphique.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop",
    icon: GraduationCap,
    href: "/cafee",
  },
];

export function UniverseCards() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container-main">
        {/* Section Header - More Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* Decorative Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <div className="w-8 h-8 border border-primary/30 rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rotate-45" />
            </div>
          </motion.div>

          <p className="font-heading text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Nos univers
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
            Découvrez nos <span className="text-primary">expertises</span>
          </h2>
        </motion.div>

        {/* Universe Cards - Modern Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {universes.map((universe, index) => (
            <motion.div
              key={universe.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                to={universe.href}
                className="group relative block bg-card rounded-xl overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={universe.image}
                    alt={universe.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <universe.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-heading text-xs uppercase tracking-[0.2em] text-primary mb-2">
                      {universe.subtitle}
                    </p>
                    <h3 className="font-serif text-3xl font-bold text-white mb-3">
                      {universe.title}
                    </h3>
                    <p className="text-sm text-white/70 mb-4 line-clamp-2">
                      {universe.description}
                    </p>
                    
                    {/* CTA */}
                    <div className="flex items-center gap-2 text-white/90 group-hover:text-primary transition-colors">
                      <span className="text-sm font-medium">Explorer</span>
                      <ArrowUpRight 
                        size={16} 
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
