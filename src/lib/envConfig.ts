export const env = {
  supabase: {
    url: String(process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!),
    publicKey: String(process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY!),
  },
  adminPhone: String(process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER!),
}
