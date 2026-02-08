import { supabase } from '../client'
import type { Database } from '../types'

export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']

export const projectsService = {
  // Récupérer tous les projets
  async getAll(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Récupérer les projets par catégorie
  async getByCategory(category: string): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Récupérer les projets featured
  async getFeatured(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Récupérer un projet par ID
  async getById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Créer un projet
  async create(project: ProjectInsert): Promise<Project> {
    const { data, error } = await (supabase
      .from('projects') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(project)
      .select()
      .single()

    if (error) throw error
    return data as Project
  },

  // Mettre à jour un projet
  async update(id: string, project: ProjectUpdate): Promise<Project> {
    const { data, error } = await (supabase
      .from('projects') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(project)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Project
  },

  // Supprimer un projet
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Toggle featured status
  async toggleFeatured(id: string): Promise<Project> {
    const { data: project } = await supabase
      .from('projects')
      .select('featured')
      .eq('id', id)
      .single()

    if (!project) throw new Error('Project not found')

    return this.update(id, { featured: !(project as any).featured }) // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}
