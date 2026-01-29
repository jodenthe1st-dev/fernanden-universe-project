import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Palette, 
  ArrowRight, 
  BookOpen, 
  Users, 
  Lightbulb, 
  PenTool, 
  Sparkles,
  Brain,
  Heart,
  MessageCircle,
  FileText,
  Award,
  Clock,
  CheckCircle2,
  Phone,
  Calendar
} from "lucide-react";
import { GradientBlob } from "@/components/animations/GradientBlob";
import { MagneticButton } from "@/components/animations/MagneticButton";
import logoCafee from "@/assets/logo-cafee.png";

const educationServices = [
  { 
    icon: Brain, 
    title: "Accompagnement Psychopédagogique", 
    description: "Coaching scolaire personnalisé, développement des compétences d'apprentissage et stratégies de réussite.",
    features: ["Bilan cognitif", "Méthodologie de travail", "Gestion du stress"]
  },
  { 
    icon: Users, 
    title: "Orientation & Réorientation", 
    description: "Bilan d'orientation approfondi et construction de projet professionnel aligné avec vos aspirations.",
    features: ["Tests d'aptitudes", "Exploration des métiers", "Plan d'action"]
  },
  { 
    icon: MessageCircle, 
    title: "Communication & Médiation", 
    description: "Techniques de communication efficace et gestion positive des conflits familiaux.",
    features: ["Médiation familiale", "Communication non-violente", "Résolution de conflits"]
  },
  { 
    icon: Heart, 
    title: "Ludopédagogie", 
    description: "Apprentissage par le jeu pour développer les compétences tout en s'amusant.",
    features: ["Jeux éducatifs", "Ateliers créatifs", "Développement socio-émotionnel"]
  },
];

const expressiveServices = [
  { 
    icon: PenTool, 
    title: "Communication Visuelle", 
    description: "Flyers, affiches, brochures et packaging sur mesure pour une communication impactante.",
    features: ["Design d'impression", "Supports marketing", "Packaging créatif"]
  },
  { 
    icon: Palette, 
    title: "Branding & Identité", 
    description: "Création de logos, chartes graphiques et identité visuelle complète pour votre marque.",
    features: ["Logo design", "Charte graphique", "Refonte d'identité"]
  },
  { 
    icon: FileText, 
    title: "Édition & Mise en page", 
    description: "Conception de livres, magazines, rapports et documents professionnels.",
    features: ["Mise en page", "Infographies", "Documents corporate"]
  },
];

const stats = [
  { value: "500+", label: "Élèves accompagnés" },
  { value: "98%", label: "Taux de satisfaction" },
  { value: "50+", label: "Projets design" },
  { value: "7 ans", label: "D'expertise" },
];

const testimonials = [
  {
    quote: "L'accompagnement de CaFEE a transformé l'approche scolaire de mon fils. Merci infiniment !",
    author: "Marie K.",
    role: "Parent d'élève"
  },
  {
    quote: "Un branding professionnel qui a donné une nouvelle dimension à mon entreprise.",
    author: "Patrick D.",
    role: "Entrepreneur"
  },
];

const CaFEE = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-28 pb-16 relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <GradientBlob 
          className="-top-40 -right-40" 
          color1="hsl(var(--cafee-mint) / 0.1)"
          size="500px"
        />
        <GradientBlob 
          className="-bottom-40 -left-40" 
          color1="hsl(var(--cafee-orange) / 0.1)"
          size="400px"
        />
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-8 inline-block"
            >
              <div className="bg-cream rounded-3xl p-6 md:p-8 shadow-2xl inline-block">
                <img 
                  src={logoCafee} 
                  alt="CaFEE by fernanden" 
                  className="h-40 md:h-52 lg:h-64 object-contain"
                />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-serif text-xl md:text-2xl italic text-muted-foreground mb-6"
            >
              "Apprendre autrement, s'exprimer pleinement !"
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="body-large text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Cabinet innovant alliant psychopédagogie et design graphique. 
              Nous accompagnons enfants, adolescents et adultes dans leur développement 
              et créons des identités visuelles impactantes pour les entreprises.
            </motion.p>

            {/* Dual CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MagneticButton>
                <Button asChild size="lg" className="rounded-xl bg-cafee-mint hover:bg-cafee-mint/90 text-white">
                  <a href="#education" className="flex items-center gap-2">
                    <GraduationCap size={20} />
                    Services Éducation
                  </a>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild size="lg" className="rounded-xl bg-cafee-orange hover:bg-cafee-orange/90 text-white">
                  <a href="#design" className="flex items-center gap-2">
                    <Palette size={20} />
                    Services Design
                  </a>
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary/5">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-serif text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Services Section */}
      <section id="education" className="py-20 relative overflow-hidden">
        <GradientBlob 
          className="top-20 -left-20" 
          color1="hsl(var(--cafee-mint) / 0.08)"
          size="350px"
        />
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-16 h-16 bg-cafee-mint/20 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-cafee-mint" />
            </div>
            <div>
              <h2 className="heading-section text-foreground">
                CaFEE <span className="text-cafee-mint">Éducation</span>
              </h2>
              <p className="text-muted-foreground">Ludopédagogie, Psychométrie et Médiation</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {educationServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-cafee-mint/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-cafee-mint/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-cafee-mint/20 transition-colors">
                    <service.icon className="w-7 h-7 text-cafee-mint" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                    <p className="body-small text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span 
                          key={feature}
                          className="inline-flex items-center gap-1 text-xs bg-cafee-mint/10 text-cafee-mint px-3 py-1 rounded-full"
                        >
                          <CheckCircle2 size={12} />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <MagneticButton>
              <Button asChild size="lg" className="rounded-xl bg-cafee-mint hover:bg-cafee-mint/90">
                <Link to="/contact" className="flex items-center gap-2">
                  <Calendar size={18} />
                  Prendre rendez-vous
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Design Services Section */}
      <section id="design" className="py-20 bg-muted/30 relative overflow-hidden">
        <GradientBlob 
          className="top-20 -right-20" 
          color1="hsl(var(--cafee-orange) / 0.08)"
          size="350px"
        />
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-16 h-16 bg-cafee-orange/20 rounded-2xl flex items-center justify-center">
              <Palette className="w-8 h-8 text-cafee-orange" />
            </div>
            <div>
              <h2 className="heading-section text-foreground">
                CaFEE <span className="text-cafee-orange">Expressive</span>
              </h2>
              <p className="text-muted-foreground">Design graphique et Communication visuelle</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {expressiveServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-cafee-orange/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-cafee-orange/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cafee-orange/20 transition-colors">
                  <service.icon className="w-7 h-7 text-cafee-orange" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                <p className="body-small text-muted-foreground mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span 
                      key={feature}
                      className="inline-flex items-center gap-1 text-xs bg-cafee-orange/10 text-cafee-orange px-3 py-1 rounded-full"
                    >
                      <CheckCircle2 size={12} />
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <MagneticButton>
              <Button asChild size="lg" className="rounded-xl bg-cafee-orange hover:bg-cafee-orange/90">
                <Link to="/portfolio" className="flex items-center gap-2">
                  Voir nos réalisations
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Pourquoi choisir <span className="text-primary">CaFEE</span> ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une approche unique combinant expertise pédagogique et créativité visuelle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Expertise certifiée", desc: "Professionnels diplômés et expérimentés" },
              { icon: Heart, title: "Approche humaine", desc: "Accompagnement personnalisé et bienveillant" },
              { icon: Lightbulb, title: "Méthodes innovantes", desc: "Techniques modernes et ludiques" },
              { icon: Clock, title: "Flexibilité", desc: "Horaires adaptés à vos besoins" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="heading-subsection text-foreground">Ce que disent nos clients</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <div className="text-4xl text-primary/20 font-serif mb-3">"</div>
                <p className="text-foreground italic mb-4">{testimonial.quote}</p>
                <div>
                  <div className="font-heading font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Split background */}
            <div className="absolute inset-0 flex">
              <div className="w-1/2 bg-cafee-mint" />
              <div className="w-1/2 bg-cafee-orange" />
            </div>
            
            <div className="relative z-10 p-10 md:p-16 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-10 h-10" />
              </motion.div>
              
              <h2 className="heading-section mb-4">
                Prêt à collaborer ?
              </h2>
              <p className="body-large text-white/90 max-w-xl mx-auto mb-8">
                Que ce soit pour un accompagnement éducatif ou un projet de design, nous sommes là pour vous.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton>
                  <Button asChild size="lg" className="rounded-xl bg-white text-cafee-mint hover:bg-white/90">
                    <Link to="/contact" className="flex items-center gap-2">
                      <Calendar size={18} />
                      Prendre rendez-vous
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button asChild size="lg" variant="outline" className="rounded-xl border-white/40 text-white hover:bg-white/10 hover:border-white">
                    <a href="tel:+22901975126" className="flex items-center gap-2">
                      <Phone size={18} />
                      +229 01 97 51 26 36
                    </a>
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CaFEE;
