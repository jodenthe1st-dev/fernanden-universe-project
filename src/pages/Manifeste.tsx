import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Quote, Heart, Star, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";
import logoDensen from "@/assets/logo-densen.png";

const Manifeste = () => {
  return (
    <Layout>
      <section className="py-20 relative min-h-screen">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-densen-gold/8 via-transparent to-primary/5 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--soft-gold)/0.10),transparent_60%)]" />
        
        <div className="container-main relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-densen-gold/20 to-primary/20 backdrop-blur-md rounded-full border border-densen-gold/30 mb-6">
              <Sparkles size={16} className="text-densen-gold animate-pulse" />
              <span className="font-heading text-sm font-medium text-densen-gold">Notre Philosophie</span>
              <Sparkles size={16} className="text-primary animate-pulse delay-300" />
            </div>
            
            <h1 className="heading-section text-foreground mb-6">
              Notre <span className="bg-gradient-to-r from-densen-gold to-primary bg-clip-text text-transparent">Manifeste</span>
            </h1>
            
            <p className="body-large text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              L'expression d'un style raffiné où chaque vêtement devient un manifeste personnel
            </p>
          </motion.div>

          {/* Main Manifeste Content */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl rounded-3xl p-12 md:p-20 border border-border/20 shadow-2xl shadow-densen-gold/10 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-densen-gold/5 via-transparent to-transparent" />
              
              <div className="relative z-10">
                {/* Quote principale */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                  className="text-center mb-16"
                >
                  <Quote className="w-16 h-16 text-densen-gold mx-auto mb-6" />
                  <blockquote className="font-serif text-5xl italic text-densen-gold mb-8 leading-relaxed">
                    "Je suis tissu de force et de foi"
                  </blockquote>
                  <p className="text-muted-foreground text-lg font-medium">
                    Notre devise, votre identité
                  </p>
                </motion.div>

                {/* Manifeste sections */}
                <div className="space-y-12">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <h2 className="font-heading font-bold text-3xl text-foreground mb-6">
                      L'Élégance <span className="text-densen-gold">Transformable</span>
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      Chez DENSE, nous croyons que la mode doit être aussi flexible que la vie. 
                      Chaque pièce est conçue pour s'adapter à vos multiples facettes, 
                      vous accompagnant du bureau au dîner, du jour au soir, sans jamais compromettre votre style.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-densen-gold/10 rounded-2xl p-6 border border-densen-gold/20">
                        <div className="w-12 h-12 bg-densen-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Sparkles className="w-6 h-6 text-densen-gold" />
                        </div>
                        <h3 className="font-heading font-bold text-lg text-foreground mb-2">Innovation</h3>
                        <p className="text-muted-foreground text-sm">
                          Des technologies brevetées pour des transformations magiques
                        </p>
                      </div>
                      <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Heart className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-heading font-bold text-lg text-foreground mb-2">Durabilité</h3>
                        <p className="text-muted-foreground text-sm">
                          Moins de pièces, plus de possibilités pour une mode responsable
                        </p>
                      </div>
                      <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                        <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Star className="w-6 h-6 text-secondary" />
                        </div>
                        <h3 className="font-heading font-bold text-lg text-foreground mb-2">Excellence</h3>
                        <p className="text-muted-foreground text-sm">
                          Un savoir-faire artisanal français au service de l'élégance
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <h2 className="font-heading font-bold text-3xl text-foreground mb-6">
                      Votre <span className="text-densen-gold">Style</span>, Notre <span className="text-primary">Mission</span>
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      Nous ne créons pas seulement des vêtements, nous sculptons des expériences. 
                      Chaque collection est une invitation à redécouvrir votre propre style, 
                      à exprimer votre unicité à travers des pièces qui évoluent avec vous.
                    </p>
                    <div className="bg-gradient-to-r from-densen-gold/10 to-primary/10 rounded-2xl p-8 border border-densen-gold/20">
                      <blockquote className="font-serif text-2xl italic text-densen-gold mb-4">
                        "La mode n'est pas seulement ce que l'on porte. C'est qui nous sommes."
                      </blockquote>
                      <p className="text-muted-foreground">
                        — L'équipe DENSE
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                  >
                    <h2 className="font-heading font-bold text-3xl text-foreground mb-6">
                      L'Engagement <span className="text-densen-gold">DENSE</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                      <div>
                        <h3 className="font-heading font-bold text-xl text-foreground mb-4">Qualité</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-densen-gold rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">Matériaux premium sélectionnés avec soin</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-densen-gold rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">Fabrication 100% française</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-densen-gold rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">Garantie à vie sur nos systèmes de transformation</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-xl text-foreground mb-4">Innovation</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">Brevets technologiques exclusifs</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">R&D constante pour de nouvelles transformations</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">Design thinking centré sur l'utilisatrice</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-center mt-16 pt-8 border-t border-border/20"
                >
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
                    Prête à <span className="text-densen-gold">transformer</span> votre style ?
                  </h3>
                  <p className="text-muted-foreground mb-8 text-lg">
                    Découvrez les 7 collections qui incarnent notre philosophie
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <MagneticButton>
                      <Button size="lg" className="rounded-xl bg-gradient-to-r from-densen-gold to-primary hover:from-densen-gold/90 hover:to-primary/90 text-black shadow-xl transition-all duration-300 px-8 py-4 text-lg">
                        <Link to="/dense#collections" className="flex items-center gap-3">
                          Découvrir les collections
                          <ArrowRight size={20} />
                        </Link>
                      </Button>
                    </MagneticButton>
                    <MagneticButton>
                      <Button size="lg" variant="outline" className="rounded-xl border-2 border-densen-gold text-densen-gold hover:bg-densen-gold hover:text-black transition-all duration-300 px-8 py-4 text-lg">
                        <Link to="/dense/contact" className="flex items-center gap-3">
                          Prendre RDV styliste
                          <ArrowRight size={20} />
                        </Link>
                      </Button>
                    </MagneticButton>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <MagneticButton>
              <Button variant="outline" size="lg" className="rounded-xl border-densen-gold text-densen-gold hover:bg-densen-gold hover:text-black transition-all duration-300">
                <Link to="/dense" className="flex items-center gap-3">
                  <ArrowLeft size={20} />
                  Retour à DENSE
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Manifeste;
