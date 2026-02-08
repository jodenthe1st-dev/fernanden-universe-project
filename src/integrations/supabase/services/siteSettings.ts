import { supabaseRaw } from '../client'

// Types basés sur la structure exacte de la base de données
export interface SiteSetting {
  id: string
  key: string
  value: string
  type: string
  description: string | null
  category: string
  public: boolean
  created_at: string
  updated_at: string
}

export interface SiteSettingInsert {
  id?: string
  key: string
  value: string
  type: string
  description?: string | null
  category: string
  public?: boolean
  created_at?: string
  updated_at?: string
}

export interface SiteSettingUpdate {
  id?: string
  key?: string
  value?: string
  type?: string
  description?: string | null
  category?: string
  public?: boolean
  created_at?: string
  updated_at?: string
}

export class SiteSettingsService {
  // Récupérer tous les paramètres
  static async getAll(): Promise<SiteSetting[]> {
    const { data, error } = await supabaseRaw
      .from('site_settings')
      .select('*')
      .order('category', { ascending: true })
      .order('key', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les paramètres publics
  static async getPublic(): Promise<SiteSetting[]> {
    const { data, error } = await supabaseRaw
      .from('site_settings')
      .select('*')
      .eq('public', true)
      .order('category', { ascending: true })
      .order('key', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les paramètres par catégorie
  static async getByCategory(category: string): Promise<SiteSetting[]> {
    const { data, error } = await supabaseRaw
      .from('site_settings')
      .select('*')
      .eq('category', category)
      .order('key', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer un paramètre par clé
  static async getByKey(key: string): Promise<SiteSetting | null> {
    const { data, error } = await supabaseRaw
      .from('site_settings')
      .select('*')
      .eq('key', key)
      .single()

    if (error) throw error
    return data
  }

  // Récupérer un paramètre par ID
  static async getById(id: string): Promise<SiteSetting | null> {
    const { data, error } = await supabaseRaw
      .from('site_settings')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  // Créer un paramètre
  static async create(setting: SiteSettingInsert): Promise<SiteSetting> {
    const { data, error } = await (supabaseRaw
      .from('site_settings') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(setting)
      .select()
      .single()

    if (error) throw error
    return data as SiteSetting
  }

  // Mettre à jour un paramètre
  static async update(id: string, updates: SiteSettingUpdate): Promise<SiteSetting> {
    const { data, error } = await (supabaseRaw
      .from('site_settings') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as SiteSetting
  }

  // Mettre à jour un paramètre par clé
  static async updateByKey(key: string, value: string): Promise<SiteSetting> {
    const { data: setting } = await supabaseRaw
      .from('site_settings')
      .select('id')
      .eq('key', key)
      .single()

    if (!setting) throw new Error('Setting not found')

    return this.update((setting as any).id, { value }) // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  // Supprimer un paramètre
  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('site_settings')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Rechercher des paramètres
  static async searchSettings(query: string): Promise<SiteSetting[]> {
    const { data, error } = await supabaseRaw
      .from('site_settings')
      .select('*')
      .or(`key.ilike.%${query}%,value.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .order('category', { ascending: true })
      .order('key', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les catégories disponibles
  static async getCategories(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('site_settings')
      .select('category')

    if (error) throw error
    
    const categories = [...new Set(data?.map((s: any) => s.category) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any
    return categories.sort()
  }

  // Récupérer les paramètres sous forme d'objet clé-valeur
  static async getAsObject(category?: string): Promise<Record<string, string>> {
    let query = supabaseRaw
      .from('site_settings')
      .select('key, value')

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) throw error

    const settings: Record<string, string> = {}
    data?.forEach((setting: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      settings[setting.key] = setting.value
    })

    return settings
  }

  // Récupérer les paramètres publics sous forme d'objet
  static async getPublicAsObject(): Promise<Record<string, string>> {
    const { data, error } = await supabaseRaw
      .from('site_settings')
      .select('key, value')
      .eq('public', true)

    if (error) throw error

    const settings: Record<string, string> = {}
    data?.forEach((setting: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      settings[setting.key] = setting.value
    })

    return settings
  }

  // Mettre à jour plusieurs paramètres en une fois
  static async updateMultiple(updates: { key: string; value: string }[]): Promise<SiteSetting[]> {
    const results = await Promise.all(
      updates.map(update => this.updateByKey(update.key, update.value))
    )

    return results
  }

  // Valider une valeur selon le type
  static validateValue(type: string, value: string): boolean {
    switch (type) {
      case 'boolean':
        return ['true', 'false', '1', '0'].includes(value.toLowerCase())
      case 'number':
        return !isNaN(Number(value))
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      case 'url':
        try {
          new URL(value)
          return true
        } catch {
          return false
        }
      case 'json':
        try {
          JSON.parse(value)
          return true
        } catch {
          return false
        }
      default:
        return true // string type accepts any value
    }
  }

  // Convertir une valeur selon le type
  static convertValue(type: string, value: string): string | number | boolean | object {
    switch (type) {
      case 'boolean':
        return ['true', '1'].includes(value.toLowerCase())
      case 'number':
        return Number(value)
      case 'json':
        return JSON.parse(value)
      default:
        return value
    }
  }

  // Récupérer les statistiques des paramètres
  static async getSettingsStats(): Promise<{
    total: number
    public: number
    private: number
    categories: string[]
  }> {
    const { data, error } = await supabaseRaw
      .from('site_settings')
      .select('public, category')

    if (error) throw error

    const categories = [...new Set(data?.map((s: any) => s.category) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any

    const stats = {
      total: data?.length || 0,
      public: data?.filter((s: any) => s.public).length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      private: data?.filter((s: any) => !s.public).length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      categories
    }

    return stats
  }
}
