import { supabase } from './client';
import logger from '@/lib/logger';

export interface SiteConfig {
  id: string;
  site_name: string;
  site_description: string;
  site_url: string;
  logo_url?: string;
  favicon_url?: string;
  
  // Header Configuration
  header_title: string;
  header_tagline: string;
  header_cta_text: string;
  header_cta_link: string;
  navigation_links: NavigationLink[];
  
  // Footer Configuration
  footer_description: string;
  footer_copyright: string;
  footer_social_links: SocialLink[];
  footer_quick_links: FooterLink[];
  footer_legal_links: FooterLink[];
  
  // Contact Information
  contact_email: string;
  contact_phone?: string;
  contact_address?: string;
  contact_whatsapp?: string;
  
  // SEO Configuration
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image?: string;
  
  // Design Configuration
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  font_family: string;
  
  // Social Media
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
  
  created_at: string;
  updated_at: string;
}

export interface NavigationLink {
  id: string;
  label: string;
  href: string;
  order_index: number;
  is_external: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  order_index: number;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
  order_index: number;
}

export const getSiteConfig = async (): Promise<SiteConfig | null> => {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .single();

    if (error) {
      logger.error('Error fetching site config:', error);
      return null;
    }

    return data;
  } catch (error) {
    logger.error('Error fetching site config:', error);
    return null;
  }
};

export const updateSiteConfig = async (config: Partial<SiteConfig>): Promise<boolean> => {
  try {
    // Pour l'instant, utiliser localStorage en attendant la table Supabase
    localStorage.setItem('site_config', JSON.stringify({
      ...config,
      updated_at: new Date().toISOString()
    }));
    return true;
    
    // Code pour quand la table sera créée dans Supabase:
    /*
    const { error } = await supabase
      .from('site_config')
      .upsert({
        ...config,
        updated_at: new Date().toISOString()
      });

    if (error) {
      logger.error('Error updating site config:', error);
      return false;
    }

    return true;
    */
  } catch (error) {
    logger.error('Error updating site config:', error);
    return false;
  }
};

// Default configuration
export const defaultSiteConfig: Partial<SiteConfig> = {
  site_name: 'Fernanden',
  site_description: 'Architecture, Design & Création',
  site_url: 'https://fernanden.com',
  
  header_title: 'Fernanden',
  header_tagline: 'Architecture • Design • Création',
  header_cta_text: 'Découvrir nos services',
  header_cta_link: '/contact',
  
  footer_description: 'Fernanden est un studio d\'architecture et de design qui crée des espaces uniques et inspirants.',
  footer_copyright: `© ${new Date().getFullYear()} Fernanden. Tous droits réservés.`,
  
  contact_email: 'contact@fernanden.com',
  contact_phone: '+33 1 23 45 67 89',
  contact_address: '123 Rue de la Création, 75001 Paris, France',
  
  meta_title: 'Fernanden - Architecture & Design',
  meta_description: 'Studio d\'architecture et de design créant des espaces uniques et inspirants.',
  meta_keywords: 'architecture, design, création, intérieur, espace',
  
  primary_color: '#6366f1',
  secondary_color: '#8b5cf6',
  accent_color: '#ec4899',
  font_family: 'Inter',
  
  facebook_url: 'https://facebook.com/fernanden',
  instagram_url: 'https://instagram.com/fernanden',
  twitter_url: 'https://twitter.com/fernanden',
  linkedin_url: 'https://linkedin.com/company/fernanden'
};
