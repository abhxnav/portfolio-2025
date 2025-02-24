'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Form,
} from '@/components/ui'
import { CustomFormField } from '@/components'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { adminDataFormSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { getAllItems } from '@/actions/data.actions'

interface Social {
  id: number
  name: string
  icon: string
}

interface SelectedSocial {
  id: number
  name: string
  icon: string
  url: string
}

const AdminDataForm = () => {
  const [socialsOptions, setSocialsOptions] = useState<Social[] | null>(null)
  const [selectedSocials, setSelectedSocials] = useState<SelectedSocial[] | []>(
    []
  )

  useEffect(() => {
    const loadData = async () => {
      const { data: socials } = await getAllItems('socials')
      setSocialsOptions(socials || [])
    }

    loadData()
  }, [])

  const form = useForm<z.infer<typeof adminDataFormSchema>>({
    resolver: zodResolver(adminDataFormSchema),
    defaultValues: {
      name: '',
      role: '',
      email: '',
      phone: '',
      about: '',
      resume: undefined,
      socials: [],
    },
  })

  const { control, handleSubmit } = form

  const onSubmit = async (data: z.infer<typeof adminDataFormSchema>) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col py-4">
        {/* About Section */}
        <Collapsible>
          <CollapsibleTrigger className="w-full bg-dark-700/50 rounded-lg text-center py-2 text-lg font-semibold">
            About
          </CollapsibleTrigger>
          <CollapsibleContent className="p-6 py-0 flex flex-col gap-4 bg-dark-700/50">
            <CustomFormField
              control={control}
              name="name"
              label="Name"
              placeholder="Your name"
            />
            <CustomFormField
              control={control}
              name="role"
              label="Role"
              placeholder="Your role"
            />
            <CustomFormField
              control={control}
              name="email"
              label="Email"
              placeholder="Your email"
            />
            <CustomFormField
              control={control}
              name="phone"
              label="Phone number"
              placeholder="Your phone number"
            />
            <CustomFormField
              control={control}
              name="about"
              label="About"
              placeholder="About you"
              type="textarea"
            />

            {/* Add Socials */}

            <CustomFormField
              control={control}
              name="resume"
              label="Resume"
              type="file"
              inputClass="!mb-6"
            />
          </CollapsibleContent>
        </Collapsible>
      </form>
    </Form>
  )
}

export default AdminDataForm
