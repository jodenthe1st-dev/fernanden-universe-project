// src/pages/admin/podcasts/[id]/page.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatabaseService, Podcast } from '@/services/DatabaseService';
import { CloudinaryService } from '@/services/CloudinaryService';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Edit, 
  Trash2, 
  Play,
  Mic
} from 'lucide-react';
import logger from '@/lib/logger';

export default function AdminPodcastView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadPodcast = async () => {
      try {
        const podcasts = await DatabaseService.getPodcasts();
        const foundPodcast = podcasts.find(p => p.id === id);
        
        if (foundPodcast) {
          setPodcast(foundPodcast);
        } else {
          navigate('/admin/podcasts');
        }
      } catch (error) {
        logger.error('Error loading podcast:', error);
        navigate('/admin/podcasts');
      }
    };

    loadPodcast();
  }, [id, navigate]);

  const handleInputChange = (field: keyof Podcast) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!podcast) return;
    
    setPodcast(prev => ({
      ...prev!,
      [field]: e.target.value
    }));
    setIsEditing(true);
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('audio/')) return;

    setUploadingAudio(true);
    try {
      const result = await CloudinaryService.uploadAudio(file, 'podcasts');
      setPodcast(prev => ({
        ...prev!,
        audio_url: result.url
      }));
      setIsEditing(true);
    } catch (error) {
      logger.error('Error uploading audio:', error);
      alert('Erreur lors de l\'upload de l\'audio');
    } finally {
      setUploadingAudio(false);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    setUploadingThumbnail(true);
    try {
      const result = await CloudinaryService.uploadImage(file, 'podcasts');
      setPodcast(prev => ({
        ...prev!,
        thumbnail_url: result.url
      }));
      setIsEditing(true);
    } catch (error) {
      logger.error('Error uploading thumbnail:', error);
      alert('Erreur lors de l\'upload de l\'image');
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleSave = async () => {
    if (!podcast || !id) return;

    setLoading(true);
    try {
      await DatabaseService.updatePodcast(id, podcast);
      setIsEditing(false);
    } catch (error) {
      logger.error('Error updating podcast:', error);
      alert('Erreur lors de la mise à jour du podcast');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!podcast || !id) return;

    if (!confirm('Êtes-vous sûr de vouloir supprimer ce podcast ? Cette action est irréversible.')) {
      return;
    }

    try {
      await DatabaseService.deletePodcast(id);
      navigate('/admin/podcasts');
    } catch (error) {
      logger.error('Error deleting podcast:', error);
      alert('Erreur lors de la suppression du podcast');
    }
  };

  if (!podcast) {
    return (
      <div className="p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/podcasts')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isEditing ? 'Modifier' : 'Détails'}: {podcast.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isEditing ? 'Modifiez les informations' : 'Consultez les détails'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {isEditing && (
            <Button 
              onClick={handleSave}
              disabled={loading}
              className="bg-terracotta hover:bg-terracotta/90"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          )}
          
          <Button 
            variant="destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Edit className="h-5 w-5 mr-2 text-terracotta" />
                Informations du Podcast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Titre du podcast</Label>
                  <Input
                    id="title"
                    value={podcast.title}
                    onChange={handleInputChange('title')}
                    placeholder="Ex: Épisode 1 - Introduction à Fernanden"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={podcast.description}
                    onChange={handleInputChange('description')}
                    placeholder="Décrivez le contenu de cet épisode..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="status">Statut</Label>
                  <select
                    id="status"
                    value={podcast.status}
                    onChange={(e) => {
                      setPodcast(prev => ({ ...prev!, status: e.target.value }));
                      setIsEditing(true);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="active">Publié</option>
                  </select>
                </div>

                <div className="pt-2">
                  <Label>Informations système</Label>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>ID: {podcast.id}</p>
                    <p>Créé le: {new Date(podcast.created_at).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Fichiers du Podcast</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Audio Upload */}
              <div>
                <Label htmlFor="audio">Fichier Audio</Label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  disabled={uploadingAudio}
                  className="hidden"
                  id="audio-upload"
                />
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={uploadingAudio}
                  onClick={() => document.getElementById('audio-upload')?.click()}
                >
                  <Mic className="h-4 w-4 mr-2" />
                  {uploadingAudio ? 'Upload...' : 'Remplacer l\'audio'}
                </Button>
              </div>

              {podcast.audio_url && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center">
                    <Play className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      Audio disponible
                    </span>
                  </div>
                </div>
              )}

              {/* Thumbnail Upload */}
              <div className="mt-6">
                <Label htmlFor="thumbnail">Image de couverture</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  disabled={uploadingThumbnail}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={uploadingThumbnail}
                  onClick={() => document.getElementById('thumbnail-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploadingThumbnail ? 'Upload...' : 'Remplacer l\'image'}
                </Button>
              </div>

              {podcast.thumbnail_url && (
                <div className="mt-4">
                  <img 
                    src={podcast.thumbnail_url} 
                    alt="Thumbnail"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { AdminPodcastView };
