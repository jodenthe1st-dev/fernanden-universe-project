import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Bell, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentRenderer } from "@/components/ui/ContentRenderer";

// Mock actualité data - in real app, this would come from API
const actualitesData: Record<string, {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  type: string;
  image: string;
  urgent: boolean;
  contactEmail?: string;
  eventDate?: string;
  eventLocation?: string;
}> = {
  "actu-1": {
    id: "actu-1",
    title: "Nouvelle collection DENSE Printemps 2024",
    content: `
# Nouvelle collection DENSE Printemps 2024

## Une célébration de l'identité africaine

Nous sommes ravis de vous présenter notre nouvelle collection Printemps 2024, une véritable ode à la richesse culturelle africaine revisitée avec une touche contemporaine.

## Les inspirations derrière la collection

### Le thème : "Racines et Ailes"

Cette collection explore la dualité entre nos racines profondes et nos aspirations vers l'avenir. Chaque pièce raconte une histoire, chaque motif porte un message.

### Les couleurs emblématiques

- **Terracotta** : Terre, chaleur, authenticité
- **Vert citron** : Espoir, renouveau, énergie
- **Bleu indigo** : Profondeur, spiritualité, élégance
- **Or doux** : Prospérité, célébration, luxe

## Les pièces phares

### 1. La robe "Kente Moderne"

Une interprétation contemporaine du tissu Kente traditionnel :
- Coupe structurée moderne
- Motifs Kente revisités
- Tissu mélangé : coton et soie
- Disponible en 3 coloris

### 2. L'ensemble "Wax Chic"

Le tissu Wax comme vous ne l'avez jamais vu :
- Veste cintrée et pantalon palazzo
- Motifs Wax exclusifs créés par nos artisans
- Finitions haut de gamme
- Made in Africa

### 3. L'accessoire "Héritage"

Des pièces qui complètent parfaitement vos tenues :
- Sacs en cuir avec détails Wax
- Bijoux inspirés des symboles africains
- Foulards en soie imprimée
- Ceintures en cuir artisanal

## La philosophie DENSE

### Mode éthique et durable

Chaque pièce est créée avec :
- **Matériaux locaux** : Soutien aux artisans africains
- **Techniques traditionnelles** : Préservation du savoir-faire
- **Production limitée** : Mode éco-responsable
- **Conditions de travail équitables** : Commerce éthique

### L'histoire derrière chaque pièce

Chaque création porte en elle des générations d'histoire et d'artisanat. Porter DENSE, c'est porter une histoire, soutenir une communauté, célébrer une culture.

## Lancement événementiel

### Date et lieu

**Samedi 15 Mars 2024**
Galerie des Créateurs, Paris 8ème

### Programme

- **18h00** : Cocktail d'accueil
- **19h00** : Défilé de mode
- **20h00** : Vente privée
- **21h00** : Soirée festive

### Invités spéciaux

Des personnalités du monde de la mode, de la culture et des affaires seront présentes pour célébrer avec nous ce lancement.

## Comment acheter

### En ligne

La collection sera disponible sur notre site e-commerce à partir du 16 Mars 2024 à 10h00.

### En boutique

Retrouvez la collection dans nos showrooms :
- Paris : 123 Rue de la Mode
- Abidjan : 45 Avenue des Créateurs
- Dakar : 78 Rue du Style

## Conclusion

Cette collection Printemps 2024 est plus qu'une simple collection de mode. C'est une déclaration d'amour à l'Afrique, une célébration de notre identité, une vision de l'avenir de la mode africaine dans le monde.

Nous espérons que vous serez nombreux à découvrir et à adopter ces créations qui portent en elles l'âme de l'Afrique.

**DENSE by fernanden - L'élégance africaine revisitée**
    `,
    author: "Équipe DENSE",
    date: "2024-01-30",
    readTime: "3 min",
    category: "DENSE",
    type: "nouvelle-collection",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=1200&auto=format&fit=crop",
    urgent: true,
    contactEmail: "contact@densen.fernanden.com",
    eventDate: "2024-03-15",
    eventLocation: "Galerie des Créateurs, Paris"
  },
  "actu-2": {
    id: "actu-2",
    title: "Ateliers de design d'intérieur chez SHE",
    content: `
# Ateliers de design d'intérieur chez SHE

## Apprenez les secrets du design d'intérieur

SHE by fernanden lance une nouvelle série d'ateliers mensuels pour partager notre passion et notre expertise du design d'intérieur.

## Notre approche pédagogique

### Apprendre en faisant

Nos ateliers sont basés sur une approche pratique :
- **Théorie simplifiée** : Concepts accessibles à tous
- **Exercices pratiques** : Mettez immédiatement en pratique
- **Projets réels** : Travaillez sur vos propres espaces
- **Feedback personnalisé** : Conseils adaptés à votre projet

### Les thèmes abordés

1. **Les bases du design d'intérieur**
2. **La théorie des couleurs**
3. **L'optimisation des espaces**
4. **Le choix des matériaux**
5. **L'éclairage et son impact**
6. **La décoration finale**

## Programme mensuel

### Janvier : "Les bases du design"

Pour les débutants qui veulent comprendre les fondamentaux.

### Février : "La couleur comme outil"

Comment utiliser la couleur pour transformer un espace.

### Mars : "Optimiser les petits espaces"

Des solutions ingénieuses pour les espaces réduits.

### Avril : "L'éclairage qui change tout"

Créer des ambiances avec la lumière.

## Tarifs et inscription

### Tarifs

- **Atelier découverte** (2h) : 45€
- **Atelier thématique** (3h) : 65€
- **Pack 4 ateliers** : 220€ (au lieu de 260€)

### Inscription

Places limitées à 12 participants par atelier pour garantir un accompagnement personnalisé.

## Conclusion

Ces ateliers sont l'occasion parfaite de transformer votre espace de vie tout en apprenant des professionnels passionnés.
    `,
    author: "Équipe SHE",
    date: "2024-01-28",
    readTime: "2 min",
    category: "SHE",
    type: "ateliers",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    urgent: false,
    contactEmail: "ateliers@she.fernanden.com"
  },
  "actu-3": {
    id: "actu-3",
    title: "Nouveaux services d'orientation chez CaFEE",
    content: `
# Nouveaux services d'orientation chez CaFEE

## Un accompagnement personnalisé pour l'avenir

CaFEE by fernanden enrichit son offre avec de nouveaux services d'orientation scolaire et professionnelle pour accompagner chaque jeune vers la voie qui lui correspond.

## Notre nouvelle offre

### 1. Orientation Collège

Pour les élèves de 4ème et 3ème :
- Bilan des compétences et centres d'intérêt
- Découverte des filières professionnelles
- Accompagnement dans le choix du lycée
- Préparation à l'orientation

### 2. Orientation Lycée

Pour les lycéens :
- Bilan d'orientation personnalisé
- Présentation des études supérieures
- Aide à la constitution des dossiers
- Préparation aux entretiens

### 3. Orientation Adulte

Pour les adultes en reconversion :
- Bilan de compétences
- Analyse des opportunités professionnelles
- Accompagnement vers la formation
- Aide à la reconversion

## Notre méthodologie

### Étape 1 : Bilan personnalisé

- Tests psychotechniques validés
- Entretiens approfondis
- Analyse des motivations
- Identification des talents

### Étape 2 : Exploration

- Découverte des métiers et formations
- Rencontres avec des professionnels
- Visites d'établissements
- Stages découverte

### Étape 3 : Décision

- Synthèse du bilan
- Aide à la décision
- Plan d'action personnalisé
- Suivi post-orientation

## Tarifs spéciaux de lancement

### Forfaits découverte

- **Bilan orientation express** : 150€
- **Accompagnement complet** : 450€
- **Pack famille** (2 enfants) : 800€

### Garantie satisfaction

Premier entretien satisfait ou remboursé.

## Conclusion

L'orientation ne devrait pas être une source de stress, mais une opportunité de découvrir qui l'on est et ce que l'on veut devenir.
    `,
    author: "Équipe CaFEE",
    date: "2024-01-25",
    readTime: "4 min",
    category: "CaFEE",
    type: "nouveaux-services",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    urgent: true,
    contactEmail: "orientation@cafee.fernanden.com"
  }
};

const categoryColors = {
  SHE: "bg-she-saffron/20 text-she-saffron border-she-saffron/30",
  DENSE: "bg-densen-gold/20 text-densen-gold border-densen-gold/30", 
  CaFEE: "bg-cafee-mint/20 text-cafee-mint border-cafee-mint/30"
};

const ActualiteArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const actualite = actualitesData[id || "actu-1"];

  if (!actualite) {
    return (
      <Layout>
        <div className="container-main py-16 text-center">
          <h1 className="heading-section text-foreground mb-4">Actualité non trouvée</h1>
          <p className="body-regular text-muted-foreground mb-8">
            L'actualité que vous recherchez n'existe pas ou a été supprimée.
          </p>
          <Button onClick={() => navigate("/actualites")}>
            Retour aux actualités
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={actualite.image}
          alt={actualite.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-main pb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              {actualite.urgent && (
                <Badge className="bg-terracotta text-white border-terracotta animate-pulse">
                  Urgent
                </Badge>
              )}
              <Badge className={categoryColors[actualite.category as keyof typeof categoryColors]}>
                {actualite.category}
              </Badge>
            </div>
            <h1 className="heading-hero text-white mb-4">
              {actualite.title}
            </h1>
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{actualite.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(actualite.date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{actualite.readTime}</span>
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
                <ContentRenderer 
                  content={actualite.content}
                  className="text-foreground leading-relaxed"
                />
              </motion.div>

              {/* Event Information */}
              {actualite.eventDate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 p-6 bg-primary/10 rounded-2xl border border-primary/20"
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Informations événement
                  </h3>
                  <div className="space-y-2 text-foreground">
                    <p><strong>Date :</strong> {new Date(actualite.eventDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><strong>Lieu :</strong> {actualite.eventLocation}</p>
                  </div>
                  <Button className="mt-4 bg-terracotta hover:bg-terracotta/90">
                    S'inscrire à l'événement
                  </Button>
                </motion.div>
              )}

              {/* Contact Information */}
              {actualite.contactEmail && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 p-6 bg-muted/50 rounded-2xl border border-border/50"
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-primary" />
                    Contact
                  </h3>
                  <p className="text-foreground mb-4">
                    Pour plus d'informations ou pour vous inscrire :
                  </p>
                  <Button variant="outline" className="rounded-full">
                    <a href={`mailto:${actualite.contactEmail}`} className="flex items-center gap-2">
                      {actualite.contactEmail}
                      <ExternalLink size={16} />
                    </a>
                  </Button>
                </motion.div>
              )}

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
                      <Share2 size={16} className="mr-2" />
                      Partager
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Bell size={16} className="mr-2" />
                      S'abonner
                    </Button>
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
                {/* Quick Actions */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <h4 className="font-heading font-semibold text-foreground mb-4">
                      Actions rapides
                    </h4>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => navigate("/actualites")}
                      >
                        <ArrowLeft size={16} className="mr-2" />
                        Retour aux actualités
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => navigate(`/blog/${actualite.category.toLowerCase()}`)}
                      >
                        Voir le blog {actualite.category}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card>
                  <CardContent className="p-6 text-center">
                    <Bell className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h4 className="font-heading font-semibold text-foreground mb-2">
                      Restez informé
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Recevez les dernières actualités fernanden
                    </p>
                    <Button size="sm" className="w-full rounded-full bg-terracotta hover:bg-terracotta/90">
                      S'inscrire
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ActualiteArticle;
