'use client'
import { TPluginData } from '@repo/constants'
import { Button } from '@repo/ui/components/ui/button'
import Image from 'next/image'
import React from 'react'

interface CardSnapProps {
  item: TPluginData
}
const CardSnap: React.FC<CardSnapProps> = ({ item }) => {
  return (
    <div className="p-2 rounded-sm">
      <div className="min-h-[11rem] all-center mb-3 relative overflow-hidden rounded-xl">
        <Image width={96} height={96} alt="Snap_IMG" src={item?.image || ''} className="rounded-full z-10" />
        <Image
          width={96}
          height={96}
          alt="Snap_IMG"
          src={item?.image || ''}
          className="rounded-full absolute top-0  w-full h-full scale-125 blur-3xl"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-1">
          <Image
            width={40}
            height={40}
            alt="Snap_IMG"
            src={item?.image || ''}
            className="rounded-full object-cover size-10"
          />
          <div className="flex-1">
            <h3 className="font-semibold line-clamp-1">{item.name}</h3>
            <p className="line-clamp-1 text-xs">{item.description}</p>
          </div>
        </div>
        <Button className="rounded-xl" size={'sm'}>
          View
        </Button>
      </div>
    </div>
  )
}

const Installed = () => {
  const snapList: any = []
  const renderInstalled = () => {
    if (snapList.length === 0) {
      return (
        <div className="h-[300px]">
          <Image
            src={'https://snapshot.coin98.com/bgUpcoming.0501f83.svg'}
            width={1000}
            height={300}
            alt="empty"
            className="h-full w-full"
          />
        </div>
      )
    }
    return (
      <div className="grid grid-cols-autoFill w-full gap-x-8 gap-y-4">
        {snapList.map((item: any) => (
          <CardSnap item={item} key={item.id} />
        ))}
      </div>
    )
  }

  return <section>{renderInstalled()}</section>
}

export default Installed
