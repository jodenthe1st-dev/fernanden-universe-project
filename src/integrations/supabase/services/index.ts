// Export centralisé de tous les services Supabase
export { projectsService } from './projects'
export { RealizationsService } from './realizations'
export { ProductsService } from './products'
export { ServicesService } from './services'
export { MediaService } from './media'
// `contact.ts` was unused and removed from the public surface; use typed services instead.

// Nouveaux services
export { TestimonialsService } from './testimonials'
export { PodcastsService } from './podcasts'
export { TeamService } from './team'
export { ResourcesService } from './resources'
export { BlogPostsService } from './blogPosts'
export { SiteSettingsService } from './siteSettings'
export { SiteTextsService } from './siteTexts'
export { UniversePagesService } from './universePages'
export { ContactSubscriptionsService } from './contactSubscriptions'
export { NewsletterSubscriptionsService } from './newsletterSubscriptions'

// Types exportés - Services existants
export type { Project, ProjectInsert, ProjectUpdate } from './projects'
export type { Realization, RealizationInsert, RealizationUpdate } from './realizations'
export type { Product, ProductInsert, ProductUpdate } from './products'
export type { Service, ServiceInsert, ServiceUpdate } from './services'
export type { MediaFile, MediaInsert, MediaUpdate } from './media'

// Types exportés - Nouveaux services
export type { Testimonial, TestimonialInsert, TestimonialUpdate } from './testimonials'
export type { Podcast, PodcastInsert, PodcastUpdate } from './podcasts'
export type { TeamMember, TeamMemberInsert, TeamMemberUpdate } from './team'
export type { Resource, ResourceInsert, ResourceUpdate } from './resources'
export type { BlogPost, BlogPostInsert, BlogPostUpdate } from './blogPosts'
export type { SiteSetting, SiteSettingInsert, SiteSettingUpdate } from './siteSettings'
export type { SiteText, SiteTextInsert, SiteTextUpdate } from './siteTexts'
export type { UniversePage, UniversePageInsert, UniversePageUpdate } from './universePages'
export type { ContactSubscription, ContactSubscriptionInsert, ContactSubscriptionUpdate } from './contactSubscriptions'
export type { NewsletterSubscriber, NewsletterSubscriberInsert } from './newsletterSubscriptions'
