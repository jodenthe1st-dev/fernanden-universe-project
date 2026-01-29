import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import { AnimatedLetters } from "@/components/animations/AnimatedLetters";
import { GradientBlob } from "@/components/animations/GradientBlob";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { cn } from "@/lib/utils";
import logoDensen from "@/assets/logo-densen.png";

const densenMeaning = [
  { letter: "D", word: "Distinctive", description: "Des créations uniques qui vous distinguent" },
  { letter: "E", word: "Engaged", description: "Un engagement envers l'artisanat africain" },
  { letter: "N", word: "Noble", description: "Des matériaux nobles et durables" },
  { letter: "S", word: "Sensitive", description: "Une sensibilité aux détails" },
  { letter: "E", word: "Elegant", description: "L'élégance intemporelle" },
  { letter: "N", word: "Natural", description: "Des fibres naturelles et éco-responsables" },
];

const products = [
  {
    id: 1,
    name: "Ensemble Adinkra",
    price: "45 000 FCFA",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=600&auto=format&fit=crop",
    category: "Ensemble",
  },
  {
    id: 2,
    name: "Robe Kente Moderne",
    price: "65 000 FCFA",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
    category: "Robe",
  },
  {
    id: 3,
    name: "Chemise Dashiki",
    price: "35 000 FCFA",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    category: "Chemise",
  },
  {
    id: 4,
    name: "Accessoire Artisanal",
    price: "25 000 FCFA",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop",
    category: "Accessoire",
  },
];

const DENSEN = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [activeLetterIndex, setActiveLetterIndex] = useState<number | null>(null);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=2787&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black/90 via-deep-black/70 to-transparent" />
        </div>

        <div className="relative z-10 container-main">
          <div className="max-w-2xl">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-8 inline-block"
            >
              <img 
                src={logoDensen} 
                alt="DENSEN by fernanden" 
                className="h-36 md:h-48 lg:h-56 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]"
              />
            </motion.div>

            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary font-heading text-sm font-medium mb-6"
            >
              <ShoppingBag size={16} />
              Fashion Design
            </motion.span>
            
            <h1 className="heading-hero text-white mb-4">
              <span className="font-serif">Mode, Sens & Identité</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="body-large text-white/70 mb-2"
            >
              Mode, Sens, Identité et Inspiration.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="font-serif text-xl italic text-secondary mb-8"
            >
              "Je suis tissu de force et de foi"
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <MagneticButton>
                <Button asChild size="lg" className="rounded-xl">
                  <Link to="/densen/shop" className="flex items-center gap-2">
                    <ShoppingBag size={18} />
                    Découvrir la collection
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DENSEN Philosophy - Interactive letters */}
      <section className="py-16 bg-muted/30">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="heading-section text-foreground mb-4">
              La philosophie <span className="text-primary">DENSEN</span>
            </h2>
            <p className="body-regular text-muted-foreground max-w-xl mx-auto">
              Chaque lettre porte une signification profonde
            </p>
          </motion.div>

          {/* Interactive letter display */}
          <div className="flex justify-center gap-3 md:gap-6 mb-8">
            {densenMeaning.map((item, index) => (
              <motion.button
                key={`${item.letter}-${index}`}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveLetterIndex(index)}
                onMouseLeave={() => setActiveLetterIndex(null)}
                className={cn(
                  "w-12 h-12 md:w-16 md:h-16 rounded-xl font-serif text-2xl md:text-3xl font-bold transition-all duration-300",
                  activeLetterIndex === index 
                    ? "bg-primary text-white scale-110" 
                    : "bg-card text-primary border border-border hover:border-primary"
                )}
              >
                {item.letter}
              </motion.button>
            ))}
          </div>

          {/* Active letter description */}
          <motion.div 
            className="text-center h-20"
            initial={false}
          >
            {activeLetterIndex !== null && (
              <motion.div
                key={activeLetterIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h3 className="font-heading font-semibold text-xl text-foreground mb-1">
                  {densenMeaning[activeLetterIndex].word}
                </h3>
                <p className="text-muted-foreground">
                  {densenMeaning[activeLetterIndex].description}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Grid fallback for mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {densenMeaning.map((item, index) => (
              <motion.div
                key={`grid-${item.letter}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-card p-4 rounded-xl border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl font-bold text-primary">{item.letter}</span>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-foreground">{item.word}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Preview */}
      <section className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="heading-section text-foreground mb-2">
                Notre <span className="text-primary">collection</span>
              </h2>
              <p className="body-regular text-muted-foreground">
                Des pièces uniques qui célèbrent l'héritage africain
              </p>
            </div>
            <Link 
              to="/densen/shop" 
              className="hidden md:flex items-center gap-2 font-heading font-medium text-primary hover:underline"
            >
              Voir tout <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group"
              >
                <div className="relative aspect-[3/4] bg-muted rounded-2xl overflow-hidden mb-4">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredProduct === product.id ? 1.08 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Quick actions */}
                  <motion.div
                    className="absolute top-4 right-4 flex flex-col gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: hoveredProduct === product.id ? 1 : 0,
                      x: hoveredProduct === product.id ? 0 : 20
                    }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-foreground hover:text-primary transition-colors"
                    >
                      <Heart size={18} />
                    </motion.button>
                  </motion.div>

                  {/* Add to cart overlay */}
                  <motion.div
                    className="absolute inset-x-4 bottom-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: hoveredProduct === product.id ? 1 : 0,
                      y: hoveredProduct === product.id ? 0 : 20
                    }}
                  >
                    <Button className="w-full rounded-xl">
                      <ShoppingBag size={16} className="mr-2" />
                      Ajouter au panier
                    </Button>
                  </motion.div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-heading font-medium">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <h4 className="font-heading font-semibold text-foreground mb-1">{product.name}</h4>
                <p className="font-heading font-bold text-primary">{product.price}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Button asChild variant="outline" className="rounded-xl">
              <Link to="/densen/shop" className="flex items-center gap-2">
                Voir toute la collection
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-deep-black text-white rounded-3xl p-10 md:p-14 relative overflow-hidden"
          >
            <GradientBlob 
              className="-top-20 -right-20" 
              color1="hsl(var(--primary) / 0.3)"
              size="300px"
            />
            <GradientBlob 
              className="-bottom-20 -left-20" 
              color1="hsl(var(--secondary) / 0.2)"
              size="250px"
            />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="heading-section mb-2">
                  Rejoignez le mouvement <span className="text-primary">DENSEN</span>
                </h2>
                <p className="body-large text-white/70">
                  Inscrivez-vous pour des offres exclusives et nouveautés
                </p>
              </div>
              <MagneticButton>
                <Button size="lg" className="rounded-xl">
                  S'inscrire à la newsletter
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default DENSEN;
