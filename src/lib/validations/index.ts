import { z } from 'zod'

export const skillsFormSchema = z.object({
  name: z.string().min(1),
  icon: z.custom<File>((file) => file instanceof File),
})
