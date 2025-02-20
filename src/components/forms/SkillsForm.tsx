'use client'

import { skillsFormSchema } from '@/lib/validations'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui'
import { CustomFormField } from '@/components'

const SkillsForm = () => {
  const form = useForm<z.infer<typeof skillsFormSchema>>({
    resolver: zodResolver(skillsFormSchema),
    defaultValues: {
      name: '',
      icon: undefined,
    },
  })

  const { control } = form

  const onSubmit = (data: z.infer<typeof skillsFormSchema>) => {
    console.log(data)
  }

  return (
    <div className="py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center gap-4">
            <CustomFormField
              control={control}
              name="name"
              label="Skill Name"
              type="input"
            />
            <CustomFormField
              control={control}
              name="icon"
              label="Icon"
              type="file"
            />
            <button
              type="submit"
              className="bg-dark-600 px-10 py-2 rounded-lg w-fit mt-2"
            >
              Add skill
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SkillsForm
