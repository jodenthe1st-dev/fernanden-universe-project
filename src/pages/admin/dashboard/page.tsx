// src/pages/admin/dashboard/page.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DatabaseService } from '@/services/DatabaseService';
import { useAuth } from '@/contexts/AuthContext';
import logger from '@/lib/logger';
import { Package, Mic, Briefcase, Image as ImageIcon, Settings, TrendingUp, Eye, Clock } from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  totalPodcasts: number;
  totalServices: number;
  totalMedia: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalPodcasts: 0,
    totalServices: 0,
    totalMedia: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [products, podcasts, services, media] = await Promise.all([
        DatabaseService.getProducts(),
        DatabaseService.getPodcasts(),
        DatabaseService.getServices(),
        DatabaseService.getMedia()
      ]);

      setStats({
        totalProducts: products.length,
        totalPodcasts: podcasts.length,
        totalServices: services.length,
        totalMedia: media.length,
        recentActivity: []
      });
    } catch (error) {
      logger.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    {
      title: 'Produits',
      count: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      href: '/admin/products'
    },
    {
      title: 'Podcasts',
      count: stats.totalPodcasts,
      icon: Mic,
      color: 'bg-green-500',
      href: '/admin/podcasts'
    },
    {
      title: 'Services',
      count: stats.totalServices,
      icon: Briefcase,
      color: 'bg-purple-500',
      href: '/admin/services'
    },
    {
      title: 'Médias',
      count: stats.totalMedia,
      icon: ImageIcon,
      color: 'bg-orange-500',
      href: '/admin/media'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Bienvenue, {user?.name || 'Administrateur'} !
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Voici un aperçu de votre site Fernanden
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${item.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {item.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {item.count}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-terracotta" />
                Actions Rapides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate('/admin/products/new')}
              >
                <Package className="h-4 w-4 mr-2" />
                Ajouter un Produit
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate('/admin/podcasts/new')}
              >
                <Mic className="h-4 w-4 mr-2" />
                Ajouter un Podcast
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => navigate('/admin/blog/new')}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Ajouter un Article Blog
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-terracotta" />
                Vue d'Ensemble
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total des contenus
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {stats.totalProducts + stats.totalPodcasts + stats.totalServices}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Fichiers médias
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {stats.totalMedia}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Dernière mise à jour
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Maintenant
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
