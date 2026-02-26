import { supabaseRaw } from '../client'
import type { Database } from '../types'

type ProductRow = Database['public']['Tables']['products']['Row']
type ProductInsert = Database['public']['Tables']['products']['Insert']
type ProductUpdate = Database['public']['Tables']['products']['Update']
type ProductFeaturedSelect = { featured: boolean | null }
type ProductCategorySelect = { category: string }

export type { ProductRow as Product, ProductInsert, ProductUpdate }

export class ProductsService {
  private static async selectAllBestEffort(baseQuery: ReturnType<typeof supabaseRaw.from>): Promise<ProductRow[]> {
    const ordered = await baseQuery
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })

    if (!ordered.error) return (ordered.data as ProductRow[]) || []

    const createdOnly = await baseQuery
      .select('*')
      .order('created_at', { ascending: false })
    if (!createdOnly.error) return (createdOnly.data as ProductRow[]) || []

    const plain = await baseQuery.select('*')
    if (plain.error) throw ordered.error
    return (plain.data as ProductRow[]) || []
  }

  static async getAll(): Promise<ProductRow[]> {
    return this.selectAllBestEffort(supabaseRaw.from('products'))
  }

  static async getPublished(): Promise<ProductRow[]> {
    return this.selectAllBestEffort(
      supabaseRaw.from('products').eq('status', 'published')
    )
  }

  static async getByCategoryPublished(category: string): Promise<ProductRow[]> {
    return this.selectAllBestEffort(
      supabaseRaw.from('products').eq('category', category).eq('status', 'published')
    )
  }

  static async getFeaturedPublished(): Promise<ProductRow[]> {
    try {
      return await this.selectAllBestEffort(
        supabaseRaw.from('products').eq('featured', true).eq('status', 'published')
      )
    } catch {
      // featured can be absent on some deployed schemas
      return this.selectAllBestEffort(
        supabaseRaw.from('products').eq('status', 'published')
      )
    }
  }

  static async getById(id: string): Promise<ProductRow | null> {
    const { data, error } = await supabaseRaw
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return (data as ProductRow) || null
  }

  static async create(product: ProductInsert): Promise<ProductRow> {
    const { data, error } = await (supabaseRaw
      .from('products') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(product)
      .select('*')
      .single()

    if (error) throw error
    return data as ProductRow
  }

  static async update(id: string, updates: ProductUpdate): Promise<ProductRow> {
    const { data, error } = await (supabaseRaw
      .from('products') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    return data as ProductRow
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  static async toggleFeatured(id: string): Promise<ProductRow> {
    const { data: product, error } = await supabaseRaw
      .from('products')
      .select('featured')
      .eq('id', id)
      .single()

    if (error) throw new Error('Featured flag is not available in current database schema')
    if (!product) throw new Error('Product not found')
    return this.update(id, { featured: !(product as ProductFeaturedSelect).featured })
  }

  static async getCategoriesPublished(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('products')
      .select('category')
      .eq('status', 'published')

    if (error) throw error
    const categories = [...new Set((data as ProductCategorySelect[] | null)?.map((p) => p.category).filter(Boolean) || [])]
    return categories.sort((a, b) => a.localeCompare(b))
  }
}
