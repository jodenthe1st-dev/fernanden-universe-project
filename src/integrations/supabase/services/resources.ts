import { supabaseRaw } from '../client'
import { ServiceUtils } from './utils'

// Types basés sur la structure exacte de la base de données
export interface Resource {
  id: string
  title: string
  description: string
  type: string
  url: string
  file_url: string | null
  thumbnail_url: string | null
  category: string
  tags: string[]
  featured: boolean
  status: string
  download_count: number
  file_size: number | null
  file_format: string | null
  author: string | null
  publication_date: string | null
  order_index: number
  created_at: string
  updated_at: string
}

export interface ResourceInsert {
  id?: string
  title: string
  description: string
  type: string
  url: string
  file_url?: string | null
  thumbnail_url?: string | null
  category: string
  tags?: string[]
  featured?: boolean
  status?: string
  download_count?: number
  file_size?: number | null
  file_format?: string | null
  author?: string | null
  publication_date?: string | null
  order_index?: number
  created_at?: string
  updated_at?: string
}

export interface ResourceUpdate {
  id?: string
  title?: string
  description?: string
  type?: string
  url?: string
  file_url?: string | null
  thumbnail_url?: string | null
  category?: string
  tags?: string[]
  featured?: boolean
  status?: string
  download_count?: number
  file_size?: number | null
  file_format?: string | null
  author?: string | null
  publication_date?: string | null
  order_index?: number
  created_at?: string
  updated_at?: string
}

export class ResourcesService {
  private static readonly TABLE_NAME = 'resources'

  // Récupérer toutes les ressources
  static async getAll(): Promise<Resource[]> {
    return ServiceUtils.getAll(this.TABLE_NAME) as Promise<Resource[]>
  }

  // Récupérer les ressources actives
  static async getActiveResources(): Promise<Resource[]> {
    return ServiceUtils.getActive(this.TABLE_NAME) as Promise<Resource[]>
  }

  // Récupérer les ressources featured
  static async getFeatured(): Promise<Resource[]> {
    return ServiceUtils.getFeatured(this.TABLE_NAME) as Promise<Resource[]>
  }

  // Récupérer les ressources par catégorie
  static async getByCategory(category: string): Promise<Resource[]> {
    const { data, error } = await supabaseRaw
      .from(this.TABLE_NAME)
      .select('*')
      .eq('category', category)
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les ressources par type
  static async getByType(type: string): Promise<Resource[]> {
    const { data, error } = await supabaseRaw
      .from(this.TABLE_NAME)
      .select('*')
      .eq('type', type)
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer une ressource par ID
  static async getById(id: string): Promise<Resource | null> {
    return ServiceUtils.getById(this.TABLE_NAME, id) as Promise<Resource | null>
  }

  // Créer une ressource
  static async create(resource: ResourceInsert): Promise<Resource> {
    return ServiceUtils.create(this.TABLE_NAME, resource) as Promise<Resource>
  }

  // Mettre à jour une ressource
  static async update(id: string, updates: ResourceUpdate): Promise<Resource> {
    return ServiceUtils.update(this.TABLE_NAME, id, updates) as Promise<Resource>
  }

  // Supprimer une ressource
  static async delete(id: string): Promise<void> {
    return ServiceUtils.delete(this.TABLE_NAME, id)
  }

  // Toggle featured status
  static async toggleFeatured(id: string): Promise<Resource> {
    return ServiceUtils.toggleFeatured(this.TABLE_NAME, id) as Promise<Resource>
  }

  // Incrémenter le compteur de téléchargement
  static async incrementDownloadCount(id: string): Promise<Resource> {
    const { data: resource } = await supabaseRaw
      .from(this.TABLE_NAME)
      .select('download_count')
      .eq('id', id)
      .single()

    if (!resource) throw new Error('Resource not found')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.update(id, { download_count: ((resource as any).download_count || 0) + 1 })
  }

  // Rechercher des ressources
  static async searchResources(query: string): Promise<Resource[]> {
    const { data, error } = await supabaseRaw
      .from(this.TABLE_NAME)
      .select('*')
      .eq('status', 'active')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%,author.ilike.%${query}%,tags.cs.{${query}}`)
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les catégories disponibles
  static async getCategories(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from(this.TABLE_NAME)
      .select('category')
      .eq('status', 'active')

    if (error) throw error
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const categories = [...new Set(data?.map((r: any) => r.category) || [])]
    return categories.sort()
  }

  // Récupérer les types disponibles
  static async getTypes(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from(this.TABLE_NAME)
      .select('type')
      .eq('status', 'active')

    if (error) throw error
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const types = [...new Set(data?.map((r: any) => r.type) || [])]
    return types.sort()
  }

  // Mettre à jour l'ordre des ressources
  static async updateOrder(id: string, orderIndex: number): Promise<Resource> {
    return ServiceUtils.updateOrder(this.TABLE_NAME, id, orderIndex) as Promise<Resource>
  }

  // Récupérer les ressources les plus téléchargées
  static async getMostDownloaded(limit: number = 10): Promise<Resource[]> {
    const { data, error } = await supabaseRaw
      .from(this.TABLE_NAME)
      .select('*')
      .eq('status', 'active')
      .order('download_count', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  // Récupérer les ressources récentes
  static async getRecent(limit: number = 10): Promise<Resource[]> {
    const { data, error } = await supabaseRaw
      .from(this.TABLE_NAME)
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }

  // Récupérer les statistiques des ressources
  static async getResourceStats(): Promise<{
    total: number
    active: number
    featured: number
    totalDownloads: number
    categories: string[]
    types: string[]
  }> {
    const { data, error } = await supabaseRaw
      .from(this.TABLE_NAME)
      .select('status, featured, download_count, category, type')

    if (error) throw error

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const categories = [...new Set(data?.map((r: any) => r.category) || [])]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const types = [...new Set(data?.map((r: any) => r.type) || [])]

    const stats = {
      total: data?.length || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      active: data?.filter((r: any) => r.status === 'active').length || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      featured: data?.filter((r: any) => r.featured).length || 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      totalDownloads: data?.reduce((sum, r) => sum + ((r as any).download_count || 0), 0) || 0,
      categories,
      types
    }

    return stats
  }
}
