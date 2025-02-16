import { env } from '@/lib/envConfig'
import { supabaseBrowserClient } from '@/lib/supabase/client'

export const sendOtp = async (phone: string) => {
  const { adminPhone } = env

  if (phone !== adminPhone) throw new Error('Invalid admin phone number')

  const { error } = await supabaseBrowserClient.auth.signInWithOtp({
    phone: '+91' + phone,
  })

  if (error) throw error
}

export const verifyOtp = async (phone: string, otp: string) => {
  const { error, data } = await supabaseBrowserClient.auth.verifyOtp({
    phone: '+91' + phone,
    token: otp,
    type: 'sms',
  })

  if (error) throw error

  return data
}

export const checkSession = async () => {
  const {
    data: { session },
    error,
  } = await supabaseBrowserClient.auth.getSession()

  if (error) {
    console.error('Error fetching session:', error.message)
    return null
  }

  return session
}
