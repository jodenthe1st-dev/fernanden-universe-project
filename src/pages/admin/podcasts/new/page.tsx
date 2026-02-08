// src/pages/admin/podcasts/new/page.tsx
import React, { useState } from 'react';
import logger from '@/lib/logger';
import { useNavigate } from 'react-router-dom';
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
  Mic,
  Play
} from 'lucide-react';

export default function AdminPodcastForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [podcast, setPodcast] = useState<Partial<Podcast>>({
    title: '',
    description: '',
    status: 'draft',
    audio_url: '',
    thumbnail_url: ''
  });

  const handleInputChange = (field: keyof Podcast) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPodcast(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('audio/')) return;

    setUploadingAudio(true);
    try {
      const result = await CloudinaryService.uploadAudio(file, 'podcasts');
      setPodcast(prev => ({
        ...prev,
        audio_url: result.url
      }));
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
        ...prev,
        thumbnail_url: result.url
      }));
    } catch (error) {
      logger.error('Error uploading thumbnail:', error);
      alert('Erreur lors de l\'upload de l\'image');
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!podcast.title || !podcast.description) {
        alert('Le titre et la description sont obligatoires');
        return;
      }

      await DatabaseService.createPodcast(podcast as Omit<Podcast, 'id' | 'created_at'>);
      navigate('/admin/podcasts');
    } catch (error) {
      logger.error('Error creating podcast:', error);
      alert('Erreur lors de la création du podcast');
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
          onClick={() => navigate('/admin/podcasts')}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Nouveau Podcast
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ajoutez un nouveau podcast ou épisode audio
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations du Podcast</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Titre du podcast *</Label>
                  <Input
                    id="title"
                    value={podcast.title || ''}
                    onChange={handleInputChange('title')}
                    placeholder="Ex: Épisode 1 - Introduction à Fernanden"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={podcast.description || ''}
                    onChange={handleInputChange('description')}
                    placeholder="Décrivez le contenu de cet épisode..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="status">Statut</Label>
                  <select
                    id="status"
                    value={podcast.status || 'draft'}
                    onChange={(e) => setPodcast(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="active">Publié</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Création...' : 'Créer le Podcast'}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/admin/podcasts')}
                  >
                    Annuler
                  </Button>
                </div>
              </form>
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
                <Label htmlFor="audio">Fichier Audio *</Label>
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
                  {uploadingAudio ? 'Upload...' : 'Choisir un fichier audio'}
                </Button>
              </div>

              {podcast.audio_url && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center">
                    <Play className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      Audio uploadé avec succès
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
                  {uploadingThumbnail ? 'Upload...' : 'Ajouter une image'}
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

export { AdminPodcastForm };
