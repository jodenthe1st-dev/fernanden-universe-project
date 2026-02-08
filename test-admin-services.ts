// Test script pour valider tous les services admin
import { UploadService } from './src/integrations/supabase/services/upload';
import { ProductsService } from './src/integrations/supabase/services';
import { BlogPostsService } from './src/integrations/supabase/services/blogPosts';
import { PodcastsService } from './src/integrations/supabase/services';
import { MediaService } from './src/integrations/supabase/services/media';

console.log('🔍 TEST DES SERVICES ADMIN');
console.log('==========================');

// Test 1: UploadService
console.log('\n1. UploadService:');
console.log('✅ Importé');
console.log('✅ Méthodes disponibles:', Object.getOwnPropertyNames(UploadService));

// Test 2: ProductsService
console.log('\n2. ProductsService:');
console.log('✅ Importé');
console.log('✅ Méthodes disponibles:', Object.getOwnPropertyNames(ProductsService));

// Test 3: BlogPostsService
console.log('\n3. BlogPostsService:');
console.log('✅ Importé');
console.log('✅ Méthodes disponibles:', Object.getOwnPropertyNames(BlogPostsService));

// Test 4: PodcastsService
console.log('\n4. PodcastsService:');
console.log('✅ Importé');
console.log('✅ Méthodes disponibles:', Object.getOwnPropertyNames(PodcastsService));

// Test 5: MediaService
console.log('\n5. MediaService:');
console.log('✅ Importé');
console.log('✅ Méthodes disponibles:', Object.getOwnPropertyNames(MediaService));

console.log('\n🎉 TOUS LES SERVICES ADMIN SONT DISPONIBLES');
console.log('=====================================');

export {};
