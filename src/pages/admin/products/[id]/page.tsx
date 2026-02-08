// src/pages/admin/products/[id]/page.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Trash2,
  Image as ImageIcon,
  Edit
} from 'lucide-react';
import logger from '@/lib/logger';

export default function AdminProductView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await DatabaseService.getProducts();
        const foundProduct = products.find(p => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          navigate('/admin/products');
        }
      } catch (error) {
        logger.error('Error loading product:', error);
        navigate('/admin/products');
      }
    };

    loadProduct();
  }, [id, navigate]);

  const loadProduct = async () => {
    try {
      const products = await DatabaseService.getProducts();
      const foundProduct = products.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/admin/products');
      }
    } catch (error) {
      logger.error('Error loading product:', error);
      navigate('/admin/products');
    }
  };

  const handleInputChange = (field: keyof Product) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!product) return;
    
    setProduct(prev => ({
      ...prev!,
      [field]: e.target.value
    }));
    setIsEditing(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !product) return;

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
    if (!product) return;
    
    setProduct(prev => ({
      ...prev!,
      images: prev.images?.filter((_, i) => i !== index) || []
    }));
    setIsEditing(true);
  };

  const handleSetFeatured = (imageUrl: string) => {
    if (!product) return;
    
    setProduct(prev => ({
      ...prev!,
      featured_image: imageUrl
    }));
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!product || !id) return;

    setLoading(true);
    try {
      await DatabaseService.updateProduct(id, product);
      setIsEditing(false);
    } catch (error) {
      logger.error('Error updating product:', error);
      alert('Erreur lors de la mise à jour du produit');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!product || !id) return;

    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.')) {
      return;
    }

    try {
      await DatabaseService.deleteProduct(id);
      navigate('/admin/products');
    } catch (error) {
      logger.error('Error deleting product:', error);
      alert('Erreur lors de la suppression du produit');
    }
  };

  if (!product) {
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
            onClick={() => navigate('/admin/products')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isEditing ? 'Modifier' : 'Détails'}: {product.name}
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
                Informations du Produit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nom du produit</Label>
                    <Input
                      id="name"
                      value={product.name}
                      onChange={handleInputChange('name')}
                      placeholder="Ex: T-shirt Fernanden"
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Prix (FCFA)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={product.price}
                      onChange={handleInputChange('price')}
                      placeholder="15000"
                      min="0"
                      step="100"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={product.description}
                    onChange={handleInputChange('description')}
                    placeholder="Décrivez votre produit en détail..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="status">Statut</Label>
                  <select
                    id="status"
                    value={product.status}
                    onChange={(e) => {
                      setProduct(prev => ({ ...prev!, status: e.target.value }));
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
                    <p>ID: {product.id}</p>
                    <p>Créé le: {new Date(product.created_at).toLocaleDateString('fr-FR')}</p>
                    <p>Images: {product.images?.length || 0}</p>
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
                  <Label>Images ({product.images.length})</Label>
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

              {(!product.images || product.images.length === 0) && (
                <div className="text-center py-8">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
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

export { AdminProductView };
