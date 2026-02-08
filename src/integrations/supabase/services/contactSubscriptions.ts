import { supabase } from '../client'
import type { Database } from '../types'

type ContactSubscriptionRow = Database['public']['Tables']['contact_subscriptions']['Row']
type ContactSubscriptionInsert = Database['public']['Tables']['contact_subscriptions']['Insert']
type ContactSubscriptionUpdate = Database['public']['Tables']['contact_subscriptions']['Update']

// Types basés sur la structure exacte de la base de données
export type ContactSubscription = ContactSubscriptionRow

export type { ContactSubscriptionInsert, ContactSubscriptionUpdate }

export class ContactSubscriptionsService {
  // Récupérer toutes les demandes de contact
  static async getAll(): Promise<ContactSubscription[]> {
    const { data, error } = await supabase
      .from('contact_subscriptions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les demandes par statut
  static async getByStatus(status: string): Promise<ContactSubscription[]> {
    const { data, error } = await supabase
      .from('contact_subscriptions')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les demandes par priorité
  static async getByPriority(priority: string): Promise<ContactSubscription[]> {
    const { data, error } = await supabase
      .from('contact_subscriptions')
      .select('*')
      .eq('priority', priority)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les demandes assignées à quelqu'un
  static async getByAssignee(assigneeId: string): Promise<ContactSubscription[]> {
    const { data, error } = await supabase
      .from('contact_subscriptions')
      .select('*')
      .eq('assigned_to', assigneeId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les demandes non assignées
  static async getUnassigned(): Promise<ContactSubscription[]> {
    const { data, error } = await supabase
      .from('contact_subscriptions')
      .select('*')
      .is('assigned_to', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer une demande par ID
  static async getById(id: string): Promise<ContactSubscription | null> {
    const { data, error } = await supabase
      .from('contact_subscriptions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  // Créer une demande de contact
  static async create(subscription: ContactSubscriptionInsert): Promise<ContactSubscription> {
    const { data, error } = await (supabase
      .from('contact_subscriptions') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(subscription)
      .select()
      .single()

    if (error) throw error
    return data as ContactSubscription
  }

  // Mettre à jour une demande de contact
  static async update(id: string, updates: ContactSubscriptionUpdate): Promise<ContactSubscription> {
    const { data, error } = await (supabase
      .from('contact_subscriptions') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as ContactSubscription
  }

  // Supprimer une demande de contact
  static async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('contact_subscriptions')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Mettre à jour le statut
  static async updateStatus(id: string, status: string): Promise<ContactSubscription> {
    const { data, error } = await (supabase
      .from('contact_subscriptions') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as ContactSubscription
  }

  // Mettre à jour la priorité
  static async updatePriority(id: string, priority: string): Promise<ContactSubscription> {
    const { data, error } = await (supabase
      .from('contact_subscriptions') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update({ priority })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as ContactSubscription
  }

  // Assigner à quelqu'un
  static async assignTo(id: string, assigneeId: string): Promise<ContactSubscription> {
    return this.update(id, { assigned_to: assigneeId })
  }

  // Désassigner
  static async unassign(id: string): Promise<ContactSubscription> {
    return this.update(id, { assigned_to: null })
  }

  // Ajouter des notes
  static async addNotes(id: string, notes: string): Promise<ContactSubscription> {
    const { data: subscription } = await (supabase
      .from('contact_subscriptions') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .select('notes')
      .eq('id', id)
      .single()

    if (!subscription) throw new Error('Contact subscription not found')

    const updatedNotes = subscription.notes 
      ? `${subscription.notes}\n\n${new Date().toISOString()}: ${notes}`
      : `${new Date().toISOString()}: ${notes}`

    const { data, error } = await (supabase
      .from('contact_subscriptions') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update({ notes: updatedNotes })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as ContactSubscription
  }

  // Rechercher des demandes
  static async searchSubscriptions(query: string): Promise<ContactSubscription[]> {
    const { data, error } = await supabase
      .from('contact_subscriptions')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,company.ilike.%${query}%,subject.ilike.%${query}%,message.ilike.%${query}%,service_interest.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les demandes récentes
  static async getRecent(limit: number = 10): Promise<ContactSubscription[]> {
    const { data, error } = await supabase
      .from('contact_subscriptions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  // Récupérer les demandes par service d'intérêt
  static async getByServiceInterest(serviceInterest: string): Promise<ContactSubscription[]> {
    const { data, error } = await supabase
      .from('contact_subscriptions')
      .select('*')
      .eq('service_interest', serviceInterest)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les demandes par source
  static async getBySource(source: string): Promise<ContactSubscription[]> {
    const { data, error } = await supabase
      .from('contact_subscriptions')
      .select('*')
      .eq('source', source)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les services d'intérêt disponibles
  static async getServiceInterests(): Promise<string[]> {
    const { data, error } = await supabase
      .from('contact_subscriptions')
      .select('service_interest')
      .not('service_interest', 'is', null)

    if (error) throw error
    
    const interests = [...new Set(data?.map((s: any) => s.service_interest).filter(Boolean) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any
    return interests.sort()
  }

  // Récupérer les sources disponibles
  static async getSources(): Promise<string[]> {
    const { data, error } = await supabase
      .from('contact_subscriptions')
      .select('source')
      .not('source', 'is', null)

    if (error) throw error
    
    const sources = [...new Set(data?.map((s: any) => s.source).filter(Boolean) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any
    return sources.sort()
  }

  // Récupérer les statistiques des demandes de contact
  static async getContactStats(): Promise<{
    total: number
    byStatus: Record<string, number>
    byPriority: Record<string, number>
    bySource: Record<string, number>
    unassigned: number
    recent: number
  }> {
    const { data, error } = await supabase
      .from('contact_subscriptions')
      .select('status, priority, source, assigned_to, created_at')

    if (error) throw error

    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const byStatus: Record<string, number> = {}
    const byPriority: Record<string, number> = {}
    const bySource: Record<string, number> = {}

    data?.forEach((sub: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      byStatus[sub.status] = (byStatus[sub.status] || 0) + 1
      byPriority[sub.priority] = (byPriority[sub.priority] || 0) + 1
      if (sub.source) {
        bySource[sub.source] = (bySource[sub.source] || 0) + 1
      }
    })

    const stats = {
      total: data?.length || 0,
      byStatus,
      byPriority,
      bySource,
      unassigned: data?.filter((s: any) => !s.assigned_to).length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      recent: data?.filter((s: any) => new Date(s.created_at) > oneWeekAgo).length || 0 // eslint-disable-line @typescript-eslint/no-explicit-any
    }

    return stats
  }

  // Marquer comme lu/non lu (simulé avec un statut)
  static async markAsRead(id: string): Promise<ContactSubscription> {
    return this.update(id, { status: 'read' })
  }

  static async markAsUnread(id: string): Promise<ContactSubscription> {
    return this.update(id, { status: 'new' })
  }
}
