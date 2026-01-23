import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Shirt, GraduationCap, ArrowRight } from "lucide-react";

const universes = [
  {
    id: "she",
    title: "SHE",
    subtitle: "Spaces, Home & Event Design",
    description: "Transformez vos espaces et événements en expériences mémorables. Design d'intérieur, décoration événementielle et création d'ambiances uniques.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2798&auto=format&fit=crop",
    icon: Home,
    href: "/she",
    color: "from-she-saffron/80 to-she-bronze/80",
  },
  {
    id: "densen",
    title: "DENSEN",
    subtitle: "Fashion Design",
    description: "Mode, Sens, Identité et Inspiration. Des créations vestimentaires qui célèbrent l'héritage africain avec une touche contemporaine.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=2787&auto=format&fit=crop",
    icon: Shirt,
    href: "/densen",
    color: "from-primary/80 to-terracotta-dark/80",
  },
  {
    id: "cafee",
    title: "CaFEE",
    subtitle: "Education & Expressive",
    description: "Accompagnement psychopédagogique et design graphique. Apprendre autrement, s'exprimer pleinement, créer avec sens.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop",
    icon: GraduationCap,
    href: "/cafee",
    color: "from-cafee-mint/80 to-cafee-orange/80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function UniverseCards() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container-main">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-foreground mb-4">
            Explorez nos <span className="text-primary">univers</span>
          </h2>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto">
            Trois facettes d'un même engagement : créer, accompagner et inspirer avec excellence et authenticité.
          </p>
        </motion.div>

        {/* Universe Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {universes.map((universe) => (
            <motion.div
              key={universe.id}
              variants={cardVariants}
              className="group"
            >
              <Link
                to={universe.href}
                className="relative block h-[500px] rounded-2xl overflow-hidden card-hover"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${universe.image}')` }}
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${universe.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <universe.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-3xl font-bold text-white mb-1">
                    {universe.title}
                  </h3>
                  <p className="font-heading text-sm text-secondary font-medium uppercase tracking-wider mb-3">
                    {universe.subtitle}
                  </p>

                  {/* Description */}
                  <p className="body-small text-white/80 mb-6 line-clamp-3">
                    {universe.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-white font-heading font-medium text-sm group/cta">
                    <span>Explorer</span>
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover/cta:translate-x-1"
                    />
                  </div>
                </div>

                {/* Hover Border */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-colors duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
