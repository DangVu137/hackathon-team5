'use client'
import { Separator } from '@repo/ui'
import Link from 'next/link'
import Hero from './Hero'
import { PluginArea } from '../plugin-area'
const HomeScreen = () => {
  return (
    <section className="flex flex-col gap-y-8 ">
      <Hero />
      <Separator />
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Installed</h2>
        <Link href={'/explore'} className="text-textLink hover:underline hover:decoration-2">
          Explore All Snaps
        </Link>
      </div>
      <PluginArea />
    </section>
  )
}

export default HomeScreen
