// src/pages/admin/products/page.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DatabaseService, Product } from '@/services/DatabaseService';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  Filter
} from 'lucide-react';
import logger from '@/lib/logger';

export default function AdminProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    loadProducts();
    
    // Vérifier si on doit créer un nouveau produit
    if (searchParams.get('action') === 'new') {
      navigate('/admin/products/new');
    }
  }, [navigate, searchParams]);

  const loadProducts = async () => {
    try {
      const data = await DatabaseService.getProducts();
      setProducts(data);
    } catch (error) {
      logger.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    try {
      await DatabaseService.deleteProduct(id);
      await loadProducts();
    } catch (error) {
      logger.error('Error deleting product:', error);
      alert('Erreur lors de la suppression du produit');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'Tous', color: 'bg-gray-500' },
    { value: 'active', label: 'Actifs', color: 'bg-green-500' },
    { value: 'inactive', label: 'Inactifs', color: 'bg-red-500' }
  ];

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
            Produits
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez votre catalogue de produits
          </p>
        </div>
        
        <Button onClick={() => navigate('/admin/products/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un Produit
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
                  placeholder="Rechercher un produit..."
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

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'Aucun produit trouvé' : 'Aucun produit'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Essayez une autre recherche' : 'Commencez par ajouter votre premier produit'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <Badge 
                    variant={product.status === 'active' ? 'default' : 'secondary'}
                    className="ml-2"
                  >
                    {product.status === 'active' ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Product Images */}
                {product.images && product.images.length > 0 && (
                  <div className="mb-4">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {product.images.length > 1 && (
                      <p className="text-xs text-gray-500 mt-1">
                        +{product.images.length - 1} autre(s) image(s)
                      </p>
                    )}
                  </div>
                )}

                {/* Product Info */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-terracotta">
                    {product.price ? `${product.price} FCFA` : 'Prix non défini'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/admin/products/${product.id}`)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(product.id)}
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

export { AdminProductsList };
