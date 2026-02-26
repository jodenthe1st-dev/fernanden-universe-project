// src/pages/admin/podcasts/[id]/index.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DatabaseService, Podcast } from '@/services/DatabaseService';
import { ArrowLeft, Edit, Play, Mic } from 'lucide-react';

export function AdminPodcastView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadPodcast(id);
    }
  }, [id]);

  const loadPodcast = async (podcastId: string) => {
    try {
      const data = await DatabaseService.getPodcastById(podcastId);
      setPodcast(data);
    } catch (error) {
      console.error('Error loading podcast:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Podcast non trouvé</p>
          <Button onClick={() => navigate('/admin/podcasts')} className="mt-4">
            Retour aux podcasts
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/admin/podcasts')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold">{podcast.title}</h1>
        </div>
        <Button onClick={() => navigate(`/admin/podcasts/edit/${podcast.id}`)}>
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Informations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Play className="w-16 h-16 text-white" />
            </div>

            <div className="flex items-center gap-2">
              <Badge variant={podcast.status === 'published' ? 'default' : 'secondary'}>
                {podcast.status}
              </Badge>
              {podcast.featured && (
                <Badge variant="outline" className="bg-yellow-100">⭐ Featured</Badge>
              )}
            </div>

            <div>
              <span className="text-sm font-medium text-gray-600">Description</span>
              <p id="podcast-desc" className="text-gray-800 mt-1">{podcast.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-600">Durée</span>
              <p id="podcast-duration">{podcast.duration}</p>
            </div>

            {podcast.audio_url && (
              <div>
                <span className="text-sm font-medium text-gray-600">URL Audio</span>
                <a
                  id="podcast-audio"
                  href={podcast.audio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline block truncate"
                >
                  {podcast.audio_url}
                </a>
              </div>
            )}

            {podcast.published_at && (
              <div>
                <span className="text-sm font-medium text-gray-600">Date de publication</span>
                <p id="podcast-date">{new Date(podcast.published_at).toLocaleDateString('fr-FR')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPodcastView;
