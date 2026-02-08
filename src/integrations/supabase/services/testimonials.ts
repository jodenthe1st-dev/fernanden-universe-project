import { supabaseRaw } from '../client'

// Types basés sur la structure exacte de la base de données
export interface Testimonial {
  id: string
  client_name: string
  client_company: string | null
  client_position: string | null
  content: string
  rating: number
  project_id: string | null
  featured: boolean
  status: string
  avatar_url: string | null
  video_url: string | null
  created_at: string
  updated_at: string
}

export interface TestimonialInsert {
  id?: string
  client_name: string
  client_company?: string | null
  client_position?: string | null
  content: string
  rating?: number
  project_id?: string | null
  featured?: boolean
  status?: string
  avatar_url?: string | null
  video_url?: string | null
  created_at?: string
  updated_at?: string
}

export interface TestimonialUpdate {
  id?: string
  client_name?: string
  client_company?: string | null
  client_position?: string | null
  content?: string
  rating?: number
  project_id?: string | null
  featured?: boolean
  status?: string
  avatar_url?: string | null
  video_url?: string | null
  created_at?: string
  updated_at?: string
}

export class TestimonialsService {
  // Récupérer tous les témoignages
  static async getAll(): Promise<Testimonial[]> {
    const { data, error } = await supabaseRaw
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les témoignages actifs
  static async getActiveTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabaseRaw
      .from('testimonials')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les témoignages featured
  static async getFeatured(): Promise<Testimonial[]> {
    const { data, error } = await supabaseRaw
      .from('testimonials')
      .select('*')
      .eq('featured', true)
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les témoignages par projet
  static async getByProject(projectId: string): Promise<Testimonial[]> {
    const { data, error } = await supabaseRaw
      .from('testimonials')
      .select('*')
      .eq('project_id', projectId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer un témoignage par ID
  static async getById(id: string): Promise<Testimonial | null> {
    const { data, error } = await supabaseRaw
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  // Créer un témoignage
  static async create(testimonial: TestimonialInsert): Promise<Testimonial> {
    const { data, error } = await (supabaseRaw
      .from('testimonials') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(testimonial)
      .select()
      .single()

    if (error) throw error
    return data as Testimonial
  }

  // Mettre à jour un témoignage
  static async update(id: string, updates: TestimonialUpdate): Promise<Testimonial> {
    const { data, error } = await (supabaseRaw
      .from('testimonials') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Testimonial
  }

  // Supprimer un témoignage
  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('testimonials')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Toggle featured status
  static async toggleFeatured(id: string): Promise<Testimonial> {
    const { data: testimonial } = await supabaseRaw
      .from('testimonials')
      .select('featured')
      .eq('id', id)
      .single()

    if (!testimonial) throw new Error('Testimonial not found')

    return this.update(id, { featured: !(testimonial as any).featured }) // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  // Rechercher des témoignages
  static async searchTestimonials(query: string): Promise<Testimonial[]> {
    const { data, error } = await supabaseRaw
      .from('testimonials')
      .select('*')
      .eq('status', 'active')
      .or(`client_name.ilike.%${query}%,client_company.ilike.%${query}%,content.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les statistiques des témoignages
  static async getTestimonialStats(): Promise<{
    total: number
    active: number
    featured: number
    averageRating: number
  }> {
    const { data, error } = await supabaseRaw
      .from('testimonials')
      .select('status, featured, rating')

    if (error) throw error

    const stats = {
      total: data?.length || 0,
      active: data?.filter((t: any) => t.status === 'active').length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      featured: data?.filter((t: any) => t.featured).length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      averageRating: data?.reduce((sum, t) => sum + ((t as any).rating || 0), 0) / (data?.length || 1) || 0 // eslint-disable-line @typescript-eslint/no-explicit-any
    }

    return stats
  }
}
