import { supabaseRaw } from '../client'

// Types basés sur la structure exacte de la base de données
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface MediaFile {
  id: string
  filename: string
  original_name: string
  url: string
  type: string
  size: number
  alt_text: string | null
  category: string | null
  folder_path: string | null
  metadata: Json
  created_at: string
}

export interface MediaInsert {
  id?: string
  filename: string
  original_name: string
  url: string
  type: string
  size: number
  alt_text?: string | null
  category?: string | null
  folder_path?: string | null
  metadata?: Json
  created_at?: string
}

export interface MediaUpdate {
  id?: string
  filename?: string
  original_name?: string
  url?: string
  type?: string
  size?: number
  alt_text?: string | null
  category?: string | null
  folder_path?: string | null
  metadata?: Json
  created_at?: string
}

export class MediaService {
  // Récupérer tous les médias
  static async getAllMedia(): Promise<MediaFile[]> {
    const { data, error } = await supabaseRaw
      .from('media')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les médias par catégorie
  static async getMediaByCategory(category: string): Promise<MediaFile[]> {
    const { data, error } = await supabaseRaw
      .from('media')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les médias par type
  static async getMediaByType(type: 'image' | 'video' | 'document'): Promise<MediaFile[]> {
    const { data, error } = await supabaseRaw
      .from('media')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer un média par ID
  static async getMediaById(id: string): Promise<MediaFile | null> {
    const { data, error } = await supabaseRaw
      .from('media')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  // Créer un nouveau média
  static async createMedia(media: MediaInsert): Promise<MediaFile> {
    const { data, error } = await (supabaseRaw
      .from('media') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(media)
      .select()
      .single()

    if (error) throw error
    return data as MediaFile
  }

  // Mettre à jour un média
  static async updateMedia(id: string, updates: MediaUpdate): Promise<MediaFile> {
    const { data, error } = await (supabaseRaw
      .from('media') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as MediaFile
  }

  // Supprimer un média
  static async deleteMedia(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('media')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Rechercher des médias
  static async searchMedia(query: string): Promise<MediaFile[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }
    
    // Nettoyer et valider la requête
    const cleanedQuery = query.trim().slice(0, 100); // Limiter la longueur
    
    const { data, error } = await supabaseRaw
      .from('media')
      .select('*')
      .or(`original_name.ilike.%${cleanedQuery}%,alt_text.ilike.%${cleanedQuery}%,filename.ilike.%${cleanedQuery}%`)
      .order('created_at', { ascending: false })
      .limit(50) // Limiter les résultats

    if (error) throw error
    return data || []
  }

  // Récupérer les images uniquement
  static async getImages(): Promise<MediaFile[]> {
    return this.getMediaByType('image')
  }

  // Récupérer les vidéos uniquement
  static async getVideos(): Promise<MediaFile[]> {
    return this.getMediaByType('video')
  }

  // Récupérer les documents uniquement
  static async getDocuments(): Promise<MediaFile[]> {
    return this.getMediaByType('document')
  }

  // Mettre à jour les métadonnées
  static async updateMetadata(id: string, metadata: Record<string, unknown>): Promise<MediaFile> {
    return this.updateMedia(id, { metadata: metadata as Json })
  }

  // Récupérer les médias par dossier
  static async getMediaByFolder(folderPath: string): Promise<MediaFile[]> {
    const { data, error } = await supabaseRaw
      .from('media')
      .select('*')
      .eq('folder_path', folderPath)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les statistiques des médias
  static async getMediaStats(): Promise<{
    total: number
    images: number
    videos: number
    documents: number
    totalSize: number
  }> {
    const { data, error } = await supabaseRaw
      .from('media')
      .select('type, size')

    if (error) throw error

    const stats = {
      total: data?.length || 0,
      images: data?.filter((m: any) => m.type === 'image').length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      videos: data?.filter((m: any) => m.type === 'video').length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      documents: data?.filter((m: any) => m.type === 'document').length || 0, // eslint-disable-line @typescript-eslint/no-explicit-any
      totalSize: data?.reduce((sum, m) => sum + ((m as any).size || 0), 0) || 0 // eslint-disable-line @typescript-eslint/no-explicit-any
    }

    return stats
  }
}
