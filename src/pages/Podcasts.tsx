import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Clock, MapPin, Headphones } from "lucide-react";

const densenMinuteEpisodes = [
  { id: 1, title: "Style Parisien", location: "Paris, France", duration: "1:00" },
  { id: 2, title: "Couleurs de Lagos", location: "Lagos, Nigeria", duration: "1:00" },
  { id: 3, title: "Élégance Dakaroise", location: "Dakar, Sénégal", duration: "1:00" },
];

const parenTipsEpisodes = [
  { id: 1, title: "Accompagner les devoirs", duration: "2:30" },
  { id: 2, title: "Gérer les écrans", duration: "3:00" },
  { id: 3, title: "Encourager la créativité", duration: "2:45" },
];

const Podcasts = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-primary/20 to-cafee-mint/20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-heading font-medium text-sm mb-6">
              <Headphones size={18} />
              fernanden Podcasts
            </span>
            <h1 className="heading-hero text-foreground mb-4">
              Nos <span className="text-primary">Podcasts</span>
            </h1>
            <p className="body-large text-muted-foreground max-w-2xl mx-auto">
              Style, éducation et inspiration — découvrez nos séries audio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Podcast Series */}
      <section className="py-20 bg-background">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* DENSEN Minute */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl shadow-card"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center">
                  <span className="font-serif text-2xl font-bold text-white">DM</span>
                </div>
                <div>
                  <h2 className="heading-card text-foreground">DENSEN Minute</h2>
                  <p className="body-small text-muted-foreground">60 secondes d'inspiration style</p>
                </div>
              </div>

              <div className="space-y-4">
                {densenMinuteEpisodes.map((episode) => (
                  <div
                    key={episode.id}
                    className="flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors cursor-pointer"
                  >
                    <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <Play size={16} className="text-white ml-0.5" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-semibold text-foreground truncate">
                        {episode.title}
                      </h4>
                      <div className="flex items-center gap-3 text-muted-foreground body-small">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {episode.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {episode.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/podcasts/densen-minute"
                className="inline-block mt-6 font-heading font-medium text-primary hover:underline"
              >
                Voir tous les épisodes →
              </Link>
            </motion.div>

            {/* Paren'TIPS */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl shadow-card"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-cafee-mint rounded-xl flex items-center justify-center">
                  <span className="font-serif text-2xl font-bold text-white">PT</span>
                </div>
                <div>
                  <h2 className="heading-card text-foreground">Paren'TIPS</h2>
                  <p className="body-small text-muted-foreground">Conseils psychopédagogiques</p>
                </div>
              </div>

              <div className="space-y-4">
                {parenTipsEpisodes.map((episode) => (
                  <div
                    key={episode.id}
                    className="flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors cursor-pointer"
                  >
                    <button className="w-10 h-10 bg-cafee-mint rounded-full flex items-center justify-center shrink-0">
                      <Play size={16} className="text-white ml-0.5" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-semibold text-foreground truncate">
                        {episode.title}
                      </h4>
                      <div className="flex items-center gap-3 text-muted-foreground body-small">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {episode.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/podcasts/paren-tips"
                className="inline-block mt-6 font-heading font-medium text-cafee-mint hover:underline"
              >
                Voir tous les épisodes →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Podcasts;
