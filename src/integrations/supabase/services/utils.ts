import { supabaseRaw } from '../client'

// Interface générique pour les opérations Supabase
interface SupabaseTable<T> {
  insert(entity: T): unknown;
  update(updates: Partial<T>): unknown;
  select(): unknown;
  eq(column: string, value: unknown): unknown;
  single(): unknown;
}

// Helper pour contourner les limitations de typage Supabase
const getSupabaseTable = (tableName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return supabaseRaw.from(tableName) as any;
};

// Utility functions for common CRUD operations
export class ServiceUtils {
  // Generic getAll function
  static async getAll<T = Record<string, unknown>>(tableName: string): Promise<T[]> {
    const { data, error } = await supabaseRaw
      .from(tableName)
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Generic getActive function
  static async getActive<T = Record<string, unknown>>(tableName: string): Promise<T[]> {
    const { data, error } = await supabaseRaw
      .from(tableName)
      .select('*')
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Generic getFeatured function
  static async getFeatured<T = Record<string, unknown>>(tableName: string): Promise<T[]> {
    const { data, error } = await supabaseRaw
      .from(tableName)
      .select('*')
      .eq('featured', true)
      .eq('status', 'active')
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  }

  // Generic getById function
  static async getById<T = Record<string, unknown>>(tableName: string, id: string): Promise<T | null> {
    const { data, error } = await supabaseRaw
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  }

  // Generic create function
  static async create<T = Record<string, unknown>>(tableName: string, entity: T): Promise<T> {
    const { data, error } = await getSupabaseTable(tableName)
      .insert(entity)
      .select()
      .single()

    if (error) throw error
    return data as T
  }

  // Generic update function
  static async update<T = Record<string, unknown>>(tableName: string, id: string, updates: T): Promise<T> {
    const { data, error } = await getSupabaseTable(tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as T
  }

  // Generic delete function
  static async delete(tableName: string, id: string): Promise<void> {
    const { error } = await supabaseRaw
      .from(tableName)
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Generic toggleFeatured function
  static async toggleFeatured<T = Record<string, unknown>>(tableName: string, id: string): Promise<T> {
    const { data: entity } = await supabaseRaw
      .from(tableName)
      .select('featured')
      .eq('id', id)
      .single()

    if (!entity) throw new Error(`${tableName} not found`)

    // Type assertion necessary due to Supabase typing limitations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.update(tableName, id, { featured: !(entity as any).featured }) as Promise<T>
  }

  // Generic updateOrder function
  static async updateOrder<T = Record<string, unknown>>(tableName: string, id: string, orderIndex: number): Promise<T> {
    return this.update(tableName, id, { order_index: orderIndex }) as Promise<T>
  }
}
