import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, GraduationCap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeaturedPostCard } from "@/components/blog/FeaturedPostCard";

const cafeeBlogPosts = [
  {
    id: "cafee-1",
    title: "Méthodes pédagogiques innovantes",
    excerpt: "Comment la ludopédagogie transforme l'apprentissage chez les enfants et adolescents. Des approches qui rendent l'éducation joyeuse et efficace.",
    author: "Dr. Claire fernanden",
    date: "2024-01-22",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop",
    tags: ["Éducation", "Pédagogie", "Innovation"],
    featured: true
  },
  {
    id: "cafee-2",
    title: "L'orientation scolaire sans stress",
    excerpt: "Accompagner les jeunes dans leurs choix d'orientation avec confiance et sérénité. Méthodologie et conseils pratiques.",
    author: "Dr. Claire fernanden",
    date: "2024-01-15",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
    tags: ["Orientation", "Éducation", "CaFEE"],
    featured: false
  },
  {
    id: "cafee-3",
    title: "Les troubles de l'apprentissage",
    excerpt: "Comprendre et accompagner les enfants atteints de troubles dyslexiques, dyspraxiques et autres difficultés d'apprentissage.",
    author: "Dr. Claire fernanden",
    date: "2024-01-10",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    tags: ["Troubles", "Apprentissage", "Accompagnement"],
    featured: false
  },
  {
    id: "cafee-4",
    title: "Paren'TIPS : Episode 1 - L'art de poser des questions",
    excerpt: "Découvrez notre premier podcast dédié aux parents. Comment communiquer efficacement avec vos enfants à travers le questionnement.",
    author: "Dr. Claire fernanden",
    date: "2024-01-05",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=600&auto=format&fit=crop",
    tags: ["Podcast", "Parents", "Communication"],
    featured: false
  }
];

const BlogCaFEE = () => {
  const featuredPosts = cafeeBlogPosts.filter(post => post.featured);
  const regularPosts = cafeeBlogPosts.filter(post => !post.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-cafee-mint/5 to-primary/5">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-cafee-mint/20 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-cafee-mint" />
              </div>
              <div className="text-left">
                <h1 className="heading-hero text-foreground mb-2">
                  Blog <span className="text-cafee-mint">CaFEE</span>
                </h1>
                <p className="text-lg text-muted-foreground font-medium">
                  Éducation & Pédagogie
                </p>
              </div>
            </div>
            <p className="body-large text-muted-foreground">
              Accompagnement psychopédagogique, orientation et développement pour un épanouissement harmonieux
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
                Articles <span className="text-cafee-mint">CaFEE</span> en vedette
              </h2>
              <p className="body-regular text-muted-foreground">
                Notre sélection des meilleurs contenus éducatifs et pédagogiques
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-1 gap-8">
              {featuredPosts.map((post, index) => (
                <FeaturedPostCard key={post.id} post={post} index={index} />
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
              Plus d'articles <span className="text-cafee-mint">CaFEE</span>
            </h2>
            <p className="body-regular text-muted-foreground">
              Explorez tous nos contenus sur l'éducation et la pédagogie
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
                      <Badge className="bg-background/80 text-cafee-mint border-cafee-mint/30 backdrop-blur-sm">
                        CaFEE
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
                    
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-cafee-mint transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-cafee-mint/10 text-cafee-mint border-cafee-mint/20">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-cafee-mint hover:text-cafee-mint/90 p-0"
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

export default BlogCaFEE;
