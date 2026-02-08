import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Newspaper, TrendingUp, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const actualitesPosts = [
  {
    id: "actu-1",
    title: "Nouvelle collection DENSE Printemps 2024",
    excerpt: "Découvrez notre nouvelle collection inspirée par les motifs traditionnels africains revisités avec une touche contemporaine.",
    author: "Équipe DENSE",
    date: "2024-01-30",
    readTime: "3 min",
    category: "DENSE",
    type: "nouvelle-collection",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=600&auto=format&fit=crop",
    urgent: true,
    link: "/dense/collections/les-drapés"
  },
  {
    id: "actu-2",
    title: "Ateliers de design d'intérieur chez SHE",
    excerpt: "Inscrivez-vous à nos nouveaux ateliers mensuels pour apprendre les bases du design d'intérieur.",
    author: "Équipe SHE",
    date: "2024-01-28",
    readTime: "2 min",
    category: "SHE",
    type: "ateliers",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
    urgent: false,
    link: "/she"
  },
  {
    id: "actu-3",
    title: "Nouveaux services d'orientation chez CaFEE",
    excerpt: "Lancement de notre programme d'orientation personnalisé pour les lycéens et étudiants.",
    author: "Équipe CaFEE",
    date: "2024-01-25",
    readTime: "4 min",
    category: "CaFEE",
    type: "nouveaux-services",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop",
    urgent: true,
    link: "/cafee"
  },
  {
    id: "actu-4",
    title: "Participation à la Fashion Week de Paris",
    excerpt: "DENSE défile sur le podium parisien avec une collection hommage à l'artisanat africain.",
    author: "Équipe DENSE",
    date: "2024-01-20",
    readTime: "3 min",
    category: "DENSE",
    type: "evenement",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop",
    urgent: false,
    link: "/dense"
  },
  {
    id: "actu-5",
    title: "Podcast Paren'TIPS : Episode 5 disponible",
    excerpt: "Le dernier épisode de notre podcast dédié aux parents est maintenant en ligne.",
    author: "Équipe CaFEE",
    date: "2024-01-18",
    readTime: "2 min",
    category: "CaFEE",
    type: "podcast",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=600&auto=format&fit=crop",
    urgent: false,
    link: "/podcasts"
  },
  {
    id: "actu-6",
    title: "Ouverture de notre showroom à Paris",
    excerpt: "SHE ouvre son premier showroom physique au cœur de la capitale française.",
    author: "Équipe SHE",
    date: "2024-01-15",
    readTime: "3 min",
    category: "SHE",
    type: "ouverture",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
    urgent: false,
    link: "/she"
  }
];

const categoryColors = {
  SHE: "bg-she-saffron/20 text-she-saffron border-she-saffron/30",
  DENSE: "bg-densen-gold/20 text-densen-gold border-densen-gold/30", 
  CaFEE: "bg-cafee-mint/20 text-cafee-mint border-cafee-mint/30"
};

const Actualites = () => {
  const urgentPosts = actualitesPosts.filter(post => post.urgent);
  const regularPosts = actualitesPosts.filter(post => !post.urgent);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-terracotta/5 to-primary/5">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-terracotta/20 rounded-2xl flex items-center justify-center">
                <Newspaper className="w-8 h-8 text-terracotta" />
              </div>
              <div className="text-left">
                <h1 className="heading-hero text-foreground mb-2">
                  Actualités <span className="text-terracotta">fernanden</span>
                </h1>
                <p className="text-lg text-muted-foreground font-medium">
                  Nouvelles et mises à jour
                </p>
              </div>
            </div>
            <p className="body-large text-muted-foreground">
              Restez informé de toutes nos actualités à travers nos trois univers créatifs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Urgent News */}
      {urgentPosts.length > 0 && (
        <section className="py-16">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-6 h-6 text-red-600 animate-pulse" />
                <h2 className="heading-section text-foreground">
                  Dernières <span className="text-red-600">actualités urgentes</span>
                </h2>
              </div>
              <p className="body-regular text-muted-foreground">
                Ne manquez pas nos dernières nouvelles importantes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {urgentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-terracotta/50 bg-terracotta/30">
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-1.5 sm:top-2 md:top-4 left-1.5 sm:left-2 md:left-4 flex gap-1 sm:gap-1.5 md:gap-2">
                        <Badge className="bg-terracotta text-white border-terracotta text-[10px] sm:text-xs">
                          Urgent
                        </Badge>
                        <Badge className={categoryColors[post.category as keyof typeof categoryColors]}>
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-3 md:mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{post.author}</span>
                        </div>
                        
                        <Button
                          asChild
                          size="sm"
                          className="rounded-full bg-terracotta hover:bg-terracotta/90"
                        >
                          <Link to={post.link} className="flex items-center gap-1">
                            En savoir plus
                            <ArrowRight size={16} />
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
      )}

      {/* Regular News */}
      <section className="py-16 bg-muted/20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="heading-section text-foreground mb-2">
              Toutes les <span className="text-primary">actualités</span>
            </h2>
            <p className="body-regular text-muted-foreground">
              Explorez toutes nos nouvelles et mises à jour
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-500 border-border/50 h-full">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-full md:object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-2 md:top-4 left-2 md:left-4">
                      <Badge className={categoryColors[post.category as keyof typeof categoryColors]}>
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-heading text-base md:text-lg font-semibold text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{post.author}</span>
                      </div>
                      
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80 p-0"
                      >
                        <Link to={post.link} className="flex items-center gap-1">
                          <ArrowRight size={16} />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full">
              Charger plus d'actualités
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary/5">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-terracotta/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Bell className="w-8 h-8 text-terracotta" />
            </div>
            <h2 className="heading-section text-foreground mb-4">
              Restez <span className="text-terracotta">informé</span>
            </h2>
            <p className="body-regular text-muted-foreground mb-8">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités directement dans votre boîte mail
            </p>
            <Button size="lg" className="rounded-full bg-terracotta hover:bg-terracotta/90">
              S'inscrire à la newsletter
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Actualites;
