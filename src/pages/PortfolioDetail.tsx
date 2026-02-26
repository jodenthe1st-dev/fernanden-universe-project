import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Portfolio data (same as in Portfolio.tsx)
const portfolioItems = [
  {
    id: 1,
    title: "Mariage Traditionnel Élégant",
    category: "she",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    description: "Décoration florale et mise en scène",
    client: "Clara & Marc",
    date: "2024-01-15",
    location: "Cotonou, Bénin",
    tags: ["Mariage", "Floral", "Élégant"],
    link: "/she",
    featured: true,
    fullDescription: "Un mariage traditionnel béninois avec une touche moderne. Nous avons créé une décoration florale spectaculaire mettant en valeur les couleurs traditionnelles tout en apportant une élégance contemporaine. Le projet comprenait la décoration de la cérémonie, du banquet et des espaces photos.",
    services: ["Décoration florale", "Mise en scène", "Coordination événementielle", "Design d'espace"],
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Collection Été 2024",
    category: "dense",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=1200&auto=format&fit=crop",
    description: "Lookbook mode africaine",
    client: "DENSE Fashion",
    date: "2024-06-20",
    location: "Paris, France",
    tags: ["Fashion", "Été", "Lookbook"],
    link: "/dense/collections/les-drapés",
    featured: true,
    fullDescription: "Notre collection été 2024 met en valeur l'artisanat africain avec des motifs traditionnels revisités. Chaque pièce raconte une histoire et célèbre la richesse culturelle du continent tout en s'adaptant aux tendances contemporaines.",
    services: ["Design de collection", "Styling", "Photographie", "Direction artistique"],
    gallery: [
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "Identité Visuelle Tech Startup",
    category: "cafee",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    description: "Branding complet",
    client: "TechCorp Africa",
    date: "2024-03-10",
    location: "Lagos, Nigeria",
    tags: ["Branding", "Tech", "Startup"],
    link: "/cafee",
    featured: false,
    fullDescription: "Création d'une identité visuelle complète pour une startup technologique africaine. Le projet incluait le logo, la charte graphique, le site web et les supports de communication, le tout avec une approche moderne et innovante.",
    services: ["Logo design", "Charte graphique", "Web design", "Supports de communication"],
    gallery: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb74f28503d0?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 4,
    title: "Aménagement Bureau Premium",
    category: "she",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    description: "Design d'intérieur corporate",
    client: "International Bank",
    date: "2024-02-28",
    location: "Dakar, Sénégal",
    tags: ["Interior", "Corporate", "Design"],
    link: "/she/services/interior-design",
    featured: false,
    fullDescription: "Aménagement complet des bureaux d'une banque internationale à Dakar. Le projet visait à créer un espace de travail moderne, fonctionnel et inspirant tout en intégrant des éléments culturels sénégalais.",
    services: ["Architecture d'intérieur", "Mobilier sur mesure", "Éclairage", "Décoration"],
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524755537932-12768dff00e6?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 5,
    title: "Lookbook Automne",
    category: "dense",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    description: "Collection prêt-à-porter",
    client: "DENSE Fashion",
    date: "2024-09-15",
    location: "Abidjan, Côte d'Ivoire",
    tags: ["Fashion", "Automne", "Collection"],
    link: "/dense/collections/les-modulables",
    featured: false,
    fullDescription: "Collection automne-hiver mettant en valeur des pièces polyvalentes et confortables. Inspirée par les couleurs chaudes de l'Afrique de l'Ouest, cette collection allie tradition et modernité.",
    services: ["Design de mode", "Pattern making", "Production", "Marketing"],
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 6,
    title: "Rapport Annuel 2024",
    category: "cafee",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1200&auto=format&fit=crop",
    description: "Design éditorial",
    client: "Global Finance",
    date: "2024-12-01",
    location: "Paris, France",
    tags: ["Editorial", "Design", "Finance"],
    link: "/cafee",
    featured: false,
    fullDescription: "Conception et design du rapport annuel 2024 pour une institution financière internationale. Le projet incluait la mise en page, l'infographie, la création de visuels et la coordination de l'impression.",
    services: ["Design éditorial", "Infographie", "Mise en page", "Impression"],
    gallery: [
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 7,
    title: "Événement Corporate",
    category: "she",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
    description: "Gala d'entreprise",
    client: "TechCorp",
    date: "2024-04-20",
    location: "Paris, France",
    tags: ["Événement", "Gala", "Corporate"],
    link: "/she/services/events",
    featured: false,
    fullDescription: "Organisation complète d'un gala d'entreprise pour 500 personnes. Le projet incluait la décoration, la coordination des prestataires, la gestion des invités et la logistique globale de l'événement.",
    services: ["Organisation événementielle", "Décoration", "Coordination", "Logistique"],
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 8,
    title: "Accessoires Artisanaux",
    category: "dense",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop",
    description: "Collection limitée",
    client: "DENSE Fashion",
    date: "2024-11-10",
    location: "Cotonou, Bénin",
    tags: ["Accessoires", "Artisanal", "Limited"],
    link: "/dense/collections/les-accessoires",
    featured: false,
    fullDescription: "Collection limitée d'accessoires artisanaux créés en collaboration avec des artisans béninois. Chaque pièce est unique et raconte l'histoire du savoir-faire traditionnel revisité avec une touche contemporaine.",
    services: ["Design d'accessoires", "Production artisanale", "Marketing", "Distribution"],
    gallery: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
    ]
  }
];

const categoryColors = {
  she: "bg-she-saffron/20 text-she-saffron border-she-saffron/30",
  dense: "bg-primary/20 text-primary border-primary/30",
  cafee: "bg-cafee-mint/20 text-cafee-mint border-cafee-mint/30"
};

const PortfolioDetail = () => {
  const { id } = useParams();
  const project = portfolioItems.find(item => item.id === Number.parseInt(id || "1"));

  if (!project) {
    return (
      <Layout>
        <div className="container-main py-16 text-center">
          <h1 className="heading-hero mb-4">Projet non trouvé</h1>
          <p className="body-large text-muted-foreground mb-8">
            Le projet que vous recherchez n'existe pas.
          </p>
          <Link to="/portfolio">
            <Button className="rounded-full">
              Retour au portfolio
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
              to="/portfolio"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Retour au portfolio
            </Link>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge className={categoryColors[project.category as keyof typeof categoryColors]}>
                      {project.category.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/3">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="heading-hero text-foreground mb-4">
                    {project.title}
                  </h1>
                  
                  <p className="body-large text-muted-foreground mb-6">
                    {project.description}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <User size={20} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Client</p>
                        <p className="font-medium">{project.client}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar size={20} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{project.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Lieu</p>
                        <p className="font-medium">{project.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <Link to={project.link}>
                      <Button className="rounded-full flex-1">
                        Voir le service
                        <ExternalLink size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 bg-muted/20">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="heading-section text-foreground mb-6">
                  À propos du <span className="text-primary">projet</span>
                </h2>
                <p className="body-regular text-muted-foreground mb-8">
                  {project.fullDescription}
                </p>
                
                <h3 className="heading-card text-foreground mb-4">
                  Services réalisés
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.services.map((service) => (
                    <div key={service} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-muted-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="heading-card text-foreground mb-6">
                  Plus de <span className="text-primary">projets</span>
                </h3>
                <div className="space-y-4">
                  {portfolioItems
                    .filter(item => item.category === project.category && item.id !== project.id)
                    .slice(0, 3)
                    .map((item) => (
                      <Link key={item.id} to={`/portfolio/${item.id}`}>
                        <div className="bg-card rounded-2xl p-4 border border-border/50 hover:shadow-lg transition-all duration-300">
                          <div className="flex gap-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-20 h-20 rounded-xl object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="heading-section text-foreground mb-4">
              Galerie <span className="text-primary">photos</span>
            </h2>
            <p className="body-regular text-muted-foreground">
              Découvrez les images du projet
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioDetail;
