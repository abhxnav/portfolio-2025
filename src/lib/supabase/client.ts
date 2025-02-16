import { createBrowserClient } from '@supabase/ssr'
import { env } from '@/lib/envConfig'

const {
  supabase: { publicKey, url },
} = env

const createClient = () => {
  return createBrowserClient(url, publicKey)
}

export const supabaseBrowserClient = createClient()
