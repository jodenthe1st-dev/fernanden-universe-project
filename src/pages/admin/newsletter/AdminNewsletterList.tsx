// src/pages/admin/newsletter/AdminNewsletterList.tsx
import React, { useState, useEffect } from 'react';
import logger from '@/lib/logger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Mail, 
  Users, 
  Send,
  Calendar,
  Filter,
  Trash2
} from 'lucide-react';

interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  status: 'active' | 'unsubscribed';
  subscribed_at: string;
  last_campaign?: string;
}

interface NewsletterCampaign {
  id: string;
  subject: string;
  content: string;
  status: 'draft' | 'sent' | 'scheduled';
  sent_count?: number;
  open_count?: number;
  click_count?: number;
  created_at: string;
  sent_at?: string;
}

export default function AdminNewsletterList() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState<'subscribers' | 'campaigns'>('subscribers');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Simulation - Remplacer par appel API réel
      const mockSubscribers: NewsletterSubscriber[] = [];
      const mockCampaigns: NewsletterCampaign[] = [];
      setSubscribers(mockSubscribers);
      setCampaigns(mockCampaigns);
    } catch (error) {
      logger.error('Error loading newsletter data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) {
      return;
    }

    try {
      // Simulation - Remplacer par appel API réel
      setSubscribers(subscribers.filter(sub => sub.id !== id));
    } catch (error) {
      logger.error('Error deleting subscriber:', error);
      alert('Erreur lors de la suppression de l\'abonné');
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette campagne ?')) {
      return;
    }

    try {
      // Simulation - Remplacer par appel API réel
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    } catch (error) {
      logger.error('Error deleting campaign:', error);
      alert('Erreur lors de la suppression de la campagne');
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || subscriber.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'Tous', color: 'bg-gray-500' },
    { value: 'active', label: 'Actifs', color: 'bg-green-500' },
    { value: 'unsubscribed', label: 'Désabonnés', color: 'bg-red-500' },
    { value: 'draft', label: 'Brouillons', color: 'bg-yellow-500' },
    { value: 'sent', label: 'Envoyées', color: 'bg-blue-500' }
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
            Newsletter
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos abonnés et campagnes d'emailing
          </p>
        </div>
        
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Nouvelle Campagne
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        <Button
          variant={activeTab === 'subscribers' ? 'default' : 'outline'}
          onClick={() => setActiveTab('subscribers')}
        >
          <Users className="h-4 w-4 mr-2" />
          Abonnés ({subscribers.length})
        </Button>
        <Button
          variant={activeTab === 'campaigns' ? 'default' : 'outline'}
          onClick={() => setActiveTab('campaigns')}
        >
          <Mail className="h-4 w-4 mr-2" />
          Campagnes ({campaigns.length})
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
                  placeholder={activeTab === 'subscribers' ? 'Rechercher un abonné...' : 'Rechercher une campagne...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              {statusOptions.map((status) => {
                if (activeTab === 'subscribers' && ['active', 'unsubscribed'].includes(status.value)) {
                  return null;
                }
                if (activeTab === 'campaigns' && ['draft', 'sent'].includes(status.value)) {
                  return null;
                }
                return (
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
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {activeTab === 'subscribers' ? (
        filteredSubscribers.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {searchTerm ? 'Aucun abonné trouvé' : 'Aucun abonné'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm ? 'Essayez une autre recherche' : 'Personne n\'est encore abonné à la newsletter'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubscribers.map((subscriber) => (
              <Card key={subscriber.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {subscriber.name || subscriber.email}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {subscriber.name && subscriber.email}
                      </p>
                    </div>
                    <Badge 
                      variant={subscriber.status === 'active' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {subscriber.status === 'active' ? 'Actif' : 'Désabonné'}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Abonné le {new Date(subscriber.subscribed_at).toLocaleDateString('fr-FR')}
                    </div>
                    {subscriber.last_campaign && (
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        Dernière campagne: {subscriber.last_campaign}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-1" />
                      Contacter
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteSubscriber(subscriber.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      ) : (
        filteredCampaigns.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {searchTerm ? 'Aucune campagne trouvée' : 'Aucune campagne'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm ? 'Essayez une autre recherche' : 'Commencez par créer votre première campagne'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {campaign.subject}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {campaign.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </p>
                    </div>
                    <Badge 
                      variant={campaign.status === 'sent' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {campaign.status === 'sent' ? 'Envoyée' : campaign.status === 'draft' ? 'Brouillon' : 'Planifiée'}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Créée le {new Date(campaign.created_at).toLocaleDateString('fr-FR')}
                    </div>
                    {campaign.sent_at && (
                      <div className="flex items-center">
                        <Send className="h-3 w-3 mr-1" />
                        Envoyée le {new Date(campaign.sent_at).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                    {campaign.sent_count && (
                      <div className="flex items-center gap-4">
                        <span>Envoyée à {campaign.sent_count} abonnés</span>
                        {campaign.open_count && (
                          <span>Taux d'ouverture: {Math.round((campaign.open_count / campaign.sent_count) * 100)}%</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Voir les statistiques
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteCampaign(campaign.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export { AdminNewsletterList };
