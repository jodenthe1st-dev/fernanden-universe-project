import { motion } from "framer-motion";
import { Sparkles, Heart, Award, Clock } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Tradition",
    description: "Ancrage dans l'héritage culturel africain",
  },
  {
    icon: Heart,
    title: "Innovation",
    description: "Créativité contemporaine et audacieuse",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Qualité et attention au détail",
  },
  {
    icon: Clock,
    title: "Timeless Chic",
    description: "Élégance intemporelle et raffinée",
  },
];

export function BrandDNA() {
  return (
    <section className="py-20 lg:py-32 bg-cream pattern-droplet">
      <div className="container-main">
        <div className="max-w-4xl mx-auto text-center">
          {/* OAPI Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-densen-gold/20 border border-densen-gold/30 mb-8"
          >
            <Award className="w-5 h-5 text-densen-gold" />
            <span className="font-heading text-sm font-semibold text-densen-gold">
              Label OAPI
            </span>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section text-foreground mb-6">
              Plongez dans un univers où{" "}
              <span className="text-primary">tradition</span> et{" "}
              <span className="text-secondary">modernité</span> se rencontrent
            </h2>

            <p className="body-large text-muted-foreground mb-8 leading-relaxed">
              Chez fernanden, nous croyons que le design est un langage universel qui transcende les frontières. Notre approche unique fusionne l'élégance intemporelle de l'héritage africain avec les tendances contemporaines, créant des expériences qui résonnent avec authenticité et innovation.
            </p>

            <p className="body-regular text-muted-foreground leading-relaxed">
              Notre double goutte symbolise cette dualité : la transmission du savoir ancestral et la créativité sans limites. Chaque projet est une opportunité de célébrer cette fusion, de raconter une histoire, et de laisser une empreinte durable.
            </p>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex flex-col items-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="body-small text-muted-foreground text-center">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
