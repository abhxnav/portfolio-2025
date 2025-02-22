import { supabaseBrowserClient } from '@/lib/supabase/client'

export const addItemToDatabase = async (
  data: { name: string; icon?: File | string; url?: string },
  table: 'skills_dataset' | 'socials_dataset',
  bucket?: 'skills' | 'socials'
) => {
  let iconUrl = ''

  try {
    if (bucket && data?.icon && typeof data.icon !== 'string') {
      const file = data.icon as File
      const { data: uploadData, error: uploadError } =
        await supabaseBrowserClient.storage
          .from(bucket)
          .upload(`icons/${Date.now()}-${file.name}`, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabaseBrowserClient.storage
        .from(bucket)
        .getPublicUrl(uploadData.path)

      iconUrl = publicUrl
    }

    const insertData: any = { name: data?.name }
    if (iconUrl) insertData.icon = iconUrl
    if (data.url) insertData.url = data.url

    const { error: insertError } = await supabaseBrowserClient
      .from(table)
      .insert([insertData])

    if (insertError) throw insertError

    return {
      success: true,
      message: `${
        table === 'skills_dataset' ? 'Skill' : 'Social'
      } added successfully!`,
    }
  } catch (error: any) {
    console.error(
      `Error adding ${table === 'skills_dataset' ? 'skill' : 'social'}:`,
      error.message
    )
    return { success: false, message: error.message }
  }
}

export const getAllItems = async (table: string) => {
  try {
    const { data, error } = await supabaseBrowserClient.from(table).select('*')

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    console.error('Error fetching items:', error.message)
    return { success: false, message: error.message }
  }
}
