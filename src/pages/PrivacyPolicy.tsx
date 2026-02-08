import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Eye, Lock, Cookie, Database, UserCheck, FileText, ChevronRight, ShoppingBag, Mail, TrendingUp } from "lucide-react";

const PrivacyPolicy = () => {
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
              <Shield size={16} />
              Confidentialité & Sécurité
            </div>
            
            <h1 className="heading-hero text-foreground mb-6">
              Politique de <span className="text-primary">Confidentialité</span>
            </h1>
            
            <p className="body-large text-muted-foreground leading-relaxed">
              Votre vie privée est notre priorité. Découvrez comment nous protégeons et utilisons vos données.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 border border-border/30 mb-8"
            >
              <h2 className="heading-section text-foreground mb-4 flex items-center gap-3">
                <Eye className="text-primary" size={28} />
                Notre Engagement
              </h2>
              <p className="body-regular text-muted-foreground leading-relaxed">
                Chez fernanden, nous nous engageons à protéger votre vie privée et à garantir la sécurité 
                de vos données personnelles. Cette politique explique quelles informations nous collectons, 
                pourquoi nous les collectons et comment nous les utilisons.
              </p>
              <p className="body-regular text-muted-foreground leading-relaxed mt-4">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </motion.div>

            {/* Data Collection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border/30 mb-8"
            >
              <h2 className="heading-section text-foreground mb-6 flex items-center gap-3">
                <Database className="text-primary" size={28} />
                Données Collectées
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                    Informations que vous nous fournissez
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>Nom, prénom et coordonnées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>Adresse email et numéro de téléphone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>Informations de paiement sécurisées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>Préférences et communications</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                    Informations collectées automatiquement
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>Adresse IP et données de navigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>Type de navigateur et appareil</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>Pages visitées et temps passé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span>Cookies et technologies similaires</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Usage Purpose */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-8 border border-border/30 mb-8"
            >
              <h2 className="heading-section text-foreground mb-6 flex items-center gap-3">
                <UserCheck className="text-primary" size={28} />
                Utilisation de Vos Données
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Services
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Pour fournir nos services et personnaliser votre expérience
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Communication
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Pour vous contacter et répondre à vos demandes
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    Amélioration
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Pour analyser et améliorer nos services
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Data Protection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-8 border border-border/30 mb-8"
            >
              <h2 className="heading-section text-foreground mb-6 flex items-center gap-3">
                <Lock className="text-primary" size={28} />
                Protection et Sécurité
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      Chiffrement SSL/TLS
                    </h3>
                    <p className="text-muted-foreground">
                      Toutes vos données sont chiffrées lors de leur transmission
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Database size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      Stockage Sécurisé
                    </h3>
                    <p className="text-muted-foreground">
                      Vos données sont stockées sur des serveurs sécurisés
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <UserCheck size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      Accès Limité
                    </h3>
                    <p className="text-muted-foreground">
                      Seul le personnel autorisé peut accéder à vos données
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl p-8 border border-border/30 mb-8"
            >
              <h2 className="heading-section text-foreground mb-6 flex items-center gap-3">
                <Cookie className="text-primary" size={28} />
                Cookies et Technologies Similaires
              </h2>
              
              <p className="body-regular text-muted-foreground mb-4">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site :
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">
                    Cookies Essentiels
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Nécessaires au fonctionnement du site et à la sécurité
                  </p>
                </div>
                
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">
                    Cookies de Performance
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Pour analyser l'utilisation et améliorer nos services
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl p-8 border border-border/30 mb-8"
            >
              <h2 className="heading-section text-foreground mb-6 flex items-center gap-3">
                <FileText className="text-primary" size={28} />
                Vos Droits
              </h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    Accès et Rectification
                  </h3>
                  <p className="text-muted-foreground">
                    Vous pouvez demander l'accès à vos données et leur correction
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    Suppression
                  </h3>
                  <p className="text-muted-foreground">
                    Vous pouvez demander la suppression de vos données personnelles
                  </p>
                </div>
                
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    Portabilité
                  </h3>
                  <p className="text-muted-foreground">
                    Vous pouvez demander le transfert de vos données vers un autre service
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
                Des Questions ?
              </h2>
              <p className="body-regular text-muted-foreground mb-6">
                Notre équipe est là pour répondre à toutes vos questions concernant la confidentialité
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-colors"
              >
                Nous Contacter
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
