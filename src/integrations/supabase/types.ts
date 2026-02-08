export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image: string | null
          gallery_images: string[]
          category: string | null
          status: string | null
          featured: boolean | null
          seo_title: string | null
          seo_description: string | null
          tags: string[]
          view_count: number | null
          reading_time: number | null
          published_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          gallery_images?: string[]
          category?: string | null
          status?: string | null
          featured?: boolean | null
          seo_title?: string | null
          seo_description?: string | null
          tags?: string[]
          view_count?: number | null
          reading_time?: number | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          gallery_images?: string[]
          category?: string | null
          status?: string | null
          featured?: boolean | null
          seo_title?: string | null
          seo_description?: string | null
          tags?: string[]
          view_count?: number | null
          reading_time?: number | null
          published_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      contact_subscriptions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string | null
          message: string
          created_at: string | null
          service_interest: string | null
          budget_range: string | null
          timeline: string | null
          status: string | null
          priority: string | null
          assigned_to: string | null
          notes: string | null
          source: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject?: string | null
          message: string
          created_at?: string | null
          service_interest?: string | null
          budget_range?: string | null
          timeline?: string | null
          status?: string | null
          priority?: string | null
          assigned_to?: string | null
          notes?: string | null
          source?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string | null
          message?: string
          created_at?: string | null
          service_interest?: string | null
          budget_range?: string | null
          timeline?: string | null
          status?: string | null
          priority?: string | null
          assigned_to?: string | null
          notes?: string | null
          source?: string | null
          updated_at?: string | null
        }
      }
      media: {
        Row: {
          id: string
          filename: string
          original_name: string
          url: string
          type: string
          size: number
          alt_text: string | null
          category: string | null
          folder_path: string | null
          metadata: Json
          created_at: string | null
        }
        Insert: {
          id?: string
          filename: string
          original_name: string
          url: string
          type: string
          size: number
          alt_text?: string | null
          category?: string | null
          folder_path?: string | null
          metadata?: Json
          created_at?: string | null
        }
        Update: {
          id?: string
          filename?: string
          original_name?: string
          url?: string
          type?: string
          size?: number
          alt_text?: string | null
          category?: string | null
          folder_path?: string | null
          metadata?: Json
          created_at?: string | null
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          created_at: string | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string | null
        }
      }
      podcasts: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          audio_url: string | null
          transcript: string | null
          duration: number | null
          episode_number: number | null
          thumbnail_url: string | null
          featured: boolean | null
          status: string | null
          published_at: string | null
          tags: string[]
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          audio_url?: string | null
          transcript?: string | null
          duration?: number | null
          episode_number?: number | null
          thumbnail_url?: string | null
          featured?: boolean | null
          status?: string | null
          published_at?: string | null
          tags?: string[]
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          audio_url?: string | null
          transcript?: string | null
          duration?: number | null
          episode_number?: number | null
          thumbnail_url?: string | null
          featured?: boolean | null
          status?: string | null
          published_at?: string | null
          tags?: string[]
          created_at?: string | null
          updated_at?: string | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          price: string
          images: string[]
          featured_image: string | null
          sizes_available: string[]
          colors: string[]
          materials: string | null
          inventory_count: number | null
          featured: boolean | null
          status: string | null
          tags: string[]
          detailed_description: string | null
          care_instructions: string | null
          order_index: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description: string
          category: string
          price: string
          images?: string[]
          featured_image?: string | null
          sizes_available?: string[]
          colors?: string[]
          materials?: string | null
          inventory_count?: number | null
          featured?: boolean | null
          status?: string | null
          tags?: string[]
          detailed_description?: string | null
          care_instructions?: string | null
          order_index?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category?: string
          price?: string
          images?: string[]
          featured_image?: string | null
          sizes_available?: string[]
          colors?: string[]
          materials?: string | null
          inventory_count?: number | null
          featured?: boolean | null
          status?: string | null
          tags?: string[]
          detailed_description?: string | null
          care_instructions?: string | null
          order_index?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          image_url: string
          gallery_images: string[]
          featured: boolean | null
          status: string | null
          client_name: string | null
          project_date: string | null
          location: string | null
          tags: string[]
          content: string | null
          budget_range: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          image_url: string
          gallery_images?: string[]
          featured?: boolean | null
          status?: string | null
          client_name?: string | null
          project_date?: string | null
          location?: string | null
          tags?: string[]
          content?: string | null
          budget_range?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          image_url?: string
          gallery_images?: string[]
          featured?: boolean | null
          status?: string | null
          client_name?: string | null
          project_date?: string | null
          location?: string | null
          tags?: string[]
          content?: string | null
          budget_range?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      realizations: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          image_url: string
          gallery_images: string[]
          client_name: string | null
          project_date: string | null
          location: string | null
          budget_range: string | null
          tags: string[]
          content: string | null
          before_after_images: string[]
          testimonial_id: string | null
          featured: boolean | null
          status: string | null
          order_index: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          image_url: string
          gallery_images?: string[]
          client_name?: string | null
          project_date?: string | null
          location?: string | null
          budget_range?: string | null
          tags?: string[]
          content?: string | null
          before_after_images?: string[]
          testimonial_id?: string | null
          featured?: boolean | null
          status?: string | null
          order_index?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          image_url?: string
          gallery_images?: string[]
          client_name?: string | null
          project_date?: string | null
          location?: string | null
          budget_range?: string | null
          tags?: string[]
          content?: string | null
          before_after_images?: string[]
          testimonial_id?: string | null
          featured?: boolean | null
          status?: string | null
          order_index?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      resources: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          type: string
          file_url: string
          thumbnail_url: string | null
          download_count: number | null
          featured: boolean | null
          status: string | null
          tags: string[]
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          type: string
          file_url: string
          thumbnail_url?: string | null
          download_count?: number | null
          featured?: boolean | null
          status?: string | null
          tags?: string[]
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          type?: string
          file_url?: string
          thumbnail_url?: string | null
          download_count?: number | null
          featured?: boolean | null
          status?: string | null
          tags?: string[]
          created_at?: string | null
          updated_at?: string | null
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          features: string[]
          price_range: string | null
          duration: string | null
          icon_name: string
          featured: boolean | null
          status: string | null
          order_index: number | null
          detailed_inclusions: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          features?: string[]
          price_range?: string | null
          duration?: string | null
          icon_name: string
          featured?: boolean | null
          status?: string | null
          order_index?: number | null
          detailed_inclusions?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          features?: string[]
          price_range?: string | null
          duration?: string | null
          icon_name: string
          featured?: boolean | null
          status?: string | null
          order_index?: number | null
          detailed_inclusions?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          category: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          key: string
          value: Json
          description?: string | null
          category?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          description?: string | null
          category?: string | null
          updated_at?: string | null
        }
      }
      site_texts: {
        Row: {
          id: string
          key: string
          content: string
          page: string
          section: string
          language: string | null
          content_type: string | null
          last_modified: string | null
          modified_by: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          key: string
          content: string
          page: string
          section: string
          language?: string | null
          content_type?: string | null
          last_modified?: string | null
          modified_by?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          key?: string
          content?: string
          page?: string
          section?: string
          language?: string | null
          content_type?: string | null
          last_modified?: string | null
          modified_by?: string | null
          created_at?: string | null
        }
      }
      team: {
        Row: {
          id: string
          name: string
          role: string
          bio: string | null
          image_url: string | null
          category: string | null
          social_links: Json
          featured: boolean | null
          status: string | null
          order_index: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          role: string
          bio?: string | null
          image_url?: string | null
          category?: string | null
          social_links?: Json
          featured?: boolean | null
          status?: string | null
          order_index?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          role?: string
          bio?: string | null
          image_url?: string | null
          category?: string | null
          social_links?: Json
          featured?: boolean | null
          status?: string | null
          order_index?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      testimonials: {
        Row: {
          id: string
          quote: string
          author: string
          role: string
          category: string | null
          featured: boolean | null
          status: string | null
          image_url: string | null
          rating: number | null
          project_id: string | null
          realization_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          quote: string
          author: string
          role: string
          category?: string | null
          featured?: boolean | null
          status?: string | null
          image_url?: string | null
          rating?: number | null
          project_id?: string | null
          realization_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          quote?: string
          author?: string
          role?: string
          category?: string | null
          featured?: boolean | null
          status?: string | null
          image_url?: string | null
          rating?: number | null
          project_id?: string | null
          realization_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      universe_pages: {
        Row: {
          id: string
          universe: string
          page_type: string
          hero_title: string | null
          hero_subtitle: string | null
          hero_description: string | null
          hero_background_image: string | null
          hero_overlay_color: string | null
          sections_content: Json
          call_to_action: Json
          seo_title: string | null
          seo_description: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          universe: string
          page_type: string
          hero_title?: string | null
          hero_subtitle?: string | null
          hero_description?: string | null
          hero_background_image?: string | null
          hero_overlay_color?: string | null
          sections_content?: Json
          call_to_action?: Json
          seo_title?: string | null
          seo_description?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          universe?: string
          page_type?: string
          hero_title?: string | null
          hero_subtitle?: string | null
          hero_description?: string | null
          hero_background_image?: string | null
          hero_overlay_color?: string | null
          sections_content?: Json
          call_to_action?: Json
          seo_title?: string | null
          seo_description?: string | null
          status?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const