// src/pages/admin/products/new/page.tsx
import React, { useState } from 'react';
import logger from '@/lib/logger';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatabaseService, Product } from '@/services/DatabaseService';
import { CloudinaryService } from '@/services/CloudinaryService';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  X,
  Image as ImageIcon
} from 'lucide-react';

export default function AdminProductForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [product, setProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: '',
    status: 'active',
    images: [],
    featured_image: ''
  });

  const handleInputChange = (field: keyof Product) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const result = await CloudinaryService.uploadImage(file, 'products');
          newImages.push(result.url);
        }
      }

      setProduct(prev => ({
        ...prev,
        images: [...(prev.images || []), ...newImages],
        featured_image: !prev.featured_image && newImages.length > 0 ? newImages[0] : prev.featured_image
      }));
    } catch (error) {
      logger.error('Error uploading images:', error);
      alert('Erreur lors de l\'upload des images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSetFeatured = (imageUrl: string) => {
    setProduct(prev => ({
      ...prev,
      featured_image: imageUrl
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!product.name || !product.description) {
        alert('Le nom et la description sont obligatoires');
        return;
      }

      await DatabaseService.createProduct(product as Omit<Product, 'id' | 'created_at'>);
      navigate('/admin/products');
    } catch (error) {
      logger.error('Error creating product:', error);
      alert('Erreur lors de la création du produit');
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
          onClick={() => navigate('/admin/products')}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Nouveau Produit
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ajoutez un nouveau produit à votre catalogue
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations du Produit</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nom du produit *</Label>
                    <Input
                      id="name"
                      value={product.name || ''}
                      onChange={handleInputChange('name')}
                      placeholder="Ex: T-shirt Fernanden"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Prix (FCFA)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={product.price || ''}
                      onChange={handleInputChange('price')}
                      placeholder="15000"
                      min="0"
                      step="100"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={product.description || ''}
                    onChange={handleInputChange('description')}
                    placeholder="Décrivez votre produit en détail..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="status">Statut</Label>
                  <select
                    id="status"
                    value={product.status || 'active'}
                    onChange={(e) => setProduct(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Création...' : 'Créer le Produit'}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/admin/products')}
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Images Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Images du Produit</CardTitle>
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
              {product.images && product.images.length > 0 && (
                <div className="space-y-2">
                  <Label>Images uploadées</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={image} 
                          alt={`Product image ${index + 1}`}
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
                        {product.featured_image !== image && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute bottom-1 left-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleSetFeatured(image)}
                          >
                            <ImageIcon className="h-3 w-3" />
                          </Button>
                        )}

                        {/* Featured Badge */}
                        {product.featured_image === image && (
                          <div className="absolute top-1 left-1 bg-terracotta text-white text-xs px-2 py-1 rounded">
                            Vedette
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {product.images && product.images.length === 0 && (
                <div className="text-center py-8">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Aucune image ajoutée
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

export { AdminProductForm };
