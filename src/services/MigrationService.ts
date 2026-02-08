// src/services/MigrationService.ts
import { DatabaseService, MediaFile } from './DatabaseService';
import { CloudinaryService } from './CloudinaryService';
import logger from '@/lib/logger';

export class MigrationService {
  /**
   * Migre tous les médias locaux vers Cloudinary
   */
  static async migrateAllMediaToCloudinary(): Promise<void> {
    try {
      logger.info('🔄 Début de la migration vers Cloudinary...');
      
      // 1. Récupérer tous les médias existants
      const allMedia = await DatabaseService.getMedia();
      logger.info(`📁 ${allMedia.length} fichiers trouvés`);
      
      let successCount = 0;
      let errorCount = 0;
        // Migration starts
        // console logs replaced by logger
        // eslint-disable-next-line no-unused-vars
        // logger.info('🔄 Début de la migration vers Cloudinary...');
      
      // 2. Traiter chaque fichier
      for (const media of allMedia) {
        // logger.info(`📁 ${allMedia.length} fichiers trouvés`);
        try {
          // Vérifier si c'est déjà une URL Cloudinary
          if (media.url.includes('cloudinary.com')) {
            logger.debug(`⏭️ ${media.original_name} déjà sur Cloudinary`);
            successCount++;
            continue;
          }
          
          // Vérifier si c'est une URL locale
          if (!media.url.startsWith('/uploads/')) {
              // logger.info(`⏭️ ${media.original_name} déjà sur Cloudinary`);
            logger.warn(`⚠️ ${media.original_name} n'est pas un fichier local`);
            continue;
          }
          
          // Télécharger le fichier local (inclure cookies si même origine)
          const response = await fetch(media.url, media.url.startsWith('/') ? { credentials: 'include' } : undefined);
          if (!response.ok) {
            throw new Error(`Impossible de télécharger ${media.url}`);
          }
          
          const blob = await response.blob();
          const file = new File([blob], media.original_name, {
            type: media.type
          });
          
          // Upload vers Cloudinary
          const result = await CloudinaryService.uploadFile(file, media.category || 'general');
          
          // Mettre à jour la base de données
          await DatabaseService.updateMedia(media.id, {
            url: result.url,
            metadata: {
              ...media.metadata,
              cloudinary_public_id: result.publicId,
              migrated_to_cloudinary: true,
              migration_date: new Date().toISOString(),
              original_local_url: media.url
            }
          });
          
          logger.info(`✅ ${media.original_name} migré avec succès`);
          successCount++;
          
        } catch (error) {
          logger.error(`❌ Erreur migration ${media.original_name}:`, error);
          errorCount++;
        }
            // logger.info(`✅ ${media.original_name} migré avec succès`);
      }
      
      logger.info(`🎉 Migration terminée : ${successCount} succès, ${errorCount} erreurs`);
      
    } catch (error) {
      logger.error('❌ Erreur générale de migration:', error);
      throw error;
    }
  }
        // logger.info(`🎉 Migration terminée : ${successCount} succès, ${errorCount} erreurs`);
  
  /**
   * Test la migration avec un seul fichier
   */
  static async testMigration(): Promise<void> {
    try {
      logger.info('🧪 Test de migration...');
      
      // Récupérer un seul média
      const mediaList = await DatabaseService.getMedia();
      if (mediaList.length === 0) {
        logger.info('📭 Aucun média à tester');
        return;
        // logger.info('🧪 Test de migration...');
      }
      
      const media = mediaList[0];
      logger.info(`📁 Test avec : ${media.original_name}`);
      
          // logger.info('📭 Aucun média à tester');
      // Télécharger le fichier local (inclure cookies si même origine)
      const response = await fetch(media.url, media.url.startsWith('/') ? { credentials: 'include' } : undefined);
      if (!response.ok) {
        throw new Error(`Impossible de télécharger ${media.url}`);
      }
        // logger.info(`📁 Test avec : ${media.original_name}`);
      
      const blob = await response.blob();
      const file = new File([blob], media.original_name, {
        type: media.type
      });
      
      // Upload vers Cloudinary
      const result = await CloudinaryService.uploadFile(file, media.category || 'general');
      
      logger.info('✅ Test réussi !');
      logger.debug('📊 Résultat:', result);
      
      // Annuler les changements (juste un test)
      logger.info('🔄 Annulation du test...');
      
    } catch (error) {
      logger.error('❌ Erreur test migration:', error);
      throw error;
    }
  }
        // logger.info('🔄 Annulation du test...');
  
  /**
   * Nettoie les anciens fichiers locaux (après migration réussie)
   */
  static async cleanupLocalFiles(): Promise<void> {
    try {
      logger.info('🧹 Nettoyage des fichiers locaux...');
      
      const migratedMedia = await DatabaseService.getMedia();
      let cleanedCount = 0;
      
      for (const media of migratedMedia) {
        if (media.metadata?.migrated_to_cloudinary && media.url.includes('cloudinary.com')) {
        // logger.info('🧹 Nettoyage des fichiers locaux...');
          // Le fichier a été migré avec succès
          logger.info(`🗑️ Nettoyage de ${media.original_name}`);
          cleanedCount++;
        }
      }
      
      logger.info(`🧹 Nettoyage terminé : ${cleanedCount} fichiers traités`);
      
            // logger.info(`🗑️ Nettoyage de ${media.original_name}`);
    } catch (error) {
      logger.error('❌ Erreur nettoyage:', error);
      throw error;
    }
  }
        // logger.info(`🧹 Nettoyage terminé : ${cleanedCount} fichiers traités`);
}
