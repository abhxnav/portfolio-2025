'use client'

import { useState } from 'react'
import {
  Button,
  Command,
  CommandGroup,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui'
import { Check } from 'lucide-react'

interface Option {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  value: Option[]
  onChange: (selected: Option[]) => void
}

const MultiSelect = ({ options, value = [], onChange }: MultiSelectProps) => {
  const [open, setOpen] = useState(false)

  const toggleOption = (option: Option) => {
    const isSelected = value.some((v) => v.value === option.value)

    if (isSelected) {
      onChange(value.filter((v) => v.value !== option.value))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {value.length > 0
            ? value.map((v) => v.label).join(', ')
            : 'Select options'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2">
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => toggleOption(option)}
              >
                <Check
                  className={`mr-2 ${
                    value.some((v) => v.value === option.value)
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default MultiSelect
