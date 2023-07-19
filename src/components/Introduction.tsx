"use client"

import React, { useEffect } from 'react'
import oldLady from '../../public/oldLady.jpg'
import ladywithBaby from '../../public/ladywithBaby.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Introduction() {
    useEffect(() => {
        setInterval(() => {
            document.getElementById("oldLady")?.classList.toggle('hidden');
            document.getElementById("ladyWithBaby")?.classList.toggle('hidden');
        }, 2500)
    }, [])
    return (
        <div className='grid grid-rows-[auto] place-content-start md:flex md:flex-row md:relative md:mx-[9.5rem] h-[45rem] p-5 sm:mb-[3rem]'>
            <div className='w-fit p-5 md:w-[30rem] bg-teal-500 md:h-[20rem] rounded-b-lg md:rounded-[0_0_20rem_0] row-[2/3]'>
                <div className='flex flex-col gap-2 p-3 items-start'>
                    <h1 className='text-white text-4xl font-semibold md:hidden block'>On-demand platform of vetted caregivers</h1>
                    <h1 className='text-white text-4xl font-semibold md:block hidden'>On-demand</h1>
                    <h1 className='text-white text-4xl font-semibold md:block hidden'>platform of vetted</h1>
                    <h1 className='text-white text-4xl font-semibold md:block hidden'>caregivers</h1>
                    <h2 className='text-white text-xl mt-5 font-light'>For Anyone, Anywhere, at Anytime</h2>
                    <Link href={"/pricing"}>
                        <button className='bg-[#09371f] text-white px-5 py-3 rounded-xl mt-3'>Plans & Pricing</button>
                    </Link>
                </div>
            </div>
            <Image id="oldLady" src={oldLady.src} alt='old lady' width={oldLady.width} height={oldLady.height} className='row-[1/2] rounded-t-lg md:rounded-[0_0_0_20rem] h-full md:h-[40rem] md:absolute z-[-1] md:w-[56rem] left-[18rem]' />
            <Image id="ladyWithBaby" src={ladywithBaby} alt='old lady' width={ladywithBaby.width} height={oldLady.height} className='hidden row-[1/2] rounded-t-lg md:rounded-[0_0_0_20rem] h-[18.1rem] sm:h-[28.3rem] md:h-[40rem] md:absolute z-[-1] md:w-[56rem] left-[18rem]' />
        </div>
    )
}
