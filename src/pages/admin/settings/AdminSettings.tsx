// src/pages/admin/settings/AdminSettings.tsx
import React, { useState, useEffect } from 'react';
import logger from '@/lib/logger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  Save, 
  Settings, 
  Globe, 
  Mail, 
  Phone,
  MapPin,
  Palette,
  Shield,
  Database
} from 'lucide-react';

interface SiteSettings {
  site_name: string;
  site_description: string;
  site_url: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  maintenance_mode: boolean;
  allow_registration: boolean;
  email_notifications: boolean;
  theme_primary_color: string;
  theme_secondary_color: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  social_facebook?: string;
  social_twitter?: string;
  social_instagram?: string;
  social_linkedin?: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'Fernanden',
    site_description: 'Plateforme complète pour les services CafEE et SHE',
    site_url: 'https://fernanden.com',
    contact_email: 'contact@fernanden.com',
    contact_phone: '+221 123456789',
    contact_address: 'Abidjan, Côte d\'Ivoire',
    maintenance_mode: false,
    allow_registration: true,
    email_notifications: true,
    theme_primary_color: '#DC2626',
    theme_secondary_color: '#7C2D12',
    seo_title: 'Fernanden - Services CafEE et SHE',
    seo_description: 'Découvrez nos services d\'éducation, formation, événements et décoration',
    seo_keywords: ['education', 'formation', 'evenements', 'decoration', 'abidjan'],
    social_facebook: '',
    social_twitter: '',
    social_instagram: '',
    social_linkedin: ''
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'seo' | 'social'>('general');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Simulation - Remplacer par appel API réel
      logger.info('Loading settings...');
    } catch (error) {
      logger.error('Error loading settings:', error);
    }
  };

  const handleInputChange = (field: keyof SiteSettings) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = field === 'maintenance_mode' || field === 'allow_registration' || field === 'email_notifications' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleKeywordChange = (index: number, value: string) => {
    setSettings(prev => ({
      ...prev,
      seo_keywords: prev.seo_keywords.map((keyword, i) => i === index ? value : keyword)
    }));
  };

  const addKeyword = () => {
    setSettings(prev => ({
      ...prev,
      seo_keywords: [...prev.seo_keywords, '']
    }));
  };

  const removeKeyword = (index: number) => {
    setSettings(prev => ({
      ...prev,
      seo_keywords: prev.seo_keywords.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulation - Remplacer par appel API réel
      logger.info('Saving settings:', settings);
      alert('Paramètres sauvegardés avec succès');
    } catch (error) {
      logger.error('Error saving settings:', error);
      alert('Erreur lors de la sauvegarde des paramètres');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'seo', label: 'SEO', icon: Globe },
    { id: 'social', label: 'Réseaux Sociaux', icon: Mail }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Paramètres du Site
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configurez les paramètres généraux de votre site
          </p>
        </div>
        
        <Button 
          onClick={handleSave}
          disabled={loading}
          className="bg-terracotta hover:bg-terracotta/90"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as 'general' | 'appearance' | 'seo' | 'social')}
              className="flex items-center"
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Content */}
        <div className="lg:col-span-2">
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-terracotta" />
                  Paramètres Généraux
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="site_name">Nom du site</Label>
                  <Input
                    id="site_name"
                    value={settings.site_name}
                    onChange={handleInputChange('site_name')}
                    placeholder="Nom de votre site"
                  />
                </div>

                <div>
                  <Label htmlFor="site_description">Description du site</Label>
                  <Textarea
                    id="site_description"
                    value={settings.site_description}
                    onChange={handleInputChange('site_description')}
                    placeholder="Description courte de votre site"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="site_url">URL du site</Label>
                  <Input
                    id="site_url"
                    value={settings.site_url}
                    onChange={handleInputChange('site_url')}
                    placeholder="https://votresite.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact_email">Email de contact</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={settings.contact_email}
                      onChange={handleInputChange('contact_email')}
                      placeholder="contact@votresite.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact_phone">Téléphone de contact</Label>
                    <Input
                      id="contact_phone"
                      value={settings.contact_phone}
                      onChange={handleInputChange('contact_phone')}
                      placeholder="+221 123456789"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact_address">Adresse</Label>
                  <Textarea
                    id="contact_address"
                    value={settings.contact_address}
                    onChange={handleInputChange('contact_address')}
                    placeholder="Votre adresse complète"
                    rows={2}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="maintenance_mode"
                      checked={settings.maintenance_mode}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, maintenance_mode: checked }))}
                    />
                    <Label htmlFor="maintenance_mode">Mode maintenance</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="allow_registration"
                      checked={settings.allow_registration}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, allow_registration: checked }))}
                    />
                    <Label htmlFor="allow_registration">Autoriser les inscriptions</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="email_notifications"
                      checked={settings.email_notifications}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, email_notifications: checked }))}
                    />
                    <Label htmlFor="email_notifications">Notifications par email</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2 text-terracotta" />
                  Apparence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="theme_primary_color">Couleur principale</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="theme_primary_color"
                        type="color"
                        value={settings.theme_primary_color}
                        onChange={handleInputChange('theme_primary_color')}
                        className="w-16 h-10"
                      />
                      <Input
                        value={settings.theme_primary_color}
                        onChange={handleInputChange('theme_primary_color')}
                        placeholder="#DC2626"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="theme_secondary_color">Couleur secondaire</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="theme_secondary_color"
                        type="color"
                        value={settings.theme_secondary_color}
                        onChange={handleInputChange('theme_secondary_color')}
                        className="w-16 h-10"
                      />
                      <Input
                        value={settings.theme_secondary_color}
                        onChange={handleInputChange('theme_secondary_color')}
                        placeholder="#7C2D12"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Aperçu</h4>
                  <div className="space-y-2">
                    <div 
                      className="p-4 rounded text-white"
                      style={{ backgroundColor: settings.theme_primary_color }}
                    >
                      Couleur principale
                    </div>
                    <div 
                      className="p-4 rounded text-white"
                      style={{ backgroundColor: settings.theme_secondary_color }}
                    >
                      Couleur secondaire
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'seo' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-terracotta" />
                  SEO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="seo_title">Titre SEO</Label>
                  <Input
                    id="seo_title"
                    value={settings.seo_title}
                    onChange={handleInputChange('seo_title')}
                    placeholder="Titre pour les moteurs de recherche"
                  />
                </div>

                <div>
                  <Label htmlFor="seo_description">Description SEO</Label>
                  <Textarea
                    id="seo_description"
                    value={settings.seo_description}
                    onChange={handleInputChange('seo_description')}
                    placeholder="Description pour les moteurs de recherche"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Mots-clés SEO</Label>
                  <div className="space-y-2">
                    {settings.seo_keywords.map((keyword, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={keyword}
                          onChange={(e) => handleKeywordChange(index, e.target.value)}
                          placeholder="Mot-clé"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeKeyword(index)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={addKeyword}>
                      Ajouter un mot-clé
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'social' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-terracotta" />
                  Réseaux Sociaux
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="social_facebook">Facebook</Label>
                  <Input
                    id="social_facebook"
                    value={settings.social_facebook || ''}
                    onChange={handleInputChange('social_facebook')}
                    placeholder="https://facebook.com/votrepage"
                  />
                </div>

                <div>
                  <Label htmlFor="social_twitter">Twitter</Label>
                  <Input
                    id="social_twitter"
                    value={settings.social_twitter || ''}
                    onChange={handleInputChange('social_twitter')}
                    placeholder="https://twitter.com/votrecompte"
                  />
                </div>

                <div>
                  <Label htmlFor="social_instagram">Instagram</Label>
                  <Input
                    id="social_instagram"
                    value={settings.social_instagram || ''}
                    onChange={handleInputChange('social_instagram')}
                    placeholder="https://instagram.com/votrecompte"
                  />
                </div>

                <div>
                  <Label htmlFor="social_linkedin">LinkedIn</Label>
                  <Input
                    id="social_linkedin"
                    value={settings.social_linkedin || ''}
                    onChange={handleInputChange('social_linkedin')}
                    placeholder="https://linkedin.com/in/votreprofil"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Info Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-terracotta" />
                Informations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Sauvegarde automatique
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  Les paramètres sont sauvegardés automatiquement chaque fois que vous cliquez sur le bouton "Sauvegarder".
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  Mode maintenance
                </h4>
                <p className="text-sm text-yellow-600 dark:text-yellow-300">
                  {settings.maintenance_mode 
                    ? 'Le site est actuellement en mode maintenance. Seuls les administrateurs peuvent y accéder.' 
                    : 'Le site est accessible à tous les visiteurs.'
                  }
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                  Notifications
                </h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  {settings.email_notifications 
                    ? 'Les notifications par email sont activées.' 
                    : 'Les notifications par email sont désactivées.'
                  }
                </p>
              </div>

              <div className="text-sm text-gray-500 space-y-2">
                <p>Dernière sauvegarde: {new Date().toLocaleDateString('fr-FR')}</p>
                <p>Version: 1.0.0</p>
                <p>Environment: Production</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { AdminSettings };
