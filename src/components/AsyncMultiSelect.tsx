import { AsyncPaginate } from 'react-select-async-paginate'
import type { MultiValue } from 'react-select'
import type { SelectOption } from '../types/select'

type Additional = {
  page: number
}

type LoadOptionsResult = {
  options: SelectOption[]
  hasMore: boolean
  additional: Additional
}

interface AsyncMultiSelectProps {
  label: string
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
  loadOptions: (
    search: string,
    loadedOptions: SelectOption[],
    additional: Additional
  ) => Promise<LoadOptionsResult>
  placeholder?: string
}

const AsyncPaginateAny = AsyncPaginate as any

function AsyncMultiSelect({
  label,
  value,
  onChange,
  loadOptions,
  placeholder = 'Select options...',
}: AsyncMultiSelectProps) {
  const handleChange = (selected: MultiValue<SelectOption>) => {
    onChange([...(selected || [])])
  }

  return (
    <div>
      <label
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <AsyncPaginateAny
        isMulti
        value={value}
        loadOptions={loadOptions}
        onChange={handleChange}
        additional={{ page: 1 }}
        placeholder={placeholder}
      />
    </div>
  )
}

export default AsyncMultiSelect