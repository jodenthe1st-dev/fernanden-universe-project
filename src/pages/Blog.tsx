import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, Clock, User, ArrowRight, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BlogPostsService, BlogPost } from "@/integrations/supabase/services/blogPosts";
import { NewsletterSubscriptionsService } from "@/integrations/supabase/services/newsletterSubscriptions";
import { toast } from "sonner";
import logger from "@/lib/logger";

const categoryColors: Record<string, string> = {
  SHE: "bg-she-saffron/20 text-she-saffron border-she-saffron/30",
  DENSE: "bg-densen-gold/20 text-densen-gold border-densen-gold/30",
  CaFEE: "bg-cafee-mint/20 text-cafee-mint border-cafee-mint/30"
};

const categories = [
  { name: "Tous", href: "/blog", color: "bg-muted" },
  { name: "SHE", href: "/blog/she", color: "bg-she-saffron/10 text-she-saffron border-she-saffron/20" },
  { name: "DENSE", href: "/blog/dense", color: "bg-densen-gold/10 text-densen-gold border-densen-gold/20" },
  { name: "CaFEE", href: "/blog/cafee", color: "bg-cafee-mint/10 text-cafee-mint border-cafee-mint/20" }
];

const Blog = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Determine current category from URL
  const categoryPath = location.pathname.split("/")[2];
  const currentCategory = categoryPath ? (categoryPath === "dense" ? "DENSE" : categoryPath.toUpperCase()) : "Tous";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        let data: BlogPost[] = [];
        if (currentCategory === "Tous") {
          data = await BlogPostsService.getPublished();
        } else {
          data = await BlogPostsService.getByCategory(currentCategory.toLowerCase());
        }
        setPosts(data);
      } catch (error) {
        logger.error('Error fetching blog posts:', error);
        toast.error("Erreur lors du chargement des articles. Veuillez réessayer plus tard.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentCategory]);

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      toast.error("Veuillez entrer une adresse email valide");
      return;
    }

    try {
      setIsSubscribing(true);
      await NewsletterSubscriptionsService.subscribe(email, undefined, 'blog_page');
      toast.success("Merci ! Votre inscription a été enregistrée. Vérifiez votre boîte mail.");
      setEmail("");
    } catch (error) {
      logger.error('Newsletter subscription error:', error);
      toast.error("Une erreur est survenue lors de l'inscription");
    } finally {
      setIsSubscribing(false);
    }
  };

  // Filter posts based on search term locally for responsiveness
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    return matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="heading-hero text-foreground mb-4">
              Blog <span className="text-primary">fernanden</span>
            </h1>
            <p className="body-large text-muted-foreground mb-8">
              Découvrez nos articles, tutoriels et inspirations à travers nos trois univers créatifs
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-full border-border/50 bg-background/50 backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border/30">
        <div className="container-main">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 justify-center px-2 sm:px-4 md:px-0 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className={cn(
                  "px-2.5 sm:px-3 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-full font-heading font-medium text-[11px] sm:text-xs md:text-sm transition-all duration-300 border whitespace-nowrap",
                  currentCategory.toLowerCase() === category.name.toLowerCase() || (currentCategory === "Tous" && category.name === "Tous")
                    ? category.color + " border-current"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      ) : (
        <>
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
                    Articles <span className="text-primary">en vedette</span>
                  </h2>
                  <p className="body-regular text-muted-foreground">
                    Notre sélection des meilleurs contenus
                  </p>
                </motion.div>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {featuredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-border/50">
                        <div className="relative h-40 md:h-48 overflow-hidden">
                          <img
                            src={post.featured_image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <Badge className={categoryColors[post.category?.toUpperCase() || ""] || "bg-primary/20 text-primary border-primary/30"}>
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4 md:p-6">
                          <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
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
                          <h3 className="font-heading font-semibold text-lg md:text-xl text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3 md:mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <User size={14} className="text-muted-foreground" />
                              <span className="text-xs md:text-sm text-muted-foreground">fernanden Team</span>
                            </div>
                            <Link to={`/blog/${post.slug || post.id}`}>
                              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 px-2 md:px-3">
                                <span className="text-xs md:text-sm">Lire la suite</span>
                                <ArrowRight size={14} className="ml-1 md:ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
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
                  Tous les <span className="text-primary">articles</span>
                </h2>
                <p className="body-regular text-muted-foreground">
                  Explorez l'ensemble de notre contenu
                </p>
              </motion.div>

              {regularPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                            <Badge className={categoryColors[post.category?.toUpperCase() || ""] || "bg-primary/20 text-primary border-primary/30"}>
                              {post.category}
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
                          <h3 className="font-heading font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">fernanden Team</span>
                            </div>
                            <Link to={`/blog/${post.slug || post.id}`}>
                              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                                Lire la suite
                                <ArrowRight size={16} className="ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg italic">Aucun article trouvé.</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* Newsletter Section */}
      <section className="py-16 bg-primary/5">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="heading-section text-foreground mb-4">
              Restez <span className="text-primary">connecté</span>
            </h2>
            <p className="body-regular text-muted-foreground mb-8">
              Recevez nos derniers articles et actualités directement dans votre boîte mail
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Votre email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 rounded-full border-border/50"
                disabled={isSubscribing}
              />
              <Button
                onClick={handleSubscribe}
                disabled={isSubscribing}
                className="h-12 rounded-full bg-primary hover:bg-primary/90 px-8"
              >
                {isSubscribing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "S'abonner"
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
