// Types pour l'administration SHE - Structure complète des données administrables

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  image: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  duration: string;
  order: number;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  project: string;
  text: string;
  rating: number;
  image: string;
  isActive: boolean;
  order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

export interface Realization {
  id: string;
  title: string;
  category: 'decoration' | 'planning' | 'design' | 'full_event';
  description: string;
  image: string;
  client: string;
  date: string;
  location: string;
  route: string;
  images: string[]; // Galerie d'images
  tags: string[];
  isActive: boolean;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServicePage {
  id: string;
  serviceType: 'events' | 'interior-design' | 'decoration';
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  services: ServiceItem[];
  processSteps: ProcessStep[];
  testimonials: Testimonial[];
  faq: FAQItem[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  isActive: boolean;
  updatedAt: string;
}

export interface SHEConfig {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    backgroundImage: string;
  };
  services: {
    id: string;
    title: string;
    description: string;
    items: string[];
    image: string;
    route: string;
    order: number;
    isActive: boolean;
  }[];
  realizations: Realization[];
  categories: {
    decoration: {
      label: string;
      badge: string;
      icon: string;
    };
    planning: {
      label: string;
      badge: string;
      icon: string;
    };
    design: {
      label: string;
      badge: string;
      icon: string;
    };
    full_event: {
      label: string;
      badge: string;
      icon: string;
    };
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  updatedAt: string;
}

// Structure pour les fichiers uploadés
export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

// API Endpoints pour l'administration
export const ADMIN_API_ENDPOINTS = {
  // Services
  GET_SERVICES: '/api/admin/she/services',
  CREATE_SERVICE: '/api/admin/she/services',
  UPDATE_SERVICE: '/api/admin/she/services/:id',
  DELETE_SERVICE: '/api/admin/she/services/:id',
  REORDER_SERVICES: '/api/admin/she/services/reorder',
  
  // Réalisations
  GET_REALIZATIONS: '/api/admin/she/realizations',
  CREATE_REALIZATION: '/api/admin/she/realizations',
  UPDATE_REALIZATION: '/api/admin/she/realizations/:id',
  DELETE_REALIZATION: '/api/admin/she/realizations/:id',
  UPLOAD_REALIZATION_IMAGES: '/api/admin/she/realizations/:id/images',
  
  // Pages de services détaillées
  GET_SERVICE_PAGE: '/api/admin/she/service-pages/:type',
  UPDATE_SERVICE_PAGE: '/api/admin/she/service-pages/:type',
  
  // Configuration générale
  GET_CONFIG: '/api/admin/she/config',
  UPDATE_CONFIG: '/api/admin/she/config',
  
  // Uploads
  UPLOAD_IMAGE: '/api/admin/upload/image',
  DELETE_FILE: '/api/admin/upload/:id',
} as const;

// Validation schemas pour les formulaires
export const SERVICE_VALIDATION_SCHEMA = {
  title: { required: true, minLength: 3, maxLength: 100 },
  description: { required: true, minLength: 10, maxLength: 500 },
  features: { required: true, minItems: 1, maxItems: 6 },
  price: { required: true, pattern: /^À partir de \d+€$|^\d+€$/ },
  image: { required: true, type: 'url' }
};

export const REALIZATION_VALIDATION_SCHEMA = {
  title: { required: true, minLength: 3, maxLength: 100 },
  category: { required: true, enum: ['decoration', 'planning', 'design', 'full_event'] },
  description: { required: true, minLength: 10, maxLength: 500 },
  client: { required: true, minLength: 2, maxLength: 50 },
  location: { required: true, minLength: 2, maxLength: 100 },
  date: { required: true, type: 'date' },
  images: { required: true, minItems: 1, maxItems: 10 }
};
