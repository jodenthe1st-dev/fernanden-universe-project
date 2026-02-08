import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Trash2, Edit, Plus, Upload, Image as ImageIcon } from 'lucide-react';
import { Realization } from '@/types/admin-she';
import { sheAdminService } from '@/services/admin-she';
import logger from '@/lib/logger';

interface RealizationAdminProps {
  realizations: Realization[];
  onUpdate: () => void;
}

export const RealizationAdmin = ({ realizations, onUpdate }: RealizationAdminProps) => {
  const [editingRealization, setEditingRealization] = useState<Realization | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Realization>>({});

  const categories = [
    { value: 'decoration', label: 'Décoration' },
    { value: 'planning', label: 'Planning' },
    { value: 'design', label: 'Design' },
    { value: 'full_event', label: 'Événement Complet' }
  ];

  const resetForm = () => {
    setFormData({});
    setEditingRealization(null);
    setIsCreating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isCreating) {
        const newRealization: Realization = {
          id: Date.now().toString(),
          title: formData.title || '',
          category: formData.category as 'decoration' | 'planning' | 'design' | 'full_event',
          description: formData.description || '',
          image: formData.image || '',
          client: formData.client || '',
          date: formData.date || new Date().toISOString().split('T')[0],
          location: formData.location || '',
          route: `/she/realizations/${formData.title?.toLowerCase().replace(/\s+/g, '-')}`,
          images: formData.images || [],
          tags: formData.tags || [],
          isActive: formData.isActive ?? true,
          featured: formData.featured ?? false,
          order: realizations.length + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        await sheAdminService.addRealization(newRealization);
      } else if (editingRealization) {
        await sheAdminService.updateRealization(editingRealization.id, formData);
      }
      
      resetForm();
      onUpdate();
    } catch (error) {
      logger.error('Error saving realization:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réalisation ?')) {
      try {
        await sheAdminService.deleteRealization(id);
        onUpdate();
      } catch (error) {
        logger.error('Error deleting realization:', error);
      }
    }
  };

  const startEdit = (realization: Realization) => {
    setEditingRealization(realization);
    setFormData(realization);
    setIsCreating(false);
  };

  const startCreate = () => {
    setFormData({
      title: '',
      category: 'decoration',
      description: '',
      image: '',
      client: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      images: [],
      tags: [],
      isActive: true,
      featured: false
    });
    setIsCreating(true);
    setEditingRealization(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploadedFile = await sheAdminService.uploadImage(file);
        setFormData(prev => ({
          ...prev,
          image: uploadedFile.url,
          images: [...(prev.images || []), uploadedFile.url]
        }));
      } catch (error) {
        logger.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Réalisations</h2>
        <Button onClick={startCreate} className="flex items-center gap-2">
          <Plus size={16} />
          Nouvelle réalisation
        </Button>
      </div>

      {/* Formulaire d'édition/création */}
      {(isCreating || editingRealization) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isCreating ? 'Créer une réalisation' : 'Modifier une réalisation'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as 'decoration' | 'planning' | 'design' | 'full_event' }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={formData.client || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Localisation</Label>
                  <Input
                    id="location"
                    value={formData.location || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Image principale</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      value={formData.image || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="URL de l'image"
                    />
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Button type="button" variant="outline" size="sm">
                        <Upload size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                <Input
                  id="tags"
                  value={formData.tags?.join(', ') || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                  }))}
                  placeholder="mariage, traditionnel, fleurs"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive ?? true}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={formData.featured ?? false}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Mise en avant</Label>
                </div>
              </div>
              
              {formData.image && (
                <div className="mt-4">
                  <Label>Aperçu de l'image</Label>
                  <div className="mt-2 relative">
                    <img
                      src={formData.image}
                      alt="Aperçu"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">
                        <ImageIcon size={12} className="mr-1" />
                        Image principale
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <Button type="submit">
                  {isCreating ? 'Créer' : 'Modifier'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Liste des réalisations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {realizations.map((realization) => (
          <Card key={realization.id} className="relative">
            <CardContent className="p-4">
              <div className="aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                <img
                  src={realization.image}
                  alt={realization.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop';
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{realization.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {realization.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{realization.client}</span>
                  <span>•</span>
                  <span>{realization.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={realization.isActive ? 'default' : 'secondary'}>
                    {realization.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  {realization.featured && (
                    <Badge variant="outline">Mise en avant</Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(realization)}
                  className="flex-1"
                >
                  <Edit size={14} className="mr-1" />
                  Modifier
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(realization.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
