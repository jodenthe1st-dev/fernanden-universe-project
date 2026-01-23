import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";

const densenMeaning = [
  { letter: "D", word: "Distinctive", description: "Des créations uniques qui vous distinguent" },
  { letter: "E", word: "Engaged", description: "Un engagement envers l'artisanat africain" },
  { letter: "N", word: "Noble", description: "Des matériaux nobles et durables" },
  { letter: "S", word: "Sensitive", description: "Une sensibilité aux détails et à l'esthétique" },
  { letter: "E", word: "Elegant", description: "L'élégance intemporelle dans chaque pièce" },
  { letter: "N", word: "Natural", description: "Des fibres naturelles et éco-responsables" },
];

const DENSEN = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=2787&auto=format&fit=crop')`,
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
            <span className="inline-block font-heading text-sm uppercase tracking-[0.2em] text-secondary mb-4">
              Fashion Design
            </span>
            <h1 className="heading-hero mb-6">
              DENSEN by <span className="text-primary">fernanden</span>
            </h1>
            <p className="body-large text-white/80 mb-4">
              Mode, Sens, Identité et Inspiration.
            </p>
            <p className="font-serif text-xl italic text-secondary mb-8">
              "Je suis tissu de force et de foi"
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link to="/densen/shop" className="flex items-center gap-2">
                  <ShoppingBag size={18} />
                  Découvrir la collection
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-20 bg-cream">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-section text-foreground mb-4">
              La philosophie <span className="text-primary">DENSEN</span>
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Chaque lettre de DENSEN porte une signification profonde qui guide notre vision de la mode africaine contemporaine.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {densenMeaning.map((item, index) => (
              <motion.div
                key={`${item.letter}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl card-hover"
              >
                <div className="flex items-start gap-4">
                  <span className="font-serif text-4xl font-bold text-primary">{item.letter}</span>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                      {item.word}
                    </h3>
                    <p className="body-small text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Preview */}
      <section className="py-20 bg-background">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-section text-foreground mb-4">
              Notre <span className="text-primary">collection</span>
            </h2>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Des pièces uniques qui célèbrent l'héritage africain avec une touche contemporaine.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] bg-muted rounded-xl overflow-hidden mb-4 image-zoom">
                  <img
                    src={`https://images.unsplash.com/photo-${item === 1 ? '1558171813-4c088753af8f' : item === 2 ? '1509631179647-0177331693ae' : item === 3 ? '1515886657613-9f3515b0c78f' : '1469334031218-e382a71b716b'}?q=80&w=600&auto=format&fit=crop`}
                    alt={`Collection item ${item}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-deep-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm">
                      Voir détails
                    </Button>
                  </div>
                </div>
                <h4 className="font-heading font-semibold text-foreground mb-1">Pièce Collection</h4>
                <p className="font-heading font-bold text-primary">45 000 FCFA</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" variant="outline">
              <Link to="/densen/shop" className="flex items-center gap-2">
                Voir toute la collection
                <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default DENSEN;
