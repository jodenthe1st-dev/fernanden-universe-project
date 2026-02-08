import { supabaseRaw } from '../client'
import { ServiceUtils } from './utils'

// Types basés sur la structure exacte de la base de données
export interface Service {
  id: string
  title: string
  description: string
  category: string
  features: string[]
  price_range: string | null
  duration: string | null
  icon_name: string
  featured: boolean
  status: string
  order_index: number
  detailed_inclusions: string | null
  images: string[]
  featured_image: string | null
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
  // Extended fields for CaFEE services
  target_audience: string | null
  session_duration: string | null
  session_type: string | null
  approach_method: string | null
  objectives: string[]
  materials_included: boolean
  // Extended fields for SHE services
  client_type: string | null
  budget_range: string | null
  team_size: number | null
  consultation_required: boolean
}

export interface ServiceInsert {
  id?: string
  title: string
  description: string
  category: string
  features?: string[]
  price_range?: string | null
  duration?: string | null
  icon_name: string
  featured?: boolean
  status?: string
  order_index?: number
  detailed_inclusions?: string | null
  images?: string[]
  featured_image?: string | null
  meta_title?: string | null
  meta_description?: string | null
  // Extended fields for CaFEE services
  target_audience?: string | null
  session_duration?: string | null
  session_type?: string | null
  approach_method?: string | null
  objectives?: string[]
  materials_included?: boolean
  // Extended fields for SHE services
  client_type?: string | null
  budget_range?: string | null
  team_size?: number | null
  consultation_required?: boolean
  created_at?: string
  updated_at?: string
}

export interface ServiceUpdate {
  id?: string
  title?: string
  description?: string
  category?: string
  features?: string[]
  price_range?: string | null
  duration?: string | null
  icon_name?: string
  featured?: boolean
  status?: string
  order_index?: number
  detailed_inclusions?: string | null
  images?: string[]
  featured_image?: string | null
  meta_title?: string | null
  meta_description?: string | null
  // Extended fields for CaFEE services
  target_audience?: string | null
  session_duration?: string | null
  session_type?: string | null
  approach_method?: string | null
  objectives?: string[]
  materials_included?: boolean
  // Extended fields for SHE services
  client_type?: string | null
  budget_range?: string | null
  team_size?: number | null
  consultation_required?: boolean
  created_at?: string
  updated_at?: string
}

export class ServicesService {
  private static readonly TABLE_NAME = 'services'

  // Récupérer tous les services
  static async getAll(): Promise<Service[]> {
    return ServiceUtils.getAll(this.TABLE_NAME) as Promise<Service[]>
  }

  // Récupérer les services par catégorie
  static async getByCategory(category: string): Promise<Service[]> {
    const { data, error } = await supabaseRaw
      .from(this.TABLE_NAME)
      .select('*')
      .eq('category', category)
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les services featured
  static async getFeatured(): Promise<Service[]> {
    return ServiceUtils.getFeatured(this.TABLE_NAME) as Promise<Service[]>
  }

  // Récupérer un service par ID
  static async getById(id: string): Promise<Service | null> {
    return ServiceUtils.getById(this.TABLE_NAME, id) as Promise<Service | null>
  }

  // Créer un service
  static async create(service: ServiceInsert): Promise<Service> {
    return ServiceUtils.create(this.TABLE_NAME, service) as Promise<Service>
  }

  // Mettre à jour un service
  static async update(id: string, service: ServiceUpdate): Promise<Service> {
    return ServiceUtils.update(this.TABLE_NAME, id, service) as Promise<Service>
  }

  // Supprimer un service
  static async delete(id: string): Promise<void> {
    return ServiceUtils.delete(this.TABLE_NAME, id)
  }

  // Toggle featured status
  static async toggleFeatured(id: string): Promise<Service> {
    return ServiceUtils.toggleFeatured(this.TABLE_NAME, id) as Promise<Service>
  }

  // Mettre à jour l'ordre
  static async updateOrder(id: string, orderIndex: number): Promise<Service> {
    return ServiceUtils.updateOrder(this.TABLE_NAME, id, orderIndex) as Promise<Service>
  }

  // Rechercher des services
  static async search(query: string): Promise<Service[]> {
    const { data, error } = await supabaseRaw
      .from(this.TABLE_NAME)
      .select('*')
      .eq('status', 'active')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,features.cs.{${query}}`)
      .order('category', { ascending: true })
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }
}
