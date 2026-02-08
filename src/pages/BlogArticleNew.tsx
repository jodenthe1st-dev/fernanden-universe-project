import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Blog posts data (same as in Blog.tsx)
const blogPosts = [
  {
    id: 1,
    title: "Les tendances design d'intérieur 2024",
    excerpt: "Découvrez les nouvelles tendances qui transforment nos espaces de vie avec style et fonctionnalité.",
    author: "Marie fernanden",
    date: "2024-01-28",
    readTime: "5 min",
    category: "SHE",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    tags: ["Design", "Tendances", "Intérieur"],
    featured: true,
    content: `
# Les tendances design d'intérieur 2024

L'année 2024 marque une révolution dans le monde du design d'intérieur, où l'authenticité et la durabilité prennent le pas sur les éphémères tendances. Chez SHE, nous observons une mutation profonde des attentes des clients qui recherchent désormais des espaces qui racontent une histoire.

## Le retour au naturel

La tendance la plus marquante de cette année est sans conteste le retour aux matériaux naturels. Le bois brut, la pierre naturelle, et les fibres végétales s'invitent dans nos intérieurs pour créer une connexion avec la nature. Cette approche biophilique n'est pas seulement esthétique, elle répond à un besoin profond de bien-être.

## Les couleurs apaisantes

Les palettes de couleurs de 2024 privilégient les tons terreux et les nuances douces. Des teintes comme le terracotta, le vert sauge, et le beige chaud dominent, créant des atmosphères propices à la détente et à la concentration.

## Le multifonctionnel roi

Avec l'évolution de nos modes de vie, les espaces multifonctionnels deviennent essentiels. Un salon qui se transforme en bureau, une cuisine qui s'ouvre sur un espace de travail... la flexibilité est le maître mot.

## L'éclairage comme élément central

Plus qu'une simple source de lumière, l'éclairage devient un véritable élément de design. Les suspensions sculpturales, les appliques murales artistiques et les lampes design transforment nos pièces en véritables tableaux vivants.

## Conclusion

Les tendances 2024 nous invitent à repenser nos espaces de vie avec plus de conscience et d'authenticité. Chez SHE, nous accompagnons nos clients dans cette transformation pour créer des intérieurs qui leur ressemblent vraiment.
    `
  },
  {
    id: 2,
    title: "L'art de la mode africaine contemporaine",
    excerpt: "Comment le savoir-faire traditionnel rencontre l'innovation dans les créations DENSE.",
    author: "Sophie fernanden",
    date: "2024-01-25",
    readTime: "7 min",
    category: "DENSE",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=1200&auto=format&fit=crop",
    tags: ["Fashion", "Afrique", "Création"],
    featured: true,
    content: `
# L'art de la mode africaine contemporaine

La mode africaine contemporaine est une véritable révolution culturelle qui s'opère sous nos yeux. Chez DENSE, nous sommes fiers de faire partie de ce mouvement qui réinvente les codes de la mode tout en célébrant notre héritage.

## L'héritage comme source d'inspiration

Chaque création DENSE puise dans les traditions africaines pour mieux les réinterpréter. Les motifs bogolan du Mali, les wax d'Afrique de l'Ouest, ou encore les broderies traditionnelles du Bénin deviennent les points de départ de créations résolument modernes.

## La technique au service de la créativité

Nous combinons les techniques artisanales traditionnelles avec les technologies modernes pour créer des pièces uniques. La main de l'artisan reste essentielle, mais elle est amplifiée par des outils de pointe qui nous permettent de repousser les limites de la créativité.

## La durabilité comme engagement

La mode africaine a toujours été circulaire par nature. Chez DENSE, nous renforçons cet héritage en utilisant des matériaux durables, en favorisant les circuits courts et en créant des pièces intemporelles qui traversent les saisons.

## L'identité africaine sur la scène mondiale

Aujourd'hui, la mode africaine n'est plus une curiosité, mais une influence majeure sur les podiums internationaux. De Paris à New York, en passant par Lagos et Dakar, les créateurs africains imposent leur vision et leur esthétique.

## Conclusion

La mode africaine contemporaine est plus qu'une tendance, c'est un mouvement culturel qui redéfinit les codes de la mode mondiale. Chez DENSE, nous sommes honorés de contribuer à cette révolution.
    `
  },
  {
    id: 3,
    title: "Méthodes pédagogiques innovantes",
    excerpt: "Comment la ludopédagogie transforme l'apprentissage chez les enfants et adolescents.",
    author: "Dr. Claire fernanden",
    date: "2024-01-22",
    readTime: "8 min",
    category: "CaFEE",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    tags: ["Éducation", "Pédagogie", "Innovation"],
    featured: false,
    content: `
# Méthodes pédagogiques innovantes

L'éducation est en pleine transformation et les méthodes pédagogiques traditionnelles montrent leurs limites face aux défis du 21ème siècle. Chez CaFEE, nous développons et mettons en œuvre des approches innovantes qui placent l'élève au centre de son apprentissage.

## La ludopédagogie : apprendre en jouant

Le jeu n'est plus l'ennemi du travail scolaire, mais son meilleur allié. La ludopédagogie transforme les concepts abstraits en expériences concrètes et mémorables. Les mathématiques deviennent une aventure, l'histoire une enquête passionnante.

## L'apprentissage par projet

Plutôt que d'aborder les matières de manière cloisonnée, nous favorisons les projets transdisciplinaires où les élèves doivent mobiliser différentes compétences pour résoudre des problèmes concrets.

## La personnalisation des parcours

Chaque enfant est unique et son rythme d'apprentissage aussi. Les outils numériques nous permettent aujourd'hui de proposer des parcours personnalisés qui s'adaptent en temps réel aux besoins de chaque élève.

## L'intelligence émotionnelle

L'apprentissage ne se limite plus aux compétences académiques. Le développement de l'intelligence émotionnelle, de la collaboration et de la communication devient aussi important que celui des connaissances.

## Conclusion

Ces méthodes innovantes ne remplacent pas les fondamentaux, les enrichissent. Elles préparent nos enfants à un monde en constante évolution où la capacité à apprendre est plus importante que ce que l'on sait.
    `
  }
];

const categoryColors = {
  SHE: "bg-she-saffron/20 text-she-saffron border-she-saffron/30",
  DENSE: "bg-primary/20 text-primary border-primary/30",
  CaFEE: "bg-cafee-mint/20 text-cafee-mint border-cafee-mint/30"
};

const BlogArticle = () => {
  const { id } = useParams();
  const article = blogPosts.find(post => post.id === parseInt(id || "1"));

  if (!article) {
    return (
      <Layout>
        <div className="container-main py-16 text-center">
          <h1 className="heading-hero mb-4">Article non trouvé</h1>
          <p className="body-large text-muted-foreground mb-8">
            L'article que vous recherchez n'existe pas.
          </p>
          <Link to="/blog">
            <Button className="rounded-full">
              Retour au blog
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
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Retour au blog
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-8">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
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
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
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
            
            {/* Share and Like */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mt-8 pt-8 border-t border-border/30"
            >
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Share2 size={16} className="mr-2" />
                  Partager
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Heart size={16} className="mr-2" />
                  J'aime
                </Button>
              </div>
              
              <Link to="/blog">
                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                  Voir d'autres articles
                  <ArrowLeft size={16} className="ml-2 rotate-180" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogArticle;
