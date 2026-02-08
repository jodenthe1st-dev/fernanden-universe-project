import { supabaseRaw } from '../client'

// Types basés sur la structure exacte de la base de données
export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatar_url: string
  email: string | null
  phone: string | null
  linkedin_url: string | null
  twitter_url: string | null
  instagram_url: string | null
  department: string
  featured: boolean
  status: string
  skills: string[]
  order_index: number
  hire_date: string | null
  created_at: string
  updated_at: string
}

export interface TeamMemberInsert {
  id?: string
  name: string
  role: string
  bio: string
  avatar_url: string
  email?: string | null
  phone?: string | null
  linkedin_url?: string | null
  twitter_url?: string | null
  instagram_url?: string | null
  department: string
  featured?: boolean
  status?: string
  skills?: string[]
  order_index?: number
  hire_date?: string | null
  created_at?: string
  updated_at?: string
}

export interface TeamMemberUpdate {
  id?: string
  name?: string
  role?: string
  bio?: string
  avatar_url?: string
  email?: string | null
  phone?: string | null
  linkedin_url?: string | null
  twitter_url?: string | null
  instagram_url?: string | null
  department?: string
  featured?: boolean
  status?: string
  skills?: string[]
  order_index?: number
  hire_date?: string | null
  created_at?: string
  updated_at?: string
}

export class TeamService {
  // Récupérer tous les membres de l'équipe
  static async getAll(): Promise<TeamMember[]> {
    const { data, error } = await supabaseRaw
      .from('team')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les membres actifs
  static async getActiveMembers(): Promise<TeamMember[]> {
    const { data, error } = await supabaseRaw
      .from('team')
      .select('*')
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les membres featured
  static async getFeatured(): Promise<TeamMember[]> {
    const { data, error } = await supabaseRaw
      .from('team')
      .select('*')
      .eq('featured', true)
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les membres par département
  static async getByDepartment(department: string): Promise<TeamMember[]> {
    const { data, error } = await supabaseRaw
      .from('team')
      .select('*')
      .eq('department', department)
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer un membre par ID
  static async getById(id: string): Promise<TeamMember | null> {
    const { data, error } = await supabaseRaw
      .from('team')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  // Créer un membre de l'équipe
  static async create(member: TeamMemberInsert): Promise<TeamMember> {
    // Type assertion necessary due to Supabase typing limitations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseRaw.from('team') as any)
      .insert(member)
      .select()
      .single()

    if (error) throw error
    return data as TeamMember
  }

  // Mettre à jour un membre de l'équipe
  static async update(id: string, updates: TeamMemberUpdate): Promise<TeamMember> {
    const { data, error } = await (supabaseRaw
      .from('team') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as TeamMember
  }

  // Supprimer un membre de l'équipe
  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('team')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Toggle featured status
  static async toggleFeatured(id: string): Promise<TeamMember> {
    const { data: member } = await supabaseRaw
      .from('team')
      .select('featured')
      .eq('id', id)
      .single()

    if (!member) throw new Error('Team member not found')

    return this.update(id, { featured: !(member as any).featured }) // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  // Rechercher des membres de l'équipe
  static async searchMembers(query: string): Promise<TeamMember[]> {
    const { data, error } = await supabaseRaw
      .from('team')
      .select('*')
      .eq('status', 'active')
      .or(`name.ilike.%${query}%,role.ilike.%${query}%,bio.ilike.%${query}%,department.ilike.%${query}%,skills.cs.{${query}}`)
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les départements disponibles
  static async getDepartments(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('team')
      .select('department')
      .eq('status', 'active')

    if (error) throw error
    
    const departments = [...new Set(data?.map((m: any) => m.department) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any
    return departments.sort()
  }

  // Mettre à jour l'ordre des membres
  static async updateOrder(id: string, orderIndex: number): Promise<TeamMember> {
    return this.update(id, { order_index: orderIndex })
  }

  // Réorganiser l'ordre de plusieurs membres
  static async reorderMembers(members: { id: string; order_index: number }[]): Promise<TeamMember[]> {
    const updates = members.map(member => 
      (supabaseRaw
        .from('team') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
        .update({ order_index: member.order_index })
        .eq('id', member.id)
    )

    await Promise.all(updates)
    
    return this.getActiveMembers()
  }

  // Récupérer les statistiques de l'équipe
  static async getTeamStats(): Promise<{
    total: number
    active: number
    featured: number
    departments: string[]
  }> {
    const { data, error } = await supabaseRaw
      .from('team')
      .select('status, featured, department')

    if (error) throw error

    const departments = [...new Set(data?.map((m: any) => m.department) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any

    const stats = {
      total: data?.length || 0,
      active: data?.filter((m: any) => m.status === 'active').length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      featured: data?.filter((m: any) => m.featured).length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      departments
    }

    return stats
  }
}
