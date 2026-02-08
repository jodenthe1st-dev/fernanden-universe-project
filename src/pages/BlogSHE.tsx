import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Home, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sheBlogPosts = [
  {
    id: "she-1",
    title: "Les tendances design d'intérieur 2024",
    excerpt: "Découvrez les nouvelles tendances qui transforment nos espaces de vie avec style et fonctionnalité. Du minimalisme scandinave au maximalisme audacieux.",
    author: "Marie fernanden",
    date: "2024-01-28",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
    tags: ["Design", "Tendances", "Intérieur"],
    featured: true
  },
  {
    id: "she-2",
    title: "Organiser un événement mémorable",
    excerpt: "Les clés pour réussir votre événement du concept à la réalisation. Planning, décoration, logistique : notre guide complet.",
    author: "Marie fernanden",
    date: "2024-01-20",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
    tags: ["Événement", "Organisation", "SHE"],
    featured: false
  },
  {
    id: "she-3",
    title: "L'art de l'aménagement d'espace",
    excerpt: "Comment optimiser chaque mètre carré avec intelligence et esthétique. Solutions pour petits et grands espaces.",
    author: "Marie fernanden",
    date: "2024-01-15",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
    tags: ["Aménagement", "Espace", "Optimisation"],
    featured: false
  },
  {
    id: "she-4",
    title: "Palette de couleurs : créer l'ambiance",
    excerpt: "Le pouvoir des couleurs dans l'aménagement intérieur. Comment choisir et associer les teintes pour un résultat harmonieux.",
    author: "Marie fernanden",
    date: "2024-01-10",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1618221195710-6a141b3e0c5b?q=80&w=600&auto=format&fit=crop",
    tags: ["Couleurs", "Ambiance", "Décoration"],
    featured: false
  }
];

const BlogSHE = () => {
  const featuredPosts = sheBlogPosts.filter(post => post.featured);
  const regularPosts = sheBlogPosts.filter(post => !post.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-she-saffron/5 to-primary/5">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-she-saffron/20 rounded-2xl flex items-center justify-center">
                <Home className="w-8 h-8 text-she-saffron" />
              </div>
              <div className="text-left">
                <h1 className="heading-hero text-foreground mb-2">
                  Blog <span className="text-she-saffron">SHE</span>
                </h1>
                <p className="text-lg text-muted-foreground font-medium">
                  Spaces & Events Design
                </p>
              </div>
            </div>
            <p className="body-large text-muted-foreground">
              Design d'intérieur, organisation d'événements et création d'espaces qui vous ressemblent
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="heading-section text-foreground mb-2">
                Articles <span className="text-she-saffron">SHE</span> en vedette
              </h2>
              <p className="body-regular text-muted-foreground">
                Notre sélection des meilleurs contenus design et événementiel
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-1 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-border/50">
                    <div className="lg:flex">
                      <div className="lg:w-1/2">
                        <div className="relative aspect-[16/10] lg:aspect-square overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-she-saffron/20 text-she-saffron border-she-saffron/30 backdrop-blur-sm">
                              SHE
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <h3 className="font-heading text-2xl font-semibold text-foreground mb-4 group-hover:text-she-saffron transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{post.author}</span>
                          </div>
                          
                          <Button
                            asChild
                            size="lg"
                            className="rounded-full bg-she-saffron hover:bg-she-saffron/90"
                          >
                            <Link to={`/blog/${post.id}`} className="flex items-center gap-2">
                              Lire l'article
                              <ArrowRight size={18} />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      <section className="py-16 bg-muted/20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="heading-section text-foreground mb-2">
              Plus d'articles <span className="text-she-saffron">SHE</span>
            </h2>
            <p className="body-regular text-muted-foreground">
              Explorez tous nos contenus sur le design d'intérieur et les événements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-500 border-border/50 h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-background/80 text-she-saffron border-she-saffron/30 backdrop-blur-sm">
                        SHE
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-she-saffron transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-she-saffron/10 text-she-saffron border-she-saffron/20">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-she-saffron hover:text-she-saffron/90 p-0"
                      >
                        <Link to={`/blog/${post.id}`} className="flex items-center gap-1">
                          Lire la suite
                          <ArrowRight size={16} />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Back to Blog */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full">
              <Link to="/blog" className="flex items-center gap-2">
                Voir tous les articles du blog
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogSHE;
