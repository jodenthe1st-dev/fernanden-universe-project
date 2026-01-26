import { Layout } from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Users, Target, Sparkles, ArrowRight, Globe, Heart } from "lucide-react";
import { useRef } from "react";
import { AnimatedLetters } from "@/components/animations/AnimatedLetters";
import { TextReveal, SplitTextReveal } from "@/components/animations/TextReveal";
import { GradientBlob } from "@/components/animations/GradientBlob";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const values = [
  { 
    icon: Award, 
    title: "Excellence", 
    description: "Chaque détail compte dans notre quête de perfection.",
    color: "from-primary/20 to-primary/5"
  },
  { 
    icon: Heart, 
    title: "Authenticité", 
    description: "Nous célébrons notre héritage avec fierté.",
    color: "from-secondary/20 to-secondary/5"
  },
  { 
    icon: Target, 
    title: "Innovation", 
    description: "Repousser les limites du design africain.",
    color: "from-cafee-mint/20 to-cafee-mint/5"
  },
  { 
    icon: Globe, 
    title: "Impact", 
    description: "Créer du sens et laisser une empreinte positive.",
    color: "from-cafee-orange/20 to-cafee-orange/5"
  },
];

const stats = [
  { value: "3", label: "Univers créatifs" },
  { value: "50+", label: "Projets réalisés" },
  { value: "100%", label: "Satisfaction client" },
  { value: "OAPI", label: "Label certifié" },
];

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
      {/* Hero Section - Immersive */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <GradientBlob 
          className="-top-40 left-1/4" 
          color1="hsl(var(--primary) / 0.15)"
          size="500px"
        />
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block font-heading text-sm uppercase tracking-[0.25em] text-primary mb-6"
            >
              Notre Histoire
            </motion.span>
            
            <h1 className="heading-hero text-foreground mb-6">
              <AnimatedLetters text="Un design aux" type="wave" />
              <br />
              <span className="text-primary">
                <AnimatedLetters text="multiples facettes" type="wave" delay={0.5} />
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="body-large text-muted-foreground max-w-2xl mx-auto"
            >
              Une marque africaine contemporaine qui transcende les frontières 
              du design, de la mode et de l'éducation.
            </motion.p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-5 text-center"
              >
                <span className="block font-serif text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Brand Story - Asymmetric layout */}
      <section ref={containerRef} className="py-16 relative overflow-hidden">
        <div className="container-main">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <TextReveal>
                <h2 className="heading-section text-foreground mb-6">
                  Notre <span className="text-primary">vision</span>
                </h2>
              </TextReveal>
              
              <div className="space-y-4 mb-8">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="body-regular text-muted-foreground"
                >
                  Fondée au cœur du Bénin, <strong className="text-foreground">fernanden</strong> est 
                  née de la conviction que le design africain peut et doit rayonner à l'échelle mondiale.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="body-regular text-muted-foreground"
                >
                  Notre double goutte symbolise cette dualité unique : l'ancrage dans nos racines 
                  et l'ouverture vers l'innovation.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="body-regular text-muted-foreground"
                >
                  À travers nos trois univers — <strong className="text-she-saffron">SHE</strong>, 
                  <strong className="text-primary"> DENSEN</strong> et <strong className="text-cafee-mint"> CaFEE</strong> — 
                  nous offrons une expérience holistique.
                </motion.p>
              </div>

              <MagneticButton>
                <Button asChild className="rounded-xl">
                  <Link to="/portfolio" className="flex items-center gap-2">
                    Voir nos réalisations
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Image with parallax */}
            <motion.div
              className="lg:col-span-7 relative"
              style={{ y: imageY }}
            >
              <div className="relative">
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2670&auto=format&fit=crop"
                  alt="fernanden studio"
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
                />
                
                {/* Floating badge */}
                <motion.div
                  style={{ y: badgeY }}
                  className="absolute -bottom-6 -left-6 md:left-8"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.5 }}
                    className="bg-primary text-white p-6 rounded-2xl shadow-xl"
                  >
                    <p className="font-heading font-bold text-3xl">Label</p>
                    <p className="font-heading font-semibold">OAPI</p>
                  </motion.div>
                </motion.div>

                {/* Decorative element */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-secondary rounded-full opacity-50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values - Interactive cards */}
      <section className="py-16 bg-muted/30">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Nos <span className="text-primary">valeurs</span>
            </h2>
            <p className="body-regular text-muted-foreground max-w-xl mx-auto">
              Les principes qui guident chacune de nos créations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-card rounded-2xl p-6 border border-border/50 overflow-hidden cursor-pointer"
              >
                {/* Gradient background on hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <value.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="heading-card text-foreground mb-2">{value.title}</h3>
                  <p className="body-small text-muted-foreground">{value.description}</p>
                </div>
              </motion.div>
            ))}
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
            className="bg-deep-black text-white rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          >
            <GradientBlob 
              className="top-0 left-0" 
              color1="hsl(var(--primary) / 0.3)"
              size="300px"
            />
            <GradientBlob 
              className="bottom-0 right-0" 
              color1="hsl(var(--secondary) / 0.2)"
              size="250px"
            />

            <div className="relative z-10">
              <h2 className="heading-section mb-4">
                Prêt à <span className="text-primary">collaborer</span> ?
              </h2>
              <p className="body-large text-white/70 max-w-xl mx-auto mb-8">
                Discutons de votre projet et créons quelque chose d'extraordinaire ensemble.
              </p>
              <MagneticButton>
                <Button asChild size="lg" className="rounded-xl">
                  <Link to="/contact" className="flex items-center gap-2">
                    Contactez-nous
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

export default About;
