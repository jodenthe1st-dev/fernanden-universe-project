// src/pages/admin/blog/AdminBlogForm.tsx
import React, { useState } from 'react';
import logger from '@/lib/logger';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft, 
  Save, 
  FileText,
  Eye
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminBlogForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    published: false
  });

  const handleInputChange = (field: keyof BlogPost) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = field === 'published' ? (e.target as HTMLInputElement).checked : e.target.value;
    setPost(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateExcerpt = (content: string) => {
    const plainText = content.replace(/<[^>]*>/g, '').substring(0, 150);
    return plainText + (plainText.length >= 150 ? '...' : '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!post.title || !post.content) {
        alert('Le titre et le contenu sont obligatoires');
        return;
      }

      const postData = {
        ...post,
        excerpt: post.excerpt || generateExcerpt(post.content),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Simulation - Remplacer par appel API réel
      logger.info('Creating blog post:', postData);
      
      navigate('/admin/blog');
    } catch (error) {
      logger.error('Error creating post:', error);
      alert('Erreur lors de la création de l\'article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/blog')}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {window.location.pathname.includes('/edit') ? 'Modifier' : 'Nouvel'} Article
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {window.location.pathname.includes('/edit') ? 'Modifiez les informations' : 'Rédigez un nouvel article pour le blog'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contenu de l'Article</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Titre de l'article *</Label>
                  <Input
                    id="title"
                    value={post.title || ''}
                    onChange={handleInputChange('title')}
                    placeholder="Titre attrayant et informatif"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Extrait (optionnel)</Label>
                  <Textarea
                    id="excerpt"
                    value={post.excerpt || ''}
                    onChange={handleInputChange('excerpt')}
                    placeholder="Brève description de l'article (max 150 caractères)"
                    rows={3}
                    maxLength={150}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {post.excerpt?.length || 0}/150 caractères
                  </p>
                </div>

                <div>
                  <Label htmlFor="author">Auteur *</Label>
                  <Input
                    id="author"
                    value={post.author || ''}
                    onChange={handleInputChange('author')}
                    placeholder="Nom de l'auteur"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content">Contenu de l'article *</Label>
                  <Textarea
                    id="content"
                    value={post.content || ''}
                    onChange={handleInputChange('content')}
                    placeholder="Rédigez votre article ici..."
                    rows={12}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={post.published || false}
                    onCheckedChange={(checked) => setPost(prev => ({ ...prev, published: checked }))}
                  />
                  <Label htmlFor="published">Publié immédiatement</Label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Enregistrement...' : 'Enregistrer l\'article'}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/admin/blog')}
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-terracotta" />
                Aperçu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {post.title && (
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      {post.title}
                    </h3>
                  </div>
                )}
                
                {(post.excerpt || post.content) && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {post.excerpt || generateExcerpt(post.content || '')}
                    </p>
                  </div>
                )}
                
                {post.author && (
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500">
                      Par {post.author}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${post.published ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <span className="text-xs text-gray-500">
                    {post.published ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { AdminBlogForm };
