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
  private static async orderBestEffort(baseQuery: ReturnType<typeof supabaseRaw.from>, limit?: number): Promise<BlogPost[]> {
    let ordered = baseQuery
      .select('*')
      .order('published_at', { ascending: false })
    if (typeof limit === 'number') ordered = ordered.limit(limit)
    if (!ordered.error) return (ordered.data as BlogPost[]) || []

    let fallback = baseQuery
      .select('*')
      .order('created_at', { ascending: false })
    if (typeof limit === 'number') fallback = fallback.limit(limit)
    if (!fallback.error) return (fallback.data as BlogPost[]) || []

    let plain = baseQuery.select('*')
    if (typeof limit === 'number') plain = plain.limit(limit)
    if (plain.error) throw ordered.error
    return (plain.data as BlogPost[]) || []
  }

  static async getAll(): Promise<BlogPost[]> {
    return this.orderBestEffort(supabaseRaw.from('blog_posts'))
  }

  static async getPublished(): Promise<BlogPost[]> {
    return this.orderBestEffort(
      supabaseRaw.from('blog_posts').eq('status', 'published')
    )
  }

  static async getFeatured(): Promise<BlogPost[]> {
    try {
      return await this.orderBestEffort(
        supabaseRaw.from('blog_posts').eq('featured', true).eq('status', 'published')
      )
    } catch {
      return this.orderBestEffort(
        supabaseRaw.from('blog_posts').eq('status', 'published')
      )
    }
  }

  static async getByCategory(category: string): Promise<BlogPost[]> {
    return this.orderBestEffort(
      supabaseRaw.from('blog_posts').eq('category', category).eq('status', 'published')
    )
  }

  static async getBySlug(slug: string): Promise<BlogPost | null> {
    const bySlug = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    if (!bySlug.error) return (bySlug.data as BlogPost) || null

    const byId = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('id', slug)
      .eq('status', 'published')
      .single()
    if (byId.error) throw bySlug.error
    return (byId.data as BlogPost) || null
  }

  static async getById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return (data as BlogPost) || null
  }

  static async create(post: BlogPostInsert): Promise<BlogPost> {
    const { data, error } = await (supabaseRaw
      .from('blog_posts') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(post)
      .select()
      .single()

    if (error) throw error
    return data as BlogPost
  }

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

  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  static async toggleFeatured(id: string): Promise<BlogPost> {
    const { data: post, error } = await supabaseRaw
      .from('blog_posts')
      .select('featured')
      .eq('id', id)
      .single()

    if (error) throw new Error('Featured flag is not available in current database schema')
    if (!post) throw new Error('Blog post not found')

    return this.update(id, { featured: !(post as BlogPostSelect).featured })
  }

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

  static async incrementViewCount(id: string): Promise<BlogPost> {
    const { data: post, error } = await supabaseRaw
      .from('blog_posts')
      .select('view_count')
      .eq('id', id)
      .single()

    if (error) return (await this.getById(id)) as BlogPost
    if (!post) throw new Error('Blog post not found')

    const current = Number((post as BlogPostViewCountSelect).view_count || 0)
    return this.update(id, { view_count: current + 1 })
  }

  static async searchPosts(query: string): Promise<BlogPost[]> {
    if (!query || query.trim().length === 0) return []

    const cleanedQuery = query.trim().slice(0, 100)

    const withTags = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${cleanedQuery}%,excerpt.ilike.%${cleanedQuery}%,content.ilike.%${cleanedQuery}%,tags.cs.{${cleanedQuery}}`)
      .order('published_at', { ascending: false })
      .limit(50)
    if (!withTags.error) return (withTags.data as BlogPost[]) || []

    const noTagsFallback = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${cleanedQuery}%,excerpt.ilike.%${cleanedQuery}%,content.ilike.%${cleanedQuery}%`)
      .order('created_at', { ascending: false })
      .limit(50)
    if (!noTagsFallback.error) return (noTagsFallback.data as BlogPost[]) || []

    throw withTags.error
  }

  static async getCategories(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('category')
      .eq('status', 'published')
      .not('category', 'is', null)

    if (error) throw error

    const categories = [...new Set((data || []).map((p: BlogPostCategorySelect) => p.category).filter(Boolean))] as string[]
    return categories.sort()
  }

  static async getRecent(limit: number = 5): Promise<BlogPost[]> {
    return this.orderBestEffort(
      supabaseRaw.from('blog_posts').eq('status', 'published'),
      limit
    )
  }

  static async getPopular(limit: number = 5): Promise<BlogPost[]> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('view_count', { ascending: false })
      .limit(limit)

    if (!error) return (data as BlogPost[]) || []
    return this.getRecent(limit)
  }

  static async getByTag(tag: string): Promise<BlogPost[]> {
    const { data, error } = await supabaseRaw
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .contains('tags', [tag])
      .order('published_at', { ascending: false })

    if (error) return []
    return (data as BlogPost[]) || []
  }

  static async getRelated(postId: string, category: string | null, limit: number = 3): Promise<BlogPost[]> {
    let query = supabaseRaw
      .from('blog_posts')
      .eq('status', 'published')
      .neq('id', postId)

    if (category) {
      query = query.eq('category', category)
    }

    return this.orderBestEffort(query, limit)
  }

  static async getBlogStats(): Promise<{
    total: number
    published: number
    featured: number
    totalViews: number
    categories: string[]
  }> {
    const withFeatured = await supabaseRaw
      .from('blog_posts')
      .select('status, featured, view_count, category')

    if (!withFeatured.error) {
      const rows = (withFeatured.data as BlogPostStatsSelect[]) || []
      const categories = [...new Set(rows.map((p) => p.category).filter(Boolean))] as string[]
      return {
        total: rows.length,
        published: rows.filter((p) => p.status === 'published').length,
        featured: rows.filter((p) => p.featured).length,
        totalViews: rows.reduce((sum, p) => sum + Number(p.view_count || 0), 0),
        categories
      }
    }

    const minimal = await supabaseRaw
      .from('blog_posts')
      .select('status, category')
    if (minimal.error) throw withFeatured.error

    const rows = (minimal.data as Array<{ status: string; category: string | null }>) || []
    const categories = [...new Set(rows.map((p) => p.category).filter(Boolean))] as string[]
    return {
      total: rows.length,
      published: rows.filter((p) => p.status === 'published').length,
      featured: 0,
      totalViews: 0,
      categories
    }
  }
}
