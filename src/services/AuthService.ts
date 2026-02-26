// src/services/AuthService.ts
import { supabase } from '@/integrations/supabase/client';
import logger from '@/lib/logger';

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
  full_name?: string;
}

export class AuthService {
  private static currentUser: AuthUser | null = null;

  // Connexion via Supabase Auth
  static async login(credentials: LoginCredentials): Promise<AuthUser> {
    try {
      // 1. Authentification Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('Utilisateur non trouvé');

      // 2. Récupérer le profil utilisateur (rôle)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        logger.error('Error fetching profile:', profileError);
        // Fallback: si pas de profil, on assume 'user' basic
      }

      // 3. Construire l'objet utilisateur unifié
      this.currentUser = {
        id: data.user.id,
        email: data.user.email!,
        role: profile?.role || 'user',
        name: profile?.full_name || data.user.user_metadata?.full_name,
        avatar_url: profile?.avatar_url || data.user.user_metadata?.avatar_url,
        full_name: profile?.full_name
      };

      return this.currentUser;
    } catch (error) {
      logger.error('Login error:', error);
      throw error; // Propager l'erreur pour l'UI
    }
  }

  // Inscription via Supabase Auth
  static async register(credentials: LoginCredentials & { name?: string }): Promise<AuthUser> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            full_name: credentials.name,
          }
        }
      });

      if (error) throw error;
      if (!data.user) throw new Error('Erreur lors de la création');

      // Le trigger SQL devrait créer le profil automatiquement.
      // On retourne l'utilisateur immédiatement.

      this.currentUser = {
        id: data.user.id,
        email: data.user.email!,
        role: 'user', // Défaut
        name: credentials.name,
        full_name: credentials.name
      };

      return this.currentUser;
    } catch (error) {
      logger.error('Register error:', error);
      throw error;
    }
  }

  // Déconnexion
  static async logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.currentUser = null;
    } catch (error) {
      logger.error('Logout error:', error);
      throw error;
    }
  }

  // Récupérer l'utilisateur courant (et rafraîchir le profil)
  static async getCurrentUser(): Promise<AuthUser | null> {
    try {
      // 1. Vérifier la session active
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session?.user) {
        this.currentUser = null;
        return null;
      }

      // 2. Récupérer le profil à jour
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      // 3. Mettre à jour l'état local
      this.currentUser = {
        id: session.user.id,
        email: session.user.email!,
        role: profile?.role || 'user',
        name: profile?.full_name || session.user.user_metadata?.full_name,
        avatar_url: profile?.avatar_url || session.user.user_metadata?.avatar_url,
        full_name: profile?.full_name
      };

      return this.currentUser;
    } catch (error) {
      // Harmless race during auth/session refresh; avoid noisy logs.
      if (error instanceof DOMException && error.name === 'AbortError') {
        return null;
      }
      logger.error('Get current user error:', error);
      return null;
    }
  }

  // Écouteur de changement d'état
  static onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // On re-fetch le user pour avoir le rôle à jour
        const user = await this.getCurrentUser();
        callback(user);
      } else {
        this.currentUser = null;
        callback(null);
      }
    });
  }

  // Vérifier si admin (Helpers)
  static isAdmin(user: AuthUser | null): boolean {
    return user?.role === 'admin';
  }

  // Mettre à jour le profil 
  static async updateProfile(updates: Partial<AuthUser>): Promise<AuthUser> {
    try {
      const user = await this.getCurrentUser();
      if (!user) throw new Error('Non connecté');

      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.name || updates.full_name,
          avatar_url: updates.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      // Update local state
      this.currentUser = {
        ...user,
        name: data.full_name,
        full_name: data.full_name,
        avatar_url: data.avatar_url
      };

      return this.currentUser;
    } catch (error) {
      logger.error('Update profile error:', error);
      throw error;
    }
  }
}

export default AuthService;
