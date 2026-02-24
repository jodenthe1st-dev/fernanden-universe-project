import { supabaseRaw } from '../client'
import type { Database } from '../types'

type ProductRow = Database['public']['Tables']['products']['Row']
type ProductInsert = Database['public']['Tables']['products']['Insert']
type ProductUpdate = Database['public']['Tables']['products']['Update']
type ProductFeaturedSelect = { featured: boolean | null }
type ProductCategorySelect = { category: string }

export type Product = ProductRow
export type { ProductInsert, ProductUpdate }

export class ProductsService {
  static async getAll(): Promise<Product[]> {
    const { data, error } = await supabaseRaw
      .from('products')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data as Product[]) || []
  }

  static async getPublished(): Promise<Product[]> {
    const { data, error } = await supabaseRaw
      .from('products')
      .select('*')
      .eq('status', 'published')
      .order('order_index', { ascending: true })

    if (error) throw error
    return (data as Product[]) || []
  }

  static async getByCategoryPublished(category: string): Promise<Product[]> {
    const { data, error } = await supabaseRaw
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('order_index', { ascending: true })

    if (error) throw error
    return (data as Product[]) || []
  }

  static async getFeaturedPublished(): Promise<Product[]> {
    const { data, error } = await supabaseRaw
      .from('products')
      .select('*')
      .eq('featured', true)
      .eq('status', 'published')
      .order('order_index', { ascending: true })

    if (error) throw error
    return (data as Product[]) || []
  }

  static async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabaseRaw
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return (data as Product) || null
  }

  static async create(product: ProductInsert): Promise<Product> {
    const { data, error } = await (supabaseRaw
      .from('products') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(product)
      .select('*')
      .single()

    if (error) throw error
    return data as Product
  }

  static async update(id: string, updates: ProductUpdate): Promise<Product> {
    const { data, error } = await (supabaseRaw
      .from('products') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(updates)
      .eq('id', id)
      .select('*')
      .single()

    if (error) throw error
    return data as Product
  }

  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  static async toggleFeatured(id: string): Promise<Product> {
    const { data: product } = await supabaseRaw
      .from('products')
      .select('featured')
      .eq('id', id)
      .single()

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
    return categories.sort()
  }
}

