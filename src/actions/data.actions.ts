import { supabaseBrowserClient } from '@/lib/supabase/client'
import { skillsFormSchema } from '@/lib/validations'
import { z } from 'zod'

export const addSkillToDataset = async (
  data: z.infer<typeof skillsFormSchema>
) => {
  let iconUrl = ''

  try {
    if (data.icon && typeof data.icon !== 'string') {
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

    const { error: insertError } = await supabaseBrowserClient
      .from('skills_dataset')
      .insert([{ name: data?.name, icon: iconUrl }])

    if (insertError) throw insertError

    return { success: true, message: 'Skill added successfully!' }
  } catch (error: any) {
    console.error('Error adding skill:', error.message)
    return { success: false, message: error.message }
  }
}

export const getAllSkills = async () => {
  try {
    const { data, error } = await supabaseBrowserClient
      .from('skills_dataset')
      .select('*')

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    console.error('Error fetching skills:', error.message)
    return { success: false, message: error.message }
  }
}
