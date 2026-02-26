// src/pages/admin/podcasts/new/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { DatabaseService, Podcast } from '@/services/DatabaseService';
import { ArrowLeft, Save, Mic } from 'lucide-react';

export function AdminPodcastForm() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Podcast>>({
    title: '',
    description: '',
    audio_url: '',
    duration: 0,
    status: 'draft',
    featured: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await DatabaseService.createPodcast(formData as Omit<Podcast, 'id' | 'created_at'>);
      navigate('/admin/podcasts');
    } catch (error) {
      console.error('Error creating podcast:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof Podcast, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => navigate('/admin/podcasts')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold">Nouveau Podcast</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium">Titre</label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Titre du podcast"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Description du podcast"
                className="w-full p-2 border rounded-md min-h-[100px]"
              />
            </div>

            <div>
              <label className="text-sm font-medium flex items-center gap-2">
                <Mic className="w-4 h-4" />
                URL Audio
              </label>
              <Input
                value={formData.audio_url}
                onChange={(e) => handleChange('audio_url', e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div>
              <label htmlFor="duration" className="text-sm font-medium">Durée</label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="Ex: 45:30"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleChange('featured', e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="featured" className="text-sm">Podcast en vedette</label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/admin/podcasts')}>
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminPodcastForm;
