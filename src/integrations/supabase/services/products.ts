import { supabaseRaw } from '../client'

// Types basés sur la structure exacte de la base de données
export interface Product {
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
  inventory_count: number
  featured: boolean
  status: string
  tags: string[]
  detailed_description: string | null
  care_instructions: string | null
  order_index: number
  created_at: string
  updated_at: string
}

export interface ProductInsert {
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
  inventory_count?: number
  featured?: boolean
  status?: string
  tags?: string[]
  detailed_description?: string | null
  care_instructions?: string | null
  order_index?: number
  created_at?: string
  updated_at?: string
}

export interface ProductUpdate {
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
  inventory_count?: number
  featured?: boolean
  status?: string
  tags?: string[]
  detailed_description?: string | null
  care_instructions?: string | null
  order_index?: number
  created_at?: string
  updated_at?: string
}

export class ProductsService {
  // Récupérer tous les produits
  static async getAll(): Promise<Product[]> {
    const { data, error } = await supabaseRaw
      .from('products')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les produits par catégorie
  static async getByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabaseRaw
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer les produits featured
  static async getFeatured(): Promise<Product[]> {
    const { data, error } = await supabaseRaw
      .from('products')
      .select('*')
      .eq('featured', true)
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Récupérer un produit par ID
  static async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabaseRaw
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  // Créer un produit
  static async create(product: ProductInsert): Promise<Product> {
    const { data, error } = await (supabaseRaw
      .from('products') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(product)
      .select()
      .single()

    if (error) throw error
    return data as Product
  }

  // Mettre à jour un produit
  static async update(id: string, product: ProductUpdate): Promise<Product> {
    const { data, error } = await (supabaseRaw
      .from('products') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .update(product)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Product
  }

  // Supprimer un produit
  static async delete(id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Toggle featured status
  static async toggleFeatured(id: string): Promise<Product> {
    const { data: product } = await supabaseRaw
      .from('products')
      .select('featured')
      .eq('id', id)
      .single()

    if (!product) throw new Error('Product not found')

    return this.update(id, { featured: !(product as any).featured }) // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  // Mettre à jour l'ordre
  static async updateOrder(id: string, orderIndex: number): Promise<Product> {
    return this.update(id, { order_index: orderIndex })
  }

  // Rechercher des produits
  static async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabaseRaw
      .from('products')
      .select('*')
      .eq('status', 'active')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  // Récupérer les catégories disponibles
  static async getCategories(): Promise<string[]> {
    const { data, error } = await supabaseRaw
      .from('products')
      .select('category')
      .eq('status', 'active')

    if (error) throw error
    
    const categories = [...new Set(data?.map((p: any) => p.category) || [])] // eslint-disable-line @typescript-eslint/no-explicit-any
    return categories
  }
}
