import { supabaseBrowserClient } from '@/lib/supabase/client'

export const addSkillToDatabase = async (data: {
  name: string
  icon?: File | string
}) => {
  let iconUrl = ''

  try {
    if (data?.icon && typeof data.icon !== 'string') {
      const file = data.icon as File
      const { data: uploadData, error: uploadError } =
        await supabaseBrowserClient.storage
          .from('skills')
          .upload(`icons/${Date.now()}-${file.name}`, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabaseBrowserClient.storage
        .from('skills')
        .getPublicUrl(uploadData.path)

      iconUrl = publicUrl
    }

    const insertData: any = { name: data?.name }
    if (iconUrl) insertData.icon = iconUrl

    const { error: insertError } = await supabaseBrowserClient
      .from('skills_dataset')
      .insert([insertData])

    if (insertError) throw insertError

    return { success: true, message: 'Skill added successfully!' }
  } catch (error: any) {
    console.error('Error adding skill:', error.message)
    return { success: false, message: error.message }
  }
}

export const addSocialToDatabase = async (data: {
  name: string
  icon?: File | string
  url: string
}) => {
  let iconUrl = ''

  try {
    if (data?.icon && typeof data.icon !== 'string') {
      const file = data.icon as File
      const { data: uploadData, error: uploadError } =
        await supabaseBrowserClient.storage
          .from('socials')
          .upload(`icons/${Date.now()}-${file.name}`, file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabaseBrowserClient.storage
        .from('socials')
        .getPublicUrl(uploadData.path)

      iconUrl = publicUrl
    }

    const insertData: any = {
      name: data.name,
      url: data.url,
    }
    if (iconUrl) insertData.icon = iconUrl

    const { error: insertError } = await supabaseBrowserClient
      .from('socials')
      .insert([insertData])

    if (insertError) throw insertError

    return { success: true, message: 'Social added successfully!' }
  } catch (error: any) {
    console.error('Error adding social:', error.message)
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

export const deleteItem = async (id: string, table: string) => {
  const { error } = await supabaseBrowserClient
    .from(table)
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting item:', error.message)
    return { success: false, message: error.message }
  }

  return { success: true, message: 'Item deleted successfully!' }
}
