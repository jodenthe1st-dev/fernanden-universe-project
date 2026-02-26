import { supabaseRaw } from '../client'

// Types basés sur la structure exacte de la base de données
type NewsletterSubscription = {
  id: string
  email: string
  name: string | null
  status: string
  source: string | null
  preferences: string[]
  custom_fields: Record<string, string | number | boolean> | null
  unsubscribe_token: string
  verified_at: string | null
  last_email_sent: string | null
  created_at: string
  updated_at: string
}

type NewsletterSubscriptionInsert = {
  id?: string
  email: string
  name?: string | null
  status?: string
  source?: string | null
  preferences?: string[]
  custom_fields?: Record<string, string | number | boolean> | null
  unsubscribe_token?: string
  verified_at?: string | null
  last_email_sent?: string | null
  created_at?: string
  updated_at?: string
}

type NewsletterSubscriptionUpdate = {
  id?: string
  email?: string
  name?: string | null
  status?: string
  source?: string | null
  preferences?: string[]
  custom_fields?: Record<string, string | number | boolean> | null
  unsubscribe_token?: string
  verified_at?: string | null
  last_email_sent?: string | null
  created_at?: string
  updated_at?: string
}

export type { NewsletterSubscription, NewsletterSubscriptionInsert, NewsletterSubscriptionUpdate }

export class NewsletterSubscriptionsService {
  // Récupérer tous les abonnés
  static async getAll(): Promise<NewsletterSubscription[]> {
    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les abonnés actifs
  static async getActive(): Promise<NewsletterSubscription[]> {
    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les abonnés vérifiés
  static async getVerified(): Promise<NewsletterSubscription[]> {
    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('*')
      .eq('status', 'active')
      .not('verified_at', 'is', null)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les abonnés par statut
  static async getByStatus(status: string): Promise<NewsletterSubscription[]> {
    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les abonnés par source
  static async getBySource(source: string): Promise<NewsletterSubscription[]> {
    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('*')
      .eq('source', source)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer un abonné par email
  static async getByEmail(email: string): Promise<NewsletterSubscription | null> {
    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email)
      .single()

    if (error) throw error
    return data
  }

  // Récupérer un abonné par token de désabonnement
  static async getByUnsubscribeToken(token: string): Promise<NewsletterSubscription | null> {
    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('*')
      .eq('unsubscribe_token', token)
      .single()

    if (error) throw error
    return data
  }

  // Récupérer un abonné par ID
  static async getById(id: string): Promise<NewsletterSubscription | null> {
    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  // Créer un abonné
  static async create(subscription: NewsletterSubscriptionInsert): Promise<NewsletterSubscription> {
    const { data, error } = await (supabaseRaw
      .from('newsletter_subscribers') as any)  // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(subscription)
      .select()
      .single()

    if (error) throw error
    return data as NewsletterSubscription
  }

  // Mettre à jour un abonné
  static async update(id: string, updates: NewsletterSubscriptionUpdate): Promise<NewsletterSubscription> {
    const { data, error } = await (supabaseRaw
      .from('newsletter_subscribers') as any)  // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as NewsletterSubscription
  }

  // Supprimer un abonné
  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('newsletter_subscribers')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // S'abonner (créer ou activer)
  static async subscribe(email: string, name?: string, source?: string): Promise<NewsletterSubscription> {
    // Vérifier si l'email existe déjà
    const existing = await this.getByEmail(email).catch(() => null)

    if (existing) {
      if (existing.status === 'unsubscribed') {
        // Réactiver l'abonnement
        return this.update(existing.id, {
          status: 'pending',
          name: name || existing.name,
          source: source || existing.source,
          verified_at: null
        })
      }
      return existing
    }

    // Créer un nouvel abonné
    const unsubscribeToken = this.generateUnsubscribeToken()
    return this.create({
      email,
      name,
      source,
      status: 'pending',
      preferences: [],
      custom_fields: null,
      unsubscribe_token: unsubscribeToken
    })
  }

  // Désabonner
  static async unsubscribe(emailOrToken: string): Promise<NewsletterSubscription> {
    let subscription: NewsletterSubscription | null

    // Essayer par token d'abord, puis par email
    subscription = await this.getByUnsubscribeToken(emailOrToken)
      .catch(() => null)

    if (!subscription) {
      subscription = await this.getByEmail(emailOrToken)
    }

    if (!subscription) {
      throw new Error('Subscription not found')
    }

    return this.update(subscription.id, { status: 'unsubscribed' })
  }

  // Vérifier l'abonnement
  static async verify(token: string): Promise<NewsletterSubscription> {
    const subscription = await this.getByUnsubscribeToken(token)
    
    if (!subscription) {
      throw new Error('Invalid verification token')
    }

    return this.update(subscription.id, {
      status: 'active',
      verified_at: new Date().toISOString()
    })
  }

  // Mettre à jour les préférences
  static async updatePreferences(id: string, preferences: string[]): Promise<NewsletterSubscription> {
    return this.update(id, { preferences })
  }

  // Mettre à jour les champs personnalisés
  static async updateCustomFields(id: string, customFields: Record<string, string | number | boolean>): Promise<NewsletterSubscription> {
    const { data: subscription } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('custom_fields')
      .eq('id', id)
      .single()

    if (!subscription) throw new Error('Subscription not found')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedFields = { ...(subscription as any).custom_fields, ...customFields }
    return this.update(id, { custom_fields: updatedFields })
  }

  // Mettre à jour la date du dernier email envoyé
  static async updateLastEmailSent(id: string): Promise<NewsletterSubscription> {
    return this.update(id, { last_email_sent: new Date().toISOString() })
  }

  // Rechercher des abonnés
  static async searchSubscriptions(query: string): Promise<NewsletterSubscription[]> {
    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('*')
      .or(`email.ilike.%${query}%,name.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les abonnés par préférence
  static async getByPreference(preference: string): Promise<NewsletterSubscription[]> {
    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('*')
      .eq('status', 'active')
      .contains('preferences', [preference])
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les sources disponibles
  static async getSources(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('source')
      .not('source', 'is', null)

    if (error) throw error
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sources = [...new Set(data?.map((s: any) => s.source).filter(Boolean) || [])] as string[]
    return sources.sort((a, b) => a.localeCompare(b))
  }

  // Récupérer les préférences disponibles
  static async getPreferences(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('preferences')
      .eq('status', 'active')

    if (error) throw error

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allPreferences = data?.flatMap((s: any) => s.preferences) || []
    const uniquePreferences = [...new Set(allPreferences)]
    return uniquePreferences.sort((a, b) => a.localeCompare(b))
  }

  // Générer un token de désabonnement
  static generateUnsubscribeToken(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  // Exporter les abonnés actifs
  static async exportActive(): Promise<NewsletterSubscription[]> {
    return this.getActive()
  }

  // Nettoyer les abonnés non vérifiés (plus de 7 jours)
  static async cleanupUnverified(): Promise<number> {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .delete()
      .eq('status', 'pending')
      .lt('created_at', sevenDaysAgo.toISOString())
      .select()

    if (error) throw error
    return data?.length || 0
  }

  // Récupérer les statistiques des abonnés
  static async getNewsletterStats(): Promise<{
    total: number
    active: number
    pending: number
    unsubscribed: number
    verified: number
    bySource: Record<string, number>
    byPreference: Record<string, number>
    recentGrowth: number
  }> {
    const { data, error } = await supabaseRaw
      .from('newsletter_subscribers')
      .select('status, source, preferences, created_at, verified_at')

    if (error) throw error

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const bySource: Record<string, number> = {}
    const byPreference: Record<string, number> = {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.forEach((sub: any) => {
      if (sub.source) {
        bySource[sub.source] = (bySource[sub.source] || 0) + 1
      }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sub.preferences.forEach((pref: any) => {
        byPreference[pref] = (byPreference[pref] || 0) + 1
      })
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recentGrowth = data?.filter((s: any) => new Date(s.created_at) > thirtyDaysAgo).length || 0

    const stats = {
      total: data?.length || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      active: data?.filter((s: any) => s.status === 'active').length || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pending: data?.filter((s: any) => s.status === 'pending').length || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      unsubscribed: data?.filter((s: any) => s.status === 'unsubscribed').length || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      verified: data?.filter((s: any) => s.verified_at).length || 0,
      bySource,
      byPreference,
      recentGrowth
    }

    return stats
  }
}
