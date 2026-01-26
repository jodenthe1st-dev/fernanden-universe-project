import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedLetters } from "@/components/animations/AnimatedLetters";
import { GradientBlob } from "@/components/animations/GradientBlob";
import { ExternalLink, Eye } from "lucide-react";

const categories = [
  { id: "all", label: "Tous", color: "bg-primary" },
  { id: "she", label: "SHE", color: "bg-she-saffron" },
  { id: "densen", label: "DENSEN", color: "bg-primary" },
  { id: "cafee", label: "CaFEE", color: "bg-cafee-mint" },
];

const portfolioItems = [
  {
    id: 1,
    title: "Mariage Traditionnel Élégant",
    category: "she",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
    description: "Décoration florale et mise en scène",
  },
  {
    id: 2,
    title: "Collection Été 2024",
    category: "densen",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
    description: "Lookbook mode africaine",
  },
  {
    id: 3,
    title: "Identité Visuelle Tech Startup",
    category: "cafee",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
    description: "Branding complet",
  },
  {
    id: 4,
    title: "Aménagement Bureau Premium",
    category: "she",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    description: "Design d'intérieur corporate",
  },
  {
    id: 5,
    title: "Lookbook Automne",
    category: "densen",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    description: "Collection prêt-à-porter",
  },
  {
    id: 6,
    title: "Rapport Annuel 2024",
    category: "cafee",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800&auto=format&fit=crop",
    description: "Design éditorial",
  },
  {
    id: 7,
    title: "Événement Corporate",
    category: "she",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
    description: "Gala d'entreprise",
  },
  {
    id: 8,
    title: "Accessoires Artisanaux",
    category: "densen",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
    description: "Collection limitée",
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const filteredItems = activeCategory === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <GradientBlob 
          className="-top-40 right-1/4" 
          color1="hsl(var(--primary) / 0.12)"
          size="400px"
        />

        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block font-heading text-sm uppercase tracking-[0.25em] text-primary mb-4"
            >
              Nos réalisations
            </motion.span>
            
            <h1 className="heading-hero text-foreground mb-4">
              <AnimatedLetters text="Portfolio" type="wave" />
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="body-large text-muted-foreground max-w-xl mx-auto"
            >
              Découvrez nos créations à travers nos univers
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section className="pb-16">
        <div className="container-main">
          {/* Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-2 mb-10 flex-wrap"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-6 py-2.5 rounded-full font-heading font-medium text-sm transition-all duration-300 relative overflow-hidden",
                  activeCategory === category.id
                    ? "text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={cn("absolute inset-0 rounded-full", category.color)}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Gallery Grid - Masonry-like */}
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden cursor-pointer",
                    index === 0 ? "md:row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-square"
                  )}
                >
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredItem === item.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/50 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Content */}
                  <motion.div 
                    className="absolute inset-0 flex flex-col justify-end p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredItem === item.id ? 1 : 0,
                      y: hoveredItem === item.id ? 0 : 20
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className={cn(
                      "inline-block w-fit px-3 py-1 rounded-full text-white text-xs font-heading font-semibold mb-3",
                      item.category === "she" ? "bg-she-saffron" :
                      item.category === "densen" ? "bg-primary" : "bg-cafee-mint"
                    )}>
                      {item.category.toUpperCase()}
                    </span>
                    <h3 className="font-heading font-semibold text-xl text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4">{item.description}</p>
                    
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <Eye size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink size={18} />
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Always visible category badge */}
                  <div className={cn(
                    "absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-heading font-semibold transition-opacity",
                    hoveredItem === item.id ? "opacity-0" : "opacity-100",
                    item.category === "she" ? "bg-she-saffron" :
                    item.category === "densen" ? "bg-primary" : "bg-cafee-mint"
                  )}>
                    {item.category.toUpperCase()}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
