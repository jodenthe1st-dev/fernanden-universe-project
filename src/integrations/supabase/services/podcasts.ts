import { supabaseRaw } from '../client'
import type { Database } from '../types'

type PodcastRow = Database['public']['Tables']['podcasts']['Row']
type PodcastInsert = Database['public']['Tables']['podcasts']['Insert']
type PodcastUpdate = Database['public']['Tables']['podcasts']['Update']
type PodcastFeaturedSelect = { featured: boolean | null }
type PodcastCategorySelect = { category: string }

export type Podcast = PodcastRow
export type { PodcastInsert, PodcastUpdate }

export class PodcastsService {
  private static async selectAllBestEffort(baseQuery: ReturnType<typeof supabaseRaw.from>): Promise<Podcast[]> {
    const ordered = await baseQuery
      .select('*')
      .order('episode_number', { ascending: false })
      .order('published_at', { ascending: false })
      .order('created_at', { ascending: false })
    if (!ordered.error) return (ordered.data as Podcast[]) || []

    const createdOnly = await baseQuery
      .select('*')
      .order('created_at', { ascending: false })
    if (!createdOnly.error) return (createdOnly.data as Podcast[]) || []

    const plain = await baseQuery.select('*')
    if (plain.error) throw ordered.error
    return (plain.data as Podcast[]) || []
  }

  static async getAll(): Promise<Podcast[]> {
    return this.selectAllBestEffort(supabaseRaw.from('podcasts'))
  }

  static async getPublished(): Promise<Podcast[]> {
    return this.selectAllBestEffort(
      supabaseRaw.from('podcasts').eq('status', 'published')
    )
  }

  static async getFeatured(): Promise<Podcast[]> {
    return this.selectAllBestEffort(
      supabaseRaw.from('podcasts').eq('featured', true).eq('status', 'published')
    )
  }

  static async getByCategory(category: string): Promise<Podcast[]> {
    return this.selectAllBestEffort(
      supabaseRaw.from('podcasts').eq('category', category).eq('status', 'published')
    )
  }

  static async getById(id: string): Promise<Podcast | null> {
    const { data, error } = await supabaseRaw
      .from('podcasts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return (data as Podcast) || null
  }

  static async create(podcast: PodcastInsert): Promise<Podcast> {
    const { data, error } = await (supabaseRaw
      .from('podcasts') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(podcast)
      .select('*')
      .single()

    if (error) throw error
    return data as Podcast
  }

  static async update(id: string, updates: PodcastUpdate): Promise<Podcast> {
    const { data, error } = await (supabaseRaw
      .from('podcasts') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    return data as Podcast
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('podcasts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  static async toggleFeatured(id: string): Promise<Podcast> {
    const { data: podcast } = await supabaseRaw
      .from('podcasts')
      .select('featured')
      .eq('id', id)
      .single()

    if (!podcast) throw new Error('Podcast not found')

    return this.update(id, { featured: !(podcast as PodcastFeaturedSelect).featured })
  }

  static async search(query: string): Promise<Podcast[]> {
    if (!query || query.trim().length === 0) return []

    const cleanedQuery = query.trim().slice(0, 100)
    const { data, error } = await supabaseRaw
      .from('podcasts')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${cleanedQuery}%,description.ilike.%${cleanedQuery}%,tags.cs.{${cleanedQuery}}`)
      .order('episode_number', { ascending: false })
      .limit(50)

    if (error) throw error
    return (data as Podcast[]) || []
  }

  static async getCategories(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('podcasts')
      .select('category')
      .eq('status', 'published')

    if (error) throw error

    const categories = [...new Set((data as PodcastCategorySelect[] | null)?.map((p) => p.category).filter(Boolean) || [])]
    return categories.sort()
  }
}
