import React, { useEffect, useState } from 'react';
import logger from '@/lib/logger';
import { NewsletterSubscriptionsService } from '@/integrations/supabase/services/newsletterSubscriptions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Mail, Users, Calendar, Trash2 } from 'lucide-react';

interface SubscriberItem {
  id: string;
  email: string;
  name?: string;
  status: 'active' | 'unsubscribed' | 'pending';
  subscribed_at: string;
}

export default function AdminNewsletterList() {
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'unsubscribed' | 'pending'>('all');

  useEffect(() => {
    void loadData();
  }, []);

  const loadData = async () => {
    try {
      const rows = await NewsletterSubscriptionsService.getAll();
      setSubscribers(
        rows.map((row) => ({
          id: row.id,
          email: row.email,
          name: row.name || undefined,
          status: (row.status as SubscriberItem['status']) || 'active',
          subscribed_at: row.created_at || new Date().toISOString(),
        }))
      );
    } catch (error) {
      logger.error('Error loading newsletter data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('Etes-vous sur de vouloir supprimer cet abonne ?')) return;
    try {
      await NewsletterSubscriptionsService.delete(id);
      setSubscribers((prev) => prev.filter((sub) => sub.id !== id));
    } catch (error) {
      logger.error('Error deleting subscriber:', error);
      alert("Erreur lors de la suppression de l'abonne");
    }
  };

  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch =
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (subscriber.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || subscriber.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Newsletter</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerez vos abonnes newsletter</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un abonne..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={filterStatus === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilterStatus('all')}>Tous</Button>
              <Button variant={filterStatus === 'active' ? 'default' : 'outline'} size="sm" onClick={() => setFilterStatus('active')}>Actifs</Button>
              <Button variant={filterStatus === 'pending' ? 'default' : 'outline'} size="sm" onClick={() => setFilterStatus('pending')}>Pending</Button>
              <Button variant={filterStatus === 'unsubscribed' ? 'default' : 'outline'} size="sm" onClick={() => setFilterStatus('unsubscribed')}>Desabonnes</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredSubscribers.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'Aucun abonne trouve' : 'Aucun abonne'}
            </h3>
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">{subscriber.email}</p>
                  </div>
                  <Badge variant={subscriber.status === 'active' ? 'default' : 'secondary'} className="ml-2">
                    {subscriber.status}
                  </Badge>
                </div>

                <div className="text-sm text-gray-500 space-y-1">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Abonne le {new Date(subscriber.subscribed_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${subscriber.email}`}>
                      <Mail className="h-4 w-4 mr-1" />
                      Contacter
                    </a>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteSubscriber(subscriber.id)}>
                    <Trash2 className="h-4 w-4" />
                    Supprimer
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

export { AdminNewsletterList };
