import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Calendar, Sparkles, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Calendar,
    title: "Event Design",
    description: "Mariages, anniversaires, cérémonies corporatives et événements culturels. Nous créons des expériences mémorables.",
    items: ["Conception globale", "Décoration florale", "Mise en scène", "Coordination jour J"],
  },
  {
    icon: Home,
    title: "Home & Spaces",
    description: "Design d'intérieur résidentiel et commercial. Transformez vos espaces en reflets de votre identité.",
    items: ["Consultation design", "Plans d'aménagement", "Sourcing mobilier", "Direction artistique"],
  },
];

const SHE = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2798&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-deep-black/80 to-deep-black/40" />
        </div>

        <div className="relative z-10 container-main text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block font-heading text-sm uppercase tracking-[0.2em] text-she-saffron mb-4">
              Spaces, Home & Event Design
            </span>
            <h1 className="heading-hero mb-6">
              SHE by <span className="text-primary">fernanden</span>
            </h1>
            <p className="body-large text-white/80 mb-8">
              Transformez vos espaces et événements en expériences inoubliables. Nous créons des ambiances uniques qui racontent votre histoire.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Demander un devis</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-section text-foreground mb-4">
              Nos <span className="text-primary">services</span>
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              De la conception à la réalisation, nous vous accompagnons dans tous vos projets d'aménagement et d'événementiel.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl border-l-4 border-she-saffron card-hover"
              >
                <div className="w-16 h-16 bg-she-saffron/10 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-she-saffron" />
                </div>
                <h3 className="heading-card text-foreground mb-4">{service.title}</h3>
                <p className="body-regular text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 body-small text-muted-foreground">
                      <Sparkles className="w-4 h-4 text-she-saffron" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-she-saffron/10">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-section text-foreground mb-6">
              Prêt à transformer votre espace ?
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto mb-8">
              Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
            </p>
            <Button asChild size="lg">
              <Link to="/contact" className="flex items-center gap-2">
                Demander un devis
                <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SHE;
