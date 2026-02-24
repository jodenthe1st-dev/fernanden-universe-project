import { supabaseRaw } from '../client'
import type { Database } from '../types'

type SiteTextRow = Database['public']['Tables']['site_texts']['Row']
type SiteTextInsert = Database['public']['Tables']['site_texts']['Insert']
type SiteTextUpdate = Database['public']['Tables']['site_texts']['Update']
type SiteTextLanguageSelect = { language: string | null }
type SiteTextPageSelect = { page: string }
type SiteTextSectionSelect = { section: string }
type SiteTextIdSelect = { id: string }

export type SiteText = SiteTextRow
export type { SiteTextInsert, SiteTextUpdate }

export class SiteTextsService {
  static async getAll(): Promise<SiteText[]> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('*')
      .order('page', { ascending: true })
      .order('section', { ascending: true })
      .order('key', { ascending: true })

    if (error) throw error
    return (data as SiteText[]) || []
  }

  static async getByLanguage(language: string): Promise<SiteText[]> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('*')
      .eq('language', language)
      .order('page', { ascending: true })
      .order('section', { ascending: true })
      .order('key', { ascending: true })

    if (error) throw error
    return (data as SiteText[]) || []
  }

  static async getByPage(page: string, language: string = 'fr'): Promise<SiteText[]> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('*')
      .eq('page', page)
      .eq('language', language)
      .order('section', { ascending: true })
      .order('key', { ascending: true })

    if (error) throw error
    return (data as SiteText[]) || []
  }

  static async getBySection(page: string, section: string, language: string = 'fr'): Promise<SiteText[]> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('*')
      .eq('page', page)
      .eq('section', section)
      .eq('language', language)
      .order('key', { ascending: true })

    if (error) throw error
    return (data as SiteText[]) || []
  }

  static async getByKey(key: string, language: string = 'fr'): Promise<SiteText | null> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('*')
      .eq('key', key)
      .eq('language', language)
      .single()

    if (error) throw error
    return (data as SiteText) || null
  }

  static async getById(id: string): Promise<SiteText | null> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return (data as SiteText) || null
  }

  static async create(text: SiteTextInsert): Promise<SiteText> {
    const { data, error } = await (supabaseRaw
      .from('site_texts') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(text)
      .select('*')
      .single()

    if (error) throw error
    return data as SiteText
  }

  static async update(id: string, updates: SiteTextUpdate): Promise<SiteText> {
    const { data, error } = await (supabaseRaw
      .from('site_texts') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update({
        ...updates,
        last_modified: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    return data as SiteText
  }

  static async updateByKey(key: string, language: string, content: string): Promise<SiteText> {
    const { data: text, error } = await supabaseRaw
      .from('site_texts')
      .select('id')
      .eq('key', key)
      .eq('language', language)
      .single()

    if (error) throw error
    if (!text) throw new Error('Text not found')

    return this.update((text as SiteTextIdSelect).id, { content })
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('site_texts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  static async search(query: string, language?: string): Promise<SiteText[]> {
    if (!query || query.trim().length === 0) return []

    const cleanedQuery = query.trim().slice(0, 100)
    let q = supabaseRaw
      .from('site_texts')
      .select('*')
      .or(`key.ilike.%${cleanedQuery}%,content.ilike.%${cleanedQuery}%`)
      .order('page', { ascending: true })
      .order('section', { ascending: true })
      .order('key', { ascending: true })
      .limit(50)

    if (language) {
      q = q.eq('language', language)
    }

    const { data, error } = await q
    if (error) throw error
    return (data as SiteText[]) || []
  }

  static async getLanguages(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('language')

    if (error) throw error

    const languages = [...new Set((data as SiteTextLanguageSelect[] | null)?.map((t) => t.language).filter(Boolean) || [])] as string[]
    return languages.sort()
  }

  static async getPages(language?: string): Promise<string[]> {
    let q = supabaseRaw
      .from('site_texts')
      .select('page')

    if (language) {
      q = q.eq('language', language)
    }

    const { data, error } = await q
    if (error) throw error

    const pages = [...new Set((data as SiteTextPageSelect[] | null)?.map((t) => t.page).filter(Boolean) || [])]
    return pages.sort()
  }

  static async getSections(page: string, language: string = 'fr'): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('section')
      .eq('page', page)
      .eq('language', language)

    if (error) throw error

    const sections = [...new Set((data as SiteTextSectionSelect[] | null)?.map((t) => t.section).filter(Boolean) || [])]
    return sections.sort()
  }

  static async getAsObject(page?: string, language: string = 'fr'): Promise<Record<string, string>> {
    let q = supabaseRaw
      .from('site_texts')
      .select('key, content')
      .eq('language', language)

    if (page) {
      q = q.eq('page', page)
    }

    const { data, error } = await q
    if (error) throw error

    const texts: Record<string, string> = {}
    ;(data as Array<{ key: string; content: string }> | null)?.forEach((t) => {
      texts[t.key] = t.content
    })
    return texts
  }
}

