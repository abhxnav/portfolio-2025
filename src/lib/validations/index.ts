import { z } from 'zod'

export const skillsFormSchema = z.object({
  name: z.string().min(1),
  icon: z.custom<File>((file) => file instanceof File),
})

export const socialsFormSchema = z.object({
  name: z.string().min(1),
  icon: z.custom<File>((file) => file instanceof File),
  url: z.string().min(1),
})

export const adminDataFormSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  about: z.string().min(1),
  resume: z.custom<File>((file) => file instanceof File),
  socials: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      icon: z.string(),
      url: z.string(),
    })
  ),
})
