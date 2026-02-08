// src/services/DatabaseService.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/integrations/supabase/client';

// Types simples pour éviter les erreurs de typage Supabase
export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  avatar_url?: string;
  phone?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MediaFile {
  id: string;
  filename: string;
  original_name: string;
  url: string;
  type: string;
  size: number;
  alt_text?: string;
  category?: string;
  folder_path?: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  featured_image?: string;
  status: string;
  category?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  status: string;
  audio_url?: string;
  thumbnail_url?: string;
  duration?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price?: string;
  images: string[];
  featured_image?: string;
  status: string;
  icon_name?: string;
  features?: string[];
  created_at?: string;
  updated_at?: string;
}

export class DatabaseService {
  // Users
  static async getUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data as User[]) || [];
  }

  static async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const { data, error } = await (supabase
      .from('users') as any)
      .insert({
        ...user,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .single();
    
    if (error) throw error;
    return data as User;
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await (supabase
      .from('users') as any)
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as User;
  }

  static async deleteUser(id: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Media - adapté à la vraie structure
  static async getMedia(category?: string): Promise<MediaFile[]> {
    let query = supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (category) {
      // Validation de la catégorie pour prévenir l'injection
      const validCategories = ['images', 'videos', 'audio', 'documents', 'icons'];
      if (!validCategories.includes(category)) {
        throw new Error('Catégorie invalide');
      }
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return (data as MediaFile[]) || [];
  }

  static async createMedia(media: Omit<MediaFile, 'id' | 'created_at' | 'updated_at'>): Promise<MediaFile> {
    const { data, error } = await (supabase
      .from('media') as any)
      .insert({
        ...media,
        created_at: new Date().toISOString(),
      })
      .single();
    
    if (error) throw error;
    return data as MediaFile;
  }

  static async updateMedia(id: string, updates: Partial<MediaFile>): Promise<MediaFile> {
    const { data, error } = await (supabase
      .from('media') as any)
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as MediaFile;
  }

  static async deleteMedia(id: string): Promise<void> {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Products - adapté à la vraie structure
  static async getProducts(category?: string): Promise<Product[]> {
    let query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return (data as Product[]) || [];
  }

  static async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const { data, error } = await (supabase
      .from('products') as any)
      .insert({
        ...product,
        created_at: new Date().toISOString(),
      })
      .single();
    
    if (error) throw error;
    return data as Product;
  }

  static async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await (supabase
      .from('products') as any)
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Product;
  }

  static async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Podcasts - adapté à la vraie structure
  static async getPodcasts(): Promise<Podcast[]> {
    const { data, error } = await supabase
      .from('podcasts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data as Podcast[]) || [];
  }

  static async createPodcast(podcast: Omit<Podcast, 'id' | 'created_at' | 'updated_at'>): Promise<Podcast> {
    const { data, error } = await (supabase
      .from('podcasts') as any)
      .insert({
        ...podcast,
        created_at: new Date().toISOString(),
      })
      .single();
    
    if (error) throw error;
    return data as Podcast;
  }

  static async updatePodcast(id: string, updates: Partial<Podcast>): Promise<Podcast> {
    const { data, error } = await (supabase
      .from('podcasts') as any)
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Podcast;
  }

  static async deletePodcast(id: string): Promise<void> {
    const { error } = await supabase
      .from('podcasts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Services - adapté à la vraie structure
  static async getServices(category?: string): Promise<Service[]> {
    let query = supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (category) {
      // Validation de la catégorie pour prévenir l'injection
      const validCategories = ['SHE', 'DENSE', 'CaFEE', 'consulting', 'design', 'development'];
      if (!validCategories.includes(category)) {
        throw new Error('Catégorie invalide');
      }
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return (data as Service[]) || [];
  }

  static async createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service> {
    const { data, error } = await (supabase
      .from('services') as any)
      .insert({
        ...service,
        created_at: new Date().toISOString(),
      })
      .single();
    
    if (error) throw error;
    return data as Service;
  }

  static async updateService(id: string, updates: Partial<Service>): Promise<Service> {
    const { data, error } = await (supabase
      .from('services') as any)
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Service;
  }

  static async deleteService(id: string): Promise<void> {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
}
