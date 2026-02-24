import { supabaseRaw } from '../client'
import type { Database } from '../types'

type ServiceRow = Database['public']['Tables']['services']['Row']
type ServiceInsert = Database['public']['Tables']['services']['Insert']
type ServiceUpdate = Database['public']['Tables']['services']['Update']
type ServiceFeaturedSelect = { featured: boolean | null }

export type Service = ServiceRow
export type { ServiceInsert, ServiceUpdate }

export class ServicesService {
  static async getAll(): Promise<Service[]> {
    const { data, error } = await supabaseRaw
      .from('services')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as Service[]) || []
  }

  static async getPublished(): Promise<Service[]> {
    const { data, error } = await supabaseRaw
      .from('services')
      .select('*')
      .eq('status', 'published')
      .order('order_index', { ascending: true })

    if (error) throw error
    return (data as Service[]) || []
  }

  static async getByCategoryAll(category: string): Promise<Service[]> {
    const { data, error } = await supabaseRaw
      .from('services')
      .select('*')
      .eq('category', category)
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as Service[]) || []
  }

  static async getByCategoryPublished(category: string): Promise<Service[]> {
    const { data, error } = await supabaseRaw
      .from('services')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('order_index', { ascending: true })

    if (error) throw error
    return (data as Service[]) || []
  }

  static async getFeaturedPublished(): Promise<Service[]> {
    const { data, error } = await supabaseRaw
      .from('services')
      .select('*')
      .eq('featured', true)
      .eq('status', 'published')
      .order('order_index', { ascending: true })

    if (error) throw error
    return (data as Service[]) || []
  }

  static async getById(id: string): Promise<Service | null> {
    const { data, error } = await supabaseRaw
      .from('services')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return (data as Service) || null
  }

  static async create(service: ServiceInsert): Promise<Service> {
    const { data, error } = await (supabaseRaw
      .from('services') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(service)
      .select('*')
      .single()

    if (error) throw error
    return data as Service
  }

  static async update(id: string, updates: ServiceUpdate): Promise<Service> {
    const { data, error } = await (supabaseRaw
      .from('services') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    return data as Service
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('services')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  static async toggleFeatured(id: string): Promise<Service> {
    const { data: service } = await supabaseRaw
      .from('services')
      .select('featured')
      .eq('id', id)
      .single()

    if (!service) throw new Error('Service not found')
    return this.update(id, { featured: !(service as ServiceFeaturedSelect).featured })
  }

  static async searchPublished(query: string, category?: string): Promise<Service[]> {
    if (!query || query.trim().length === 0) return []

    const cleanedQuery = query.trim().slice(0, 100)
    let q = supabaseRaw
      .from('services')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${cleanedQuery}%,description.ilike.%${cleanedQuery}%,features.cs.{${cleanedQuery}}`)
      .order('category', { ascending: true })
      .order('order_index', { ascending: true })
      .limit(50)

    if (category) {
      q = q.eq('category', category)
    }

    const { data, error } = await q
    if (error) throw error
    return (data as Service[]) || []
  }
}

