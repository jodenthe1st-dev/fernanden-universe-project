import { supabaseRaw } from '../client'
import type { Database } from '../types'

type ServiceRow = Database['public']['Tables']['services']['Row']
type ServiceInsert = Database['public']['Tables']['services']['Insert']
type ServiceUpdate = Database['public']['Tables']['services']['Update']
type ServiceFeaturedSelect = { featured: boolean | null }

export type Service = ServiceRow
export type { ServiceInsert, ServiceUpdate }

export class ServicesService {
  private static async selectAllBestEffort(baseQuery: ReturnType<typeof supabaseRaw.from>): Promise<Service[]> {
    const ordered = await baseQuery
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })
    if (!ordered.error) return (ordered.data as Service[]) || []

    const createdOnly = await baseQuery
      .select('*')
      .order('created_at', { ascending: false })
    if (!createdOnly.error) return (createdOnly.data as Service[]) || []

    const plain = await baseQuery.select('*')
    if (plain.error) throw ordered.error
    return (plain.data as Service[]) || []
  }

  static async getAll(): Promise<Service[]> {
    return this.selectAllBestEffort(supabaseRaw.from('services'))
  }

  static async getPublished(): Promise<Service[]> {
    return this.selectAllBestEffort(
      supabaseRaw.from('services').eq('status', 'published')
    )
  }

  static async getByCategoryAll(category: string): Promise<Service[]> {
    return this.selectAllBestEffort(
      supabaseRaw.from('services').eq('category', category)
    )
  }

  static async getByCategoryPublished(category: string): Promise<Service[]> {
    return this.selectAllBestEffort(
      supabaseRaw.from('services').eq('category', category).eq('status', 'published')
    )
  }

  static async getFeaturedPublished(): Promise<Service[]> {
    try {
      return await this.selectAllBestEffort(
        supabaseRaw.from('services').eq('featured', true).eq('status', 'published')
      )
    } catch {
      return this.selectAllBestEffort(
        supabaseRaw.from('services').eq('status', 'published')
      )
    }
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
    const { data: service, error } = await supabaseRaw
      .from('services')
      .select('featured')
      .eq('id', id)
      .single()

    if (error) throw new Error('Featured flag is not available in current database schema')
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
      .limit(50)

    if (category) {
      q = q.eq('category', category)
    }

    const ordered = await q
      .order('category', { ascending: true })
      .order('order_index', { ascending: true })
    if (!ordered.error) return (ordered.data as Service[]) || []

    const fallback = await q
      .order('category', { ascending: true })
      .order('created_at', { ascending: false })
    if (!fallback.error) return (fallback.data as Service[]) || []

    const plain = await q
    if (plain.error) throw ordered.error
    return (plain.data as Service[]) || []
  }
}
