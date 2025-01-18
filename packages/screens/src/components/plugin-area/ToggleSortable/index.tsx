import { useSortableStore } from '@repo/store'
import { SortableState } from '@repo/store/slices/sortableSlice'
import { Switch } from '@repo/ui'

const ToggleSortable = () => {
  const disable = useSortableStore((state: SortableState) => state.disabled)
  const toggleDisabled = useSortableStore((state: SortableState) => state.toggleDisabled)

  return <Switch checked={disable} onCheckedChange={toggleDisabled} />
}

export default ToggleSortable
