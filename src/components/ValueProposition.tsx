"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import valueLeft from '../../public/valueLeft.png'
import valueRight from '../../public/valueRight.png'


export default function ValueProposition() {
    useEffect(() => {
        setInterval(() => {
            document.getElementById("value1")?.classList.toggle("grid");
            document.getElementById("value1")?.classList.toggle("hidden");
            document.getElementById("value2")?.classList.toggle("hidden");
            document.getElementById("value2")?.classList.toggle("grid");
        }, 3500);
    }, [])
    return (
        <section id="valueProposition" className='bg-[#e5e5e5] p-10'>
            <h1 className='text-teal-500 text-3xl font-semibold text-center mb-20'>Value Proposition</h1>
            <div className='flex w-full items-center justify-center'>
                <div id="value1" className='grid grid-rows-2 grid-cols-1 md:grid-cols-2 md:grid-rows-1 w-[64rem] transition-[display]'>
                    <div className='text-2xl space-y-7 row-[2/3] md:row-auto'>
                        <p className='italic font-bold'>
                            Secure access anytime, anywhere for
                            <span className='italic font-bold text-[#008dc9]'>&nbsp;careseekers.</span>
                        </p>
                        <p>
                            A cross-platform suite of communication tools to
                            enable easy and efficient communication between
                            families and caregivers, available across multiple
                            platforms and mobile devices.
                        </p>
                        <p className='italic font-semibold'>
                            A seamless customer experience, from
                            start to finish.
                        </p>
                    </div>
                    <Image src={valueLeft.src} width={valueLeft.width} height={valueLeft.height} alt='photo' className='w-[30rem] h-[22rem] row-[1/2] md:row-auto' />
                </div>

                <div id="value2" className='hidden grid-rows-2 grid-cols-1 md:grid-cols-2 md:grid-rows-1 w-[64rem] transition-[display]'>
                    <div className='text-2xl space-y-7 row-[2/3] md:row-auto'>
                        <p className='italic font-bold'>
                            Efficient way for
                            <span className='italic font-bold text-[#008dc9]'>&nbsp;caregivers </span>
                            to target
                            large, qualified audiences and
                            professionalize their careers.
                        </p>
                        <p>
                            We can provide caregivers with services, educational
                            resources and content to professionalize and manage
                            their careers, as well as the opportunity to establish
                            their professional reputation and enhance their profile
                            through the reviews and ratings they receive from
                            families.
                        </p>
                    </div>
                    <Image src={valueRight.src} width={valueRight.width} height={valueRight.height} alt='photo' className='w-[30rem] h-[22rem] row-[1/2] md:row-auto' />
                </div>
            </div>
        </section>
    )
}
