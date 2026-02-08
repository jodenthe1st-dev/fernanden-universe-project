import { supabaseRaw } from '../client'
import type { Database } from '../types'

type BlogPostRow = Database['public']['Tables']['blog_posts']['Row']
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']
type BlogPostSelect = { featured: boolean }
type BlogPostStatusSelect = { status: string; published_at: string | null }
type BlogPostViewCountSelect = { view_count: number }
type BlogPostCategorySelect = { category: string | null }
type BlogPostStatsSelect = { status: string; featured: boolean; view_count: number; category: string | null }

export type BlogPost = BlogPostRow
export type { BlogPostInsert, BlogPostUpdate }

export class BlogPostsService {
  // Récupérer tous les articles
  static async getAll(): Promise<BlogPost[]> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })

    if (error) throw error
    return data as BlogPost[] || []
  }

  // Récupérer les articles publiés
  static async getPublished(): Promise<BlogPost[]> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error) throw error
    return data as BlogPost[] || []
  }

  // Récupérer les articles featured
  static async getFeatured(): Promise<BlogPost[]> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('featured', true)
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error) throw error
    return data as BlogPost[] || []
  }

  // Récupérer les articles par catégorie
  static async getByCategory(category: string): Promise<BlogPost[]> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error) throw error
    return data as BlogPost[] || []
  }

  // Récupérer un article par slug
  static async getBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) throw error
    return data as BlogPost
  }

  // Récupérer un article par ID
  static async getById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as BlogPost
  }

  // Créer un article
  static async create(post: BlogPostInsert): Promise<BlogPost> {
    const { data, error } = await (supabaseRaw
      .from('blog_posts') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(post)
      .select()
      .single()

    if (error) throw error
    return data as BlogPost
  }

  // Mettre à jour un article
  static async update(id: string, updates: BlogPostUpdate): Promise<BlogPost> {
    const { data, error } = await (supabaseRaw
      .from('blog_posts') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as BlogPost
  }

  // Supprimer un article
  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Toggle featured status
  static async toggleFeatured(id: string): Promise<BlogPost> {
    const { data: post } = await supabaseRaw
      .from('blog_posts')
      .select('featured')
      .eq('id', id)
      .single()

    if (!post) throw new Error('Blog post not found')

    return this.update(id, { featured: !(post as BlogPostSelect).featured })
  }

  // Publier/Dépublier un article
  static async togglePublish(id: string): Promise<BlogPost> {
    const { data: post } = await supabaseRaw
      .from('blog_posts')
      .select('status, published_at')
      .eq('id', id)
      .single()

    if (!post) throw new Error('Blog post not found')

    const isPublishing = (post as BlogPostStatusSelect).status !== 'published'
    
    return this.update(id, { 
      status: isPublishing ? 'published' : 'draft',
      published_at: isPublishing ? new Date().toISOString() : null
    })
  }

  // Incrémenter le compteur de vues
  static async incrementViewCount(id: string): Promise<BlogPost> {
    const { data: post } = await supabaseRaw
      .from('blog_posts')
      .select('view_count')
      .eq('id', id)
      .single()

    if (!post) throw new Error('Blog post not found')

    return this.update(id, { view_count: (post as BlogPostViewCountSelect).view_count + 1 })
  }

  // Rechercher des articles
  static async searchPosts(query: string): Promise<BlogPost[]> {
    if (!query || query.trim().length === 0) {
      return [];
    }
    
    // Nettoyer et valider la requête
    const cleanedQuery = query.trim().slice(0, 100); // Limiter la longueur
    
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${cleanedQuery}%,excerpt.ilike.%${cleanedQuery}%,content.ilike.%${cleanedQuery}%,tags.cs.{${cleanedQuery}}`)
      .order('published_at', { ascending: false })
      .limit(50) // Limiter les résultats

    if (error) throw error
    return data as BlogPost[] || []
  }

  // Récupérer les catégories disponibles
  static async getCategories(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('category')
      .eq('status', 'published')
      .not('category', 'is', null)

    if (error) throw error
    
    const categories = [...new Set(data?.map((p: BlogPostCategorySelect) => p.category).filter(Boolean) || [])] as string[]
    return categories.sort()
  }

  // Récupérer les articles récents
  static async getRecent(limit: number = 5): Promise<BlogPost[]> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as BlogPost[] || []
  }

  // Récupérer les articles populaires (par vues)
  static async getPopular(limit: number = 5): Promise<BlogPost[]> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('view_count', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as BlogPost[] || []
  }

  // Récupérer les articles par tag
  static async getByTag(tag: string): Promise<BlogPost[]> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .contains('tags', [tag])
      .order('published_at', { ascending: false })

    if (error) throw error
    return data as BlogPost[] || []
  }

  // Récupérer les articles connexes
  static async getRelated(postId: string, category: string | null, limit: number = 3): Promise<BlogPost[]> {
    let query = supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .neq('id', postId)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) throw error
    return data as BlogPost[] || []
  }

  // Récupérer les statistiques des articles
  static async getBlogStats(): Promise<{
    total: number
    published: number
    featured: number
    totalViews: number
    categories: string[]
  }> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('status, featured, view_count, category')

    if (error) throw error

    const categories = [...new Set(data?.map((p: BlogPostStatsSelect) => p.category).filter(Boolean) || [])] as string[]

    const stats = {
      total: data?.length || 0,
      published: data?.filter((p: BlogPostStatsSelect) => p.status === 'published').length || 0,
      featured: data?.filter((p: BlogPostStatsSelect) => p.featured).length || 0,
      totalViews: data?.reduce((sum, p: BlogPostStatsSelect) => sum + p.view_count, 0) || 0,
      categories
    }

    return stats
  }
}
