import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'
import clsx from 'clsx'
import { FileUploader, MarkdownEditor } from '@/components'

interface CustomFormFieldProps {
  control: any
  name: string
  label?: string
  type?: 'input' | 'textarea' | 'file'
  placeholder?: string
  labelClass?: string
  inputClass?: string
}

const CustomFormField = ({
  control,
  name,
  label,
  type = 'input',
  placeholder = '',
  labelClass = '',
  inputClass = '',
}: CustomFormFieldProps) => {
  const renderField = (type: string, field: any) => {
    switch (type) {
      case 'input':
        return (
          <Input
            placeholder={placeholder}
            {...field}
            className={clsx(
              'border border-dark-500 bg-dark-500/20 text-dark-200 p-4 rounded-lg',
              inputClass
            )}
          />
        )

      case 'textarea':
        return (
          <MarkdownEditor
            value={field.value || ''}
            onChange={field.onChange}
            className={inputClass}
          />
        )

      case 'file':
        return <FileUploader file={field.value} onChange={field.onChange} />
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className={clsx('text-lg text-dark-200', labelClass)}>
            {label}
          </FormLabel>
          <FormControl>{renderField(type, field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
