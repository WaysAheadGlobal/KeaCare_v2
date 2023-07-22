"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import careseeker from '../../public/careseeker.png'
import searchArea from '../../public/searchArea.png'
import necessaryFilters from '../../public/necessaryFilters.png'
import bookSession from '../../public/bookSession.png'
import caregiver from '../../public/caregiver.png'
import applyJob from '../../public/applyJob.png'
import { motion, useInView, useAnimation } from 'framer-motion'

export default function HowItWorks() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const animate = useAnimation();

    useEffect(() => {
        if (isInView) {
            animate.start("visible")
        }
    }, [isInView]);

    return (
        <motion.section id="working" className='px-5 py-20 xl:p-20 flex flex-col gap-10 bg-gradient-to-br from-[#14b8a575] to-[#0ea4e975]'
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.5 }}
        >
            <h1 className='text-3xl text-center font-bold'>How it Works</h1>
            <div className='flex flex-col md:flex-row xl:flex-col justify-center gap-10 w-full'>
                <motion.section className='space-y-5 md:w-[30rem] xl:w-full'
                    ref={ref}
                    variants={{
                        hidden: { display: "none", x: -200 },
                        visible: { display: "block", x: 0 }
                    }}
                    initial="hidden"
                    animate={animate}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className='text-center text-xl font-semibold'>For Careseekers</h2>
                    <div className='grid grid-rows-[0.7fr_1fr] grid-cols-1 xl:grid-cols-2 xl:grid-rows-1 bg-teal-500 rounded-lg xl:rounded-l-xl xl:rounded-[0_8px_20rem_0]'>
                        <Image src={careseeker} width={careseeker.width} height={careseeker.height} alt='careseeker' className='xl:rounded-l-lg xl:rounded-tr-none rounded-t-lg' />
                        <div className='xl:p-20 py-10 px-5 flex flex-col gap-10 items-center justify-center'>
                            <div className='flex flex-row gap-2 items-center justify-center'>
                                <Image src={searchArea.src} width={searchArea.width} height={searchArea.height} alt='Search in your Area' className='w-[4rem] md:w-[6rem]' />
                                <div className='text-white flex flex-col items-start justify-center'>
                                    <p className='sm:text-lg font-semibold'>Search in your Area</p>
                                    <p className='text-sm sm:text-base'>Search the childcare or senior care profiles in your area based on your requirement</p>
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 items-center justify-center'>
                                <Image src={necessaryFilters.src} width={necessaryFilters.width} height={necessaryFilters.height} alt='Use the necessary filters' className='w-[4rem] md:w-[6rem]' />
                                <div className='text-white flex flex-col items-start justify-center'>
                                    <p className='sm:text-lg font-semibold'>Use the necessary filters</p>
                                    <p className='text-sm sm:text-base'>Filters the profiles based on experience, rating, age, type, language, and additional services</p>
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 items-center justify-center'>
                                <Image src={bookSession.src} width={bookSession.width} height={bookSession.height} alt='Book a session' className='w-[4rem] md:w-[6rem]' />
                                <div className='text-white flex flex-col items-start justify-center'>
                                    <p className='sm:text-lg font-semibold'>Book a session</p>
                                    <p className='text-sm sm:text-base'>View the caregiver profile details based on search or recommendation and tap the &quot;book appointment&quot; button to confirm your appointment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
                <motion.section className='space-y-5 md:w-[30rem] xl:w-full'
                    ref={ref}
                    variants={{
                        hidden: { display: "none", x: 200 },
                        visible: { display: "block", x: 0 }
                    }}
                    initial="hidden"
                    animate={animate}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <h2 className='text-center text-xl font-semibold'>For Caregivers</h2>
                    <div className='grid grid-rows-[0.7fr_1fr] grid-cols-1 xl:grid-cols-2 xl:grid-rows-1 bg-teal-500 rounded-xl xl:rounded-[20rem_0_0_8px] xl:rounded-r-xl'>
                        <Image src={caregiver} width={caregiver.width} height={caregiver.height} alt='caregiver' className='rounded-t-lg block xl:hidden' />
                        <div className='xl:p-20 px-5 py-10 flex flex-col gap-10 items-center justify-center'>
                            <div className='flex flex-row gap-2 items-center justify-center'>
                                <Image src={searchArea.src} width={searchArea.width} height={searchArea.height} alt='Search jobs in your Area' className='w-[4rem] md:w-[6rem]' />
                                <div className='text-white flex flex-col items-start justify-center'>
                                    <p className='sm:text-lg font-semibold'>Search jobs in your Area</p>
                                    <p className='text-sm sm:text-base'>Search the childcare or senior care job in your area based on your expertise</p>
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 items-center justify-center'>
                                <Image src={necessaryFilters.src} width={necessaryFilters.width} height={necessaryFilters.height} alt='Use the necessary filters' className='w-[4rem] md:w-[6rem]' />
                                <div className='text-white flex flex-col items-start justify-center'>
                                    <p className='sm:text-lg font-semibold'>Use the necessary filters</p>
                                    <p className='text-sm sm:text-base'>Filters the profiles based on experience, rating, age, type, language, and additional services</p>
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 items-center justify-center'>
                                <Image src={applyJob.src} width={applyJob.width} height={applyJob.height} alt='Apply for the job!' className='w-[4rem] md:w-[6rem]' />
                                <div className='text-white flex flex-col items-start justify-center'>
                                    <p className='sm:text-lg font-semibold'>Apply for the job!</p>
                                    <p className='text-sm sm:text-base'>View the job posting done by care seeker and apply for the job</p>
                                </div>
                            </div>
                        </div>
                        <Image src={caregiver} width={caregiver.width} height={caregiver.height} alt='caregiver' className='rounded-r-lg hidden xl:block' />
                    </div>
                </motion.section>
            </div>
        </motion.section>
    )
}
