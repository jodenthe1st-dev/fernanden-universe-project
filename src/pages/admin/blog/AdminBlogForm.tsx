import React, { useEffect, useState } from 'react';
import logger from '@/lib/logger';
import { useNavigate, useParams } from 'react-router-dom';
import { DatabaseService } from '@/services/DatabaseService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Eye } from 'lucide-react';

interface BlogFormState {
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
}

export default function AdminBlogForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(isEditMode);
  const [post, setPost] = useState<BlogFormState>({
    title: '',
    content: '',
    excerpt: '',
    published: false,
  });

  useEffect(() => {
    if (!isEditMode || !id) return;
    void loadPost(id);
  }, [id, isEditMode]);

  const loadPost = async (postId: string) => {
    try {
      const data = await DatabaseService.getBlogPostById(postId);
      if (!data) return;
      setPost({
        title: data.title || '',
        content: data.content || '',
        excerpt: data.excerpt || '',
        published: (data.status || 'draft') === 'published',
      });
    } catch (error) {
      logger.error('Error loading post:', error);
    } finally {
      setLoadingPost(false);
    }
  };

  const handleInputChange = (field: keyof BlogFormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost((prev) => ({ ...prev, [field]: e.target.value }));
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

      const payload = {
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || generateExcerpt(post.content),
        status: post.published ? 'published' : 'draft',
      };

      if (isEditMode && id) {
        await DatabaseService.updateBlogPost(id, payload);
      } else {
        await DatabaseService.createBlogPost(payload as any); // eslint-disable-line @typescript-eslint/no-explicit-any
      }
      navigate('/admin/blog');
    } catch (error) {
      logger.error('Error saving post:', error);
      alert("Erreur lors de l'enregistrement de l'article");
    } finally {
      setLoading(false);
    }
  };

  if (loadingPost) {
    return (
      <div className="p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center mb-8">
        <Button variant="outline" onClick={() => navigate('/admin/blog')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{isEditMode ? 'Modifier' : 'Nouvel'} Article</h1>
          <p className="text-gray-600 dark:text-gray-400">{isEditMode ? 'Modifiez les informations' : 'Redigez un nouvel article'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contenu de l'Article</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input id="title" value={post.title} onChange={handleInputChange('title')} required />
                </div>

                <div>
                  <Label htmlFor="excerpt">Extrait (optionnel)</Label>
                  <Textarea id="excerpt" value={post.excerpt} onChange={handleInputChange('excerpt')} rows={3} maxLength={150} />
                </div>

                <div>
                  <Label htmlFor="content">Contenu *</Label>
                  <Textarea id="content" value={post.content} onChange={handleInputChange('content')} rows={12} required />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="published" checked={post.published} onCheckedChange={(checked) => setPost((prev) => ({ ...prev, published: checked }))} />
                  <Label htmlFor="published">Publie immediatement</Label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={loading} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Enregistrement...' : "Enregistrer l'article"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate('/admin/blog')}>
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-terracotta" />
                Apercu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{post.title || 'Titre de article'}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{post.excerpt || generateExcerpt(post.content || '')}</p>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${post.published ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <span className="text-xs text-gray-500">{post.published ? 'Publie' : 'Brouillon'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { AdminBlogForm };
