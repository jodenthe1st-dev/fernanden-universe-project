import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { BlogPostsService, BlogPost } from "@/integrations/supabase/services/blogPosts";
import logger from "@/lib/logger";

const BlogDENSE = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        // Try both 'dense' and 'densen' to be safe, or just 'dense' if that's the standard
        const allPosts = await BlogPostsService.getByCategory('dense');
        setPosts(allPosts);
      } catch (error) {
        logger.error('Error fetching DENSE blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 animate-spin text-densen-gold" />
        </div>
      </Layout>
    );
  }

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
                Articles <span className="text-densen-gold">DENSE</span> en vedette
              </h2>
              <p className="body-regular text-muted-foreground">
                Notre sélection des meilleurs contenus mode et tendances
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
                            src={post.featured_image || "/placeholder.svg"}
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
                            <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('fr-FR') : 'Date inconnue'}</span>
                          </div>
                          {post.reading_time && (
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{post.reading_time} min</span>
                            </div>
                          )}
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
                            <span className="text-sm text-muted-foreground">Sophie fernanden</span>
                          </div>

                          <Button
                            asChild
                            size="lg"
                            className="rounded-full bg-densen-gold hover:bg-densen-gold/90"
                          >
                            <Link to={`/blog/${post.slug || post.id}`} className="flex items-center gap-2">
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

          {regularPosts.length > 0 ? (
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
                        src={post.featured_image || "/placeholder.svg"}
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
                          <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('fr-FR') : 'Date inconnue'}</span>
                        </div>
                        {post.reading_time && (
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{post.reading_time} min</span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-densen-gold transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {post.tags?.slice(0, 2).map((tag) => (
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
                          <Link to={`/blog/${post.slug || post.id}`} className="flex items-center gap-1">
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
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Aucun article supplémentaire pour le moment.</p>
            </div>
          )}

          {/* Back to Blog */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full" asChild>
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
