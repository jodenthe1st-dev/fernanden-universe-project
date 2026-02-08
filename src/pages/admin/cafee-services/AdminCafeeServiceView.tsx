// src/pages/admin/cafee-services/AdminCafeeServiceView.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatabaseService } from '@/services/DatabaseService';
import { CloudinaryService } from '@/services/CloudinaryService';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Edit, 
  Trash2, 
  Coffee,
  X
} from 'lucide-react';
import logger from '@/lib/logger';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  featured_image?: string;
  status: string;
  created_at: string;
  price?: string;
}

export default function AdminCafeeServiceView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [service, setService] = useState<Service | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadService = async () => {
      try {
        const services = await DatabaseService.getServices('cafee');
        const foundService = services.find(s => s.id === id);
        
        if (foundService) {
          setService(foundService);
        } else {
          navigate('/admin/cafee-services');
        }
      } catch (error) {
        logger.error('Error loading service:', error);
        navigate('/admin/cafee-services');
      }
    };

    loadService();
  }, [id, navigate]);

  const handleInputChange = (field: keyof Service) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!service) return;
    
    setService(prev => ({
      ...prev!,
      [field]: e.target.value
    }));
    setIsEditing(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !service) return;

    setUploading(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const result = await CloudinaryService.uploadImage(file, 'cafee-services');
          newImages.push(result.url);
        }
      }

      setService(prev => ({
        ...prev!,
        images: [...(prev.images || []), ...newImages],
        featured_image: !prev.featured_image && newImages.length > 0 ? newImages[0] : prev.featured_image
      }));
      setIsEditing(true);
    } catch (error) {
      logger.error('Error uploading images:', error);
      alert('Erreur lors de l\'upload des images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (!service) return;
    
    setService(prev => ({
      ...prev!,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
    setIsEditing(true);
  };

  const handleSetFeatured = (imageUrl: string) => {
    if (!service) return;
    
    setService(prev => ({
      ...prev!,
      featured_image: imageUrl
    }));
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!service || !id) return;

    setLoading(true);
    try {
      await DatabaseService.updateService(id, service);
      setIsEditing(false);
    } catch (error) {
      logger.error('Error updating service:', error);
      alert('Erreur lors de la mise à jour du service');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!service || !id) return;

    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ? Cette action est irréversible.')) {
      return;
    }

    try {
      await DatabaseService.deleteService(id);
      navigate('/admin/cafee-services');
    } catch (error) {
      logger.error('Error deleting service:', error);
      alert('Erreur lors de la suppression du service');
    }
  };

  if (!service) {
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
            onClick={() => navigate('/admin/cafee-services')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isEditing ? 'Modifier' : 'Détails'}: {service.title}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Edit className="h-5 w-5 mr-2 text-terracotta" />
                Informations du Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title">Titre du service</Label>
                    <Input
                      id="title"
                      value={service.title}
                      onChange={handleInputChange('title')}
                      placeholder="Ex: Cours de Dessin"
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Prix (FCFA)</Label>
                    <Input
                      id="price"
                      value={service.price || ''}
                      onChange={handleInputChange('price')}
                      placeholder="15000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={service.description}
                      onChange={handleInputChange('description')}
                      placeholder="Décrivez votre service en détail..."
                      rows={4}
                    />
                  </div>

                </div>

                <div>
                  <Label htmlFor="status">Statut</Label>
                  <select
                    id="status"
                    value={service.status}
                    onChange={(e) => {
                      setService(prev => ({ ...prev!, status: e.target.value }));
                      setIsEditing(true);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>

                <div className="pt-2">
                  <Label>Informations système</Label>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>ID: {service.id}</p>
                    <p>Créé le: {new Date(service.created_at).toLocaleDateString('fr-FR')}</p>
                    <p>Images: {service.images?.length || 0}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Images Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Images du Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload Button */}
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={uploading}
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? 'Upload...' : 'Ajouter des images'}
                </Button>
              </div>

              {/* Images Grid */}
              {service.images && service.images.length > 0 && (
                <div className="space-y-2">
                  <Label>Images ({service.images.length})</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {service.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={image} 
                          alt={`Service image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                        />
                        
                        {/* Remove Button */}
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>

                        {/* Set Featured Button */}
                        {service.featured_image !== image && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute bottom-1 left-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleSetFeatured(image)}
                          >
                            <Coffee className="h-3 w-3" />
                          </Button>
                        )}

                        {/* Featured Badge */}
                        {service.featured_image === image && (
                          <div className="absolute top-1 left-1 bg-terracotta text-white text-xs px-2 py-1 rounded">
                            Vedette
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(!service.images || service.images.length === 0) && (
                <div className="text-center py-8">
                  <Coffee className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Aucune image
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { AdminCafeeServiceView };
