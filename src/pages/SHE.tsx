import { Layout } from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logger from '@/lib/logger';
import { Home, Calendar, Sparkles, ArrowRight, Check, Palette, Brush, Camera, MapPin } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { AnimatedLetters } from "@/components/animations/AnimatedLetters";
import { GradientBlob } from "@/components/animations/GradientBlob";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Badge } from "@/components/ui/badge";
import { RealizationsService, type Realization } from "@/integrations/supabase/services";
import logoShe from "@/assets/logo-she.png";

const services = [
  {
    icon: Calendar,
    title: "Event Design",
    description: "Mariages, anniversaires, cérémonies corporatives et événements culturels.",
    items: ["Conception globale", "Décoration florale", "Mise en scène", "Coordination jour J"],
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
    route: "/she/services/events"
  },
  {
    icon: Home,
    title: "Home & Space",
    description: "Design d'intérieur résidentiel et commercial pour des espaces uniques.",
    items: ["Consultation design", "Plans d'aménagement", "Sourcing mobilier", "Direction artistique"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    route: "/she/services/interior-design"
  }
];

const realizations = [
  {
    id: 1,
    title: "Mariage Traditionnel Clara",
    category: "decoration",
    description: "Décoration florale élégante avec touches modernes",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop",
    client: "Clara & Marc",
    date: "2024-01-15",
    location: "Cotonou, Bénin",
    route: "/she/realizations/mariage-traditionnel-clara"
  },
  {
    id: 2,
    title: "Lancement Produit TechCorp",
    category: "planning",
    description: "Organisation complète événement corporatif",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
    client: "TechCorp",
    date: "2024-01-20",
    location: "Abidjan, Côte d'Ivoire",
    route: "/she/realizations/lancement-produit-techcorp"
  },
  {
    id: 3,
    title: "Showroom Mode Africaine",
    category: "design",
    description: "Design intérieur boutique concept store",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
    client: "Africa Fashion House",
    date: "2024-01-10",
    location: "Lomé, Togo",
    route: "/she/realizations/showroom-mode-africaine"
  },
  {
    id: 4,
    title: "Gala Annuel Entreprises",
    category: "full_event",
    description: "Événement complet 500 personnes",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop",
    client: "Chambre de Commerce",
    date: "2024-01-25",
    location: "Lagos, Nigeria",
    route: "/she/realizations/gala-annuel-entreprises"
  }
];

const categoryConfig = {
  decoration: {
    label: "Décoration",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Palette
  },
  planning: {
    label: "Planning",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Calendar
  },
  design: {
    label: "Design",
    badge: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Brush
  },
  full_event: {
    label: "Événement Complet",
    badge: "bg-she-saffron/20 text-she-saffron border-she-saffron/30",
    icon: Sparkles
  }
};

const SHE = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const navigate = useNavigate();
  const [realizations, setRealizations] = useState<Realization[]>([]);
  const [loading, setLoading] = useState(true);
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    const loadRealizations = async () => {
      try {
        const data = await RealizationsService.getActiveRealizations();
        setRealizations(data);
      } catch (error) {
        logger.error('Error loading realizations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRealizations();
  }, []);

  const handleRealizationClick = (id: string) => {
    navigate(`/she/realizations/${id}`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2798&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black/90 via-deep-black/70 to-deep-black/40" />
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
                src={logoShe} 
                alt="SHE by fernanden" 
                className="h-36 md:h-48 lg:h-56 object-contain drop-shadow-lg shadow-black/30"
              />
            </motion.div>

            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-she-saffron/20 backdrop-blur-sm rounded-full text-she-saffron font-heading text-sm font-medium mb-6"
            >
              <Sparkles size={16} />
              Spaces, Home & Event Design
            </motion.span>
            
            <h1 className="heading-hero text-white mb-4">
              <span className="font-serif">Transformez vos espaces</span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="body-large text-white/80 mb-8"
            >
              Événements mémorables et intérieurs d'exception. 
              Nous créons des ambiances uniques qui racontent votre histoire.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton>
                <Button asChild size="lg" className="rounded-xl bg-she-saffron hover:bg-she-saffron/90">
                  <Link to="/contact">Demander un devis</Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild size="lg" variant="outline" className="rounded-xl border-she-saffron text-she-saffron hover:border-transparent hover:bg-transparent hover:text-she-saffron">
                  <Link to="/portfolio">Voir nos réalisations</Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section ref={containerRef} className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Nos <span className="text-primary">services</span>
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              De la conception à la réalisation, nous vous accompagnons dans tous vos projets
            </p>
          </motion.div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <motion.div
                  style={{ y: index % 2 === 0 ? y1 : y2 }}
                  className={index % 2 === 1 ? "lg:order-2" : ""}
                >
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="rounded-3xl shadow-xl w-full aspect-[4/3] object-cover"
                    />
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-she-saffron rounded-full opacity-50" />
                  </div>
                </motion.div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="w-16 h-16 bg-she-saffron/10 rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-she-saffron" />
                  </div>
                  <h3 className="heading-subsection text-foreground mb-4">{service.title}</h3>
                  <p className="body-regular text-muted-foreground mb-6">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.items.map((item) => (
                      <motion.li 
                        key={item} 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-6 h-6 rounded-full bg-she-saffron/20 flex items-center justify-center">
                          <Check size={14} className="text-she-saffron" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Button asChild className="rounded-xl bg-she-saffron hover:bg-she-saffron/90">
                    <Link to={service.route} className="flex items-center gap-2">
                      En savoir plus
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-muted/30">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="heading-section text-foreground mb-4">
              Nos <span className="text-she-saffron">réalisations</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {realizations.map((realization, index) => {
              const category = categoryConfig[realization.category];
              const Icon = category.icon;
              
              return (
                <motion.div
                  key={realization.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="group cursor-pointer"
                  onClick={() => handleRealizationClick(realization.id)}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                    <img
                      src={realization.image_url}
                      alt={realization.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className={`${category.badge} flex items-center gap-1 text-xs font-medium`}>
                        <Icon size={12} />
                        {category.label}
                      </Badge>
                    </div>
                    
                    {/* Quick view icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Camera size={16} className="text-she-saffron" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="font-heading font-semibold text-foreground group-hover:text-she-saffron transition-colors">
                      {realization.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {realization.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin size={12} />
                      <span>{realization.location}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-she-saffron to-she-bronze rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="heading-section mb-4">
                Prêt à transformer votre espace ?
              </h2>
              <p className="body-large text-white/80 max-w-xl mx-auto mb-8">
                Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
              </p>
              <MagneticButton>
                <Button asChild size="lg" className="rounded-xl bg-white text-she-saffron hover:bg-white/90">
                  <Link to="/contact" className="flex items-center gap-2">
                    Demander un devis
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SHE;
