// src/services/CloudinaryService.ts

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  format: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
}

import logger from '@/lib/logger';

export class CloudinaryService {
  /**
   * Upload une image vers Cloudinary via API REST
   */
  static async uploadImage(file: File, folder: string = 'general'): Promise<CloudinaryUploadResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', `fernanden/${folder}`);
      formData.append('upload_preset', 'ml_default'); // Utiliser un preset configuré dans Cloudinary
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Cloudinary API error: ${response.statusText}`);
      }

      const result = await response.json();
      
      return {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
        width: result.width,
        height: result.height,
      };
    } catch (error) {
      logger.error('Cloudinary image upload error:', error);
      throw new Error('Erreur lors de l\'upload de l\'image');
    }
  }

  /**
   * Upload une vidéo vers Cloudinary via API REST
   */
  static async uploadVideo(file: File, folder: string = 'videos'): Promise<CloudinaryUploadResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', `fernanden/${folder}`);
      formData.append('resource_type', 'video');
      formData.append('upload_preset', 'ml_default');
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Cloudinary API error: ${response.statusText}`);
      }

      const result = await response.json();
      
      return {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
        width: result.width,
        height: result.height,
        duration: result.duration,
      };
    } catch (error) {
      logger.error('Cloudinary video upload error:', error);
      throw new Error('Erreur lors de l\'upload de la vidéo');
    }
  }

  /**
   * Upload un fichier audio vers Cloudinary via API REST
   */
  static async uploadAudio(file: File, folder: string = 'audio'): Promise<CloudinaryUploadResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', `fernanden/${folder}`);
      formData.append('resource_type', 'video'); // Cloudinary traite l'audio comme vidéo
      formData.append('upload_preset', 'ml_default');
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Cloudinary API error: ${response.statusText}`);
      }

      const result = await response.json();
      
      return {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
        duration: result.duration,
      };
    } catch (error) {
      logger.error('Cloudinary audio upload error:', error);
      throw new Error('Erreur lors de l\'upload de l\'audio');
    }
  }

  /**
   * Upload générique (détecte automatiquement le type)
   */
  static async uploadFile(file: File, folder: string = 'general'): Promise<CloudinaryUploadResult> {
    if (file.type.startsWith('image/')) {
      return this.uploadImage(file, folder);
    } else if (file.type.startsWith('video/')) {
      return this.uploadVideo(file, folder);
    } else if (file.type.startsWith('audio/')) {
      return this.uploadAudio(file, folder);
    } else {
      throw new Error('Type de fichier non supporté');
    }
  }

  /**
   * Supprime un fichier de Cloudinary via API REST
   */
  static async deleteFile(publicId: string, resourceType: 'image' | 'video' = 'image'): Promise<void> {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = await this.generateSignature({
        public_id: publicId,
        timestamp: timestamp,
      });

      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${resourceType}/destroy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${import.meta.env.VITE_CLOUDINARY_API_KEY}:${import.meta.env.VITE_CLOUDINARY_API_SECRET}`)}`,
        },
        body: JSON.stringify({
          public_id: publicId,
          signature: signature,
          timestamp: timestamp,
        }),
      });

      if (!response.ok) {
        throw new Error(`Cloudinary delete error: ${response.statusText}`);
      }
    } catch (error) {
      logger.error('Cloudinary delete error:', error);
      throw new Error('Erreur lors de la suppression du fichier');
    }
  }

  /**
   * Génère une URL optimisée
   */
  static getOptimizedUrl(publicId: string, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
    crop?: string;
    gravity?: string;
  } = {}): string {
    const transformations = [];
    
    if (options.width) transformations.push(`w_${options.width}`);
    if (options.height) transformations.push(`h_${options.height}`);
    if (options.quality) transformations.push(`q_${options.quality}`);
    if (options.format) transformations.push(`f_${options.format}`);
    if (options.crop) transformations.push(`c_${options.crop}`);
    if (options.gravity) transformations.push(`g_${options.gravity}`);

    const transformString = transformations.join(',');
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicId}`;
  }

  /**
   * Génère une signature pour les requêtes signées Cloudinary
   */
  private static async generateSignature(params: Record<string, unknown>): Promise<string> {
    // Pour simplifier, nous allons utiliser une approche côté serveur
    // En production, il faudrait générer la signature côté serveur
    // Pour l'instant, nous allons utiliser l'API unsigned si possible
    const paramString = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    // Note: En production, il faudrait signer avec la clé secrète
    // Pour l'instant, nous retournons une chaîne vide (Cloudinary accepte les requêtes unsigned pour certaines opérations)
    return '';
  }

  /**
   * Convertit un fichier en base64
   */
  private static fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
