import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Heart, ShoppingBag, Check, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { placeholderImages } from "@/components/ui/BrandedPlaceholder";

// Stockage partagé du panier
const getSharedCart = (): number[] => {
  const stored = localStorage.getItem('dense-cart-items');
  return stored ? JSON.parse(stored) : [];
};

const setSharedCart = (items: number[]) => {
  localStorage.setItem('dense-cart-items', JSON.stringify(items));
};

// Stockage partagé des favoris
const getSharedFavorites = (): number[] => {
  const stored = localStorage.getItem('dense-favorites');
  return stored ? JSON.parse(stored) : [];
};

const setSharedFavorites = (items: number[]) => {
  localStorage.setItem('dense-favorites', JSON.stringify(items));
};

// Données provisoires pour la collection Les Drapés
const collectionData = {
  name: "Les Drapés",
  subtitle: "Sans Couture",
  description: "L'élégance fluide, aucune limite",
  fullDescription: "Découvrez notre collection signature de drapés sans couture, où chaque pièce est une œuvre d'art fluide qui épouse votre silhouette avec une grâce naturelle. Conçus pour les femmes qui recherchent l'élégance sans effort, nos drapés sont la quintessence du luxe discret.",
  image: placeholderImages.collection.dense,
  price: "À partir de 89€",
  features: [
    "Sans couture visible",
    "Tissus fluides premium",
    "Ajustement parfait",
    "Polyvalence maximale"
  ],
  products: [
    {
      id: 1,
      name: "Drapé Soie Éternelle",
      price: "129€",
      image: placeholderImages.product.dense,
      description: "Élégance intemporelle en soie naturelle",
      badge: "Best-seller"
    },
    {
      id: 2,
      name: "Drapé Coton Bio",
      price: "89€",
      image: placeholderImages.product.dense,
      description: "Confort et conscience écologique",
      badge: "Éco-responsable"
    },
    {
      id: 3,
      name: "Drapé Soirée Prestige",
      price: "189€",
      image: placeholderImages.product.dense,
      description: "Luxueux et sophistiqué",
      badge: "Exclusive"
    },
    {
      id: 4,
      name: "Drapé Quotidien Chic",
      price: "69€",
      image: placeholderImages.product.dense,
      description: "Élégance au quotidien",
      badge: "Tendance"
    }
  ],
  testimonials: [
    {
      name: "Sophie L.",
      text: "Je n'avais jamais porté quelque chose d'aussi confortable et élégant. Mon drapé est devenu ma pièce signature !",
      rating: 5,
      image: placeholderImages.avatar.dense
    },
    {
      name: "Marie K.",
      text: "La qualité des tissus et le sans couture... c'est absolument divin ! Je recommande vivement.",
      rating: 5,
      image: placeholderImages.avatar.dense
    }
  ]
};

const DenseCollectionLesDrapes = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  
  // États avec stockage partagé
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [showAddedToCart, setShowAddedToCart] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Charger le panier et les favoris depuis localStorage au montage
  useEffect(() => {
    setCartItems(getSharedCart());
    setFavorites(getSharedFavorites());
  }, []);

  const addToCart = (productId: number) => {
    const newCart = [...cartItems, productId];
    setCartItems(newCart);
    setSharedCart(newCart);
    setShowAddedToCart(productId);
    setTimeout(() => setShowAddedToCart(null), 2000);
  };

  const toggleFavorite = (productId: number) => {
    let newFavorites;
    if (favorites.includes(productId)) {
      newFavorites = favorites.filter(id => id !== productId);
    } else {
      newFavorites = [...favorites, productId];
    }
    setFavorites(newFavorites);
    setSharedFavorites(newFavorites);
  };

  const isInCart = (productId: number) => cartItems.includes(productId);
  const isFavorite = (productId: number) => favorites.includes(productId);

  return (
    <Layout>
      {/* Panier flottant visible */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-6 right-6 z-50 bg-densen-gold/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-densen-gold/30"
      >
        <Link to="/cart" className="flex items-center gap-3 text-black group">
          <div className="relative">
            <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
            {cartItems.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
              >
                {cartItems.length}
              </motion.div>
            )}
          </div>
          <span className="font-heading font-semibold">
            {(() => {
              if (cartItems.length === 0) return 'Panier';
              const plural = cartItems.length > 1 ? 's' : '';
              return `${cartItems.length} article${plural}`;
            })()}
          </span>
        </Link>
      </motion.div>
      {/* Hero Section Collection */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${collectionData.image}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black/90 via-deep-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="relative z-10 container-main">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            {/* Badge premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-densen-gold/20 backdrop-blur-md rounded-full border border-densen-gold/30 mb-8"
            >
              <div className="w-2 h-2 bg-densen-gold rounded-full animate-pulse" />
              <span className="font-heading text-xs uppercase tracking-[0.3em] text-densen-gold font-semibold">
                Collection Signature
              </span>
              <div className="w-2 h-2 bg-densen-gold rounded-full animate-pulse delay-300" />
            </motion.div>

            {/* Bouton retour bien positionné */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <Link 
                to="/dense" 
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 group"
              >
                <ChevronRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Retour à DENSE</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="w-20 h-20 bg-densen-gold/20 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <ShoppingBag size={24} className="text-densen-gold" />
                </motion.div>
                <div>
                  <h1 className="heading-hero text-white mb-3">
                    <span className="bg-gradient-to-r from-densen-gold to-white bg-clip-text text-transparent">
                      {collectionData.name}
                    </span>
                  </h1>
                  <p className="text-xl text-white/90 font-medium">
                    {collectionData.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="body-large text-white/90 mb-10 leading-relaxed max-w-3xl"
            >
              {collectionData.fullDescription}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              {/* Lien Découvrir les pièces supprimé */}
              <Button size="lg" variant="outline" className="rounded-xl border-2 border-densen-gold/50 text-densen-gold hover:bg-densen-gold/10 backdrop-blur-sm transition-all duration-300 px-8 py-4 text-lg">
                <Link to="/dense/contact" className="flex items-center gap-3">
                  Prendre RDV styliste
                  <ArrowRight size={20} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-muted/20">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div>
                  <h2 className="heading-section text-foreground mb-4">
                    L'Art du <span className="text-densen-gold">Drapé Parfait</span>
                  </h2>
                  <p className="body-large text-muted-foreground leading-relaxed">
                    {collectionData.fullDescription}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {collectionData.features.map((feature, index) => (
                    <motion.div
                      key={`feature-${feature}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-densen-gold rounded-full" />
                      <span className="text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src={collectionData.image}
                  alt={collectionData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -top-4 -right-4 bg-densen-gold text-black px-4 py-2 rounded-full font-heading font-medium"
              >
                Sans Couture
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-4 -left-4 bg-white text-black px-4 py-2 rounded-full font-heading font-medium"
              >
                Made in France
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Notre <span className="text-densen-gold">Collection</span>
            </h2>
            <p className="body-large text-muted-foreground">
              Des pièces uniques pour un style inoubliable
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collectionData.products.map((product, index) => (
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
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{
                      transform: hoveredProduct === product.id ? 'scale(1.08)' : 'scale(1)'
                    }}
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-densen-gold/90 backdrop-blur-sm text-black rounded-full text-xs font-heading font-medium">
                      {product.badge}
                    </span>
                  </div>
                  
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
                      onClick={() => toggleFavorite(product.id)}
                      className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-colors"
                    >
                      <Heart 
                        size={18} 
                        className={isFavorite(product.id) ? 'text-red-500 fill-red-500' : 'text-densen-gold hover:text-red-500'} 
                      />
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
                    <Button 
                      className="w-full rounded-xl bg-densen-gold hover:bg-densen-gold/90 text-black"
                      onClick={() => addToCart(product.id)}
                      disabled={isInCart(product.id)}
                    >
                      {isInCart(product.id) ? (
                        <span className="flex items-center gap-2">
                          <Check size={18} />
                          Ajouté
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <ShoppingBag size={18} />
                          Ajouter au panier
                        </span>
                      )}
                    </Button>
                  </motion.div>
                  
                  {/* Notification ajout panier */}
                  {showAddedToCart === product.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-full font-heading font-medium shadow-2xl z-30 flex items-center gap-2"
                    >
                      <Check size={20} />
                      Ajouté au panier !
                    </motion.div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-densen-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  <p className="font-heading font-bold text-densen-gold text-lg">
                    {product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Ce que nos clientes <span className="text-densen-gold">en disent</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {collectionData.testimonials.map((testimonial, index) => (
              <motion.div
                key={`testimonial-${testimonial.name}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-card rounded-2xl p-6 border border-border/30"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={`star-${testimonial.name}-${i}`} size={16} className="fill-densen-gold text-densen-gold" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">Cliente satisfaite</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="w-20 h-20 bg-densen-gold/20 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <ShoppingBag size={24} className="text-densen-gold" />
              </motion.div>
              <div>
                <h1 className="heading-hero text-white mb-3">
                  <span className="bg-gradient-to-r from-densen-gold to-white bg-clip-text text-transparent">
                    {collectionData.name}
                  </span>
                </h1>
                <p className="text-xl text-white/90 font-medium">
                  {collectionData.subtitle}
                </p>
              </div>
            </div>
          </motion.div>
            
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="body-large text-white/90 mb-10 leading-relaxed max-w-3xl"
          >
            {collectionData.fullDescription}
          </motion.p>
            
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Lien Découvrir les pièces supprimé */}
            <Button size="lg" variant="outline" className="rounded-xl border-2 border-densen-gold/50 text-densen-gold hover:bg-densen-gold/10 backdrop-blur-sm transition-all duration-300 px-8 py-4 text-lg">
              <Link to="/dense/contact" className="flex items-center gap-3">
                Prendre RDV styliste
                <ArrowRight size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default DenseCollectionLesDrapes;
