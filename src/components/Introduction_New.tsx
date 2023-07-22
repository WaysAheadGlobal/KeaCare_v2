"use client"

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image, { StaticImageData } from 'next/image';
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
    const carousel = useAnimation();
    const images: { [key: string]: StaticImageData } = {
        "0": seniorCare1,
        "1": seniorCare2,
        "2": childCare1,
        "3": childCare2
    }
    const [bgImage, setBgImage] = useState<StaticImageData>(images["0"]);
    let counter: number = 1;

    useEffect(() => {
        if (isInView) {
            animate.start("visible")
            carousel.start("hidden")
        }
    }, [isInView]);

    useEffect(() => {
        setInterval(() => {
            setBgImage(images[counter.toString()])
            counter++;
            if (counter === 4) {
                counter = 0;
            }
        }, 2000)
    }, [])

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
                <div style={{ backgroundImage: `url(${bgImage.src})` }} className='w-full h-full bg-cover bg-top bg-no-repeat transition-[background-image] duration-500 delay-200'>
                    <div className='w-full h-full bg-gradient-to-br from-[#0000009f] from-[10%] to-[#ffffff00] bg-opacity-20 p-[1rem] md:p-[3rem]'>
                        <div className='p-[1rem] w-fit'>
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
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
