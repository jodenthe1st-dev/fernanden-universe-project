import { supabaseRaw } from '../client'

// Types basés sur la structure exacte de la base de données
export interface SiteText {
  id: string
  key: string
  value: string
  language: string
  page: string
  section: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export interface SiteTextInsert {
  id?: string
  key: string
  value: string
  language: string
  page: string
  section?: string | null
  description?: string | null
  created_at?: string
  updated_at?: string
}

export interface SiteTextUpdate {
  id?: string
  key?: string
  value?: string
  language?: string
  page?: string
  section?: string | null
  description?: string | null
  created_at?: string
  updated_at?: string
}

export class SiteTextsService {
  // Récupérer tous les textes
  static async getAll(): Promise<SiteText[]> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('*')
      .order('page', { ascending: true })
      .order('section', { ascending: true })
      .order('key', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les textes par langue
  static async getByLanguage(language: string): Promise<SiteText[]> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('*')
      .eq('language', language)
      .order('page', { ascending: true })
      .order('section', { ascending: true })
      .order('key', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les textes par page
  static async getByPage(page: string, language: string = 'fr'): Promise<SiteText[]> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('*')
      .eq('page', page)
      .eq('language', language)
      .order('section', { ascending: true })
      .order('key', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les textes par section
  static async getBySection(page: string, section: string, language: string = 'fr'): Promise<SiteText[]> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('*')
      .eq('page', page)
      .eq('section', section)
      .eq('language', language)
      .order('key', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer un texte par clé et langue
  static async getByKey(key: string, language: string = 'fr'): Promise<SiteText | null> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('*')
      .eq('key', key)
      .eq('language', language)
      .single()

    if (error) throw error
    return data
  }

  // Récupérer un texte par ID
  static async getById(id: string): Promise<SiteText | null> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  // Créer un texte
  static async create(text: SiteTextInsert): Promise<SiteText> {
    const { data, error } = await (supabaseRaw
      .from('site_texts') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(text)
      .select()
      .single()

    if (error) throw error
    return data as SiteText
  }

  // Mettre à jour un texte
  static async update(id: string, updates: SiteTextUpdate): Promise<SiteText> {
    const { data, error } = await (supabaseRaw
      .from('site_texts') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as SiteText
  }

  // Mettre à jour un texte par clé et langue
  static async updateByKey(key: string, language: string, value: string): Promise<SiteText> {
    const { data: text } = await supabaseRaw
      .from('site_texts')
      .select('id')
      .eq('key', key)
      .eq('language', language)
      .single()

    if (!text) throw new Error('Text not found')

    return this.update((text as any).id, { value }) // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  // Supprimer un texte
  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('site_texts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Rechercher des textes
  static async searchTexts(query: string, language?: string): Promise<SiteText[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }
    
    // Nettoyer et valider la requête
    const cleanedQuery = query.trim().slice(0, 100); // Limiter la longueur
    
    let queryBuilder = supabaseRaw
      .from('site_texts')
      .select('*')
      .or(`key.ilike.%${cleanedQuery}%,value.ilike.%${cleanedQuery}%,description.ilike.%${cleanedQuery}%`)
      .order('page', { ascending: true })
      .order('section', { ascending: true })
      .order('key', { ascending: true })
      .limit(50) // Limiter les résultats

    if (language) {
      queryBuilder = queryBuilder.eq('language', language)
    }

    const { data, error } = await queryBuilder

    if (error) throw error
    return data || []
  }

  // Récupérer les langues disponibles
  static async getLanguages(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('language')

    if (error) throw error
    
    const languages = [...new Set(data?.map((t: any) => t.language) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any
    return languages.sort()
  }

  // Récupérer les pages disponibles
  static async getPages(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('page')

    if (error) throw error
    
    const pages = [...new Set(data?.map((t: any) => t.page) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any
    return pages.sort()
  }

  // Récupérer les sections d'une page
  static async getSections(page: string): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('section')
      .eq('page', page)
      .not('section', 'is', null)

    if (error) throw error
    
    const sections = [...new Set(data?.map((t: any) => t.section).filter(Boolean) || [])] as string[] // eslint-disable-line @typescript-eslint/no-explicit-any
    return sections.sort()
  }

  // Récupérer les textes sous forme d'objet clé-valeur
  static async getAsObject(page?: string, language: string = 'fr'): Promise<Record<string, string>> {
    let query = supabaseRaw
      .from('site_texts')
      .select('key, value')

    query = query.eq('language', language)
    if (page) {
      query = query.eq('page', page)
    }

    const { data, error } = await query

    if (error) throw error

    const texts: Record<string, string> = {}
    data?.forEach((text: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      texts[text.key] = text.value
    })

    return texts
  }

  // Mettre à jour plusieurs textes en une fois
  static async updateMultiple(updates: { key: string; language: string; value: string }[]): Promise<SiteText[]> {
    const results = await Promise.all(
      updates.map(update => this.updateByKey(update.key, update.language, update.value))
    )

    return results
  }

  // Dupliquer les textes pour une nouvelle langue
  static async duplicateForLanguage(sourceLanguage: string, targetLanguage: string): Promise<SiteText[]> {
    const { data: sourceTexts } = await supabaseRaw
      .from('site_texts')
      .select('*')
      .eq('language', sourceLanguage)

    if (!sourceTexts) throw new Error('No source texts found')

    const newTexts = sourceTexts.map((text: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      key: text.key,
      value: text.value,
      language: targetLanguage,
      page: text.page,
      section: text.section,
      description: text.description
    }))

    const { data, error } = await (supabaseRaw
      .from('site_texts') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(newTexts)
      .select()

    if (error) throw error
    return data || []
  }

  // Récupérer les textes manquants pour une langue
  static async getMissingTexts(language: string): Promise<string[]> {
    const { data: allKeys } = await supabaseRaw
      .from('site_texts')
      .select('key')
      .eq('language', 'fr') // Utiliser le français comme référence

    const { data: existingKeys } = await supabaseRaw
      .from('site_texts')
      .select('key')
      .eq('language', language)

    const allKeysSet = new Set(allKeys?.map((t: any) => t.key) || []) // eslint-disable-line @typescript-eslint/no-explicit-any
    const existingKeysSet = new Set(existingKeys?.map((t: any) => t.key) || []) // eslint-disable-line @typescript-eslint/no-explicit-any

    const missingKeys = Array.from(allKeysSet).filter(key => !existingKeysSet.has(key))
    return missingKeys
  }

  // Récupérer les statistiques des textes
  static async getTextsStats(): Promise<{
    total: number
    languages: string[]
    pages: string[]
    totalKeys: number
  }> {
    const { data, error } = await supabaseRaw
      .from('site_texts')
      .select('language, page, key')

    if (error) throw error

    const languages = [...new Set(data?.map((t: any) => t.language) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any
    const pages = [...new Set(data?.map((t: any) => t.page) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any
    const uniqueKeys = [...new Set(data?.map((t: any) => t.key) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any

    const stats = {
      total: data?.length || 0,
      languages,
      pages,
      totalKeys: uniqueKeys.length
    }

    return stats
  }
}
