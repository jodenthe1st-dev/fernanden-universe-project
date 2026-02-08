import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home, Palette, Clock, Users, Check, Star, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const processSteps = [
  {
    step: "01",
    title: "Prise de contact & Cahier des charges",
    description: "Nous écoutons vos besoins, visitons les lieux et définissons ensemble vos objectifs et votre budget.",
    duration: "1-2 jours"
  },
  {
    step: "02", 
    title: "Concept & Moodboard",
    description: "Création d'un plan conceptuel avec moodboard, palette de couleurs et matériaux proposés.",
    duration: "3-5 jours"
  },
  {
    step: "03",
    title: "Plans 2D/3D & Visualisations",
    description: "Élaboration des plans techniques, modélisation 3D et rendus photoréalistes pour visualiser le résultat.",
    duration: "1-2 semaines"
  },
  {
    step: "04",
    title: "Sélection & Approvisionnement",
    description: "Choix des meubles, matériaux, luminaires et coordination avec les fournisseurs et artisans.",
    duration: "2-3 semaines"
  },
  {
    step: "05",
    title: "Suivi de chantier & Livraison",
    description: "Coordination des travaux, contrôle qualité et livraison finale avec installation des éléments.",
    duration: "4-8 semaines"
  }
];

// Données configurables pour l'administration future
const interiorPageConfig = {
  hero: {
    backgroundImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2830&auto=format&fit=crop",
    badge: "Interior Design Excellence",
    title: "Design d'Intérieur",
    subtitle: "Espaces qui vous ressemblent, qui vous inspirent",
    description: "Transformons vos espaces de vie en lieux inspirants et fonctionnels. Du concept à la réalisation, nous créons des intérieurs qui allient esthétique, confort et personnalité.",
    phone: "+229 01 97 51 26 36"
  },
  sectionTitle: "Services Design",
  sectionDescription: "Des solutions d'aménagement sur mesure pour tous vos projets résidentiels et commerciaux, garantissant des espaces uniques et fonctionnels",
  services: [
    {
      id: 1,
      title: "Aménagement Résidentiel",
      description: "Transformation de votre espace de vie pour qu'il vous ressemble",
      features: ["Salon & Salle à manger", "Chambres & Dressings", "Cuisine & Salle de bain", "Bureau & Espace de travail"],
      price: "À partir de 3 000€",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Design Commercial",
      description: "Création d'espaces professionnels qui inspirent et convertissent",
      features: ["Boutiques & Showrooms", "Bureaux & Espaces de coworking", "Restaurants & Cafés", "Réceptions & Accueils"],
      price: "À partir de 5 000€",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Home Staging",
      description: "Mise en valeur de votre bien pour une vente ou location rapide",
      features: ["Dépersonnalisation de l'espace", "Optimisation des volumes", "Décoration neutre et chaleureuse", "Photographies professionnelles"],
      price: "À partir de 1 500€",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
    }
  ]
};

const testimonials = [
  {
    name: "Sophie Martin",
    project: "Appartement 85m² - Paris",
    rating: 5,
    text: "Un travail exceptionnel ! SHE a transformé mon appartement en un espace moderne et fonctionnel. Le résultat dépasse mes attentes.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100&auto=format&fit=crop"
  },
  {
    name: "Thomas Dubois",
    project: "Boutique Concept Store - Lyon",
    rating: 5,
    text: "Professionnalisme et créativité au rendez-vous. Notre boutique est maintenant un véritable succès commercial grâce à leur design.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
  },
  {
    name: "Marie Laurent",
    project: "Maison 150m² - Bordeaux",
    rating: 5,
    text: "Équipe à l'écoute, respect du budget et des délais. Je recommande vivement SHE pour tout projet d'aménagement.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
  }
];

const faq = [
  {
    question: "Quel budget pour un design d'intérieur ?",
    answer: "De 150€ à 400€/m² selon la complexité du projet."
  },
  {
    question: "Combien de temps dure un projet ?",
    answer: "6 à 12 semaines entre la conception et la réalisation."
  },
  {
    question: "Intervenez-vous sur toute la France ?",
    answer: "Oui, nous intervenons partout en France."
  }
];

const SHEServiceInteriorDesign = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${interiorPageConfig.hero.backgroundImage}')`,
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
                  {interiorPageConfig.hero.badge}
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
                  <Home className="w-10 h-10 text-she-saffron" />
                </motion.div>
                <div>
                  <h1 className="heading-hero text-white mb-3">
                    <span className="bg-gradient-to-r from-she-saffron to-white bg-clip-text text-transparent">
                      {interiorPageConfig.hero.title}
                    </span>
                  </h1>
                  <p className="text-xl text-white/90 font-medium">
                    {interiorPageConfig.hero.subtitle}
                  </p>
                </div>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="body-large text-white/90 mb-10 leading-relaxed max-w-3xl"
              >
                {interiorPageConfig.hero.description}
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
                  <a href={`tel:${interiorPageConfig.hero.phone}`} className="flex items-center">
                    {interiorPageConfig.hero.phone}
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Notre <span className="text-she-saffron">méthodologie</span>
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Une approche structurée en 5 étapes pour garantir un résultat parfait
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-2">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 text-center relative"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-she-saffron/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-she-saffron">{step.step}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-she-saffron/20 -translate-x-8" />
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-tight">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid - Premium */}
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
              <span className="font-heading text-sm font-medium text-she-saffron">{interiorPageConfig.sectionTitle}</span>
              <div className="w-2 h-2 bg-she-saffron rounded-full animate-pulse delay-300" />
            </div>
            
            <h2 className="heading-section text-foreground mb-6">
              Nos <span className="bg-gradient-to-r from-she-saffron to-primary bg-clip-text text-transparent">services</span> d'excellence
            </h2>
            <p className="body-large text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {interiorPageConfig.sectionDescription}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {interiorPageConfig.services.map((service, index) => (
              <motion.div
                key={service.title}
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
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                  
                  <CardContent className="p-8">
                    <h3 className="heading-subsection text-foreground mb-4 group-hover:text-she-saffron transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          <div className="w-6 h-6 bg-she-saffron/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-she-saffron/20 transition-colors">
                            <Check size={14} className="text-she-saffron" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-border/20">
                      <div>
                        <span className="text-2xl font-bold text-she-saffron">{service.price}</span>
                        <p className="text-xs text-muted-foreground mt-1">Sur devis personnalisé</p>
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

      {/* Testimonials */}
      <section className="py-16">
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
              Découvrez les témoignages de nos clients satisfaits
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
              Tout ce que vous devez savoir sur nos services
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
              Prêt à transformer votre <span className="text-she-saffron">espace</span> ?
            </h2>
            <p className="body-large text-muted-foreground mb-8">
              Contactez-nous dès aujourd'hui pour une consultation gratuite 
              et découvrons ensemble comment nous pouvons donner vie à votre projet.
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

export default SHEServiceInteriorDesign;
