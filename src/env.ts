import { z } from 'zod'

const EnvSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().min(20),
  VITE_CLOUDINARY_CLOUD_NAME: z.string().min(1),
})

export function validateClientEnv() {
  // Skip in unit/integration tests to avoid false failures.
  if (import.meta.env.MODE === 'test') return

  const parsed = EnvSchema.safeParse({
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    VITE_CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  })

  if (!parsed.success) {
    console.error('[env] Missing/invalid Vite env vars:', parsed.error.flatten().fieldErrors)
    throw new Error('Configuration manquante: variables d’environnement Vite invalides. Vérifie `.env.local`.')
  }
}
