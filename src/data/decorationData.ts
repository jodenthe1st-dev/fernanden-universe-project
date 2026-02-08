import { Palette, Sparkles, Home, Camera, Check, Star, Phone, Mail, Clock, Wand2 } from "lucide-react"

export const decorationServices = [
  {
    title: "Styling d'Intérieur",
    description: "Revalorisation de votre décoration existante avec les objets et accessoires parfaits",
    features: ["Analyse de votre style", "Sélection d'accessoires", "Mise en scène des espaces", "Conseils shopping"],
    price: "À partir de 1 500€",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
    duration: "1-2 semaines"
  },
  {
    title: "Décoration Événementielle",
    description: "Création d'ambiances uniques pour vos événements privés et professionnels",
    features: ["Thème personnalisé", "Décoration complète", "Installation et démontage", "Coordination visuelle"],
    price: "À partir de 2 500€",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
    duration: "Selon l'événement"
  },
  {
    title: "Home Staging",
    description: "Mise en valeur de votre bien pour une vente ou location rapide et au meilleur prix",
    features: ["Dépersonnalisation", "Optimisation spatiale", "Décoration neutre", "Photos professionnelles"],
    price: "À partir de 2 000€",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
    duration: "2-3 semaines"
  },
  {
    title: "Décoration Commerciale",
    description: "Création d'espaces attractifs pour vos clients et valorisation de votre image de marque",
    features: ["Analyse de marque", "Design visuel", "Signalétique", "Éclairage décoratif"],
    price: "À partir de 3 000€",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop",
    duration: "3-4 semaines"
  }
]

export const processSteps = [
  {
    step: "01",
    title: "Découverte & Analyse",
    description: "Compréhension de vos goûts, de votre style de vie et de vos objectifs décoratifs.",
    duration: "1 jour"
  },
  {
    step: "02",
    title: "Concept & Moodboard",
    description: "Création d'un concept visuel avec palette de couleurs, matériaux et style définis.",
    duration: "2-3 jours"
  },
  {
    step: "03",
    title: "Sélection & Shopping",
    description: "Sélection des pièces décoratives, meubles et accessoires selon le concept validé.",
    duration: "1-2 semaines"
  },
  {
    step: "04",
    title: "Installation & Mise en Scène",
    description: "Installation des éléments décoratifs et mise en scène finale de l'espace.",
    duration: "1-3 jours"
  },
  {
    step: "05",
    title: "Finalisation & Photos",
    description: "Ajustements finaux et shooting photo pour immortaliser le résultat.",
    duration: "1 jour"
  }
]

export const testimonials = [
  {
    name: "Isabelle Petit",
    project: "Appartement 75m² - Paris",
    rating: 5,
    text: "Un travail de magicien ! SHE a transformé mon appartement sans le meubler. Juste avec des accessoires et une bonne organisation, l'espace est devenu magnifique.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100&auto=format&fit=crop"
  },
  {
    name: "Jean-Marc Rousseau",
    project: "Boutique Prêt-à-Porter - Marseille",
    rating: 5,
    text: "La décoration de notre boutique a complètement changé l'expérience client. Les ventes ont augmenté de 30% ! Un investissement très rentable.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
  },
  {
    name: "Camille Dubois",
    project: "Maison 120m² - Lyon",
    rating: 5,
    text: "Pour la vente de notre maison, le home staging de SHE était parfait. La maison s'est vendue en 2 semaines au-dessus du prix estimé.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
  }
]

export const decorationStyles = [
  {
    name: "Contemporain",
    description: "Lignes épurées et modernes",
    icon: Home
  },
  {
    name: "Scandinave", 
    description: "Bois clair et simplicité",
    icon: Sparkles
  },
  {
    name: "Industriel",
    description: "Métaux et matières brutes",
    icon: Palette
  },
  {
    name: "Bohème",
    description: "Naturel et authentique",
    icon: Wand2
  }
]

export const faq = [
  {
    question: "Comment fonctionne le service de décoration ?",
    answer: "Nous analysons votre espace, créons un concept, puis sélectionnons et installons les éléments décoratifs."
  },
  {
    question: "Quel budget prévoir pour la décoration ?",
    answer: "À partir de 1 500€ selon la superficie et le niveau de décoration souhaité."
  },
  {
    question: "Combien de temps dure une décoration ?",
    answer: "Généralement 1 à 3 semaines selon la complexité du projet."
  }
]
