import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Award, Users, Target, Sparkles } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-cream pattern-droplet">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4 block">
              Notre Histoire
            </span>
            <h1 className="heading-hero text-foreground mb-6">
              À propos de <span className="text-primary">fernanden</span>
            </h1>
            <p className="body-large text-muted-foreground">
              Une marque africaine contemporaine qui transcende les frontières du design, de la mode et de l'éducation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-background">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-section text-foreground mb-6">
                Notre <span className="text-primary">vision</span>
              </h2>
              <p className="body-regular text-muted-foreground mb-4">
                Fondée au cœur du Bénin, fernanden est née de la conviction que le design africain peut et doit rayonner à l'échelle mondiale. Notre double goutte symbolise cette dualité unique : l'ancrage dans nos racines et l'ouverture vers l'innovation.
              </p>
              <p className="body-regular text-muted-foreground mb-4">
                À travers nos trois univers — SHE, DENSEN et CaFEE — nous offrons une expérience holistique qui touche à l'espace de vie, à l'identité vestimentaire et au développement personnel.
              </p>
              <p className="body-regular text-muted-foreground">
                Chaque création porte l'empreinte de notre engagement envers l'excellence, l'authenticité et le respect de notre héritage culturel.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2670&auto=format&fit=crop"
                alt="fernanden studio"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl">
                <p className="font-heading font-bold text-3xl">Label</p>
                <p className="font-heading font-semibold">OAPI</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-section text-foreground mb-4">
              Nos <span className="text-primary">valeurs</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Excellence", description: "Chaque détail compte dans notre quête de perfection." },
              { icon: Users, title: "Authenticité", description: "Nous célébrons notre héritage avec fierté et modernité." },
              { icon: Target, title: "Innovation", description: "Repousser les limites du design africain contemporain." },
              { icon: Sparkles, title: "Impact", description: "Créer du sens et laisser une empreinte positive." },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-8 rounded-xl text-center card-hover"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="heading-card text-foreground mb-3">{value.title}</h3>
                <p className="body-small text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
