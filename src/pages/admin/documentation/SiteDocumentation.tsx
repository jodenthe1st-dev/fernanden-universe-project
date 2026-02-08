// src/pages/admin/documentation/SiteDocumentation.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Book, 
  Code, 
  Database, 
  Shield, 
  Settings, 
  Users, 
  Mail,
  FileText,
  HelpCircle,
  ExternalLink,
  Download,
  Copy
} from 'lucide-react';

interface DocumentationSection {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'getting-started' | 'api' | 'guides' | 'troubleshooting';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: string;
}

export default function SiteDocumentation() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const documentation: DocumentationSection[] = [
    {
      id: 'getting-started',
      title: 'Premiers Pas',
      description: 'Guide complet pour commencer avec l\'administration Fernanden',
      content: `
# Bienvenue dans l'administration Fernanden

Cette documentation vous guidera à travers toutes les fonctionnalités disponibles pour gérer votre site.

## Configuration Initiale

1. **Installation des dépendances**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configuration des variables d'environnement**
   - Créez un fichier \`.env.local\`
   - Configurez Supabase et Cloudinary

## Structure de l'Administration

L'administration est divisée en plusieurs sections :
- **Dashboard** : Vue d'ensemble avec statistiques
- **Produits** : Gestion des produits et services
- **Podcasts** : Gestion des contenus audio
- **Services CafEE** : Services d'éducation et formation
- **Services SHE** : Événements et décoration
- **Blog** : Gestion des articles
- **Contacts** : Messages des visiteurs
- **Newsletter** : Abonnés et campagnes
- **Médiathèque** : Gestion des fichiers
- **Paramètres** : Configuration du site

## Bonnes Pratiques

- Sauvegardez régulièrement votre travail
- Utilisez des mots de passe forts
- Vérifiez les permissions des utilisateurs
      `,
      category: 'getting-started',
      difficulty: 'beginner',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'api-reference',
      title: 'Référence API',
      description: 'Documentation complète des API disponibles',
      content: `
# API Reference

## Authentication

### Login
\`\`\`typescript
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "password"
}
\`\`\`

## Products API

### Get All Products
\`\`\`typescript
GET /api/products
Authorization: Bearer {token}
\`\`\`

### Create Product
\`\`\`typescript
POST /api/products
{
  "name": "Product Name",
  "description": "Product Description",
  "price": "15000",
  "images": ["url1", "url2"]
}
\`\`\`

## Services API

### Get Services by Category
\`\`\`typescript
GET /api/services?category=cafee
GET /api/services?category=she
\`\`\`

## Error Codes

- 200: Success
- 401: Unauthorized
- 404: Not Found
- 500: Server Error
      `,
      category: 'api',
      difficulty: 'intermediate',
      lastUpdated: '2024-01-20'
    },
    {
      id: 'deployment',
      title: 'Déploiement',
      description: 'Guide pour déployer votre application',
      content: `
# Guide de Déploiement

## Prérequis

- Node.js 18+
- npm ou yarn
- Accès à Supabase et Cloudinary

## Configuration de Production

1. **Variables d\'environnement**
   \`\`\`bash
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_key
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_API_KEY=your_api_key
   \`\`\`

2. **Build de production**
   \`\`\`bash
   npm run build
   \`\`\`

## Déploiement

### Option 1: Vercel
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### Option 2: Netlify
\`\`\`bash
npm run build
netlify deploy --prod --dir=dist
\`\`\`

## Post-Déploiement

1. Vérifiez que toutes les routes fonctionnent
2. Testez les formulaires d'upload
3. Configurez les domaines personnalisés
      `,
      category: 'guides',
      difficulty: 'intermediate',
      lastUpdated: '2024-01-18'
    },
    {
      id: 'troubleshooting',
      title: 'Dépannage',
      description: 'Solutions aux problèmes courants',
      content: `
# Guide de Dépannage

## Problèmes Courants

### 1. Erreur de connexion à Supabase
**Symptôme**: "Failed to connect to Supabase"

**Solutions**:
- Vérifiez les variables d\'environnement
- Assurez-vous que l\'URL Supabase est correcte
- Vérifiez les permissions RLS

### 2. Upload Cloudinary échoue
**Symptôme**: Les images ne s\'uploadent pas

**Solutions**:
- Vérifiez votre quota Cloudinary
- Assurez-vous que les clés API sont valides
- Vérifiez la taille du fichier (< 10MB)

### 3. Performance lente
**Symptôme**: L\'administration est lente

**Solutions**:
- Optimisez les images avant upload
- Utilisez la pagination pour les grandes listes
- Activez le cache navigateur

## Outils de Développement

### Console Navigateur
- F12 pour ouvrir les outils de développement
- Vérifiez l\'onglet "Network" pour les erreurs API
- Utilisez "Application" pour le stockage local

### Extensions VS Code Recommandées
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- GitLens - Git integration
      `,
      category: 'troubleshooting',
      difficulty: 'advanced',
      lastUpdated: '2024-01-22'
    }
  ];

  const filteredDocs = documentation.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'Toutes', color: 'bg-gray-500' },
    { value: 'getting-started', label: 'Premiers Pas', color: 'bg-blue-500' },
    { value: 'api', label: 'API', color: 'bg-green-500' },
    { value: 'guides', label: 'Guides', color: 'bg-purple-500' },
    { value: 'troubleshooting', label: 'Dépannage', color: 'bg-red-500' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Débutant';
      case 'intermediate': return 'Intermédiaire';
      case 'advanced': return 'Avancé';
      default: return difficulty;
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Code copié dans le presse-papiers!');
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Documentation
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Guides complets pour l\'administration Fernanden
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Exporter PDF
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher dans la documentation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
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

      {/* Documentation Grid */}
      {filteredDocs.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'Aucune documentation trouvée' : 'Aucune documentation disponible'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Essayez une autre recherche' : 'La documentation est en cours de rédaction'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {doc.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getDifficultyColor(doc.difficulty)}>
                      {getDifficultyLabel(doc.difficulty)}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(doc.lastUpdated).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="prose prose-sm max-w-none">
                    {doc.content.split('\n').slice(0, 3).map((line, index) => (
                      <div key={index} className="text-gray-700 dark:text-gray-300">
                        {line}
                      </div>
                    ))}
                    {doc.content.split('\n').length > 3 && (
                      <div className="text-gray-500 text-sm">
                        ... et {doc.content.split('\n').length - 3} lignes supplémentaires
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveSection(doc.id)}
                    className="flex-1"
                  >
                    <Book className="h-4 w-4 mr-1" />
                    Lire la suite
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`/docs/${doc.id}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Nouvel onglet
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Full Content Modal */}
      {activeSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {documentation.find(doc => doc.id === activeSection)?.title}
                </h2>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveSection(null)}
                >
                  Fermer
                </Button>
              </div>
              
              <div className="prose prose-lg max-w-none">
                {documentation.find(doc => doc.id === activeSection)?.content}
              </div>
              
              <div className="flex gap-2 mt-6 pt-4 border-t">
                <Button variant="outline" onClick={() => handleCopyCode(documentation.find(doc => doc.id === activeSection)?.content || '')}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copier le contenu
                </Button>
                <Button variant="outline" onClick={handleExportPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  Imprimer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { SiteDocumentation };
