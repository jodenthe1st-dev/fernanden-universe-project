import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Palette, ArrowRight, BookOpen, Users, Lightbulb, PenTool, Sparkles } from "lucide-react";
import { AnimatedLetters } from "@/components/animations/AnimatedLetters";
import { GradientBlob } from "@/components/animations/GradientBlob";
import { MagneticButton } from "@/components/animations/MagneticButton";

const educationServices = [
  { icon: BookOpen, title: "Accompagnement Psychopédagogique", description: "Coaching scolaire et développement des compétences d'apprentissage" },
  { icon: Users, title: "Orientation & Réorientation", description: "Bilan d'orientation et construction de projet professionnel" },
  { icon: Lightbulb, title: "Communication & Médiation", description: "Techniques de communication et gestion des conflits familiaux" },
];

const expressiveServices = [
  { icon: PenTool, title: "Communication Visuelle", description: "Flyers, affiches, brochures et packaging sur mesure" },
  { icon: Palette, title: "Branding & Identité", description: "Logos, chartes graphiques et identité visuelle complète" },
];

const CaFEE = () => {
  return (
    <Layout>
      {/* Hero Section - Split design */}
      <section className="pt-24 relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          {/* Education Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center p-8 lg:p-12"
          >
            <GradientBlob 
              className="-top-20 -left-20" 
              color1="hsl(var(--cafee-mint) / 0.15)"
              size="300px"
            />
            
            <div className="max-w-md text-center lg:text-left relative z-10">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-20 h-20 bg-cafee-mint/20 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6"
              >
                <GraduationCap className="w-10 h-10 text-cafee-mint" />
              </motion.div>
              
              <h2 className="heading-section text-foreground mb-2">
                CaFEE <span className="text-cafee-mint">Éducation</span>
              </h2>
              <p className="font-serif text-lg italic text-muted-foreground mb-4">
                "Apprendre autrement, s'exprimer pleinement"
              </p>
              <p className="body-regular text-muted-foreground mb-8">
                Cabinet de psychopédagogie innovant au Bénin. Accompagnement personnalisé pour enfants, adolescents et adultes.
              </p>
              
              <MagneticButton>
                <Button asChild className="rounded-xl bg-cafee-mint hover:bg-cafee-mint/90">
                  <Link to="/cafee/education" className="flex items-center gap-2">
                    Explorer l'éducation
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-1/2 bg-border" />

          {/* Expressive Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center p-8 lg:p-12 bg-muted/30"
          >
            <GradientBlob 
              className="-bottom-20 -right-20" 
              color1="hsl(var(--cafee-orange) / 0.15)"
              size="300px"
            />
            
            <div className="max-w-md text-center lg:text-left relative z-10">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="w-20 h-20 bg-cafee-orange/20 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6"
              >
                <Palette className="w-10 h-10 text-cafee-orange" />
              </motion.div>
              
              <h2 className="heading-section text-foreground mb-2">
                CaFEE <span className="text-cafee-orange">Expressive</span>
              </h2>
              <p className="font-serif text-lg italic text-muted-foreground mb-4">
                "Donnez vie à vos idées"
              </p>
              <p className="body-regular text-muted-foreground mb-8">
                Design graphique et édition. De l'identité visuelle aux supports de communication, nous créons avec impact.
              </p>
              
              <MagneticButton>
                <Button asChild className="rounded-xl bg-cafee-orange hover:bg-cafee-orange/90">
                  <Link to="/cafee/expressive" className="flex items-center gap-2">
                    Explorer le design
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-cafee-mint/20 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-cafee-mint" />
                </div>
                <h3 className="heading-subsection text-foreground">Services Éducation</h3>
              </div>
              
              <div className="space-y-4">
                {educationServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="flex items-start gap-4 p-5 bg-card rounded-xl border-l-4 border-cafee-mint cursor-pointer group"
                  >
                    <div className="w-10 h-10 bg-cafee-mint/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-cafee-mint/20 transition-colors">
                      <service.icon className="w-5 h-5 text-cafee-mint" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">{service.title}</h4>
                      <p className="body-small text-muted-foreground">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <Link 
                  to="/cafee/education" 
                  className="inline-flex items-center gap-2 font-heading font-medium text-cafee-mint hover:underline"
                >
                  Découvrir tous nos services <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Expressive Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-cafee-orange/20 rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 text-cafee-orange" />
                </div>
                <h3 className="heading-subsection text-foreground">Services Design</h3>
              </div>
              
              <div className="space-y-4">
                {expressiveServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: -8 }}
                    className="flex items-start gap-4 p-5 bg-card rounded-xl border-l-4 border-cafee-orange cursor-pointer group"
                  >
                    <div className="w-10 h-10 bg-cafee-orange/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-cafee-orange/20 transition-colors">
                      <service.icon className="w-5 h-5 text-cafee-orange" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">{service.title}</h4>
                      <p className="body-small text-muted-foreground">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <Link 
                  to="/cafee/expressive" 
                  className="inline-flex items-center gap-2 font-heading font-medium text-cafee-orange hover:underline"
                >
                  Voir notre portfolio <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
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
            
            <div className="relative z-10 p-10 md:p-14 text-center text-white">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
              
              <h2 className="heading-section mb-4">
                Prêt à collaborer ?
              </h2>
              <p className="body-large text-white/80 max-w-xl mx-auto mb-8">
                Que ce soit pour un accompagnement éducatif ou un projet de design, nous sommes là pour vous.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton>
                  <Button asChild size="lg" className="rounded-xl bg-white text-cafee-mint hover:bg-white/90">
                    <Link to="/contact">Prendre rendez-vous</Link>
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button asChild size="lg" variant="outline" className="rounded-xl border-white/30 text-white hover:bg-white/10">
                    <Link to="/contact">Demander un devis</Link>
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
