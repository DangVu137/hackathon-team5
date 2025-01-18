export type TPluginData = {
  id: string
  name: string
  url?: string
  description?: string
  image?: string
  position?: number
  size?: string
  status: 'active' | 'inactive'
  plugin: React.FC<any>
}
