// src/pages/admin/settings/AdminSettings.tsx
import React, { useState, useEffect } from 'react';
import logger from '@/lib/logger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { SiteSettingsService } from '@/integrations/supabase/services/siteSettings';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { showSuccessToast, showErrorToast } from '@/lib/toast';
import {
  Save,
  Settings as SettingsIcon,
  Globe,
  Mail,
  Palette,
  Shield,
  Database,
  Lock,
  RefreshCw,
} from 'lucide-react';

interface SiteSettingsForm {
  site_name: string;
  site_description: string;
  site_url: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  maintenance_mode: boolean;
  email_notifications: boolean;
  theme_primary_color: string;
  theme_secondary_color: string;
  seo_title: string;
  seo_description: string;
  social_facebook: string;
  social_twitter: string;
  social_instagram: string;
  social_linkedin: string;
  social_tiktok: string;
}

const defaultForm: SiteSettingsForm = {
  site_name: 'Fernanden',
  site_description: 'Design 3-en-1 aux multiples facettes.',
  site_url: 'https://fernanden.com',
  contact_email: 'fernandenentreprises@gmail.com',
  contact_phone: '+229 01 97 51 26 36',
  contact_address: 'Cotonou, Bénin',
  maintenance_mode: false,
  email_notifications: true,
  theme_primary_color: '#DC2626',
  theme_secondary_color: '#D97706',
  seo_title: 'Fernanden — Design 3-en-1',
  seo_description: 'Découvrez SHE, DENSE et CaFEE : design d\'espace, mode et éducation.',
  social_facebook: '',
  social_twitter: '',
  social_instagram: '',
  social_linkedin: '',
  social_tiktok: '',
};

export function AdminSettings() {
  const { refreshSettings } = useSiteSettings();
  const [form, setForm] = useState<SiteSettingsForm>(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'seo' | 'social' | 'security'>('general');
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    newEmail: '',
  });
  const [securityLoading, setSecurityLoading] = useState(false);
  const [securityMessage, setSecurityMessage] = useState('');
  const [securityError, setSecurityError] = useState('');

  // ─── Chargement depuis Supabase ───────────────────────────────────────────
  const loadSettings = async () => {
    try {
      setLoading(true);
      const raw = await SiteSettingsService.getAsObject();
      setForm(prev => ({
        ...prev,
        ...(raw as Partial<SiteSettingsForm>),
      }));
    } catch (error) {
      logger.error('Error loading settings:', error);
      showErrorToast('Impossible de charger les paramètres.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // ─── Sauvegarde vers Supabase ─────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    try {
      // Sauvegarde de chaque clé modifiée
      const entries = Object.entries(form) as [string, unknown][];
      await Promise.all(
        entries.map(([key, value]) =>
          SiteSettingsService.updateByKey(key, value as Parameters<typeof SiteSettingsService.updateByKey>[1])
        )
      );
      // Rafraîchit le contexte global pour que Header/Footer etc. voient les nouvelles valeurs
      await refreshSettings();
      showSuccessToast('Paramètres sauvegardés avec succès !');
    } catch (error) {
      logger.error('Error saving settings:', error);
      showErrorToast('Erreur lors de la sauvegarde. Vérifiez les permissions RLS Supabase.');
    } finally {
      setSaving(false);
    }
  };

  // ─── Sécurité via Supabase Auth ───────────────────────────────────────────
  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError('');
    setSecurityMessage('');

    if (securityForm.newPassword && securityForm.newPassword.length < 8) {
      setSecurityError('Le nouveau mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (securityForm.newPassword && securityForm.newPassword !== securityForm.confirmPassword) {
      setSecurityError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!securityForm.newPassword && !securityForm.newEmail) {
      setSecurityError('Veuillez remplir au moins un champ à modifier.');
      return;
    }

    setSecurityLoading(true);
    try {
      const { supabase } = await import('@/integrations/supabase/client');

      if (securityForm.newPassword) {
        const { error } = await supabase.auth.updateUser({ password: securityForm.newPassword });
        if (error) throw error;
      }
      if (securityForm.newEmail) {
        const { error } = await supabase.auth.updateUser({ email: securityForm.newEmail });
        if (error) throw error;
      }

      setSecurityMessage('Paramètres de sécurité mis à jour avec succès.');
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '', newEmail: '' });
      setTimeout(() => setSecurityMessage(''), 4000);
    } catch (error) {
      logger.error('Security update failed:', error);
      setSecurityError(error instanceof Error ? error.message : 'Erreur lors de la mise à jour.');
    } finally {
      setSecurityLoading(false);
    }
  };

  const tabs = [
    { id: 'general' as const, label: 'Général', icon: SettingsIcon },
    { id: 'appearance' as const, label: 'Apparence', icon: Palette },
    { id: 'seo' as const, label: 'SEO', icon: Globe },
    { id: 'social' as const, label: 'Réseaux Sociaux', icon: Mail },
    { id: 'security' as const, label: 'Sécurité', icon: Shield },
  ];

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-terracotta" />
          <p className="text-gray-600 dark:text-gray-400">Chargement des paramètres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Paramètres du Site
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Configurez les paramètres généraux — les changements sont sauvegardés en base de données.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-terracotta hover:bg-terracotta/90 shrink-0"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
      </div>

      {/* Tabs — responsive avec flex-wrap */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 ${activeTab === tab.id ? 'bg-terracotta hover:bg-terracotta/90' : ''}`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </Button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">

          {/* ── GÉNÉRAL ── */}
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5 text-terracotta" />
                  Paramètres Généraux
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site_name">Nom du site</Label>
                  <Input id="site_name" value={form.site_name} onChange={e => setForm(p => ({ ...p, site_name: e.target.value }))} placeholder="Fernanden" />
                </div>
                <div>
                  <Label htmlFor="site_description">Description</Label>
                  <Textarea id="site_description" value={form.site_description} onChange={e => setForm(p => ({ ...p, site_description: e.target.value }))} rows={3} />
                </div>
                <div>
                  <Label htmlFor="site_url">URL du site</Label>
                  <Input id="site_url" value={form.site_url} onChange={e => setForm(p => ({ ...p, site_url: e.target.value }))} placeholder="https://fernanden.com" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact_email">Email de contact</Label>
                    <Input id="contact_email" type="email" value={form.contact_email} onChange={e => setForm(p => ({ ...p, contact_email: e.target.value }))} />
                  </div>
                  <div>
                    <Label htmlFor="contact_phone">Téléphone</Label>
                    <Input id="contact_phone" value={form.contact_phone} onChange={e => setForm(p => ({ ...p, contact_phone: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contact_address">Adresse</Label>
                  <Textarea id="contact_address" value={form.contact_address} onChange={e => setForm(p => ({ ...p, contact_address: e.target.value }))} rows={2} />
                </div>
                <div className="space-y-3 pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance_mode" className="font-medium">Mode maintenance</Label>
                      <p className="text-xs text-muted-foreground">Affiche une page de maintenance pour les visiteurs</p>
                    </div>
                    <Switch
                      id="maintenance_mode"
                      checked={form.maintenance_mode}
                      onCheckedChange={checked => setForm(p => ({ ...p, maintenance_mode: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email_notifications" className="font-medium">Notifications email</Label>
                      <p className="text-xs text-muted-foreground">Recevez les notifications de contact par email</p>
                    </div>
                    <Switch
                      id="email_notifications"
                      checked={form.email_notifications}
                      onCheckedChange={checked => setForm(p => ({ ...p, email_notifications: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── APPARENCE ── */}
          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-terracotta" />
                  Apparence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="theme_primary_color">Couleur principale</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input id="theme_primary_color" type="color" value={form.theme_primary_color} onChange={e => setForm(p => ({ ...p, theme_primary_color: e.target.value }))} className="w-14 h-10 p-1 cursor-pointer" />
                      <Input value={form.theme_primary_color} onChange={e => setForm(p => ({ ...p, theme_primary_color: e.target.value }))} placeholder="#DC2626" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="theme_secondary_color">Couleur secondaire</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input id="theme_secondary_color" type="color" value={form.theme_secondary_color} onChange={e => setForm(p => ({ ...p, theme_secondary_color: e.target.value }))} className="w-14 h-10 p-1 cursor-pointer" />
                      <Input value={form.theme_secondary_color} onChange={e => setForm(p => ({ ...p, theme_secondary_color: e.target.value }))} placeholder="#D97706" className="flex-1" />
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3 text-sm">Aperçu</h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded text-white text-sm" style={{ backgroundColor: form.theme_primary_color }}>
                      Couleur principale — {form.theme_primary_color}
                    </div>
                    <div className="p-3 rounded text-white text-sm" style={{ backgroundColor: form.theme_secondary_color }}>
                      Couleur secondaire — {form.theme_secondary_color}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Note : ces valeurs sont sauvegardées en base de données. Pour appliquer les couleurs au thème CSS, les variables doivent être synchronisées dans <code>index.css</code>.
                </p>
              </CardContent>
            </Card>
          )}

          {/* ── SEO ── */}
          {activeTab === 'seo' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-terracotta" />
                  SEO &amp; Référencement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seo_title">Titre SEO</Label>
                  <Input id="seo_title" value={form.seo_title} onChange={e => setForm(p => ({ ...p, seo_title: e.target.value }))} placeholder="Fernanden — Design 3-en-1" />
                  <p className="text-xs text-muted-foreground mt-1">{form.seo_title.length}/60 caractères recommandés</p>
                </div>
                <div>
                  <Label htmlFor="seo_description">Description SEO</Label>
                  <Textarea id="seo_description" value={form.seo_description} onChange={e => setForm(p => ({ ...p, seo_description: e.target.value }))} rows={3} placeholder="Description visible dans les résultats Google" />
                  <p className="text-xs text-muted-foreground mt-1">{form.seo_description.length}/160 caractères recommandés</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-blue-700 dark:text-blue-300">
                  💡 Ces valeurs sont utilisées par le composant <code>PageMeta</code> sur chaque page publique.
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── RÉSEAUX SOCIAUX ── */}
          {activeTab === 'social' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-terracotta" />
                  Réseaux Sociaux
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'social_facebook' as const, label: 'Facebook', placeholder: 'https://facebook.com/votrepage' },
                  { key: 'social_instagram' as const, label: 'Instagram', placeholder: 'https://instagram.com/votrecompte' },
                  { key: 'social_tiktok' as const, label: 'TikTok', placeholder: 'https://tiktok.com/@votrecompte' },
                  { key: 'social_linkedin' as const, label: 'LinkedIn', placeholder: 'https://linkedin.com/company/...' },
                  { key: 'social_twitter' as const, label: 'Twitter/X', placeholder: 'https://twitter.com/votrecompte' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                      id={key}
                      value={form[key]}
                      onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                      placeholder={placeholder}
                    />
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-2">
                  Ces liens s'affichent dans le Footer du site. Les champs vides sont automatiquement masqués.
                </p>
              </CardContent>
            </Card>
          )}

          {/* ── SÉCURITÉ ── */}
          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-terracotta" />
                  Sécurité &amp; Authentification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSecuritySubmit} className="space-y-6">
                  {securityMessage && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-md text-sm">
                      ✅ {securityMessage}
                    </div>
                  )}
                  {securityError && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md text-sm">
                      ❌ {securityError}
                    </div>
                  )}

                  <div className="border-b pb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Modifier le mot de passe</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                        <Input id="newPassword" type="password" value={securityForm.newPassword} onChange={e => setSecurityForm(p => ({ ...p, newPassword: e.target.value }))} placeholder="••••••••" disabled={securityLoading} />
                        <p className="text-xs text-muted-foreground mt-1">Min. 8 caractères</p>
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                        <Input id="confirmPassword" type="password" value={securityForm.confirmPassword} onChange={e => setSecurityForm(p => ({ ...p, confirmPassword: e.target.value }))} placeholder="••••••••" disabled={securityLoading} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Modifier l'email admin</h3>
                    <Input id="newEmail" type="email" value={securityForm.newEmail} onChange={e => setSecurityForm(p => ({ ...p, newEmail: e.target.value }))} placeholder="nouvel@email.com" disabled={securityLoading} />
                    <p className="text-xs text-muted-foreground mt-1">Un email de confirmation sera envoyé à l'adresse actuelle.</p>
                  </div>

                  <div>
                    <Label htmlFor="currentPassword">Mot de passe actuel (optionnel)</Label>
                    <Input id="currentPassword" type="password" value={securityForm.currentPassword} onChange={e => setSecurityForm(p => ({ ...p, currentPassword: e.target.value }))} placeholder="••••••••" disabled={securityLoading} />
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" disabled={securityLoading} className="bg-terracotta hover:bg-terracotta/90">
                      {securityLoading ? 'Mise à jour...' : 'Mettre à jour'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => { setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '', newEmail: '' }); setSecurityError(''); setSecurityMessage(''); }} disabled={securityLoading}>
                      Annuler
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Info Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-terracotta" />
                Informations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1 text-sm">Sauvegarde réelle</h4>
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  Les paramètres sont persistés dans la table <code>site_settings</code> de Supabase et synchronisés en temps réel sur le site.
                </p>
              </div>
              <div className={`p-3 rounded-lg ${form.maintenance_mode ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
                <h4 className={`font-medium text-sm mb-1 ${form.maintenance_mode ? 'text-yellow-800 dark:text-yellow-200' : 'text-green-800 dark:text-green-200'}`}>
                  {form.maintenance_mode ? '⚠️ Mode Maintenance' : '✅ Site en ligne'}
                </h4>
                <p className={`text-xs ${form.maintenance_mode ? 'text-yellow-600 dark:text-yellow-300' : 'text-green-600 dark:text-green-300'}`}>
                  {form.maintenance_mode ? 'Le site affichera une page de maintenance.' : 'Le site est accessible à tous les visiteurs.'}
                </p>
              </div>
              <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
                <p>Dernière édition : {new Date().toLocaleDateString('fr-FR')}</p>
                <p>Version : 1.1.0</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
