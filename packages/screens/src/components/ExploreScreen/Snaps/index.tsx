'use client'
import { PLUGINS, TPluginData } from '@repo/constants'
import Image from 'next/image'
import React from 'react'
import SnapButton from './SnapButton'
interface SnapItemProps {
  item: TPluginData
}
export const SnapItem: React.FC<SnapItemProps> = ({ item }) => {
  return (
    <div className="flex justify-between items-center py-4 px-3 rounded-[8px] hover:bg-backgroundInputHover">
      <div className="flex gap-x-1">
        <Image
          width={40}
          height={40}
          alt="Snap_IMG"
          src={item?.image || ''}
          className="rounded-full object-cover size-10"
        />
        <div className="flex-1">
          <h3 className="font-semibold line-clamp-1 first-letter:uppercase">{item.name}</h3>
          <p className="line-clamp-1 text-xs">{item.description}</p>
        </div>
      </div>
      <SnapButton snap={item} />
    </div>
  )
}
const Snaps = () => {
  return (
    <div className="pb-6">
      <h2 className="text-2xl font-bold py-6">Explore Snaps</h2>
      <div className="grid grid-cols-3 gap-4">
        {PLUGINS.map((item) => (
          <SnapItem item={item} key={item.name} />
        ))}
      </div>
    </div>
  )
}

export default Snaps
