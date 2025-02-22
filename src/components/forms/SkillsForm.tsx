'use client'

import { skillsFormSchema } from '@/lib/validations'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui'
import { CustomFormField } from '@/components'
import { useEffect, useState } from 'react'
import { addSkillToDataset, getAllSkills } from '@/actions/data.actions'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

interface FormMessageType {
  type: 'success' | 'error'
  text: string
}

interface Skill {
  id: string
  name: string
  icon: string
}

const SkillsForm = () => {
  const form = useForm<z.infer<typeof skillsFormSchema>>({
    resolver: zodResolver(skillsFormSchema),
    defaultValues: {
      name: '',
      icon: undefined,
    },
  })

  const { control, handleSubmit, reset } = form

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<FormMessageType | null>(null)
  const [existingSkills, setExistingSkills] = useState<Skill[] | null>(null)

  useEffect(() => {
    const getSkills = async () => {
      const res = await getAllSkills()
      setExistingSkills(res.data!)
    }

    getSkills()
  }, [])

  const onSubmit = async (data: z.infer<typeof skillsFormSchema>) => {
    setLoading(true)
    setMessage(null)

    const response = await addSkillToDataset(data)

    if (response.success) {
      setMessage({ type: 'success', text: response.message })
      reset()
    } else {
      setMessage({ type: 'error', text: response.message })
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-10 py-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                <p>Adding skill...</p>
              </div>
            ) : (
              'Add Skill'
            )}
          </button>

          {message && (
            <p
              className={`mt-2 ${
                message.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </Form>

      <div className="flex flex-col gap-4 text-dark-200">
        <h2 className="text-xl font-semibold">Existing skills</h2>
        <div className="flex items-center gap-4">
          {existingSkills ? (
            existingSkills.map((skill: Skill) => (
              <div className="flex flex-col gap-1 items-center" key={skill.id}>
                <Image
                  src={skill?.icon}
                  alt={skill?.name}
                  width={10}
                  height={10}
                  className="size-12"
                />
                <p className="text-sm">{skill?.name}</p>
              </div>
            ))
          ) : (
            <p className="text-dark-400">No skills added yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SkillsForm
