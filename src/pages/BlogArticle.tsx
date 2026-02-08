import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Heart, Bookmark, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock article data - in real app, this would come from API
const articlesData: Record<string, {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  featured: boolean;
}> = {
  "1": {
    id: "1",
    title: "Les tendances design d'intérieur 2024",
    content: `
# Les tendances design d'intérieur 2024

## Introduction

L'année 2024 marque une véritable révolution dans le monde du design d'intérieur. Les tendances actuelles allient esthétique, durabilité et bien-être, créant des espaces qui reflètent véritablement notre mode de vie contemporain.

## Les grandes tendances de 2024

### 1. Le biophilic design

Le biophilic design continue de dominer les tendances. Cette approche consiste à intégrer la nature dans nos espaces intérieurs à travers :

- **Plantes vertes** : Des plantes d'intérieur variées pour purifier l'air et apporter une touche de nature
- **Matériaux naturels** : Bois, pierre, lin et coton pour une authenticité maximale
- **Lumière naturelle** : Maximiser l'entrée de lumière naturelle dans tous les espaces

### 2. Les couleurs apaisantes

Les palettes de couleurs de 2024 privilégient les tons :

- **Vert sauge** : Apaisant et élégant
- **Terracotta** : Chaleureux et authentique  
- **Bleu grisé** : Sophistiqué et intemporel
- **Beiges doux** : Chaleureux et polyvalent

### 3. Le minimalisme chaleureux

Le minimalisme évolue vers une version plus chaleureuse avec :

- **Lignes épurées** mais matériaux texturés
- **Espaces ouverts** mais cocooning
- **Fonctionnalité** sans sacrifier le confort

## Comment intégrer ces tendances

### Pour le salon

Créez un espace de vie multifonctionnel avec :
- Un canapé modulable en velours vert sauge
- Une table basse en bois massif
- Des étagères murales flottantes
- Des plantes suspendues pour la verticalité

### Pour la cuisine

Optez pour une cuisine à la fois esthétique et fonctionnelle :
- Îlot central avec rangements intégrés
- Plans de travail en quartz ou pierre naturelle
- Électroménager encastré pour un look épuré
- Bon éclairage avec suspensions design

### Pour la chambre

Faites de votre chambre un sanctuaire de paix :
- Couleurs douces et apaisantes
- Literie de qualité en matières naturelles
- Rideaux occultants pour un sommeil optimal
- Éclairage tamisé et varié

## Conclusion

Les tendances 2024 du design d'intérieur nous invitent à créer des espaces qui nous ressemblent vraiment. L'important est de trouver l'équilibre parfait entre esthétique, confort et fonctionnalité.

N'hésitez pas à faire appel à des professionnels comme SHE by fernanden pour vous accompagner dans votre projet de rénovation ou d'aménagement.
    `,
    author: "Marie fernanden",
    date: "2024-01-28",
    readTime: "5 min",
    category: "SHE",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    tags: ["Design", "Tendances", "Intérieur", "2024"],
    featured: true
  },
  "she-1": {
    id: "she-1",
    title: "Les tendances design d'intérieur 2024",
    content: `
# Les tendances design d'intérieur 2024 - L'approche SHE

## La vision SHE du design

Chez SHE by fernanden, nous croyons que le design d'intérieur doit être le reflet de votre personnalité tout en optimisant votre espace de vie.

## Nos recommandations pour 2024

### 1. L'optimisation intelligente des espaces

Dans un monde où l'espace devient un luxe, nous privilégions :
- **Meubles modulables** : Qui s'adaptent à vos besoins
- **Rangements cachés** : Pour un look épuré et fonctionnel
- **Zones multifonctionnelles** : Un espace, plusieurs usages

### 2. Les matériaux durables

La conscience écologique guide nos choix :
- **Bois recyclé** : Chaleur et histoire
- **Matériaux locaux** : Réduction de l'empreinte carbone
- **Durabilité** : Investir dans des pièces qui durent

### 3. L'éclairage comme élément central

L'éclairage transforme complètement un espace :
- **Éclairage naturel** : Maximisé et optimisé
- **Variété de sources** : Ambiances modulables
- **Design intégré** : Luminaires qui décorent autant qu'ils éclairent

## Projets récents

Nous avons récemment transformé un appartement de 45m² en un espace de vie exceptionnel grâce à des solutions ingénieuses d'optimisation et un design réfléchi.

## Conclusion

Le design SHE, c'est l'alliance parfaite entre esthétique et fonctionnalité, entre votre style de vie et l'optimisation de votre espace.
    `,
    author: "Marie fernanden",
    date: "2024-01-28",
    readTime: "5 min",
    category: "SHE",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    tags: ["Design", "Tendances", "Intérieur", "SHE"],
    featured: true
  },
  "dense-1": {
    id: "dense-1",
    title: "L'art de la mode africaine contemporaine",
    content: `
# L'art de la mode africaine contemporaine

## L'héritage africain revisité

Chez DENSE by fernanden, nous célébrons la richesse de l'héritage africain à travers des créations contemporaines qui parlent au monde entier.

## Les fondations de notre style

### 1. Les tissus traditionnels

Le Kente, le Wax, le Bogolan : bien plus que des tissus, ce sont des histoires tissées. Chaque motif raconte une légende, chaque couleur symbolise une émotion.

### 2. La coupe moderne

Nous associons les savoir-faire traditionnels aux techniques de coupe contemporaines pour créer des pièces uniques qui allient confort et élégance.

### 3. L'identité forte

Porter DENSE, c'est affirmer son identité avec fierté. C'est porter une histoire, un héritage, une vision.

## Notre collection 2024

### La collection "Racines Modernes"

Cette collection explore la tension entre tradition et modernité à travers :
- **Robes fluides** en Wax revisité
- **Ensembles structurés** inspirés du Kente
- **Accessoires contemporains** aux motifs traditionnels

### La technique artisanale

Chaque pièce est unique, créée par des artisans passionnés qui perpétuent des techniques séculaires.

## Conclusion

La mode africaine contemporaine n'est pas seulement des vêtements, c'est une déclaration d'identité, une célébration de la diversité, une vision de l'avenir.
    `,
    author: "Sophie fernanden",
    date: "2024-01-25",
    readTime: "7 min",
    category: "DENSE",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=1200&auto=format&fit=crop",
    tags: ["Fashion", "Afrique", "Création", "DENSE"],
    featured: true
  },
  "cafee-1": {
    id: "cafee-1",
    title: "Méthodes pédagogiques innovantes",
    content: `
# Méthodes pédagogiques innovantes

## La révolution pédagogique chez CaFEE

Chez CaFEE by fernanden, nous croyons en une éducation qui transforme, qui inspire, qui libère le potentiel de chaque enfant.

## Notre approche : la ludopédagogie

### Qu'est-ce que la ludopédagogie ?

La ludopédagogie est une approche qui utilise le jeu comme outil d'apprentissage. Elle repose sur le principe que l'enfant apprend mieux quand il s'amuse.

### Les principes fondamentaux

1. **Apprendre en jouant** : Le jeu n'est pas une récompense, c'est le chemin
2. **Respect du rythme** : Chaque enfant a son propre tempo
3. **Valorisation** : Chaque progrès est célébré
4. **Autonomie** : L'enfant devient acteur de son apprentissage

## Nos méthodes concrètes

### 1. Les ateliers thématiques

Des ateliers qui mêlent apprentissage et créativité :
- **Mathématiques ludiques** : Jeux de logique et énigmes
- **Français créatif** : Écriture de histoires et théâtre
- **Sciences exploratoires** : Expériences et découvertes

### 2. L'apprentissage par projet

Les enfants travaillent sur des projets concrets qui développent :
- **La créativité** : Trouver des solutions originales
- **La collaboration** : Travailler en équipe
- **La résolution de problèmes** : Faire face aux défis

### 3. L'utilisation du numérique

Nous intégrons les outils numériques de manière intelligente :
- **Applications éducatives** : Pour renforcer les apprentissages
- **Programmation créative** : Développer la logique
- **Création multimédia** : Exprimer sa créativité

## Les résultats

Nos méthodes ont démontré leur efficacité :
- **Meilleure motivation** des enfants
- **Progression plus rapide** dans les apprentissages
- **Développement de l'autonomie** et de la confiance
- **Réduction du stress** lié à l'école

## Conclusion

La pédagogie innovante n'est pas une méthode miracle, c'est une approche qui place l'enfant au centre de ses apprentissages, qui respecte sa personnalité et qui cultive son désir d'apprendre.

Chez CaFEE, nous accompagnons chaque enfant sur ce chemin passionnant de la découverte et de la croissance.
    `,
    author: "Dr. Claire fernanden",
    date: "2024-01-22",
    readTime: "8 min",
    category: "CaFEE",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    tags: ["Éducation", "Pédagogie", "Innovation", "CaFEE"],
    featured: true
  }
};

const relatedArticles = [
  {
    id: "2",
    title: "Organiser un événement mémorable",
    category: "SHE",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "dense-2",
    title: "Collection Printemps-Été 2024",
    category: "DENSE",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "cafee-2",
    title: "L'orientation scolaire sans stress",
    category: "CaFEE",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=400&auto=format&fit=crop"
  }
];

const BlogArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articlesData[id || "1"];

  if (!article) {
    return (
      <Layout>
        <div className="container-main py-16 text-center">
          <h1 className="heading-section text-foreground mb-4">Article non trouvé</h1>
          <p className="body-regular text-muted-foreground mb-8">
            L'article que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button onClick={() => navigate("/blog")}>
            Retour au blog
          </Button>
        </div>
      </Layout>
    );
  }

  const categoryColors = {
    SHE: "bg-she-saffron/20 text-she-saffron border-she-saffron/30",
    DENSE: "bg-densen-gold/20 text-densen-gold border-densen-gold/30", 
    CaFEE: "bg-cafee-mint/20 text-cafee-mint border-cafee-mint/30"
  };

  return (
    <Layout>
      {/* Hero Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-main pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className={categoryColors[article.category as keyof typeof categoryColors] + " mb-4"}>
              {article.category}
            </Badge>
            <h1 className="heading-hero text-white mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container-main max-w-4xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg max-w-none"
              >
                <div 
                  className="text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }}
                />
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-8 border-t border-border"
              >
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 2).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Share & Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-8 border-t border-border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Heart size={16} className="mr-2" />
                      J'aime
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Bookmark size={16} className="mr-2" />
                      Sauvegarder
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Share2 size={16} className="mr-2" />
                      Partager
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle size={16} />
                    <span>12 commentaires</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-24"
              >
                {/* Author Card */}
                <Card className="mb-8">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User size={24} className="text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      {article.author}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Expert en {article.category.toLowerCase()}
                    </p>
                    <Button variant="outline" size="sm" className="w-full rounded-full">
                      Voir le profil
                    </Button>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-heading font-semibold text-foreground mb-4">
                      Navigation
                    </h4>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => navigate("/blog")}
                      >
                        <ArrowLeft size={16} className="mr-2" />
                        Retour au blog
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => navigate(`/blog/${article.category.toLowerCase()}`)}
                      >
                        Plus d'articles {article.category}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-muted/20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="heading-section text-foreground mb-2">
              Articles <span className="text-primary">similaires</span>
            </h2>
            <p className="body-regular text-muted-foreground">
              Continuez votre lecture avec ces articles connexes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedArticles.map((relatedArticle, index) => (
              <motion.div
                key={relatedArticle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-500 border-border/50">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-background/80 text-foreground border-border/50 backdrop-blur-sm">
                        {relatedArticle.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {relatedArticle.title}
                    </h3>
                    
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 p-0"
                    >
                      <Link to={`/blog/${relatedArticle.id}`} className="flex items-center gap-1">
                        Lire l'article
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogArticle;
