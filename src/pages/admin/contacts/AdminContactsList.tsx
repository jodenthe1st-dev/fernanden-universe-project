// src/pages/admin/contacts/AdminContactsList.tsx
import React, { useState, useEffect } from 'react';
import logger from '@/lib/logger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  MessageSquare,
  Filter
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export default function AdminContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      // Simulation - Remplacer par appel API réel
      const mockContacts: Contact[] = [];
      setContacts(mockContacts);
    } catch (error) {
      logger.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: Contact['status']) => {
    try {
      // Simulation - Remplacer par appel API réel
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, status } : contact
      ));
    } catch (error) {
      logger.error('Error updating contact status:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      return;
    }

    try {
      // Simulation - Remplacer par appel API réel
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      logger.error('Error deleting contact:', error);
      alert('Erreur lors de la suppression du contact');
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'Tous', color: 'bg-gray-500' },
    { value: 'new', label: 'Nouveaux', color: 'bg-blue-500' },
    { value: 'read', label: 'Lus', color: 'bg-yellow-500' },
    { value: 'replied', label: 'Répondus', color: 'bg-green-500' }
  ];

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'Nouveau';
      case 'read': return 'Lu';
      case 'replied': return 'Répondu';
      default: return status;
    }
  };

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
            Contacts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez les messages reçus via le formulaire de contact
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un contact..."
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

      {/* Contacts List */}
      {filteredContacts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'Aucun contact trouvé' : 'Aucun contact'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? 'Essayez une autre recherche' : 'Aucun message reçu pour le moment'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {contact.name}
                      </h3>
                      <Badge className={getStatusColor(contact.status)}>
                        {getStatusLabel(contact.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {contact.email}
                      </div>
                      {contact.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {contact.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {contact.subject}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                    {contact.message}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedContact(contact)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                  
                  <select
                    value={contact.status}
                    onChange={(e) => handleStatusChange(contact.id, e.target.value as Contact['status'])}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  >
                    <option value="new">Nouveau</option>
                    <option value="read">Lu</option>
                    <option value="replied">Répondu</option>
                  </select>
                  
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(contact.id)}
                  >
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

export { AdminContactsList };
