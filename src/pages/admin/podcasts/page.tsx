// src/pages/admin/podcasts/page.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DatabaseService, Podcast } from '@/services/DatabaseService';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Play,
  Mic,
  Filter,
  Clock
} from 'lucide-react';
import logger from '@/lib/logger';

export default function AdminPodcastsList() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    loadPodcasts();
    
    // Vérifier si on doit créer un nouveau podcast
    if (searchParams.get('action') === 'new') {
      navigate('/admin/podcasts/new');
    }
  }, [navigate, searchParams]);

  const loadPodcasts = async () => {
    try {
      const data = await DatabaseService.getPodcasts();
      setPodcasts(data);
    } catch (error) {
      logger.error('Error loading podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce podcast ?')) {
      return;
    }

    try {
      await DatabaseService.deletePodcast(id);
      await loadPodcasts();
    } catch (error) {
      logger.error('Error deleting podcast:', error);
      alert('Erreur lors de la suppression du podcast');
    }
  };

  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         podcast.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || podcast.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'Tous', color: 'bg-gray-500' },
    { value: 'active', label: 'Publiés', color: 'bg-green-500' },
    { value: 'draft', label: 'Brouillons', color: 'bg-yellow-500' }
  ];

  const formatDuration = (duration: string) => {
    if (!duration) return 'Non défini';
    return duration;
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Podcasts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos podcasts et épisodes audio
          </p>
        </div>
        
        <Button onClick={() => navigate('/admin/podcasts/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un Podcast
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un podcast..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              {statusOptions.map((status) => (
                <Button
                  key={status.value}
                  variant={filterStatus === status.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(status.value)}
                  className="flex items-center"
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${status.color}`} />
                  {status.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Podcasts Grid */}
      {filteredPodcasts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Mic className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'Aucun podcast trouvé' : 'Aucun podcast'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Essayez une autre recherche' : 'Commencez par ajouter votre premier podcast'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPodcasts.map((podcast) => (
            <Card key={podcast.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {podcast.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {podcast.description}
                    </p>
                  </div>
                  <Badge 
                    variant={podcast.status === 'active' ? 'default' : 'secondary'}
                    className="ml-2"
                  >
                    {podcast.status === 'active' ? 'Publié' : 'Brouillon'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Podcast Thumbnail */}
                {podcast.thumbnail_url && (
                  <div className="mb-4">
                    <img 
                      src={podcast.thumbnail_url} 
                      alt={podcast.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Podcast Info */}
                <div className="space-y-2 mb-4">
                  {podcast.duration && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      Durée: {formatDuration(podcast.duration)}
                    </div>
                  )}
                  
                  {podcast.audio_url && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Play className="h-4 w-4 mr-1" />
                      Audio: Disponible
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/admin/podcasts/${podcast.id}`)}
                    className="flex-1"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Écouter
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/admin/podcasts/${podcast.id}/edit`)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(podcast.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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

export { AdminPodcastsList };
