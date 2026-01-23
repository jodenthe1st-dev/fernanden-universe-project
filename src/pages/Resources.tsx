import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileText, BookOpen, Palette } from "lucide-react";

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
      <section className="pt-32 pb-16 bg-cream pattern-droplet">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="heading-hero text-foreground mb-4">
              Ressources <span className="text-primary">Gratuites</span>
            </h1>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Téléchargez nos outils et guides pour votre développement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-background">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl shadow-card card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <resource.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-heading font-medium rounded-full">
                    {resource.type}
                  </span>
                </div>

                <h3 className="heading-card text-foreground mb-2">{resource.title}</h3>
                <p className="body-small text-muted-foreground mb-4">{resource.description}</p>

                <div className="flex items-center justify-between">
                  <span className="body-small text-muted-foreground">
                    {resource.downloads} téléchargements
                  </span>
                  <Button size="sm" className="flex items-center gap-2">
                    <Download size={14} />
                    Télécharger
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-primary">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-section text-white mb-4">
              Restez Inspiré
            </h2>
            <p className="body-large text-white/80 max-w-xl mx-auto mb-8">
              Recevez nos nouvelles ressources, astuces et podcasts directement dans votre boîte mail.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50"
              />
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                S'abonner
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
