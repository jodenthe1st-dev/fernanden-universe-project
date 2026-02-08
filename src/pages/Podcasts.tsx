import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Clock, MapPin, Headphones, Pause, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import logger from '@/lib/logger';
import { AnimatedLetters } from "@/components/animations/AnimatedLetters";
import { GradientBlob } from "@/components/animations/GradientBlob";
import { cn } from "@/lib/utils";
import { PodcastsService, Podcast } from "@/integrations/supabase/services/podcasts";

const Podcasts = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        const data = await PodcastsService.getActivePodcasts();
        setPodcasts(data);
      } catch (error) {
        logger.error('Error loading podcasts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPodcasts();
  }, []);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  // Filter podcasts by series (using tags)
  const denseMinuteEpisodes = podcasts.filter(p => 
    p.tags.includes('dense-minute')
  ).slice(0, 4);

  const parenTipsEpisodes = podcasts.filter(p => 
    p.tags.includes('paren-tips')
  ).slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <GradientBlob 
          className="-top-40 left-1/3" 
          color1="hsl(var(--primary) / 0.15)"
          color2="hsl(var(--cafee-mint) / 0.1)"
          size="500px"
        />

        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Headphones size={18} className="text-primary" />
              </motion.div>
              <span className="font-heading text-sm font-medium text-primary">fernanden Podcasts</span>
            </motion.div>
            
            <h1 className="heading-hero text-foreground mb-4">
              <AnimatedLetters text="Nos Podcasts" type="wave" />
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="body-large text-muted-foreground max-w-xl mx-auto"
            >
              Style, éducation et inspiration — découvrez nos séries audio
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Podcast Series */}
      <section className="pb-16">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* DENSE Minute */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl overflow-hidden border border-border/50"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                    whileHover={{ rotate: 10 }}
                  >
                    <span className="font-serif text-2xl font-bold">DM</span>
                  </motion.div>
                  <div>
                    <h2 className="heading-card text-white">DENSE Minute</h2>
                    <p className="text-white/80 text-sm">60 secondes d'inspiration style</p>
                  </div>
                </div>
              </div>

              {/* Episodes */}
              <div className="p-5 space-y-3">
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Chargement des épisodes...
                  </div>
                ) : denseMinuteEpisodes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucun épisode disponible pour le moment
                  </div>
                ) : (
                  denseMinuteEpisodes.map((episode, index) => (
                    <motion.div
                      key={episode.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer group",
                        playingId === `dm-${episode.id}` 
                          ? "bg-primary/10 border border-primary/30" 
                          : "bg-muted hover:bg-muted/80"
                      )}
                      onClick={() => togglePlay(`dm-${episode.id}`)}
                    >
                      <motion.button 
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors",
                          playingId === `dm-${episode.id}` ? "bg-primary" : "bg-primary/80 group-hover:bg-primary"
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {playingId === `dm-${episode.id}` ? (
                          <Pause size={18} className="text-white" />
                        ) : (
                          <Play size={18} className="text-white ml-0.5" />
                        )}
                      </motion.button>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-semibold text-foreground truncate">
                          {episode.title}
                        </h4>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1">
                          {episode.guest_name && (
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {episode.guest_name}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {episode.duration}
                          </span>
                        </div>
                      </div>

                      {playingId === `dm-${episode.id}` && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-1"
                        >
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-primary rounded-full"
                              animate={{ 
                                height: [8, 20, 8],
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 0.8,
                                delay: i * 0.1 
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))
                )}

                <Link
                  to="/podcasts/dense-minute"
                  className="inline-flex items-center gap-2 mt-4 font-heading font-medium text-primary hover:underline"
                >
                  Voir tous les épisodes →
                </Link>
              </div>
            </motion.div>

            {/* Paren'TIPS */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl overflow-hidden border border-border/50"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-cafee-mint to-cafee-mint/80 p-6 text-white">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                    whileHover={{ rotate: -10 }}
                  >
                    <span className="font-serif text-2xl font-bold">PT</span>
                  </motion.div>
                  <div>
                    <h2 className="heading-card text-white">Paren'TIPS</h2>
                    <p className="text-white/80 text-sm">Conseils psychopédagogiques</p>
                  </div>
                </div>
              </div>

              {/* Episodes */}
              <div className="p-5 space-y-3">
                {parenTipsEpisodes.map((episode, index) => (
                  <motion.div
                    key={episode.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer group",
                      playingId === `pt-${episode.id}` 
                        ? "bg-cafee-mint/10 border border-cafee-mint/30" 
                        : "bg-muted hover:bg-muted/80"
                    )}
                    onClick={() => togglePlay(`pt-${episode.id}`)}
                  >
                    <motion.button 
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors",
                        playingId === `pt-${episode.id}` ? "bg-cafee-mint" : "bg-cafee-mint/80 group-hover:bg-cafee-mint"
                      )}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {playingId === `pt-${episode.id}` ? (
                        <Pause size={18} className="text-white" />
                      ) : (
                        <Play size={18} className="text-white ml-0.5" />
                      )}
                    </motion.button>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-semibold text-foreground truncate">
                        {episode.title}
                      </h4>
                      <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {episode.duration}
                        </span>
                      </div>
                    </div>

                    {playingId === `pt-${episode.id}` && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1"
                      >
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-cafee-mint rounded-full"
                            animate={{ 
                              height: [8, 20, 8],
                            }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 0.8,
                              delay: i * 0.1 
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                <Link
                  to="/podcasts/paren-tips"
                  className="inline-flex items-center gap-2 mt-4 font-heading font-medium text-cafee-mint hover:underline"
                >
                  Voir tous les épisodes →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="pb-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-deep-black text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            <GradientBlob 
              className="top-0 left-0" 
              color1="hsl(var(--primary) / 0.2)"
              size="200px"
            />
            
            <div className="relative z-10 text-center md:text-left">
              <h3 className="heading-subsection mb-2">Ne manquez aucun épisode</h3>
              <p className="text-white/70">Découvrez tous nos podcasts et restez informé</p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Podcasts;
