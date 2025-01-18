import Image from 'next/image'

const Hero = () => {
  return (
    <div className="h-[234px] relative rounded-xl overflow-hidden z-10">
      <Image
        src="/images/bg_header.png"
        alt="bg-header"
        className="hidden md:block h-full absolute -z-[1] w-full object-cover"
        width={1000}
        height={234}
      />
      <Image
        src="/images/bg-header-mobile.png"
        alt=""
        className="md:hidden absolute -z-[1] w-full"
        width={1000}
        height={234}
      />
      <div className="m-auto px-5 h-60 md:h-full flex flex-col justify-end items-center md:justify-center md:items-start bg-black/5">
        <Image src="/icons/Coin98TextLogo.svg" className="w-36" alt="logo" width={144} height={144} />
        <div className="text-[2.8rem] text-white">
          <span className="text-[#E5B842] font-medium">Coin98</span> Snap
        </div>
        <div className="text-white ">Snap Test Dapps</div>
      </div>
    </div>
  )
}

export default Hero
