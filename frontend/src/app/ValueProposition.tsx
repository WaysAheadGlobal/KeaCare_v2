"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image';
import seniorCarePortait from '../../public/seniorCarePortait.jpg';
import seniorCare from '../../public/seniorCareValued.jpg';
import childCare from '../../public/childCareValued.jpg';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function ValueProposition() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const animate = useAnimation();

    useEffect(() => {
        if (isInView) {
            animate.start("visible")
        }
    }, [isInView]);

    useEffect(() => {
        setInterval(() => {
            document.getElementById("slide1")?.classList.toggle("opacity-100");
            document.getElementById("slide1")?.classList.toggle("opacity-0");
            document.getElementById("slide2")?.classList.toggle("opacity-0");
            document.getElementById("slide2")?.classList.toggle("opacity-100");
        }, 5000)
    }, []);

    return (
        <motion.section className='relative p-[2rem] md:p-[5rem] bg-sky-500 bg-opacity-30 h-[55rem] lg:h-[35rem] space-y-[2rem]'
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.5 }}
        >
            <h1 className='text-3xl font-semibold text-start'>Value Proposition</h1>
            <div className='relative'>
                <div id="slide1" className='flex flex-col lg:h-auto lg:grid lg:grid-cols-2 gap-[2rem] lg:gap-[10rem] lg:place-content-between w-full absolute z-10 transition-opacity opacity-100 duration-500'>
                    <div className='text-xl space-y-7 lg:w-[30rem]'>
                        <p className='font-semibold'>
                            Secure access anytime, anywhere for
                            <span className='font-semibold text-[#008dc9]'>&nbsp;careseekers.</span>
                        </p>
                        <p className='text-lg'>
                            A cross-platform suite of communication tools to
                            enable easy and efficient communication between
                            families and caregivers, available across multiple
                            platforms and mobile devices.
                        </p>
                        <p className='font-semibold'>
                            A seamless customer experience, from
                            start to finish.
                        </p>
                    </div>
                    <Image src={seniorCare.src} width={seniorCarePortait.width} height={seniorCarePortait.height} alt='oldlady' className='aspect-square w-[25rem] object-cover object-center rounded-lg' />
                </div>
                <div id="slide2" className='flex flex-col lg:h-auto lg:grid lg:grid-cols-2 gap-[2rem] lg:gap-[10rem] lg:place-content-between absolute z-10 transition-opacity opacity-0 duration-500 w-full'>
                    <div className='text-xl space-y-7 lg:w-[30rem]'>
                        <p className='font-semibold'>
                            Efficient way for
                            <span className='font-semibold text-[#008dc9]'>&nbsp;caregivers </span>
                            to target
                            large, qualified audiences and
                            professionalize their careers.
                        </p>
                        <p className='text-lg'>
                            We can provide caregivers with services, educational
                            resources and content to professionalize and manage
                            their careers, as well as the opportunity to establish
                            their professional reputation and enhance their profile
                            through the reviews and ratings they receive from
                            families.
                        </p>
                    </div>
                    <Image src={childCare.src} width={childCare.width} height={childCare.height} alt='oldlady' className='aspect-square w-[25rem] object-cover object-center rounded-lg' />
                </div>
            </div>
            {/* <Carousel
                className='w-full'
                maw={1000}
                mx="auto"
                withIndicators
                slideSize={1000}
                height="fit-content"
                plugins={[autoplay.current]}
                onMouseLeave={autoplay.current.reset}
                breakpoints={[
                    { maxWidth: "lg", slideSize: 500, slideGap: "xl" },
                    { maxWidth: "md", slideSize: 300, slideGap: "xl" }
                ]}
            >
                <Carousel.Slide>
                    <div className='flex lg:flex-row flex-col items-center gap-[5rem] lg:gap-[10rem] w-full'>
                        <Image src={seniorCarePortait.src} width={seniorCarePortait.width} height={seniorCarePortait.height} alt='oldlady' className='h-[400px] lg:h-[500px] w-[35rem] rounded-lg shadow-lg' />
                        <div className='text-xl space-y-7'>
                            <p className='font-semibold'>
                                Secure access anytime, anywhere for
                                <span className='font-semibold text-[#008dc9]'>&nbsp;careseekers.</span>
                            </p>
                            <p className='text-lg'>
                                A cross-platform suite of communication tools to
                                enable easy and efficient communication between
                                families and caregivers, available across multiple
                                platforms and mobile devices.
                            </p>
                            <p className='font-semibold'>
                                A seamless customer experience, from
                                start to finish.
                            </p>
                        </div>
                    </div>
                </Carousel.Slide>
                <Carousel.Slide>
                    <div className='flex lg:flex-row flex-col items-center gap-[5rem] lg:gap-[10rem] w-full'>
                        <Image src={childCarePortait.src} width={childCarePortait.width} height={childCarePortait.height} alt='oldlady' className='h-[400px] lg:h-[500px] w-[35rem] relative rounded-lg shadow-lg' />
                        <div className='text-xl space-y-7'>
                            <p className='font-semibold'>
                                Efficient way for
                                <span className='font-semibold text-[#008dc9]'>&nbsp;caregivers </span>
                                to target
                                large, qualified audiences and
                                professionalize their careers.
                            </p>
                            <p className='text-lg'>
                                We can provide caregivers with services, educational
                                resources and content to professionalize and manage
                                their careers, as well as the opportunity to establish
                                their professional reputation and enhance their profile
                                through the reviews and ratings they receive from
                                families.
                            </p>
                        </div>
                    </div>
                </Carousel.Slide>
            </Carousel> */}
        </motion.section>
    )
}
