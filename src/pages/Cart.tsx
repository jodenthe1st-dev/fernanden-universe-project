import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Plus, Minus, Trash2, Heart, Shield, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { placeholderImages } from "@/components/ui/BrandedPlaceholder";
import { DatabaseService } from "@/services/DatabaseService";
import logger from "@/lib/logger";

// Stockage partagé du panier (compatible avec les autres pages)
const getSharedCart = (): { collectionId: number; quantity: number }[] => {
  try {
    const stored = localStorage.getItem('dense-cart-items');
    const items = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(items)) return [];

    // Convertir les IDs simples en objets avec quantité
    const cartMap: { [key: number]: number } = {};
    items.forEach((id: number) => {
      if (typeof id === 'number') {
        cartMap[id] = (cartMap[id] || 0) + 1;
      }
    });

    return Object.entries(cartMap).map(([collectionId, quantity]) => ({
      collectionId: Number.parseInt(collectionId),
      quantity
    }));
  } catch {
    // Données corrompues — on vide le panier proprement
    localStorage.removeItem('dense-cart-items');
    return [];
  }
};

const setSharedCart = (items: { collectionId: number; quantity: number }[]) => {
  // Convertir les objets en IDs simples pour compatibilité
  const simpleItems: number[] = [];
  items.forEach(item => {
    for (let i = 0; i < item.quantity; i++) {
      simpleItems.push(item.collectionId);
    }
  });
  localStorage.setItem('dense-cart-items', JSON.stringify(simpleItems));
};

// Données des collections pour le panier
interface CollectionItem {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  icon: string;
}

const fallbackCollections: CollectionItem[] = [
  {
    id: 1,
    name: "Les Drapés",
    subtitle: "Sans Couture",
    price: 89,
    image: placeholderImages.product.dense,
    icon: "🌊"
  },
  {
    id: 2,
    name: "Les Passe-Partout",
    subtitle: "Multi-Looks",
    price: 79,
    image: placeholderImages.blog.dense,
    icon: "🔄"
  },
  {
    id: 3,
    name: "Les Modulables",
    subtitle: "2, 3, 4... en 1",
    price: 99,
    image: placeholderImages.hero.dense,
    icon: "🧩"
  },
  {
    id: 4,
    name: "Les Escamotables",
    subtitle: "Démontables",
    price: 119,
    image: placeholderImages.collection.dense,
    icon: "✨"
  },
  {
    id: 5,
    name: "Les Ajustables",
    subtitle: "Unisexes & Unitailles",
    price: 69,
    image: placeholderImages.avatar.dense,
    icon: "🤝"
  },
  {
    id: 6,
    name: "Les Panachés",
    subtitle: "Recomposés",
    price: 89,
    image: placeholderImages.product.dense,
    icon: "🎨"
  },
  {
    id: 7,
    name: "Les Accessoires",
    subtitle: "Compléments Parfaits",
    price: 29,
    image: placeholderImages.blog.dense,
    icon: "💎"
  }
];

const parseProductPrice = (price: string | null | undefined): number => {
  if (!price) return 0;
  const normalized = price.replace(",", ".").replace(/[^\d.]/g, "");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const Cart = () => {
  // Panier avec stockage partagé
  const [cartItems, setCartItems] = useState<{ collectionId: number; quantity: number }[]>([]);
  const [collections, setCollections] = useState<CollectionItem[]>(fallbackCollections);

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    setCartItems(getSharedCart());
  }, []);

  useEffect(() => {
    const loadDenseProducts = async () => {
      try {
        const products = await DatabaseService.getProducts({ category: "dense", status: "published" });
        if (!products.length) return;

        const mappedCollections: CollectionItem[] = products.map((product, index) => ({
          id: index + 1,
          name: product.name || `Produit DENSE ${index + 1}`,
          subtitle: product.category ? `Categorie: ${product.category}` : "Produit DENSE",
          price: parseProductPrice(product.price),
          image: product.featured_image || product.images?.[0] || placeholderImages.product.dense,
          icon: "DENSE",
        }));

        setCollections(mappedCollections);
      } catch (error) {
        logger.warn("Cart: unable to load DENSE products from Supabase, using fallback", error);
      }
    };

    void loadDenseProducts();
  }, []);

  // Écouter les changements de panier (pour la synchronisation entre pages)
  useEffect(() => {
    const handleStorageChange = () => {
      setCartItems(getSharedCart());
    };

    globalThis.addEventListener('storage', handleStorageChange);
    return () => globalThis.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateQuantity = (collectionId: number, newQuantity: number) => {
    let newCart;
    if (newQuantity === 0) {
      newCart = cartItems.filter(item => item.collectionId !== collectionId);
    } else {
      newCart = cartItems.map(item =>
        item.collectionId === collectionId
          ? { ...item, quantity: newQuantity }
          : item
      );
    }
    setCartItems(newCart);
    setSharedCart(newCart);
  };

  const removeFromCart = (collectionId: number) => {
    const newCart = cartItems.filter(item => item.collectionId !== collectionId);
    setCartItems(newCart);
    setSharedCart(newCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const collection = collections.find(c => c.id === item.collectionId);
      return total + (collection ? collection.price * item.quantity : 0);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <section className="min-h-[50vh] sm:min-h-[60vh] md:min-h-[80vh] flex items-center py-8 sm:py-12 md:py-20">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-densen-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8">
                <ShoppingBag size={28} className="text-densen-gold w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
              </div>

              <h1 className="heading-section mb-4 sm:mb-6">
                Votre <span className="text-densen-gold">Panier</span> est vide
              </h1>

              <p className="body-large text-muted-foreground mb-6 sm:mb-8">
                Découvrez nos collections uniques et trouvez la pièce qui vous ressemble
              </p>

              <MagneticButton>
                <Button size="lg" className="rounded-xl bg-gradient-to-r from-densen-gold to-primary hover:from-densen-gold/90 hover:to-primary/90 text-black shadow-xl transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base md:px-8 md:py-4 md:text-lg">
                  <Link to="/dense#collections" className="flex items-center gap-3">
                    Découvrir les collections
                    <ShoppingBag size={14} className="text-densen-gold w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="container-main">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="heading-section mb-2">
                  Votre <span className="text-densen-gold">Panier</span>
                </h1>
                <p className="text-muted-foreground">
                  {getTotalItems()} article{getTotalItems() > 1 ? 's' : ''}
                </p>
              </div>

              <MagneticButton>
                <Button variant="outline" size="lg" className="rounded-xl border-densen-gold text-densen-gold hover:bg-densen-gold hover:text-black transition-all duration-300">
                  <Link to="/dense" className="flex items-center gap-2">
                    <ArrowLeft size={20} />
                    Continuer mes achats
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => {
                const collection = collections.find(c => c.id === item.collectionId);
                if (!collection) return null;

                return (
                  <motion.div
                    key={item.collectionId}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-card rounded-2xl border border-border/20 p-6 hover:border-densen-gold/40 transition-all duration-300"
                  >
                    <div className="flex gap-6">
                      {/* Image */}
                      <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={collection.image}
                          alt={collection.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                              {collection.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {collection.subtitle}
                            </p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.collectionId)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.collectionId, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-densen-gold/30 flex items-center justify-center hover:bg-densen-gold/10 transition-colors"
                            >
                              <Minus size={16} className="text-densen-gold" />
                            </button>

                            <span className="font-heading font-semibold text-lg w-8 text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.collectionId, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-densen-gold/30 flex items-center justify-center hover:bg-densen-gold/10 transition-colors"
                            >
                              <Plus size={16} className="text-densen-gold" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-heading font-bold text-xl text-densen-gold">
                              {collection.price * item.quantity}€
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {collection.price}€ par pièce
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-card to-card/80 backdrop-blur-xl rounded-2xl border border-border/20 p-8 sticky top-8"
              >
                <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
                  Résumé de la commande
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Sous-total</span>
                    <span>{getTotalPrice()}€</span>
                  </div>

                  <div className="flex justify-between text-muted-foreground">
                    <span>Livraison</span>
                    <span className="text-densen-gold font-medium">Gratuite</span>
                  </div>

                  <div className="h-px bg-border/30" />

                  <div className="flex justify-between">
                    <span className="font-heading font-bold text-xl">Total</span>
                    <span className="font-heading font-bold text-2xl text-densen-gold">
                      {getTotalPrice()}€
                    </span>
                  </div>
                </div>

                {/* Trust elements */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Shield size={16} className="text-densen-gold" />
                    <span>Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock size={16} className="text-primary" />
                    <span>Livraison 48h</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Heart size={16} className="text-secondary" />
                    <span>Satisfaction garantie</span>
                  </div>
                </div>

                <MagneticButton>
                  <Button
                    size="lg"
                    className="w-full rounded-xl bg-gradient-to-r from-densen-gold to-primary hover:from-densen-gold/90 hover:to-primary/90 text-black shadow-xl transition-all duration-300 px-6 py-4 text-lg"
                    onClick={() => {
                      const articles = cartItems.map(item => {
                        const collection = collections.find(c => c.id === item.collectionId);
                        return collection ? `- ${collection.name} (${item.quantity}x) - ${collection.price * item.quantity}€` : '';
                      }).filter(Boolean).join('\n');
                      const message = encodeURIComponent(`Bonjour! Je souhaite valider ma commande d'un montant total de ${getTotalPrice()}€. Voici les articles:\n\n${articles}\n\nPouvez-vous me dire comment procéder pour le paiement et la livraison?`);
                      window.open(`https://wa.me/2290197512636?text=${message}`, '_blank');
                    }}
                  >
                    Valider la commande
                  </Button>
                </MagneticButton>

                <div className="mt-4 space-y-2">
                  <p className="text-xs text-muted-foreground text-center">
                    Ou contactez-nous par email :
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-xl border-densen-gold text-densen-gold hover:bg-densen-gold hover:text-black"
                    onClick={() => {
                      const articles = cartItems.map(item => {
                        const collection = collections.find(c => c.id === item.collectionId);
                        return collection ? `- ${collection.name} (${item.quantity}x) - ${collection.price * item.quantity}€` : '';
                      }).filter(Boolean).join('\n');
                      const subject = encodeURIComponent(`Commande DENSE - Total: ${getTotalPrice()}€`);
                      const body = encodeURIComponent(`Bonjour!\n\nJe souhaite valider ma commande.\n\nTotal: ${getTotalPrice()}€\n\nArticles:\n${articles}\n\nPouvez-vous m'indiquer la procédure pour finaliser ma commande?\n\nMerci!`);
                      globalThis.location.href = `mailto:fernandenentreprises@gmail.com?subject=${subject}&body=${body}`;
                    }}
                  >
                    Envoyer par email
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  En finalisant, vous acceptez nos conditions générales de vente
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
