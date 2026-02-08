import { supabase } from '../client'
import logger from '@/lib/logger'

export class UploadService {
  // Upload une image vers Supabase Storage
  static async uploadImage(file: File, folder: string = 'general'): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    logger.info(`Uploading ${file.name} to ${filePath}`)

    // Récupérer l'utilisateur pour la sécurité
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id

    const { data, error } = await supabase.storage
      .from('public')  // UTILISER LE BUCKET PUBLIC À LA PLACE
      .upload(filePath, file, {
        metadata: {
          uploaded_by: userId || 'anonymous',
          original_name: file.name,
          file_type: file.type,
          file_size: file.size
        }
      })

    if (error) {
      logger.error('Storage upload error:', error)
      throw new Error(`Erreur lors de l'upload: ${error.message}`)
    }

    logger.info(`Upload successful for ${file.name}, path: ${filePath}`)

    const { data: { publicUrl } } = supabase.storage
      .from('public')
      .getPublicUrl(filePath)

    if (!publicUrl) {
      throw new Error('Impossible de récupérer l\'URL publique')
    }

    return publicUrl
  }

  // Upload un fichier audio vers Supabase Storage
  static async uploadAudio(file: File, folder: string = 'audio'): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    logger.info(`Uploading audio ${file.name} to ${filePath}`)

    // Récupérer l'utilisateur pour la sécurité
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id

    const { data, error } = await supabase.storage
      .from('public')  // UTILISER LE BUCKET PUBLIC À LA PLACE
      .upload(filePath, file, {
        metadata: {
          uploaded_by: userId || 'anonymous',
          original_name: file.name,
          file_type: file.type,
          file_size: file.size
        }
      })

    if (error) {
      logger.error('Storage upload error:', error)
      throw new Error(`Erreur lors de l'upload audio: ${error.message}`)
    }

    logger.info(`Audio upload successful for ${file.name}, path: ${filePath}`)

    const { data: { publicUrl } } = supabase.storage
      .from('public')
      .getPublicUrl(filePath)

    if (!publicUrl) {
      throw new Error('Impossible de récupérer l\'URL publique')
    }

    return publicUrl
  }

  // Upload un document vers Supabase Storage
  static async uploadDocument(file: File, folder: string = 'documents'): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    logger.info(`Uploading document ${file.name} to ${filePath}`)

    // Récupérer l'utilisateur pour la sécurité
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id

    const { data, error } = await supabase.storage
      .from('public')  // UTILISER LE BUCKET PUBLIC À LA PLACE
      .upload(filePath, file, {
        metadata: {
          uploaded_by: userId || 'anonymous',
          original_name: file.name,
          file_type: file.type,
          file_size: file.size
        }
      })

    if (error) {
      logger.error('Storage upload error:', error)
      throw new Error(`Erreur lors de l'upload du document: ${error.message}`)
    }

    logger.info(`Document upload successful for ${file.name}, path: ${filePath}`)

    const { data: { publicUrl } } = supabase.storage
      .from('public')
      .getPublicUrl(filePath)

    if (!publicUrl) {
      throw new Error('Impossible de récupérer l\'URL publique')
    }

    return publicUrl
  }

  // Supprimer un fichier de Supabase Storage
  static async deleteFile(filePath: string): Promise<void> {
    logger.info(`Deleting file: ${filePath}`)

    // Vérifier que l'utilisateur est le propriétaire
    const { data: { user } } = await supabase.auth.getUser()
    
    const { error } = await supabase.storage
      .from('public')  // UTILISER LE BUCKET PUBLIC À LA PLACE
      .remove([filePath])

    if (error) {
      logger.error('Storage delete error:', error)
      throw new Error(`Erreur lors de la suppression: ${error.message}`)
    }

    logger.info(`File deleted successfully: ${filePath}`)
  }

  // Récupérer l'URL publique d'un fichier
  static async getPublicUrl(filePath: string): Promise<string> {
    const { data: { publicUrl } } = supabase.storage
      .from('public')  // UTILISER LE BUCKET PUBLIC À LA PLACE
      .getPublicUrl(filePath)

    if (!publicUrl) {
      throw new Error('Impossible de récupérer l\'URL publique')
    }

    return publicUrl
  }
}
