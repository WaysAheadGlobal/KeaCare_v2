"use client"

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import childCare1 from '../../public/childCare1.jpg';
import childCare2 from '../../public/childCare2.jpg';
import seniorCare1 from '../../public/seniorCare1.jpg';
import seniorCare2 from '../../public/seniorCare2.jpg';
import Link from 'next/link';


export default function Introduction_New() {
    const autoplay = useRef(Autoplay({ delay: 5000 }));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const animate = useAnimation();

    useEffect(() => {
        if (isInView) {
            animate.start("visible")
        }
    }, [isInView]);

    return (
        <motion.section className='relative mx-[1rem] mt-[1rem] lg:h-[55rem]'
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.5 }}
        >
            <Carousel
                maw={1300}
                mx="auto"
                withIndicators
                height={700}
                plugins={[autoplay.current]}
                onMouseLeave={autoplay.current.reset}
            >
                <Carousel.Slide>
                    <Image src={childCare1.src} width={childCare1.width} height={childCare1.height} alt='oldlady' className='rounded-lg' />
                </Carousel.Slide>
                <Carousel.Slide>
                    <Image src={childCare2.src} width={childCare2.width} height={childCare2.height} alt="mother" className='rounded-lg' />
                </Carousel.Slide>
                <Carousel.Slide>
                    <Image src={seniorCare1.src} width={seniorCare1.width} height={seniorCare1.height} alt='oldlady' className='rounded-lg' />
                </Carousel.Slide>
                <Carousel.Slide>
                    <Image src={seniorCare2.src} width={seniorCare2.width} height={seniorCare2.height} alt="mother" className='rounded-lg' />
                </Carousel.Slide>
            </Carousel>
            <div className='p-[1rem] rounded-t-none rounded-b-lg lg:rounded-lg shadow-xl bg-teal-500 absolute top-[15.8rem] lg:top-auto lg:bottom-[1rem] lg:right-[0rem]'>
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
        </motion.section>
    )
}
