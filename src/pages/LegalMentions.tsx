import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, Building, Calendar, MapPin, Mail, Phone, Shield, Scale, Gavel, ChevronRight } from "lucide-react";

const LegalMentions = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-heading text-sm font-medium mb-6">
              <Gavel size={16} />
              Mentions Légales
            </div>
            
            <h1 className="heading-hero text-foreground mb-6">
              Mentions <span className="text-primary">Légales</span>
            </h1>
            
            <p className="body-large text-muted-foreground leading-relaxed">
              Informations légales et conditions d'utilisation du site fernanden.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 border border-border/30 mb-8"
            >
              <h2 className="heading-section text-foreground mb-6 flex items-center gap-3">
                <Building className="text-primary" size={28} />
                Informations sur l'Entreprise
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Raison Sociale
                    </h3>
                    <p className="text-muted-foreground">
                      FERNANDEN ENTREPRISES
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Forme Juridique
                    </h3>
                    <p className="text-muted-foreground">
                      Entreprise Individuelle
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Numéro d'Immatriculation
                    </h3>
                    <p className="text-muted-foreground">
                      En cours d'immatriculation
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Adresse du Siège
                    </h3>
                    <p className="text-muted-foreground">
                      Lot 265S Parcelle S Quartier Sèmè Aïtchedji<br />
                      Cotonou, Bénin
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Email de Contact
                    </h3>
                    <p className="text-muted-foreground">
                      fernandenentreprises@gmail.com
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Téléphone
                    </h3>
                    <p className="text-muted-foreground">
                      +229 01 97 51 26 36<br />
                      +229 01 48 71 35 36
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Director Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border/30 mb-8"
            >
              <h2 className="heading-section text-foreground mb-6 flex items-center gap-3">
                <Scale className="text-primary" size={28} />
                Responsable de la Publication
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Nom du Directeur
                    </h3>
                    <p className="text-muted-foreground">
                      [Nom du Directeur/Gérant]
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Fonction
                    </h3>
                    <p className="text-muted-foreground">
                      Gérant / Directeur de la Publication
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Date de Naissance
                    </h3>
                    <p className="text-muted-foreground">
                      [Date de naissance]
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Lieu de Naissance
                    </h3>
                    <p className="text-muted-foreground">
                      [Lieu de naissance]
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hosting Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-8 border border-border/30 mb-8"
            >
              <h2 className="heading-section text-foreground mb-6 flex items-center gap-3">
                <Shield className="text-primary" size={28} />
                Hébergement du Site
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Hébergeur
                    </h3>
                    <p className="text-muted-foreground">
                      [Nom de l'hébergeur]
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Adresse de l'Hébergeur
                    </h3>
                    <p className="text-muted-foreground">
                      [Adresse complète de l'hébergeur]
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Téléphone de l'Hébergeur
                    </h3>
                    <p className="text-muted-foreground">
                      [Numéro de téléphone]
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Site Web de l'Hébergeur
                    </h3>
                    <p className="text-muted-foreground">
                      [Site web de l'hébergeur]
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-8 border border-border/30 mb-8"
            >
              <h2 className="heading-section text-foreground mb-6 flex items-center gap-3">
                <FileText className="text-primary" size={28} />
                Propriété Intellectuelle
              </h2>
              
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                  et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris les 
                  représentations iconographiques et photographiques.
                </p>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Contenu Protégé
                  </h3>
                  <p className="text-muted-foreground">
                    Textes, images, vidéos, logos, design graphique, structure du site
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Label OAPI
                  </h3>
                  <p className="text-muted-foreground">
                    fernanden® est une marque déposée auprès de l'Organisation Africaine de la Propriété Intellectuelle (OAPI)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Terms of Use */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl p-8 border border-border/30 mb-8"
            >
              <h2 className="heading-section text-foreground mb-6 flex items-center gap-3">
                <Gavel className="text-primary" size={28} />
                Conditions d'Utilisation
              </h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Utilisation du Site
                  </h3>
                  <p className="text-muted-foreground">
                    L'utilisation de ce site implique l'acceptation pleine et entière des conditions générales 
                    d'utilisation décrites ci-après.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Responsabilité
                  </h3>
                  <p className="text-muted-foreground">
                    fernanden décline toute responsabilité pour les dommages directs ou indirects résultant 
                    de l'utilisation de ce site.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Liens Externes
                  </h3>
                  <p className="text-muted-foreground">
                    Les liens vers d'autres sites sont fournis à titre informatif. fernanden n'est pas responsable 
                    du contenu de ces sites externes.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Cookies and GDPR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl p-8 border border-border/30 mb-8"
            >
              <h2 className="heading-section text-foreground mb-6 flex items-center gap-3">
                <Shield className="text-primary" size={28} />
                Cookies et RGPD
              </h2>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Ce site utilise des cookies pour améliorer l'expérience utilisateur. En continuant à naviguer 
                  sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
                </p>
                
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    Conformément au RGPD, vous disposez d'un droit d'accès, de modification et de suppression 
                    de vos données personnelles. Pour exercer ces droits, contactez-nous à l'adresse 
                    fernandenentreprises@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border/30 text-center"
            >
              <h2 className="heading-section text-foreground mb-4">
                Contact Juridique
              </h2>
              <p className="body-regular text-muted-foreground mb-6">
                Pour toute question concernant ces mentions légales, n'hésitez pas à nous contacter
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors"
              >
                Contacter le Service Juridique
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LegalMentions;
