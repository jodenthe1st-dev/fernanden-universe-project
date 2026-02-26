// DatabaseService.ts - Service centralisé pour toutes les opérations Supabase
// Ce fichier expose une API unifiée pour l'admin dashboard et les pages publiques

import {
  ProductsService,
  PodcastsService,
  ServicesService,
  MediaService,
  RealizationsService,
  BlogPostsService,
  TestimonialsService,
  TeamService,
  ResourcesService,
  SiteSettingsService,
  SiteTextsService,
  UniversePagesService,
  ContactSubscriptionsService,
  NewsletterSubscriptionsService,
} from '@/integrations/supabase/services';
import logger from '@/lib/logger';

import type {
  Product,
  Podcast,
  Service,
  MediaFile,
  Realization,
  BlogPost,
  Testimonial,
  TeamMember,
  Resource,
  SiteSetting,
  SiteText,
  UniversePage,
  ContactSubscription,
  ContactSubscriptionInsert,
  ContactSubscriptionUpdate,
  NewsletterSubscriber,
  NewsletterSubscriberInsert,
  ServiceUpdate,
} from '@/integrations/supabase/services';

// Types pour les filtres
export interface ServiceFilters {
  category?: string;
  status?: 'published' | 'draft' | 'archived';
  featured?: boolean;
}

export interface ProductFilters {
  category?: string;
  status?: 'published' | 'draft' | 'archived';
  featured?: boolean;
}

// Interface du service principal
class DatabaseServiceClass {
  // ===== PRODUITS =====
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    try {
      if (filters?.category) {
        return await ProductsService.getByCategoryPublished(filters.category);
      }
      if (filters?.status === 'published') {
        return await ProductsService.getPublished();
      }
      return await ProductsService.getAll();
    } catch (error) {
      logger.error('DatabaseService.getProducts error:', error);
      return [];
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      return await ProductsService.getById(id);
    } catch (error) {
      logger.error('DatabaseService.getProductById error:', error);
      return null;
    }
  }

  async createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product | null> {
    try {
      return await ProductsService.create(product);
    } catch (error) {
      logger.error('DatabaseService.createProduct error:', error);
      return null;
    }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    try {
      return await ProductsService.update(id, updates);
    } catch (error) {
      logger.error('DatabaseService.updateProduct error:', error);
      return null;
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await ProductsService.delete(id);
    } catch (error) {
      logger.error('DatabaseService.deleteProduct error:', error);
      throw error;
    }
  }

  // ===== PODCASTS =====
  async getPodcasts(): Promise<Podcast[]> {
    try {
      return await PodcastsService.getAll();
    } catch (error) {
      logger.error('DatabaseService.getPodcasts error:', error);
      return [];
    }
  }

  async getPublishedPodcasts(): Promise<Podcast[]> {
    try {
      return await PodcastsService.getPublished();
    } catch (error) {
      logger.error('DatabaseService.getPublishedPodcasts error:', error);
      return [];
    }
  }

  async getPodcastById(id: string): Promise<Podcast | null> {
    try {
      return await PodcastsService.getById(id);
    } catch (error) {
      logger.error('DatabaseService.getPodcastById error:', error);
      return null;
    }
  }

  async createPodcast(podcast: Omit<Podcast, 'id' | 'created_at'>): Promise<Podcast | null> {
    try {
      return await PodcastsService.create(podcast);
    } catch (error) {
      logger.error('DatabaseService.createPodcast error:', error);
      return null;
    }
  }

  async updatePodcast(id: string, updates: Partial<Podcast>): Promise<Podcast | null> {
    try {
      return await PodcastsService.update(id, updates);
    } catch (error) {
      logger.error('DatabaseService.updatePodcast error:', error);
      return null;
    }
  }

  async deletePodcast(id: string): Promise<void> {
    try {
      await PodcastsService.delete(id);
    } catch (error) {
      logger.error('DatabaseService.deletePodcast error:', error);
      throw error;
    }
  }

  // ===== SERVICES =====
  async getServices(filters?: ServiceFilters): Promise<Service[]> {
    try {
      let services = await ServicesService.getAll();
      
      if (filters?.category) {
        services = services.filter(s => s.category === filters.category);
      }
      
      if (filters?.status) {
        services = services.filter(s => s.status === filters.status);
      }
      
      if (filters?.featured !== undefined) {
        services = services.filter(s => s.featured === filters.featured);
      }
      
      return services;
    } catch (error) {
      logger.error('DatabaseService.getServices error:', error);
      return [];
    }
  }

  async getPublishedServices(category?: string): Promise<Service[]> {
    try {
      if (category) {
        return await ServicesService.getByCategoryPublished(category);
      }
      return await ServicesService.getPublished();
    } catch (error) {
      logger.error('DatabaseService.getPublishedServices error:', error);
      return [];
    }
  }

  async getServiceById(id: string): Promise<Service | null> {
    try {
      return await ServicesService.getById(id);
    } catch (error) {
      logger.error('DatabaseService.getServiceById error:', error);
      return null;
    }
  }

  async createService(service: Omit<Service, 'id' | 'created_at'>): Promise<Service | null> {
    try {
      return await ServicesService.create(service);
    } catch (error) {
      logger.error('DatabaseService.createService error:', error);
      return null;
    }
  }

  async updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
    try {
      return await ServicesService.update(id, updates as ServiceUpdate);
    } catch (error) {
      logger.error('DatabaseService.updateService error:', error);
      return null;
    }
  }

  async deleteService(id: string): Promise<void> {
    try {
      await ServicesService.delete(id);
    } catch (error) {
      logger.error('DatabaseService.deleteService error:', error);
      throw error;
    }
  }

  // ===== MÉDIAS =====
  async getMedia(): Promise<MediaFile[]> {
    try {
      return await MediaService.getAllMedia();
    } catch (error) {
      logger.error('DatabaseService.getMedia error:', error);
      return [];
    }
  }

  async getMediaById(id: string): Promise<MediaFile | null> {
    try {
      return await MediaService.getMediaById(id);
    } catch (error) {
      logger.error('DatabaseService.getMediaById error:', error);
      return null;
    }
  }

  // ===== RÉALISATIONS (SHE) =====
  async getRealizations(): Promise<Realization[]> {
    try {
      return await RealizationsService.getAll();
    } catch (error) {
      logger.error('DatabaseService.getRealizations error:', error);
      return [];
    }
  }

  async getPublishedRealizations(): Promise<Realization[]> {
    try {
      return await RealizationsService.getActiveRealizations();
    } catch (error) {
      logger.error('DatabaseService.getPublishedRealizations error:', error);
      return [];
    }
  }

  async getRealizationById(id: string): Promise<Realization | null> {
    try {
      return await RealizationsService.getById(id);
    } catch (error) {
      logger.error('DatabaseService.getRealizationById error:', error);
      return null;
    }
  }

  async createRealization(realization: Omit<Realization, 'id' | 'created_at'>): Promise<Realization | null> {
    try {
      return await RealizationsService.create(realization);
    } catch (error) {
      logger.error('DatabaseService.createRealization error:', error);
      return null;
    }
  }

  async updateRealization(id: string, updates: Partial<Realization>): Promise<Realization | null> {
    try {
      return await RealizationsService.update(id, updates);
    } catch (error) {
      logger.error('DatabaseService.updateRealization error:', error);
      return null;
    }
  }

  async deleteRealization(id: string): Promise<void> {
    try {
      await RealizationsService.delete(id);
    } catch (error) {
      logger.error('DatabaseService.deleteRealization error:', error);
      throw error;
    }
  }

  // ===== ARTICLES DE BLOG =====
  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      return await BlogPostsService.getAll();
    } catch (error) {
      logger.error('DatabaseService.getBlogPosts error:', error);
      return [];
    }
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    try {
      return await BlogPostsService.getPublished();
    } catch (error) {
      logger.error('DatabaseService.getPublishedBlogPosts error:', error);
      return [];
    }
  }

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      return await BlogPostsService.getByCategory(category);
    } catch (error) {
      logger.error('DatabaseService.getBlogPostsByCategory error:', error);
      return [];
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      return await BlogPostsService.getBySlug(slug);
    } catch (error) {
      logger.error('DatabaseService.getBlogPostBySlug error:', error);
      return null;
    }
  }

  async getBlogPostById(id: string): Promise<BlogPost | null> {
    try {
      return await BlogPostsService.getById(id);
    } catch (error) {
      logger.error('DatabaseService.getBlogPostById error:', error);
      return null;
    }
  }

  async createBlogPost(post: Omit<BlogPost, 'id' | 'created_at'>): Promise<BlogPost | null> {
    try {
      return await BlogPostsService.create(post);
    } catch (error) {
      logger.error('DatabaseService.createBlogPost error:', error);
      return null;
    }
  }

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    try {
      return await BlogPostsService.update(id, updates);
    } catch (error) {
      logger.error('DatabaseService.updateBlogPost error:', error);
      return null;
    }
  }

  async deleteBlogPost(id: string): Promise<void> {
    try {
      await BlogPostsService.delete(id);
    } catch (error) {
      logger.error('DatabaseService.deleteBlogPost error:', error);
      throw error;
    }
  }

  // ===== TÉMOIGNAGES =====
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      return await TestimonialsService.getAll();
    } catch (error) {
      logger.error('DatabaseService.getTestimonials error:', error);
      return [];
    }
  }

  async getPublishedTestimonials(): Promise<Testimonial[]> {
    try {
      return await TestimonialsService.getActiveTestimonials();
    } catch (error) {
      logger.error('DatabaseService.getPublishedTestimonials error:', error);
      return [];
    }
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    try {
      return await TestimonialsService.getFeatured();
    } catch (error) {
      logger.error('DatabaseService.getFeaturedTestimonials error:', error);
      return [];
    }
  }

  // ===== ÉQUIPE =====
  async getTeamMembers(): Promise<TeamMember[]> {
    try {
      return await TeamService.getAll();
    } catch (error) {
      logger.error('DatabaseService.getTeamMembers error:', error);
      return [];
    }
  }

  async getPublishedTeamMembers(): Promise<TeamMember[]> {
    try {
      return await TeamService.getActiveMembers();
    } catch (error) {
      logger.error('DatabaseService.getPublishedTeamMembers error:', error);
      return [];
    }
  }

  // ===== RESSOURCES =====
  async getResources(): Promise<Resource[]> {
    try {
      return await ResourcesService.getAll();
    } catch (error) {
      logger.error('DatabaseService.getResources error:', error);
      return [];
    }
  }

  async getPublishedResources(): Promise<Resource[]> {
    try {
      return await ResourcesService.getActiveResources();
    } catch (error) {
      logger.error('DatabaseService.getPublishedResources error:', error);
      return [];
    }
  }

  async getResourcesByType(type: string): Promise<Resource[]> {
    try {
      return await ResourcesService.getByType(type);
    } catch (error) {
      logger.error('DatabaseService.getResourcesByType error:', error);
      return [];
    }
  }

  // ===== PARAMÈTRES DU SITE =====
  async getSiteSettings(): Promise<SiteSetting[]> {
    try {
      return await SiteSettingsService.getAll();
    } catch (error) {
      logger.error('DatabaseService.getSiteSettings error:', error);
      return [];
    }
  }

  async getSiteSettingByKey(key: string): Promise<SiteSetting | null> {
    try {
      return await SiteSettingsService.getByKey(key);
    } catch (error) {
      logger.error('DatabaseService.getSiteSettingByKey error:', error);
      return null;
    }
  }

  // ===== TEXTES DU SITE =====
  async getSiteTexts(): Promise<SiteText[]> {
    try {
      return await SiteTextsService.getAll();
    } catch (error) {
      logger.error('DatabaseService.getSiteTexts error:', error);
      return [];
    }
  }

  async getSiteTextByKey(key: string): Promise<SiteText | null> {
    try {
      return await SiteTextsService.getByKey(key);
    } catch (error) {
      logger.error('DatabaseService.getSiteTextByKey error:', error);
      return null;
    }
  }

  async updateSiteText(id: string, updates: Partial<SiteText>): Promise<SiteText | null> {
    try {
      return await SiteTextsService.update(id, updates);
    } catch (error) {
      logger.error('DatabaseService.updateSiteText error:', error);
      return null;
    }
  }

  async updateSiteTextByKey(key: string, language: string, content: string): Promise<SiteText | null> {
    try {
      return await SiteTextsService.updateByKey(key, language, content);
    } catch (error) {
      logger.error('DatabaseService.updateSiteTextByKey error:', error);
      return null;
    }
  }

  // ===== PAGES UNIVERS =====
  async getUniversePages(): Promise<UniversePage[]> {
    try {
      return await UniversePagesService.getAll();
    } catch (error) {
      logger.error('DatabaseService.getUniversePages error:', error);
      return [];
    }
  }

  async getUniversePageBySlug(universe: string, slug: string): Promise<UniversePage | null> {
    try {
      return await UniversePagesService.getBySlug(universe, slug);
    } catch (error) {
      logger.error('DatabaseService.getUniversePageBySlug error:', error);
      return null;
    }
  }

  async getUniversePageById(id: string): Promise<UniversePage | null> {
    try {
      return await UniversePagesService.getById(id);
    } catch (error) {
      logger.error('DatabaseService.getUniversePageById error:', error);
      return null;
    }
  }

  // ===== SOUSCRIPTIONS CONTACT =====
  async createContactSubscription(subscription: ContactSubscriptionInsert): Promise<ContactSubscription | null> {
    try {
      return await ContactSubscriptionsService.create(subscription);
    } catch (error) {
      logger.error('DatabaseService.createContactSubscription error:', error);
      return null;
    }
  }

  async getContactSubscriptions(): Promise<ContactSubscription[]> {
    try {
      return await ContactSubscriptionsService.getAll();
    } catch (error) {
      logger.error('DatabaseService.getContactSubscriptions error:', error);
      return [];
    }
  }

  // ===== NEWSLETTER =====
  async subscribeToNewsletter(email: string, name?: string, source?: string): Promise<NewsletterSubscriber | null> {
    try {
      return await NewsletterSubscriptionsService.subscribe(email, name, source);
    } catch (error) {
      logger.error('DatabaseService.subscribeToNewsletter error:', error);
      return null;
    }
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    try {
      return await NewsletterSubscriptionsService.getAll();
    } catch (error) {
      logger.error('DatabaseService.getNewsletterSubscribers error:', error);
      return [];
    }
  }

  async unsubscribeFromNewsletter(emailOrToken: string): Promise<NewsletterSubscriber | null> {
    try {
      return await NewsletterSubscriptionsService.unsubscribe(emailOrToken);
    } catch (error) {
      logger.error('DatabaseService.unsubscribeFromNewsletter error:', error);
      return null;
    }
  }
}

// Export singleton
export const DatabaseService = new DatabaseServiceClass();

// Export des types
export {
  Product,
  Podcast,
  Service,
  MediaFile,
  Realization,
  BlogPost,
  Testimonial,
  TeamMember,
  Resource,
  SiteSetting,
  SiteText,
  UniversePage,
  ContactSubscription,
  ContactSubscriptionInsert,
  ContactSubscriptionUpdate,
  NewsletterSubscriber,
  NewsletterSubscriberInsert,
};

