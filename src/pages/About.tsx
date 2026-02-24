import { Layout } from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Users, Target, Sparkles, ArrowRight, Globe, Heart, Eye, Lightbulb, HandHeart, Quote, Star, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { AnimatedLetters } from "@/components/animations/AnimatedLetters";
import { TextReveal, SplitTextReveal } from "@/components/animations/TextReveal";
import { GradientBlob } from "@/components/animations/GradientBlob";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { placeholderImages } from "@/components/ui/BrandedPlaceholder";

// Ligne éditoriale - Piliers de contenu
const editorialPillars = [
  {
    icon: Globe,
    title: "Héritage & Modernité",
    description: "L'inspiration africaine réinterprétée avec élégance contemporaine, célébrant l'authenticité et la richesse culturelle de nos créations.",
    color: "from-primary/20 to-primary/5",
    gradient: "from-primary to-secondary"
  },
  {
    icon: Sparkles,
    title: "Design Pluriel & Expertise",
    description: "Maîtrise technique et créative à travers nos multiples facettes : mode, espace, événementiel, éducation et graphisme.",
    color: "from-secondary/20 to-secondary/5",
    gradient: "from-secondary to-cafee-mint"
  },
  {
    icon: Lightbulb,
    title: "Inspiration & Épanouissement",
    description: "Une vision du design qui transforme le quotidien, sublime l'image et favorise le développement personnel.",
    color: "from-cafee-mint/20 to-cafee-mint/5",
    gradient: "from-cafee-mint to-primary"
  },
  {
    icon: HandHeart,
    title: "Éthique & Sens",
    description: "Design responsable, authenticité, transmission et engagement envers une création qui a une âme.",
    color: "from-densen-gold/20 to-densen-gold/5",
    gradient: "from-densen-gold to-primary"
  }
];

// Ton de voix
const voiceCharacteristics = [
  {
    title: "Inspirant",
    description: "Susciter l'émotion et la réflexion, partager une vision qui élève au-delà du simple produit.",
    icon: Star,
    color: "text-primary"
  },
  {
    title: "Expert",
    description: "Démontrer une maîtrise accessible avec des astuces concrètes et des conseils pratiques.",
    icon: Award,
    color: "text-secondary"
  },
  {
    title: "Élégant",
    description: "Communiquer avec raffinement et sobriété, un vocabulaire soigné et une posture affirmée mais douce.",
    icon: Eye,
    color: "text-densen-gold"
  }
];

// Mission statement
const missionStatement = {
  main: "Guidée par la passion de réinventer le design",
  sub: "fernanden façonne des œuvres d'art fonctionnelles qui incarnent l'alliance du chic intemporel et de l'héritage africain, transformant ainsi le quotidien sous toutes ses facettes."
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <Layout>
      {/* Hero Section - Ultra Premium */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-densen-gold/5 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        
        <GradientBlob 
          className="-top-40 left-1/4" 
          color1="hsl(var(--primary) / 0.15)"
          size="600px"
          animate={true}
        />
        <GradientBlob 
          className="top-20 right-1/4" 
          color1="hsl(var(--secondary) / 0.1)"
          size="400px"
          animate={true}
        />
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm rounded-full border border-primary/20 mb-8"
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-heading text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                Ligne Éditoriale Fondamentale
              </span>
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-300" />
            </motion.div>
            
            <h1 className="heading-hero text-foreground mb-8">
              <span className="block mb-2">
                <AnimatedLetters text="L'art de" type="wave" />
              </span>
              <span className="text-primary">
                <AnimatedLetters text="réinventer le design" type="wave" delay={0.5} />
              </span>
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              {/* Premium mission card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-densen-gold/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700" />
                <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl p-12 border border-border/20 shadow-2xl">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                      <Quote className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <p className="font-serif text-3xl italic text-foreground mb-6 leading-relaxed text-center">
                    {missionStatement.main}
                  </p>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto mb-6" />
                  <p className="body-large text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
                    {missionStatement.sub}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section - Premium */}
      <section className="py-24 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-secondary" />
        </div>
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-6">
              <div className="w-1 h-1 bg-primary rounded-full" />
              <span className="text-xs font-heading uppercase tracking-wider text-primary">Notre Mission</span>
              <div className="w-1 h-1 bg-primary rounded-full" />
            </div>
            
            <h2 className="heading-section text-foreground mb-8">
              Une <span className="text-primary">vision</span> transformatrice
            </h2>
            <p className="body-large text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Une présence sur les réseaux sociaux unifiée et reconnaissable, 
              construisant une communauté engagée autour d'un univers de marque fort 
              et d'une ligne éditoriale qui inspire et élève.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Premium feature cards */}
              {[
                {
                  icon: Target,
                  title: "Vision Transformatrice",
                  description: "Façonner des œuvres d'art fonctionnelles qui transcendent les frontières entre design et vie quotidienne.",
                  color: "from-primary/20 to-primary/5",
                  iconColor: "text-primary"
                },
                {
                  icon: Heart,
                  title: "Héritage Célébré",
                  description: "L'alliance du chic intemporel et de l'authenticité africaine comme source d'inspiration infinie.",
                  color: "from-secondary/20 to-secondary/5",
                  iconColor: "text-secondary"
                },
                {
                  icon: Sparkles,
                  title: "Impact Quotidien",
                  description: "Transformer le quotidien sous toutes ses facettes à travers des créations qui ont une âme et un sens.",
                  color: "from-densen-gold/20 to-densen-gold/5",
                  iconColor: "text-densen-gold"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  <div className="flex items-start gap-6 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 hover:border-border/50 transition-all duration-300">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="body-regular text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Premium image with overlay */}
              <div className="relative group">
                <img
                  src={placeholderImages.hero.fernanden}
                  alt="Design studio"
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-square group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Premium overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/70 via-deep-black/20 to-transparent rounded-3xl" />
                
                {/* Floating quote card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-8 left-8 right-8"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <Quote className="w-6 h-6 text-white/60 mb-3" />
                    <p className="text-white font-serif text-2xl italic leading-relaxed">
                      "Le design est la conversation entre l'objet et l'âme."
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                      <span className="text-white/60 text-sm font-heading uppercase tracking-wider">Fernanden</span>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/30 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-secondary/30 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700 delay-100" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Piliers Éditoriaux - Ultra Premium */}
      <section className="py-24 relative">
        {/* Sophisticated background */}
          <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3" />
          {/* Tailwind: use CSS var colors with explicit alpha (theme(colors.primary/5) is invalid). */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--secondary)/0.05),transparent_50%)]" />
        </div>
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm rounded-full border border-primary/20 mb-8">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-heading uppercase tracking-[0.3em] text-primary font-semibold">
                Piliers de Contenu
              </span>
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-300" />
            </div>
            
            <h2 className="heading-section text-foreground mb-8">
              Les <span className="text-primary">4 piliers</span> fondamentaux
            </h2>
            <p className="body-large text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Ces quatre piliers structurent l'ensemble de notre communication 
              et transparaissent dans chaque publication, créant une cohérence 
              qui renforce notre univers de marque.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
            {editorialPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                whileHover={{ y: -12, transition: { duration: 0.4 } }}
                className="group relative h-full"
              >
                {/* Premium card with multiple layers */}
                <div className="relative h-full">
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-700 scale-105`} />
                  
                  {/* Main card */}
                  <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl p-10 border border-border/30 shadow-xl group-hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                    {/* Icon with premium styling */}
                    <div className="flex items-start gap-8 mb-6">
                      <motion.div 
                        className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <pillar.icon className={`w-10 h-10 ${pillar.color === "from-densen-gold/20 to-densen-gold/5" ? "text-densen-gold" : pillar.color === "from-primary/20 to-primary/5" ? "text-primary" : pillar.color === "from-secondary/20 to-secondary/5" ? "text-secondary" : "text-cafee-mint"}`} />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-2xl text-foreground mb-4">
                          {pillar.title}
                        </h3>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-secondary mb-4" />
                      </div>
                    </div>
                    
                    <p className="body-regular text-muted-foreground leading-relaxed text-lg flex-grow">
                      {pillar.description}
                    </p>
                    
                    {/* Subtle decorative element */}
                    <div className="absolute top-6 right-6 w-8 h-8 border-2 border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full border border-primary/10">
              <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full" />
              <span className="text-sm font-heading text-muted-foreground">
                Chaque pilier renforce notre identité de marque
              </span>
              <div className="w-3 h-3 bg-gradient-to-r from-secondary to-primary rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ton de Voix - Ultra Premium */}
      <section className="py-24 relative">
        {/* Elegant background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-densen-gold/10 to-primary/10 backdrop-blur-sm rounded-full border border-densen-gold/20 mb-8">
              <div className="w-2 h-2 bg-densen-gold rounded-full animate-pulse" />
              <span className="text-xs font-heading uppercase tracking-[0.3em] text-densen-gold font-semibold">
                Ton de Voix
              </span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300" />
            </div>
            
            <h2 className="heading-section text-foreground mb-8">
              Notre <span className="text-densen-gold">alchimie</span> subtile
            </h2>
            <p className="body-large text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Une alchimie unique qui se reflète dans chaque légende, 
              chaque message et chaque interaction, créant une signature 
              reconnaissable et mémorable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {voiceCharacteristics.map((voice, index) => (
              <motion.div
                key={voice.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -8, transition: { duration: 0.4 } }}
                className="group text-center"
              >
                {/* Premium card */}
                <div className="relative bg-card/60 backdrop-blur-xl rounded-3xl p-10 border border-border/30 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  {/* Icon with sophisticated animation */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring", 
                      delay: 0.3 + index * 0.1,
                      stiffness: 100,
                      damping: 20
                    }}
                    className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-8 relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse opacity-50" />
                    <voice.icon className={`w-12 h-12 ${voice.color} relative z-10`} />
                  </motion.div>
                  
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
                    {voice.title}
                  </h3>
                  
                  <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto mb-6" />
                  
                  <p className="body-regular text-muted-foreground leading-relaxed text-lg">
                    {voice.description}
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-6 h-6 border-2 border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-2 border-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom sophisticated accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-6 px-12 py-6 bg-gradient-to-r from-primary/5 via-densen-gold/5 to-secondary/5 rounded-full border border-primary/10 backdrop-blur-sm">
              <div className="w-4 h-4 bg-gradient-to-r from-primary to-densen-gold rounded-full animate-pulse" />
              <span className="text-sm font-heading text-muted-foreground font-medium">
                L'élégance est au cœur de notre identité
              </span>
              <div className="w-4 h-4 bg-gradient-to-r from-densen-gold to-secondary rounded-full animate-pulse delay-300" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Ultra Premium */}
      <section className="py-24 relative">
        {/* Sophisticated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--soft-gold)/0.05),transparent_70%)]" />
        </div>
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Premium CTA card with multiple layers */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-densen-gold/20 to-secondary/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              
              {/* Main CTA container */}
              <div className="relative bg-gradient-to-br from-card/90 via-card/80 to-card/90 backdrop-blur-xl rounded-3xl p-16 md:p-20 text-center border border-border/20 shadow-2xl overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -right-20 w-40 h-40 border-2 border-primary rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-20 -left-20 w-32 h-32 border-2 border-secondary rounded-full"
                  />
                </div>
                
                <GradientBlob 
                  className="top-0 left-0" 
                  color1="hsl(var(--primary) / 0.15)"
                  size="400px"
                  animate={true}
                />
                <GradientBlob 
                  className="bottom-0 right-0" 
                  color1="hsl(var(--secondary) / 0.12)"
                  size="350px"
                  animate={true}
                />

                <div className="relative z-20">
                  {/* Premium badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-full border border-primary/30 mb-8"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-xs font-heading uppercase tracking-[0.3em] text-primary font-semibold">
                      Rejoignez Notre Univers
                    </span>
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-300" />
                  </motion.div>

                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="heading-section mb-8"
                  >
                    Prêt à <span className="text-primary">collaborer</span> ?
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="body-large text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
                  >
                    Découvrez comment notre ligne éditoriale guide chaque création 
                    et façonne une expérience unique qui vous ressemble. 
                    Transformons ensemble vos idées en réalités exceptionnelles.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  >
                    <MagneticButton>
                      <Button asChild size="lg" className="rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg">
                        <Link to="/portfolio" className="flex items-center gap-3">
                          Explorer nos créations
                          <ArrowRight size={20} />
                        </Link>
                      </Button>
                    </MagneticButton>
                    
                    <MagneticButton>
                      <Button asChild variant="outline" size="lg" className="rounded-xl border-2 border-primary/50 text-primary hover:bg-primary hover:text-foreground backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300">
                        <Link to="/contact" className="flex items-center gap-3">
                          Démarrer un projet
                          <ChevronRight size={20} />
                        </Link>
                      </Button>
                    </MagneticButton>
                  </motion.div>

                  {/* Subtle bottom accent */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 flex items-center justify-center gap-8"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                      <span className="text-xs font-heading text-muted-foreground uppercase tracking-wider">
                        Since 2017
                      </span>
                      <div className="w-8 h-0.5 bg-gradient-to-l from-secondary to-transparent" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
