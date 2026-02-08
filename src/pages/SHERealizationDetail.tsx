import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users, Check, Star, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const realizationsData = {
  "mariage-traditionnel-clara": {
    id: 1,
    title: "Mariage Traditionnel Clara",
    category: "decoration",
    description: "Décoration florale élégante avec touches modernes",
    fullDescription: "Un mariage traditionnel béninois revisité avec une touche de modernité. Nous avons créé une ambiance florale spectaculaire mêlant orchidées blanches, roses rouges et feuillage tropical pour célébrer l'amour de Clara et Marc.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    client: "Clara & Marc",
    date: "2024-01-15",
    location: "Cotonou, Bénin",
    budget: "15 000€",
    duration: "6 mois",
    guests: 150,
    services: [
      "Concept floral personnalisé",
      "Décoration salle de réception",
      "Arc floral cérémonie",
      "Centre de tables",
      "Photographie coordination",
      "Éclairage d'ambiance"
    ],
    challenges: [
      "Intégrer éléments traditionnels béninois",
      "Créer harmonie entre moderne et traditionnel",
      "Gérer espace extérieur/intérieur",
      "Coordination avec 8 prestataires"
    ],
    solutions: [
      "Recherche approfondie traditions locales",
      "Palette équilibrée blanc/rouge/or",
      "Structure modulaire adaptable",
      "Planning détaillé avec réunions hebdo"
    ],
    testimonial: {
      name: "Clara",
      text: "SHE a transformé notre vision en réalité. Chaque détail était parfait, nos invités étaient éblouis !",
      rating: 5
    },
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb021e6cf?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469371670267-807d07378c5f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497675-5116021b94a0?q=80&w=600&auto=format&fit=crop"
    ]
  },
  "lancement-produit-techcorp": {
    id: 2,
    title: "Lancement Produit TechCorp",
    category: "planning",
    description: "Organisation complète événement corporatif",
    fullDescription: "Lancement exclusif du nouveau produit TechCorp devant 200 invités VIP. Une soirée high-tech avec démonstrations interactives, cocktail dinatoire et expérience immersive marque.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
    client: "TechCorp",
    date: "2024-01-20",
    location: "Abidjan, Côte d'Ivoire",
    budget: "25 000€",
    duration: "3 mois",
    guests: 200,
    services: [
      "Planning stratégique",
      "Coordination prestataires",
      "Scénographie événement",
      "Animation technique",
      "Gestion invités VIP",
      "Reporting post-événement"
    ],
    challenges: [
      "Démonstrations techniques complexes",
      "Gestion invités internationaux",
      "Synchronisation multimédia",
      "Respect timing strict"
    ],
    solutions: [
      "Tests techniques répétés",
      "Service conciergerie dédié",
      "Team technique sur place",
      "Timeline minute par minute"
    ],
    testimonial: {
      name: "Directeur Marketing TechCorp",
      text: "Un événement flawless ! SHE a géré chaque détail avec professionnalisme et créativité.",
      rating: 5
    },
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2dfb7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a815b5b5?q=80&w=600&auto=format&fit=crop"
    ]
  },
  "showroom-mode-africaine": {
    id: 3,
    title: "Showroom Mode Africaine",
    category: "design",
    description: "Design intérieur boutique concept store",
    fullDescription: "Création d'un showroom concept store pour Africa Fashion House. Un espace de 300m² mêlant design africain contemporain et fonctionnalité commerciale, avec zones d'exposition, espace VIP et corner café.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    client: "Africa Fashion House",
    date: "2024-01-10",
    location: "Lomé, Togo",
    budget: "35 000€",
    duration: "4 mois",
    guests: "Espace commercial",
    services: [
      "Design architectural",
      "Planning d'aménagement",
      "Sourcing mobilier",
      "Éclairage design",
      "Signalétique",
      "Direction artistique"
    ],
    challenges: [
      "Mettre en valeur créateurs africains",
      "Optimiser flux commercial",
      "Intégrer éléments durables",
      "Budget maîtrisé"
    ],
    solutions: [
      "Mise en scène rotative collections",
      "Design parcours client optimisé",
      "Matériaux locaux et recyclés",
      "Phasage travaux par zone"
    ],
    testimonial: {
      name: "Directeur Africa Fashion House",
      text: "Un showroom qui raconte une histoire. Nos ventes ont augmenté de 40% depuis l'ouverture !",
      rating: 5
    },
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop"
    ]
  },
  "gala-annuel-entreprises": {
    id: 4,
    title: "Gala Annuel Entreprises",
    category: "full_event",
    description: "Événement complet 500 personnes",
    fullDescription: "Gala annuel prestige pour la Chambre de Commerce. Une soirée d'excellence avec dîner gastronomique, remise de prix, spectacle et networking pour 500 leaders d'affaires.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    client: "Chambre de Commerce",
    date: "2024-01-25",
    location: "Lagos, Nigeria",
    budget: "50 000€",
    duration: "8 mois",
    guests: 500,
    services: [
      "Conception événementielle",
      "Décoration prestige",
      "Catering coordination",
      "Animation spectacle",
      "Logistique invités",
      "Production complète"
    ],
    challenges: [
      "Gérer 500 invités VIP",
      "Coordination 15 prestataires",
      "Sécurité niveau élevé",
      "Timing multiple activités"
    ],
    solutions: [
      "Team de 25 personnes jour J",
      "Manager coordination dédié",
      "Sécurité professionnelle",
      "Application de gestion temps réel"
    ],
    testimonial: {
      name: "Président Chambre de Commerce",
      text: "Le meilleur gala de notre histoire. SHE a surpassé toutes nos attentes !",
      rating: 5
    },
    gallery: [
      "https://images.unsplash.com/photo-1527529482837-1089bc8e818c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530103994444-7586539b1b8d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7e644792c3c5?q=80&w=600&auto=format&fit=crop"
    ]
  }
};

const categoryConfig = {
  decoration: {
    label: "Décoration",
    badge: "bg-she-saffron/20 text-she-saffron border-she-saffron/30",
    icon: "🌸"
  },
  planning: {
    label: "Planning",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    icon: "📅"
  },
  design: {
    label: "Design",
    badge: "bg-purple-100 text-purple-800 border-purple-200",
    icon: "🎨"
  },
  full_event: {
    label: "Événement Complet",
    badge: "bg-she-saffron/20 text-she-saffron border-she-saffron/30",
    icon: "✨"
  }
};

const SHERealizationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const realization = realizationsData[id];

  if (!realization) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Réalisation non trouvée</h1>
            <Button onClick={() => navigate("/she")}>
              Retour à SHE
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const category = categoryConfig[realization.category];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${realization.image}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black/90 via-deep-black/70 to-deep-black/40" />
        </div>

        <div className="relative z-10 container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <Badge className={category.badge}>
                  {category.icon} {category.label}
                </Badge>
                <div className="flex items-center gap-2 text-white/80">
                  <Calendar size={16} />
                  <span>{new Date(realization.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin size={16} />
                  <span>{realization.location}</span>
                </div>
              </div>
              
              <h1 className="heading-hero text-white mb-4">
                {realization.title}
              </h1>
              
              <p className="body-large text-white/80 mb-8">
                {realization.fullDescription}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-she-saffron mb-2">{realization.budget}</p>
                  <p className="text-white/80">Budget</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-she-saffron mb-2">{realization.duration}</p>
                  <p className="text-white/80">Durée</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-she-saffron mb-2">{realization.guests}</p>
                  <p className="text-white/80">Invités</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-she-saffron mb-2">{realization.services.length}</p>
                  <p className="text-white/80">Services</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services & Details */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Services */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-section text-foreground mb-6">
                Services <span className="text-she-saffron">fournis</span>
              </h2>
              <div className="space-y-3">
                {realization.services.map((service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/50"
                  >
                    <Check size={20} className="text-she-saffron flex-shrink-0" />
                    <span className="text-foreground">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Client Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-section text-foreground mb-6">
                Informations <span className="text-she-saffron">client</span>
              </h2>
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Client</p>
                    <p className="font-semibold text-foreground">{realization.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date de réalisation</p>
                    <p className="font-medium text-foreground">{new Date(realization.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Lieu</p>
                    <p className="font-medium text-foreground">{realization.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Budget total</p>
                    <p className="font-semibold text-she-saffron text-lg">{realization.budget}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-16 bg-muted/20">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-section text-foreground mb-6">
                Défis <span className="text-red-500">rencontrés</span>
              </h2>
              <div className="space-y-4">
                {realization.challenges.map((challenge, index) => (
                  <Card key={index} className="p-4 border-red-200">
                    <p className="text-muted-foreground">{challenge}</p>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="heading-section text-foreground mb-6">
                Solutions <span className="text-green-500">apportées</span>
              </h2>
              <div className="space-y-4">
                {realization.solutions.map((solution, index) => (
                  <Card key={index} className="p-4 border-green-200">
                    <p className="text-muted-foreground">{solution}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Galerie <span className="text-she-saffron">photos</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {realization.gallery.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => window.open(photo, '_blank')}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={photo}
                    alt={`${realization.title} - Photo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-muted/20">
        <div className="container-main max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(realization.testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-xl text-muted-foreground mb-6 italic">
                "{realization.testimonial.text}"
              </blockquote>
              
              <cite className="font-semibold text-foreground">
                {realization.testimonial.name}
              </cite>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-she-saffron/10 to-primary/5">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="heading-section text-foreground mb-4">
              Inspiré par cette <span className="text-she-saffron">réalisation</span> ?
            </h2>
            <p className="body-large text-muted-foreground mb-8">
              Contactez-nous pour discuter de votre projet et créons ensemble 
              quelque chose d'exceptionnel.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="rounded-xl bg-she-saffron hover:bg-she-saffron/90">
                <Link to="/contact" className="flex items-center gap-2">
                  <Mail size={18} />
                  Demander un devis
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl border-she-saffron text-she-saffron hover:border-transparent hover:bg-transparent hover:text-she-saffron">
                <Link to="/she" className="flex items-center gap-2">
                  <ArrowLeft size={18} />
                  Retour à SHE
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl">
                <Link to="/she/services/events" className="flex items-center gap-2">
                  <ArrowRight size={18} />
                  Voir nos services
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SHERealizationDetail;
