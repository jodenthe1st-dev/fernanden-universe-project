// src/pages/admin/documentation/AdminGuide.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users, 
  Settings, 
  Database, 
  Shield, 
  Zap,
  Target,
  TrendingUp,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface GuideStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  category: 'setup' | 'content' | 'advanced';
  icon: React.ElementType;
}

export default function AdminGuide() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const guideSteps: GuideStep[] = [
    {
      id: 'setup-account',
      title: 'Configuration du Compte Administrateur',
      description: 'Créez votre compte administrateur et configurez les accès',
      duration: '5 minutes',
      status: 'completed',
      category: 'setup',
      icon: Users
    },
    {
      id: 'setup-database',
      title: 'Configuration de la Base de Données',
      description: 'Configurez Supabase et créez les tables nécessaires',
      duration: '10 minutes',
      status: 'completed',
      category: 'setup',
      icon: Database
    },
    {
      id: 'setup-cloudinary',
      title: 'Configuration de Cloudinary',
      description: 'Configurez Cloudinary pour les uploads d\'images et fichiers',
      duration: '5 minutes',
      status: 'completed',
      category: 'setup',
      icon: Shield
    },
    {
      id: 'create-first-product',
      title: 'Créer votre Premier Produit',
      description: 'Ajoutez un produit avec images et description',
      duration: '8 minutes',
      status: 'in-progress',
      category: 'content',
      icon: Target
    },
    {
      id: 'create-first-podcast',
      title: 'Créer votre Premier Podcast',
      description: 'Uploadez un fichier audio et ajoutez une description',
      duration: '6 minutes',
      status: 'upcoming',
      category: 'content',
      icon: Zap
    },
    {
      id: 'setup-cafee-services',
      title: 'Configurer les Services CafEE',
      description: 'Ajoutez vos services d\'éducation et formation',
      duration: '12 minutes',
      status: 'upcoming',
      category: 'content',
      icon: BookOpen
    },
    {
      id: 'setup-she-services',
      title: 'Configurer les Services SHE',
      description: 'Ajoutez vos services d\'événements et décoration',
      duration: '15 minutes',
      status: 'upcoming',
      category: 'content',
      icon: Settings
    },
    {
      id: 'customize-appearance',
      title: 'Personnaliser l\'Apparence',
      description: 'Configurez les couleurs et le style de votre administration',
      duration: '10 minutes',
      status: 'upcoming',
      category: 'advanced',
      icon: TrendingUp
    }
  ];

  const categories = [
    { value: 'all', label: 'Toutes', color: 'bg-gray-500' },
    { value: 'setup', label: 'Configuration', color: 'bg-blue-500' },
    { value: 'content', label: 'Contenu', color: 'bg-green-500' },
    { value: 'advanced', label: 'Avancé', color: 'bg-purple-500' }
  ];

  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSteps = guideSteps.filter(step => {
    const matchesSearch = step.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         step.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || step.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'upcoming': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in-progress': return 'En cours';
      case 'upcoming': return 'À venir';
      default: return status;
    }
  };

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) ? prev : [...prev, stepId]
    );
  };

  const getProgressPercentage = () => {
    const totalSteps = guideSteps.length;
    const completed = guideSteps.filter(step => step.status === 'completed').length;
    return Math.round((completed / totalSteps) * 100);
  };

  const getNextStep = () => {
    const nextStep = guideSteps.find(step => step.status === 'upcoming');
    return nextStep || guideSteps[0];
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Guide de Démarrage Rapide
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Suivez ces étapes pour configurer votre administration Fernanden
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Progression globale
          </div>
          <div className="text-2xl font-bold text-terracotta">
            {getProgressPercentage()}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
            <div 
              className="bg-terracotta h-4 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{guideSteps.filter(step => step.status === 'completed').length} étapes terminées</span>
            <span>sur {guideSteps.length} au total</span>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une étape..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={filterCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(category.value)}
                  className="flex items-center"
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${category.color}`} />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Step Recommendation */}
      <Card className="mb-6 border-2 border-terracotta">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Prochaine étape recommandée
              </h3>
              <div className="flex items-center">
                {React.createElement(getNextStep().icon, { className: "h-5 w-5 mr-2 text-terracotta" })}
                <span className="font-medium">{getNextStep().title}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getNextStep().description}
              </p>
            </div>
            <Button 
              onClick={() => setActiveStep(getNextStep().id)}
              className="bg-terracotta hover:bg-terracotta/90"
            >
              Commencer cette étape
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSteps.map((step) => {
          const Icon = step.icon;
          const isCompleted = completedSteps.includes(step.id);
          
          return (
            <Card 
              key={step.id} 
              className={`hover:shadow-lg transition-all cursor-pointer ${
                isCompleted ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => setActiveStep(step.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Icon className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(step.status)}>
                        {getStatusLabel(step.status)}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                  {isCompleted && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {step.description}
                </p>

                <div className="flex gap-2">
                  {step.status === 'completed' ? (
                    <Button variant="outline" size="sm" className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Terminé
                    </Button>
                  ) : step.status === 'in-progress' ? (
                    <Button variant="default" size="sm" className="flex-1 bg-terracotta hover:bg-terracotta/90">
                      <Clock className="h-4 w-4 mr-1" />
                      En cours
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="flex-1">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Commencer
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Step Detail Modal */}
      {activeStep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {guideSteps.find(step => step.id === activeStep)?.title}
                </h2>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveStep(null)}
                >
                  Fermer
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {React.createElement(guideSteps.find(step => step.id === activeStep)?.icon || Settings, { 
                    className: "h-8 w-8 text-terracotta" 
                  })}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {guideSteps.find(step => step.id === activeStep)?.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Durée estimée: {guideSteps.find(step => step.id === activeStep)?.duration}
                    </p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  {guideSteps.find(step => step.id === activeStep)?.description}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">
                    Instructions détaillées
                  </h4>
                  <div className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
                    {guideSteps.find(step => step.id === activeStep)?.id === 'create-first-product' && (
                      <>
                        <p>1. Allez dans la section Produits de l'administration</p>
                        <p>2. Cliquez sur Ajouter un produit</p>
                        <p>3. Remplissez le formulaire avec les informations du produit</p>
                        <p>4. Uploadez les images via Cloudinary</p>
                        <p>5. Cliquez sur Créer le produit</p>
                      </>
                    )}
                    {guideSteps.find(step => step.id === activeStep)?.id === 'create-first-podcast' && (
                      <>
                        <p>1. Allez dans la section Podcasts</p>
                        <p>2. Cliquez sur Ajouter un podcast</p>
                        <p>3. Uploadez votre fichier audio</p>
                        <p>4. Ajoutez une image de couverture</p>
                        <p>5. Remplissez la description et publiez</p>
                      </>
                    )}
                    {guideSteps.find(step => step.id === activeStep)?.id === 'setup-cafee-services' && (
                      <>
                        <p>1. Allez dans Services CafEE</p>
                        <p>2. Ajoutez vos services éducatifs</p>
                        <p>3. Décrivez chaque service en détail</p>
                        <p>4. Ajoutez des images illustratives</p>
                        <p>5. Définissez les prix et disponibilités</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-6 pt-4 border-t">
                  <Button 
                    variant="outline"
                    onClick={() => window.open('/admin', '_blank')}
                  >
                    Ouvrir l'administration
                  </Button>
                  <Button 
                    onClick={() => {
                      handleStepComplete(activeStep);
                      setActiveStep(null);
                    }}
                    className="bg-terracotta hover:bg-terracotta/90"
                  >
                    Marquer comme terminé
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { AdminGuide };
