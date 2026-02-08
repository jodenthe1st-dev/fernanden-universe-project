import { supabase } from '@/integrations/supabase/client'

// Types TypeScript pour la base de données
export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  created_at: string
  status: 'new' | 'read' | 'replied' | 'archived'
}

export interface BlogPost {
  id: string
  title: string
  excerpt?: string
  content?: string
  author: string
  category: 'SHE' | 'DENSE' | 'CaFEE'
  image_url?: string
  tags: string[]
  featured: boolean
  read_time?: string
  published: boolean
  created_at: string
  updated_at: string
  slug?: string
}

export interface Actualite {
  id: string
  title: string
  excerpt?: string
  content?: string
  author: string
  category: 'SHE' | 'DENSE' | 'CaFEE'
  type: string
  image_url?: string
  urgent: boolean
  read_time?: string
  published: boolean
  link?: string
  created_at: string
  updated_at: string
  slug?: string
}

export interface PortfolioProject {
  id: string
  title: string
  description?: string
  full_description?: string
  category: 'she' | 'dense' | 'cafee'
  client?: string
  date?: string
  location?: string
  image_url?: string
  gallery: string[]
  tags: string[]
  link?: string
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
  slug?: string
}

export interface DenseCollection {
  id: string
  name: string
  subtitle?: string
  description?: string
  full_description?: string
  price?: number
  image_url?: string
  gallery: string[]
  icon?: string
  featured: boolean
  published: boolean
  sort_order: number
  created_at: string
  updated_at: string
  slug?: string
}

export interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  items: Array<{
    collection_id: string
    quantity: number
    price: number
  }>
  total_amount: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address?: Record<string, string | number>
  notes?: string
  created_at: string
  updated_at: string
}

export interface NewsletterSubscription {
  id: string
  email: string
  name?: string
  active: boolean
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'editor' | 'viewer'
  active: boolean
  created_at: string
  last_login?: string
}

export interface AdminStats {
  contacts_last_30_days: number
  published_posts: number
  published_actualites: number
  published_projects: number
  total_orders: number
  newsletter_subscribers: number
}

// Fonctions utilitaires
export const supabaseApi = {
  // Contact
  async submitContact(data: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>) {
    const { data: result, error } = await (supabase
      .from('contact_submissions') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(data)
      .select()
    
    if (error) throw error
    return result[0]
  },

  // Blog
  async getBlogPosts(published = true) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', published)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as BlogPost[]
  },

  async getBlogPost(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    
    if (error) throw error
    return data as BlogPost
  },

  async getBlogPostsByCategory(category: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as BlogPost[]
  },

  // Actualités
  async getActualites(published = true) {
    const { data, error } = await supabase
      .from('actualites')
      .select('*')
      .eq('published', published)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Actualite[]
  },

  async getActualite(slug: string) {
    const { data, error } = await supabase
      .from('actualites')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    
    if (error) throw error
    return data as Actualite
  },

  // Portfolio
  async getPortfolioProjects(published = true) {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('published', published)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as PortfolioProject[]
  },

  async getPortfolioProject(slug: string) {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    
    if (error) throw error
    return data as PortfolioProject
  },

  async getPortfolioProjectsByCategory(category: string) {
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as PortfolioProject[]
  },

  // Collections DENSE
  async getDenseCollections(published = true) {
    const { data, error } = await supabase
      .from('dense_collections')
      .select('*')
      .eq('published', published)
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    return data as DenseCollection[]
  },

  async getDenseCollection(slug: string) {
    const { data, error } = await supabase
      .from('dense_collections')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
    
    if (error) throw error
    return data as DenseCollection
  },

  // Orders
  async createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await (supabase
      .from('orders') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert(order)
      .select()
    
    if (error) throw error
    return data[0] as Order
  },

  async getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Order[]
  },

  // Newsletter
  async subscribeToNewsletter(email: string, name?: string) {
    const { data, error } = await (supabase
      .from('newsletter_subscriptions') as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      .insert({ email, name })
      .select()
    
    if (error) throw error
    return data[0] as NewsletterSubscription
  },

  // Admin Stats
  async getAdminStats() {
    const { data, error } = await supabase
      .from('admin_stats')
      .select('*')
      .single()
    
    if (error) throw error
    return data as AdminStats
  }
}
