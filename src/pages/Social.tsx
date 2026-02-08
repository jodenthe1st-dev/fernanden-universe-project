import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import FacebookFeed from "@/components/social/FacebookFeed";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, ExternalLink } from "lucide-react";

const Social = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="heading-section text-foreground mb-4">
              Rejoignez notre <span className="text-primary">communauté</span>
            </h1>
            <p className="body-large text-muted-foreground">
              Suivez l'aventure fernanden sur les réseaux sociaux et restez connecté avec nos dernières actualités, créations et inspirations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Platforms Grid */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Facebook */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Facebook className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Facebook</h3>
                  <p className="text-sm text-muted-foreground">@fernanden</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Actualités, événements et communauté engagée
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full"
              >
                <a
                  href="https://www.facebook.com/share/1A4ToZPFmk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Visiter la page
                </a>
              </Button>
            </motion.div>

            {/* Instagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Instagram</h3>
                  <p className="text-sm text-muted-foreground">@fernanden</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Créations visuelles et coulisses de nos projets
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full"
              >
                <a
                  href="https://www.instagram.com/fernanden_design?utm_source=qr&igsh=ZmFrMnhoYjFrOGZv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Suivre
                </a>
              </Button>
            </motion.div>

            {/* LinkedIn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">LinkedIn</h3>
                  <p className="text-sm text-muted-foreground">fernanden</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Actualités professionnelles et opportunités
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full"
              >
                <a
                  href="https://www.linkedin.com/company/fernanden-entreprises/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Connecter
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Facebook Feed */}
          <div className="max-w-4xl mx-auto">
            <FacebookFeed />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Social;
