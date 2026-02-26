// src/pages/admin/products/[id]/index.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DatabaseService, Product } from '@/services/DatabaseService';
import { ArrowLeft, Edit } from 'lucide-react';

export function AdminProductView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    try {
      const data = await DatabaseService.getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
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

  if (!product) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Produit non trouvé</p>
          <Button onClick={() => navigate('/admin/products')} className="mt-4">
            Retour aux produits
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/admin/products')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold">{product.name}</h1>
        </div>
        <Button onClick={() => navigate(`/admin/products/edit/${product.id}`)}>
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                {product.featured_image ? (
                  <img
                    src={product.featured_image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-4xl">📦</span>
                )}
              </div>
              <div>
                <Badge variant={product.status === 'published' ? 'default' : 'secondary'}>
                  {product.status}
                </Badge>
                {product.featured && (
                  <Badge variant="outline" className="ml-2 bg-yellow-100">⭐ Featured</Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Catégorie</span>
                <p>{product.category}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Prix</span>
                <p>{product.price}</p>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-600">Description</span>
              <p className="text-gray-800">{product.description}</p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-600">Matériaux</span>
              <p>{product.materials}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-600">Stock</span>
              <p>{product.inventory_count} unités</p>
            </div>

            {product.sizes_available && product.sizes_available.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-600">Tailles disponibles</span>
                <div className="flex gap-2 mt-1">
                  {product.sizes_available.map((size) => (
                    <Badge key={size} variant="outline">{size}</Badge>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-sm font-medium text-gray-600">Couleurs</span>
                <div className="flex gap-2 mt-1">
                  {product.colors.map((color) => (
                    <Badge key={color} variant="outline">{color}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminProductView;
