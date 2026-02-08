import { supabaseRaw } from '../client'

// Types basés sur la structure exacte de la base de données
export interface Podcast {
  id: string
  title: string
  description: string
  audio_url: string
  cover_image: string
  duration: string
  episode_number: number
  season_number: number | null
  guest_name: string | null
  guest_bio: string | null
  guest_avatar: string | null
  tags: string[]
  featured: boolean
  status: string
  transcript: string | null
  show_notes: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface PodcastInsert {
  id?: string
  title: string
  description: string
  audio_url: string
  cover_image: string
  duration: string
  episode_number: number
  season_number?: number | null
  guest_name?: string | null
  guest_bio?: string | null
  guest_avatar?: string | null
  tags?: string[]
  featured?: boolean
  status?: string
  transcript?: string | null
  show_notes?: string | null
  published_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PodcastUpdate {
  id?: string
  title?: string
  description?: string
  audio_url?: string
  cover_image?: string
  duration?: string
  episode_number?: number
  season_number?: number | null
  guest_name?: string | null
  guest_bio?: string | null
  guest_avatar?: string | null
  tags?: string[]
  featured?: boolean
  status?: string
  transcript?: string | null
  show_notes?: string | null
  published_at?: string | null
  created_at?: string
  updated_at?: string
}

export class PodcastsService {
  // Récupérer tous les podcasts
  static async getAll(): Promise<Podcast[]> {
    const { data, error } = await supabaseRaw
      .from('podcasts')
      .select('*')
      .order('episode_number', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les podcasts actifs
  static async getActivePodcasts(): Promise<Podcast[]> {
    const { data, error } = await supabaseRaw
      .from('podcasts')
      .select('*')
      .eq('status', 'active')
      .order('episode_number', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les podcasts featured
  static async getFeatured(): Promise<Podcast[]> {
    const { data, error } = await supabaseRaw
      .from('podcasts')
      .select('*')
      .eq('featured', true)
      .eq('status', 'active')
      .order('episode_number', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les podcasts par saison
  static async getBySeason(seasonNumber: number): Promise<Podcast[]> {
    const { data, error } = await supabaseRaw
      .from('podcasts')
      .select('*')
      .eq('season_number', seasonNumber)
      .eq('status', 'active')
      .order('episode_number', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer un podcast par ID
  static async getById(id: string): Promise<Podcast | null> {
    const { data, error } = await supabaseRaw
      .from('podcasts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  // Créer un podcast
  static async create(podcast: PodcastInsert): Promise<Podcast> {
    const { data, error } = await (supabaseRaw
      .from('podcasts') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(podcast)
      .select()
      .single()

    if (error) throw error
    return data as Podcast
  }

  // Mettre à jour un podcast
  static async update(id: string, updates: PodcastUpdate): Promise<Podcast> {
    const { data, error } = await (supabaseRaw
      .from('podcasts') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Podcast
  }

  // Supprimer un podcast
  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('podcasts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Toggle featured status
  static async toggleFeatured(id: string): Promise<Podcast> {
    const { data: podcast } = await supabaseRaw
      .from('podcasts')
      .select('featured')
      .eq('id', id)
      .single()

    if (!podcast) throw new Error('Podcast not found')

    return this.update(id, { featured: !(podcast as any).featured }) // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  // Rechercher des podcasts
  static async searchPodcasts(query: string): Promise<Podcast[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }
    
    // Nettoyer et valider la requête
    const cleanedQuery = query.trim().slice(0, 100); // Limiter la longueur
    
    const { data, error } = await supabaseRaw
      .from('podcasts')
      .select('*')
      .eq('status', 'active')
      .or(`title.ilike.%${cleanedQuery}%,description.ilike.%${cleanedQuery}%,guest_name.ilike.%${cleanedQuery}%,tags.cs.{${cleanedQuery}}`)
      .order('episode_number', { ascending: false })
      .limit(50) // Limiter les résultats

    if (error) throw error
    return data || []
  }

  // Récupérer les saisons disponibles
  static async getSeasons(): Promise<number[]> {
    const { data, error } = await supabaseRaw
      .from('podcasts')
      .select('season_number')
      .eq('status', 'active')
      .not('season_number', 'is', null)

    if (error) throw error
    
    const seasons = [...new Set(data?.map((p: any) => p.season_number).filter(Boolean) || [])] as number[] // eslint-disable-line @typescript-eslint/no-explicit-any
    return seasons.sort((a, b) => b - a)
  }

  // Récupérer les statistiques des podcasts
  static async getPodcastStats(): Promise<{
    total: number
    active: number
    featured: number
    totalSeasons: number
  }> {
    const { data, error } = await supabaseRaw
      .from('podcasts')
      .select('status, featured, season_number')

    if (error) throw error

    const seasons = [...new Set(data?.map((p: any) => p.season_number).filter(Boolean) || [])] as number[] // eslint-disable-line @typescript-eslint/no-explicit-any

    const stats = {
      total: data?.length || 0,
      active: data?.filter((p: any) => p.status === 'active').length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      featured: data?.filter((p: any) => p.featured).length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      totalSeasons: seasons.length
    }

    return stats
  }
}
