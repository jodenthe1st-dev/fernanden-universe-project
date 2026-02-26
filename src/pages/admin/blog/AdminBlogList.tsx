import React, { useEffect, useState } from 'react';
import logger from '@/lib/logger';
import { useNavigate } from 'react-router-dom';
import { DatabaseService } from '@/services/DatabaseService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, FileText } from 'lucide-react';

interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  published: boolean;
  created_at: string;
  content: string;
}

export default function AdminBlogList() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    void loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const rows = await DatabaseService.getBlogPosts();
      setPosts(
        rows.map((row) => ({
          id: row.id,
          title: row.title || 'Sans titre',
          excerpt: row.excerpt || '',
          author: 'fernanden Team',
          published: (row.status || 'draft') === 'published',
          created_at: row.created_at || new Date().toISOString(),
          content: row.content || '',
        }))
      );
    } catch (error) {
      logger.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Etes-vous sur de vouloir supprimer cet article ?')) return;
    try {
      await DatabaseService.deleteBlogPost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      logger.error('Error deleting post:', error);
      alert("Erreur lors de la suppression de l'article");
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'published' && post.published) ||
      (filterStatus === 'draft' && !post.published);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Blog</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerez vos articles de blog</p>
        </div>

        <Button onClick={() => navigate('/admin/blog/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel Article
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={filterStatus === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilterStatus('all')}>Tous</Button>
              <Button variant={filterStatus === 'published' ? 'default' : 'outline'} size="sm" onClick={() => setFilterStatus('published')}>Publies</Button>
              <Button variant={filterStatus === 'draft' ? 'default' : 'outline'} size="sm" onClick={() => setFilterStatus('draft')}>Brouillons</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'Aucun article trouve' : 'Aucun article'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Essayez une autre recherche' : 'Commencez par ecrire votre premier article'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Par {post.author} - {new Date(post.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <Badge variant={post.published ? 'default' : 'secondary'} className="ml-2">
                    {post.published ? 'Publie' : 'Brouillon'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export { AdminBlogList };
