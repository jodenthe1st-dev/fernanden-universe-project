import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Heart, Star, Shield, Clock, Filter, Search } from "lucide-react";
import { useState } from "react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import logoDensen from "@/assets/logo-densen.png";

// Données enrichies des collections
const collections = [
  {
    id: 1,
    name: "Les Drapés",
    subtitle: "Sans Couture",
    description: "L'élégance fluide, aucune limite",
    fullDescription: "Découvrez notre collection signature où chaque pièce est une œuvre d'art fluide. Sans couture visible, ces vêtements épousent votre silhouette avec une grâce naturelle.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
    price: 89,
    icon: "🌊",
    features: ["Fluidité absolue", "Sans couture visible", "Tissu premium", "2 en 1"],
    rating: 4.9,
    reviews: 127,
    badge: "Best-seller",
    materials: ["Soie", "Cachemire", "Modal"],
    colors: ["Noir", "Blanc", "Bleu nuit", "Or"]
  },
  {
    id: 2,
    name: "Les Passe-Partout",
    subtitle: "Multi-Looks",
    description: "Un vêtement, mille possibilités",
    fullDescription: "La polyvalence réinventée. Transformez une seule pièce en 3 styles différents en quelques secondes. Parfait pour les femmes actives qui n'ont pas à choisir entre style et praticité.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    price: 79,
    icon: "🔄",
    features: ["3 styles en 1", "Transformation rapide", "Day & Night", "Voyage friendly"],
    rating: 4.8,
    reviews: 98,
    badge: "Coup de cœur",
    materials: ["Coton bio", "Lin", "Tencel"],
    colors: ["Beige", "Marine", "Rouge", "Vert"]
  },
  {
    id: 3,
    name: "Les Modulables",
    subtitle: "2, 3, 4... en 1",
    description: "La transformation infinie",
    fullDescription: "Notre collection la plus innovante avec un système breveté qui permet 4 configurations différentes. Une pièce, quatre tenues uniques grâce à notre technologie magnétique.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    price: 99,
    icon: "🧩",
    features: ["4 configurations", "Système breveté", "Magnétique", "Customisable"],
    rating: 4.9,
    reviews: 156,
    badge: "Innovation",
    materials: ["Polyester recyclé", "Élasthanne", "Fibre de bambou"],
    colors: ["Gris", "Noir", "Blanc", "Rose"]
  },
  {
    id: 4,
    name: "Les Escamotables",
    subtitle: "Démontables",
    description: "Le magique pratique",
    fullDescription: "L'illusionnisme au quotidien. Des pièces qui semblent se transformer par magie grâce à notre technologie exclusive. Effet wow garanti.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
    price: 119,
    icon: "✨",
    features: ["Effet magique", "Technologie unique", "Sur mesure", "Premium"],
    rating: 5.0,
    reviews: 89,
    badge: "Exclusif",
    materials: ["Soie sauvage", "Brocart", "Velours"],
    colors: ["Or", "Argent", "Noir", "Bleu roi"]
  },
  {
    id: 5,
    name: "Les Ajustables",
    subtitle: "Unisexes & Unitailles",
    description: "L'élégance inclusive",
    fullDescription: "La mode sans frontières. Des pièces qui s'adaptent à toutes les morphologies et tous les genres. L'élégance accessible à tous.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
    price: 69,
    icon: "🤝",
    features: ["Taille unique", "Unisexe", "Ajustement parfait", "Comfort"],
    rating: 4.7,
    reviews: 203,
    badge: "Accessible",
    materials: ["Coton organique", "Hemp", "Recyclé"],
    colors: ["Noir", "Blanc", "Gris chiné", "Kaki"]
  },
  {
    id: 6,
    name: "Les Panachés",
    subtitle: "Recomposés",
    description: "Votre créativité sans limites",
    fullDescription: "Exprimez votre unicité avec des pièces entièrement personnalisables. Choisissez vos tissus, vos couleurs, votre style. Chaque création est unique comme vous.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
    price: 89,
    icon: "🎨",
    features: ["Personnalisable", "Tissus variés", "Unique pièce", "Artisanal"],
    rating: 4.8,
    reviews: 67,
    badge: "Créatif",
    materials: ["Sur mesure", "Tissus clients", "Upcycling"],
    colors: ["Personnalisable"]
  },
  {
    id: 7,
    name: "Les Accessoires",
    subtitle: "Compléments Parfaits",
    description: "La touche finale",
    fullDescription: "Les détails qui font la différence. Transformez n'importe quelle tenue avec nos accessoires multifonctions. La touche DENSE pour un look complet.",
    image: "https://images.unsplash.com/photo-1620799140408-edc698cb5d6e?q=80&w=800&auto=format&fit=crop",
    price: 29,
    icon: "💎",
    features: ["Transformation instant", "Multi-usages", "Premium materials", "Gift ready"],
    rating: 4.6,
    reviews: 145,
    badge: "Essentiel",
    materials: ["Cuir végétal", "Soie", "Métal recyclé"],
    colors: ["Or", "Argent", "Noir", "Multicolore"]
  }
];

const Collections = () => {
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [showAddedToCart, setShowAddedToCart] = useState<number | null>(null);

  const toggleFavorite = (collectionId: number) => {
    if (favorites.includes(collectionId)) {
      setFavorites(favorites.filter(id => id !== collectionId));
    } else {
      setFavorites([...favorites, collectionId]);
    }
  };

  const addToCart = (collectionId: number) => {
    setCartItems([...cartItems, collectionId]);
    setShowAddedToCart(collectionId);
    setTimeout(() => setShowAddedToCart(null), 2000);
  };

  const isFavorite = (collectionId: number) => favorites.includes(collectionId);
  const isInCart = (collectionId: number) => cartItems.includes(collectionId);

  return (
    <Layout>
      <section className="py-20 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-densen-gold/5 via-transparent to-primary/3 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.densen-gold/8),transparent_50%)]" />
        
        <div className="container-main relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-densen-gold/20 to-primary/20 backdrop-blur-md rounded-full border border-densen-gold/30 mb-6">
              <ShoppingBag size={16} className="text-densen-gold animate-pulse" />
              <span className="font-heading text-sm font-medium text-densen-gold">Collections Complètes</span>
              <Star size={16} className="text-primary animate-pulse delay-300" />
            </div>
            
            <h1 className="heading-section text-foreground mb-6">
              Les 7 <span className="bg-gradient-to-r from-densen-gold to-primary bg-clip-text text-transparent">Collections</span> DENSE
            </h1>
            
            <p className="body-large text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explorez chaque collection en détail et découvrez la pièce qui transformera votre style
            </p>
          </motion.div>

          {/* Collections Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="group cursor-pointer"
                onClick={() => setSelectedCollection(selectedCollection === collection.id ? null : collection.id)}
              >
                <div className="bg-gradient-to-br from-card to-card/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-border/20 hover:border-densen-gold/40 transition-all duration-700 group hover:shadow-3xl hover:shadow-densen-gold/25 relative">
                  {/* Badge */}
                  {collection.badge && (
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-gradient-to-r from-densen-gold to-primary text-black px-3 py-1 rounded-full text-xs font-heading font-bold shadow-lg">
                        {collection.badge}
                      </div>
                    </div>
                  )}

                  {/* Actions rapides */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(collection.id);
                      }}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20"
                    >
                      <Heart 
                        size={16} 
                        className={`${isFavorite(collection.id) ? 'text-red-500 fill-red-500' : 'text-densen-gold'} transition-colors`} 
                      />
                    </motion.button>
                  </div>

                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="bg-densen-gold/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-heading font-medium flex items-center gap-2 shadow-xl">
                        <span className="text-lg">{collection.icon}</span>
                        {collection.subtitle}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-2xl text-foreground mb-2 group-hover:text-densen-gold transition-colors">
                          {collection.name}
                        </h3>
                        <p className="text-muted-foreground text-base leading-relaxed mb-3">
                          {collection.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < Math.floor(collection.rating) ? 'text-densen-gold fill-densen-gold' : 'text-gray-300'} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {collection.rating} ({collection.reviews} avis)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border/20">
                      <div>
                        <span className="font-heading font-bold text-2xl text-densen-gold">
                          {collection.price}€
                        </span>
                        <p className="text-xs text-muted-foreground font-medium mt-1">Made with love • France</p>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(collection.id);
                          }}
                          disabled={isInCart(collection.id)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all ${
                            isInCart(collection.id) 
                              ? 'bg-green-500 text-white' 
                              : 'bg-white text-densen-gold hover:bg-densen-gold hover:text-white'
                          }`}
                        >
                          {isInCart(collection.id) ? (
                            <Star size={20} />
                          ) : (
                            <ShoppingBag size={20} />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Notification ajout panier */}
                  {showAddedToCart === collection.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-full font-heading font-medium shadow-xl z-30"
                    >
                      ✓ Ajouté au panier !
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Collection Detail */}
          {selectedCollection && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl rounded-3xl p-12 border border-border/20 shadow-2xl shadow-densen-gold/10"
            >
              {(() => {
                const collection = collections.find(c => c.id === selectedCollection);
                if (!collection) return null;

                return (
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-96 object-cover rounded-2xl"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-4xl">{collection.icon}</span>
                        <div>
                          <h3 className="font-heading font-bold text-3xl text-foreground mb-1">
                            {collection.name}
                          </h3>
                          <p className="text-lg text-densen-gold font-medium">
                            {collection.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                        {collection.fullDescription}
                      </p>
                      
                      <div className="mb-8">
                        <h4 className="font-heading font-bold text-xl text-foreground mb-4">Caractéristiques</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {collection.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-densen-gold rounded-full" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h4 className="font-heading font-bold text-xl text-foreground mb-4">Matériaux</h4>
                        <div className="flex flex-wrap gap-2">
                          {collection.materials.map((material, idx) => (
                            <span key={idx} className="px-4 py-2 bg-densen-gold/10 text-densen-gold rounded-full text-sm font-medium border border-densen-gold/20">
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h4 className="font-heading font-bold text-xl text-foreground mb-4">Couleurs disponibles</h4>
                        <div className="flex flex-wrap gap-2">
                          {collection.colors.map((color, idx) => (
                            <span key={idx} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-border/20">
                        <div>
                          <span className="font-heading font-bold text-3xl text-densen-gold">
                            {collection.price}€
                          </span>
                          <p className="text-sm text-muted-foreground font-medium mt-1">Made with love • France</p>
                        </div>
                        
                        <div className="flex gap-4">
                          <MagneticButton>
                            <Button 
                              size="lg" 
                              className="rounded-xl bg-gradient-to-r from-densen-gold to-primary hover:from-densen-gold/90 hover:to-primary/90 text-black shadow-xl transition-all duration-300 px-8 py-4 text-lg"
                              onClick={() => addToCart(collection.id)}
                            >
                              Ajouter au panier
                            </Button>
                          </MagneticButton>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <MagneticButton>
              <Button variant="outline" size="lg" className="rounded-xl border-densen-gold text-densen-gold hover:bg-densen-gold hover:text-black transition-all duration-300">
                <Link to="/dense" className="flex items-center gap-3">
                  <ArrowLeft size={20} />
                  Retour à DENSE
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Collections;
