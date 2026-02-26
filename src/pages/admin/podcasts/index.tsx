// src/pages/admin/podcasts/index.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DatabaseService, Podcast } from '@/services/DatabaseService';
import { Plus, Search, Edit, Eye, Trash2, Play } from 'lucide-react';

export function AdminPodcastsList() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadPodcasts();
  }, []);

  const loadPodcasts = async () => {
    try {
      const data = await DatabaseService.getPodcasts();
      setPodcasts(data);
    } catch (error) {
      console.error('Error loading podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce podcast ?')) return;
    try {
      await DatabaseService.deletePodcast(id);
      loadPodcasts();
    } catch (error) {
      console.error('Error deleting podcast:', error);
    }
  };

  const filteredPodcasts = podcasts.filter(p =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Podcasts</h1>
        <Button onClick={() => navigate('/admin/podcasts/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Podcast
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un podcast..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredPodcasts.map((podcast) => (
          <Card key={podcast.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{podcast.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{podcast.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={podcast.status === 'published' ? 'default' : 'secondary'}>
                        {podcast.status}
                      </Badge>
                      {podcast.featured && (
                        <Badge variant="outline" className="bg-yellow-100">⭐ Featured</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/podcasts/view/${podcast.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/podcasts/edit/${podcast.id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(podcast.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPodcasts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun podcast trouvé</p>
        </div>
      )}
    </div>
  );
}

export default AdminPodcastsList;
