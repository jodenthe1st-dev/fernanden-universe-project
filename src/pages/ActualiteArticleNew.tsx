import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Heart, Bell, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Actualités data (same as in Actualites.tsx)
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
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=1200&auto=format&fit=crop",
    urgent: true,
    link: "/dense/collections/les-drapés",
    content: `
# Nouvelle collection DENSE Printemps 2024

Nous sommes ravis de vous présenter notre nouvelle collection Printemps 2024, une célébration vibrantede l'artisanat africain revisité avec une sensibilité contemporaine.

## L'inspiration derrière la collection

Cette collection puise son inspiration dans les riches traditions textiles de l'Afrique de l'Ouest. Les motifs bogolan du Mali, les wax du Ghana, et les broderies traditionnelles du Bénin ont été réinterprétés avec une approche moderne.

## Les pièces phares

La collection met en avant des pièces polyvalentes qui s'adaptent à toutes les occasions :

- **Robes fluides** : Coupes modernes avec des motifs traditionnels
- **Ensembles structurés** : Élégance et confort pour le bureau
- **Accessoires uniques** : Sacs et bijoux artisanaux

## L'engagement durable

Comme toujours, nous privilégions les matériaux durables et les circuits courts. Chaque pièce est créée avec soin par nos artisans partenaires.

## Disponibilité

La collection sera disponible à partir du 15 février dans notre boutique en ligne et dans nos showrooms partenaires.

Ne manquez pas notre événement de lancement le 17 février à Paris !
    `
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
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    urgent: false,
    link: "/she",
    content: `
# Ateliers de design d'intérieur chez SHE

SHE lance une nouvelle série d'ateliers mensuels pour partager notre passion du design d'intérieur avec tous ceux qui souhaitent transformer leur espace de vie.

## Le programme des ateliers

Nos ateliers couvrent tous les aspects du design d'intérieur :

### Atelier Découverte (2h)
- Introduction aux principes du design
- Analyse de votre espace personnel
- Conseils pratiques pour débuter

### Atelier Thématique (4h)
- Couleurs et matériaux
- Éclairage et ambiance
- Organisation et rangement

### Atelier Projet (journée complète)
- Création d'un mood board
- Planification d'un espace
- Suivi personnalisé

## Les prochaines dates

- **Samedi 17 février** : Atelier Découverte
- **Samedi 16 mars** : Couleurs et matériaux
- **Samedi 20 avril** : Organisation et rangement

## Tarifs

- Atelier Découverte : 45€
- Atelier Thématique : 85€
- Atelier Projet : 150€

Les places sont limitées à 8 participants par atelier pour garantir un accompagnement personnalisé.

## Réservation

Réservez votre place directement sur notre site ou contactez-nous pour plus d'informations.
    `
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
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    urgent: true,
    link: "/cafee",
    content: `
# Nouveaux services d'orientation chez CaFEE

CaFEE est fier d'annoncer le lancement de son nouveau programme d'orientation scolaire et professionnel, conçu pour accompagner les jeunes dans leurs choix d'avenir avec sérénité et confiance.

## Notre approche innovante

Nous avons développé une méthode qui met l'élève au centre du processus d'orientation :

### Bilan personnel complet
- Tests de personnalité et d'intérêts
- Identification des talents et compétences
- Analyse des valeurs et motivations

### Exploration des métiers
- Découverte des secteurs porteurs
- Rencontres avec des professionnels
- Visites d'entreprises et d'écoles

### Accompagnement personnalisé
- Entretiens individuels réguliers
- Soutien parental
- Aide à la constitution des dossiers

## Les formules proposées

### Formule Découverte (3 séances)
- Bilan personnel initial
- Exploration des pistes d'orientation
- Plan d'action personnalisé

### Formule Accompagnement (8 séances)
- Bilan approfondi
- Exploration détaillée des métiers
- Préparation aux entretiens
- Soutien dans les démarches

### Formule Premium (12 séances + illimité)
- Accompagnement complet
- Soutien tout au long de l'année
- Accès à notre réseau de partenaires
- Suivi post-orientation

## Nos résultats

L'année dernière, 92% de nos accompagnés ont trouvé leur voie et sont satisfaits de leur orientation.

## Pour commencer

Contactez-nous pour un premier entretien gratuit et sans engagement.
    `
  }
];

const categoryColors = {
  SHE: "bg-she-saffron/20 text-she-saffron border-she-saffron/30",
  DENSE: "bg-primary/20 text-primary border-primary/30",
  CaFEE: "bg-cafee-mint/20 text-cafee-mint border-cafee-mint/30"
};

const ActualiteArticle = () => {
  const { id } = useParams();
  const article = actualitesPosts.find(post => post.id === id);

  if (!article) {
    return (
      <Layout>
        <div className="container-main py-16 text-center">
          <h1 className="heading-hero mb-4">Actualité non trouvée</h1>
          <p className="body-large text-muted-foreground mb-8">
            L'actualité que vous recherchez n'existe pas.
          </p>
          <Link to="/actualites">
            <Button className="rounded-full">
              Retour aux actualités
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-28 pb-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              to="/actualites"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Retour aux actualités
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-8">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  {article.urgent && (
                    <Badge className="bg-red-600 text-white border-red-600 animate-pulse">
                      <Bell size={12} className="mr-1" />
                      Urgent
                    </Badge>
                  )}
                  <Badge className={categoryColors[article.category as keyof typeof categoryColors]}>
                    {article.category}
                  </Badge>
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h1 className="heading-hero text-foreground mb-4">
                  {article.title}
                </h1>
                
                <div className="flex items-center justify-center gap-6 text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-muted/20">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <div 
                className="bg-card rounded-3xl p-8 md:p-12 border border-border/50"
                dangerouslySetInnerHTML={{ 
                  __html: article.content.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, (match) => {
                    const level = match.trim().length;
                    return `<h${level} class="heading-${level === 1 ? 'hero' : level === 2 ? 'section' : 'card'} text-foreground mb-6">${match.replace(/#{1,6}\s/, '')}</h${level}>`;
                  })
                }} 
              />
            </motion.div>
            
            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center mt-8"
            >
              <Link to={article.link}>
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90">
                  En savoir plus
                  <ArrowLeft size={16} className="ml-2 rotate-180" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related News */}
      <section className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="heading-section text-foreground mb-4">
              Autres <span className="text-primary">actualités</span>
            </h2>
            <p className="body-regular text-muted-foreground">
              Découvrez nos autres nouvelles et mises à jour
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {actualitesPosts
              .filter(post => post.id !== article.id)
              .slice(0, 3)
              .map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/actualites/${post.id}`}>
                    <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-500 group">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          {post.urgent && (
                            <Badge className="bg-red-600 text-white border-red-600">
                              <Bell size={10} className="mr-1" />
                              Urgent
                            </Badge>
                          )}
                          <Badge className={categoryColors[post.category as keyof typeof categoryColors]}>
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ActualiteArticle;
