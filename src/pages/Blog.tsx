import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data - replace with real blog posts
const blogPosts = [
  {
    id: 1,
    title: "Les tendances design d'intérieur 2024",
    excerpt: "Découvrez les nouvelles tendances qui transforment nos espaces de vie avec style et fonctionnalité.",
    author: "Marie fernanden",
    date: "2024-01-28",
    readTime: "5 min",
    category: "SHE",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
    tags: ["Design", "Tendances", "Intérieur"],
    featured: true
  },
  {
    id: 2,
    title: "L'art de la mode africaine contemporaine",
    excerpt: "Comment le savoir-faire traditionnel rencontre l'innovation dans les créations DENSE.",
    author: "Sophie fernanden",
    date: "2024-01-25",
    readTime: "7 min",
    category: "DENSE",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=600&auto=format&fit=crop",
    tags: ["Fashion", "Afrique", "Création"],
    featured: true
  },
  {
    id: 3,
    title: "Méthodes pédagogiques innovantes",
    excerpt: "Comment la ludopédagogie transforme l'apprentissage chez les enfants et adolescents.",
    author: "Dr. Claire fernanden",
    date: "2024-01-22",
    readTime: "8 min",
    category: "CaFEE",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop",
    tags: ["Éducation", "Pédagogie", "Innovation"],
    featured: false
  },
  {
    id: 4,
    title: "Organiser un événement mémorable",
    excerpt: "Les clés pour réussir votre événement du concept à la réalisation.",
    author: "Marie fernanden",
    date: "2024-01-20",
    readTime: "6 min",
    category: "SHE",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
    tags: ["Événement", "Organisation", "SHE"],
    featured: false
  },
  {
    id: 5,
    title: "Collection Printemps-Été 2024",
    excerpt: "Découvrez la nouvelle collection DENSE inspirée par les couleurs de l'Afrique.",
    author: "Sophie fernanden",
    date: "2024-01-18",
    readTime: "4 min",
    category: "DENSE",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
    tags: ["Collection", "Mode", "DENSE"],
    featured: false
  },
  {
    id: 6,
    title: "L'orientation scolaire sans stress",
    excerpt: "Accompagner les jeunes dans leurs choix d'orientation avec confiance et sérénité.",
    author: "Dr. Claire fernanden",
    date: "2024-01-15",
    readTime: "10 min",
    category: "CaFEE",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
    tags: ["Orientation", "Éducation", "CaFEE"],
    featured: false
  }
];

const categoryColors = {
  SHE: "bg-she-saffron/20 text-she-saffron border-she-saffron/30",
  DENSE: "bg-densen-gold/20 text-densen-gold border-densen-gold/30",
  CaFEE: "bg-cafee-mint/20 text-cafee-mint border-cafee-mint/30"
};

const categories = [
  { name: "Tous", href: "/blog", color: "bg-muted" },
  { name: "SHE", href: "/blog/she", color: "bg-she-saffron/10 text-she-saffron border-she-saffron/20" },
  { name: "DENSE", href: "/blog/densen", color: "bg-densen-gold/10 text-densen-gold border-densen-gold/20" },
  { name: "CaFEE", href: "/blog/cafee", color: "bg-cafee-mint/10 text-cafee-mint border-cafee-mint/20" }
];

const Blog = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  // Determine current category from URL
  const currentCategory = location.pathname.split("/")[2] || "Tous";

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = currentCategory === "Tous" || post.category.toLowerCase() === currentCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
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
                  currentCategory === category.name || (currentCategory === "" && category.name === "Tous")
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
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className={categoryColors[post.category as keyof typeof categoryColors]}>
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
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
                          <span className="text-xs md:text-sm text-muted-foreground">{post.author}</span>
                        </div>
                        <Link to={`/blog/${post.id}`}>
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
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className={categoryColors[post.category as keyof typeof categoryColors]}>
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
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
                        <span className="text-sm text-muted-foreground">{post.author}</span>
                      </div>
                      <Link to={`/blog/${post.id}`}>
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
            <h2 className="heading-section text-foreground mb-4">
              Restez <span className="text-primary">connecté</span>
            </h2>
            <p className="body-regular text-muted-foreground mb-8">
              Recevez nos derniers articles et actualités directement dans votre boîte mail
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                placeholder="Votre email..."
                className="flex-1 h-12 rounded-full border-border/50"
              />
              <Button className="h-12 rounded-full bg-primary hover:bg-primary/90 px-8">
                S'abonner
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
