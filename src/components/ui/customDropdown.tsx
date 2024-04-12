import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DropdownProps {
  value?: string
  width?: string
  placeholder: string
  label: string
  options: string[]
  onChange: (value: string) => void
}

const Dropdown = (props: DropdownProps): JSX.Element => {
  const { value, width, placeholder, label, options, onChange } = props

  // Handle value change
  const handleValueChange = (value: string) => {
    onChange(value)
  }

  return (
    <Select onValueChange={handleValueChange} value={value}>
      <SelectTrigger className={`w-${width}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default Dropdown