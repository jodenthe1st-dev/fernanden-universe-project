// src/test-cloudinary.ts
import { CloudinaryService } from './services/CloudinaryService';
import logger from '@/lib/logger';

export const testCloudinary = async () => {
  try {
    // Test avec une petite image
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const result = await CloudinaryService.uploadImage(testFile, 'test');
    logger.info('✅ Cloudinary fonctionne !', result);
    return true;
  } catch (error) {
    logger.error('❌ Erreur Cloudinary :', error);
    return false;
  }
};
