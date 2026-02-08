import { supabaseRaw } from '../client'
import type { Database } from '../types'

type ContactSubmissionInsert = Database['public']['Tables']['contact_subscriptions']['Insert']
type NewsletterSubscriberInsert = Database['public']['Tables']['newsletter_subscribers']['Insert']

export interface ContactSubmission {
  name: string
  email: string
  subject?: string
  message: string
  phone?: string
}

export const contactService = {
  // Envoyer un message de contact
  async submitContact(data: ContactSubmission) {
    const { data: result, error } = await (supabaseRaw
      .from('contact_subscriptions') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(data)
      .select()

    if (error) throw error
    return result
  },

  // Récupérer tous les messages (admin)
  async getAllSubmissions() {
    const { data, error } = await supabaseRaw
      .from('contact_subscriptions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }
}

export interface NewsletterSubscriber {
  email: string
}

export const newsletterService = {
  // S'inscrire à la newsletter
  async subscribe(email: string) {
    const { data, error } = await (supabaseRaw
      .from('newsletter_subscribers') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert({ email })
      .select()

    if (error) throw error
    return data
  }
}
