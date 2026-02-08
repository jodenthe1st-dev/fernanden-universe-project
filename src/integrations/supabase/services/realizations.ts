import { supabaseRaw } from '../client'

// Types basés sur la structure exacte de la base de données
export interface Realization {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  gallery_images: string[]
  client_name: string | null
  project_date: string | null
  location: string | null
  budget_range: string | null
  tags: string[]
  content: string | null
  before_after_images: string[]
  testimonial_id: string | null
  featured: boolean
  status: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface RealizationInsert {
  id?: string
  title: string
  description: string
  category: string
  image_url: string
  gallery_images?: string[]
  client_name?: string | null
  project_date?: string | null
  location?: string | null
  budget_range?: string | null
  tags?: string[]
  content?: string | null
  before_after_images?: string[]
  testimonial_id?: string | null
  featured?: boolean
  status?: string
  order_index?: number
  created_at?: string
  updated_at?: string
}

export interface RealizationUpdate {
  id?: string
  title?: string
  description?: string
  category?: string
  image_url?: string
  gallery_images?: string[]
  client_name?: string | null
  project_date?: string | null
  location?: string | null
  budget_range?: string | null
  tags?: string[]
  content?: string | null
  before_after_images?: string[]
  testimonial_id?: string | null
  featured?: boolean
  status?: string
  order_index?: number
  created_at?: string
  updated_at?: string
}

export class RealizationsService {
  // Récupérer toutes les réalisations
  static async getAll(): Promise<Realization[]> {
    const { data, error } = await supabaseRaw
      .from('realizations')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les réalisations par catégorie
  static async getByCategory(category: string): Promise<Realization[]> {
    const { data, error } = await supabaseRaw
      .from('realizations')
      .select('*')
      .eq('category', category)
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les réalisations actives
  static async getActiveRealizations(): Promise<Realization[]> {
    const { data, error } = await supabaseRaw
      .from('realizations')
      .select('*')
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les réalisations featured
  static async getFeatured(): Promise<Realization[]> {
    const { data, error } = await supabaseRaw
      .from('realizations')
      .select('*')
      .eq('featured', true)
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer une réalisation par ID
  static async getById(id: string): Promise<Realization | null> {
    const { data, error } = await supabaseRaw
      .from('realizations')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  // Créer une réalisation
  static async create(realization: RealizationInsert): Promise<Realization> {
    const { data, error } = await (supabaseRaw
      .from('realizations') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(realization)
      .select()
      .single()

    if (error) throw error
    return data as Realization
  }

  // Mettre à jour une réalisation
  static async update(id: string, realization: RealizationUpdate): Promise<Realization> {
    const { data, error } = await (supabaseRaw
      .from('realizations') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(realization)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Realization
  }

  // Supprimer une réalisation
  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('realizations')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Toggle featured status
  static async toggleFeatured(id: string): Promise<Realization> {
    const { data: realization } = await supabaseRaw
      .from('realizations')
      .select('featured')
      .eq('id', id)
      .single()

    if (!realization) throw new Error('Realization not found')

    return this.update(id, { featured: !(realization as any).featured }) // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  // Mettre à jour l'ordre
  static async updateOrder(id: string, orderIndex: number): Promise<Realization> {
    return this.update(id, { order_index: orderIndex })
  }

  // Rechercher des réalisations
  static async searchRealizations(query: string): Promise<Realization[]> {
    const { data, error } = await supabaseRaw
      .from('realizations')
      .select('*')
      .eq('status', 'active')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }
}
