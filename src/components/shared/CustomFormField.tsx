import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import clsx from 'clsx'
import { FileUploader, MarkdownEditor, MultiSelect } from '@/components'

interface CustomFormFieldProps {
  control: any
  name: string
  label?: string
  type?: 'input' | 'textarea' | 'file' | 'select' | 'multi-select'
  placeholder?: string
  labelClass?: string
  inputClass?: string
  options?: { label: string; value: string }[]
}

const CustomFormField = ({
  control,
  name,
  label,
  type = 'input',
  placeholder = '',
  labelClass = '',
  inputClass = '',
  options = [],
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
            placeholder={placeholder}
          />
        )

      case 'file':
        return (
          <FileUploader
            file={field.value}
            onChange={field.onChange}
            className={inputClass}
          />
        )

      case 'select':
        return (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger
              className={clsx(
                'border border-dark-500 text-dark-200',
                inputClass
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case 'multi-select':
        return (
          <MultiSelect
            value={field.value || []}
            onChange={field.onChange}
            options={options}
          />
        )
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && (
            <FormLabel className={clsx('text-lg text-dark-200', labelClass)}>
              {label}
            </FormLabel>
          )}
          <FormControl>{renderField(type, field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
