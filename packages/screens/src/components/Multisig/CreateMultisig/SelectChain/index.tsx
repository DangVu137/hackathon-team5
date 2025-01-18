import { Icon, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui'
import React from 'react'
const networkList = [
  {
    name: 'Viction',
    symbol: 'VIC',
    icon: 'app_viction',
  },
]
const SelectChain = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Network" />
      </SelectTrigger>
      <SelectContent className="bg-background">
        {networkList.map((network) => (
          <SelectItem value="light" key={network.name}>
            <div className="all-center gap-x-2">
              <Icon name={network.icon} />
              <p>{network.name}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectChain
