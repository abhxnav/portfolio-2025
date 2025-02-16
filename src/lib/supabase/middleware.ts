import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { env } from '@/lib/envConfig'

const {
  supabase: { url, publicKey },
} = env

export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(url, publicKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  const { data: session } = await supabase.auth.getSession()

  const user = session?.session?.user || null

  if (!user && request.nextUrl.pathname.startsWith('/admin')) {
    const redirectUrl = new URL('/', request.url)

    if (request.nextUrl.pathname === '/') return supabaseResponse

    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}
