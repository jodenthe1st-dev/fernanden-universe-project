// src/pages/admin/products/new/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { DatabaseService, Product } from '@/services/DatabaseService';
import { ArrowLeft, Save } from 'lucide-react';

export function AdminProductForm() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    category: '',
    price: '',
    status: 'draft',
    featured: false,
    inventory_count: 0,
    images: [],
    sizes_available: [],
    colors: [],
    materials: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await DatabaseService.createProduct(formData as Omit<Product, 'id' | 'created_at'>);
      navigate('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof Product, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => navigate('/admin/products')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold">Nouveau Produit</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">Nom</label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Nom du produit"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Description du produit"
                className="w-full p-2 border rounded-md min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="text-sm font-medium">Catégorie</label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  placeholder="Catégorie"
                />
              </div>
              <div>
                <label htmlFor="price" className="text-sm font-medium">Prix</label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="Prix"
                />
              </div>
            </div>

            <div>
              <label htmlFor="materials" className="text-sm font-medium">Matériaux</label>
              <Input
                id="materials"
                value={formData.materials}
                onChange={(e) => handleChange('materials', e.target.value)}
                placeholder="Matériaux utilisés"
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
                <label htmlFor="featured" className="text-sm">Produit en vedette</label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminProductForm;
