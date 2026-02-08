import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { ArrowRight, ArrowLeft, Sparkles, Star, Heart, ShoppingBag, Check, Phone, Clock, Shield, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import logoDensen from "@/assets/logo-densen.png";
import { DatabaseService, Product } from "@/services/DatabaseService";

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

// Fonction pour mapper les IDs de collections vers les routes
const getCollectionRoute = (collectionId: number): string => {
  const routes: { [key: number]: string } = {
    1: '/dense/collections/les-drapés',
    2: '/dense/collections/les-passe-partout',
    3: '/dense/collections/les-modulables',
    4: '/dense/collections/les-escamotables',
    5: '/dense/collections/les-ajustables',
    6: '/dense/collections/les-panachés',
    7: '/dense/collections/les-accessoires'
  };
  return routes[collectionId] || '/dense';
};

// 7 collections DENSE avec données enrichies
const collections = [
  {
    id: 1,
    name: "Les Drapés",
    subtitle: "Sans Couture",
    description: "L'élégance fluide, aucune limite",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=600&auto=format&fit=crop",
    price: "À partir de 89€",
    icon: "🌊",
    features: ["Fluidité absolue", "Sans couture visible", "Tissu premium", "2 en 1"],
    rating: 4.9,
    reviews: 127,
    badge: "Best-seller"
  },
  {
    id: 2,
    name: "Les Passe-Partout",
    subtitle: "Multi-Looks",
    description: "Un vêtement, mille possibilités",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
    price: "À partir de 79€",
    icon: "🔄",
    features: ["3 styles en 1", "Transformation rapide", "Day & Night", "Voyage friendly"],
    rating: 4.8,
    reviews: 98,
    badge: "Coup de cœur"
  },
  {
    id: 3,
    name: "Les Modulables",
    subtitle: "2, 3, 4... en 1",
    description: "La transformation infinie",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    price: "À partir de 99€",
    icon: "🧩",
    features: ["4 configurations", "Système breveté", "Magnétique", "Customisable"],
    rating: 4.9,
    reviews: 156,
    badge: "Innovation"
  },
  {
    id: 4,
    name: "Les Escamotables",
    subtitle: "Démontables",
    description: "Le magique pratique",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop",
    price: "À partir de 119€",
    icon: "✨",
    features: ["Effet magique", "Technologie unique", "Sur mesure", "Premium"],
    rating: 5.0,
    reviews: 89,
    badge: "Exclusif"
  },
  {
    id: 5,
    name: "Les Ajustables",
    subtitle: "Unisexes & Unitailles",
    description: "L'élégance inclusive",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=600&auto=format&fit=crop",
    price: "À partir de 69€",
    icon: "🤝",
    features: ["Taille unique", "Unisexe", "Ajustement parfait", "Comfort"],
    rating: 4.7,
    reviews: 203,
    badge: "Accessible"
  },
  {
    id: 6,
    name: "Les Panachés",
    subtitle: "Recomposés",
    description: "Votre créativité sans limites",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop",
    price: "À partir de 89€",
    icon: "🎨",
    features: ["Personnalisable", "Tissus variés", "Unique pièce", "Artisanal"],
    rating: 4.8,
    reviews: 67,
    badge: "Créatif"
  },
  {
    id: 7,
    name: "Les Accessoires",
    subtitle: "Compléments Parfaits",
    description: "La touche finale",
    image: "https://images.unsplash.com/photo-1620799140408-edc698cb5d6e?q=80&w=600&auto=format&fit=crop",
    price: "À partir de 29€",
    icon: "💎",
    features: ["Transformation instant", "Multi-usages", "Premium materials", "Gift ready"],
    rating: 4.6,
    reviews: 145,
    badge: "Essentiel"
  }
];

// Quiz pour le manifeste personnel
const quizQuestions = [
  {
    question: "Quel est votre style naturel ?",
    options: [
      { value: "afro-urbain", label: "Afro-urbain" },
      { value: "moderne", label: "Moderne" },
      { value: "traditionnel", label: "Traditionnel" }
    ]
  },
  {
    question: "Quelle valeur vous guide ?",
    options: [
      { value: "foi", label: "Foi" },
      { value: "courage", label: "Courage" },
      { value: "creativite", label: "Créativité" }
    ]
  },
  {
    question: "Quelle occasion ?",
    options: [
      { value: "travail", label: "Travail" },
      { value: "soiree", label: "Soirée" },
      { value: "casual", label: "Casual" }
    ]
  }
];

// Système intelligent de résultats basé sur les choix
const generatePersonalizedResult = (answers: string[]) => {
  // Définition des profils et poids
  const profiles = {
    afro_urbain: {
      name: "Afro-Urbain Moderne",
      quotes: [
        "Je suis l'élégance urbaine avec une âme africaine",
        "Mon style raconte une histoire de fusion culturelle",
        "Je porte mon héritage avec une touche contemporaine"
      ],
      pieces: ["Les Drapés", "Les Ajustables", "Les Accessoires"],
      description: "Un équilibre parfait entre tradition et modernité"
    },
    moderne: {
      name: "Minimaliste Chic",
      quotes: [
        "La simplicité est l'ultime sophistication",
        "Mon style est pureté et élégance",
        "Je crois en la beauté de l'essentiel"
      ],
      pieces: ["Les Modulables", "Les Escamotables", "Les Passe-Partout"],
      description: "Élégance intemporelle et design épuré"
    },
    traditionnel: {
      name: "Héritage Culturel",
      quotes: [
        "Je suis l'histoire que je porte",
        "Mon style est un hommage à mes racines",
        "Je célèbre la tradition avec fierté"
      ],
      pieces: ["Les Panachés", "Les Drapés", "Les Accessoires"],
      description: "Richesse culturelle et artisanat authentique"
    },
    creatif: {
      name: "Artiste Expressif",
      quotes: [
        "Mon style est ma toile d'expression",
        "Je crée ma propre règle de beauté",
        "L'originalité est ma signature"
      ],
      pieces: ["Les Panachés", "Les Modulables", "Les Accessoires"],
      description: "Créativité sans limites et style unique"
    },
    audacieux: {
      name: "Audacieux Confiant",
      quotes: [
        "Je suis la confiance que je projette",
        "Mon style ose là que d'autres hésitent",
        "Je porte mon courage comme une seconde peau"
      ],
      pieces: ["Les Escamotables", "Les Modulables", "Les Passe-Partout"],
      description: "Caractère fort et style affirmé"
    },
    spirituel: {
      name: "Spirituel Élégant",
      quotes: [
        "Je suis tissu de force et de foi",
        "Mon style reflète ma lumière intérieure",
        "L'élégance vient de l'âme"
      ],
      pieces: ["Les Drapés", "Les Ajustables", "Les Accessoires"],
      description: "Harmonie entre corps et esprit"
    }
  };

  // Analyse des réponses pour déterminer le profil dominant
  const styleScore = { afro_urbain: 0, moderne: 0, traditionnel: 0 };
  const valueScore = { creatif: 0, audacieux: 0, spirituel: 0 };
  
  // Pondération selon les réponses
  if (answers[0] === "afro-urbain") styleScore.afro_urbain += 3;
  if (answers[0] === "moderne") styleScore.moderne += 3;
  if (answers[0] === "traditionnel") styleScore.traditionnel += 3;
  
  if (answers[1] === "creativite") valueScore.creatif += 3;
  if (answers[1] === "courage") valueScore.audacieux += 3;
  if (answers[1] === "foi") valueScore.spirituel += 3;
  
  // Ajout de variabilité selon l'occasion
  if (answers[2] === "soiree") {
    valueScore.audacieux += 1;
    styleScore.moderne += 1;
  }
  if (answers[2] === "travail") {
    valueScore.spirituel += 1;
    styleScore.afro_urbain += 1;
  }
  if (answers[2] === "casual") {
    valueScore.creatif += 1;
    styleScore.traditionnel += 1;
  }

  // Détermination du profil dominant
  const dominantStyle = Object.keys(styleScore).reduce((a, b) => 
    styleScore[a as keyof typeof styleScore] > styleScore[b as keyof typeof styleScore] ? a : b
  ) as keyof typeof profiles;
  
  const dominantValue = Object.keys(valueScore).reduce((a, b) => 
    valueScore[a as keyof typeof valueScore] > valueScore[b as keyof typeof valueScore] ? a : b
  ) as keyof typeof profiles;

  // Combinaison des profils pour un résultat unique
  const styleProfile = profiles[dominantStyle];
  const valueProfile = profiles[dominantValue];
  
  // Sélection aléatoire de la citation basée sur les profils
  const allQuotes = [...styleProfile.quotes, ...valueProfile.quotes];
  const selectedQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
  
  // Combinaison intelligente des pièces
  const allPieces = [...new Set([...styleProfile.pieces, ...valueProfile.pieces])];
  const selectedPieces = allPieces.slice(0, 3); // 3 pièces maximum
  
  // Génération du nom de profil personnalisé
  const profileNames = {
    afro_urbain: "Urbain",
    moderne: "Moderne", 
    traditionnel: "Traditionnel",
    creatif: "Créatif",
    audacieux: "Audacieux",
    spirituel: "Spirituel"
  };
  
  const profileName = `${profileNames[dominantStyle]} & ${profileNames[dominantValue]}`;
  
  return {
    profile: profileName,
    quote: selectedQuote,
    pieces: selectedPieces,
    description: `${styleProfile.description} et ${valueProfile.description.toLowerCase()}`,
    confidence: Math.max(
      styleScore[dominantStyle as keyof typeof styleScore],
      valueScore[dominantValue as keyof typeof valueScore]
    )
  };
};

const DENSEN = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [hoveredCollection, setHoveredCollection] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // États avec stockage partagé
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showAddedToCart, setShowAddedToCart] = useState<number | null>(null);

  // Charger le panier et les favoris depuis localStorage au montage
  useEffect(() => {
    // Les produits ne sont plus chargés depuis la base de données
    // On utilise directement les collections statiques
    setLoading(false);
    setCartItems(getSharedCart());
    setFavorites(getSharedFavorites());
  }, []);

  const addToCart = (itemId: number) => {
    const newCart = [...cartItems, itemId];
    setCartItems(newCart);
    setSharedCart(newCart);
    setShowAddedToCart(itemId);
    setTimeout(() => setShowAddedToCart(null), 2000);
  };

  const toggleFavorite = (itemId: number) => {
    let newFavorites;
    if (favorites.includes(itemId)) {
      newFavorites = favorites.filter(id => id !== itemId);
    } else {
      newFavorites = [...favorites, itemId];
    }
    setFavorites(newFavorites);
    setSharedFavorites(newFavorites);
  };

  const isInCart = (itemId: number) => cartItems.includes(itemId);
  const isFavorite = (itemId: number) => favorites.includes(itemId);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const getResult = () => {
    if (answers.length === quizQuestions.length) {
      return generatePersonalizedResult(answers);
    }
    // Résultat par défaut si le quiz n'est pas terminé
    return {
      profile: "Style Unique",
      quote: "Je suis unique, tout comme mon style",
      pieces: ["Les Drapés", "Les Modulables"],
      description: "Un style qui vous ressemble",
      confidence: 0
    };
  };

  const result = getResult();
  // REMOVED: Cart and favorites functions - not requested

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
            {cartItems.length > 0 ? `${cartItems.length} article${cartItems.length > 1 ? 's' : ''}` : 'Panier'}
          </span>
        </Link>
      </motion.div>
      {/* Hero Section - Ultra Premium */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=2787&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />
          {/* Animated overlay premium */}
          <div className="absolute inset-0 bg-gradient-to-t from-densen-gold/20 via-transparent to-primary/10 opacity-60" />
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-densen-gold rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container-main">
          <div className="max-w-3xl">
            {/* Carte panier flottante */}
            {/* REMOVED - Panier retiré selon demande */}

            {/* Logo premium */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="mb-8 inline-block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-densen-gold/20 blur-3xl rounded-full" />
                <img 
                  src={logoDensen} 
                  alt="DENSEN by fernanden" 
                  className="h-40 md:h-52 lg:h-64 object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] relative z-10"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 mb-8"
            >
              {/* Badges premium */}
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-densen-gold/20 backdrop-blur-md rounded-full text-densen-gold font-heading text-sm font-medium border border-densen-gold/30">
                  <Sparkles size={16} className="animate-pulse" />
                  L'Art de la Transformation
                </div>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 backdrop-blur-md rounded-full text-primary font-heading text-sm font-medium border border-primary/30">
                  <Shield size={16} />
                  Qualité Premium
                </div>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/20 backdrop-blur-md rounded-full text-secondary font-heading text-sm font-medium border border-secondary/30">
                  <Clock size={16} />
                  Livraison 48h
                </div>
              </div>
            </motion.div>
            
            <h1 className="heading-hero text-white mb-8">
              <span className="font-serif bg-gradient-to-r from-densen-gold via-white to-primary bg-clip-text text-transparent">DENSE - 7 façons de réinventer votre style</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="body-large text-white/90 mb-8 leading-relaxed max-w-2xl"
            >
              Plus qu'une marque, DENSE est l'expression d'un style raffiné où chaque vêtement devient un manifeste personnel. 
              Alliant héritage et modernité, nous créons des pièces transformables qui célèbrent votre identité unique.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-densen-gold/10 to-primary/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-densen-gold/20 shadow-2xl"
            >
              <blockquote className="font-serif text-3xl italic text-densen-gold text-center mb-4">
                "Je suis tissu de force et de foi"
              </blockquote>
              <p className="text-center text-white/80 text-sm font-medium">
                Notre devise, votre identité
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              {/* Lien Voir les collections supprimé */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manifeste Section */}
      <section id="manifeste" className="py-20 bg-muted/20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="heading-section text-foreground mb-6">
              Notre <span className="text-densen-gold">Manifeste</span>
            </h2>
            
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/30">
              <p className="body-large text-muted-foreground mb-8 leading-relaxed">
                Plus qu'une marque, DENSE est l'expression d'un style raffiné où chaque vêtement devient un manifeste personnel. 
                Alliant héritage et modernité, nous créons des pièces transformables qui célèbrent votre identité unique.
              </p>
              
              <blockquote className="font-serif text-3xl italic text-densen-gold mb-8">
                "Je suis tissu de force et de foi"
              </blockquote>
              
              <p className="text-muted-foreground">
                Chaque pièce est conçue pour s'adapter à votre vie, vos valeurs et vos aspirations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collections Carousel - Ultra Premium */}
      <section id="collections" className="py-24 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-densen-gold/8 via-transparent to-primary/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.densen-gold/10),transparent_50%)]" />
        
        <div className="container-main relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-densen-gold/20 to-primary/20 backdrop-blur-md rounded-full border border-densen-gold/30 mb-6">
              <Sparkles size={16} className="text-densen-gold animate-pulse" />
              <span className="font-heading text-sm font-medium text-densen-gold">L'Excellence Transformable</span>
              <Sparkles size={16} className="text-primary animate-pulse delay-300" />
            </div>
            <h2 className="heading-section text-foreground mb-6">
              Les 7 <span className="bg-gradient-to-r from-densen-gold to-primary bg-clip-text text-transparent">Collections</span>
            </h2>
            <p className="body-large text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Découvrez nos collections uniques et cliquez pour explorer les articles
            </p>
          </motion.div>

          {/* Navigation hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-3 font-medium">
              <ArrowRight size={16} className="text-densen-gold animate-bounce" />
              <span>Faites défiler pour découvrir</span>
              <ArrowRight size={16} className="text-primary animate-bounce delay-200" />
            </p>
          </motion.div>

          {/* Grid des collections avec bouton Découvrir */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {!loading && collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
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

                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="heading-card text-foreground mb-1">
                            {collection.name}
                          </h3>
                          <p className="text-sm text-densen-gold font-medium">
                            {collection.subtitle}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-densen-gold/20 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">{collection.icon}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {collection.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border/20">
                      <div>
                        <span className="font-heading font-bold text-2xl text-densen-gold">
                          {collection.price}
                        </span>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={12} className="text-densen-gold fill-current" />
                          <span className="text-xs text-muted-foreground font-medium">
                            {collection.rating} ({collection.reviews} avis)
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="rounded-xl bg-densen-gold hover:bg-densen-gold/90 text-black transition-all duration-300"
                      >
                        <Link to={getCollectionRoute(collection.id)} className="flex items-center gap-2">
                          Découvrir
                          <ArrowRight size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Manifeste Personnel - Premium */}
      <section id="manifeste" className="py-24 bg-gradient-to-br from-muted/30 to-card/20 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-densen-gold/5 via-transparent to-primary/3 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,theme(colors.densen-gold/8),transparent_60%)]" />
        
        <div className="container-main relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-densen-gold/20 to-secondary/20 backdrop-blur-md rounded-full border border-densen-gold/30 mb-6">
              <Sparkles size={16} className="text-densen-gold animate-pulse" />
              <span className="font-heading text-sm font-medium text-densen-gold">Votre Style Unique</span>
              <Sparkles size={16} className="text-secondary animate-pulse delay-300" />
            </div>
            
            <h2 className="heading-section text-foreground mb-6">
              Votre <span className="bg-gradient-to-r from-densen-gold to-primary bg-clip-text text-transparent">Manifeste</span> Personnel
            </h2>
            
            <p className="body-large text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Découvrez la pièce qui incarne votre identité et vos valeurs grâce à notre algorithme de style intelligent
            </p>
          </motion.div>
          
          {!showResult ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl rounded-3xl p-10 md:p-16 border border-border/20 shadow-2xl shadow-densen-gold/10 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-densen-gold/5 via-transparent to-transparent" />
                
                {/* Progress bar premium */}
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-muted-foreground font-medium">
                      Étape {currentQuestion + 1} sur {quizQuestions.length}
                    </span>
                    <span className="text-sm text-densen-gold font-bold">
                      {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
                    </span>
                  </div>
                  
                  {/* Progress dots */}
                  <div className="flex gap-3 justify-center mb-8">
                    {[...Array(quizQuestions.length)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-3 rounded-full transition-all duration-700 ${
                          i <= currentQuestion 
                            ? 'bg-gradient-to-r from-densen-gold to-primary w-12' 
                            : 'bg-muted w-3'
                        }`}
                        initial={{ width: i <= currentQuestion ? '3rem' : '0.75rem' }}
                        animate={{ width: i <= currentQuestion ? '3rem' : '0.75rem' }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Question */}
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <h3 className="font-heading text-3xl text-foreground mb-10 text-center">
                    {quizQuestions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-4">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option.value)}
                        className="w-full text-left p-6 rounded-2xl border border-border/30 hover:border-densen-gold/50 hover:bg-gradient-to-r hover:from-densen-gold/5 hover:to-primary/5 transition-all duration-400 group relative overflow-hidden"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                      >
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="font-medium text-xl text-foreground group-hover:text-densen-gold transition-colors">
                            {option.label}
                          </span>
                          <div className="w-10 h-10 rounded-full border-2 border-densen-gold/30 group-hover:border-densen-gold group-hover:bg-densen-gold/10 flex items-center justify-center transition-all duration-300">
                            <div className="w-3 h-3 rounded-full bg-densen-gold/50 group-hover:bg-densen-gold transition-colors duration-300" />
                          </div>
                        </div>
                        
                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-densen-gold/8 to-primary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl rounded-3xl p-12 md:p-20 border border-border/20 shadow-2xl shadow-densen-gold/10 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-densen-gold/10 via-transparent to-transparent" />
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                    className="w-24 h-24 bg-gradient-to-br from-densen-gold/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-10"
                  >
                    <Sparkles className="w-12 h-12 text-densen-gold" />
                  </motion.div>
                  
                  <motion.blockquote
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-serif text-5xl italic text-densen-gold mb-8 leading-relaxed max-w-2xl mx-auto"
                  >
                    "{result.quote}"
                  </motion.blockquote>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-10"
                  >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-densen-gold/20 to-primary/20 border border-densen-gold/30 rounded-full mb-6">
                      <Sparkles size={20} className="text-densen-gold" />
                      <span className="font-heading font-bold text-lg text-densen-gold">
                        {result.profile}
                      </span>
                      <Sparkles size={20} className="text-primary" />
                    </div>
                    
                    <p className="text-muted-foreground mb-8 text-xl leading-relaxed max-w-2xl mx-auto">
                      {result.description}
                    </p>
                    
                    <p className="text-muted-foreground mb-6 text-lg font-medium">Les pièces qui vous correspondent :</p>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                      {result.pieces.map((piece, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.15 }}
                          className="bg-gradient-to-r from-densen-gold/10 to-primary/10 border border-densen-gold/20 px-8 py-4 rounded-full"
                        >
                          <span className="font-heading font-bold text-densen-gold text-lg">{piece}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                  >
                    <Button 
                      onClick={resetQuiz} 
                      variant="outline" 
                      className="rounded-xl border-2 border-densen-gold text-densen-gold hover:bg-densen-gold hover:text-black transition-all duration-300 px-8 py-4 text-lg"
                    >
                      Recommencer le quiz
                    </Button>
                    <MagneticButton>
                      <Button className="rounded-xl bg-gradient-to-r from-densen-gold to-primary hover:from-densen-gold/90 hover:to-primary/90 text-black transition-all duration-300 px-8 py-4 text-lg shadow-xl">
                        <Link to="/dense/contact" className="flex items-center gap-3">
                          Prendre RDV Styliste
                          <ArrowRight size={20} />
                        </Link>
                      </Button>
                    </MagneticButton>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

    </Layout>
  );
};

export default DENSEN;
