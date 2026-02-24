import { supabaseRaw } from '../client'
import type { Database, Json } from '../types'

type SiteSettingRow = Database['public']['Tables']['site_settings']['Row']
type SiteSettingInsert = Database['public']['Tables']['site_settings']['Insert']
type SiteSettingUpdate = Database['public']['Tables']['site_settings']['Update']
type SiteSettingIdSelect = { id: string }

export type SiteSetting = SiteSettingRow
export type { SiteSettingInsert, SiteSettingUpdate }

export class SiteSettingsService {
  static async getAll(): Promise<SiteSetting[]> {
    const { data, error } = await supabaseRaw
      .from('site_settings')
      .select('*')
      .order('category', { ascending: true })
      .order('key', { ascending: true })

    if (error) throw error
    return (data as SiteSetting[]) || []
  }

  static async getByCategory(category: string): Promise<SiteSetting[]> {
    const { data, error } = await supabaseRaw
      .from('site_settings')
      .select('*')
      .eq('category', category)
      .order('key', { ascending: true })

    if (error) throw error
    return (data as SiteSetting[]) || []
  }

  static async getByKey(key: string): Promise<SiteSetting | null> {
    const { data, error } = await supabaseRaw
      .from('site_settings')
      .select('*')
      .eq('key', key)
      .single()

    if (error) throw error
    return (data as SiteSetting) || null
  }

  static async create(setting: SiteSettingInsert): Promise<SiteSetting> {
    const { data, error } = await (supabaseRaw
      .from('site_settings') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(setting)
      .select('*')
      .single()

    if (error) throw error
    return data as SiteSetting
  }

  static async update(id: string, updates: SiteSettingUpdate): Promise<SiteSetting> {
    const { data, error } = await (supabaseRaw
      .from('site_settings') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    return data as SiteSetting
  }

  static async updateByKey(key: string, value: Json): Promise<SiteSetting> {
    const { data: setting, error } = await supabaseRaw
      .from('site_settings')
      .select('id')
      .eq('key', key)
      .single()

    if (error) throw error
    if (!setting) throw new Error('Setting not found')

    return this.update((setting as SiteSettingIdSelect).id, {
      value,
      updated_at: new Date().toISOString(),
    })
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('site_settings')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  static async getAsObject(category?: string): Promise<Record<string, Json>> {
    let query = supabaseRaw
      .from('site_settings')
      .select('key, value')

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) throw error

    const settings: Record<string, Json> = {}
    ;(data as Array<{ key: string; value: Json }> | null)?.forEach((setting) => {
      settings[setting.key] = setting.value
    })

    return settings
  }
}

