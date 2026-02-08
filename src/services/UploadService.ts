import { supabase } from '@/integrations/supabase/client'
import logger from '@/lib/logger'

export interface UploadedFile {
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
  url: string;
}

export class UploadService {
  // Upload un ou plusieurs fichiers
  static async uploadFiles(files: File[], category: string): Promise<UploadedFile[]> {
    try {
      const formData = new FormData();
      
      // Déterminer le dossier
      let folder = 'documents';
      
      if (files.length > 0) {
        const firstFile = files[0];
        const fileType = firstFile?.type;
        
        if (fileType?.startsWith('image/')) {
          folder = 'images';
        } else if (fileType?.startsWith('audio/')) {
          folder = 'audio';
        } else if (fileType?.startsWith('video/')) {
          folder = 'video';
        }
      }

      // Ajouter tous les fichiers (nom du champ attendu: 'uploads')
      files.forEach(file => {
        formData.append('uploads', file);
      });
      
      formData.append('folder', folder);

      // Envoyer au serveur (inclure cookies pour auth)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Erreur upload: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Enregistrer dans Supabase
      const mediaTable = (() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return supabase.from('media') as any;
      })();
      
      for (const file of result.files) {
        await mediaTable.insert({
          filename: file.filename,
          original_name: file.originalName || file.filename,
          url: file.publicUrl || file.url,
          type: folder,
          size: file.size,
          category,
          folder_path: `uploads/${folder}`
        });
      }

      logger.info(`✅ ${result.files.length} fichiers uploadés`);
      return result.files;

    } catch (error) {
      logger.error('❌ Erreur upload:', error);
      throw error;
    }
  }

  // Supprimer un fichier
  static async deleteFile(url: string): Promise<void> {
    try {
      // Supprimer du serveur
      const r = await fetch('/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ publicUrl: url })
      });

      if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        throw new Error(`Server delete failed: ${r.status} ${err.error || r.statusText}`);
      }

      // Supprimer de Supabase
      await supabase.from('media').delete().eq('url', url);

      logger.info(`✅ Fichier supprimé: ${url}`);
    } catch (error) {
      logger.error('❌ Erreur suppression:', error);
      throw error;
    }
  }
}
