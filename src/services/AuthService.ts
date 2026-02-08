// src/services/AuthService.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '@/integrations/supabase/client';
import logger from '@/lib/logger';
import { User } from './DatabaseService';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: string;
  avatar_url?: string;
}

export class AuthService {
  private static currentUser: AuthUser | null = null;

  // Connexion
  static async login(credentials: LoginCredentials): Promise<AuthUser> {
    try {
      // 1. Connexion Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      // 2. Récupérer les infos utilisateur depuis notre table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', credentials.email)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        throw userError;
      }

      // 3. Créer l'utilisateur s'il n'existe pas
      if (!userData) {
        const newUser = await this.createUserFromAuth(data.user);
        this.currentUser = newUser;
        return newUser;
      }

      // 4. Retourner l'utilisateur existant
      this.currentUser = {
        id: (userData as any).id,
        email: (userData as any).email,
        name: (userData as any).name,
        role: (userData as any).role,
        avatar_url: (userData as any).avatar_url,
      };

      return this.currentUser;
    } catch (error) {
      logger.error('Login error:', error);
      throw new Error('Erreur lors de la connexion');
    }
  }

  // Inscription
  static async register(credentials: LoginCredentials & { name?: string }): Promise<AuthUser> {
    try {
      // 1. Création utilisateur Supabase
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      // 2. Création utilisateur dans notre table
      const newUser = await this.createUserFromAuth(data.user, credentials.name);
      this.currentUser = newUser;
      return newUser;
    } catch (error) {
      logger.error('Register error:', error);
      throw new Error('Erreur lors de l\'inscription');
    }
  }

  // Déconnexion
  static async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();
      this.currentUser = null;
    } catch (error) {
      logger.error('Logout error:', error);
      throw new Error('Erreur lors de la déconnexion');
    }
  }

  // Vérifier si connecté
  static async getCurrentUser(): Promise<AuthUser | null> {
    try {
      if (this.currentUser) {
        return this.currentUser;
      }

      // 1. Vérifier session Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return null;
      }

      // 2. Récupérer infos utilisateur
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('email', session.user.email)
        .single();

      if (!userData) {
        return null;
      }

      this.currentUser = {
        id: (userData as any).id,
        email: (userData as any).email,
        name: (userData as any).name,
        role: (userData as any).role,
        avatar_url: (userData as any).avatar_url,
      };

      return this.currentUser;
    } catch (error) {
      logger.error('Get current user error:', error);
      return null;
    }
  }

  // Écouteur de changement d'état
  static onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const user = await this.getCurrentUser();
        callback(user);
      } else {
        this.currentUser = null;
        callback(null);
      }
    });
  }

  // Vérifier si admin
  static isAdmin(user: AuthUser | null): boolean {
    return user?.role === 'admin';
  }

  // Créer utilisateur depuis auth Supabase
  private static async createUserFromAuth(authUser: { email?: string | null; id?: string }, name?: string): Promise<AuthUser> {
    const { data, error } = await (supabase
      .from('users') as any)
      .insert({
        email: authUser.email!,
        name: name || authUser.email?.split('@')[0],
        role: 'user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    const newUser = {
      id: (data as any).id,
      email: (data as any).email,
      name: (data as any).name,
      role: (data as any).role,
      avatar_url: (data as any).avatar_url,
    };

    this.currentUser = newUser;
    return newUser;
  }

  // Mettre à jour le profil
  static async updateProfile(updates: Partial<AuthUser>): Promise<AuthUser> {
    try {
      if (!this.currentUser) {
        throw new Error('Utilisateur non connecté');
      }

      const { data, error } = await (supabase
        .from('users') as any)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', this.currentUser.id)
        .select()
        .single();

      if (error) throw error;

      this.currentUser = { ...this.currentUser, ...(data as any) };
      return this.currentUser;
    } catch (error) {
      logger.error('Update profile error:', error);
      throw new Error('Erreur lors de la mise à jour du profil');
    }
  }
}

export default AuthService;
