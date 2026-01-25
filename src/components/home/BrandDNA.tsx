import { motion } from "framer-motion";
import { Sparkles, Heart, Users, Target } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Authenticité",
    description: "Un engagement sincère envers l'héritage culturel africain",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description: "La quête constante de la qualité dans chaque détail",
  },
  {
    icon: Users,
    title: "Communauté",
    description: "Créer des liens durables avec nos clients et partenaires",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Fusionner tradition et modernité avec audace",
  },
];

export function BrandDNA() {
  return (
    <section className="py-24 lg:py-32 bg-cream relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container-main relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[2px] bg-primary" />
              <span className="font-heading text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Notre ADN
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              Une marque ancrée dans
              <span className="text-primary block">l'excellence africaine</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Fernanden incarne la rencontre entre tradition et modernité. Nous créons des expériences uniques qui célèbrent l'héritage africain tout en embrassant l'innovation contemporaine.
            </p>

            {/* OAPI Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-4 bg-card p-4 pr-6 rounded-xl shadow-lg"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-terracotta">
                <span className="text-white font-heading font-bold text-sm">OAPI</span>
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">
                  Marque Déposée
                </p>
                <p className="text-xs text-muted-foreground">
                  Protection intellectuelle certifiée
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Values Grid */}
          <div className="grid grid-cols-2 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/20"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
