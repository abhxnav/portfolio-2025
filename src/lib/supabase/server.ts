'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { env } from '@/lib/envConfig'

const {
  supabase: { publicKey, url },
} = env

const createClient = () => {
  const cookieStore = cookies()

  return createServerClient(url, publicKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          console.error('Error setting cookies')
        }
      },
    },
  })
}

export const supabaseServerClient = createClient()
