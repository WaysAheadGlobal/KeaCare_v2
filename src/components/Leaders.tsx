"use client"

import React, { useEffect, useRef, useState } from 'react'
import leader1 from '../../public/leader1.jpg'
import leader2 from '../../public/leader2.jpg'
import leader3 from '../../public/leader3a.png'
import leader4 from '../../public/leader4.png'
import Image, { StaticImageData } from 'next/image'
import { BsInstagram } from 'react-icons/bs'
import { SiLinkedin } from 'react-icons/si'
import { ImFacebook2 } from 'react-icons/im'
import { FaTwitterSquare } from 'react-icons/fa'
import { motion, useInView, useAnimation } from 'framer-motion'
import Link from 'next/link'

function Card({ image, heading, subHeading, text, delay, socialmedia }: { image: StaticImageData, heading: string, subHeading: string, text: string, delay: number, socialmedia: string[] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const animate = useAnimation();
    const [textLength, setTextLength] = useState<{
        end?: number,
        suffix: "more" | "less"
    }>({
        end: 100,
        suffix: "more"
    });

    useEffect(() => {
        if (isInView) {
            animate.start("visible")
        }
    }, [isInView]);

    return (
        <motion.div className='bg-white bg-opacity-40 backdrop-blur-lg w-[21rem] items-start rounded-lg flex flex-col p-[1rem] py-[2rem]'
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.5, delay: delay }}
        >
            {/* <Image src={image.src} alt={heading} width={image.width} height={image.height} className='w-full h-[20rem] rounded-t-md' />
            <div className='p-5 flex flex-col gap-3'>
                <p className='text-2xl font-bold text-white'>{heading}</p>
                <p className='text-xl font-semibold text-white'>{subHeading}</p>
                <p className='text-white text-sm'>{text.substring(0, textLength.end)}&nbsp;&nbsp;&nbsp;<span className='text-teal-800 hover:underline' onClick={() => {
                    if (textLength.end) {
                        setTextLength({
                            end: undefined,
                            suffix: "less"
                        });
                    } else {
                        setTextLength({
                            end: 100,
                            suffix: "more"
                        });
                    }
                }}>Read {textLength.suffix}</span></p>
            </div>
            <div className='flex-grow'></div>
            <div className='flex flex-row items-center justify-evenly text-white text-3xl w-full'>
                <SiLinkedin />
                <BsInstagram />
                <ImFacebook2 />
                <FaTwitterSquare />
            </div> */}

            <div className='flex gap-5 items-center justify-start'>
                <Image src={image.src} alt={heading} width={image.width} height={image.height} className='w-[6rem] aspect-square rounded-full' />
                <div>
                    <p className='text-xl font-bold'>{heading}</p>
                    <p className='text-base font-semibold'>{subHeading}</p>
                </div>
            </div>
            <div className='p-[1rem] flex flex-col gap-3'>
                <p className='text-sm'>{text.substring(0, textLength.end)}&nbsp;&nbsp;&nbsp;<span className='text-teal-800 hover:underline' onClick={() => {
                    if (textLength.end) {
                        setTextLength({
                            end: undefined,
                            suffix: "less"
                        });
                    } else {
                        setTextLength({
                            end: 100,
                            suffix: "more"
                        });
                    }
                }}>Read {textLength.suffix}</span></p>
            </div>
            <div className='flex-grow'></div>
            <div className='flex flex-row items-center justify-evenly text-black text-3xl w-full'>
                <Link href={socialmedia[0]} target='_blank'>
                    <SiLinkedin />
                </Link>
                <Link href={socialmedia[1]} target='_blank'>
                    <ImFacebook2 />
                </Link>
                <Link href={socialmedia[2]} target='_blank'>
                    <FaTwitterSquare />
                </Link>
            </div>
        </motion.div>
    )
}

export default function Leaders() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const animate = useAnimation();

    useEffect(() => {
        if (isInView) {
            animate.start("visible")
        }
    }, [isInView]);
    return (
        <motion.section id="leaders" className='py-[5rem] bg-gradient-to-br from-[#14b8a575] to-[#0ea4e975] space-y-10 flex flex-col items-center justify-center'
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={animate}
            transition={{ duration: 0.5 }}
        >
            <h1 className='text-3xl font-semibold text-center'>Leadership</h1>
            <div className='flex flex-col flex-wrap items-center justify-center md:items-stretch md:flex-row gap-5'>
                <Card image={leader1} heading='Ho Ngoc Choung' subHeading='Chief Executive Officer' text='Ho Ngoc Chuong is the founder and CEO at KEACARE. He is also the founder and CEO of Metromart Convenience Stores where he defined and built the ERP systems, defined key functions and processes and also oversaw development of specialised software. He has over 25 years of experience in increasing revenues, gaining market share, enhancing profitability and improving the financial performance of multiple companies.' delay={0} socialmedia={["https://www.linkedin.com/in/edgar-h-98236932/", "https://www.linkedin.com/in/edgar-h-98236932/", "https://www.linkedin.com/in/edgar-h-98236932/"]} />

                <Card image={leader2} heading='Tran Thoung Thu' subHeading='Chief Executive Officer' text='Tran Thuong Thu Giang is the Chief Technology Officer at KEACARE. She has spent over 15 years working in information technology and software development across a range of industries, and hold an MSc in Computer Science from Vrije Universiteit, in Belgium.' delay={0.25} socialmedia={["https://www.linkedin.com/in/thu-giang-tran-thuong-96ba368/", "https://www.linkedin.com/in/thu-giang-tran-thuong-96ba368/", "https://www.linkedin.com/in/thu-giang-tran-thuong-96ba368/"]} />

                <Card image={leader3} heading='Pham Ngoc Anh' subHeading='Head of Data and Analytics' text='Pham Ngoc Anh is Head of Data & Analytics at KEACARE. She has over 16 years of experience in project management, business intelligence and analytics in the Oil and gas industry with one of the largest companies in Vietnam. She has degrees in geological science and economic insurance.' delay={0.5} socialmedia={["https://www.linkedin.com/in/anh-ngoc-pham-7176a423a/", "https://www.linkedin.com/in/anh-ngoc-pham-7176a423a/", "https://www.linkedin.com/in/anh-ngoc-pham-7176a423a/"]} />

                <Card image={leader4} heading='Nguyen Ngoc Nam' subHeading='Head of Customer Success' text='Nguyen Ngoc Nam is Head of Customer Success (Onboarding) at KEACARE. He has over 15 years experience working in account management and market development in the telecom industry. He has a Bachelor’s degree in Telecom Informatics and Business Economics from Ha Noi National University in Vietnam.' delay={0.75} socialmedia={["https://www.linkedin.com/in/", "https://www.linkedin.com/in/", "https://www.linkedin.com/in/"]} />
            </div>
        </motion.section>
    )
}
