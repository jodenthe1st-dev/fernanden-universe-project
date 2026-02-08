import { supabaseRaw } from '../client'

// Types basés sur la structure exacte de la base de données
export interface UniversePage {
  id: string
  universe: string
  title: string
  slug: string
  content: string
  hero_image: string | null
  hero_title: string | null
  hero_subtitle: string | null
  meta_title: string | null
  meta_description: string | null
  featured: boolean
  status: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface UniversePageInsert {
  id?: string
  universe: string
  title: string
  slug: string
  content: string
  hero_image?: string | null
  hero_title?: string | null
  hero_subtitle?: string | null
  meta_title?: string | null
  meta_description?: string | null
  featured?: boolean
  status?: string
  order_index?: number
  created_at?: string
  updated_at?: string
}

export interface UniversePageUpdate {
  id?: string
  universe?: string
  title?: string
  slug?: string
  content?: string
  hero_image?: string | null
  hero_title?: string | null
  hero_subtitle?: string | null
  meta_title?: string | null
  meta_description?: string | null
  featured?: boolean
  status?: string
  order_index?: number
  created_at?: string
  updated_at?: string
}

export class UniversePagesService {
  // Récupérer toutes les pages univers
  static async getAll(): Promise<UniversePage[]> {
    const { data, error } = await supabaseRaw
      .from('universe_pages')
      .select('*')
      .order('universe', { ascending: true })
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les pages actives
  static async getActive(): Promise<UniversePage[]> {
    const { data, error } = await supabaseRaw
      .from('universe_pages')
      .select('*')
      .eq('status', 'active')
      .order('universe', { ascending: true })
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les pages par univers
  static async getByUniverse(universe: string): Promise<UniversePage[]> {
    const { data, error } = await supabaseRaw
      .from('universe_pages')
      .select('*')
      .eq('universe', universe)
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les pages featured
  static async getFeatured(): Promise<UniversePage[]> {
    const { data, error } = await supabaseRaw
      .from('universe_pages')
      .select('*')
      .eq('featured', true)
      .eq('status', 'active')
      .order('universe', { ascending: true })
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer une page par slug et univers
  static async getBySlug(universe: string, slug: string): Promise<UniversePage | null> {
    const { data, error } = await supabaseRaw
      .from('universe_pages')
      .select('*')
      .eq('universe', universe)
      .eq('slug', slug)
      .eq('status', 'active')
      .single()

    if (error) throw error
    return data
  }

  // Récupérer une page par ID
  static async getById(id: string): Promise<UniversePage | null> {
    const { data, error } = await supabaseRaw
      .from('universe_pages')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  // Créer une page univers
  static async create(page: UniversePageInsert): Promise<UniversePage> {
    const { data, error } = await (supabaseRaw
      .from('universe_pages') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(page)
      .select()
      .single()

    if (error) throw error
    return data as UniversePage
  }

  // Mettre à jour une page univers
  static async update(id: string, updates: UniversePageUpdate): Promise<UniversePage> {
    const { data, error } = await (supabaseRaw
      .from('universe_pages') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as UniversePage
  }

  // Supprimer une page univers
  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('universe_pages')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Toggle featured status
  static async toggleFeatured(id: string): Promise<UniversePage> {
    const { data: page } = await supabaseRaw
      .from('universe_pages')
      .select('featured')
      .eq('id', id)
      .single()

    if (!page) throw new Error('Universe page not found')

    return this.update(id, { featured: !(page as any).featured }) // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  // Activer/Désactiver une page
  static async toggleStatus(id: string): Promise<UniversePage> {
    const { data: page } = await supabaseRaw
      .from('universe_pages')
      .select('status')
      .eq('id', id)
      .single()

    if (!page) throw new Error('Universe page not found')

    const newStatus = (page as any).status === 'active' ? 'inactive' : 'active' // eslint-disable-line @typescript-eslint/no-explicit-any
    return this.update(id, { status: newStatus })
  }

  // Rechercher des pages
  static async searchPages(query: string): Promise<UniversePage[]> {
    const { data, error } = await supabaseRaw
      .from('universe_pages')
      .select('*')
      .eq('status', 'active')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,hero_title.ilike.%${query}%,hero_subtitle.ilike.%${query}%,universe.ilike.%${query}%`)
      .order('universe', { ascending: true })
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les univers disponibles
  static async getUniverses(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('universe_pages')
      .select('universe')
      .eq('status', 'active')

    if (error) throw error
    
    const universes = [...new Set(data?.map((p: any) => p.universe) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any
    return universes.sort()
  }

  // Mettre à jour l'ordre des pages
  static async updateOrder(id: string, orderIndex: number): Promise<UniversePage> {
    return this.update(id, { order_index: orderIndex })
  }

  // Réorganiser l'ordre de plusieurs pages dans un univers
  static async reorderPagesInUniverse(universe: string, pages: { id: string; order_index: number }[]): Promise<UniversePage[]> {
    const updates = pages.map(page => 
      (supabaseRaw
        .from('universe_pages') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
        .update({ order_index: page.order_index })
        .eq('id', page.id)
        .eq('universe', universe)
    )

    await Promise.all(updates)
    
    return this.getByUniverse(universe)
  }

  // Récupérer les pages par statut
  static async getByStatus(status: string): Promise<UniversePage[]> {
    const { data, error } = await supabaseRaw
      .from('universe_pages')
      .select('*')
      .eq('status', status)
      .order('universe', { ascending: true })
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Vérifier si un slug existe dans un univers
  static async slugExists(universe: string, slug: string, excludeId?: string): Promise<boolean> {
    let query = supabaseRaw
      .from('universe_pages')
      .select('id')
      .eq('universe', universe)
      .eq('slug', slug)

    if (excludeId) {
      query = query.neq('id', excludeId)
    }

    const { data } = await query
    return (data?.length || 0) > 0
  }

  // Générer un slug unique
  static async generateUniqueSlug(universe: string, title: string): Promise<string> {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    let slug = baseSlug
    let counter = 1

    while (await this.slugExists(universe, slug)) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    return slug
  }

  // Récupérer les statistiques des pages univers
  static async getUniversePagesStats(): Promise<{
    total: number
    active: number
    featured: number
    universes: string[]
  }> {
    const { data, error } = await supabaseRaw
      .from('universe_pages')
      .select('status, featured, universe')

    if (error) throw error

    const universes = [...new Set(data?.map((p: any) => p.universe) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any

    const stats = {
      total: data?.length || 0,
      active: data?.filter((p: any) => p.status === 'active').length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      featured: data?.filter((p: any) => p.featured).length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      universes
    }

    return stats
  }

  // Récupérer les pages récentes
  static async getRecent(limit: number = 5): Promise<UniversePage[]> {
    const { data, error } = await supabaseRaw
      .from('universe_pages')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }
}
