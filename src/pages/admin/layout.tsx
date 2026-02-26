// src/pages/admin/layout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Package, Mic, Briefcase, Image as ImageIcon, FileText, MessageSquare, Settings, Users, LogOut, BarChart3 } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
}

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 1024;
  });
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (user?.role !== 'admin') {
        navigate('/admin/login');
      }
    }
  }, [user, isLoading, navigate]);

  const handleLogout = async () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Tableau de Bord',
      icon: BarChart3,
      href: '/admin/dashboard'
    },
    {
      id: 'products',
      label: 'Produits',
      icon: Package,
      href: '/admin/products'
    },
    {
      id: 'podcasts',
      label: 'Podcasts',
      icon: Mic,
      href: '/admin/podcasts'
    },
    {
      id: 'services',
      label: 'Services',
      icon: Briefcase,
      href: '/admin/services'
    },
    {
      id: 'media',
      label: 'Médias',
      icon: ImageIcon,
      href: '/admin/media'
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: FileText,
      href: '/admin/blog'
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: MessageSquare,
      href: '/admin/contacts'
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: Settings,
      href: '/admin/settings'
    }
  ];

  const isActive = (href: string) => {
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className={`font-bold text-xl text-gray-900 dark:text-white ${!sidebarOpen && 'hidden'}`}>
            F
          </h1>
          <h1 className={`font-bold text-xl text-gray-900 dark:text-white ${sidebarOpen && 'block'}`}>
            Fernanden Admin
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="mt-8 px-2">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className={`w-full justify-start ${!sidebarOpen && 'px-2'} ${isActive(item.href) ? 'bg-terracotta hover:bg-terracotta/90' : ''}`}
                  onClick={() => navigate(item.href)}
                >
                  <Icon className="h-4 w-4" />
                  {sidebarOpen && (
                    <>
                      <span className="ml-3">{item.label}</span>
                      {Boolean(item.badge && item.badge > 0) && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              );
            })}
          </div>
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-terracotta rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name || 'Admin'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} transition-all duration-300 ease-in-out`}>
        {/* Mobile Header */}
        <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.name || 'Admin'}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Fermer le menu"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSidebarOpen(false);
            }
          }}
        />
      )}
    </div>
  );
}

