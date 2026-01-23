import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Palette, ArrowRight, BookOpen, Users, Lightbulb, PenTool } from "lucide-react";

const educationServices = [
  { icon: BookOpen, title: "Accompagnement Psychopédagogique", description: "Coaching scolaire et développement des compétences" },
  { icon: Users, title: "Orientation & Réorientation", description: "Bilan d'orientation et projet professionnel" },
  { icon: Lightbulb, title: "Communication & Médiation", description: "Techniques de communication et gestion des conflits" },
];

const expressiveServices = [
  { icon: PenTool, title: "Communication Visuelle", description: "Flyers, affiches, brochures et packaging" },
  { icon: Palette, title: "Branding & Identité", description: "Logos, chartes graphiques et identité visuelle" },
];

const CaFEE = () => {
  return (
    <Layout>
      {/* Hero Section - Split */}
      <section className="pt-24">
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          {/* Education Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-cafee-mint/20 to-cafee-mint/5"
          >
            <div className="max-w-md text-center lg:text-left">
              <div className="w-20 h-20 bg-cafee-mint/20 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <GraduationCap className="w-10 h-10 text-cafee-mint" />
              </div>
              <h2 className="heading-section text-foreground mb-4">
                CaFEE <span className="text-cafee-mint">Éducation</span>
              </h2>
              <p className="font-serif text-lg italic text-muted-foreground mb-4">
                "Apprendre autrement, s'exprimer pleinement"
              </p>
              <p className="body-regular text-muted-foreground mb-8">
                Cabinet de psychopédagogie innovant au Bénin. Accompagnement personnalisé pour enfants, adolescents et adultes.
              </p>
              <Button asChild className="bg-cafee-mint hover:bg-cafee-mint/90">
                <Link to="/cafee/education" className="flex items-center gap-2">
                  Explorer l'éducation
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Expressive Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-cafee-orange/20 to-cafee-orange/5"
          >
            <div className="max-w-md text-center lg:text-left">
              <div className="w-20 h-20 bg-cafee-orange/20 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <Palette className="w-10 h-10 text-cafee-orange" />
              </div>
              <h2 className="heading-section text-foreground mb-4">
                CaFEE <span className="text-cafee-orange">Expressive</span>
              </h2>
              <p className="font-serif text-lg italic text-muted-foreground mb-4">
                "Donnez vie à vos idées"
              </p>
              <p className="body-regular text-muted-foreground mb-8">
                Design graphique et édition. De l'identité visuelle aux supports de communication, nous créons avec impact.
              </p>
              <Button asChild className="bg-cafee-orange hover:bg-cafee-orange/90">
                <Link to="/cafee/expressive" className="flex items-center gap-2">
                  Explorer le design
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-background">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Education Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="heading-subsection text-foreground mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-cafee-mint/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-cafee-mint" />
                </span>
                Services Éducation
              </h3>
              <div className="space-y-4">
                {educationServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border-l-4 border-cafee-mint"
                  >
                    <service.icon className="w-6 h-6 text-cafee-mint shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">{service.title}</h4>
                      <p className="body-small text-muted-foreground">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Expressive Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="heading-subsection text-foreground mb-8 flex items-center gap-3">
                <span className="w-10 h-10 bg-cafee-orange/20 rounded-full flex items-center justify-center">
                  <Palette className="w-5 h-5 text-cafee-orange" />
                </span>
                Services Design
              </h3>
              <div className="space-y-4">
                {expressiveServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border-l-4 border-cafee-orange"
                  >
                    <service.icon className="w-6 h-6 text-cafee-orange shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">{service.title}</h4>
                      <p className="body-small text-muted-foreground">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-section text-foreground mb-6">
              Prêt à <span className="text-primary">collaborer</span> ?
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto mb-8">
              Que ce soit pour un accompagnement éducatif ou un projet de design, nous sommes là pour vous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Prendre rendez-vous</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Demander un devis</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CaFEE;
