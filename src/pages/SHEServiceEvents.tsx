import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Users, Music, Camera, Check, Star, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventFeatures } from "@/components/she/EventFeatures";

// Données configurables pour l'administration future
const eventPageConfig = {
  hero: {
    backgroundImage: "https://images.unsplash.com/photo-1469371670407-613697888b8a?q=80&w=2830&auto=format&fit=crop",
    badge: "Event Design Excellence",
    title: "Organisation d'Événements",
    subtitle: "Des moments inoubliables, des expériences uniques",
    description: "De la conception à la réalisation, nous créons des événements qui marquent les esprits et touchent les cœurs. Mariages, galas, lancements produits : chaque moment devient une expérience inoubliable et mémorable.",
    phone: "+229 01 97 51 26 36"
  },
  sectionTitle: "Types d'Événements",
  sectionDescription: "Des solutions événementielles sur mesure pour tous types de manifestations privées et professionnelles, garantissant des expériences inoubliables",
  eventTypes: [
    {
      id: 1,
      title: "Événements Corporatifs",
      description: "Séminaires, lancements produits, galas d'entreprise",
      features: ["Planning stratégique", "Coordination fournisseurs", "Gestion budget", "Animation sur mesure"],
      price: "À partir de 5 000€",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
      capacity: "50-500 personnes"
    },
    {
      id: 2,
      title: "Événements Privés",
      description: "Mariages, anniversaires, fêtes d'anniversaire, baptêmes",
      features: ["Thème personnalisé", "Décoration complète", "Traiteur partenaire", "Photographie/Vidéo"],
      price: "À partir de 3 000€",
      image: "https://images.unsplash.com/photo-1519225421980-715cb021e6cf?q=80&w=800&auto=format&fit=crop",
      capacity: "20-200 personnes"
    },
    {
      id: 3,
      title: "Événements Culturels",
      description: "Expositions, vernissages, concerts, festivals",
      features: ["Scénographie", "Éclairage professionnel", "Sonorisation", "Accueil VIP"],
      price: "À partir de 8 000€",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
      capacity: "100-2000 personnes"
    }
  ]
};

const processSteps = [
  {
    step: "01",
    title: "Briefing & Conceptualisation",
    description: "Compréhension de vos objectifs, définition du thème et création du concept événementiel.",
    duration: "3-5 jours"
  },
  {
    step: "02",
    title: "Planning & Budget",
    description: "Élaboration du planning détaillé, validation du budget et sélection des prestataires.",
    duration: "1 semaine"
  },
  {
    step: "03",
    title: "Coordination & Production",
    description: "Gestion de tous les aspects logistiques, coordination des fournisseurs et suivi de production.",
    duration: "2-6 semaines"
  },
  {
    step: "04",
    title: "Jour J & Animation",
    description: "Supervision complète de l'événement, gestion des imprévus et animation sur mesure.",
    duration: "1 jour"
  },
  {
    step: "05",
    title: "Post-Événement",
    description: "Démontage, bilan client et remise des livrables (photos, vidéos, rapports).",
    duration: "2-3 jours"
  }
];

const testimonials = [
  {
    name: "Claire Bernard",
    project: "Mariage 150 personnes - Château de Versailles",
    rating: 5,
    text: "Un mariage de rêve ! SHE a géré chaque détail avec perfection. Le thème était magnifique et tous nos invités étaient éblouis.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100&auto=format&fit=crop"
  },
  {
    name: "Marc Durand",
    project: "Lancement produit Tech - Paris",
    rating: 5,
    text: "Professionnalisme exceptionnel pour notre lancement. L'événement était parfaitement organisé et a généré une excellente couverture médiatique.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
  },
  {
    name: "Sophie Lemoine",
    project: "Gala annuel 300 personnes - Lyon",
    rating: 5,
    text: "SHE a transformé notre gala annuel en un événement mémorable. Créativité, organisation et réactivité au top !",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
  }
];

const includedServices = [
  "Consultation conceptuelle gratuite",
  "Planning détaillé et timeline",
  "Coordination de tous les prestataires",
  "Gestion du budget et contrôle des coûts",
  "Décoration et scénographie",
  "Animation et maître de cérémonie",
  "Photographie professionnelle",
  "Support client 24/7 pendant l'événement"
];

const faq = [
  {
    question: "Quelle est la durée moyenne de préparation d'un événement ?",
    answer: "En général 2 à 3 mois pour un événement moyen, 6 mois à 1 an pour les grands événements. Plus on s'y prend tôt, meilleur sera le résultat."
  },
  {
    question: "Travaillez-vous avec des prestataires spécifiques ?",
    answer: "Nous avons un réseau de prestataires de confiance (traiteurs, photographes, DJ, etc.) mais nous pouvons aussi travailler avec vos prestataires habituels."
  },
  {
    question: "Comment assurez-vous le respect du budget ?",
    answer: "Nous établissons un budget détaillé en début de projet et fournissons des rapports réguliers. Toute modification doit être validée par le client."
  },
  {
    question: "Que se passe-t-il en cas d'imprévu ?",
    answer: "Nous avons toujours des plans de secours et une équipe d'intervention rapide. Notre expérience nous permet de gérer les imprévus avec sang-froid et efficacité."
  }
];

const SHEServiceEvents = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${eventPageConfig.hero.backgroundImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black/95 via-deep-black/80 to-deep-black/60" />
          {/* Animated overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-she-saffron/10 via-transparent to-transparent opacity-70" />
        </div>

        <div className="relative z-10 container-main">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-4xl">
              {/* Badge premium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-she-saffron/20 backdrop-blur-md rounded-full border border-she-saffron/30 mb-8"
              >
                <div className="w-2 h-2 bg-she-saffron rounded-full animate-pulse" />
                <span className="font-heading text-xs uppercase tracking-[0.3em] text-she-saffron font-semibold">
                  {eventPageConfig.hero.badge}
                </span>
                <div className="w-2 h-2 bg-she-saffron rounded-full animate-pulse delay-300" />
              </motion.div>
              
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="w-20 h-20 bg-she-saffron/20 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Calendar className="w-10 h-10 text-she-saffron" />
                </motion.div>
                <div>
                  <h1 className="heading-hero text-white mb-3">
                    <span className="bg-gradient-to-r from-she-saffron to-white bg-clip-text text-transparent">
                      {eventPageConfig.hero.title}
                    </span>
                  </h1>
                  <p className="text-xl text-white/90 font-medium">
                    {eventPageConfig.hero.subtitle}
                  </p>
                </div>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="body-large text-white/90 mb-10 leading-relaxed max-w-3xl"
              >
                {eventPageConfig.hero.description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <Button size="lg" className="rounded-xl bg-she-saffron hover:bg-she-saffron/90 text-black shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg">
                  <Link to="/contact" className="flex items-center gap-3">
                    Demander un devis
                    <ArrowRight size={20} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl border-2 border-she-saffron/50 text-she-saffron hover:bg-she-saffron/10 backdrop-blur-sm transition-all duration-300 px-8 py-4 text-lg">
                  <Phone size={20} className="mr-3" />
                  <a href={`tel:${eventPageConfig.hero.phone}`} className="flex items-center">
                    {eventPageConfig.hero.phone}
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Types - Premium */}
      <section className="py-24 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-she-saffron/5 to-transparent pointer-events-none" />
        
        <div className="container-main relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-she-saffron/10 backdrop-blur-md rounded-full border border-she-saffron/20 mb-8">
              <div className="w-2 h-2 bg-she-saffron rounded-full animate-pulse" />
              <span className="font-heading text-sm font-medium text-she-saffron">{eventPageConfig.sectionTitle}</span>
              <div className="w-2 h-2 bg-she-saffron rounded-full animate-pulse delay-300" />
            </div>
            
            <h2 className="heading-section text-foreground mb-6">
              Des <span className="bg-gradient-to-r from-she-saffron to-primary bg-clip-text text-transparent">solutions</span> adaptées
            </h2>
            <p className="body-large text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {eventPageConfig.sectionDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {eventPageConfig.eventTypes.map((eventType, index) => (
              <motion.div
                key={eventType.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -8, transition: { duration: 0.4 } }}
                className="group relative h-full"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-she-saffron/10 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-700" />
                
                <Card className="relative h-full overflow-hidden border-border/20 hover:border-she-saffron/30 transition-all duration-500 bg-card/80 backdrop-blur-sm group-hover:shadow-2xl">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={eventType.image}
                      alt={eventType.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Floating badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="absolute top-4 right-4"
                    >
                      <Badge className="bg-she-saffron/90 backdrop-blur-sm text-black border-she-saffron/30 px-4 py-2 font-semibold shadow-lg">
                        {eventType.capacity}
                      </Badge>
                    </motion.div>
                  </div>
                  
                  <CardContent className="p-8">
                    <h3 className="heading-subsection text-foreground mb-4 group-hover:text-she-saffron transition-colors">
                      {eventType.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{eventType.description}</p>
                    
                    <EventFeatures features={eventType.features} />
                    
                    <div className="flex items-center justify-between pt-6 border-t border-border/20">
                      <div>
                        <span className="text-2xl font-bold text-she-saffron">{eventType.price}</span>
                        <p className="text-xs text-muted-foreground mt-1">Tarif personnalisé</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="rounded-full border-she-saffron text-she-saffron hover:bg-she-saffron hover:text-black transition-all duration-300 group-hover:scale-105"
                        asChild
                      >
                        <Link to="/contact">
                          En savoir plus
                          <ArrowRight size={16} className="ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted/20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Notre <span className="text-she-saffron">processus</span> événementiel
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Une méthodologie éprouvée pour des événements sans faille
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-she-saffron/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-she-saffron">{step.step}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-she-saffron/20" />
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                <div className="flex items-center justify-center gap-2 text-xs text-she-saffron">
                  <Clock size={12} />
                  <span>{step.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Included Services */}
      <section className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="heading-section text-foreground mb-8 text-center">
              Services <span className="text-she-saffron">inclus</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {includedServices.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border border-border/50"
                >
                  <Check size={20} className="text-she-saffron flex-shrink-0" />
                  <span className="text-foreground">{service}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Ils nous <span className="text-she-saffron">font confiance</span>
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Découvrez les témoignages de nos événements réussis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.project}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/20">
        <div className="container-main max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Questions <span className="text-she-saffron">fréquentes</span>
            </h2>
            <p className="body-large text-muted-foreground">
              Les réponses à vos questions sur les événements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-1 gap-6">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-she-saffron/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-she-saffron font-semibold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-3 text-lg">{item.question}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-she-saffron/10 to-primary/5">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="heading-section text-foreground mb-4">
              Prêt à créer un <span className="text-she-saffron">événement</span> mémorable ?
            </h2>
            <p className="body-large text-muted-foreground mb-8">
              Contactez-nous pour une consultation gratuite et transformons 
              votre vision en un événement inoubliable.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="rounded-xl bg-she-saffron hover:bg-she-saffron/90">
                <Link to="/contact" className="flex items-center gap-2">
                  <Mail size={18} />
                  Demander un devis gratuit
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl border-she-saffron text-she-saffron hover:border-transparent hover:bg-transparent hover:text-she-saffron">
                <Link to="/she" className="flex items-center gap-2">
                  <ArrowLeft size={18} />
                  Retour à SHE
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SHEServiceEvents;
