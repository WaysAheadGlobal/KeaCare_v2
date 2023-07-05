import Image, { StaticImageData } from 'next/image'
import React from 'react'

export default function Card({ image, heading, text }: { image: StaticImageData, heading: string, text: string }) {
    return (
        <div className='bg-white text-black p-5 pt-8 flex flex-col gap-5 items-center justify-center w-[20rem] rounded-lg'>
            <Image src={image.src} width={image.width} height={image.height} alt='effcient' className='w-[14rem]' />
            <p className='text-2xl font-semibold'>{heading}</p>
            <p className='text-sm'>{text}</p>
        </div>
    )
}
