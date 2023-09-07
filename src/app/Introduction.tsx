"use client"

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import childCare2 from '../../public/childCare2.jpg';
import Link from 'next/link';


export default function Introduction() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const animate = useAnimation();
    const carousel = useAnimation();

    useEffect(() => {
        if (isInView) {
            animate.start("visible")
            carousel.start("hidden")
        }
    }, [isInView]);

    return (
        <motion.section className='h-[60rem]'
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.5 }}
        >
            <div className='w-full h-full overflow-hidden flex'>
                <div style={{ backgroundImage: `url(${childCare2.src})` }} className='w-full h-full bg-cover bg-top bg-no-repeat transition-[background-image] duration-500 delay-200'>
                    <div className='w-full h-full bg-gradient-to-br from-[#0000009f] from-[10%] to-[#ffffff00] bg-opacity-20 p-[1rem] md:p-[3rem]'>
                        <div className='p-[1rem] w-fit'>
                            <div className='flex flex-col gap-2 p-3 items-start'>
                                <h1 className='text-white text-4xl font-semibold md:hidden block'>On-demand platform of vetted caregivers</h1>
                                <h1 className='text-white text-4xl font-semibold md:block hidden'>On-demand</h1>
                                <h1 className='text-white text-4xl font-semibold md:block hidden'>platform of vetted</h1>
                                <h1 className='text-white text-4xl font-semibold md:block hidden'>caregivers</h1>
                                <h2 className='text-white text-xl mt-5 font-light'>For Anyone, Anywhere, at Anytime</h2>
                                <Link href={"/pricing"}>
                                    <button className='bg-white bg-opacity-40 hover:bg-opacity-50 text-white px-5 py-3 rounded-lg mt-3'>Plans & Pricing</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
