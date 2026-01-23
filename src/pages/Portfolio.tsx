import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = ["Tous", "SHE", "DENSEN", "CaFEE"];

const portfolioItems = [
  {
    id: 1,
    title: "Mariage Traditionnel",
    category: "SHE",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Collection Été",
    category: "DENSEN",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Identité Visuelle Startup",
    category: "CaFEE",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Aménagement Bureau",
    category: "SHE",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Lookbook Automne",
    category: "DENSEN",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Brochure Corporate",
    category: "CaFEE",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800&auto=format&fit=crop",
  },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredItems = activeCategory === "Tous"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream pattern-droplet">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="heading-hero text-foreground mb-4">
              Notre <span className="text-primary">Portfolio</span>
            </h1>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos réalisations à travers nos univers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section className="py-16 bg-background">
        <div className="container-main">
          {/* Filter Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-full font-heading font-medium text-sm transition-colors",
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer image-zoom"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-secondary text-deep-black text-xs font-heading font-semibold rounded-full mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-heading font-semibold text-xl text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
