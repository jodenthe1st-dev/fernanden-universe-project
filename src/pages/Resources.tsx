import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileText, BookOpen, Palette, Sparkles, ArrowRight } from "lucide-react";
import { AnimatedLetters } from "@/components/animations/AnimatedLetters";
import { GradientBlob } from "@/components/animations/GradientBlob";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { Link } from "react-router-dom";
const resources = [
  {
    id: 1,
    title: "Bilan Psychopédagogique",
    description: "Modèle de bilan pour accompagnement scolaire",
    category: "Psychopédagogie",
    type: "PDF",
    downloads: 234,
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Guide d'Orientation",
    description: "Questionnaire d'orientation professionnelle",
    category: "Psychopédagogie",
    type: "PDF",
    downloads: 189,
    icon: FileText,
  },
  {
    id: 3,
    title: "Charte Graphique Template",
    description: "Modèle de charte graphique personnalisable",
    category: "Design",
    type: "PDF",
    downloads: 312,
    icon: Palette,
  },
  {
    id: 4,
    title: "Checklist Événement",
    description: "Liste de vérification pour vos événements",
    category: "Business",
    type: "PDF",
    downloads: 156,
    icon: FileText,
  },
];

const Resources = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <GradientBlob 
          className="-top-40 right-1/4" 
          color1="hsl(var(--primary) / 0.15)"
          size="400px"
        />
        <GradientBlob 
          className="-bottom-20 -left-40" 
          color1="hsl(var(--secondary) / 0.1)"
          size="300px"
        />

        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <Sparkles size={16} className="text-primary" />
              <span className="font-heading text-sm font-medium text-primary">Outils & Guides</span>
            </motion.div>
            
            <h1 className="heading-hero text-foreground mb-4">
              <AnimatedLetters text="Ressources" type="wave" />
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="body-large text-muted-foreground max-w-xl mx-auto"
            >
              Téléchargez nos outils gratuits pour votre développement
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="heading-section text-foreground mb-4">
              Outils <span className="text-primary">Gratuits</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Des ressources pratiques pour accompagner votre développement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <motion.div 
                    className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <resource.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-heading font-medium rounded-full">
                    {resource.type}
                  </span>
                </div>

                <h3 className="heading-card text-foreground mb-2">{resource.title}</h3>
                <p className="body-small text-muted-foreground mb-4">{resource.description}</p>
                <span className="inline-block px-3 py-1 bg-cafee-mint/10 text-cafee-mint text-xs font-medium rounded-full mb-4">
                  {resource.category}
                </span>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="body-small text-muted-foreground">
                    {resource.downloads} téléchargements
                  </span>
                  <MagneticButton strength={0.3}>
                    <Button size="sm" className="flex items-center gap-2 rounded-lg">
                      <Download size={14} />
                      Télécharger
                    </Button>
                  </MagneticButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-deep-black text-white rounded-3xl p-10 md:p-14 relative overflow-hidden"
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

            <div className="relative z-10 text-center max-w-xl mx-auto">
              <h2 className="heading-section mb-4">
                Restez <span className="text-primary">Inspiré</span>
              </h2>
              <p className="body-large text-white/70 mb-8">
                Recevez nos nouvelles ressources, astuces et podcasts directement dans votre boîte mail.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
                />
                <MagneticButton>
                  <Button type="submit" size="lg" className="rounded-xl bg-primary hover:bg-primary/90">
                    S'abonner
                  </Button>
                </MagneticButton>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA to Contact */}
      <section className="py-16 bg-muted/30">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-subsection text-foreground mb-4">
              Besoin d'aide personnalisée ?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Notre équipe est disponible pour répondre à toutes vos questions
            </p>
            <MagneticButton>
              <Button asChild size="lg" className="rounded-xl">
                <Link to="/contact" className="flex items-center gap-2">
                  Contactez-nous
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
