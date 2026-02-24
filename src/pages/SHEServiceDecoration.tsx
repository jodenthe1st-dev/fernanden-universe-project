import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Palette, Check, Star, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  decorationServices, 
  processSteps, 
  testimonials, 
  decorationStyles, 
  faq 
} from "@/data/decorationData";
import { placeholderImages } from "@/components/ui/BrandedPlaceholder";

const SHEServiceDecoration = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2798&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black/90 via-deep-black/70 to-deep-black/40" />
        </div>

        <div className="relative z-10 container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-she-saffron/20 rounded-2xl flex items-center justify-center">
                  <Palette className="w-8 h-8 text-she-saffron" />
                </div>
                <div>
                  <h1 className="heading-hero text-white mb-2">
                    Décoration & Styling
                  </h1>
                  <p className="text-lg text-white/80 font-medium">
                    L'art de sublimer les espaces
                  </p>
                </div>
              </div>
              
              <p className="body-large text-white/80 mb-8">
                Transformons vos espaces avec la touche finale qui fait toute la différence. 
                De la sélection d'accessoires à la décoration complète, nous créons 
                des ambiances qui reflètent votre personnalité.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-xl bg-she-saffron hover:bg-she-saffron/90">
                  <Link to="/contact" className="flex items-center gap-2">
                    Demander un devis
                    <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl border-she-saffron/30 text-she-saffron hover:bg-she-saffron/10">
                  <Phone size={18} className="mr-2" />
                  <a href="tel:+22901975126" className="flex items-center">
                    +229 01 97 51 26 36
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decoration Services */}
      <section className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Services de <span className="text-she-saffron">décoration</span>
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Des solutions décoratives sur mesure pour votre intérieur
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {decorationServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-border/50">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-she-saffron/20 text-she-saffron border-she-saffron/30 backdrop-blur-sm">
                        {service.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="heading-subsection text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check size={14} className="text-she-saffron" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-she-saffron">{service.price}</span>
                      <Button variant="outline" size="sm" className="rounded-full border-she-saffron text-she-saffron hover:bg-she-saffron/10" asChild>
                        <Link to="/contact">
                          En savoir plus
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted/20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Notre <span className="text-she-saffron">processus</span> décoratif
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Une méthode simple pour transformer votre espace
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-2">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 text-center relative"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-she-saffron/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-she-saffron">{step.step}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-she-saffron/20 -translate-x-8" />
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-tight">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decoration Styles */}
      <section className="py-16 bg-muted/20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Styles de <span className="text-she-saffron">décoration</span>
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Des styles uniques pour votre intérieur
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {decorationStyles.map((style, index) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-500 border-border/50 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-she-saffron/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <style.icon className="w-6 h-6 text-she-saffron" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{style.name}</h3>
                    <p className="text-sm text-muted-foreground">{style.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Ils nous <span className="text-she-saffron">font confiance</span>
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Découvrez les transformations réussies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.project}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/20">
        <div className="container-main max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-section text-foreground mb-4">
              Questions <span className="text-she-saffron">fréquentes</span>
            </h2>
            <p className="body-large text-muted-foreground">
              Les réponses à vos questions sur la décoration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-1 gap-6">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-she-saffron/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-she-saffron font-semibold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-3 text-lg">{item.question}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-she-saffron/10 to-primary/5">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="heading-section text-foreground mb-4">
              Prêt à transformer votre <span className="text-she-saffron">espace</span> ?
            </h2>
            <p className="body-large text-muted-foreground mb-8">
              Laissez-nous créer une ambiance qui vous ressemble. 
              Contactez-nous pour une consultation décorative gratuite.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="rounded-xl bg-she-saffron hover:bg-she-saffron/90">
                <Link to="/contact" className="flex items-center gap-2">
                  <Mail size={18} />
                  Consultation gratuite
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl border-she-saffron text-she-saffron hover:border-transparent hover:bg-transparent hover:text-she-saffron">
                <Link to="/she" className="flex items-center gap-2">
                  <ArrowLeft size={18} />
                  Retour à SHE
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SHEServiceDecoration;
