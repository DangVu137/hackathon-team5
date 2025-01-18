import { closestCorners } from '@dnd-kit/core'
import { PLUGINS, TPluginData } from '@repo/constants'
import { PluginStore, usePluginStore, useSortableStore } from '@repo/store'
import { SortableState } from '@repo/store/slices/sortableSlice'
import { Sortable, SortableItem } from '@repo/ui'
import ToggleSortable from './ToggleSortable'
export const PluginArea = () => {
  const plugins = usePluginStore((state: PluginStore) => state.plugins)
  const backupPlugins = usePluginStore((state: PluginStore) => state.backupPlugins)
  const disable = useSortableStore((state: SortableState) => state.disabled)

  const renderPlugin = () => {
    return plugins.map((storePlugin: TPluginData) => {
      const matchingPlugin = PLUGINS.find((plugin) => plugin.name === storePlugin.name)

      if (!matchingPlugin || !matchingPlugin.plugin) return null

      const positionStyles = matchingPlugin.size
        ? (() => {
            const [widthRatio, heightRatio] = matchingPlugin.size.split('x').map(Number)
            return {
              gridColumn: `span ${widthRatio}`,
              gridRow: `span ${heightRatio}`,
            }
          })()
        : { display: 'none' }

      const PluginComponent = matchingPlugin.plugin

      const PluginWrapper = (
        <div key={storePlugin.name} style={positionStyles} className="text-nowrap">
          <PluginComponent />
        </div>
      )

      if (disable) {
        return (
          <SortableItem key={storePlugin.id} value={storePlugin.id} asTrigger asChild>
            {PluginWrapper}
          </SortableItem>
        )
      }

      return PluginWrapper
    })
  }

  return (
    <div>
      <ToggleSortable />
      <div className="grid grid-cols-12 gap-3">
        {disable ? (
          <Sortable
            orientation="mixed"
            collisionDetection={closestCorners}
            value={plugins}
            onValueChange={backupPlugins}
          >
            {renderPlugin()}
          </Sortable>
        ) : (
          renderPlugin()
        )}
      </div>
    </div>
  )
}
