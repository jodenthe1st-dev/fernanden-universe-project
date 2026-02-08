import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, ShoppingBag, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const denseBlogPosts = [
  {
    id: "dense-1",
    title: "L'art de la mode africaine contemporaine",
    excerpt: "Comment le savoir-faire traditionnel rencontre l'innovation dans les créations DENSE. Un voyage au cœur de l'identité africaine revisitée.",
    author: "Sophie fernanden",
    date: "2024-01-25",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=600&auto=format&fit=crop",
    tags: ["Fashion", "Afrique", "Création"],
    featured: true
  },
  {
    id: "dense-2",
    title: "Collection Printemps-Été 2024",
    excerpt: "Découvrez la nouvelle collection DENSE inspirée par les couleurs vibrantes de l'Afrique. Des pièces uniques qui racontent une histoire.",
    author: "Sophie fernanden",
    date: "2024-01-18",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
    tags: ["Collection", "Mode", "DENSE"],
    featured: false
  },
  {
    id: "dense-3",
    title: "Le Kente : tissu royal et moderne",
    excerpt: "Histoire et signification du Kente, devenu un symbole de l'identité africaine dans la mode contemporaine.",
    author: "Sophie fernanden",
    date: "2024-01-12",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    tags: ["Kente", "Tradition", "Culture"],
    featured: false
  },
  {
    id: "dense-4",
    title: "Fashion Week : DENSE sur le podium",
    excerpt: "Notre participation à la dernière Fashion Week de Paris. Retour sur un événement qui a marqué l'industrie de la mode.",
    author: "Sophie fernanden",
    date: "2024-01-08",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop",
    tags: ["Fashion Week", "Podium", "Événement"],
    featured: false
  }
];

const BlogDENSE = () => {
  const FeaturedPosts = denseBlogPosts.filter(post => post.featured);
  const regularPosts = denseBlogPosts.filter(post => !post.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-densen-gold/5 to-primary/5">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-densen-gold/20 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-densen-gold" />
              </div>
              <div className="text-left">
                <h1 className="heading-hero text-foreground mb-2">
                  Blog <span className="text-densen-gold">DENSE</span>
                </h1>
                <p className="text-lg text-muted-foreground font-medium">
                  Fashion Design & African Heritage
                </p>
              </div>
            </div>
            <p className="body-large text-muted-foreground">
              Mode, tendances et célébration de l'héritage africain à travers des créations uniques
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {FeaturedPosts.length > 0 && (
        <section className="py-16">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="heading-section text-foreground mb-2">
                Articles <span className="text-densen-gold">DENSE</span> en vedette
              </h2>
              <p className="body-regular text-muted-foreground">
                Notre sélection des meilleurs contenus mode et tendances
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-1 gap-8">
              {FeaturedPosts.map((post, index) => (
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
                            <Badge className="bg-densen-gold/20 text-densen-gold border-densen-gold/30 backdrop-blur-sm">
                              DENSE
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
                        
                        <h3 className="font-heading text-2xl font-semibold text-foreground mb-4 group-hover:text-densen-gold transition-colors">
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
                            className="rounded-full bg-densen-gold hover:bg-densen-gold/90"
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
              Plus d'articles <span className="text-densen-gold">DENSE</span>
            </h2>
            <p className="body-regular text-muted-foreground">
              Explorez tous nos contenus sur la mode africaine contemporaine
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
                      <Badge className="bg-background/80 text-densen-gold border-densen-gold/30 backdrop-blur-sm">
                        DENSE
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
                    
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-densen-gold transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-densen-gold/10 text-densen-gold border-densen-gold/20">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-densen-gold hover:text-densen-gold/90 p-0"
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

export default BlogDENSE;
